"""Explicit, lossy classification export without stripping existing Unicode.

This profile does not serialize voice identities. The companion report records
the caller's projection and the exact inserted-selector positions, so a round
trip removes only selectors this export introduced, including beside real IVS.
"""

import hashlib

from . import default_mapping, mark, segments
from .editing import markdown_protected


PROFILE = "experimental-vs-classification-v1"


def _hash(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def project(text, resolution, *, voice_states, profile=PROFILE,
            allow_lossy=False, markdown=True):
    """Project resolved supplied voices through an explicit human/ai mapping.

    Never normalize, strip, reinterpret, or overwrite pre-existing selectors or
    PUA characters. Unknown ranges get no new marks. Markdown syntax and code
    regions are protected by default. The report is required for exact recovery.
    """
    if profile != PROFILE:
        raise ValueError("unsupported export profile")
    if allow_lossy is not True:
        raise ValueError("classification export requires allow_lossy=true")
    if type(markdown) is not bool:
        raise ValueError("markdown must be a boolean")
    if not isinstance(text, str):
        raise ValueError("export text must be a string")
    if not isinstance(resolution, dict):
        raise ValueError("resolution must be an object")
    if (resolution.get("content_hash") != _hash(text)
            or resolution.get("scalar_length") != len(text)):
        raise ValueError("resolution does not describe export text")
    if not isinstance(voice_states, list) or len(voice_states) > 1000:
        raise ValueError("voice_states must be a list of at most 1000 mappings")
    projections = {}
    for entry in voice_states:
        if not isinstance(entry, dict) or set(entry) != {"voice_context", "voice_id", "state"}:
            raise ValueError("voice mapping requires voice_context, voice_id and state")
        context, voice, state = (entry["voice_context"], entry["voice_id"], entry["state"])
        if not all(isinstance(v, str) and v for v in (context, voice)) or state not in ("human", "ai"):
            raise ValueError("voice mappings need nonempty identities and human/ai state")
        key = (context, voice)
        if key in projections:
            raise ValueError("duplicate voice mapping")
        projections[key] = state

    clusters = []
    at = 0
    boundaries = {0}
    for cluster in segments(text):
        end = at + len(cluster)
        clusters.append((at, end, cluster))
        boundaries.add(end)
        at = end
    ranges = resolution.get("ranges")
    if not isinstance(ranges, list):
        raise ValueError("resolution ranges must be a list")
    previous = 0
    for entry in ranges:
        start, end = entry["range"]
        if (type(start) is not int or type(end) is not int or start != previous
                or start >= end or start not in boundaries or end not in boundaries):
            raise ValueError("resolution must partition text on grapheme boundaries")
        previous = end
        context, voice = entry.get("voice_context"), entry.get("voice_id")
        if (context is None) != (voice is None):
            raise ValueError("incomplete resolved voice")
        if voice is not None and (context, voice) not in projections:
            raise ValueError("missing explicit classification for resolved voice")
    if previous != len(text):
        raise ValueError("resolution must partition the complete text")

    protected = markdown_protected(text) if markdown else [False] * len(text)
    out, insertions, skipped = [], [], []
    index = 0
    output_offset = 0
    selectors = set(default_mapping().selectors.values())
    for start, end, cluster in clusters:
        while index < len(ranges) and ranges[index]["range"][1] <= start:
            index += 1
        entry = ranges[index]
        state = projections.get((entry.get("voice_context"), entry.get("voice_id")))
        rendered = cluster
        reason = None
        if state is None:
            reason = "unattributed"
        elif any(protected[start:end]):
            reason = "protected_syntax"
        elif any(ord(c) in selectors for c in cluster):
            reason = "existing_selector_preserved"
        else:
            rendered = mark(cluster, state=state, mode="vs")
            if rendered != cluster:
                # The shared producer appends one selector, preserving the cluster.
                if not rendered.startswith(cluster) or len(rendered) != len(cluster) + 1:
                    raise ValueError("producer did not preserve source cluster")
                insertions.append(output_offset + len(cluster))
            else:
                reason = "inert_or_existing_encoding"
        if reason:
            if skipped and skipped[-1]["reason"] == reason and skipped[-1]["range"][1] == start:
                skipped[-1]["range"][1] = end
            else:
                skipped.append({"range": [start, end], "reason": reason})
        out.append(rendered)
        output_offset += len(rendered)
    exported = "".join(out)
    return dict(profile=profile, lossy=True, text=exported,
                source_content_hash=_hash(text), export_content_hash=_hash(exported),
                voice_states=voice_states, inserted_at=insertions,
                unencoded_ranges=skipped,
                losses=["voice identity, context and claim evidence are not encoded in text"])


def restore(report):
    """Recover the original bytes from an unmodified export and its companion."""
    if not isinstance(report, dict):
        raise ValueError("export report must be an object")
    if report.get("profile") != PROFILE:
        raise ValueError("unsupported export profile")
    text = report.get("text")
    if not isinstance(text, str) or _hash(text) != report.get("export_content_hash"):
        raise ValueError("export content hash mismatch")
    positions = report.get("inserted_at")
    if not isinstance(positions, list) or any(type(p) is not int for p in positions):
        raise ValueError("inserted_at must be a list of scalar offsets")
    if positions != sorted(set(positions)):
        raise ValueError("inserted_at must be ordered and unique")
    selectors = set(default_mapping().selectors.values())
    if any(p < 0 or p >= len(text) or ord(text[p]) not in selectors for p in positions):
        raise ValueError("inserted_at does not identify inserted selectors")
    inserted = set(positions)
    source = "".join(c for i, c in enumerate(text) if i not in inserted)
    if _hash(source) != report.get("source_content_hash"):
        raise ValueError("restored content hash mismatch")
    return source
