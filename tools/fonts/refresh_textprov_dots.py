#!/usr/bin/env python3
"""Refresh the legacy P+ webfont decorations without changing their registry.

Usage: refresh_textprov_dots.py OLD.woff2 NEW.woff2
Requires the recorded four-point AI bar and six-point unknown sawtooth. Only
those inspection decorations change: AI becomes repeated dots, unknown a bar.
Application CSS provides gradient mist and the configured dot color strength.
"""

import argparse
from copy import deepcopy
from pathlib import Path

from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphComponent

AI_MARK = 'provenance.mark.ai'
UNKNOWN_MARK = 'provenance.mark.unknown'
AI_SELECTOR = 0xE0101
UNKNOWN_SELECTOR = 0xE0102


def legacy_geometry(font):
    """Reject another font profile or already-updated decorations."""
    if font.flavor != 'woff2' or 'glyf' not in font or 'fvar' in font or 'COLR' in font:
        raise ValueError('expected a static monochrome TrueType WOFF2 P+ font')
    glyf = font['glyf']
    table = next((table for table in font['cmap'].tables if table.format == 14), None)
    if table is None or set(table.uvsDict) != {0xE0100,AI_SELECTOR,UNKNOWN_SELECTOR} or not all(table.uvsDict.get(selector) for selector in (AI_SELECTOR, UNKNOWN_SELECTOR)):
        raise ValueError('expected the historical AI and unknown selector records')
    outlines = {}
    for name, count in ((AI_MARK, 4), (UNKNOWN_MARK, 6)):
        if name not in glyf:
            raise ValueError(f'missing legacy decoration: {name}')
        glyph = glyf[name]
        if glyph.isComposite() or glyph.numberOfContours != 1:
            raise ValueError(f'{name}: expected a single outline')
        coordinates, ends, _ = glyph.getCoordinates(glyf)
        if len(coordinates) != count or list(ends) != [count-1]:
            raise ValueError(f'{name}: not the recorded legacy {count}-point shape')
        outlines[name] = list(coordinates)
    em = font['head'].unitsPerEm
    bar = outlines[AI_MARK]
    low, high = min(y for _,y in bar), max(y for _,y in bar)
    if set(bar) != {(0,low),(em,low),(em,high),(0,high)} or not low < high < 0:
        raise ValueError('AI mark is not the recorded thin full-em bar')
    wave = outlines[UNKNOWN_MARK]
    thickness = high-low
    amplitude = max(y for _,y in wave)-high
    expected = {(0,low),(em/2,low+amplitude),(em,low),(em,high),(em/2,high+amplitude),(0,high)}
    if set(wave) != expected or amplitude <= thickness:
        raise ValueError('unknown mark is not the recorded six-point sawtooth')
    return table, low


def dotted_strip(advance, em, low):
    """Fit visible round dots in the existing descender cell, above its old bottom."""
    from math import pi, sin, cos

    count = max(1, int(round(advance / (em/6))))
    pitch = advance/count
    radius = min(em/32, -low/2, pitch/4)
    cy = low+radius
    pen = TTGlyphPen(None)
    for index in range(count):
        cx = (index+.5)*pitch
        pen.moveTo((cx,cy+radius))
        for corner in range(1,8):
            angle = corner*pi/4
            pen.lineTo((cx+radius*sin(angle),cy+radius*cos(angle)))
        pen.closePath()
    return pen.glyph()


def refresh(source, output):
    if Path(source).resolve() == Path(output).resolve():
        raise ValueError('write a separate output and keep the original for comparison')
    font = TTFont(source, recalcTimestamp=False, recalcBBoxes=False)
    table, low = legacy_geometry(font)
    glyf, metrics = font['glyf'], font['hmtx']
    original_bar = deepcopy(glyf[AI_MARK])
    order = list(font.getGlyphOrder())
    strips, updated = {}, set()
    for _,variant in table.uvsDict[AI_SELECTOR]:
        if variant in updated:
            continue
        glyph = glyf[variant]
        if not glyph.isComposite() or len(glyph.components) != 2:
            raise ValueError(f'{variant}: expected a base plus AI decoration')
        references = [component for component in glyph.components if component.glyphName == AI_MARK]
        if len(references) != 1:
            raise ValueError(f'{variant}: expected exactly one AI decoration reference')
        advance = metrics[variant][0]
        if advance <= 0:
            raise ValueError(f'{variant}: expected a positive advance')
        if advance not in strips:
            name = f'{AI_MARK}.{advance}'
            if name in glyf:
                raise ValueError(f'new dot-strip name already occupied: {name}')
            glyf[name] = dotted_strip(advance, font['head'].unitsPerEm, low)
            glyf[name].recalcBounds(glyf)
            metrics[name] = (advance,0)
            order.append(name)
            strips[advance] = name
        replacement = GlyphComponent()
        replacement.glyphName = strips[advance]
        replacement.x = replacement.y = 0
        replacement.flags = 0
        glyph.components = [replacement if component is references[0] else component for component in glyph.components]
        glyph.recalcBounds(glyf)
        updated.add(variant)
    for _,variant in table.uvsDict[UNKNOWN_SELECTOR]:
        glyph = glyf[variant]
        if not glyph.isComposite() or len(glyph.components) != 2 or sum(component.glyphName == UNKNOWN_MARK for component in glyph.components) != 1:
            raise ValueError(f'{variant}: expected a base plus unknown decoration')
    # Keep the legacy glyph IDs stable. Unknown gets the original plain bar;
    # the old AI bar becomes unused and empty, with no defunct sawtooth left.
    glyf[UNKNOWN_MARK] = original_bar
    for _,variant in table.uvsDict[UNKNOWN_SELECTOR]:
        glyf[variant].recalcBounds(glyf)
    glyf[AI_MARK] = TTGlyphPen(None).glyph()
    font.setGlyphOrder(order)
    font.save(output)
    print(f'{Path(output).name}: {len(updated)} AI variants use {len(strips)} width-specific dot strips; unknown uses plain bar; registry retained')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source')
    parser.add_argument('output')
    args = parser.parse_args()
    refresh(args.source,args.output)


if __name__ == '__main__':
    main()
