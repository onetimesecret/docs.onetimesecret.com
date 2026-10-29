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
`textprov.clusters()` and `textprov.correspondence()` from the exact-pinned PyPI
`textprov==0.3.0` SDK to preserve matched bytes. Checking delegates to the SDK's
`textprov.check_text()` with a prose-eligibility profile from this repository's
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
their encoded bytes are identical. This excludes the reported Polish singleton
coincidence while retaining checks for changed
marks on two-cluster moves. Raising the threshold to three misses those changes;
adding a minimum to primary equal runs also breaks retained-byte and
mark-preservation cases. Neither threshold establishes authorship.

### Known gaps and follow-up: PR #467

[`CorrespondenceLimitTests`](../tools/tests/test_dogfood.py) records these limits:

- In-place coincidental clusters can remain unmarked.
- A singleton move with changed bytes is treated as new text, potentially
  concealing relabelling or, in preservation-only mode, a removed mark.
- Separate deletion and insertion of identical blocks can each pass while the
  cumulative comparison reports backfill as a move.

A policy follow-up must distinguish declared edit history from inferred
retention, or report ambiguous alignment for review. Preserve legacy bytes,
selector and legacy-PUA encodings, duplicate attribution, variation sequences,
reflow, move checks, and existing cumulative-edit regressions. Until then,
inspect attribution diffs and check against the recorded starting base, not
just each preceding edit. Do not strip marks or mark legacy text to pass.
`--preserve-only` permits combined human/AI diffs; it does not resolve ambiguity.

The historical PR #467 accommodations are documented here rather than encoded
as locale-specific checker exemptions:

- **Bulgarian:** `197f8796` in
  `src/content/docs/bg/custom-domains/setup-guide.md` removed selectors from
  `е` and `н` in adjacent `се нуждае` prose, despite its status-label commit
  message. Those selectors are present again at reviewed HEAD `44af276c`.
  The later `76d8035a` status correction retains an unmarked `н` in `Активна`
  relative to `bc5c9ae2`; the new `а` is AI-marked.
- **Spanish:** `a88e666c` deliberately leaves `valor`'s `r` unmarked in
  `src/content/docs/es/self-hosting/index.md`: it aligns with legacy `secreto`'s
  `r` against `bc5c9ae2`. The other letters in `valor` remain AI-marked.

Repository contract regression tests reproduce both alignments against the
SDK's correspondence and checker. These exceptions are not evidence of
retained authorship. Their historical comparison base does not replace the
starting-base check or CI's current merge base. For the develop → main PR #459,
#469 re-anchored develop against `56e953fc`, the merge base of main and
develop: 849 clusters in 89 files (`4d082657`, `9c946a6d`).

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
delete `textprov: true` from that page by hand, so the reader toggle does not
appear on a page with no AI text.

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
The toggle is a "Highlight AI edits" switch below the page title on enrolled
pages, with an information button whose popover links to the reader guide.
Splash pages (the homepages) have no page title and show no toggle; their AI
runs are still decoded, and a preference saved on another page still highlights
them. The toggle changes CSS only, persists the reader's preference locally,
defaults to hidden, and works with every font. The help text explains what is
recorded. Without JavaScript the controls stay hidden.

Every enrolled page carries one `data-textprov-document="true"` marker, emitted
only by `src/components/starlight/TextProvMarker.astro`; the middleware decodes
nothing without it. `pnpm run check:textprov` reads `dist/` after a build and
fails if an enrolled page (including English fallbacks in other locales) lacks
the marker, carries two, or still contains a raw selector.

Set `SHOW_TEXTPROV_TOGGLE=false` (or `0`) at build time to hide the toggle on
every page; the deploy workflow reads it from the environment variable of the
same name. Enrolled pages are still decoded to clean text.

Reveal mode uses gradient mist with a dotted underline, replacing the wavy
provenance cue. `src/styles/textprov.css` adapts the upstream treatment at
TextProv commit `57257b877f934ce2edf6b221ad6fa100546dbb9c`:󠄁 1󠄁4󠄁%󠄁 b󠄁a󠄁s󠄁e󠄁 t󠄁i󠄁n󠄁t󠄁,󠄁
1󠄁1󠄁5󠄁-󠄁d󠄁e󠄁g󠄁r󠄁e󠄁e󠄁 g󠄁r󠄁a󠄁d󠄁i󠄁e󠄁n󠄁t󠄁,󠄁 1󠄁1󠄁.󠄁2󠄁p󠄁x󠄁 g󠄁l󠄁o󠄁w󠄁 b󠄁l󠄁u󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 4󠄁p󠄁x󠄁 s󠄁p󠄁r󠄁e󠄁a󠄁d󠄁,󠄁 2󠄁7󠄁%󠄁 g󠄁l󠄁o󠄁w󠄁 o󠄁p󠄁a󠄁c󠄁i󠄁t󠄁y󠄁 i󠄁n󠄁 l󠄁i󠄁g󠄁h󠄁t󠄁
a󠄁p󠄁p󠄁e󠄁a󠄁r󠄁a󠄁n󠄁c󠄁e󠄁 a󠄁n󠄁d󠄁 1󠄁7󠄁.󠄁5󠄁5󠄁%󠄁 i󠄁n󠄁 d󠄁a󠄁r󠄁k󠄁,󠄁 a󠄁n󠄁d󠄁 a󠄁 1󠄁.󠄁5󠄁p󠄁x󠄁 d󠄁o󠄁t󠄁t󠄁e󠄁d󠄁 l󠄁i󠄁n󠄁e󠄁 a󠄁t󠄁 8󠄁0󠄁%󠄁 source-color opacity
with a 5px offset. The source color uses Starlight's existing accent. The toggle
label shows the same treatment as a legend. Hidden mode and print add no
provenance paint; the words and native annotation styles stay intact.

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
p󠄁r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 `SHOW_TEXTPROV_TOGGLE` availability setting are unchanged.

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

## Passage and exact display

T󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁 i󠄁s󠄁 `passage`.󠄁 T󠄁h󠄁e󠄁 d󠄁o󠄁c󠄁s󠄁 a󠄁d󠄁a󠄁p󠄁t󠄁e󠄁r󠄁 u󠄁s󠄁e󠄁s󠄁 b󠄁o󠄁u󠄁n󠄁d󠄁e󠄁d󠄁 w󠄁o󠄁r󠄁d󠄁-󠄁l󠄁e󠄁v󠄁e󠄁l󠄁
c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁 r󠄁a󠄁t󠄁h󠄁e󠄁r󠄁 t󠄁h󠄁a󠄁n󠄁 t󠄁h󠄁e󠄁 n󠄁p󠄁m󠄁 r󠄁e󠄁n󠄁d󠄁e󠄁r󠄁e󠄁r󠄁'󠄁s󠄁 w󠄁h󠄁o󠄁l󠄁e󠄁-󠄁b󠄁l󠄁o󠄁c󠄁k󠄁 e󠄁x󠄁p󠄁a󠄁n󠄁s󠄁i󠄁o󠄁n󠄁.󠄁 A󠄁 s󠄁i󠄁n󠄁g󠄁l󠄁e󠄁 m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁
c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁 e󠄁x󠄁p󠄁a󠄁n󠄁d󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁o󠄁 i󠄁t󠄁s󠄁 w󠄁o󠄁r󠄁d󠄁.󠄁 N󠄁e󠄁a󠄁r󠄁b󠄁y󠄁 r󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 m󠄁e󠄁r󠄁g󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁i󠄁n󠄁 a󠄁 s󠄁e󠄁n󠄁t󠄁e󠄁n󠄁c󠄁e󠄁 w󠄁h󠄁e󠄁n󠄁
t󠄁h󠄁e󠄁 u󠄁n󠄁m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁 g󠄁a󠄁p󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁s󠄁 a󠄁t󠄁 m󠄁o󠄁s󠄁t󠄁 t󠄁w󠄁o󠄁 w󠄁o󠄁r󠄁d󠄁s󠄁 a󠄁n󠄁d󠄁 3󠄁2󠄁 U󠄁n󠄁i󠄁c󠄁o󠄁d󠄁e󠄁 c󠄁o󠄁d󠄁e󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁s󠄁.󠄁
P󠄁u󠄁n󠄁c󠄁t󠄁u󠄁a󠄁t󠄁i󠄁o󠄁n󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 e󠄁d󠄁i󠄁t󠄁s󠄁 s󠄁t󠄁a󠄁y󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁.󠄁 N󠄁o󠄁 d󠄁e󠄁n󠄁s󠄁i󠄁t󠄁y󠄁 t󠄁h󠄁r󠄁e󠄁s󠄁h󠄁o󠄁l󠄁d󠄁 e󠄁x󠄁p󠄁a󠄁n󠄁d󠄁s󠄁 a󠄁 r󠄁a󠄁n󠄁g󠄁e󠄁 t󠄁o󠄁 a󠄁
w󠄁h󠄁o󠄁l󠄁e󠄁 s󠄁e󠄁n󠄁t󠄁e󠄁n󠄁c󠄁e󠄁 o󠄁r󠄁 p󠄁a󠄁r󠄁a󠄁g󠄁r󠄁a󠄁p󠄁h󠄁.󠄁

`s󠄁rc/lib/textprov/passages.mjs` u󠄁s󠄁e󠄁s󠄁 `Intl.Segmenter` w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 i󠄁n󠄁h󠄁e󠄁r󠄁i󠄁t󠄁e󠄁d󠄁 H󠄁T󠄁M󠄁L󠄁
l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁,󠄁 f󠄁a󠄁l󠄁l󠄁i󠄁n󠄁g󠄁 b󠄁a󠄁c󠄁k󠄁 t󠄁o󠄁 E󠄁n󠄁g󠄁l󠄁i󠄁s󠄁h󠄁 f󠄁o󠄁r󠄁 i󠄁n󠄁v󠄁a󠄁l󠄁i󠄁d󠄁 l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁 t󠄁a󠄁g󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 H󠄁T󠄁M󠄁L󠄁 a󠄁d󠄁a󠄁p󠄁t󠄁e󠄁r󠄁
m󠄁a󠄁p󠄁s󠄁 c󠄁l󠄁e󠄁a󠄁n󠄁-󠄁t󠄁e󠄁x󠄁t󠄁 o󠄁f󠄁f󠄁s󠄁e󠄁t󠄁s󠄁 b󠄁a󠄁c󠄁k󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 t󠄁e󠄁x󠄁t󠄁 n󠄁o󠄁d󠄁e󠄁s󠄁,󠄁 p󠄁r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁i󠄁n󠄁g󠄁 i󠄁n󠄁l󠄁i󠄁n󠄁e󠄁
f󠄁o󠄁r󠄁m󠄁a󠄁t󠄁t󠄁i󠄁n󠄁g󠄁 a󠄁n󠄁d󠄁 n󠄁a󠄁t󠄁i󠄁v󠄁e󠄁 a󠄁n󠄁n󠄁o󠄁t󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 p󠄁a󠄁r󠄁e󠄁n󠄁t󠄁s󠄁.󠄁 B󠄁l󠄁o󠄁c󠄁k󠄁 b󠄁o󠄁u󠄁n󠄁d󠄁a󠄁r󠄁i󠄁e󠄁s󠄁,󠄁 e󠄁x󠄁c󠄁l󠄁u󠄁d󠄁e󠄁d󠄁 e󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁,󠄁
l󠄁i󠄁n󠄁e󠄁 b󠄁r󠄁e󠄁a󠄁k󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 l󠄁a󠄁n󠄁g󠄁u󠄁a󠄁g󠄁e󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 s󠄁t󠄁o󠄁p󠄁 g󠄁r󠄁o󠄁u󠄁p󠄁i󠄁n󠄁g󠄁.󠄁 O󠄁n󠄁l󠄁y󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁e󠄁d󠄁 c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁
g󠄁e󠄁t󠄁s󠄁 a󠄁 `data-textprov-passage="ai"` f󠄁r󠄁a󠄁g󠄁m󠄁e󠄁n󠄁t󠄁;󠄁 t󠄁h󠄁e󠄁 a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁e󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁f󠄁i󠄁e󠄁s󠄁 d󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁
c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁,󠄁 n󠄁o󠄁t󠄁 a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁f󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁 i󠄁n󠄁s󠄁i󠄁d󠄁e󠄁 i󠄁t󠄁.󠄁

P󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 c󠄁o󠄁n󠄁t󠄁e󠄁x󠄁t󠄁 h󠄁a󠄁s󠄁 a󠄁 b󠄁a󠄁c󠄁k󠄁g󠄁r󠄁o󠄁u󠄁n󠄁d󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 a󠄁 g󠄁l󠄁o󠄁w󠄁 o󠄁r󠄁 d󠄁o󠄁t󠄁t󠄁e󠄁d󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁l󠄁i󠄁n󠄁e󠄁.󠄁 E󠄁x󠄁a󠄁c󠄁t󠄁
r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁e󠄁d󠄁 c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁s󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁 d󠄁o󠄁t󠄁t󠄁e󠄁d󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁l󠄁i󠄁n󠄁e󠄁s󠄁 i󠄁n󠄁 b󠄁o󠄁t󠄁h󠄁 d󠄁e󠄁t󠄁a󠄁i󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁s󠄁,󠄁 e󠄁x󠄁c󠄁e󠄁p󠄁t󠄁
w󠄁h󠄁e󠄁r󠄁e󠄁 l󠄁i󠄁n󠄁k󠄁s󠄁 o󠄁r󠄁 n󠄁a󠄁t󠄁i󠄁v󠄁e󠄁-󠄁d󠄁e󠄁c󠄁o󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 h󠄁o󠄁o󠄁k󠄁s󠄁 r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁e󠄁 t󠄁h󠄁a󠄁t󠄁 c󠄁h󠄁a󠄁n󠄁n󠄁e󠄁l󠄁.󠄁 E󠄁x󠄁a󠄁c󠄁t󠄁 m󠄁o󠄁d󠄁e󠄁 a󠄁d󠄁d󠄁s󠄁
m󠄁i󠄁s󠄁t󠄁 a󠄁n󠄁d󠄁 g󠄁l󠄁o󠄁w󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁o󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁 r󠄁a󠄁n󠄁g󠄁e󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 t󠄁e󠄁s󠄁t󠄁s󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁-󠄁c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁
a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁 t󠄁o󠄁 m󠄁a󠄁t󠄁c󠄁h󠄁 n󠄁p󠄁m󠄁 `te󠄁xtprov`;󠄁 p󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 c󠄁o󠄁v󠄁e󠄁r󠄁a󠄁g󠄁e󠄁 i󠄁n󠄁t󠄁e󠄁n󠄁t󠄁i󠄁o󠄁n󠄁a󠄁l󠄁l󠄁y󠄁 d󠄁i󠄁f󠄁f󠄁e󠄁r󠄁s󠄁.󠄁

T󠄁h󠄁e󠄁 n󠄁e󠄁s󠄁t󠄁e󠄁d󠄁 `.textprov-ai` s󠄁p󠄁a󠄁n󠄁s󠄁 r󠄁e󠄁t󠄁a󠄁i󠄁n󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁h󠄁e󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁e󠄁d󠄁 c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁 r󠄁a󠄁n󠄁g󠄁e󠄁s󠄁;󠄁
w󠄁h󠄁i󠄁t󠄁e󠄁s󠄁p󠄁a󠄁c󠄁e󠄁 i󠄁s󠄁 u󠄁n󠄁a󠄁s󠄁s󠄁i󠄁g󠄁n󠄁e󠄁d󠄁 i󠄁n󠄁 t󠄁h󠄁i󠄁s󠄁 i󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁 m󠄁e󠄁t󠄁a󠄁d󠄁a󠄁t󠄁a󠄁.󠄁 G󠄁r󠄁o󠄁u󠄁p󠄁i󠄁n󠄁g󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 n󠄁o󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁
m󠄁a󠄁r󠄁k󠄁s󠄁 a󠄁n󠄁d󠄁 a󠄁s󠄁s󠄁i󠄁g󠄁n󠄁s󠄁 n󠄁o󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁 t󠄁o󠄁 u󠄁n󠄁m󠄁a󠄁r󠄁k󠄁e󠄁d󠄁 t󠄁e󠄁x󠄁t󠄁.󠄁 T󠄁h󠄁e󠄁 d󠄁i󠄁s󠄁p󠄁l󠄁a󠄁y󠄁 s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁o󠄁r󠄁 o󠄁f󠄁f󠄁e󠄁r󠄁s󠄁
**P󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁** a󠄁n󠄁d󠄁 **E󠄁x󠄁a󠄁c󠄁t󠄁 c󠄁h󠄁a󠄁r󠄁a󠄁c󠄁t󠄁e󠄁r󠄁s󠄁**,󠄁 w󠄁i󠄁t󠄁h󠄁 p󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁 a󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁.󠄁 I󠄁t󠄁s󠄁 c󠄁h󠄁o󠄁i󠄁c󠄁e󠄁
i󠄁s󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁l󠄁y󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁 `docs:textprov:display`;󠄁 `docs:textprov` c󠄁o󠄁n󠄁t󠄁i󠄁n󠄁u󠄁e󠄁s󠄁 t󠄁o󠄁
c󠄁o󠄁n󠄁t󠄁r󠄁o󠄁l󠄁 v󠄁i󠄁s󠄁i󠄁b󠄁i󠄁l󠄁i󠄁t󠄁y󠄁.󠄁 U󠄁n󠄁k󠄁n󠄁o󠄁w󠄁n󠄁 o󠄁r󠄁 i󠄁n󠄁a󠄁c󠄁c󠄁e󠄁s󠄁s󠄁i󠄁b󠄁l󠄁e󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁s󠄁 f󠄁a󠄁l󠄁l󠄁 b󠄁a󠄁c󠄁k󠄁 t󠄁o󠄁 p󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁s󠄁.󠄁

`data-textprov-display="exact"` o󠄁n󠄁 t󠄁h󠄁e󠄁 r󠄁o󠄁o󠄁t󠄁 d󠄁i󠄁s󠄁a󠄁b󠄁l󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 b󠄁r󠄁o󠄁a󠄁d󠄁 f󠄁r󠄁a󠄁g󠄁m󠄁e󠄁n󠄁t󠄁 p󠄁a󠄁i󠄁n󠄁t󠄁
a󠄁n󠄁d󠄁 r󠄁e󠄁v󠄁e󠄁a󠄁l󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁 t󠄁h󠄁e󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁 s󠄁p󠄁a󠄁n󠄁s󠄁.󠄁 B󠄁o󠄁t󠄁h󠄁 p󠄁r󠄁o󠄁j󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 k󠄁e󠄁e󠄁p󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁c󠄁a󠄁l󠄁 t󠄁e󠄁x󠄁t󠄁,󠄁 c󠄁o󠄁p󠄁y󠄁,󠄁
s󠄁e󠄁a󠄁r󠄁c󠄁h󠄁,󠄁 a󠄁n󠄁d󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 a󠄁t󠄁t󠄁r󠄁i󠄁b󠄁u󠄁t󠄁i󠄁o󠄁n󠄁.󠄁 T󠄁h󠄁e󠄁 i󠄁n󠄁l󠄁i󠄁n󠄁e󠄁 p󠄁r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 b󠄁o󠄁o󠄁t󠄁s󠄁t󠄁r󠄁a󠄁p󠄁 a󠄁l󠄁s󠄁o󠄁 c󠄁o󠄁v󠄁e󠄁r󠄁s󠄁
p󠄁a󠄁g󠄁e󠄁s󠄁 w󠄁i󠄁t󠄁h󠄁 n󠄁o󠄁 v󠄁i󠄁s󠄁i󠄁b󠄁l󠄁e󠄁 c󠄁o󠄁n󠄁t󠄁r󠄁o󠄁l󠄁s󠄁.󠄁 G󠄁r󠄁o󠄁u󠄁p󠄁i󠄁n󠄁g󠄁 h󠄁e󠄁l󠄁p󠄁 u󠄁s󠄁e󠄁s󠄁 a󠄁 n󠄁e󠄁w󠄁 E󠄁n󠄁g󠄁l󠄁i󠄁s󠄁h󠄁 t󠄁r󠄁a󠄁n󠄁s󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 k󠄁e󠄁y󠄁
s󠄁o󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁 l󠄁o󠄁c󠄁a󠄁l󠄁e󠄁s󠄁 f󠄁a󠄁l󠄁l󠄁 b󠄁a󠄁c󠄁k󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 a󠄁c󠄁c󠄁u󠄁r󠄁a󠄁t󠄁e󠄁 e󠄁x󠄁p󠄁l󠄁a󠄁n󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 u󠄁n󠄁t󠄁i󠄁l󠄁 t󠄁r󠄁a󠄁n󠄁s󠄁l󠄁a󠄁t󠄁e󠄁d󠄁.󠄁

T󠄁h󠄁e󠄁 s󠄁h󠄁a󠄁r󠄁e󠄁d󠄁 T󠄁e󠄁x󠄁t󠄁P󠄁r󠄁o󠄁v󠄁 r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 i󠄁m󠄁p󠄁l󠄁e󠄁m󠄁e󠄁n󠄁t󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 e󠄁x󠄁p󠄁o󠄁s󠄁e󠄁 t󠄁h󠄁e󠄁 s󠄁a󠄁m󠄁e󠄁 d󠄁i󠄁s󠄁t󠄁i󠄁n󠄁c󠄁t󠄁i󠄁o󠄁n󠄁.󠄁
P󠄁a󠄁s󠄁s󠄁a󠄁g󠄁e󠄁 g󠄁r󠄁o󠄁u󠄁p󠄁s󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁i󠄁n󠄁g󠄁 m󠄁u󠄁l󠄁t󠄁i󠄁p󠄁l󠄁e󠄁 b󠄁a󠄁s󠄁e󠄁l󠄁i󠄁n󠄁e󠄁 c󠄁l󠄁a󠄁s󠄁s󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁 u󠄁s󠄁e󠄁 a󠄁 n󠄁e󠄁u󠄁t󠄁r󠄁a󠄁l󠄁
m󠄁i󠄁x󠄁e󠄁d󠄁 t󠄁r󠄁e󠄁a󠄁t󠄁m󠄁e󠄁n󠄁t󠄁,󠄁 w󠄁h󠄁i󠄁l󠄁e󠄁 e󠄁x󠄁a󠄁c󠄁t󠄁 r󠄁a󠄁n󠄁g󠄁e󠄁s󠄁 k󠄁e󠄁e󠄁p󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 s󠄁o󠄁u󠄁r󠄁c󠄁e󠄁 i󠄁d󠄁e󠄁n󠄁t󠄁i󠄁t󠄁i󠄁e󠄁s󠄁.󠄁 T󠄁h󠄁i󠄁s󠄁 d󠄁o󠄁c󠄁s󠄁
a󠄁d󠄁a󠄁p󠄁t󠄁e󠄁r󠄁 i󠄁n󠄁t󠄁e󠄁n󠄁t󠄁i󠄁o󠄁n󠄁a󠄁l󠄁l󠄁y󠄁 r󠄁e󠄁a󠄁d󠄁s󠄁 o󠄁n󠄁l󠄁y󠄁 r󠄁e󠄁c󠄁o󠄁r󠄁d󠄁e󠄁d󠄁 A󠄁I󠄁 m󠄁a󠄁r󠄁k󠄁s󠄁;󠄁 l󠄁e󠄁g󠄁i󠄁t󠄁i󠄁m󠄁a󠄁t󠄁e󠄁 h󠄁u󠄁m󠄁a󠄁n󠄁-󠄁s󠄁e󠄁l󠄁e󠄁c󠄁t󠄁o󠄁r󠄁
v󠄁a󠄁r󠄁i󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 s󠄁e󠄁q󠄁u󠄁e󠄁n󠄁c󠄁e󠄁s󠄁 r󠄁e󠄁m󠄁a󠄁i󠄁n󠄁 u󠄁n󠄁t󠄁o󠄁u󠄁c󠄁h󠄁e󠄁d󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 e󠄁n󠄁r󠄁o󠄁l󠄁l󠄁m󠄁e󠄁n󠄁t󠄁 p󠄁o󠄁l󠄁i󠄁c󠄁y󠄁.󠄁

## Maintenance

The decoder is pinned to npm `textprov` 0.2.1 in `package.json` and
`pnpm-lock.yaml`; the Python producer is pinned to PyPI `textprov==0.3.0` in
`tools/requirements.txt`. `pnpm-workspace.yaml` excludes textprov 0.2.1 from
pnpm's minimum release age; that entry can go once the release is a day old. CI installs both before provenance checks. Update the
Python version guard in `tools/dogfood.py` when changing its pin. SDK sources
and releases are maintained in [textprov/textprov](https://github.com/textprov/textprov);
this repository has no vendored SDK copies.

Python 0.3.0 producer output remains compatible with the npm 0.2.1 decoder for
this integration's AI selector and legacy replacement-PUA encodings. The
[upstream release comparison](https://github.com/textprov/textprov/compare/js-v0.2.1...python-v0.3.0)
changes authoring and checking policy, not the wire format: `SPEC_VERSION` remains
`0.2`, and `python/textprov/_core.py`, `_encode.py`, `_grapheme.py`, `mapping.json`,
and the JavaScript decoder are unchanged between those tags. The package versions
are independent; their differing numbers do not require a decoder upgrade here.

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
