# Carry English corrections into one locale (docs.onetimesecret.com)

Sixteen corrections were just committed to the English pages (review items
E1–E16). Bring the same corrections into your locale's pages. You work in an
isolated git worktree and commit there; the orchestrator cherry-picks.

## Paths

- `$S` = <scratch>
- `$WT` = your worktree root (`git rev-parse --show-toplevel`). Never edit or
  commit in `$REPO`.
- `$REPO` = the main docs checkout (the orchestrator fills in the path)
- `$APP` = the application repo, read-only (the orchestrator fills in the path)

## Setup

```sh
cd "$(git rev-parse --show-toplevel)"
git status --short                    # expect clean
git switch -c i18n/sync-english-<LOCALE>
node -e "import('unified').then(()=>console.log('node ok'))"
```

If the node check fails: `ln -s "$REPO/node_modules" node_modules` (gitignored).

## Inputs

- `$S/english-fixes/all.diff` — the 16 English commits as unified diffs with the
  invisible marks stripped. Each `### commit N` block names its review item.
  Item E7 ("Setup" → "Set up" in index.mdoc) needs no locale change.
- `docs/planning/i18n-review-2026-10-21/_english-and-general.md`, section 1 — the
  reasoning and evidence for each item.
- Your locale's pages: `src/content/docs/<LOCALE>/<same path as English>`. If your
  locale lacks a page, skip that item.
- Terminology: `src/content/docs/<LOCALE>/translations/glossary.md`,
  `_language-notes.md`, the resolution section at the end of
  `docs/planning/i18n-review-2026-10-21/<LOCALE>.md` (terms the fix round just
  settled), and shipped UI strings in `$APP/locales/content/<APP_LOCALE>/*.json`.
  When a sentence names a UI control (e.g. the **Create Link** button in E3),
  quote the shipped localized string exactly.

## Rules

1. For each item, find the corresponding passage in your locale page and
   change only what the English correction changed. Keep the locale's register
   and terms. Do not retranslate unrelated text.
2. Some locales already fixed an item on their own (for example E2, E4, the
   self-hosting link in E9). If the locale text already says what the corrected
   English says, leave it and note "already correct".
3. Code blocks (E13, E14, E15): copy the corrected English code exactly. If a
   locale translated a code comment, keep the translated comment but apply the
   code change. Link URLs (E9) and link text (E8, E16) follow the English
   change, translated, with `/<LOCALE>/` targets when the page exists in the
   locale tree (`$S/<LOCALE>/locale-tree.txt`), else `/en/`.
4. No body H1, no notes about the page's own completeness, no release numbers.

## Editing (TextProv, mandatory)

Never edit `.md`/`.mdoc` files with Edit/Write/sed. Use:

```sh
python3 $S/clean.py <file> [START [END]]     # unmarked view with line numbers
python3 tools/dogfood.py edit <file> --state ai --old-file <old.txt> --new-file <new.txt>
```

Write old/new text to `$S/fix/<LOCALE>/sync/` with the Write tool. Keep each old
span short (a phrase, at most a sentence). A known tool defect can make `check`
fail when the replaced span contains older unmarked text, or when a one-letter
deletion and a one-letter insertion of the same letter occur anywhere in the
same file. To avoid it, simulate before writing:

```sh
SIM_TMP=$S/fix/<LOCALE>/sync python3 $S/sim.py <file> <id1> [<id2> ...]   # uses <id>-old.txt / <id>-new.txt, writes nothing
```

If a written edit still fails `python3 tools/dogfood.py check --base HEAD`, you
may overwrite that one file with `git show HEAD:<path> > <path>` (only while it
holds nothing but your own uncommitted edits) and re-apply with narrower spans.
Never use git checkout/restore/reset, amend or rebase. Never push.

## Commits

Two commits, skipping an empty one. The hook adds the `[#I18N]` prefix.

1. `docs(i18n/<LOCALE>): carry the English code example fixes` — E13–E15.
2. `docs(i18n/<LOCALE>): carry the English corrections` — all other items.
   Body: the item ids applied, and the ids skipped as already correct or as
   missing pages.

Before each commit: `python3 tools/dogfood.py check --base HEAD` passes;
`git add` only the files of that commit. After the last commit, run
`python3 tools/dogfood.py check --base <the commit you started from>`; it must pass.

## Final message

Worktree path, branch, `git log --oneline <start>..HEAD`, per item: applied /
already correct / page missing, and anything you could not apply. Nothing else.
