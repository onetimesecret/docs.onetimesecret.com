#!/usr/bin/env python3
"""Verify a P* font against its P+ source with fontTools and hb-shape.

Usage: test_pstar.py ORIGINAL.ttf PSTAR.ttf
Checks original outlines/mappings/metrics and contextual space boundaries,
including every explicit AI base, both encodings, and long space runs.
"""

import argparse
from copy import deepcopy
import json
import subprocess
import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont

from build_pstar import BRIDGE, CANDIDATE, language_systems


def shape(font, texts, features=None):
    # hb-shape reads SFNT here; decompress WOFF2 without modifying the asset.
    if Path(font).suffix == ".woff2":
        with tempfile.TemporaryDirectory(prefix="pstar-shape-") as directory:
            sfnt = Path(directory) / "font.ttf"
            container = TTFont(font, recalcTimestamp=False)
            container.flavor = None
            container.save(sfnt)
            return shape(sfnt, texts, features)
    command = ["hb-shape", "--output-format=json", "--text-file=-"]
    if features:
        command.append(f"--features={features}")
    command.append(str(font))
    result = subprocess.run(command, input="\n".join(texts) + "\n", text=True,
                            capture_output=True, check=True)
    rows = [json.loads(line) for line in result.stdout.splitlines()]
    assert len(rows) == len(texts), "shaper did not return one row per sample"
    return rows


def check(original, patched):
    old, new = TTFont(original), TTFont(patched)
    order = old.getGlyphOrder()
    assert new.getGlyphOrder() == order + [CANDIDATE, BRIDGE], "original glyph IDs changed"
    assert new.getBestCmap() == old.getBestCmap(), "encoded mapping changed"
    for tag in ("cmap", "GDEF", "GPOS", "kern", "fpgm", "prep", "cvt "):
        assert (tag in old) == (tag in new), f"{tag}: table presence changed"
        if tag in old:
            assert new.getTableData(tag) == old.getTableData(tag), f"{tag}: changed"
    for name in order:
        assert new["hmtx"][name] == old["hmtx"][name], f"{name}: metrics changed"
        assert new["glyf"][name].compile(new["glyf"]) == old["glyf"][name].compile(old["glyf"]), f"{name}: original outline changed"
    for tag, fields in {
        "hhea": ("ascent", "descent", "lineGap"),
        "OS/2": ("sTypoAscender", "sTypoDescender", "sTypoLineGap", "usWinAscent", "usWinDescent"),
    }.items():
        for field in fields:
            assert getattr(new[tag], field) == getattr(old[tag], field), f"{tag}.{field}: changed"
    space = new.getBestCmap()[0x20]
    assert new["hmtx"][BRIDGE] == new["hmtx"][space], "space advance changed"
    assert new["glyf"][space].numberOfContours == 0, "plain space acquired ink"
    assert new["glyf"][BRIDGE].numberOfContours > 0, "bridge has no dot strip"
    assert new.flavor == old.flavor, "font container changed"
    if "GSUB" in old:
        restored = deepcopy(new["GSUB"])
        records = restored.table.FeatureList.FeatureRecord
        added = next(i for i, record in enumerate(records) if record.FeatureTag == "rclt")
        for language in language_systems(restored.table):
            language.FeatureIndex = [index - (index > added) for index in language.FeatureIndex if index != added]
            language.FeatureCount = len(language.FeatureIndex)
            if language.ReqFeatureIndex != 0xFFFF:
                language.ReqFeatureIndex -= language.ReqFeatureIndex > added
        del records[added]
        restored.table.FeatureList.FeatureCount = len(records)
        original_count = len(old["GSUB"].table.LookupList.Lookup)
        restored.table.LookupList.Lookup = restored.table.LookupList.Lookup[:original_count]
        restored.table.LookupList.LookupCount = original_count
        assert restored.compile(new) == old.getTableData("GSUB"), "original GSUB features or language associations changed"
    for name_id in (1, 3, 4):
        assert new["name"].getDebugName(name_id) == old["name"].getDebugName(name_id).replace("P+", "P*"), "P* name missing"
    assert new["name"].getDebugName(6) != old["name"].getDebugName(6), "PostScript identity collides"
    for name_id in (0, 13, 14):
        assert new["name"].getDebugName(name_id) == old["name"].getDebugName(name_id), "license metadata changed"

    uvs = next(t for t in old["cmap"].tables if t.format == 14).uvsDict
    ai = lambda s: "".join(c + "\U000e0101" if c != " " else c for c in s)
    cases = []
    # No cross-character shaping or registry changes in any original encoding.
    for selector, pairs in uvs.items():
        cases.extend((chr(base) + chr(selector), 0) for base, _ in pairs)
    variants = {variant for _, variant in uvs[0xE0101]}
    pua = {code: glyph for code, glyph in old.getBestCmap().items()
           if (0xE000 <= code <= 0xF8FF or 0xF0000 <= code <= 0xFFFFD or 0x100000 <= code <= 0x10FFFD)
           and glyph in variants}
    assert len(pua) == len(uvs[0xE0101]), "not every AI variant has a PUA sample"
    cases.extend((chr(code), 0) for code in pua)
    for base, _ in uvs[0xE0101]:
        cases.append((ai(chr(base) + " " + chr(base)), 1))
    for code in pua:
        cases.append((chr(code) + " " + chr(code), 1))
    for count in (1, 2, 3, 16, 257):
        cases.append((ai("AI") + " " * count + ai("run"), count))
        cases.append((" " * count + ai("AI") + " " * count, 0))
        cases.append((ai("AI") + " " * count + "plain", 0))
        cases.append(("plain" + " " * count + ai("AI"), 0))
    for separator in ("\t", "\u00a0", "\u200b", "\u2028"):
        cases.append((ai("AI") + separator + ai("run"), 0))
    # Missing thin spaces can be synthesized from the ordinary space glyph.
    cases.append((ai("AI") + "\u2009" + ai("run"), 0 if 0x2009 in old.getBestCmap() else 1))
    for selector in (0xE0100, 0xE0102):
        cases.append((ai("AI") + " " + "r" + chr(selector), 0))
        cases.append(("r" + chr(selector) + " " + ai("AI"), 0))
    cases += [(ai("one two") + " plain " + ai("three four"), 2), ("all plain text", 0)]
    cases += [("office affine AV To 1234", 0), ("ffi fi fl 1/2 (ABC)", 0)]
    texts = [text for text, _ in cases]
    before, after = shape(original, texts), shape(patched, texts)
    for (text, count), original_row, patched_row in zip(cases, before, after):
        assert sum(g["g"] == BRIDGE for g in patched_row) == count, f"wrong bridge boundary: {text!r}"
        assert not any(g["g"] == CANDIDATE for g in patched_row), "temporary glyph escaped cleanup"
        restored = [dict(g, g=space) if g["g"] == BRIDGE else g for g in patched_row]
        assert restored == original_row, f"shaping/advances changed beyond blank-space ink: {text!r}"
    # Existing optional features must also survive merging the bridge program.
    for features in ("liga=0,clig=0,calt=0", "liga=1,kern=1", "smcp=1,tnum=1", "frac=1,zero=1"):
        plain = ["office affine AV To 1234", "ffi fi fl 1/2 (ABC)"]
        assert shape(original, plain, features) == shape(patched, plain, features), f"existing features changed: {features}"
    # Ordinary terminal settings disabling optional ligatures must still work.
    optional_off = shape(patched, [ai("AI run")], "liga=0,clig=0,calt=0")[0]
    assert sum(g["g"] == BRIDGE for g in optional_off) == 1, "depends on optional ligatures"
    disabled = shape(patched, [ai("AI run")], "rclt=0")[0]
    assert not any(g["g"] == BRIDGE for g in disabled), "rclt opt-out failed"
    return {"font": Path(patched).name, "samples": len(cases), "original_glyphs_preserved": len(order),
            "ai_bases": len(uvs[0xE0101]), "ai_pua": len(pua), "result": "pass"}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("original", type=Path)
    parser.add_argument("patched", type=Path)
    args = parser.parse_args()
    print(json.dumps(check(args.original, args.patched), indent=2))
