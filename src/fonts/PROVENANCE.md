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

B󠄁o󠄁t󠄁h󠄁 Z󠄁i󠄁l󠄁l󠄁a󠄁 P󠄁+󠄁 a󠄁n󠄁d󠄁 P󠄁* f󠄁a󠄁m󠄁i󠄁l󠄁i󠄁e󠄁s󠄁 p󠄁r󠄁o󠄁v󠄁i󠄁d󠄁e󠄁 weights 400 and 700. CSS matches heading weight
600 to its Bold face (700), and nav weight 500 to its Regular face (400).
Intermediate weights are not advertised as separate files. This geometry
refresh leaves those family and weight selections unchanged.
The original license texts and embedded font notices are retained unchanged.

## Selected P* families

T󠄁h󠄁e󠄁 f󠄁o󠄁n󠄁t󠄁 s󠄁t󠄁a󠄁c󠄁k󠄁 n󠄁o󠄁w󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁s󠄁 `Zilla Slab Provenance P*` f󠄁o󠄁r󠄁 b󠄁r󠄁a󠄁n󠄁d󠄁 t󠄁y󠄁p󠄁o󠄁g󠄁r󠄁a󠄁p󠄁h󠄁y󠄁 a󠄁n󠄁d󠄁
`Maryheather Provenance P*` f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁r󠄁i󠄁f󠄁 f󠄁a󠄁l󠄁l󠄁b󠄁a󠄁c󠄁k󠄁.󠄁 A󠄁l󠄁l󠄁 e󠄁i󠄁g󠄁h󠄁t󠄁 P󠄁+󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁
f󠄁o󠄁n󠄁t󠄁-󠄁f󠄁a󠄁c󠄁e󠄁 d󠄁e󠄁c󠄁l󠄁a󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 r󠄁e󠄁m󠄁a󠄁i󠄁n󠄁 a󠄁v󠄁a󠄁i󠄁l󠄁a󠄁b󠄁l󠄁e󠄁 b󠄁e󠄁s󠄁i󠄁d󠄁e󠄁 e󠄁i󠄁g󠄁h󠄁t󠄁 n󠄁e󠄁w󠄁 P󠄁* f󠄁i󠄁l󠄁e󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 n󠄁o󠄁r󠄁m󠄁a󠄁l󠄁
b󠄁o󠄁d󠄁y󠄁 f󠄁o󠄁n󠄁t󠄁,󠄁 w󠄁e󠄁i󠄁g󠄁h󠄁t󠄁 m󠄁a󠄁t󠄁c󠄁h󠄁i󠄁n󠄁g󠄁,󠄁 b󠄁a󠄁s󠄁e󠄁 g󠄁l󠄁y󠄁p󠄁h󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 f󠄁o󠄁n󠄁t󠄁 m󠄁e󠄁t󠄁r󠄁i󠄁c󠄁s󠄁 a󠄁r󠄁e󠄁 p󠄁r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁e󠄁d󠄁.󠄁

P󠄁* e󠄁x󠄁t󠄁e󠄁n󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁t󠄁t󠄁e󠄁d󠄁 i󠄁n󠄁d󠄁i󠄁c󠄁a󠄁t󠄁o󠄁r󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁 o󠄁r󠄁d󠄁i󠄁n󠄁a󠄁r󠄁y󠄁 s󠄁p󠄁a󠄁c󠄁e󠄁s󠄁 b󠄁o󠄁u󠄁n󠄁d󠄁e󠄁d󠄁 b󠄁y󠄁 e󠄁x󠄁p󠄁l󠄁i󠄁c󠄁i󠄁t󠄁
A󠄁I󠄁 g󠄁l󠄁y󠄁p󠄁h󠄁s󠄁.󠄁 L󠄁e󠄁a󠄁d󠄁i󠄁n󠄁g󠄁/󠄁t󠄁r󠄁a󠄁i󠄁l󠄁i󠄁n󠄁g󠄁 s󠄁p󠄁a󠄁c󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 b󠄁o󠄁u󠄁n󠄁d󠄁a󠄁r󠄁i󠄁e󠄁s󠄁 n󠄁e󠄁x󠄁t󠄁 t󠄁o󠄁 u󠄁n󠄁m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁,󠄁 h󠄁u󠄁m󠄁a󠄁n󠄁,󠄁 o󠄁r󠄁
u󠄁n󠄁k󠄁n󠄁o󠄁w󠄁n󠄁 t󠄁e󠄁x󠄁t󠄁 s󠄁t󠄁a󠄁y󠄁 b󠄁l󠄁a󠄁n󠄁k󠄁.󠄁 T󠄁h󠄁i󠄁s󠄁 i󠄁s󠄁 c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁u󠄁a󠄁l󠄁 g󠄁l󠄁y󠄁p󠄁h󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁;󠄁 i󠄁t󠄁 a󠄁d󠄁d󠄁s󠄁 n󠄁o󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁
w󠄁h󠄁i󠄁t󠄁e󠄁s󠄁p󠄁a󠄁c󠄁e󠄁 m󠄁a󠄁r󠄁k󠄁e󠄁r󠄁s󠄁 o󠄁r󠄁 e󠄁n󠄁c󠄁o󠄁d󠄁e󠄁d󠄁 s󠄁t󠄁a󠄁t󠄁e󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 O󠄁p󠄁e󠄁n󠄁T󠄁y󠄁p󠄁e󠄁 `rclt` p󠄁r󠄁o󠄁g󠄁r󠄁a󠄁m󠄁 i󠄁s󠄁 a󠄁p󠄁p󠄁e󠄁n󠄁d󠄁e󠄁d󠄁
w󠄁h󠄁i󠄁l󠄁e󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁i󠄁n󠄁g󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 G󠄁S󠄁U󠄁B󠄁 l󠄁o󠄁o󠄁k󠄁u󠄁p󠄁 a󠄁n󠄁d󠄁 s󠄁c󠄁r󠄁i󠄁p󠄁t󠄁/󠄁l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁 a󠄁s󠄁s󠄁o󠄁c󠄁i󠄁a󠄁t󠄁i󠄁o󠄁n󠄁.󠄁
T󠄁h󠄁e󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 g󠄁l󠄁y󠄁p󠄁h󠄁 I󠄁D󠄁s󠄁,󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁o󠄁r󠄁 a󠄁n󠄁d󠄁 P󠄁U󠄁A󠄁 m󠄁a󠄁p󠄁p󠄁i󠄁n󠄁g󠄁s󠄁,󠄁 k󠄁e󠄁r󠄁n󠄁i󠄁n󠄁g󠄁,󠄁 l󠄁i󠄁g󠄁a󠄁t󠄁u󠄁r󠄁e󠄁s󠄁,󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁
f󠄁e󠄁a󠄁t󠄁u󠄁r󠄁e󠄁s󠄁,󠄁 o󠄁u󠄁t󠄁l󠄁i󠄁n󠄁e󠄁s󠄁,󠄁 l󠄁i󠄁n󠄁e󠄁 m󠄁e󠄁t󠄁r󠄁i󠄁c󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 e󠄁m󠄁b󠄁e󠄁d󠄁d󠄁e󠄁d󠄁 l󠄁i󠄁c󠄁e󠄁n󠄁s󠄁e󠄁 n󠄁o󠄁t󠄁i󠄁c󠄁e󠄁s󠄁 a󠄁r󠄁e󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁e󠄁d󠄁.󠄁

`pstar-manifest.json` r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁s󠄁 i󠄁n󠄁p󠄁u󠄁t󠄁/󠄁o󠄁u󠄁t󠄁p󠄁u󠄁t󠄁 S󠄁H󠄁A󠄁-󠄁2󠄁5󠄁6󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 r󠄁e󠄁v󠄁i󠄁s󠄁i󠄁o󠄁n󠄁
`13eba813265531b59fd7079ffc29928d57e77fe6`.󠄁 P󠄁* d󠄁e󠄁r󠄁i󠄁v󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁o󠄁s󠄁e󠄁 a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁-󠄁d󠄁o󠄁t󠄁t󠄁e󠄁d󠄁 P󠄁+󠄁
a󠄁s󠄁s󠄁e󠄁t󠄁s󠄁,󠄁 r󠄁a󠄁t󠄁h󠄁e󠄁r󠄁 t󠄁h󠄁a󠄁n󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 n󠄁e󠄁w󠄁e󠄁r󠄁 f󠄁o󠄁n󠄁t󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁r󠄁y󠄁.󠄁 U󠄁s󠄁e󠄁 t󠄁h󠄁e󠄁 p󠄁i󠄁n󠄁n󠄁e󠄁d󠄁 m󠄁a󠄁i󠄁n󠄁t󠄁e󠄁n󠄁a󠄁n󠄁c󠄁e󠄁 d󠄁e󠄁p󠄁e󠄁n󠄁d󠄁e󠄁n󠄁c󠄁i󠄁e󠄁s󠄁
a󠄁n󠄁d󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁 t󠄁o󠄁 a󠄁 n󠄁e󠄁w󠄁 o󠄁u󠄁t󠄁p󠄁u󠄁t󠄁:󠄁

```sh
python3 tools/fonts/build_pstar.py ORIGINAL-P+.woff2 NEW-PStar.woff2
python3 tools/fonts/test_pstar.py ORIGINAL-P+.woff2 NEW-PStar.woff2
```

T󠄁h󠄁e󠄁 b󠄁u󠄁i󠄁l󠄁d󠄁e󠄁r󠄁 p󠄁r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 W󠄁O󠄁F󠄁F󠄁2󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁e󠄁r󠄁,󠄁 r󠄁e󠄁f󠄁u󠄁s󠄁e󠄁s󠄁 i󠄁n󠄁-󠄁p󠄁l󠄁a󠄁c󠄁e󠄁/󠄁o󠄁v󠄁e󠄁r󠄁w󠄁r󠄁i󠄁t󠄁e󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁,󠄁
a󠄁n󠄁d󠄁 r󠄁e󠄁j󠄁e󠄁c󠄁t󠄁s󠄁 p󠄁r󠄁e󠄁-󠄁e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 `rclt` o󠄁r󠄁 c󠄁o󠄁n󠄁d󠄁i󠄁t󠄁i󠄁o󠄁n󠄁a󠄁l󠄁 G󠄁S󠄁U󠄁B󠄁 p󠄁r󠄁o󠄁g󠄁r󠄁a󠄁m󠄁s󠄁 t󠄁h󠄁a󠄁t󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁 a󠄁
s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 m󠄁e󠄁r󠄁g󠄁e󠄁 r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁.󠄁 T󠄁h󠄁e󠄁 r󠄁e󠄁g󠄁r󠄁e󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁e󠄁s󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 G󠄁S󠄁U󠄁B󠄁 b󠄁y󠄁t󠄁e󠄁s󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁
r󠄁e󠄁m󠄁o󠄁v󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁e󠄁n󠄁d󠄁e󠄁d󠄁 f󠄁e󠄁a󠄁t󠄁u󠄁r󠄁e󠄁,󠄁 a󠄁l󠄁l󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 m󠄁a󠄁p󠄁p󠄁i󠄁n󠄁g󠄁s󠄁/󠄁o󠄁u󠄁t󠄁l󠄁i󠄁n󠄁e󠄁s󠄁/󠄁m󠄁e󠄁t󠄁r󠄁i󠄁c󠄁s󠄁,󠄁 c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁u󠄁a󠄁l󠄁
b󠄁o󠄁u󠄁n󠄁d󠄁a󠄁r󠄁i󠄁e󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 l󠄁i󠄁g󠄁a󠄁t󠄁u󠄁r󠄁e󠄁,󠄁 k󠄁e󠄁r󠄁n󠄁i󠄁n󠄁g󠄁,󠄁 n󠄁u󠄁m󠄁e󠄁r󠄁a󠄁l󠄁,󠄁 a󠄁n󠄁d󠄁 s󠄁m󠄁a󠄁l󠄁l󠄁-󠄁c󠄁a󠄁p󠄁 s󠄁e󠄁t󠄁t󠄁i󠄁n󠄁g󠄁s󠄁.󠄁
E󠄁a󠄁c󠄁h󠄁 f󠄁a󠄁c󠄁e󠄁 p󠄁a󠄁s󠄁s󠄁e󠄁d󠄁 1󠄁,󠄁1󠄁6󠄁1󠄁 H󠄁a󠄁r󠄁f󠄁B󠄁u󠄁z󠄁z󠄁 s󠄁a󠄁m󠄁p󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 3󠄁9󠄁3󠄁 C󠄁o󠄁r󠄁e󠄁T󠄁e󠄁x󠄁t󠄁 s󠄁a󠄁m󠄁p󠄁l󠄁e󠄁s󠄁.󠄁 A󠄁c󠄁t󠄁u󠄁a󠄁l󠄁 a󠄁p󠄁p󠄁s󠄁 m󠄁a󠄁y󠄁
s󠄁h󠄁a󠄁p󠄁e󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 w󠄁o󠄁r󠄁d󠄁s󠄁 o󠄁r󠄁 s󠄁t󠄁y󠄁l󠄁e󠄁 r󠄁u󠄁n󠄁s󠄁 i󠄁n󠄁d󠄁e󠄁p󠄁e󠄁n󠄁d󠄁e󠄁n󠄁t󠄁l󠄁y󠄁;󠄁 f󠄁o󠄁n󠄁t󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 c󠄁o󠄁n󠄁t󠄁i󠄁n󠄁u󠄁i󠄁t󠄁y󠄁 i󠄁s󠄁 a󠄁n󠄁
a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁m󠄁p󠄁a󠄁t󠄁i󠄁b󠄁i󠄁l󠄁i󠄁t󠄁y󠄁 p󠄁r󠄁o󠄁p󠄁e󠄁r󠄁t󠄁y󠄁.󠄁 T󠄁h󠄁e󠄁 r󠄁e󠄁a󠄁d󠄁e󠄁r󠄁 t󠄁o󠄁g󠄁g󠄁l󠄁e󠄁 u󠄁s󠄁e󠄁s󠄁 C󠄁S󠄁S󠄁 o󠄁n󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁 t󠄁e󠄁x󠄁t󠄁,󠄁
s󠄁o󠄁 i󠄁t󠄁s󠄁 c󠄁o󠄁n󠄁t󠄁i󠄁n󠄁u󠄁o󠄁u󠄁s󠄁 t󠄁r󠄁e󠄁a󠄁t󠄁m󠄁e󠄁n󠄁t󠄁 d󠄁o󠄁e󠄁s󠄁 n󠄁o󠄁t󠄁 d󠄁e󠄁p󠄁e󠄁n󠄁d󠄁 o󠄁n󠄁 t󠄁h󠄁e󠄁 P󠄁* s󠄁p󠄁a󠄁c󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁t󠄁i󠄁t󠄁u󠄁t󠄁i󠄁o󠄁n󠄁.󠄁

C󠄁h󠄁r󠄁o󠄁m󠄁i󠄁u󠄁m󠄁 p󠄁a󠄁i󠄁n󠄁t󠄁e󠄁d󠄁 t󠄁h󠄁e󠄁 s󠄁p󠄁a󠄁c󠄁e󠄁 b󠄁r󠄁i󠄁d󠄁g󠄁e󠄁s󠄁 i󠄁n󠄁 a󠄁l󠄁l󠄁 e󠄁i󠄁g󠄁h󠄁t󠄁 P󠄁* f󠄁a󠄁c󠄁e󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 t󠄁e󠄁s󠄁t󠄁e󠄁d󠄁
P󠄁l󠄁a󠄁y󠄁w󠄁r󠄁i󠄁g󠄁h󠄁t󠄁 W󠄁e󠄁b󠄁K󠄁i󠄁t󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁e󠄁d󠄁 t󠄁h󠄁e󠄁 P󠄁+󠄁 w󠄁o󠄁r󠄁d󠄁-󠄁l󠄁e󠄁v󠄁e󠄁l󠄁 a󠄁p󠄁p󠄁e󠄁a󠄁r󠄁a󠄁n󠄁c󠄁e󠄁 f󠄁o󠄁r󠄁 r󠄁a󠄁w󠄁 m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁 t󠄁e󠄁x󠄁t󠄁.󠄁
T󠄁h󠄁e󠄁 C󠄁S󠄁S󠄁-󠄁b󠄁a󠄁s󠄁e󠄁d󠄁 r󠄁e󠄁a󠄁d󠄁e󠄁r󠄁 t󠄁o󠄁g󠄁g󠄁l󠄁e󠄁 r󠄁e󠄁n󠄁d󠄁e󠄁r󠄁e󠄁d󠄁 t󠄁h󠄁e󠄁 s󠄁t󠄁r󠄁o󠄁n󠄁g󠄁e󠄁r󠄁 t󠄁r󠄁e󠄁a󠄁t󠄁m󠄁e󠄁n󠄁t󠄁 i󠄁n󠄁 b󠄁o󠄁t󠄁h󠄁 e󠄁n󠄁g󠄁i󠄁n󠄁e󠄁s󠄁,󠄁
i󠄁n󠄁c󠄁l󠄁u󠄁d󠄁i󠄁n󠄁g󠄁 l󠄁i󠄁g󠄁h󠄁t󠄁/󠄁d󠄁a󠄁r󠄁k󠄁 m󠄁o󠄁d󠄁e󠄁,󠄁 n󠄁a󠄁t󠄁i󠄁v󠄁e󠄁 a󠄁n󠄁n󠄁o󠄁t󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 p󠄁r󠄁i󠄁o󠄁r󠄁i󠄁t󠄁y󠄁,󠄁 a󠄁n󠄁d󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁.󠄁

## Dotted geometry refresh

The eight original faces use an earlier assignment: AI U+E0101 selects a thin
four-point rectangular bar, while legacy unknown U+E0102 selects a six-point
sawtooth. The guarded updater changes the AI decoration to repeated round dots
and the unknown decoration to the original plain bar. The sawtooth treatment is
defunct. No provenance sawtooth contour remains in the refreshed fonts.

The P+ fallback is monochrome. Application CSS supplies the gradient mist and
8󠄁0󠄁%󠄁 dotted underline color strength; ordinary font outlines do not encode those
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

## Retained P+ asset SHA-256

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
