# python/textprov/_encode.py

"""Producer and diagnostics: add marks to text, change encoding, report states.

These experimental operations use the vendored mapping, with no font or shaping
engine. The replacement-PUA mode is distinct from the proposed additive-PUA
candidate.
"""

from ._core import GENERATED_STATES, _blank, default_mapping, segments
from ._grapheme import _control_like


def _mark(text, state, mode, selectors, pua2base, base2pua):
    """Attach the selector for `state` after every markable cluster.

    A cluster is an extended grapheme cluster, so the selector goes after
    combining marks, emoji variation selectors, skin-tone modifiers, ZWJ
    joins, regional-indicator pairs, conjuncts and Hangul jamo, and a cluster
    is marked once. Whitespace, control-break clusters, clusters that already end in a provenance
    selector, lone selectors, and PUA provenance characters are left alone
    (the operation is idempotent). With mode='pua' only single-code-point
    bases present in mapping.json are replaced by their PUA counterpart;
    every other base keeps the VS_AI encoding instead.
    """
    if state not in GENERATED_STATES:
        raise ValueError(f"invalid provenance state: {state!r}")
    sel_cps = set(selectors.values())
    selector = chr(selectors[state])
    out = []
    for cluster in segments(text):
        first, last = ord(cluster[0]), ord(cluster[-1])
        single = len(cluster) == 1
        if (
            last in sel_cps
            or (single and first in pua2base)
            or _blank(cluster)
            or _control_like(last)
        ):
            out.append(cluster)  # already marked, a lone selector, or inert
        elif mode == "pua" and state == "ai" and single and first in base2pua:
            out.append(chr(base2pua[first]))
        else:
            out.append(cluster + selector)
    return "".join(out)


def _mark_added(old_text, new_text, state, mode, selectors, pua2base, base2pua):
    """Find the common prefix and suffix of old_text and new_text,
    and mark the newly added/modified middle part of new_text.
    """
    if not old_text:
        return _mark(new_text, state, mode, selectors, pua2base, base2pua)
    pre = 0
    while (
        pre < min(len(old_text), len(new_text))
        and old_text[pre] == new_text[pre]
    ):
        pre += 1
    suf = 0
    while (
        suf < min(len(old_text), len(new_text)) - pre
        and old_text[-1 - suf] == new_text[-1 - suf]
    ):
        suf += 1
    end = len(new_text) - suf
    middle_marked = _mark(
        new_text[pre:end], state, mode, selectors, pua2base, base2pua
    )
    return new_text[:pre] + middle_marked + new_text[end:]


def _convert(text, from_mode, to_mode, selectors, pua2base, base2pua):
    """Convert the AI state between VS and PUA encodings; pass all else through."""
    if from_mode == to_mode:
        return text
    vs_ai = selectors["ai"]
    if from_mode == "vs":
        # Per cluster, not per code point: a base that shares its cluster with
        # anything but its own selector has no PUA counterpart.
        out = []
        for cluster in segments(text):
            if (
                len(cluster) == 2
                and ord(cluster[1]) == vs_ai
                and ord(cluster[0]) in base2pua
            ):
                out.append(chr(base2pua[ord(cluster[0])]))
            else:
                out.append(cluster)
        return "".join(out)
    out = []
    for char in text:
        entry = pua2base.get(ord(char))
        if entry and entry[1] == "ai":
            out.append(chr(entry[0]))
            out.append(chr(vs_ai))
        else:
            out.append(char)
    return "".join(out)


def _inspect(text, selectors, pua2base):
    """Return a plain-text 'key: value' report of provenance states."""
    sel2name = {cp: name for name, cp in selectors.items()}
    counts = dict.fromkeys(
        (
            "unmarked",
            "human",
            "ai_vs",
            "ai_pua",
            "whitespace",
        ),
        0,
    )
    unrecognised_selectors = set()
    unrecognised_pua = set()

    chars = list(text)
    for cluster in segments(text):
        cp, last = ord(cluster[0]), ord(cluster[-1])
        if len(cluster) == 1:
            if cp in sel2name or 0xE0100 <= cp <= 0xE01EF:
                # A selector reached here has no base in front of it.
                unrecognised_selectors.add(cp)
            elif cp in pua2base:
                counts["ai_pua"] += 1
            elif 0x100000 <= cp <= 0x10FFFD:
                unrecognised_pua.add(cp)
            elif _blank(cluster):
                counts["whitespace"] += 1
            else:
                counts["unmarked"] += 1
        elif last in sel2name and _blank(cluster[:-1]):
            # Whitespace cannot carry a mark; the selector is stray.
            counts["whitespace"] += 1
            unrecognised_selectors.add(last)
        elif last in sel2name:
            name = sel2name[last]
            counts["ai_vs" if name == "ai" else name] += 1
        elif _blank(cluster):
            counts["whitespace"] += 1
        else:
            counts["unmarked"] += 1

    lines = [f"characters: {len(chars)}"]
    for key in (
        "unmarked",
        "human",
        "ai_vs",
        "ai_pua",
        "whitespace",
    ):
        lines.append(f"{key}: {counts[key]}")
    lines.append(
        "unrecognised_selectors: {}".format(
            " ".join(f"U+{cp:04X}" for cp in sorted(unrecognised_selectors))
            or "-"
        )
    )
    lines.append(
        "unrecognised_pua: {}".format(
            " ".join(f"U+{cp:04X}" for cp in sorted(unrecognised_pua)) or "-"
        )
    )
    return "\n".join(lines) + "\n"


# --- public API ------------------------------------------------------------


def mark(text, state="ai", mode="vs", mapping=None):
    """Mark every unmarked cluster in `text` with `state`.

    `mode` is "vs" for the selector encoding or "pua" for the PUA encoding.
    Idempotent: marking marked text returns it unchanged. Whitespace and
    control-break clusters are never marked. These are the implemented producer rules.
    """
    mapping = mapping or default_mapping()
    return _mark(
        text, state, mode, mapping.selectors, mapping.pua2base, mapping.base2pua
    )


def mark_added(old_text, new_text, state="ai", mode="vs", mapping=None):
    """Mark only what `new_text` adds to `old_text`, by common prefix and suffix."""
    mapping = mapping or default_mapping()
    return _mark_added(
        old_text,
        new_text,
        state,
        mode,
        mapping.selectors,
        mapping.pua2base,
        mapping.base2pua,
    )


def convert(text, from_mode, to_mode, mapping=None):
    """Convert the ai state between the "vs" and "pua" encodings.

    Every other state and every unmarked character passes through: only ai has
    a PUA allocation in registry version 0.2.
    """
    mapping = mapping or default_mapping()
    return _convert(
        text,
        from_mode,
        to_mode,
        mapping.selectors,
        mapping.pua2base,
        mapping.base2pua,
    )


def inspect(text, mapping=None):
    """Return a plain-text 'key: value' report of the states present in `text`."""
    mapping = mapping or default_mapping()
    return _inspect(text, mapping.selectors, mapping.pua2base)
