# TextProv authoring and display

This site records future AI agent edits in published Markdown and Markdoc.
Existing content keeps its current attribution. Unmarked content has no recorded
origin; the toggle does not detect authorship or identify which agent was used.

## ChatGPT/Codex and Claude CLI

Python fnmatch patterns in tools/dogfooding.json use * across directory separators.

Both read AGENTS.md. Claude also imports it from CLAUDE.md and provides the
`/textprov` command. There are no tool interception hooks, model-specific event
schemas, automatic prompt logs, or global machine configuration changes.
Use the same repository commands from either agent, after `pnpm install`.
Python 3.9+ and Node.js (the project version) are required; no pip install.

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
Markdown syntax, links, and existing marks are checked before writing. Unchanged
clusters within the replacement keep their previous bytes and origin. The tool
adds `textprov: true` to the YAML frontmatter of an edited docs page.

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
text while still rejecting lost marks, backfill, and marks in protected syntax.
CI runs this preservation check against the merge base of the PR and target branch. The strict check is an
agent completion requirement; CI cannot infer whether unmarked text came from AI.

## Display and search

The vendored JS/TS integration decodes enrolled pages during Astro prerender and
in the dev server. AI runs become clean text in spans with data-textprov="ai".
The toggle appears on enrolled pages, changes CSS only, persists the reader's preference locally, defaults
to hidden, and works with every font. The help text explains what is recorded.

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

A decoded heading ID that matches an existing ID on the same page gets a numeric
suffix, and the build prints a warning naming the page. Links on that page are
remapped, but links from other pages to the unsuffixed fragment reach the
existing heading, so check them when the warning appears.

## Maintenance

The decoder and Python producer are pinned under vendor/textprov with their
upstream commit and Apache license. Font assets and original OFL notices remain
under src/fonts; mapping tests cover their supported Latin-1 subset. The visual
toggle uses CSS rather than special glyphs, so non-Latin text is supported too.
The existing body font remains unchanged.

Vale CI removes recorded AI selectors in its disposable checkout before running
terminology checks. The source filenames and line numbers remain available for
annotations. Locally, lint a clean temporary copy rather than stripping sources.
