# python/textprov/__init__.py

"""TextProv: put provenance marks in text, and read them back out.

    >>> import textprov
    >>> textprov.to_html("f\U000e0101", display="exact")
    '<span class="prov prov-ai" data-prov="ai">f\U000e0101</span>'

    >>> textprov.mark("hi", state="ai") == "h\U000e0101i\U000e0101"
    True

This package implements the experimental VS/classification and replacement-PUA
baseline. Its mapping does not allocate characters for the voice-attribution
proposal. See experiments/baseline/README.md and python/README.md.
"""

from ._core import (
    SPEC_VERSION,
    UNICODE_VERSION,
    GENERATED_STATES,
    Mapping,
    default_mapping,
    load_mapping,
    runs,
    segments,
    strip_marks,
    to_html,
)
from ._encode import convert, inspect, mark, mark_added
from ._display import stylesheet

__all__ = [
    "SPEC_VERSION",
    "UNICODE_VERSION",
    "GENERATED_STATES",
    "Mapping",
    "convert",
    "default_mapping",
    "inspect",
    "load_mapping",
    "mark",
    "mark_added",
    "mark_chat",
    "mark_chat_parts",
    "mark_document",
    "mark_document_edit",
    "runs",
    "segments",
    "strip_marks",
    "stylesheet",
    "to_html",
]

from ._version import __version__


def mark_chat(text, role, scope="prose"):
    """Apply the chat speaker policy at the selected scope, preserving marks."""
    from .marking import mark_chat as operation
    return operation(text, role, scope=scope)


def mark_chat_parts(parts, role, scope="prose"):
    """Mark complete chat text across parts, retaining their original boundaries."""
    from .marking import mark_chat_parts as operation
    return operation(parts, role, scope=scope)


def mark_document(text):
    """Mark new AI document prose while preserving marks and protected syntax."""
    from .marking import mark_document as operation
    return operation(text)


def mark_document_edit(old_text, new_text):
    """Mark AI document changes and carry unchanged existing marks."""
    from .marking import mark_document_edit as operation
    return operation(old_text, new_text)
