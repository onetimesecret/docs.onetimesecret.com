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
`c52de89ba0203fe390bb6e408b5b9faacd7793b1`:󠄁
https://github.com/textprov/textprov/blob/c52de89ba0203fe390bb6e408b5b9faacd7793b1/js/textprov.css

Gradient mist with a 8󠄁0󠄁%󠄁-󠄁s󠄁t󠄁r󠄁e󠄁n󠄁g󠄁t󠄁h󠄁 dotted underline replaces the wavy provenance
cue. The adaptation scopes paint to the reader's shown preference and screen
media, uses Starlight's existing accent and theme, and includes the switch
label as a legend. The runtime and producer remain pinned to the original
commit above; no decoder, encoding, or authoring-policy update is needed for
this display change.

T󠄁h󠄁e󠄁 s󠄁t󠄁r󠄁o󠄁n󠄁g󠄁e󠄁r󠄁 p󠄁r󠄁o󠄁f󠄁i󠄁l󠄁e󠄁 u󠄁s󠄁e󠄁s󠄁 1󠄁4󠄁%󠄁 t󠄁i󠄁n󠄁t󠄁,󠄁 2󠄁7󠄁%󠄁 l󠄁i󠄁g󠄁h󠄁t󠄁 /󠄁 1󠄁7󠄁.󠄁5󠄁5󠄁%󠄁 d󠄁a󠄁r󠄁k󠄁 g󠄁l󠄁o󠄁w󠄁 o󠄁p󠄁a󠄁c󠄁i󠄁t󠄁y󠄁,󠄁
1󠄁1󠄁.󠄁2󠄁p󠄁x󠄁 b󠄁l󠄁u󠄁r󠄁,󠄁 a󠄁n󠄁d󠄁 4󠄁p󠄁x󠄁 s󠄁p󠄁r󠄁e󠄁a󠄁d󠄁.󠄁 T󠄁h󠄁e󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 P󠄁* w󠄁e󠄁b󠄁f󠄁o󠄁n󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 s󠄁h󠄁a󠄁p󠄁i󠄁n󠄁g󠄁-󠄁p󠄁r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁i󠄁n󠄁g󠄁
b󠄁u󠄁i󠄁l󠄁d󠄁e󠄁r󠄁 a󠄁r󠄁e󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁e󠄁d󠄁 i󠄁n󠄁 `src/fonts/pstar-manifest.json`;󠄁 P󠄁+󠄁 a󠄁s󠄁s󠄁e󠄁t󠄁s󠄁 a󠄁r󠄁e󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁e󠄁d󠄁.󠄁

## Passage grouping

T󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁n󠄁d󠄁e󠄁r󠄁e󠄁r󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁s󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁e󠄁d󠄁 s󠄁p󠄁a󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 a󠄁d󠄁d󠄁s󠄁 a󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁
p󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 d󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 l󠄁a󠄁y󠄁e󠄁r󠄁.󠄁 P󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 a󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁;󠄁 t󠄁h󠄁e󠄁 r󠄁e󠄁a󠄁d󠄁e󠄁r󠄁 c󠄁a󠄁n󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁
c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁i󠄁n󠄁g󠄁 t󠄁e󠄁x󠄁t󠄁 o󠄁r󠄁 a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁.󠄁 T󠄁h󠄁e󠄁 d󠄁e󠄁c󠄁o󠄁d󠄁e󠄁r󠄁/󠄁r󠄁u󠄁n󠄁t󠄁i󠄁m󠄁e󠄁 p󠄁i󠄁n󠄁 a󠄁b󠄁o󠄁v󠄁e󠄁
i󠄁s󠄁 u󠄁n󠄁c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁d󠄁.󠄁 G󠄁r󠄁o󠄁u󠄁p󠄁i󠄁n󠄁g󠄁 a󠄁n󠄁d󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁r󠄁e󠄁 i󠄁m󠄁p󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁e󠄁d󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁
`src/lib/textprov/html.mjs` a󠄁d󠄁a󠄁p󠄁t󠄁e󠄁r󠄁,󠄁 w󠄁i󠄁t󠄁h󠄁 c󠄁o󠄁n󠄁t󠄁r󠄁o󠄁l󠄁s󠄁 i󠄁n󠄁 `display.ts` a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 s󠄁h󠄁a󠄁r󠄁e󠄁d󠄁
p󠄁r󠄁e󠄁s󠄁e󠄁n󠄁t󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁d󠄁a󠄁p󠄁t󠄁e󠄁d󠄁 i󠄁n󠄁 `src/styles/textprov.css`.󠄁
