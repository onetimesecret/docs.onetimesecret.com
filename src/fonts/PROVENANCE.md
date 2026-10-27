# Provenance font assets

These assets were copied from `blog.onetimesecret.com` in PR #421. The original
patcher commit and complete build flags were not recorded, so a fresh build of
those original files is not reproducible from this repository. The recorded
patcher option is `--provenance=explicit` in `delano/nerd-fonts`, branch
`delano/self-added-fonts`.

The geometry refresh below is reproducible from the recorded original assets.
It follows the dotted inspection fallback accompanying the application treatment
in [TextProv commit 4fdb0ad](https://github.com/textprov/textprov/commit/4fdb0ad3ac110102280f1f63900d476c043bdeec).
It does not rebuild from a newer font registry or change the encoded states.

Runtime highlighting uses clean text and CSS spans. It works for every font
and script and does not depend on these font mappings. Prerendering removes the
recorded AI selectors before publishing, so the CSS treatment does not duplicate
a baked font decoration. Maryheather remains a fallback; body prose keeps the
existing font.

The P+ Zilla family provides weights 400 and 700. CSS matches heading weight
600 to its Bold face (700), and nav weight 500 to its Regular face (400).
Intermediate weights are not advertised as separate files. This geometry
refresh leaves those family and weight selections unchanged.
The original license texts and embedded font notices are retained unchanged.

## Dotted geometry refresh

The eight original faces use an earlier assignment: AI U+E0101 selects a thin
four-point rectangular bar, while legacy unknown U+E0102 selects a six-point
sawtooth. The guarded updater changes the AI decoration to repeated round dots
and the unknown decoration to the original plain bar. The sawtooth treatment is
defunct. No provenance sawtooth contour remains in the refreshed fonts.

The P+ fallback is monochrome. Application CSS supplies the gradient mist and
60% dotted underline color strength; ordinary font outlines do not encode those
effects. Dots are generated at each glyph's actual advance width to avoid
stretching them into ellipses. They fit above the original decoration's bottom
within its existing descender space. Human variants and base glyph outlines
remain unchanged, and the refresh preserves the existing glyph IDs, selector
and PUA mappings, names, layout tables, advances, bearings, and line metrics.
Only the AI and unknown inspection decorations change.

`tools/fonts/check_textprov_dots.py` compares a refreshed asset with its original.
It checks round, separated dots; a plain unknown bar; unchanged mappings and
layout tables; and unchanged metrics and all unrelated outlines. HarfBuzz
validation also confirmed unchanged glyph IDs and positioning for all 188
covered Latin-1 bases under each original selector and the 188 AI PUA aliases in
every face. Before-and-after renders of the Regular Maryheather and Zilla faces
were inspected. These checks do not establish compatibility with every browser.

## Reproduce the refresh

FontTools and Brotli are optional maintenance dependencies, not site runtime
requirements. Their pinned versions make repeated refreshes byte-identical.
Use a separate Python environment:

```sh
python3 -m venv /tmp/docs-font-tools
/tmp/docs-font-tools/bin/python -m pip install -r tools/fonts/requirements.txt
```

From the repository root, the following regenerates and validates all eight
faces from the exact source revision recorded before the geometry change:

```sh
font_source_revision=9ed7648e91a89b1bf6964da8f11477577f05fc2f
font_work_dir=$(mktemp -d)
font_python=/tmp/docs-font-tools/bin/python
for family in maryheather-provenance zilla-slab-provenance; do
  for font in src/fonts/"$family"/*.woff2; do
    git show "$font_source_revision:$font" > "$font_work_dir/old.woff2"
    "$font_python" tools/fonts/refresh_textprov_dots.py \
      "$font_work_dir/old.woff2" "$font_work_dir/new.woff2"
    "$font_python" tools/fonts/check_textprov_dots.py \
      "$font_work_dir/new.woff2" --reference "$font_work_dir/old.woff2"
    cp "$font_work_dir/new.woff2" "$font"
  done
done
```

The updater rejects other original shapes, an already-refreshed font, and an
in-place input/output path. Retain the original assets for reference validation.
The historical mapping is preserved; this process is not a registry migration.
Run `pnpm test -- src/fonts/provenance.test.ts` to check the shipped font mappings
against the vendored decoder as well.

## Current asset SHA-256

```text
8e5f8e29a0277548be4668cd802f223795ff4141db277aa793164abea138165f  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Bold.woff2
9a6b2943defebc9be79f0f43e5c044f5108b742fcb3be2bf404927fbeb68d766  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-BoldItalic.woff2
06f344ef8aeb6a75aa28895a95bb22d5f7691027d66bc433f6b9435c56cef24d  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Italic.woff2
fbe69faa676b1be570b5072292a85815d3c860dc59932aa6ed734635e0661227  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Regular.woff2
f21846816a8e7fb7329fd9f0ec182f1c4e3cba3bc00f48036de49ff1dbacdf0f  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Bold.woff2
6151105d7c7e30feefcaa2986cb66670a9a3f1cdfcd4bf7f1954f6bb7d197505  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-BoldItalic.woff2
dcc049e3b0b835a47e9910a0c6c3d2a12e9f3b0d72cc7cd13da740a9d1ce8429  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Italic.woff2
c766f4af88e3aca0294f095e605a19ffb6f0191e9e074198f1ee058b3374896e  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Regular.woff2
```

## Original asset history

SHA-256 of the assets received in #421:

```text
668dc8f6701b6d0b117f5c27d706b14d2a80616b633668353b45b4f810b9e5a1  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Bold.woff2
686c5fdbf35abce9cf813760913bc563a0c4b0f95471c609b3382e1a375fe336  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-BoldItalic.woff2
d9249da487927e82507f3cd406484a1fcf0f67772ef4d104e1e06726e6dad0be  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Italic.woff2
996eed9e834e4884700dc488a500032bf1036746d966e1fc30d103decad5f5d1  src/fonts/maryheather-provenance/MaryheatherNerdFontPropoP+-Regular.woff2
2c132652c330fa195399ae11d70f3a5a759b3e7b924bde422aa16582dcf6728a  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Bold.woff2
43a9c9d3c7f387480e532a820b7acb00b828d1e2abc1453bb27fd123a33b921c  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-BoldItalic.woff2
de8235b177e060aa27e34a9faa7045b5b8938889014e7fe53697f9030d1c061d  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Italic.woff2
9881a9bcbeaffc0b8bc8bd363bbc91e1e935936405830903662fe259553e5fc4  src/fonts/zilla-slab-provenance/ZillaSlabNerdFontPropoP+-Regular.woff2
```
