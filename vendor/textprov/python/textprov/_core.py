# python/textprov/_core.py

"""Shared core of the TextProv decorator: registry, clusters, runs, markup.

Extracted from bin/scripts/nfprov.py in the nerd-fonts provenance fork, which
keeps the encoder. The functions here are the decoder and renderer halves.
"""

import html
import json
import re
from pathlib import Path

from ._grapheme import UNICODE_VERSION, segments  # noqa: F401 (re-exported)

MAPPING_PATH = Path(__file__).with_name("mapping.json")

SPEC_VERSION = "0.2"  # baseline experiment identifier
GENERATED_STATES = ("human", "ai")


class Mapping:
    """The code-point registry, loaded once and passed to every operation."""

    __slots__ = ("base2pua", "pua2base", "raw", "selectors", "version")

    def __init__(self, raw, version, selectors, pua2base, base2pua):
        self.raw = raw
        self.version = version
        self.selectors = selectors
        self.pua2base = pua2base
        self.base2pua = base2pua

    @classmethod
    def load(cls, path=MAPPING_PATH):
        """Load a registry file. Defaults to the copy vendored in this package."""
        raw, selectors, pua2base, base2pua = load_mapping(path)
        return cls(raw, raw["version"], selectors, pua2base, base2pua)


_DEFAULT = None


def default_mapping():
    """The vendored registry, loaded on first use."""
    global _DEFAULT
    if _DEFAULT is None:
        _DEFAULT = Mapping.load()
    return _DEFAULT


def _codepoint(value):
    # Registry format is exactly "U+HHHH" (matches the JS and Ruby loaders).
    # Do NOT collapse to int(value, 0): that parses Python literals like
    # "0xE0100" but rejects "U+E0100", silently breaking every public API
    # path on first use of default_mapping(). Reject bare hex too so a
    # future refactor cannot drift silently. See TestVendoredRegistry
    # .test_codepoint_parser_* for the regression guards.
    if not (isinstance(value, str) and value.startswith("U+") and len(value) > 2):
        raise ValueError(f"expected registry codepoint 'U+HHHH', got {value!r}")
    return int(value[2:], 16)


def load_mapping(path=MAPPING_PATH):
    """Load mapping.json and return (mapping, selectors, pua2base, base2pua)."""
    with open(path, encoding="utf-8") as handle:
        mapping = json.load(handle)
    selectors = {
        name: _codepoint(value)
        for name, value in mapping["variation_selectors"].items()
    }
    pua2base = {}
    base2pua = {}
    for pua_string, entry in mapping["pua"].items():
        pua = _codepoint(pua_string)
        base = _codepoint(entry["base"])
        pua2base[pua] = (base, entry.get("provenance", "ai"))
        if entry.get("provenance", "ai") == "ai":
            base2pua[base] = pua
    return mapping, selectors, pua2base, base2pua


# Exact Unicode White_Space set used by the experiment; str.isspace() also includes U+001C–U+001F.
_WHITE_SPACE = re.compile(
    r"[\u0009-\u000d\u0020\u0085\u00a0\u1680\u2000-\u200a"
    r"\u2028\u2029\u202f\u205f\u3000]+"
)


def _blank(text):
    return _WHITE_SPACE.fullmatch(text) is not None


# --- runs and markup -------------------------------------------------------


def _strip(text, selectors, pua2base):
    """Remove all provenance selectors and map PUA entries back to their base."""
    sel_cps = set(selectors.values())
    out = []
    for char in text:
        cp = ord(char)
        if cp in sel_cps:
            continue
        entry = pua2base.get(cp)
        out.append(chr(entry[0]) if entry else char)
    return "".join(out)


def _runs(text, selectors, pua2base, strip=False, merge_whitespace=True):
    """Split `text` into an ordered list of (state, text) runs.

    Implements the decoder algorithm in the baseline experiment: segment into
    extended grapheme clusters, classify each cluster, then merge. `state` is
    a selector name from mapping.json's variation_selectors, or None.
    """
    sel2name = {cp: name for name, cp in selectors.items()}
    items = []
    for cluster in segments(text):
        last = ord(cluster[-1])
        state, out = None, cluster
        if last in sel2name and len(cluster) > 1:
            # Whitespace cannot carry a mark; a selector after it is inert.
            if not _blank(cluster[:-1]):
                state = sel2name[last]
                if strip:
                    out = cluster[:-1]
        elif len(cluster) == 1 and ord(cluster) in pua2base:
            base_cp, state = pua2base[ord(cluster)]
            out = chr(base_cp) if strip else chr(base_cp) + chr(selectors[state])
        elif _blank(cluster):
            state = "ws"
        if items and items[-1][0] == state:
            items[-1][1] += out
        else:
            items.append([state, out])

    merged = []
    for position, (state, out) in enumerate(items):
        following = (
            items[position + 1][0] if position + 1 < len(items) else None
        )
        if (
            merge_whitespace
            and state == "ws"
            and merged
            and merged[-1][0]
            and merged[-1][0] == following
        ):
            merged[-1][1] += out
            continue
        if state == "ws":
            state = None
        if merged and merged[-1][0] == state:
            merged[-1][1] += out
        else:
            merged.append([state, out])
    return [(state, out) for state, out in merged]


def _to_html(
    text,
    selectors,
    pua2base,
    strip=False,
    merge_whitespace=True,
    class_prefix="prov",
):
    """Render `text` as HTML spans per the experimental decorator."""
    parts = []
    for state, out in _runs(text, selectors, pua2base, strip, merge_whitespace):
        escaped = html.escape(out)
        if state:
            parts.append(
                f'<span class="{class_prefix} {class_prefix}-{state}" '
                f'data-prov="{state}">{escaped}</span>'
            )
        else:
            parts.append(escaped)
    return "".join(parts)


# --- public API ------------------------------------------------------------


def runs(text, mapping=None, strip=False, merge_whitespace=True):
    """Split `text` into an ordered list of (state, text) runs for the baseline experiment."""
    mapping = mapping or default_mapping()
    return _runs(
        text, mapping.selectors, mapping.pua2base, strip, merge_whitespace
    )


def to_html(
    text, mapping=None, strip=False, merge_whitespace=True, class_prefix="prov"
):
    """Render `text` as HTML spans per the experimental decorator."""
    mapping = mapping or default_mapping()
    return _to_html(
        text,
        mapping.selectors,
        mapping.pua2base,
        strip,
        merge_whitespace,
        class_prefix,
    )


def strip_marks(text, mapping=None):
    """Remove TextProv selectors and map PUA entries back to their base character."""
    mapping = mapping or default_mapping()
    return _strip(text, mapping.selectors, mapping.pua2base)
