# Localization Management Recommendation

**Verdict**: Your current "light-touch" approach is adequate and appropriate.

## Current State Analysis

| Metric             | Value                         |
|--------------------|-------------------------------|
| Locales            | 30                            |
| JSON files         | 510 (17 per locale)           |
| Tooling            | vue-i18n 11.1.12 + @intlify   |
| Documentation      | Per-language glossary + notes |
| Contribution model | Sporadic community PRs        |

## Why NOT Adopt a TMS (Crowdin, Lokalise, etc.) Now

| Factor               | Current State           | TMS Impact                              |
|----------------------|-------------------------|-----------------------------------------|
| Contribution volume  | Low (~1-2 PRs/month)    | Overkill                                |
| Maintenance burden   | Low                     | Would increase                          |
| Cost                 | $0                      | Free tiers limited, paid = ongoing cost |
| Contributor friction | Low (familiar Git flow) | New platform learning curve             |
| Sync complexity      | None                    | Two-way sync issues                     |

## Recommended: Documentation-Driven Localization (Current Pattern)

This is the same pattern used by Mozilla, Django, and Vue.js documentation projects. It scales well for:

- Open source projects with community contributions
- 10-50 active locales
- Low-to-moderate update frequency

## Incremental Enhancements (Optional)

If you want to improve without adding maintenance burden:

| Enhancement            | Effort  | Benefit                                        |
|------------------------|---------|------------------------------------------------|
| CI validation          | Low     | Catch key naming/JSON errors automatically     |
| PR template            | Minimal | Guide contributors to check glossary/notes     |
| Periodic quality audit | Low     | Review translations against glossary quarterly |

## When to Reconsider TMS

Adopt a Translation Management System if ANY of these occur:

- 10+ active translators contributing regularly
- Need for professional translation (paid translators)
- Real-time translation coordination required
- Significant business requirement for specific locales
