"""Shared comparison policies and passage candidates; never infer authorship.

All offsets are half-open Unicode scalar offsets. Comparison views are temporary:
original text, hashes, and chronicle observations are never rewritten.
"""

from collections import Counter, defaultdict
from dataclasses import dataclass
import hashlib

from ._grapheme import segments

POLICIES = ("exact-v1", "line-endings-v1", "common-indent-v1")
MAX_PARTIAL_PAIRS = 1_000_000
MAX_CANDIDATES = 1000


def boundaries(text):
    result, offset = {0}, 0
    for cluster in segments(text):
        offset += len(cluster)
        result.add(offset)
    return result


def validate_options(policy, partial, min_match_chars):
    if policy not in POLICIES:
        raise ValueError("unknown comparison policy")
    if type(partial) is not bool:
        raise ValueError("partial must be a boolean")
    if type(min_match_chars) is not int or min_match_chars < 1:
        raise ValueError("min_match_chars must be a positive integer")


@dataclass(frozen=True)
class ComparisonView:
    text: str
    # Each comparison scalar maps to a half-open original scalar range.
    origins: tuple
    original_boundaries: frozenset

    def original_segments(self, start, end):
        """Map a nonempty comparison range, retaining gaps from removed text.

        Return None when the range would split an original grapheme.
        """
        if not 0 <= start < end <= len(self.text):
            raise ValueError("invalid comparison range")
        result = []
        for left, right in self.origins[start:end]:
            if result and left <= result[-1][1]:
                result[-1][1] = max(right, result[-1][1])
            else:
                result.append([left, right])
        if any(a not in self.original_boundaries or b not in self.original_boundaries
               for a, b in result):
            return None
        return result


def comparison_view(text, *, policy="exact-v1"):
    """Build a mapped view using a named, fixed-order comparison policy.

    line-endings-v1 converts CRLF and lone CR to LF.
    common-indent-v1 also removes the longest shared literal spaces/tabs prefix
    of nonblank lines, independently for each block. It does not expand tabs,
    trim trailing spaces, normalize Unicode, or remove host-specific wrappers.
    """
    if not isinstance(text, str):
        raise ValueError("text must be a string")
    text.encode("utf-8")
    validate_options(policy, False, 1)
    chars, origins, i = [], [], 0
    while i < len(text):
        end = i + 1
        char = text[i]
        if policy != "exact-v1" and char == "\r":
            if end < len(text) and text[end] == "\n":
                end += 1
            char = "\n"
        chars.append(char)
        origins.append((i, end))
        i = end

    if policy == "common-indent-v1":
        normalized = "".join(chars)
        lines = normalized.split("\n")
        prefixes = []
        for line in lines:
            if line.strip(" \t"):
                prefixes.append(line[:len(line) - len(line.lstrip(" \t"))])
        prefix = prefixes[0] if prefixes else ""
        for other in prefixes[1:]:
            shared = 0
            for left, right in zip(prefix, other):
                if left != right:
                    break
                shared += 1
            prefix = prefix[:shared]
            if not prefix:
                break
        if prefix:
            keep, offset = [], 0
            for line in lines:
                removed = len(prefix) if line.startswith(prefix) else 0
                keep.extend(range(offset + removed, offset + len(line)))
                offset += len(line)
                if offset < len(chars):
                    keep.append(offset)  # Preserve the newline.
                offset += 1
            chars = [chars[j] for j in keep]
            origins = [origins[j] for j in keep]
    return ComparisonView("".join(chars), tuple(origins), frozenset(boundaries(text)))


def match_passages(source, target, *, policy="exact-v1", partial=False,
                   min_match_chars=16):
    """Return unselected full-block or maximal contiguous partial candidates.

    Partial mode enumerates maximal equal grapheme runs at every alignment,
    including repeated alternatives. It does not stitch runs across changed text.
    Limits return limit_exceeded with no candidates, never a misleading subset.
    """
    validate_options(policy, partial, min_match_chars)
    a, b = comparison_view(source, policy=policy), comparison_view(target, policy=policy)
    result = dict(policy=policy, partial=partial, min_match_chars=min_match_chars,
                  candidates=[])
    if not a.text:
        return dict(result, status="empty_source")
    candidates = []
    source_hash = hashlib.sha256(source.encode("utf-8")).hexdigest()
    target_hash = hashlib.sha256(target.encode("utf-8")).hexdigest()

    def add(left, right, size):
        source_segments = a.original_segments(left, left + size)
        target_segments = b.original_segments(right, right + size)
        if source_segments is None or target_segments is None:
            return
        candidates.append(dict(
            source_range=[source_segments[0][0], source_segments[-1][1]],
            target_range=[target_segments[0][0], target_segments[-1][1]],
            source_segments=source_segments, target_segments=target_segments,
            source_comparison_range=[left, left + size],
            target_comparison_range=[right, right + size],
            source_hash=source_hash, target_hash=target_hash, policy=policy,
            method="exact" if policy == "exact-v1" else "normalized",
            basis="text_equality" if policy == "exact-v1" else "normalized_text_equality",
            source_coverage="full" if left == 0 and size == len(a.text) else "partial",
            matched_chars=size, selected=False))

    if not partial:
        target_boundaries = boundaries(b.text)
        start = 0
        while True:
            start = b.text.find(a.text, start)
            if start < 0:
                break
            if start in target_boundaries and start + len(a.text) in target_boundaries:
                add(0, start, len(a.text))
            if len(candidates) > MAX_CANDIDATES:
                return dict(result, status="limit_exceeded", limit="candidates")
            start += 1
    else:
        # Grapheme tokens keep both comparison endpoints cluster-aligned.
        aa, bb = segments(a.text), segments(b.text)
        ca, cb = Counter(aa), Counter(bb)
        if sum(count * cb[token] for token, count in ca.items()) > MAX_PARTIAL_PAIRS:
            return dict(result, status="limit_exceeded", limit="partial_pairs")
        offsets_a, offsets_b = [0], [0]
        for token in aa:
            offsets_a.append(offsets_a[-1] + len(token))
        positions = defaultdict(list)
        for j, token in enumerate(bb):
            offsets_b.append(offsets_b[-1] + len(token))
            positions[token].append(j)
        for i, token in enumerate(aa):
            for j in positions[token]:
                if i and j and aa[i - 1] == bb[j - 1]:
                    continue  # This alignment's maximal run starts earlier.
                size = 1
                while i + size < len(aa) and j + size < len(bb) and aa[i + size] == bb[j + size]:
                    size += 1
                length = offsets_a[i + size] - offsets_a[i]
                if length >= min_match_chars:
                    add(offsets_a[i], offsets_b[j], length)
                if len(candidates) > MAX_CANDIDATES:
                    return dict(result, status="limit_exceeded", limit="candidates")
    return dict(result, status="ambiguous" if len(candidates) > 1 else "searched",
                candidates=candidates)
