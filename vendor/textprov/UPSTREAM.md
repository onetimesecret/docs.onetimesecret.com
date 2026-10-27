# Vendored TextProv

Runtime: `js/textprov.js` (renamed to `.cjs` for this ESM project) and the Python
producer core from TextProv commit `0afd43e9eebec705693c98dcfa11a7f8aeb790b0`.
Source: https://github.com/textprov/textprov/tree/0afd43e9eebec705693c98dcfa11a7f8aeb790b0
The copied runtime and producer files are unchanged. Apache-2.0: see LICENSE.

`tools/dogfood.py`, `tools/markdown-prose.mjs`, and the original 24 authoring tests
are adapted from TextProv snapshot `532a8778737c4cbc639c5a4ff79aff5f7487b7d5` (forward-only integration, now
removed upstream). Local changes use the current segmentation API, protect
Markdoc directives and Starlight aside fences, enroll docs in rendering, and
support preservation-only CI.
This integration records AI edits only. It does not assign human declarations.

The baseline decoder is experimental. Marker values overlap Unicode variation
sequences; only explicitly enrolled, mark-aware docs are decoded. The display
adapter leaves U+E0100 untouched, including the real 辻 + U+E0100 sequence.


## Display treatment

The docs reveal stylesheet, `src/styles/textprov.css`, is adapted from
`js/textprov.css` at TextProv commit
`4fdb0ad3ac110102280f1f63900d476c043bdeec`:
https://github.com/textprov/textprov/blob/4fdb0ad3ac110102280f1f63900d476c043bdeec/js/textprov.css

Gradient mist with a 60%-strength dotted underline replaces the wavy provenance
cue. The adaptation scopes paint to the reader's shown preference and screen
media, uses Starlight's existing accent and theme, and includes the switch
label as a legend. The runtime and producer remain pinned to the original
commit above; no decoder, encoding, or authoring-policy update is needed for
this display change.
