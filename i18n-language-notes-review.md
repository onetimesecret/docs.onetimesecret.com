# I18N Language Notes Review

## Executive Summary

This document summarizes the review of all 27 language-notes.md files across the Onetime Secret documentation. The review identifies quality tiers, consistency issues, and provides recommendations for standardization.

**Review Date:** 2025-11-17
**Total Languages Reviewed:** 27
**Branch:** claude/review-i18n-language-notes-01G5LphnZn4jH5HkoQpwuWRZ

## Quality Tiers

### Tier 1: Outstanding (100+ lines, comprehensive)

These files provide exceptional detail with cultural context, examples, and comprehensive guidance:

| Language | Lines | Highlights |
|----------|-------|------------|
| Turkish (tr) | 293 | Extremely detailed with brand voice, formality guidelines, critical distinctions |
| Dutch (nl) | 257 | Native speaker insights, cultural nuances, extensive examples |
| German (de) | 219 | Regional variations (DE/AT), formality comparison tables, thorough examples |
| Portuguese Brazil (pt-br) | 199 | Clear pt-BR vs pt-PT distinctions, link localization, natural language flow |
| Korean (ko) | 160 | Comprehensive password/passphrase examples, common mistakes section |
| Ukrainian (uk) | 115 | Good coverage of Ukrainian-specific considerations |
| Māori (mi) | 113 | Excellent cultural adaptation, traditional greeting patterns |
| Bulgarian (bg) | 105 | Solid coverage with clear terminology choices |

**Key Features of Tier 1 Files:**
- Detailed explanations of translation choices with reasoning
- Multiple examples of correct vs incorrect usage
- Cultural context and linguistic nuances
- Clear distinction between password/passphrase
- Voice and tone guidance (imperative vs passive)
- Regional variations where applicable
- Tables summarizing critical rules

### Tier 2: Good Quality (50-99 lines)

These files provide solid guidance with room for enhancement:

| Language | Lines | Status |
|----------|-------|--------|
| Japanese (ja) | 99 | Good structure, clear terminology decisions |
| Polish (pl) | 89 | Well-organized with good examples |
| Chinese Simplified (zh-cn) | 88 | Strong cultural adaptation reasoning |
| Italian (it) | 85 | Good terminology analysis |
| Swedish (sv) | 82 | Solid coverage |
| Spanish (es) | 81 | Comprehensive terminology section |

**Key Features of Tier 2 Files:**
- Core terminology well-documented
- Some examples provided
- Basic voice/tone guidance
- Could benefit from: more examples, critical rules table, cultural context

### Tier 3: Minimal (< 50 lines, needs expansion)

These files provide basic information but lack depth and examples:

| Language | Lines | Current Format |
|----------|-------|----------------|
| Arabic (ar) | 34 | Basic terminology + RTL notes |
| Russian (ru) | 26 | Minimal terminology only |
| Slovenian (sl_SI) | 26 | Very basic |
| Vietnamese (vi) | 26 | Very basic |
| Hebrew (he) | 25 | Basic + RTL notes |
| Hungarian (hu) | 25 | Very basic |
| Greek (el_GR) | 25 | Very basic |
| Swedish Sweden (sv_SE) | 25 | Very basic |
| Catalan (ca_ES) | 24 | Very basic |
| Czech (cs) | 24 | Very basic |
| Danish (da) | 14 | Table format only |
| French (fr) | 12 | Table format only (3 rules) |
| English (en) | 13 | Template only |

**Issues with Tier 3 Files:**
- No examples of correct/incorrect usage
- Missing cultural context
- Limited or no voice/tone guidance
- No explanation of formality choices
- Inconsistent formats (some table-only, some prose-only)

## Common Patterns Across High-Quality Files

### 1. Core Terminology Section

All comprehensive files include clear decisions on these critical terms:

**Secret Translation:**
- High variation across languages
- Some maintain literal "secret" (German: Geheimnis)
- Others shift to functional terms (Dutch: bericht, Chinese: 内容, Danish: besked)
- **Key insight**: Personal/emotional connotations often necessitate shift to "message" or "content"

**Password vs Passphrase Distinction:**
- **CRITICAL for all languages**
- Password = account authentication
- Passphrase = secret protection
- Must use different terms to avoid user confusion

**Burn Translation:**
- Most languages adapt culturally (permanent deletion, destroy, etc.)
- Some maintain metaphor where appropriate

### 2. Voice and Tone Guidance

Best practice files clearly distinguish:
- **Imperative voice** for buttons/actions (Create, Delete, Save)
- **Passive/declarative voice** for status (Created, Deleted, Saved)

### 3. Formality Level

Well-documented files explain their choice:
- German DE: informal "du" (modern tech standard)
- German AT: formal "Sie" (Austrian business standard)
- Spanish: informal "tú"
- Turkish: formal "siz"
- Dutch: informal "je"

### 4. Critical Rules Table

Most effective format found in German, Dutch, Danish, French files:

```markdown
| Rule | Correct | Incorrect | Example |
|------|---------|-----------|---------|
| [Concept] | [translation] | [avoid] | ✓ [correct]; ✗ [incorrect] |
```

## Consistency Issues Identified

### 1. Format Inconsistency

**Three different approaches:**
1. **Prose-heavy** (Spanish, Italian, Korean) - detailed explanations
2. **Table-focused** (Danish, French) - concise rules
3. **Balanced** (German, Dutch, Turkish) - prose + tables

**Recommendation:** Balanced approach (prose + critical rules table)

### 2. Section Naming Variations

Different files use different section names for similar content:
- "Key Terminology" vs "Core Terminology"
- "Thinking Behind Changes" vs "Translation Choices"
- "Important Examples" vs "Translation Examples"

**Recommendation:** Standardize section names

### 3. Missing Frontmatter Consistency

All files have frontmatter but descriptions vary:
- Some: "Translation guidelines for X locale"
- Others: "Critical rules for X translation"
- Others: "Translation guidelines and terminology for X locale"

## Recommendations

### Priority 1: Standardize Tier 3 Files (Immediate)

Bring minimal files up to minimum 50-80 lines with:

1. **Required sections:**
   - Core Terminology (secret, password, passphrase, burn)
   - Voice and Tone (imperative vs passive)
   - Formality Level (with examples)
   - Critical Rules Table
   - Translation Examples (correct vs incorrect)

2. **Standard frontmatter format:**
   ```yaml
   ---
   title: [Language Name] Translation Notes
   description: Translation guidelines and terminology for [Language] ([code]) locale
   ---
   ```

### Priority 2: Add Critical Rules Tables (Medium)

Files in Tier 2 should add comprehensive critical rules tables following the German/Dutch model.

### Priority 3: Document Regional Variations (Low)

Where applicable, document regional differences:
- Spanish: es (neutral) vs es-MX vs es-AR
- Portuguese: pt-BR vs pt-PT (already done well)
- French: fr vs fr-CA
- Chinese: zh-CN vs zh-TW

### Priority 4: Cross-Reference Best Practices (Low)

Link to the main reference document at `docs/localization/reference/language-specific-notes.md` from each file.

## Files Requiring Immediate Attention

### Critical (< 15 lines)

1. **English (en)** - 13 lines - Currently just a template
2. **French (fr)** - 12 lines - Only 3 table rows
3. **Danish (da)** - 14 lines - Only table, needs prose

### High Priority (15-30 lines)

4. **Catalan (ca_ES)** - 24 lines
5. **Czech (cs)** - 24 lines
6. **Hebrew (he)** - 25 lines
7. **Greek (el_GR)** - 25 lines
8. **Hungarian (hu)** - 25 lines
9. **Swedish Sweden (sv_SE)** - 25 lines
10. **Russian (ru)** - 26 lines
11. **Slovenian (sl_SI)** - 26 lines
12. **Vietnamese (vi)** - 26 lines

### Medium Priority (30-50 lines)

13. **Arabic (ar)** - 34 lines - Has RTL notes but needs expansion

## Proposed Standard Structure

Based on analysis of the best files, here's the recommended structure:

```markdown
---
title: [Language] Translation Notes
description: Translation guidelines and terminology for [Language] ([code]) locale
---

# [Language] ([code]) Translation Notes

## Core Terminology

### Secret Translation
- **Choice:** [chosen term]
- **Rationale:** [why this choice]
- **Examples:**
  - ✓ [correct usage]
  - ✗ [incorrect usage]

### Password vs Passphrase
- **Password:** [term] - for account authentication
- **Passphrase:** [term] - for secret protection
- **Rationale:** [distinction explanation]

### Burn Translation
- **Choice:** [chosen term]
- **Rationale:** [explanation]

## Voice and Tone

### Active vs Passive Voice
- **Actions (buttons):** [Imperative examples]
- **Status (notifications):** [Passive examples]

### Formality Level
- **Choice:** [formal/informal]
- **Rationale:** [why this choice]
- **Examples:** [demonstrating formality]

## Important Translation Examples

[3-5 key examples with before/after and reasoning]

## Critical Translation Rules

| Rule | Correct | Incorrect | Example |
|------|---------|-----------|---------|
| [Core concept 1] | [term] | [avoid] | ✓ [correct]; ✗ [incorrect] |
| [Core concept 2] | [term] | [avoid] | ✓ [correct]; ✗ [incorrect] |
| [Voice usage] | [pattern] | [anti-pattern] | ✓ [correct]; ✗ [incorrect] |

## [Optional: Cultural/Linguistic Notes]

[Language-specific considerations: RTL, diacritics, regional variants, etc.]

## [Optional: Common Mistakes to Avoid]

[List of frequent translation errors]
```

## Best Practice Examples to Follow

For teams enhancing existing files or creating new ones, these are exemplary models:

1. **German (de)** - Best for: regional variations, formality comparison
2. **Dutch (nl)** - Best for: native speaker insights, terminology nuances
3. **Turkish (tr)** - Best for: brand voice integration, comprehensive examples
4. **Portuguese Brazil (pt-br)** - Best for: regional distinctions, link localization
5. **Korean (ko)** - Best for: password/passphrase distinction examples

## Next Steps

1. ✅ Document current state (this file)
2. ⬜ Create standardized templates for Tier 3 enhancements
3. ⬜ Enhance critical files (English, French, Danish)
4. ⬜ Add critical rules tables to Tier 2 files
5. ⬜ Validate with native speakers
6. ⬜ Update reference documentation

## Appendix: Complete File Listing

| Language | Code | Lines | Tier | Priority |
|----------|------|-------|------|----------|
| Arabic | ar | 34 | 3 | Medium |
| Bulgarian | bg | 105 | 1 | ✓ Good |
| Catalan | ca_ES | 24 | 3 | High |
| Czech | cs | 24 | 3 | High |
| Danish | da | 14 | 3 | Critical |
| German | de | 219 | 1 | ✓ Excellent |
| Greek | el_GR | 25 | 3 | High |
| English | en | 13 | 3 | Critical |
| Spanish | es | 81 | 2 | ✓ Good |
| French | fr | 12 | 3 | Critical |
| Hebrew | he | 25 | 3 | High |
| Hungarian | hu | 25 | 3 | High |
| Italian | it | 85 | 2 | ✓ Good |
| Japanese | ja | 99 | 2 | ✓ Good |
| Korean | ko | 160 | 1 | ✓ Excellent |
| Māori | mi | 113 | 1 | ✓ Excellent |
| Dutch | nl | 257 | 1 | ✓ Excellent |
| Polish | pl | 89 | 2 | ✓ Good |
| Portuguese Brazil | pt-br | 199 | 1 | ✓ Excellent |
| Russian | ru | 26 | 3 | High |
| Slovenian | sl_SI | 26 | 3 | High |
| Swedish | sv | 82 | 2 | ✓ Good |
| Swedish Sweden | sv_SE | 25 | 3 | High |
| Turkish | tr | 293 | 1 | ✓ Excellent |
| Ukrainian | uk | 115 | 1 | ✓ Good |
| Vietnamese | vi | 26 | 3 | High |
| Chinese Simplified | zh-cn | 88 | 2 | ✓ Good |

## Conclusion

The language notes documentation shows significant variation in quality and format. While several languages have excellent, comprehensive documentation (Tier 1), 13 languages have minimal documentation that needs immediate enhancement (Tier 3).

**Key Action Items:**
1. **Standardize format** across all files using the proposed structure
2. **Enhance Tier 3 files** to minimum 50-80 lines with required sections
3. **Add critical rules tables** to all files lacking them
4. **Validate changes** with native speakers where possible

This standardization will:
- Improve consistency across languages
- Provide better guidance for translators
- Ensure critical distinctions (password/passphrase) are clear
- Create a more professional, comprehensive documentation set
