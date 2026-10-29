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

The 0.2.0 migration is prepared but publication and the registry-backed npm
lockfile update are pending. Clean installs cannot complete until both packages
are published and `pnpm-lock.yaml` is updated. Local validation used built 0.2.0
artifacts, not registry installs. After release, install the pinned SDK
dependencies before using the repository commands from either agent:

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

`tools/dogfood.py` uses `correspondence()` for both authoring and checking.
It ignores whitespace, anchors on exact encoded bytes, then aligns visible
clusters in the gaps. Primary equal runs can be one cluster long; these text
comparisons cannot distinguish retained text from coincidental new text.
For example, replacing `cat` with `bag` retains the unmarked `a`; fully marking
the replacement instead reports backfill. Two-cluster coincidences are possible too.

`MIN_MOVE_CLUSTERS = 2` applies only to the final unmatched-block move pass.
Shorter blocks pair only if their encoded bytes are identical. This excludes
the reported Polish singleton coincidence while retaining checks for changed
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

Reduced tests reproduce both alignments. These exceptions are not evidence of
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

The decoder is pinned to npm `textprov` 0.2.0 in `package.json`, with the
`pnpm-lock.yaml` update pending publication; the Python producer is pinned to
PyPI `textprov==0.2.0` in
`tools/requirements.txt`. CI installs both before provenance checks. Update the
Python version guard in `tools/dogfood.py` when changing its pin. SDK sources
and releases are maintained in [textprov/textprov](https://github.com/textprov/textprov);
this repository has no vendored SDK copies. Font assets and original OFL notices
remain under src/fonts; mapping tests cover their supported Latin-1 subset. The visual
toggle uses CSS rather than special glyphs, so non-Latin text is supported too.
The existing body font remains unchanged.

Vale CI removes recorded AI selectors in its disposable checkout before running
terminology checks. The source filenames and line numbers remain available for
annotations. Locally, lint a clean temporary copy rather than stripping sources.

Source searches with `rg` or `grep` can miss marked words because selectors
occur between grapheme clusters. A search for `Basic`, for example, does not
match a source occurrence with a marker after each letter. For terminology
audits, search a decoded temporary copy of explicitly enrolled pages; preserve
the original files and never strip their marks in place. Vale CI already
decodes its disposable checkout with `bin/prepare-vale.mjs` before linting.
