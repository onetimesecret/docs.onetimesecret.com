# python/textprov/__init__.py

"""TextProv: put provenance marks in text, and read them back out.

    >>> import textprov
    >>> textprov.to_html("f\U000e0101")
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
    "runs",
    "segments",
    "strip_marks",
    "to_html",
]

from importlib.metadata import PackageNotFoundError
from importlib.metadata import version as _pkg_version

try:
    __version__ = _pkg_version("textprov")
except PackageNotFoundError:
    __version__ = "0.0.0+unknown"
