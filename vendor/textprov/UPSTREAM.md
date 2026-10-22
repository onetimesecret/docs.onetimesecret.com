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
