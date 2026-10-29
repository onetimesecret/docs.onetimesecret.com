#!/usr/bin/env python3
"""Build a separately named P* font from a dotted P+ TrueType font.

Only ordinary spaces bounded by explicit AI glyphs receive contextual dots.
No characters, selector mappings, existing outlines, or advances are changed.
Requires fonttools; writes a new file and never installs or overwrites a font.
"""

import argparse
from copy import deepcopy
import math
from pathlib import Path

from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont


CANDIDATE = "space.provenance.candidate"
BRIDGE = "space.provenance.ai"


def language_systems(table):
    for record in table.ScriptList.ScriptRecord:
        if record.Script.DefaultLangSys is not None:
            yield record.Script.DefaultLangSys
        for language in record.Script.LangSysRecord:
            yield language.LangSys


def merge_gsub(original, addition):
    """Append lookups and preserve every original feature/language association."""
    if original is None:
        return addition
    table, extra = deepcopy(original.table), deepcopy(addition.table)
    if getattr(table, "FeatureVariations", None) is not None:
        raise ValueError("conditional GSUB features need a separate merge review")
    if any(record.FeatureTag == "rclt" for record in table.FeatureList.FeatureRecord):
        raise ValueError("an existing rclt feature needs a separate merge review")
    offset = len(table.LookupList.Lookup)

    def shift_records(value):
        if isinstance(value, (list, tuple)):
            for item in value:
                shift_records(item)
        elif hasattr(value, "__dict__"):
            if value.__class__.__name__ == "SubstLookupRecord":
                value.LookupListIndex += offset
            else:
                for item in value.__dict__.values():
                    shift_records(item)

    shift_records(extra.LookupList.Lookup)
    table.LookupList.Lookup.extend(extra.LookupList.Lookup)
    table.LookupList.LookupCount = len(table.LookupList.Lookup)
    added = extra.FeatureList.FeatureRecord[0]
    added.Feature.LookupListIndex = [index + offset for index in added.Feature.LookupListIndex]
    old_records = list(table.FeatureList.FeatureRecord)
    records = sorted(old_records + [added], key=lambda record: record.FeatureTag)
    remap = {index: next(i for i, candidate in enumerate(records) if candidate is record)
             for index, record in enumerate(old_records)}
    new_index = next(i for i, record in enumerate(records) if record is added)
    for language in language_systems(table):
        language.FeatureIndex = [remap[index] for index in language.FeatureIndex] + [new_index]
        language.FeatureCount = len(language.FeatureIndex)
        if language.ReqFeatureIndex != 0xFFFF:
            language.ReqFeatureIndex = remap[language.ReqFeatureIndex]
    table.FeatureList.FeatureRecord = records
    table.FeatureList.FeatureCount = len(records)
    result = deepcopy(original)
    result.table = table
    return result


def space_dots(font, width, strips):
    """Retain an exact strip when possible; otherwise fit dots to space width."""
    glyf = font["glyf"]
    matching = f"provenance.mark.ai.{width}"
    if matching in strips:
        return deepcopy(glyf[matching])
    template = max((glyf[name] for name in strips), key=lambda glyph: glyph.yMax - glyph.yMin)
    em = font["head"].unitsPerEm
    count = max(1, int(round(width / (em / 6))))
    pitch = width / count
    radius = min(em / 32, (template.yMax - template.yMin) / 2, pitch / 4)
    pen = TTGlyphPen(None)
    for index in range(count):
        cx, cy = (index + .5) * pitch, template.yMin + radius
        pen.moveTo((cx, cy + radius))
        for corner in range(1, 8):
            angle = corner * math.pi / 4
            pen.lineTo((cx + radius * math.sin(angle), cy + radius * math.cos(angle)))
        pen.closePath()
    return pen.glyph()


def build(source, output):
    source, output = Path(source), Path(output)
    if source.resolve() == output.resolve() or output.exists():
        raise ValueError("choose a new output file; existing fonts are never overwritten")
    font = TTFont(source, recalcTimestamp=False, recalcBBoxes=False)
    if "glyf" not in font or "fvar" in font or "COLR" in font:
        raise ValueError("expected a static monochrome TrueType P+ font")
    if not (font["name"].getDebugName(1) or "").endswith(" P+"):
        raise ValueError("expected a P+ family")
    uvs = next((t for t in font["cmap"].tables if t.format == 14), None)
    if uvs is None or not uvs.uvsDict.get(0xE0101):
        raise ValueError("missing the legacy explicit AI selector")
    variants = {variant for _, variant in uvs.uvsDict[0xE0101]}
    if None in variants:
        raise ValueError("expected explicit AI variant names")
    ai = sorted(variants)
    glyf, metrics = font["glyf"], font["hmtx"]
    space = font.getBestCmap()[0x20]
    if glyf[space].numberOfContours != 0:
        raise ValueError("ordinary space must be blank")
    width = metrics[space][0]
    strips = {name for name in font.getGlyphOrder() if name.startswith("provenance.mark.ai.")}
    if not strips or width <= 0:
        raise ValueError("expected dotted AI strips and a positive space advance")
    for strip in strips:
        if glyf[strip].numberOfContours < 1:
            raise ValueError("expected an existing dotted AI strip")
        _, ends, _ = glyf[strip].getCoordinates(glyf)
        if any(end - start != 8 for start, end in zip([0] + [x + 1 for x in ends[:-1]], [x + 1 for x in ends])):
            raise ValueError("expected eight-point round dot contours")
    for variant in ai:
        glyph = glyf[variant]
        if not glyph.isComposite() or not any(c.glyphName.startswith("provenance.mark.ai.") for c in glyph.components):
            raise ValueError(f"{variant}: not a dotted AI glyph")
    if CANDIDATE in glyf or BRIDGE in glyf:
        raise ValueError("P* bridge glyph names already exist")
    order = list(font.getGlyphOrder())
    glyf[CANDIDATE] = deepcopy(glyf[space])
    glyf[BRIDGE] = space_dots(font, width, strips)
    glyf[BRIDGE].recalcBounds(glyf)
    metrics[CANDIDATE] = metrics[space]
    metrics[BRIDGE] = metrics[space]
    font.setGlyphOrder(order + [CANDIDATE, BRIDGE])
    # Reverse pass finds arbitrary-length space runs ending in AI. Forward
    # pass paints them only when they also begin in AI. Final pass restores
    # any remaining blank candidates, including all leading indentation.
    features = f"""
languagesystem DFLT dflt;
languagesystem latn dflt;
@AI = [{' '.join(ai)}];
lookup FindRightBoundary {{
    rsub {space}' [@AI {CANDIDATE}] by {CANDIDATE};
}} FindRightBoundary;
lookup JoinFromLeftBoundary {{
    sub [@AI {BRIDGE}] {CANDIDATE}' by {BRIDGE};
}} JoinFromLeftBoundary;
lookup RestoreBlankSpaces {{
    sub {CANDIDATE} by {space};
}} RestoreBlankSpaces;
feature rclt {{
    lookup FindRightBoundary;
    lookup JoinFromLeftBoundary;
    lookup RestoreBlankSpaces;
}} rclt;
"""
    original_gsub = deepcopy(font["GSUB"]) if "GSUB" in font else None
    addOpenTypeFeaturesFromString(font, features, tables=["GSUB"])
    font["GSUB"] = merge_gsub(original_gsub, font["GSUB"])
    for record in font["name"].names:
        if record.nameID in (1, 3, 4, 16, 18, 21):
            record.string = record.toUnicode().replace("P+", "P*").encode(record.getEncoding())
        elif record.nameID == 6:
            # Stable machine identifiers use PStar; UI names retain P*.
            record.string = record.toUnicode().replace("P+", "PStar").encode(record.getEncoding())
        elif record.nameID == 5:
            record.string = (record.toUnicode() + ";TextProv PStar 1").encode(record.getEncoding())
    output.parent.mkdir(parents=True, exist_ok=True)
    font.save(output)
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    print(build(args.source, args.output))


if __name__ == "__main__":
    main()
