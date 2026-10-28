"""Explicit supplied-claim transfer; comparison never supplies authorship.

This policy projects selected existing claims through one explicitly selected
passage candidate. All coordinates refer to the original captured text.
"""

from .attribution import comparison_view
from ._grapheme import segments


TRANSFER_POLICY = "supplied-claims-v1"


def _voice(claim):
    return tuple(claim[name] for name in
                 ("voice_context", "voice_id", "voice_definition"))


def resolve_claims(claims, scalar_length):
    """Return complete, nonoverlapping ranges, refusing incompatible claims.

    Compatible overlapping claims retain all supporting IDs. Unknown ranges
    explicitly carry null voice fields; a channel never fills these gaps.
    """
    if type(scalar_length) is not int or scalar_length < 0:
        raise ValueError("observation has no captured scalar length")
    definitions = {}
    points = {0, scalar_length}
    for claim in claims:
        start, end = claim["range"]
        if type(start) is not int or type(end) is not int or not 0 <= start < end <= scalar_length:
            raise ValueError("claim has invalid scalar range")
        voice = _voice(claim)
        if any(not isinstance(item, str) or not item for item in voice):
            raise ValueError("claim has invalid supplied voice")
        identity = voice[:2]
        if identity in definitions and definitions[identity] != voice[2]:
            raise ValueError("conflicting definitions for supplied voice")
        definitions[identity] = voice[2]
        points.update((start, end))
    ranges = []
    points = sorted(points)
    for start, end in zip(points, points[1:]):
        active = [claim for claim in claims
                  if claim["range"][0] <= start and end <= claim["range"][1]]
        voices = {_voice(claim) for claim in active}
        if len(voices) > 1:
            raise ValueError("conflicting overlapping attribution claims")
        voice = next(iter(voices)) if voices else (None, None, None)
        claim_ids = sorted({claim["claim_id"] for claim in active})
        if ranges and _voice(ranges[-1]) == voice and ranges[-1]["range"][1] == start:
            ranges[-1]["range"][1] = end
            ranges[-1]["claim_ids"] = sorted(set(ranges[-1]["claim_ids"]) | set(claim_ids))
        else:
            ranges.append(dict(range=[start, end], voice_context=voice[0],
                               voice_id=voice[1], voice_definition=voice[2],
                               claim_ids=claim_ids))
    return ranges


def project_claims(source, target, candidate, source_claims, comparison_policy):
    """Project only whole supplied source graphemes through a selected match.

    Selected source claims must not overlap. Normalized comparison offsets are
    used only to map between original segments, never as resulting claim ranges.
    Removed indentation and unclaimed source text remain unattributed.
    """
    ordered = sorted(source_claims, key=lambda claim: claim["range"])
    for previous, current in zip(ordered, ordered[1:]):
        if previous["range"][1] > current["range"][0]:
            raise ValueError("selected source claims overlap")
    # Check voice definitions even when disjoint claims use the same voice ID.
    resolve_claims(source_claims, len(source))
    a = comparison_view(source, policy=comparison_policy)
    b = comparison_view(target, policy=comparison_policy)
    left, end = candidate["source_comparison_range"]
    right, target_end = candidate["target_comparison_range"]
    if a.text[left:end] != b.text[right:target_end]:
        raise ValueError("candidate comparison text differs")
    projected = []
    for cluster in segments(a.text[left:end]):
        size = len(cluster)
        original_source = a.original_segments(left, left + size)
        original_target = b.original_segments(right, right + size)
        if original_source is None or original_target is None:
            raise ValueError("candidate mapping splits a grapheme cluster")
        covering = [claim for claim in ordered if all(
            claim["range"][0] <= start and stop <= claim["range"][1]
            for start, stop in original_source)]
        if len(covering) > 1:
            raise ValueError("selected source coverage is ambiguous")
        if covering:
            claim = covering[0]
            for start, stop in original_target:
                voice = _voice(claim)
                if (projected and _voice(projected[-1]) == voice
                        and projected[-1]["range"][1] == start
                        and projected[-1]["supporting_claim_ids"] == [claim["claim_id"]]):
                    projected[-1]["range"][1] = stop
                else:
                    projected.append(dict(range=[start, stop], voice_context=voice[0],
                                          voice_id=voice[1], voice_definition=voice[2],
                                          supporting_claim_ids=[claim["claim_id"]]))
        left += size
        right += size
    if not projected:
        raise ValueError("selected passage has no supplied attribution")
    return projected
