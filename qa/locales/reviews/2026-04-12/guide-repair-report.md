# Guide repair report — neutral-editor agent

**Date:** 2026-04-12
**Agent:** neutral-editor
**Working directory:** `/Users/d/Projects/ops/sites/docs.onetimesecret.com`
**Scope:** `src/content/docs/de/translations/` (three files)

The text below is the agent's verbatim report.

---

All three files updated. Report follows.

## Files edited

- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/language-notes.md` — Replaced §1 with object/content split rule, added baseline pin callout, removed the change-log section, removed du-form leakage, region-tagged every example, preserved Regional Formality Considerations verbatim.
- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/glossary.md` — Split `secret (noun)` into two rows (object/record vs. revealed payload), corrected the "always Geheimnis" prose at former line 121 to describe the split.
- `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/de/translations/de-translation-notes.txt` — Prepended a bold non-normative archival banner; transcript body left intact.

## Before/after — three most consequential changes

### 1. language-notes §1 (rewrite)

Before:
```
### 1. `secret` → `Nachricht` (UI) / `Geheimnis` (technical documentation)
... "Geheimnis ... carries strong connotations of something personal or intimate"
... "Sie haben 3 neue Nachrichten" (UI); ✗ "Sie haben 3 neue Geheimnisse"
```

After:
```
### 1. `secret` → `Geheimnis` (object) / `Nachricht` (revealed content)
**Rule (both — de and de_AT):** ...
- `Geheimnis` — the secret as an object: created, shared, viewed, burned,
  destroyed, expired ...
- `Nachricht` — the revealed content/payload: post-reveal display,
  encrypted_message, truncated previews ...
```

Examples now include `Geheimnis erstellen`, `Geheimnis verbrennen`, and the post-reveal `…sichere Nachricht wird unten angezeigt` in both Sie- and du-forms with explicit region tags.

### 2. language-notes "Thinking Behind Changes" (removed)

Before: ~70 lines of "Changed from X to Y" bullets pulled from the .txt transcript, plus a §4 "Direct Address" section presenting `Brauchst du Hilfe?`, `Verwende…`, `Melde dich bei deinem Konto an` as patterns with no region tag.

After: Section deleted in its entirety. Voice/formality guidance now lives only in the preserved "Regional Formality Considerations" section and a compact region-tagged "Critical Translation Rules" table.

### 3. de-translation-notes.txt (archival)

Before: File began with `## Convo` followed immediately by the transcript.

After: Twenty-line banner prepended:
```
================================================================================
HISTORICAL CONVERSATIONAL CHANGE-LOG — NOT NORMATIVE
================================================================================
This file is a past conversation transcript ... statements are descriptive,
not prescriptive ... must NOT be used as a source ...
Canonical rules live in: language-notes.md, glossary.md
```

## Issues noticed but not fixed

- `glossary.md` "Sicherheitsfunktionen" table still has divergent AT/DE phrasing for `encrypted in transit` / `at rest` (`verschlüsselt bei der Übertragung` vs `während der Übertragung verschlüsselt`). This looks like stylistic drift, not a rule, but it deserves a QA pass against the f95b03f44 baseline.
- `glossary.md` "burn" row maps DE to `löschen` and AT to `verbrennen`. The f95b03f44 baseline (per the instructions) uses `verbrennen` as the de_AT verb, which the row already reflects — but `language-notes.md` now lists `verbrennen`/`zerstören` as object verbs for both regions. The DE column of the glossary may need reconciliation against the DE locale file (out of scope here).
- `glossary.md` "Sign In" row gives AT as `Eintragen`, which is unusual; `Anmelden` would be expected. Possible legacy error, not touched.
- `language-notes.md` "Other German Regional Variations" lists `Domain` (DE) vs `Bereich` (AT). The glossary's domain section uses `Bereich` only inside `benutzerdefinierter Bereich` and otherwise uses `Domäne`/`Domain`. Not contradictory but worth a consistency review.

## Ambiguity resolved

- **Passphrase regional split.** The instructions say not to invent rules beyond what f95b03f44 demonstrates, but the existing glossary already had `Sicherheitsphrase` (AT) vs `Passphrase` (DE). I kept that split in language-notes §3 because (a) it was already in the glossary, (b) it is consistent with the broader AT-prefers-native-compounds pattern, and (c) removing it from the glossary would be an out-of-scope deletion. If QA decides f95b03f44 actually uses `Passphrase` in de_AT, both files need a single coordinated revert.
- **Tone of the new §1.** I wrote the rule in English with German example strings, matching the existing file's bilingual convention rather than translating the rule body into German. The Critical Translation Rules table headers stayed in German to match the file's prior style.
- **Du-form examples in "Regional Formality Considerations".** The instructions said to preserve that section and not weaken it. It already contains du-form examples under the explicitly-labeled "German (Germany) - de.json" subheading, so the regional context is unambiguous. I added an explicit `de only — NOT for de_AT` marker on those examples to defend against future copy-paste, and a parallel `de_AT only` marker on the AT examples, without otherwise altering the section.
