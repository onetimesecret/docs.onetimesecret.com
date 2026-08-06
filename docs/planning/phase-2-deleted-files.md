---
title: "Phase 2 deleted-file index"
description: "Every file removed by the Phase 2 tree reshape, with its merge target and recovery pointer."
---

# Phase 2 deleted-file index

Commit [`112a8fa`](https://github.com/onetimesecret/docs.onetimesecret.com/commit/112a8fa)
(*feat(docs): Phase 2 — reshape the tree and build the end-user task layer*)
deleted 263 content files. **No content is lost** — every file is intact in git
history at the parent commit. This index exists so nobody has to reconstruct
what was removed, or why, from the diff.

## Why these files were deleted rather than moved

Phase 2 distinguished **moves** from **merges**:

- **Moves** (146 files) — the page kept its identity at a new URL. All locale
  copies were renamed along with it; translations survive.
- **Merges** (the 263 files below) — the page was absorbed into a different
  page. The absorbed non-EN copies could not be kept:
  1. *In place*: a real file at e.g. `nl/regions.md` would collide with the
     generated `/nl/regions` → `/nl/security/where-your-data-lives` redirect
     (`config/redirects.mjs` asserts no redirect source is also a page).
  2. *Relocated to the merge target*: a stale translation sitting at the new
     URL would break the anchor contract — its translated headings slugify to
     different ids, so the fragment redirects (`#canada`, `#privacy-first`, …)
     would 404 for exactly those locales, and readers would see outdated
     content under a current title.

  Deleting them means those routes fall back to the current English page
  (Starlight `defaultLocale` fallback), which is correct-but-untranslated
  rather than translated-but-wrong.

## Recovering a deleted file

```bash
# Print any deleted file exactly as it was:
git show 112a8fa^:src/content/docs/nl/regions/canada.md

# Restore one into the working tree (e.g. to mine for a re-translation):
git checkout 112a8fa^ -- src/content/docs/nl/regions/canada.md

# Full history of a deleted file:
git log --follow --oneline -- src/content/docs/nl/regions/canada.md
```

When merged pages are re-translated, these files are the raw material: most
of the absorbed English survives (reworked) in the merge target, so the old
translations remain useful reference even where they can't be shipped as-is.

## Deleted families

| Source page (per locale) | Copies | Merged into |
|---|---|---|
| `custom-domains/homepage-secrets` | 1 | `custom-domains/access-and-privacy` `#homepage-secrets` |
| `custom-domains/how-it-works` | 17 | `custom-domains/` `#how-it-works` |
| `custom-domains/incoming-secrets` | 1 | `custom-domains/access-and-privacy` `#incoming-secrets` |
| `custom-domains/privacy-options` | 1 | `custom-domains/access-and-privacy` `#privacy-options` |
| `custom-domains/signin-settings` | 1 | `custom-domains/access-and-privacy` `#signin-settings` |
| `custom-domains/signup-settings` | 1 | `custom-domains/access-and-privacy` `#signup-settings` |
| `custom-domains/use-cases` | 17 | `custom-domains/` `#use-cases` |
| `docs-overview` | 17 | `start/` |
| `introduction/guides` | 17 | `start/` |
| `introduction/index` | 17 | `start/` |
| `principles/communication` | 17 | `security/our-principles` `#communication` |
| `principles/data-minimization` | 17 | `security/our-principles` `#data-minimization` |
| `principles/index` | 17 | `security/our-principles` |
| `principles/privacy-first` | 17 | `security/our-principles` `#privacy-first` |
| `regions/canada` | 17 | `security/where-your-data-lives` `#canada` |
| `regions/european-union` | 17 | `security/where-your-data-lives` `#european-union` |
| `regions/index` | 17 | `security/where-your-data-lives` |
| `regions/new-zealand` | 17 | `security/where-your-data-lives` `#new-zealand` |
| `regions/united-kingdom` | 17 | `security/where-your-data-lives` `#united-kingdom` |
| `regions/united-states` | 17 | `security/where-your-data-lives` `#united-states` |
| `secret-links/index` | 1 | `share/` |
| `team/audit-log` | 1 | `organizations/audit-trail` |
| `team/shared-dashboard` | 1 | `organizations/` |

17-copy families were published in all 17 configured locales; 1-copy entries
were English-only pages. Total: 263 files.

## Full index

One line per deleted file: `path → merge target`.

```
src/content/docs/en/custom-domains/homepage-secrets.md -> custom-domains/access-and-privacy#homepage-secrets
src/content/docs/bg/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/da/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/de/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/en/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/es/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/fr/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/it/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/ja/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/ko/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/mi/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/nl/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/pl/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/pt-br/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/sv/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/tr/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/uk/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/zh-cn/custom-domains/how-it-works.md -> custom-domains/#how-it-works
src/content/docs/en/custom-domains/incoming-secrets.md -> custom-domains/access-and-privacy#incoming-secrets
src/content/docs/en/custom-domains/privacy-options.md -> custom-domains/access-and-privacy#privacy-options
src/content/docs/en/custom-domains/signin-settings.md -> custom-domains/access-and-privacy#signin-settings
src/content/docs/en/custom-domains/signup-settings.md -> custom-domains/access-and-privacy#signup-settings
src/content/docs/bg/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/da/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/de/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/en/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/es/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/fr/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/it/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/ja/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/ko/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/mi/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/nl/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/pl/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/pt-br/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/sv/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/tr/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/uk/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/zh-cn/custom-domains/use-cases.md -> custom-domains/#use-cases
src/content/docs/bg/docs-overview.md -> start/
src/content/docs/da/docs-overview.md -> start/
src/content/docs/de/docs-overview.md -> start/
src/content/docs/en/docs-overview.md -> start/
src/content/docs/es/docs-overview.md -> start/
src/content/docs/fr/docs-overview.md -> start/
src/content/docs/it/docs-overview.md -> start/
src/content/docs/ja/docs-overview.md -> start/
src/content/docs/ko/docs-overview.md -> start/
src/content/docs/mi/docs-overview.md -> start/
src/content/docs/nl/docs-overview.md -> start/
src/content/docs/pl/docs-overview.md -> start/
src/content/docs/pt-br/docs-overview.md -> start/
src/content/docs/sv/docs-overview.md -> start/
src/content/docs/tr/docs-overview.md -> start/
src/content/docs/uk/docs-overview.md -> start/
src/content/docs/zh-cn/docs-overview.md -> start/
src/content/docs/bg/introduction/guides.md -> start/
src/content/docs/da/introduction/guides.md -> start/
src/content/docs/de/introduction/guides.md -> start/
src/content/docs/en/introduction/guides.md -> start/
src/content/docs/es/introduction/guides.md -> start/
src/content/docs/fr/introduction/guides.md -> start/
src/content/docs/it/introduction/guides.md -> start/
src/content/docs/ja/introduction/guides.md -> start/
src/content/docs/ko/introduction/guides.md -> start/
src/content/docs/mi/introduction/guides.md -> start/
src/content/docs/nl/introduction/guides.md -> start/
src/content/docs/pl/introduction/guides.md -> start/
src/content/docs/pt-br/introduction/guides.md -> start/
src/content/docs/sv/introduction/guides.md -> start/
src/content/docs/tr/introduction/guides.md -> start/
src/content/docs/uk/introduction/guides.md -> start/
src/content/docs/zh-cn/introduction/guides.md -> start/
src/content/docs/bg/introduction/index.md -> start/
src/content/docs/da/introduction/index.md -> start/
src/content/docs/de/introduction/index.md -> start/
src/content/docs/en/introduction/index.md -> start/
src/content/docs/es/introduction/index.md -> start/
src/content/docs/fr/introduction/index.md -> start/
src/content/docs/it/introduction/index.md -> start/
src/content/docs/ja/introduction/index.md -> start/
src/content/docs/ko/introduction/index.md -> start/
src/content/docs/mi/introduction/index.md -> start/
src/content/docs/nl/introduction/index.md -> start/
src/content/docs/pl/introduction/index.md -> start/
src/content/docs/pt-br/introduction/index.md -> start/
src/content/docs/sv/introduction/index.md -> start/
src/content/docs/tr/introduction/index.md -> start/
src/content/docs/uk/introduction/index.md -> start/
src/content/docs/zh-cn/introduction/index.md -> start/
src/content/docs/bg/principles/communication.md -> security/our-principles#communication
src/content/docs/da/principles/communication.md -> security/our-principles#communication
src/content/docs/de/principles/communication.md -> security/our-principles#communication
src/content/docs/en/principles/communication.md -> security/our-principles#communication
src/content/docs/es/principles/communication.md -> security/our-principles#communication
src/content/docs/fr/principles/communication.md -> security/our-principles#communication
src/content/docs/it/principles/communication.md -> security/our-principles#communication
src/content/docs/ja/principles/communication.md -> security/our-principles#communication
src/content/docs/ko/principles/communication.md -> security/our-principles#communication
src/content/docs/mi/principles/communication.md -> security/our-principles#communication
src/content/docs/nl/principles/communication.md -> security/our-principles#communication
src/content/docs/pl/principles/communication.md -> security/our-principles#communication
src/content/docs/pt-br/principles/communication.md -> security/our-principles#communication
src/content/docs/sv/principles/communication.md -> security/our-principles#communication
src/content/docs/tr/principles/communication.md -> security/our-principles#communication
src/content/docs/uk/principles/communication.md -> security/our-principles#communication
src/content/docs/zh-cn/principles/communication.md -> security/our-principles#communication
src/content/docs/bg/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/da/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/de/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/en/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/es/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/fr/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/it/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/ja/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/ko/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/mi/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/nl/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/pl/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/pt-br/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/sv/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/tr/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/uk/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/zh-cn/principles/data-minimization.md -> security/our-principles#data-minimization
src/content/docs/bg/principles/index.md -> security/our-principles
src/content/docs/da/principles/index.md -> security/our-principles
src/content/docs/de/principles/index.md -> security/our-principles
src/content/docs/en/principles/index.md -> security/our-principles
src/content/docs/es/principles/index.md -> security/our-principles
src/content/docs/fr/principles/index.md -> security/our-principles
src/content/docs/it/principles/index.md -> security/our-principles
src/content/docs/ja/principles/index.md -> security/our-principles
src/content/docs/ko/principles/index.md -> security/our-principles
src/content/docs/mi/principles/index.md -> security/our-principles
src/content/docs/nl/principles/index.md -> security/our-principles
src/content/docs/pl/principles/index.md -> security/our-principles
src/content/docs/pt-br/principles/index.md -> security/our-principles
src/content/docs/sv/principles/index.md -> security/our-principles
src/content/docs/tr/principles/index.md -> security/our-principles
src/content/docs/uk/principles/index.md -> security/our-principles
src/content/docs/zh-cn/principles/index.md -> security/our-principles
src/content/docs/bg/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/da/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/de/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/en/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/es/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/fr/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/it/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/ja/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/ko/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/mi/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/nl/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/pl/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/pt-br/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/sv/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/tr/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/uk/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/zh-cn/principles/privacy-first.md -> security/our-principles#privacy-first
src/content/docs/bg/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/da/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/de/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/en/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/es/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/fr/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/it/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/ja/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/ko/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/mi/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/nl/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/pl/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/pt-br/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/sv/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/tr/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/uk/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/zh-cn/regions/canada.md -> security/where-your-data-lives#canada
src/content/docs/bg/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/da/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/de/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/en/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/es/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/fr/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/it/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/ja/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/ko/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/mi/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/nl/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/pl/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/pt-br/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/sv/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/tr/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/uk/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/zh-cn/regions/european-union.md -> security/where-your-data-lives#european-union
src/content/docs/bg/regions/index.md -> security/where-your-data-lives
src/content/docs/da/regions/index.md -> security/where-your-data-lives
src/content/docs/de/regions/index.md -> security/where-your-data-lives
src/content/docs/en/regions/index.md -> security/where-your-data-lives
src/content/docs/es/regions/index.md -> security/where-your-data-lives
src/content/docs/fr/regions/index.md -> security/where-your-data-lives
src/content/docs/it/regions/index.md -> security/where-your-data-lives
src/content/docs/ja/regions/index.md -> security/where-your-data-lives
src/content/docs/ko/regions/index.md -> security/where-your-data-lives
src/content/docs/mi/regions/index.md -> security/where-your-data-lives
src/content/docs/nl/regions/index.md -> security/where-your-data-lives
src/content/docs/pl/regions/index.md -> security/where-your-data-lives
src/content/docs/pt-br/regions/index.md -> security/where-your-data-lives
src/content/docs/sv/regions/index.md -> security/where-your-data-lives
src/content/docs/tr/regions/index.md -> security/where-your-data-lives
src/content/docs/uk/regions/index.md -> security/where-your-data-lives
src/content/docs/zh-cn/regions/index.md -> security/where-your-data-lives
src/content/docs/bg/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/da/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/de/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/en/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/es/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/fr/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/it/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/ja/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/ko/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/mi/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/nl/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/pl/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/pt-br/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/sv/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/tr/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/uk/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/zh-cn/regions/new-zealand.md -> security/where-your-data-lives#new-zealand
src/content/docs/bg/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/da/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/de/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/en/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/es/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/fr/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/it/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/ja/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/ko/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/mi/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/nl/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/pl/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/pt-br/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/sv/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/tr/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/uk/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/zh-cn/regions/united-kingdom.md -> security/where-your-data-lives#united-kingdom
src/content/docs/bg/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/da/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/de/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/en/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/es/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/fr/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/it/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/ja/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/ko/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/mi/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/nl/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/pl/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/pt-br/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/sv/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/tr/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/uk/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/zh-cn/regions/united-states.md -> security/where-your-data-lives#united-states
src/content/docs/en/secret-links/index.md -> share/
src/content/docs/en/team/audit-log.md -> organizations/audit-trail
src/content/docs/en/team/shared-dashboard.md -> organizations/
```
