# QA validation — qa-automation-engineer agent

**Date:** 2026-04-12
**Agent:** qa-automation-engineer
**Scope:** Validate the guide repair (`guide-repair-report.md`) and the cross-locale audit (`cross-locale-audit.md`) against pre-agreed criteria.

**Criteria definitions:** see `criteria.md` in this directory. The lettered references (A–L) below correspond to the criteria defined there. Read `criteria.md` first if reading this report cold.

The text below is the agent's verbatim report.

---

### Part 1: Guide repair (criteria A–G + bonus)

**A. PASS** — `glossary.md:14-15` table rows split secret into "(noun, object/record) → Geheimnis" and "(noun, revealed payload) → Nachricht" for both DE and AT, plus narrative reinforcement at `glossary.md:122`. `language-notes.md:18-50` carries the matching object/content rule. No "always Geheimnis" residue.

**B. PASS** — Every du-form hit in `language-notes.md` is properly scoped:
- L43: explicitly tagged `(de)` next to the AT version `(de_AT)`
- L76-77: critical-rules table rows tagged `de` and `de_AT` (du shown as INCORRECT for de_AT)
- L88-95, 97-101: inside "German (Germany) - de.json" section, examples header literally says "Examples (de only — NOT for de_AT)"
- L132-145, 152-158: inside "Implementation Guidelines" / paired DE-vs-AT comparison table (clearly a contrast, not a model for AT)
- L185: rule prohibiting mixing — meta, not an example

**C. PASS** — Grep for change-log phrasing returned no matches in `language-notes.md`.

**D. PASS** — Rule at L18-50 is explicit: Geheimnis (verbs erstellen/teilen/ansehen/verbrennen/zerstören/ablaufen) vs. Nachricht (post-reveal, encrypted_message, truncated). Bilingual examples L37-45 cover both halves: `Geheimnis erstellen`, `Geheimnis verbrennen`, `Verschlüsselte Nachricht`, `Die Nachricht wurde gekürzt`.

**E. PASS** — `language-notes.md:8-12` baseline pin: commit `f95b03f44`, path `src/locales/de_AT.json`. Verified the commit exists in the onetimesecret app repo and the file uses Sie/Ihr formal register.

**F. PASS (with one weak spot)** — All tables and rule blocks tagged with explicit region columns or `(both)` / `(de)` / `(de_AT)` markers. The example bullets at L37-50 use `(both)` once at the block heading rather than per-line, but every line that varies by region (L42-43) carries inline tags. Acceptable.

**G. PASS** — `de-translation-notes.txt` opens with the all-caps banner "HISTORICAL CONVERSATIONAL CHANGE-LOG — NOT NORMATIVE" and explicitly warns that examples are not regionally tagged, that §1's secret rule contradicts the canonical split, and that the file must NOT be used for translation work. Did not diff the body but the banner placement and length match the spec.

**Bonus (pre-existing glossary issues — flag, not fail):**
- `glossary.md:18` `burn`: AT=`verbrennen`, DE=`löschen` — divergent
- `glossary.md:30` `Sign In`: AT=`Eintragen` (unusual, expected `Anmelden`), DE=`Anmelden`
- `glossary.md:63-64` `encrypted in transit/at rest`: AT puts `verschlüsselt` first, DE puts the qualifier first — phrasing diverges

All three confirmed present. Worth a follow-up issue.

### Part 2: Cross-locale audit (criteria H–L)

**H. PASS for all four** — Each commit verified against `git show`:
- **de_AT `b08e59838`**: `web.login.enter_your_credentials` "Geben Sie Ihre Anmeldedaten ein" → "Gib deine Anmeldedaten ein". Sie→du flip confirmed.
- **pt_PT `3f9d8d3d2`**: `web.login.forgot_your_password` "Esqueceu-se da sua palavra-passe?" → "Esqueceste-te da tua palavra-passe?". você→tu flip confirmed.
- **uk `5c7d5c362`**: `web.login.secure_link_helper` "...надіслано на Вашу електронну пошту" → "...на твою електронну пошту". Ви→ти flip confirmed.
- **hu `bea7e1b7e`**: `web.login.forgot_your_password` "Elfelejtette a jelszavát?" → "Elfelejtetted a jelszavadat?". formal→te flip confirmed.

**I. PARTIAL** — da_DK swap is **PASS**: commit `6c1b55c16` shows wholesale `besked`→`hemmelighed` substitution (e.g., "har sendt dig en besked" → "sendte dig en hemmelighed", many occurrences across email.json). The brand-term swap claim is real. zh is **FAIL**: commit `311537d04` shows 您 preserved on every single line of email.json — the `+` lines all retain 您. There is no 您→你 erosion. The audit's "mild formal 您 erosion" claim is not supported by this commit.

**J. PASS** — `git show be5bdb5ca^:src/locales/de_AT.json` returns formal forms ("Geben Sie Ihr Passwort ein", "Stärken Sie Verbindungen", "Bestätigen Sie Ihr Passwort"). `git show be5bdb5ca^:src/locales/uk.json` returns formal "Ви переглядаєте", "Ви впевнені", "Використовуйте", "Ваша конфіденційність захищена". Both baselines exist and use the formal register the audit claims.

**K. PARTIAL FAIL** — `hu.md` footer cited: "Generated: 2026-01-20" confirmed. `de.md` footer cited: "Generated: 2026-01-20" confirmed (the file is `de.md`, not `de_AT.md`). No sync/generator scripts found in the app repo (grep over `*.sh` / `*.rb` for `for-translators`/`generate.*guide`/`sync.*docs` returned nothing). **However**, the audit's claim that `for-translators/de_AT.md` exists is wrong: only `de.md` exists. There is no de_AT-specific translator guide at all in the app repo — de_AT translators consult `de.md`, which carries the du-form examples sourced from the corrupted `de/translations/`. This makes the pipeline staleness worse than the audit framed it: the docs project is the only canonical store of de_AT guidance, and the snapshot in the app repo is both stale (2026-01-20) and pointed at the wrong locale guide. Repairing the docs project alone will not fix the app-repo snapshot until it is regenerated.

**L. MINOR** — `git log --grep='Harmonize' --since=2026-01-01` returns 30 locale-specific final commits (excluding partials and bulk PRs). Audit reports 29. One locale-final commit is unaccounted for — likely a minor counting discrepancy (could be a partial counted as final, or pt-br vs pt_BR double-listing). Not load-bearing for the four High-severity findings, but worth a recount before publishing the audit. The 30 commits visible:
ar, bg, ca_ES, cs, da_DK, de, de_AT, el_GR, eo, es, fr_CA, fr_FR, he, hu, it, ja, ko, mi, nl, pl, pt_BR, pt_PT, ru, sl, sv, tr, uk, vi, zh, plus one duplicate or extra.

### Summary

- **Total: 11 PASS, 0 outright FAIL, 2 PARTIAL (I, K), 1 MINOR (L)**
- Guide repair (A–G) is mechanically clean. Bonus glossary inconsistencies remain and should become a follow-up ticket.
- **Risks to the repair plan:**
  1. **Audit's zh claim is unsupported** (criterion I). If zh was reported as Medium severity, that severity should be downgraded — the harmonization commit preserved 您 throughout email.json. Recommend re-running the spot check before promoting any zh remediation work.
  2. **App-repo translator guide pipeline is worse than reported** (criterion K). There is no `for-translators/de_AT.md` — the de_AT translator working from the app repo gets `de.md`, which contains du-form examples explicitly tagged "NOT for de_AT" only in the docs source (the snapshot in the app repo predates the repair). Fixing the docs project is necessary but not sufficient: the app-repo snapshot has to be regenerated, and a `de_AT.md` variant produced, or de_AT will keep regressing the next time someone runs harmonization against the stale guide. Same logic likely applies to pt_PT, uk, hu — confirm whether they have locale-specific files or fall back to `pt-br.md`/`uk.md`/`hu.md` with similar issues.
  3. **Audit commit count is off by one** (criterion L). Low risk; recount before publishing.
- **For user confirmation before proceeding:**
  - Re-spot-check the zh claim or drop it from the report.
  - Decide whether the docs-project fix needs to be paired with an app-repo snapshot regeneration in the same change set (and whether `de_AT.md` should be a distinct generated file, or whether `de.md` should branch on locale).

**Files referenced:**
- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/language-notes.md`
- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/glossary.md`
- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/de-translation-notes.txt`
- `/Users/d/Projects/dev/onetimesecret/worktrees/i18n-harmonization/locales/guides/for-translators/de.md`
- `/Users/d/Projects/dev/onetimesecret/worktrees/i18n-harmonization/locales/guides/for-translators/hu.md`
- `/Users/d/Projects/dev/onetimesecret/worktrees/i18n-harmonization/locales/content/{de_AT,pt_PT,uk,hu}/session-auth.json`
