# python/textprov/_grapheme.py

"""Extended grapheme cluster segmentation (UAX #29).

The segmenter reads the property tables in `_ucd.py`, generated from one
pinned Unicode version, instead of whatever the interpreter's `unicodedata`
ships. Every port segments from the same tables, so a cluster marked by one
decodes as one cluster in the others. Rule numbers below refer to UAX #29,
Grapheme Cluster Boundary Rules.
"""

from bisect import bisect_right

from ._ucd import BOUNDS, CODES, EXTENDED_PICTOGRAPHIC, GCB, INCB, UNICODE_VERSION

__all__ = ["UNICODE_VERSION", "segments"]

_CR, _LF, _CONTROL = GCB["CR"], GCB["LF"], GCB["Control"]
_EXTEND, _ZWJ, _RI = GCB["Extend"], GCB["ZWJ"], GCB["Regional_Indicator"]
_PREPEND, _SPACING_MARK = GCB["Prepend"], GCB["SpacingMark"]
_L, _V, _T, _LV, _LVT = GCB["L"], GCB["V"], GCB["T"], GCB["LV"], GCB["LVT"]
_CONTROL_LIKE = {_CONTROL, _CR, _LF}
_CONSONANT, _LINKER, _INCB_EXTEND = INCB["Consonant"], INCB["Linker"], INCB["Extend"]
_GCB_MASK, _INCB_MASK = 15, 224


def _property(cp):
    """The property byte for one code point."""
    return CODES[bisect_right(BOUNDS, cp) - 1]


def _control_like(cp):
    """Whether GB4 forces a break after this code point, even before Extend."""
    return _property(cp) & _GCB_MASK in _CONTROL_LIKE


def segments(text):
    """Split `text` into extended grapheme clusters."""
    clusters = []
    if not text:
        return clusters
    current = text[0]
    previous = _property(ord(text[0]))
    regional_run = 1 if previous & _GCB_MASK == _RI else 0
    # 0: nothing; 1: Extended_Pictographic Extend*; 2: that followed by ZWJ.
    pictograph = 1 if previous & EXTENDED_PICTOGRAPHIC else 0
    # 0: nothing; 1: Consonant (Extend|Linker)* without a Linker yet;
    # 2: Consonant ... Linker (Extend|Linker)*.
    conjunct = 1 if previous & _INCB_MASK == _CONSONANT else 0
    for character in text[1:]:
        following = _property(ord(character))
        before = previous & _GCB_MASK
        after = following & _GCB_MASK
        if before == _CR and after == _LF:  # GB3
            join = True
        elif before in _CONTROL_LIKE or after in _CONTROL_LIKE:  # GB4, GB5
            join = False
        elif before == _L and after in (_L, _V, _LV, _LVT):  # GB6
            join = True
        elif before in (_LV, _V) and after in (_V, _T):  # GB7
            join = True
        elif before in (_LVT, _T) and after == _T:  # GB8
            join = True
        elif after in (_EXTEND, _ZWJ, _SPACING_MARK):  # GB9, GB9a
            join = True
        elif before == _PREPEND:  # GB9b
            join = True
        elif conjunct == 2 and following & _INCB_MASK == _CONSONANT:  # GB9c
            join = True
        elif pictograph == 2 and following & EXTENDED_PICTOGRAPHIC:  # GB11
            join = True
        elif before == _RI and after == _RI:  # GB12, GB13
            join = regional_run % 2 == 1
        else:  # GB999
            join = False

        if join:
            current += character
        else:
            clusters.append(current)
            current = character

        regional_run = regional_run + 1 if after == _RI else 0
        if following & EXTENDED_PICTOGRAPHIC:
            pictograph = 1
        elif pictograph == 1 and after == _EXTEND:
            pictograph = 1
        elif pictograph == 1 and after == _ZWJ:
            pictograph = 2
        else:
            pictograph = 0
        incb = following & _INCB_MASK
        if incb == _CONSONANT:
            conjunct = 1
        elif conjunct and incb == _LINKER:
            conjunct = 2
        elif conjunct and incb == _INCB_EXTEND:
            pass
        else:
            conjunct = 0
        previous = following
    clusters.append(current)
    return clusters
