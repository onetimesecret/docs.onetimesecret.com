# Dutch (nl) Locale Quality Analysis

**Date:** 2025-11-16
**Project:** docs.onetimesecret.com (Astro Starlight)
**Locale:** Dutch (nl)
**Baseline:** English (en) - 34 content files
**Overall Grade:** C+

---

## Executive Summary

Dutch translation has good content quality but suffers from **critically incomplete UI translations**. Half of the Starlight interface strings remain in English, creating a jarring mixed-language user experience. This is the most significant issue affecting the Dutch locale.

### Quality Scorecard

| Category | Score | Status |
|----------|-------|--------|
| Completeness | 82% (28/34 files) | ⚠️ Good |
| UI Translation | 50% | 🔴 **CRITICAL ISSUE** |
| Content Quality | 85% | ✅ Good |
| Link Localization | 40% | ❌ Needs work |
| Natural Phrasing | 90% | ✅ Excellent |
| **Overall Rating** | **C+** | 🔴 **Needs immediate work** |

---

## 1. Completeness Analysis: 82% (28/34 files)

### Missing Files (6 total)

**REST API Documentation:**
- ❌ `rest-api/v2/index.mdoc`

**Self-Hosting Documentation:**
- ❌ `self-hosting/index.md`
- ❌ `self-hosting/getting-started.md`
- ❌ `self-hosting/installation.md`
- ❌ `self-hosting/configuration.md`
- ❌ `self-hosting/environment-variables.md`

### Impact Assessment

**High Impact:**
- Users cannot access REST API v2 documentation in Dutch
- Self-hosting users have no Dutch documentation (5 missing files)

**User Segments Affected:**
- Developers integrating with REST API v2
- Organizations wanting to self-host Onetime Secret
- Dutch-speaking technical users (Netherlands, Belgium)

---

## 2. UI Translation Analysis: 🔴 CRITICAL - Only 50% Complete

**File:** `src/content/i18n/nl.json` (93 lines)

### Translation Status Breakdown

#### ✅ Translated (Lines 1-50): Navigation & Sidebar

**Navigation Labels** (lines 2-10)
```json
{
  "nav": {
    "label": {
      "blog": "Blog",  // Left in English (acceptable)
      "custom-domain": "Custom Domains",  // Left in English (acceptable)
      "principles": "Principles",  // Left in English (acceptable)
      "rest-api": "API",
      "home": "Back to onetimesecret.com"  // Left in English (acceptable)
    }
  }
}
```

**Sidebar Items** (lines 11-50) - ✅ All translated
- Excellent Dutch translations
- Natural phrasing
- Consistent terminology

#### ❌ NOT TRANSLATED (Lines 51-93): Critical UI Components

**Still in English:**

**1. Accessibility & Navigation (lines 51-62)**
```json
"skipLink.label": "Skip to content",           // Should be: "Ga naar inhoud"
"search.label": "Search",                       // Should be: "Zoeken"
"search.ctrlKey": "Ctrl",                       // OK to keep
"search.cancelLabel": "Cancel",                 // Should be: "Annuleren"
"themeSelect.accessibleLabel": "Select theme",  // Should be: "Selecteer thema"
"themeSelect.dark": "Dark",                     // Should be: "Donker"
"themeSelect.light": "Light",                   // Should be: "Licht"
"themeSelect.auto": "Auto",                     // Should be: "Automatisch"
"languageSelect.accessibleLabel": "Select language",  // Should be: "Selecteer taal"
"menuButton.accessibleLabel": "Menu",           // OK to keep
"sidebarNav.accessibleLabel": "Main",           // Should be: "Hoofdnavigatie"
"tableOfContents.onThisPage": "On this page",   // Should be: "Op deze pagina"
"tableOfContents.overview": "Overview",         // Should be: "Overzicht"
```

**2. Page Elements (lines 65-71)**
```json
"i18n.untranslatedContent": "This content is not available in your language yet.",
  // Should be: "Deze inhoud is nog niet beschikbaar in uw taal."
"page.editLink": "Edit page",                   // Should be: "Pagina bewerken"
"page.lastUpdated": "Last updated:",            // Should be: "Laatst bijgewerkt:"
"page.previousLink": "Previous",                // Should be: "Vorige"
"page.nextLink": "Next",                        // Should be: "Volgende"
"page.draft": "This content is a draft...",     // Should be translated
"404.text": "Page not found...",                // Should be translated
```

**3. Aside Callouts (lines 72-76)**
```json
"aside.note": "Note",        // Should be: "Opmerking"
"aside.tip": "Tip",          // OK to keep
"aside.caution": "Caution",  // Should be: "Let op"
"aside.danger": "Danger",    // Should be: "Gevaar"
"fileTree.directory": "Directory",  // Should be: "Map"
"builtWithStarlight.label": "Built with Starlight",  // Can keep
```

**4. Code Features (lines 79-81)**
```json
"expressiveCode.copyButtonCopied": "Copied!",           // Should be: "Gekopieerd!"
"expressiveCode.copyButtonTooltip": "Copy to clipboard", // Should be: "Kopieer naar klembord"
"expressiveCode.terminalWindowFallbackTitle": "Terminal window",  // Should be: "Terminalvenster"
```

**5. Pagefind Search Integration (lines 83-92)**
```json
"pagefind.clear_search": "Clear",                       // Should be: "Wissen"
"pagefind.load_more": "Load more results",              // Should be: "Meer resultaten laden"
"pagefind.search_label": "Search this site",            // Should be: "Zoek op deze site"
"pagefind.filters_label": "Filters",                    // OK to keep
"pagefind.zero_results": "No results for [SEARCH_TERM]", // Should be: "Geen resultaten voor [SEARCH_TERM]"
"pagefind.many_results": "[COUNT] results for [SEARCH_TERM]",  // Should be translated
"pagefind.one_result": "[COUNT] result for [SEARCH_TERM]",     // Should be translated
"pagefind.alt_search": "No results for [SEARCH_TERM]...",      // Should be translated
"pagefind.search_suggestion": "No results for [SEARCH_TERM]...", // Should be translated
"pagefind.searching": "Searching for [SEARCH_TERM]...",        // Should be: "Zoeken naar [SEARCH_TERM]..."
```

### Impact Assessment

**CRITICAL USER EXPERIENCE ISSUES:**

1. **Search Interface Entirely in English**
   - Users see English when searching
   - Search results display English labels
   - Confusing for Dutch-only speakers

2. **Theme/Language Selectors in English**
   - "Select theme" / "Select language" visible in UI
   - Breaks immersion in Dutch experience

3. **Page Navigation in English**
   - "Previous" / "Next" buttons in English
   - "Edit page" links in English
   - "Last updated" shown in English

4. **Documentation Callouts in English**
   - Important notes/warnings show "Note", "Caution", "Danger"
   - Reduces accessibility for Dutch-only users

5. **Copy Button in English**
   - Code examples show "Copied!" in English
   - Minor but noticeable inconsistency

### Recommended Translations

Create a complete `nl.json` file:

```json
{
  "skipLink.label": "Ga naar inhoud",
  "search.label": "Zoeken",
  "search.cancelLabel": "Annuleren",
  "themeSelect.accessibleLabel": "Selecteer thema",
  "themeSelect.dark": "Donker",
  "themeSelect.light": "Licht",
  "themeSelect.auto": "Automatisch",
  "languageSelect.accessibleLabel": "Selecteer taal",
  "menuButton.accessibleLabel": "Menu",
  "sidebarNav.accessibleLabel": "Hoofdnavigatie",
  "tableOfContents.onThisPage": "Op deze pagina",
  "tableOfContents.overview": "Overzicht",
  "i18n.untranslatedContent": "Deze inhoud is nog niet beschikbaar in uw taal.",
  "page.editLink": "Pagina bewerken",
  "page.lastUpdated": "Laatst bijgewerkt:",
  "page.previousLink": "Vorige",
  "page.nextLink": "Volgende",
  "page.draft": "Deze inhoud is een concept en wordt niet opgenomen in productiebuilds.",
  "404.text": "Pagina niet gevonden. Controleer de URL of probeer de zoekbalk te gebruiken.",
  "aside.note": "Opmerking",
  "aside.tip": "Tip",
  "aside.caution": "Let op",
  "aside.danger": "Gevaar",
  "fileTree.directory": "Map",
  "builtWithStarlight.label": "Gebouwd met Starlight",
  "expressiveCode.copyButtonCopied": "Gekopieerd!",
  "expressiveCode.copyButtonTooltip": "Kopieer naar klembord",
  "expressiveCode.terminalWindowFallbackTitle": "Terminalvenster",
  "pagefind.clear_search": "Wissen",
  "pagefind.load_more": "Meer resultaten laden",
  "pagefind.search_label": "Zoek op deze site",
  "pagefind.filters_label": "Filters",
  "pagefind.zero_results": "Geen resultaten voor [SEARCH_TERM]",
  "pagefind.many_results": "[COUNT] resultaten voor [SEARCH_TERM]",
  "pagefind.one_result": "[COUNT] resultaat voor [SEARCH_TERM]",
  "pagefind.alt_search": "Geen resultaten voor [SEARCH_TERM]. In plaats daarvan worden resultaten voor [DIFFERENT_TERM] weergegeven",
  "pagefind.search_suggestion": "Geen resultaten voor [SEARCH_TERM]. Probeer een van de volgende zoekopdrachten:",
  "pagefind.searching": "Zoeken naar [SEARCH_TERM]..."
}
```

---

## 3. Content Quality Analysis

### Medium Issues

#### ⚠️ Issue #1: Missing Link Localization

**File:** `src/content/docs/nl/custom-domains/how-it-works.md`
**Lines:** 17, 20, 29, 31
**Severity:** MEDIUM

**Current (WRONG):**
```markdown
[Configureer de DNS-instellingen van uw domein](custom-domains/setup-guide)
[Pas het uiterlijk van uw domein aan](custom-domains/brand-guide)
[Datacenterregio's](/nl/regions)  // This one is correct!
[Best practices beveiliging](security-best-practices)
```

**Should be:**
```markdown
[Configureer de DNS-instellingen van uw domein](/nl/custom-domains/setup-guide)
[Pas het uiterlijk van uw domein aan](/nl/custom-domains/brand-guide)
[Datacenterregio's](/nl/regions)  // Correct
[Best practices beveiliging](/nl/security-best-practices)
```

**Impact:**
- Inconsistent link behavior
- Some links may route to English content
- User confusion

---

#### ⚠️ Issue #2: Inconsistent Technical Term Translation

**File:** `src/content/docs/nl/rest-api/index.mdoc`
**Line:** 17
**Severity:** LOW

**Current:**
```markdown
Waar `REGIO` ofwel `us` of `eu` is.
```

**Problem:**
- Translates the code placeholder `REGION` to `REGIO`
- Code placeholders should remain in English for consistency
- Technical users expect English variable names

**Should be:**
```markdown
Waar `REGION` ofwel `us` of `eu` is.
```

**Impact:**
- Minor confusion for developers
- Inconsistent with code examples (which use `REGION`)

---

### Positive Aspects: ✅ Content Quality

**1. Natural Dutch Phrasing**

The existing content translations are excellent:

```markdown
# Good examples from introduction/index.md
"Welkom bij Onetime Secret Docs, uw centrale bron voor het
maximaliseren van de waarde van onze privacy-gerichte,
efemere geheime deeldienst."
```

**2. Good Metadata**

Proper frontmatter with locale specification:
```yaml
---
title: Aan de slag
description: Onetime Secret's REST API biedt flexibele mogelijkheden...
locale: nl
---
```

**3. Sidebar Translations**

Excellent sidebar item translations:
- "Aan de slag" (Getting Started)
- "Geheime links" (Secret Links)
- "Aangepaste domeinen" (Custom Domains)
- "Beveiligingsbest practices" (Security Best Practices)

**4. Glossary Present**

Simplified Dutch-only glossary at `translations/glossary.md`:
- Clear terminology
- Dutch-specific translations
- Good context provided

---

## 4. Recommendations

### 🔴 CRITICAL PRIORITY (This Week)

**1. Complete UI Translation**

**Task:** Translate all remaining Starlight UI strings
**File:** `src/content/i18n/nl.json` (lines 51-93)
**Effort:** 2-3 hours
**Impact:** **CRITICAL** - Fixes major user experience issue

**Checklist:**
- [ ] Translate search interface (7 strings)
- [ ] Translate theme/language selectors (6 strings)
- [ ] Translate page navigation (6 strings)
- [ ] Translate aside callouts (5 strings)
- [ ] Translate code features (3 strings)
- [ ] Translate Pagefind search (10 strings)
- [ ] Test all UI elements in browser
- [ ] Verify accessibility labels work correctly

**This is the single most important task for the Dutch locale.**

---

### ⚠️ HIGH PRIORITY (This Month)

**2. Fix Link Localization**

**Task:** Add `/nl/` prefix to internal links
**Files:** All content files
**Effort:** 1-2 hours
**Impact:** HIGH - Ensures proper navigation

**Approach:**
1. Search for pattern: `](`  (markdown links)
2. Identify internal links (not starting with `http` or `/nl/`)
3. Add `/nl/` prefix
4. Test navigation

**3. Fix Technical Term Translation**

**Task:** Review and fix code placeholder translations
**File:** `rest-api/index.mdoc:17`
**Effort:** 30 minutes
**Impact:** MEDIUM - Technical accuracy

**Rule:** Keep code placeholders in English:
- `REGION`, `USERNAME`, `APITOKEN` should remain in English
- Only translate explanatory text

---

### 📋 MEDIUM PRIORITY (Next Quarter)

**4. Add Missing Documentation**

**REST API v2:**
- Create `rest-api/v2/index.mdoc`
- Effort: 1-2 hours
- Impact: HIGH for API users

**Self-Hosting (5 files):**
- Create all 5 self-hosting documentation files
- Effort: 3-4 hours
- Impact: MEDIUM for self-hosting users

---

## 5. Dutch Translation Best Practices

Based on the good content that exists:

### Language Style

**Use formal "u" form consistently:**
```markdown
✅ CORRECT: "uw centrale bron"
❌ WRONG: "jouw centrale bron"
```

**Exception:** UI can be less formal
```markdown
✅ ACCEPTABLE: "Als je vragen of feedback hebt"
✅ ALSO OK: "Als u vragen of feedback hebt"
```

### Link Localization

**Always use absolute paths:**
```markdown
✅ CORRECT: [documentatie](/nl/docs-overview)
❌ WRONG: [documentatie](docs-overview)
❌ WRONG: [documentatie](/docs-overview)
```

### Technical Terms

**Translate user-facing terms, keep code terms:**
```markdown
✅ CORRECT: "Waar `REGION` ofwel `us` of `eu` is."
❌ WRONG: "Waar `REGIO` ofwel `us` of `eu` is."

✅ CORRECT: "geheime links" (secret links)
✅ CORRECT: "aangepaste domeinen" (custom domains)
✅ CORRECT: "API" (keep as-is)
```

### Compound Words

**Use proper Dutch compound words:**
```markdown
✅ CORRECT: "beveiligingsgids" (security guide)
✅ CORRECT: "installatiegids" (setup guide)
✅ CORRECT: "gebruikscasussen" (use cases)
```

---

## 6. Statistics

### File Coverage by Section

| Section | Total | Translated | Missing | Coverage |
|---------|-------|------------|---------|----------|
| Introduction | 1 | 1 | 0 | 100% |
| Custom Domains | 5 | 5 | 0 | 100% |
| Secret Links | 3 | 3 | 0 | 100% |
| Principles | 5 | 5 | 0 | 100% |
| REST API | 5 | 4 | 1 | 80% |
| Self-hosting | 5 | 0 | 5 | 0% |
| Translations | 4 | 4 | 0 | 100% |
| Security | 1 | 1 | 0 | 100% |
| Other | 5 | 5 | 0 | 100% |
| **TOTAL** | **34** | **28** | **6** | **82%** |

### UI Translation Coverage

| UI Component | Status | Strings | Translated |
|--------------|--------|---------|------------|
| Navigation | ✅ Done | 5 | 5 |
| Sidebar | ✅ Done | 39 | 39 |
| Search | ❌ Missing | 7 | 0 |
| Theme/Lang | ❌ Missing | 6 | 0 |
| Page Nav | ❌ Missing | 6 | 0 |
| Aside | ❌ Missing | 5 | 0 |
| Code | ❌ Missing | 3 | 0 |
| Pagefind | ❌ Missing | 10 | 0 |
| **TOTAL** | **50%** | **81** | **44** |

### Issues by Severity

| Severity | Count | Issues |
|----------|-------|--------|
| Critical | 1 | Incomplete UI translation |
| High | 0 | None |
| Medium | 1 | Link localization |
| Low | 1 | Technical term translation |
| **TOTAL** | **3** | |

---

## 7. Conclusion

The Dutch translation presents a **paradox**: the content quality is good, with natural phrasing and proper terminology, but the **incomplete UI translation creates a poor user experience**.

### Current State

**Strengths:**
- ✅ Good content translations (85% quality)
- ✅ Natural Dutch phrasing
- ✅ Proper terminology
- ✅ Decent file coverage (82%)

**Critical Weakness:**
- 🔴 **Only 50% of UI translated** - Half the interface in English
- 🔴 Breaks the localized experience completely
- 🔴 Makes the site feel unprofessional

### Immediate Action Required

**The incomplete UI translation must be addressed immediately.** This is not a minor issue - it affects every single page a Dutch user visits. Users will see:
- English search interface
- English theme selectors
- English page navigation
- English warning/note callouts
- English copy buttons

This creates a jarring, mixed-language experience that undermines all the good content translation work.

### Recommended Approach

1. **Week 1:** Complete UI translation (2-3 hours) ← **START HERE**
2. **Week 2:** Fix link localization (1-2 hours)
3. **Month 2:** Add missing documentation (4-6 hours)

Once the UI is complete, the Dutch locale will jump from **C+ to B+** immediately.

---

**Report Generated:** 2025-11-16
**Next Review:** After UI translation completion
**Priority Action:** Complete `src/content/i18n/nl.json` translation
