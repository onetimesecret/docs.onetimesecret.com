"""Provider-neutral prose marking and mark-aware edits.

These functions process text only: callers supply any recorded human passages.
Markdown protection is a conservative heuristic, not a complete parser.
"""

from __future__ import annotations

import re
from bisect import bisect_left, bisect_right
from difflib import SequenceMatcher

from . import default_mapping, mark, runs, segments

MAPPING = default_mapping()
SELECTORS = set(MAPPING.selectors.values())
PUA = MAPPING.pua2base
HUMAN_MIN_WORDS = 5


def plain_map(raw):
    """Return `raw` without marks and, for each plain char, its index in `raw`."""
    plain, index = [], []
    for position, char in enumerate(raw):
        cp = ord(char)
        if cp in SELECTORS:
            continue
        entry = PUA.get(cp)
        plain.append(chr(entry[0]) if entry else char)
        index.append(position)
    return "".join(plain), index


def raw_span(raw, index, start, end):
    """The slice of `raw` holding plain[start:end] and the marks on it."""
    if start >= end:
        return ""
    first = index[start] if start else 0
    last = index[end] if end < len(index) else len(raw)
    return raw[first:last]


def common_affixes(old, new):
    """Lengths of the common prefix and suffix, cut back to whole words.

    "beta" and "delta" share "ta", but "delta" is one new word, not a new
    "del" in front of an old "ta".
    """
    limit = min(len(old), len(new))
    pre = 0
    while pre < limit and old[pre] == new[pre]:
        pre += 1
    suf = 0
    while suf < limit - pre and old[-1 - suf] == new[-1 - suf]:
        suf += 1

    def space(text, position):
        return not 0 <= position < len(text) or text[position].isspace()

    if not (space(old, pre) and space(new, pre)):
        while pre and not new[pre - 1].isspace():
            pre -= 1
    if not (space(old, len(old) - suf - 1) and space(new, len(new) - suf - 1)):
        while suf and not new[-suf].isspace():
            suf -= 1
    return pre, suf


def line_offsets(lines):
    offsets = [0]
    for line in lines:
        offsets.append(offsets[-1] + len(line))
    return offsets


def merge(old_raw, new_raw, carry, preserve_new_marks=False):
    """Align `new_raw` to `old_raw` and flag what is new.

    Lines are diffed on their unmarked text. Within a changed hunk the common
    prefix and suffix count as unchanged only for whole source clusters; the
    middle and copied cluster fragments are flagged. A character diff would
    call the letters a rewritten sentence happens to share unchanged.
    Returns (text, flags), one flag per code point of text.

    With `carry`, unchanged text is taken from `old_raw`, so marks the agent
    failed to retype survive. `preserve_new_marks` additionally retains supplied
    new marks where the unchanged old cluster had none; old marks win conflicts.
    Without carry `new_raw` is kept as found on disk.
    """
    old_plain, old_index = plain_map(old_raw)
    new_plain, new_index = plain_map(new_raw)
    old_boundaries = line_offsets(segments(old_plain))
    old_lines = old_plain.splitlines(True)
    new_lines = new_plain.splitlines(True)
    old_at = line_offsets(old_lines)
    new_at = line_offsets(new_lines)
    out, flags = [], []

    def emit(text, flag):
        out.append(text)
        flags.extend([flag] * len(text))

    def kept(old_range, new_range):
        start, end = old_range
        left = min(end, old_boundaries[bisect_left(old_boundaries, start)])
        right = max(left, old_boundaries[bisect_right(old_boundaries, end) - 1])
        # A kept fragment is not an unchanged cluster. In particular, deletion
        # can leave only whitespace with its old selector and no added text.
        emit(old_plain[start:left], True)
        if carry:
            retained = raw_span(old_raw, old_index, left, right)
            if preserve_new_marks and left < right:
                position = left
                pieces = []
                for cluster in segments(old_plain[left:right]):
                    stop = position + len(cluster)
                    original = raw_span(old_raw, old_index, position, stop)
                    offset = new_range[0] - start
                    supplied = raw_span(new_raw, new_index,
                                        position + offset, stop + offset)
                    old_marked = any(ord(c) in SELECTORS or ord(c) in PUA
                                     for c in original)
                    new_marked = any(ord(c) in SELECTORS or ord(c) in PUA
                                     for c in supplied)
                    pieces.append(supplied if new_marked and not old_marked else original)
                    position = stop
                retained = "".join(pieces)
            emit(retained, False)
        else:
            offset = new_range[0] - start
            emit(
                raw_span(new_raw, new_index, left + offset, right + offset),
                False,
            )
        emit(old_plain[right:end], True)

    matcher = SequenceMatcher(None, old_lines, new_lines, autojunk=False)
    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        a1, a2, b1, b2 = old_at[i1], old_at[i2], new_at[j1], new_at[j2]
        if tag == "equal":
            kept((a1, a2), (b1, b2))
        elif tag == "insert":
            emit(raw_span(new_raw, new_index, b1, b2), True)
        elif tag == "replace":
            pre, suf = common_affixes(old_plain[a1:a2], new_plain[b1:b2])
            kept((a1, a1 + pre), (b1, b1 + pre))
            emit(raw_span(new_raw, new_index, b1 + pre, b2 - suf), True)
            kept((a2 - suf, a2), (b2 - suf, b2))
    return "".join(out), flags


# --- markdown --------------------------------------------------------------

FENCE = re.compile(r" {0,3}(`{3,}|~{3,})")
HEADING = re.compile(r" {0,3}#{1,6}(\s|$)")
RULE = re.compile(r" {0,3}(=+|-+|([-*_])( *\2){2,})\s*$")
TABLE_RULE = re.compile(r"\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$")
DEFINITION = re.compile(r" {0,3}\[([^\]]+)\]:")
LEADER = re.compile(
    r"(\s*>)*(\s*(?:[-+*]|\d{1,9}[.)])(?=\s))*(\s+\[[ xX]\](?=\s))?\s*"
)
LIST_ITEM = re.compile(r"\s*(?:[-+*]|\d{1,9}[.)])\s")
RAW_BLOCKS = re.compile(
    r"<!--.*?-->|<(script|style|pre|code|textarea)\b.*?</\1\s*>",
    re.DOTALL | re.IGNORECASE,
)
# A CRLF is one line ending. Check escaped characters too, so an escaped
# newline cannot bypass the blank-line limit.
MATH_CHAR = r"(?!(?:\r\n|\r(?!\n)|\n)[^\S\r\n]*(?:\r\n|\r|\n))."
MATH_CONTENT = rf"(?:\\{MATH_CHAR}|(?![\\$]){MATH_CHAR})+?"
INLINE = [
    # code span
    re.compile(r"(?<!`)(`+)(?!`)(?:(?!\n\s*\n).)+?(?<!`)\1(?!`)", re.DOTALL),
    # Display math permits delimiter-adjacent whitespace. Neither form crosses
    # a blank line; escaped dollars are content, not delimiters.
    re.compile(
        r"(?<![\\$])\$\$(?!\$)" + MATH_CONTENT + r"\$\$(?!\$)",
        re.DOTALL,
    ),
    # Pandoc tex_math_dollars: no space after the opening or before the closing
    # dollar, and no digit after the closing dollar (currency stays prose).
    re.compile(
        r"(?<![\\$])\$(?![\s$])" + MATH_CONTENT + r"(?<!\s)\$(?![\d$])",
        re.DOTALL,
    ),
    # link or image destination, second label of a reference link, footnote
    re.compile(r"\]\((?:[^()\\\n]|\\.|\([^()\n]*\))*\)"),
    re.compile(r"\]\[[^\]\n]*\]"),
    re.compile(r"\[[\^!][^\]\n]+\]"),
    # autolink, bare URL, HTML tag, entity, backslash escape
    re.compile(r"<[A-Za-z][A-Za-z0-9+.-]*:[^<>\s]*>|<[^<>\s@]+@[^<>\s]+>"),
    re.compile(r"\b(?:https?://|www\.)[^\s<>)\]]+"),
    re.compile(r"</?[A-Za-z][^<>\n]*>"),
    re.compile(r"&(?:#\d+|#[xX][0-9A-Fa-f]+|[A-Za-z][A-Za-z0-9]*);"),
    re.compile(r"\\."),
    # characters that are, or may begin, inline syntax
    re.compile(r"[*_~`\[\]<|]|!(?=\[)"),
]


def markdown_protected(plain):
    """One flag per code point: true where a mark could change how it parses."""
    protected = [False] * len(plain)

    def protect(start, end):
        protected[start:end] = [True] * (end - start)

    lines = plain.splitlines(True)
    at = line_offsets(lines)
    whole = [False] * len(lines)

    labels = set()
    fence = None
    in_list = False
    previous_blank = True
    previous_code = False
    front_matter = (
        bool(lines)
        and lines[0].strip() == "---"
        and any(line.strip() in ("---", "...") for line in lines[1:])
    )
    for number, line in enumerate(lines):
        blank = not line.strip()
        if front_matter:
            whole[number] = True
            if number and line.strip() in ("---", "..."):
                front_matter = False
            continue
        if fence:
            whole[number] = True
            closing = FENCE.match(line)
            if (
                closing
                and closing.group(1)[0] == fence[0]
                and len(closing.group(1)) >= len(fence)
                and not line[closing.end() :].strip()
            ):
                fence = None
            continue
        opening = FENCE.match(line)
        if opening:
            fence = opening.group(1)
            whole[number] = True
            previous_blank = previous_code = False
            continue
        indented = line.startswith(("    ", "\t")) and not blank
        if indented and not in_list and (previous_blank or previous_code):
            whole[number] = True
            previous_code, previous_blank = True, False
            continue
        if not blank:
            previous_code = False
            if LIST_ITEM.match(line):
                in_list = True
            elif not line[0].isspace():
                in_list = False
        definition = DEFINITION.match(line)
        rule = RULE.match(line)
        if rule:
            whole[number] = True
            # Only a run of = or - underlines a setext heading; a thematic
            # break (***, ___, - - -) leaves the line above it prose.
            if number and not previous_blank and not rule.group(2):
                whole[number - 1] = True  # setext heading text
        elif HEADING.match(line) or TABLE_RULE.match(line):
            whole[number] = True
        elif definition and not definition.group(1).startswith("^"):
            labels.add(definition.group(1).strip().lower())
            whole[number] = True
        elif definition:
            protect(at[number], at[number] + definition.end())
        else:
            leader = LEADER.match(line)
            if leader:
                protect(at[number], at[number] + leader.end())
        previous_blank = blank

    for number, flag in enumerate(whole):
        if flag:
            protect(at[number], at[number + 1])

    for match in RAW_BLOCKS.finditer(plain):
        protect(match.start(), match.end())

    # Inline syntax, within each stretch of lines that is not wholly protected.
    number = 0
    while number < len(lines):
        if whole[number]:
            number += 1
            continue
        first = number
        while number < len(lines) and not whole[number]:
            number += 1
        base = at[first]
        block = plain[base : at[number]]
        for pattern in INLINE:
            for match in pattern.finditer(block):
                protect(base + match.start(), base + match.end())
        if labels:
            for match in re.finditer(r"\[([^\]\n]+)\]", block):
                if match.group(1).strip().lower() in labels:
                    protect(base + match.start(), base + match.end())
    return protected


# --- the prompt log -----------------------------------------------------------

WORD = re.compile(r"\S+")
BLOCK_MARKERS = {">", "-", "*", "+"}


def words_of(text):
    return [
        match
        for match in WORD.finditer(text)
        if match.group() not in BLOCK_MARKERS
    ]


def human_shingles(marked_texts, min_words=HUMAN_MIN_WORDS):
    """Build word windows from human-marked runs in supplied text strings."""
    if min_words < 1:
        raise ValueError("min_words must be positive")
    shingles = set()
    for text in marked_texts:
        for state, run in runs(text, strip=True):
            if state != "human":
                continue
            words = [match.group() for match in words_of(run)]
            for start in range(len(words) - min_words + 1):
                shingles.add(tuple(words[start : start + min_words]))
    return shingles


def human_mask(plain, added, shingles, min_words):
    """Flag added text that repeats a recorded prompt word for word."""
    human = [False] * len(plain)
    if not shingles:
        return human
    words = [
        match
        for match in words_of(plain)
        if all(added[match.start() : match.end()])
    ]
    size = min_words
    for start in range(len(words) - size + 1):
        window = words[start : start + size]
        if tuple(match.group() for match in window) in shingles:
            first, last = window[0].start(), window[-1].end()
            # A word that was not added breaks the window apart.
            if all(
                added[k] for k in range(first, last) if not plain[k].isspace()
            ):
                human[first:last] = [True] * (last - first)
    return human


# --- marking ---------------------------------------------------------------


def finalize(raw, flags, markdown, shingles, min_words):
    """Mark the flagged, unprotected clusters of `raw`; leave the rest alone."""
    plain, index = plain_map(raw)
    added = [flags[position] for position in index]
    protected = markdown_protected(plain) if markdown else [False] * len(plain)
    human = human_mask(plain, added, shingles, min_words)
    out = []
    start = 0
    # Marks can interrupt a join (Hangul, RI pairs) or sit before a newly added
    # combining mark. Segment the plain result, not the stale marked spelling.
    for cluster in segments(plain):
        end = start + len(cluster)
        text = raw_span(raw, index, start, end)
        if any(added[start:end]):
            last = index[end] if end < len(index) else len(raw)
            supplied_mark = (
                all(added[start:end])
                and flags[last - 1]
                and (
                    (len(text) == 1 and ord(text) in PUA)
                    or (ord(text[-1]) in SELECTORS and text[:-1] == cluster)
                )
                and mark(cluster) != cluster
            )
            if not supplied_mark:
                # A changed cluster cannot inherit an old claim on any part of
                # it. The producer enforces whitespace/control eligibility.
                state = "human" if all(human[start:end]) else "ai"
                text = (
                    cluster
                    if any(protected[start:end])
                    else mark(cluster, state=state)
                )
        out.append(text)
        start = end
    return "".join(out)


def remark(
    old_raw,
    new_raw,
    markdown=True,
    carry=True,
    shingles=None,
    min_words=HUMAN_MIN_WORDS,
    preserve_new_marks=False,
):
    """Mark added prose, preserving old marks when carry is true.

    Without shingles, all new eligible text is AI-labelled. Supply windows
    from human_shingles to label verbatim human passages instead.
    """
    if min_words < 1:
        raise ValueError("min_words must be positive")
    if shingles is None:
        shingles = set()
    text, flags = merge(old_raw, new_raw, carry, preserve_new_marks=preserve_new_marks)
    return finalize(text, flags, markdown, shingles, min_words)


class Ambiguous(Exception):
    pass


def edit_bounds(plain, start, end, replacement, boundaries):
    """Expand an edit to boundaries shared by the source and final clusters."""
    after = plain[:start] + replacement + plain[end:]
    final_boundaries = line_offsets(segments(after))
    delta = len(replacement) - (end - start)
    first, last = start, end
    while True:
        a = boundaries[bisect_right(boundaries, first) - 1]
        b = boundaries[bisect_left(boundaries, last)]
        first = final_boundaries[bisect_right(final_boundaries, a) - 1]
        last = (
            final_boundaries[bisect_left(final_boundaries, b + delta)] - delta
        )
        if (first, last) == (a, b):
            return first, last


def rewrite_edit(
    raw,
    old_string,
    new_string,
    replace_all=False,
    shingles=None,
    min_words=HUMAN_MIN_WORDS,
    preserve_new_marks=False,
):
    """Translate a replacement so it applies to a marked file and marks what it adds.

    Returns (old_string, new_string) to apply to the raw text, or None when
    `old_string` is absent and the tool should report that itself. The pair may
    include neighbouring context so source and final graphemes stay whole.
    """
    if min_words < 1:
        raise ValueError("min_words must be positive")
    if shingles is None:
        shingles = set()
    plain, index = plain_map(raw)
    needle, _ = plain_map(old_string)
    if not needle:
        return None
    found = []
    start = plain.find(needle)
    while start != -1:
        found.append(start)
        start = plain.find(needle, start + len(needle))
    if not found:
        return None
    if len(found) > 1 and not replace_all:
        raise Ambiguous(
            f"old_string matches {len(found)} places in the file once "
            "provenance marks are ignored. Add surrounding context to make "
            "it unique, or use replace_all."
        )
    boundaries = line_offsets(segments(plain))
    replacement, _ = plain_map(new_string)
    results = set()
    previous_last = -1
    for start in found:
        end = start + len(needle)
        a, b = edit_bounds(plain, start, end, replacement, boundaries)
        first = index[a] if a else 0
        last = index[b] if b < len(index) else len(raw)
        if first < previous_last:
            raise Ambiguous(
                "replace_all would touch overlapping grapheme clusters. "
                "Edit them one at a time."
            )
        previous_last = last
        # Unchanged context is restored by merge; changed context must not
        # bring the source cluster's selector into the replacement.
        expanded = plain[a:start] + new_string + plain[end:b]
        if a < start or b > end:
            expanded_plain, expanded_index = plain_map(expanded)
            new_start = start - a
            new_end = new_start + len(replacement)
            parts, position = [], 0
            for cluster in segments(expanded_plain):
                stop = position + len(cluster)
                # A supplied mark on only part of a joined cluster cannot
                # assert the state of the source context it joined.
                joins_context = (
                    position < new_end
                    and stop > new_start
                    and (position < new_start or stop > new_end)
                )
                parts.append(
                    cluster
                    if joins_context
                    else raw_span(expanded, expanded_index, position, stop)
                )
                position = stop
            expanded = "".join(parts)
        text, flags = merge(raw[first:last], expanded, carry=True,
                            preserve_new_marks=preserve_new_marks)
        tail = len(raw) - last
        whole = finalize(
            raw[:first] + text + raw[last:],
            [False] * first + flags + [False] * tail,
            True,
            shingles,
            min_words,
        )
        results.add((raw[first:last], whole[first : len(whole) - tail]))
    if len(results) > 1:
        raise Ambiguous(
            "replace_all would touch occurrences that carry different "
            "provenance marks or sit in different grapheme or markdown "
            "contexts. Edit them one at a time."
        )
    return results.pop()
