# 2026-04-12 — Translation guide retrospective and cross-locale audit

Incident: the de_AT app locale suffered a formal→informal register regression between January and April 2026, traced to a corrupted translation guide that was propagated into multiple other locales via the same agent-driven "harmonization" pipeline.

This directory captures the raw outputs of the retrospective analysis and repair work.

## Files

- `guide-repair-report.md` — neutral-editor agent's report on the edits made to `src/content/docs/de/translations/language-notes.md`, `glossary.md`, and `de-translation-notes.txt` in this project. Covers §1 rewrite (object/content split for `secret`), removal of the change-log-masquerading-as-guidance section, baseline pin, regional tagging, and archival of the historical transcript file.

- `cross-locale-audit.md` — general-purpose agent's report on which other locales in the onetimesecret app project were contaminated by the same harmonization wave. Identifies four High-severity locales (de_AT, pt_PT, uk, hu) and two Medium-severity (da_DK, zh). Includes baseline commit candidates and a pipeline finding.

- `criteria.md` — the A–L validation criteria referenced by `qa-validation.md`. Defines what each lettered criterion checks for, the evidence requirements, and the result vocabulary (PASS / FAIL / PARTIAL / PARTIAL FAIL / MINOR / BLOCKED). Read this first if reading `qa-validation.md` cold.

- `qa-validation.md` — qa-automation-engineer agent's validation of both outputs against the criteria in `criteria.md`. Result: 11 PASS, 0 outright FAIL, 2 PARTIAL (audit's zh claim unsupported; pipeline gap worse than audit framed it), 1 MINOR (commit count off by one).

## Key findings to propagate

1. **Root cause:** `language-notes.md` in this project contained verbatim change-log content from an assistant conversation transcript (`de-translation-notes.txt`), without regional tagging. Du-form examples leaked into de_AT guidance. A global-replace of `Geheimnis`→`Nachricht` was prescribed based on one assistant's opinion that contradicted the glossary's own rule. Five months later, another agent followed this guidance and "harmonized" de_AT downward to informal register.

2. **Pipeline gap:** the app repo's `locales/guides/for-translators/<locale>.md` files are a one-shot bootstrap from this project taken on 2026-01-20 — not a live sync. Fixing the files in this project will NOT auto-propagate. The app repo guides must be regenerated or hand-patched before the next translation pass, or the same corruption will persist in agent context.

3. **Scope of spread:** four locales need the full revert+replay treatment (de_AT, pt_PT, uk, hu). Two more need lighter in-place fixes (da_DK, zh). The rest are clean — either the language doesn't distinguish T-V register, or the baseline register was preserved through harmonization.

4. **Baseline anchor for de_AT:** commit `f95b03f44` (2025-04-15), file `src/locales/de_AT.json` in the onetimesecret repo. Last human-curated snapshot with consistent Sie-form and the object/content Geheimnis/Nachricht split. Pre-dates the directory reorganization.

## Related prior work

- `../2025-11-16/locale-quality-analysis-de.md` — earlier QA review of the de docs locale that surfaced the same formality drift pattern five months before the de_AT regression. The recommendations were not propagated back to the guide; had they been, the April 2026 regression would likely have been avoided. This is the canonical example of why retrospectives need a mechanical landing zone (see the Configuration Overlay Pattern discussion that accompanied this retrospective).
