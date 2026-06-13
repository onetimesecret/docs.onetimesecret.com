# Locale Content Review & Fixes

**Date:** 2026-06-13
**Project:** docs.onetimesecret.com (Astro Starlight)
**Scope:** All shipped locales (16) — mechanical translation errors, broken markup, and link correctness
**Validation:** `pnpm build` passes (813 pages); all targeted scans return zero remaining issues

---

## Executive Summary

This pass focused on **mechanically detectable, high-confidence defects** in already-translated
content — the kind that survive human review because they are markup/structure issues rather than
wording. The most serious finding was that the **entire Simplified Chinese homepage was Italian
content** with broken Starlight frontmatter. In total, **84 files** were corrected.

No machine translation of *missing* pages was performed (see "Known Gaps" — those are deliberate
backlog items, not defects).

---

## Issues Fixed

### 1. Wrong-language homepage (Critical)

- **`zh-cn/index.mdoc`** was 100% Italian, including translated YAML keys (`azioni`/`testo`/`icona`
  instead of `actions`/`text`/`icon`) and invalid icon names (`cestino`, `orologio`, …). This broke
  the hero component and showed Italian to Chinese users. Retranslated to Simplified Chinese,
  mirroring the EN structure, using valid Starlight icon names and the established `zh-cn`
  terminology (e.g. `一次性链接`, `口令`, tiered `机密信息` for marketing copy). Links repointed to `/zh-cn/`.

### 2. Broken Markdown links (would render as literal text)

- **Missing opening `[`** on list/inline links: `es`, `fr`, `it`, `ja`, `nl` `docs-overview.md`;
  `ko` `security-best-practices/index.md`; `zh-cn` `principles/index.md`.
- **Space between `]` and `(`** (e.g. `[text] (url)`) — 21 occurrences across `fr`, `it`, `nl`, `uk`.

### 3. Wrong link paths

- **`/docs/...` prefix** instead of the locale prefix (12 occurrences in `fr`, `it`, `nl`, `uk`
  custom-domains/regions) → repointed to `/<locale>/...`.
- **Wrong-locale links**: `bg` (`docs-overview`, `principles`, `index.mdoc`), `mi` (`docs-overview`,
  `index.mdoc`), `nl` (`index.mdoc`), `zh-cn` (`principles`) pointed at `/en/`; `zh-cn/index.mdoc`
  pointed at `/it/`; `pt-br` translator docs used `/pt/` instead of `/pt-br/`.
- **`introduction/guides.md`** linked the Client Libraries page to `/en/` in *every* locale, although
  each locale ships its own translated page → repointed to `/<locale>/resources/client-libraries/`.

### 4. Broken bold markers (`**`)

- **~145 list items** with a dropped leading `**` (e.g. `- Ubicación**:` → `- **Ubicación**:`) across
  `es`, `fr`, `it`, `ja`, `ko`, `nl`, `uk`, `zh-cn`.
- **Unclosed / space-broken bold** in `data-minimization.md`, `regions/index.md`,
  `security-best-practices/index.md`, `secret-links/use-cases.md` (FAQ questions, section headers, and
  list labels). Some labels were dropped entirely and restored from the EN source
  (e.g. `**Clear Purpose:**`, `**No Tracking:**`).

### 5. Untranslated / artifact text

- **`fr/index.mdoc`** hero `title` and first action were left in English → translated.
- **`de` & `ko` `data-minimization.md`** used a literal `**description:**` label → translated
  (`**Beschreibung:**`, `**설명:**`).
- **`ja/custom-domains/setup-guide.md`** had duplicated phrases (`個人向け個人向け`,
  `企業向け**：企業向け**：`) → de-duplicated.

---

## Known Gaps (NOT defects — deliberate backlog)

These are consistent across locales and represent untranslated source content, intentionally left for
human translators rather than machine-filled:

- **Region detail pages** (`regions/{canada,european-union,new-zealand,switching-regions,united-kingdom,united-states}.md`)
  are English-only — missing in all 16 locales.
- **Self-hosting core pages** (`configuration`, `environment-variables`, `getting-started`,
  `installation`) are missing in `bg`, `de`, `es`, `fr`, `it`, `ja`, `ko`, `nl`, `pl`
  (present in `da`, `mi`, `pt-br`, `sv`, `tr`, `uk`, `zh-cn`). Version-specific upgrade guides
  (`upgrading-v0-23/24`) are English-only by design.
- **`translations/universal/*`** and **`translations/guide.md`** are English-only source material for
  translators; the `for-translators.md` links to `/en/translations/universal/*` are intentional.
- **`da` self-hosting pages** intentionally link to the English version ("see the English version of
  this page") — left as-is.

---

## Method

Fixes were applied via scripted, EN-referenced replacements and verified by re-running detection
scans (broken-link, unbalanced-`**`, wrong-path, language-script-ratio) to zero, followed by a full
`pnpm build`.
