# TextProv authoring and display

This site records future AI agent edits in published Markdown and Markdoc.
Existing content keeps its current attribution. Unmarked content has no recorded
origin; the toggle does not detect authorship or identify which agent was used.

## ChatGPT/Codex and Claude CLI

Python fnmatch patterns in tools/dogfooding.json use * across directory separators.

Both read AGENTS.md. Claude also imports it from CLAUDE.md and provides the
`/textprov` command. There are no tool interception hooks, model-specific event
schemas, automatic prompt logs, or global machine configuration changes.
Python 3.9+ and Node.js (the project version) are required.

Install the pinned SDK dependencies before using the repository commands from
either agent:

```sh
pnpm install
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r tools/requirements.txt
```

Activate `.venv` in each new shell before running the Python tools or tests.
`tools/dogfood.py` rejects missing or mismatched TextProv versions and prints
the install command. `tools/textprov_reanchor.py` uses the same version guard.

1. Record the starting Git SHA before editing. Inspect existing changes.
2. Write the intended unmarked replacement into a temporary UTF-8 file.
3. Apply an exact edit; --old must match once in the unmarked source:

```sh
python3 tools/dogfood.py edit src/content/docs/en/start/index.md --state ai --old 'An exact existing passage' --new-file /tmp/replacement.md
```

For a new page, copy a page template into a temporary draft, fill in its
frontmatter, and use:

```sh
python3 tools/dogfood.py create src/content/docs/en/contribute/new-guide.md --state ai --new-file /tmp/new-guide.md
```

Use --dry-run to inspect the result. Paths, ambiguous matches, grapheme boundaries,
Markdown syntax, links, and existing marks are checked before writing. Clusters
inferred to be unchanged within the replacement keep their previous bytes and
origin; this alignment cannot establish authorship (see below). The tool adds
`textprov: true` to the YAML frontmatter of an edited docs page.

4. Review the visible text and source diff; then validate against the starting
   SHA (HEAD works before committing):

```sh
python3 tools/dogfood.py check --base HEAD
python3 -m unittest discover -s tools/tests
pnpm test
pnpm run check:frontmatter
pnpm run check:nav
pnpm build
```

Only new prose in src/content/docs/**/*.md and .mdoc is marked. Frontmatter,
code, URLs, syntax, HTML tags, Markdoc directives/attributes, aside fences
(`:::note`, `:::caution[...]`; the label text is prose), and the generated
environment reference are excluded. Source-code comments and strings are excluded.
Human contributors edit normally and preserve existing marks. For a combined diff
containing human edits, run check with --preserve-only; it permits new unmarked
text while still rejecting lost marks and backfill detected by alignment, and
marks in protected syntax. Short moves can escape detection (see below).
CI runs this preservation check against the merge base of the PR and target branch. The strict check is an
agent completion requirement; CI cannot infer whether unmarked text came from AI.

## Correspondence alignment and authoring limitations

`tools/dogfood.py` retains its scoped `mark_edit` authoring operation, using
`textprov.clusters()` and `textprov.correspondence()` from the Python SDK pinned
in [tools/requirements.txt](../tools/requirements.txt) to preserve matched bytes.
Checking delegates to the SDK's `textprov.check_text()` with a prose-eligibility
profile from this repository's
Node Markdown parser. The wrapper retains AST-shape validation and repository
policy checks; correspondence and preservation checking are implemented upstream,
not locally. This composition does not use the SDK's `mark_document_edit()`
authoring policy. See the upstream
[alignment documentation](https://github.com/textprov/textprov/blob/python-v0.3.0/docs/development/alignment.md).

The SDK's correspondence algorithm ignores whitespace, anchors on exact encoded
bytes, then aligns visible clusters in the gaps. Primary equal runs can be one
cluster long; these text comparisons cannot distinguish retained text from
coincidental new text.
For example, replacing `cat` with `bag` retains the unmarked `a`; fully marking
the replacement instead reports backfill. Two-cluster coincidences are possible too.

The SDK's `MIN_MOVE_CLUSTERS = 2`, defined in upstream
[`python/textprov/check.py`](https://github.com/textprov/textprov/blob/python-v0.3.0/python/textprov/check.py),
applies only to the final unmatched-block move pass. Shorter blocks pair only if
their encoded bytes are identical. The checker still detects changed marks on
two-cluster moves. Raising the threshold to three misses those changes;
adding a minimum to primary equal runs also breaks retained-byte and
mark-preservation cases. Neither threshold establishes authorship.

### Known alignment limitations

[`CorrespondenceLimitTests`](../tools/tests/test_dogfood.py) records these limits:

- In-place coincidental clusters can remain unmarked.
- A singleton move with changed bytes is treated as new text, potentially
  concealing relabelling or, in preservation-only mode, a removed mark.
- Separate deletion and insertion of identical blocks can each pass while the
  cumulative comparison reports backfill as a move.

Inspect attribution diffs and check against the recorded starting base, not
just each preceding edit. Do not strip marks or mark legacy text to pass.
`--preserve-only` permits combined human/AI diffs; it does not resolve ambiguity.

## Re-anchoring marks before a PR

Edits that each passed `check --base HEAD` can still fail against the PR merge
base, because the check aligns whole files. `tools/textprov_reanchor.py`
rewrites marks, never plain text, so the branch passes against that base. It is
the one exception to "do not strip marks or mark legacy text to pass" above.
The person opening the PR runs it on files the branch changed, and only when
the cumulative check fails on alignment. Agents do not run it as part of an
edit.

It makes three rewrites, and none removes a mark recorded at the base:

- A cluster the check pairs with unchanged base text gets its base bytes back.
  Where the base text was unmarked, this removes a mark the branch added: AI
  text that the alignment pairs with legacy text loses its attribution. Read
  the report before writing; this under-attribution is the accepted cost.
- A new mark outside eligible prose (syntax, code, whitespace) is removed. The
  check rejects these marks anyway.
- A new prose cluster with a malformed generated mark is re-encoded with one
  selector.

`--strict` also marks every remaining unmarked new prose cluster as AI; use it
only when all new prose on the branch is AI-authored. A file whose marks still
change after the last pass is reported and left as it was.

The script never edits frontmatter. If it removes the last mark from a page,
delete `textprov: true` from that page by hand, so the page is no longer
decoded or counted as enrolled.

```sh
BASE=$(git merge-base HEAD origin/<target-branch>)
python3 tools/textprov_reanchor.py "$BASE" FILE...           # report only
python3 tools/textprov_reanchor.py "$BASE" --write FILE...
python3 tools/dogfood.py check --base "$BASE"
python3 tools/dogfood.py check --base "$BASE" --preserve-only
```

## Display and search

The JS/TS integration uses the `textprov` npm package to decode enrolled pages
during Astro prerender and in the dev server. AI runs become clean text in spans with data-textprov="ai".
The controls are an "AI edits" block above "On this page" in the right sidebar,
with a "Highlight AI edits" switch and an information button whose popover
explains what the highlighting means, its limits, and links to the reader guide. Below Starlight's
72rem breakpoint the same switch sits at the end of the sticky mobile table of
contents bar. `src/components/starlight/PageSidebar.astro` renders them on
every page with a table of contents, enrolled or not, so the control is in the
same place on every page; a page with no recorded AI text has nothing to
highlight. Splash pages (the homepages) have no table of contents and show no
controls; their AI runs are still decoded, and a preference saved on another
page still highlights them. The switch changes CSS only, persists the reader's
preference locally, defaults to hidden, never moves the article, and works
with every font. Highlighting shows the exact recorded characters. Without
JavaScript the controls stay hidden.

Every enrolled page carries one `data-textprov-document="true"` marker, emitted
only by `src/components/starlight/TextProvMarker.astro`; the middleware decodes
nothing without it. `pnpm run check:textprov` reads `dist/` after a build and
fails if an enrolled page (including English fallbacks in other locales) lacks
the marker, carries two, or still contains a raw selector.

The per-page Markdown twin that `starlight-llm-actions` publishes is a second
output path. It renders each page in an Astro container the middleware never
sees, so `src/lib/llm-markdown.ts` cleans the result of every enrolled page
before it is served. `check:textprov` also fails if an enrolled page has no
Markdown twin or its twin still contains a raw selector. A new published
output format must decode enrolled pages the same way.

Set `SHOW_TEXTPROV_TOGGLE=false` (or `0`) at build time to hide the toggle on
every page; the deploy workflow reads it from the environment variable of the
same name. Enrolled pages are still decoded to clean text.

Reveal mode uses gradient mist with a dotted underline. Styling values and
upstream attribution are maintained in
[src/styles/textprov.css](../src/styles/textprov.css).
The source color uses Starlight's existing accent. The toggle
label shows the same treatment as a legend. Hidden mode and print add no
provenance paint; the words and native annotation styles stay intact.

T󠄁h󠄁e󠄁 t󠄁r󠄁e󠄁a󠄁t󠄁m󠄁e󠄁n󠄁t󠄁 h󠄁a󠄁s󠄁 i󠄁t󠄁s󠄁 o󠄁w󠄁n󠄁 v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁,󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 f󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁e󠄁 `textprov` p󠄁a󠄁c󠄁k󠄁a󠄁g󠄁e󠄁
v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁:󠄁 `v<spec version>-<family>`,󠄁 w󠄁h󠄁e󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 p󠄁r󠄁e󠄁f󠄁i󠄁x󠄁 i󠄁s󠄁 t󠄁h󠄁e󠄁 T󠄁e󠄁x󠄁t󠄁P󠄁r󠄁o󠄁v󠄁 s󠄁p󠄁e󠄁c󠄁
v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁 t󠄁h󠄁e󠄁 t󠄁r󠄁e󠄁a󠄁t󠄁m󠄁e󠄁n󠄁t󠄁 w󠄁a󠄁s󠄁 d󠄁e󠄁s󠄁i󠄁g󠄁n󠄁e󠄁d󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁s󠄁t󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 f󠄁a󠄁m󠄁i󠄁l󠄁y󠄁 n󠄁a󠄁m󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 v󠄁i󠄁s󠄁u󠄁a󠄁l󠄁
m󠄁o󠄁d󠄁e󠄁l󠄁.󠄁 T󠄁h󠄁i󠄁s󠄁 s󠄁i󠄁t󠄁e󠄁 p󠄁a󠄁i󠄁n󠄁t󠄁s󠄁 `v0.3.0-asterisk`,󠄁
d󠄁e󠄁c󠄁l󠄁a󠄁r󠄁e󠄁d󠄁 i󠄁n󠄁 `src/lib/textprov/version.ts`,󠄁 r󠄁e󠄁p󠄁e󠄁a󠄁t󠄁e󠄁d󠄁 a󠄁s󠄁
`--textprov-display-version` i󠄁n󠄁 `src/styles/textprov.css`,󠄁 a󠄁n󠄁d󠄁 e󠄁m󠄁i󠄁t󠄁t󠄁e󠄁d󠄁 a󠄁s󠄁
`data-textprov-display-version` o󠄁n󠄁 t󠄁h󠄁e󠄁 e󠄁n󠄁r󠄁o󠄁l󠄁l󠄁m󠄁e󠄁n󠄁t󠄁 m󠄁a󠄁r󠄁k󠄁e󠄁r󠄁.󠄁 T󠄁h󠄁e󠄁 r󠄁e󠄁g󠄁i󠄁s󠄁t󠄁e󠄁r󠄁 o󠄁f󠄁
v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁s󠄁,󠄁 i󠄁n󠄁c󠄁l󠄁u󠄁d󠄁i󠄁n󠄁g󠄁 c󠄁a󠄁n󠄁d󠄁i󠄁d󠄁a󠄁t󠄁e󠄁s󠄁 n󠄁o󠄁t󠄁 y󠄁e󠄁t󠄁 r󠄁e󠄁c󠄁o󠄁m󠄁m󠄁e󠄁n󠄁d󠄁e󠄁d󠄁,󠄁 i󠄁s󠄁 u󠄁p󠄁s󠄁t󠄁r󠄁e󠄁a󠄁m󠄁 i󠄁n󠄁
`docs/development/display-versions.md`.󠄁 A󠄁d󠄁o󠄁p󠄁t󠄁i󠄁n󠄁g󠄁 a󠄁 n󠄁e󠄁w󠄁 v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁 m󠄁e󠄁a󠄁n󠄁s󠄁 p󠄁o󠄁r󠄁t󠄁i󠄁n󠄁g󠄁
i󠄁t󠄁s󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁s󠄁 i󠄁n󠄁t󠄁o󠄁 `src/styles/textprov.css` a󠄁n󠄁d󠄁 u󠄁p󠄁d󠄁a󠄁t󠄁i󠄁n󠄁g󠄁 b󠄁o󠄁t󠄁h󠄁 d󠄁e󠄁c󠄁l󠄁a󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁.󠄁

The optional `textprov` cascade layer lets ordinary application annotation
styles take priority. `src/styles/tailwind.css` d󠄁e󠄁c󠄁l󠄁a󠄁r󠄁e󠄁s󠄁 i󠄁t󠄁 l󠄁a󠄁s󠄁t󠄁 i󠄁n󠄁 t󠄁h󠄁e󠄁 s󠄁i󠄁t󠄁e󠄁'󠄁s󠄁
l󠄁a󠄁y󠄁e󠄁r󠄁 o󠄁r󠄁d󠄁e󠄁r󠄁,󠄁 a󠄁n󠄁d󠄁 `src/styles/textprov.css` r󠄁e󠄁p󠄁e󠄁a󠄁t󠄁s󠄁 t󠄁h󠄁a󠄁t󠄁 o󠄁r󠄁d󠄁e󠄁r󠄁 b󠄁e󠄁c󠄁a󠄁u󠄁s󠄁e󠄁 i󠄁t󠄁 s󠄁h󠄁i󠄁p󠄁s󠄁
a󠄁s󠄁 a󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 s󠄁t󠄁y󠄁l󠄁e󠄁s󠄁h󠄁e󠄁e󠄁t󠄁.󠄁 Links retain their native underline. A proofing range
can use `data-prov-decoration="native"` to omit provenance dots; a comment
anchor can use `data-prov-background="native"` to omit mist and glow. Both
hooks work on the decorated element or a container. Use unlayered annotation
styles or a layer with higher priority than `textprov`.

The clean published projection contains no AI selectors, so it does not select
P󠄁* d󠄁e󠄁c󠄁o󠄁r󠄁a󠄁t󠄁e󠄁d󠄁 g󠄁l󠄁y󠄁p󠄁h󠄁s󠄁 i󠄁n󠄁 a󠄁d󠄁d󠄁i󠄁t󠄁i󠄁o󠄁n󠄁 t󠄁o󠄁 C󠄁S󠄁S󠄁 d󠄁o󠄁t󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 b󠄁r󠄁a󠄁n󠄁d󠄁 a󠄁n󠄁d󠄁 s󠄁e󠄁r󠄁i󠄁f󠄁 f󠄁a󠄁l󠄁l󠄁b󠄁a󠄁c󠄁k󠄁
s󠄁t󠄁a󠄁c󠄁k󠄁s󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 P󠄁* f󠄁a󠄁m󠄁i󠄁l󠄁i󠄁e󠄁s󠄁;󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 P󠄁+󠄁 a󠄁s󠄁s󠄁e󠄁t󠄁s󠄁 r󠄁e󠄁m󠄁a󠄁i󠄁n󠄁 a󠄁v󠄁a󠄁i󠄁l󠄁a󠄁b󠄁l󠄁e󠄁.󠄁
T󠄁h󠄁e󠄁 d󠄁e󠄁c󠄁o󠄁d󠄁e󠄁r󠄁 a󠄁n󠄁d󠄁 P󠄁y󠄁t󠄁h󠄁o󠄁n󠄁 p󠄁a󠄁c󠄁k󠄁a󠄁g󠄁e󠄁 a󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁d󠄁 `textprov` r󠄁e󠄁l󠄁e󠄁a󠄁s󠄁e󠄁s󠄁 p󠄁i󠄁n󠄁n󠄁e󠄁d󠄁 i󠄁n󠄁
`package.json` a󠄁n󠄁d󠄁 `tools/requirements.txt`.󠄁 S󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 e󠄁n󠄁r󠄁o󠄁l󠄁l󠄁m󠄁e󠄁n󠄁t󠄁,󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁
p󠄁r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 `SHOW_TEXTPROV_TOGGLE` availability setting are independent of font selection.

The generated HTML already contains clean text before Pagefind indexing, so
Find in page, copy, metadata, and heading fragment links do not depend on a
client-side cleanup. Copying from the site produces plain text; source files
retain their marks. With JavaScript disabled the text remains clean and readable.
No claim is made about search ranking or every browser's Find implementation.

Only explicitly enrolled documents are decoded. U+E0100 and legitimate variation
sequences such as 辻 plus U+E0100 are preserved. The experimental marker values
are not reserved for TextProv; do not decode arbitrary imported text. This
integration produces AI marks only, using U+E0101 after a whole grapheme cluster.
The JS library also decodes its limited legacy replacement-PUA form. Other
Unicode variation selectors are left alone.

Heading IDs, local fragment links (`href="#…"`), and ID-reference attributes
such as `aria-describedby` are cleaned together. Their non-displayed identifiers
lose every U+E0101, including after CJK ideographs where it can be a genuine IVS;
this extra normalization is not applied to displayed prose. URLs with a path,
query, or origin are left unchanged, including their fragments.

A decoded heading ID that matches another element's ID on the same page fails
the build, naming the page. No numeric suffix or warning is produced: rename one
of the headings so links from other pages cannot silently reach the wrong
heading. An identifier that still contains a marker after cleaning, or a
non-empty identifier that becomes empty, also fails. Local fragment targets are
validated before percent-encoding.

## Maintenance

The npm decoder version is pinned in [package.json](../package.json) and
[pnpm-lock.yaml](../pnpm-lock.yaml); the Python producer version is pinned in
[tools/requirements.txt](../tools/requirements.txt).
CI installs both before provenance checks. Update the Python version guard in
[tools/dogfood.py](../tools/dogfood.py) when changing its pin. SDK sources
and releases are maintained in [textprov/textprov](https://github.com/textprov/textprov);
this repository has no vendored SDK copies.

The Python and npm package versions are independent. When updating either pin,
verify compatibility for this integration's AI selector and legacy
replacement-PUA encodings.

Executing authoring and preservation policy from an exact-pinned dependency is a
trust boundary: this repository trusts the installed SDK implementation to decide
which bytes are retained and which changes pass checking. The exact-version guard
and repository contract regression tests mitigate version drift and detect tested
behavior changes; they do not verify artifact integrity or establish that an
installed package matches the reviewed upstream source. A matching version string
is not an integrity check.

Font assets and original OFL notices remain under src/fonts; mapping tests cover
their supported Latin-1 subset. The visual
toggle uses CSS rather than special glyphs, so non-Latin text is supported too.
B󠄁o󠄁d󠄁y󠄁 p󠄁r󠄁o󠄁s󠄁e󠄁 k󠄁e󠄁e󠄁p󠄁s󠄁 i󠄁t󠄁s󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 f󠄁o󠄁n󠄁t󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁.󠄁 P󠄁* a󠄁d󠄁d󠄁s󠄁 c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁u󠄁a󠄁l󠄁 s󠄁p󠄁a󠄁c󠄁e󠄁 d󠄁o󠄁t󠄁s󠄁
f󠄁o󠄁r󠄁 r󠄁a󠄁w󠄁 m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁 t󠄁e󠄁x󠄁t󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 e󠄁n󠄁c󠄁o󠄁d󠄁i󠄁n󠄁g󠄁;󠄁 t󠄁h󠄁e󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁s󠄁h󠄁e󠄁d󠄁
p󠄁r󠄁o󠄁j󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁n󠄁t󠄁i󠄁n󠄁u󠄁e󠄁s󠄁 t󠄁o󠄁 u󠄁s󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 C󠄁S󠄁S󠄁.󠄁

Vale CI removes recorded AI selectors in its disposable checkout before running
terminology checks. The source filenames and line numbers remain available for
annotations. Locally, lint a clean temporary copy rather than stripping sources.

Source searches with `rg` or `grep` can miss marked words because selectors
occur between grapheme clusters. A search for `Basic`, for example, does not
match a source occurrence with a marker after each letter. For terminology
audits, search a decoded temporary copy of explicitly enrolled pages; preserve
the original files and never strip their marks in place. Vale CI already
decodes its disposable checkout with `bin/prepare-vale.mjs` before linting.
