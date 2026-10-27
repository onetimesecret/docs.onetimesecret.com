#!/usr/bin/env python3
"""Check P+ dotted geometry and preservation against the legacy WOFF2 asset.

Usage: check_textprov_dots.py NEW.woff2 --reference OLD.woff2
Requires the optional dependencies in tools/fonts/requirements.txt.
"""

import argparse
from pathlib import Path

from fontTools.ttLib import TTFont
from refresh_textprov_dots import AI_MARK, UNKNOWN_MARK, AI_SELECTOR, UNKNOWN_SELECTOR, legacy_geometry


def variations(font):
    table = next(table for table in font['cmap'].tables if table.format == 14)
    return {selector:dict(pairs) for selector,pairs in table.uvsDict.items()}


def check(path, reference):
    font, old = TTFont(path), TTFont(reference)
    _,old_bottom = legacy_geometry(old)
    glyf = font['glyf']
    old_order, order = old.getGlyphOrder(), font.getGlyphOrder()
    assert order[:len(old_order)] == old_order, 'existing glyph IDs changed'
    assert font.flavor == old.flavor == 'woff2', 'font container changed'
    assert font.getBestCmap() == old.getBestCmap(), 'encoded mappings changed'
    uvs,old_uvs = variations(font),variations(old)
    assert uvs == old_uvs, 'variation-selector mappings changed'
    marks = [name for name in order if name.startswith(AI_MARK+'.')]
    assert marks, 'no dotted strips found'
    dots = 0
    for name in marks:
        glyph = glyf[name]
        assert glyph.numberOfContours > 0, f'{name}: no dots'
        coords,ends,_ = glyph.getCoordinates(glyf)
        previous,bounds,centers = -1,[],[]
        for end in ends:
            contour = list(coords[previous+1:end+1])
            assert len(contour) == 8, f'{name}: expected an octagonal dot'
            xs,ys = zip(*contour)
            left,right,bottom,top = min(xs),max(xs),min(ys),max(ys)
            assert right>left and top>bottom and abs((right-left)-(top-bottom))<=2, f'{name}: stretched dot'
            bounds.append((left,right));centers.append((bottom+top)/2)
            previous=end;dots+=1
        ordered=sorted(bounds)
        assert all(left>prior_right for (_,prior_right),(left,_) in zip(ordered,ordered[1:])), f'{name}: joined dots'
        assert max(centers)-min(centers)<=1, f'{name}: uneven dot baseline'
        assert glyph.xMin>=0 and glyph.xMax<=font['hmtx'][name][0], f'{name}: dot exceeds advance'
        assert glyph.yMin>=old_bottom-1 and glyph.yMax<=0, f'{name}: dot exceeds existing descender cell'
    for cp,variant in uvs[AI_SELECTOR].items():
        glyph=glyf[variant]
        assert glyph.isComposite() and len(glyph.components)==2, f'{variant}: expected base and dots'
        strips=[component.getComponentInfo() for component in glyph.components if component.glyphName in marks]
        assert len(strips)==1 and strips[0][1]==(1,0,0,1,0,0), f'{variant}: dot strip stretched or missing'
        assert font['hmtx'][variant][0]==font['hmtx'][font.getBestCmap()[cp]][0], f'{variant}: advance differs from base'
    assert glyf[AI_MARK].numberOfContours==0, 'unused old AI decoration survives'
    assert glyf[UNKNOWN_MARK].getCoordinates(glyf)==old['glyf'][AI_MARK].getCoordinates(old['glyf']), 'unknown did not become the original plain bar'
    decorated=set(uvs[AI_SELECTOR].values())|set(uvs[UNKNOWN_SELECTOR].values())|{AI_MARK,UNKNOWN_MARK}
    for name in old_order:
        assert font['hmtx'][name]==old['hmtx'][name], f'{name}: existing horizontal metric changed'
        if name not in decorated:
            assert glyf[name].getCoordinates(glyf)==old['glyf'][name].getCoordinates(old['glyf']), f'{name}: unrelated outline changed'
    for tag in ('name','cmap','GSUB','GDEF','GPOS','kern','OS/2'):
        assert (tag in font)==(tag in old), f'{tag}: table presence changed'
        if tag in old:
            assert font.getTableData(tag)==old.getTableData(tag), f'{tag}: table changed'
    for name,fields in [('hhea',('ascent','descent','lineGap')),('head',('unitsPerEm','flags','created','modified'))]:
        for field in fields:
            assert getattr(font[name],field)==getattr(old[name],field), f'{name}.{field}: metric/metadata changed'
    print(f'PASS {Path(path).name}: {len(uvs[AI_SELECTOR])} AI bases, {len(marks)} dotted strips/{dots} round dots, unknown plain bar; original mappings, names, layout, metrics and unrelated outlines preserved')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('font')
    parser.add_argument('--reference',required=True)
    args=parser.parse_args()
    check(args.font,args.reference)


if __name__ == '__main__':
    main()
