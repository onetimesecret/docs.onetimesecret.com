# Validation criteria — A through L

These are the pass/fail criteria that the qa-automation-engineer agent validated against in `qa-validation.md`. Defined in the agent's brief and reproduced here so the validation report is interpretable on its own.

The criteria are not a standard framework — they were drafted ad-hoc for this specific retrospective, scoped to the two pieces of work being validated (the guide repair in this project and the cross-locale audit in the onetimesecret app project). Lettering exists so each pass/fail line in `qa-validation.md` can be matched unambiguously to a criterion.

---

## Part 1: Guide repair criteria (A–G)

Validation target: the three files edited by the neutral-editor agent in `src/content/docs/de/translations/`. See `guide-repair-report.md` for the agent's account of the edits.

### A. No cross-file term contradiction

`glossary.md` and `language-notes.md` must agree on the `secret` term rule. If one says "always Geheimnis" and the other says "object vs. content split", that is a contradiction and a fail. The corrected rule is the object/content split: `Geheimnis` for the record/container (verbs: burn, share, create, view, destroy, expire), `Nachricht` for the revealed payload (post-reveal display, encrypted_message, truncated content). Both files must reflect this rule.

### B. No du-form examples applicable to de_AT

Every `\b(du|dein|dich|dir|deine[mnrs]?)\b` hit in `language-notes.md` must be either:
- inside a block explicitly marked as `de` / `German (Germany)` / DE-only, or
- carrying an explicit `NOT for de_AT` warning nearby, or
- a quoted illustration of a wrong pattern (inside a "don't do this" table)

Any unmarked du-form example in an AT-relevant or unscoped section is a fail.

### C. No residual change-log framing in language-notes.md

Past-tense descriptive phrasing that implies "we did this" rather than "you must do this" must be absent. Patterns to grep for: `Changed from`, `was changed`, `was standardized`, `Thinking Behind Changes`, `Summary of Changes`, `The initial file`, `The existing partial translations`. The "Thinking Behind Changes" section must be gone entirely.

### D. Object vs. content split documented with examples

`language-notes.md` must contain (a) an explicit rule distinguishing `Geheimnis` (record/container, with the verb list) from `Nachricht` (revealed payload, with the context list), and (b) concrete bilingual examples of both uses.

### E. Reference baseline pin present

`language-notes.md` must reference commit `f95b03f44` and path `src/locales/de_AT.json` (in the onetimesecret app repo) as the authoritative de_AT baseline. This is the last human-curated snapshot with consistent Sie-form and the object/content split.

### F. Regional tagging on every example

Every code block, table row, and bullet example in `language-notes.md` must carry a region tag (`de`, `de_AT`, `both`, or equivalently `German (Germany)` / `German (Austria)`). No bare examples.

### G. de-translation-notes.txt archival marker

The file must still exist (not deleted, for git history continuity) and must open with a clear "historical / non-normative / not for use as guidance" banner. The body of the transcript may be unchanged below the banner.

### Bonus — pre-existing glossary issues

Not pass/fail criteria; the agent was asked to flag whether these pre-existing glossary inconsistencies survived the edit pass:

- `glossary.md` `burn` row: AT=`verbrennen`, DE=`löschen` — divergent
- `glossary.md` `Sign In` row: AT=`Eintragen` (unusual), DE=`Anmelden`
- `glossary.md` `encrypted in transit/at rest` rows: AT and DE phrasing diverge stylistically

---

## Part 2: Cross-locale audit criteria (H–L)

Validation target: the cross-locale audit report (`cross-locale-audit.md`) produced by the general-purpose agent against `/Users/d/Projects/dev/onetimesecret/worktrees/i18n-harmonization`. The agent was asked to reproduce the audit's claims independently against the git history rather than reading the agent's transcript directly.

### H. Four High-severity locales with commit SHAs and register flips

The audit names: de_AT (`b08e59838`), pt_PT (`3f9d8d3d2`), uk (`5c7d5c362`), hu (`bea7e1b7e`). For each:
- The commit must exist and its message must contain "Harmonize".
- It must touch files under `locales/content/<locale>/`.
- A spot-check of `email.json` or `session-auth.json` via `git show <parent>:<path>` vs. current content must confirm the register flip claim. Look for T-V pronoun flips appropriate to each language: Sie→du for de_AT; você/seu→tu/teu for pt_PT; Ви/Вас→ти for uk; Ön→te for hu.

### I. Medium-severity claims for da_DK and zh

The audit claims:
- **da_DK**: brand-term swap `besked`→`hemmelighed` (115→42 and 7→103) via the same harmonization commit.
- **zh**: mild formal `您` erosion in `email.json`.

Both must reproduce by spot-check.

### J. Baseline candidate validity

The audit names `be5bdb5ca^` as the baseline for de_AT and uk (single-file pre-reorg era). Verify:
- `git show be5bdb5ca^:src/locales/de_AT.json` exists and uses formal register (Sie/Ihr).
- `git show be5bdb5ca^:src/locales/uk.json` exists and uses formal register (Ви/Ваш).

### K. Pipeline finding

The audit claims `locales/guides/for-translators/<locale>.md` files in the app repo carry a footer marking them as generated from this project on 2026-01-20 as a one-shot bootstrap, not a live sync. Verify by reading the footer of at least `de_AT.md` (or whatever de_AT translators consult) and one other (e.g., `hu.md`). Confirm:
- The "Generated: 2026-01-20" footer is present.
- No sync/generator script exists in the app repo that would auto-propagate docs project changes.

This is load-bearing for the repair plan: if the pipeline is stale, fixing the docs project alone will not prevent recurrence.

### L. Completeness check

`git log --all --oneline --grep='Harmonize' --since='2026-01-01'` against the app repo must reconcile against the 29 commits the audit says it examined. Any harmonize commit touching `locales/content/` that the audit doesn't name (including under "None" severity) is a miss to flag.

---

## How to read the validation report

Each line in `qa-validation.md` follows the form `<letter>. <result> — <evidence>`. Results are:

- **PASS** — criterion met, evidence cited.
- **FAIL** — criterion not met, evidence cited.
- **PARTIAL** — criterion met for some sub-claims and not others. Both halves cited.
- **PARTIAL FAIL** — criterion mostly fails, with some caveats acknowledged.
- **MINOR** — criterion has a discrepancy that doesn't affect the load-bearing findings.
- **BLOCKED** — criterion could not be validated because of missing access or unclear state.

The summary at the bottom of `qa-validation.md` aggregates these into a count and flags risks to the overall repair plan.
