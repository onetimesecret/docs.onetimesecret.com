# Provenance font assets

These assets were copied from `blog.onetimesecret.com` in PR #421. The original
patcher commit and complete build flags were not recorded; they are not
reproducible from this repository. The recorded patcher option is
`--provenance=explicit` in `delano/nerd-fonts`, branch `delano/self-added-fonts`.

The mapping test checks both marker encodings for all 188 covered Latin-1
characters in each face. Runtime highlighting uses clean text and CSS spans,
so it works for every font and script; it does not depend on these font mappings.
Maryheather is available as a fallback; body prose keeps the existing font.
The original license texts and embedded font notices are retained unchanged.

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
