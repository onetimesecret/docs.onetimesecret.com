# Docs translation fix protocol (docs.onetimesecret.com)

You are fixing one locale's documentation pages using the review report written
for that locale. You work in an isolated git worktree and make granular commits
there. The orchestrator cherry-picks your commits afterwards.

## Paths

- `$S` = <scratch>
- `$WT` = your worktree root: run `git rev-parse --show-toplevel` first. Every repo
  path below is relative to `$WT`. Never edit or commit in
  /Users/d/Projects/ops/sites/docs.onetimesecret.com (the main checkout).
- `$APP` = /Users/d/Projects/dev/onetimesecret/onetimesecret (application repo, read-only)
- Your report: `$WT/docs/planning/i18n-review-2026-10-21/<LOCALE>.md`

## Setup (do this first)

```sh
cd "$(git rev-parse --show-toplevel)"
git --no-pager log -1 --format='%h %s'      # expect b2883096 or a descendant
git status --short                           # expect clean
git switch -c i18n/fix-<LOCALE>              # the commit-msg hook keys its [#I18N] prefix on this name
node -e "import('unified').then(()=>console.log('node ok'))"
```

If the node check fails, run
`ln -s /Users/d/Projects/ops/sites/docs.onetimesecret.com/node_modules node_modules`
in `$WT` (it is gitignored) and repeat the check. TextProv needs it.

Read, once: `$S/REVIEW_PROTOCOL.md` (sources and rules the reviewer used), your
report, `src/content/docs/<LOCALE>/translations/_language-notes.md`, and
`src/content/docs/<LOCALE>/translations/glossary.md`.

## Rules for every fix

1. **Verify before fixing.** Reviewers can be wrong. Re-read the English line
   (`$S/en/<page>`) and, for UI labels, the shipped string in
   `$APP/locales/content/<APP_LOCALE>/*.json` (app main, 145c1e7cfa). Do NOT use
   `/Users/d/Projects/run/onetimesecret-docker`: that bundle is stale and caused
   most of the label drift. If you disagree with a finding, skip it and record why.
2. **UI labels**: the reader must find the named control in the localized app.
   Quote the shipped localized string exactly. Labels the app hard-codes in
   English (corner options Square/Rounded/Extra Rounded, font options
   Serif/Sans Serif/Monospace/System UI, `PLAN_LABELS` plan names) stay in English.
3. **Terminology**: for prose terms, the docs glossary wins; where it is silent,
   use the app governance binding (`$APP/generated/i18n/.resolved/<APP_LOCALE>.json`),
   else the rendering most pages in this locale already use. Do not edit
   glossary or language-notes files; record proposed changes instead.
4. **Minimal edits.** Change only the words that are wrong. Do not restyle or
   retranslate passages that have no finding.
5. **Scope**: only `src/content/docs/<LOCALE>/**` pages listed in `$S/<LOCALE>/files.txt`,
   `src/content/i18n/<LOCALE>.json` (sidebar labels, only for keys the report
   flags), and your report file. English pages, other locales, glossary files,
   and app files are out of scope: record such issues, do not fix them.
6. No body H1, no notes about the page's own completeness, no added release
   version numbers. Keep code blocks byte-identical to the English except
   translated comments.

## How to edit prose (TextProv, mandatory)

Never use Edit/Write/sed on `.md` or `.mdoc` files: they carry an invisible
U+E0101 mark after almost every AI-written character, and TextProv must record
your changes. Use only:

```sh
python3 $S/clean.py src/content/docs/<LOCALE>/<page> [START [END]]   # unmarked view with line numbers
python3 tools/dogfood.py edit src/content/docs/<LOCALE>/<page> --state ai --old-file <old.txt> --new-file <new.txt>
```

- Write the old passage (copied from the `clean.py` output, no line-number
  prefix) and its replacement to files under `$S/fix/<LOCALE>/tmp/` with the
  Write tool. Use files, not `--old`/`--new` strings: quotes and apostrophes
  break shell quoting.
- The old passage must match exactly once in the unmarked file. Use a short but
  unique span (a sentence or a list item), not a whole section.
- Add `--dry-run` when unsure. Always re-read with `clean.py` after editing; line
  numbers shift.
- The frontmatter `title`/`description` can be edited the same way.
- `src/content/i18n/<LOCALE>.json` is JSON outside TextProv: use the Edit tool.

## Granular commits

Group fixes by kind and commit each group separately, in this order, skipping
empty groups. Commit subject format: `docs(i18n/<LOCALE>): <what>` (lowercase,
imperative, under 72 chars). Body: one to three lines naming the pages and the
kind of fix. No attribution trailers.

1. `match <area> labels to the shipped app` — UI label mismatches (one commit per page if a page has many, e.g. branding).
2. `correct mistranslations in <pages>` — accuracy, omission/addition, product aberrations.
3. `use consistent terms for <terms>` — terminology unification.
4. `fix register breaks` — address-form and politeness.
5. `link to <Language> pages that exist` — `/en/` links whose target exists in `$S/<LOCALE>/locale-tree.txt`.
6. `fix fluency and typography` — minor wording, punctuation, markup.
7. `align sidebar labels with page titles` — `src/content/i18n/<LOCALE>.json`.
8. `docs(planning): record <Language> fix-round resolution` — your report file.

Before each commit:

```sh
python3 tools/dogfood.py check --base HEAD     # must pass
git add <only the files in this group>
git commit -m "<subject>" -m "<body>"
```

If a hook rewrites a file (trailing whitespace, end of file), re-run the check,
re-add, and commit again. Never amend, rebase, or reset. Never commit
`package.json` or anything outside your scope. Never push.

After the last content commit, run
`python3 tools/dogfood.py check --base b2883096` — it must pass.

## Resolution record (last commit)

Append to your report:

```markdown
## Resolution (fix round, 2026-10-21)

| Commit | Subject |
|---|---|

### Skipped findings

| Page:line | Finding | Reason |
|---|---|---|

### Decisions needed

- <glossary change, English source change, or app change the fix depends on, with evidence>
```

## Final message

Reply with: worktree path, branch name, `git log --oneline b2883096..HEAD`,
counts fixed/skipped, and the decisions-needed list. Nothing else.
