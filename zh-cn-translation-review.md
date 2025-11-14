# Chinese (zh-CN) Translation Quality Review

**Date:** 2025-11-14
**Reviewer:** Claude
**Scope:** All zh-cn translation files in the documentation

---

## Executive Summary

The zh-cn translations show a **critical inconsistency** between UI translations and content documentation. The UI translations (zh-cn.json) correctly implement the language-specific guidelines documented in `language-notes.md`, while the content files (markdown documentation) do not follow these same guidelines. This creates a fragmented user experience with different terminology used across the interface and documentation.

**Overall Assessment:** ⚠️ MAJOR REVISIONS NEEDED

---

## Critical Issues

### 1. Inconsistent Application of Language Notes (CRITICAL)

**Issue:** The language notes document clearly outlines moving away from "秘密" (secret) terminology, but content files still heavily use it.

**Evidence:**

**UI Translations (zh-cn.json) - CORRECT ✅**
```json
"secretLinks": "一次性链接",           // one-time links (correct per language notes)
"createSecrets": "创建内容",          // create content (correct per language notes)
"retrieveSecrets": "获取内容",        // retrieve content (correct per language notes)
"gettingStarted": "开始使用"          // start using (correct per language notes)
```

**Content Files - INCORRECT ❌**
- `secret-links/index.md`: Title uses "秘密链接介绍" (Secret Links Introduction)
- `secret-links/why-use-secret-links.md`: Title uses "为什么使用秘密链接？" (Why Use Secret Links?)
- `introduction/index.md`: Title uses "入门" (Getting Started - old version)

**Language Notes Guidance (lines 10-20):**
> Moving Away from "秘密" (Secret)
> - `"secretLinks": "Secret Links"` → `"一次性链接"` (one-time links)
> - `"createSecrets": "Create Secrets"` → `"创建内容"` (create content)
> - `"retrieveSecrets": "Retrieve Secrets"` → `"获取内容"` (retrieve content)
> - `"gettingStarted": "Getting Started"` → `"开始使用"` (start using - more direct action)

**Impact:** Users see "一次性链接" in the UI but "秘密链接" in documentation, creating confusion about what these features are called.

**Recommendation:** Update ALL content files to use the terminology from language-notes.md:
- Replace "秘密链接" with "一次性链接"
- Replace "入门" with "开始使用"
- Use "内容" instead of "秘密" for create/retrieve actions

---

### 2. Glossary File Corruption (CRITICAL)

**Issue:** The glossary file (`translations/glossary.md`) has severe formatting problems with broken tables and mixed content.

**Evidence:**
```markdown
| 英语 | 德语 (AT) | 法语 (FR) | 法语 (CA) | 备注 |
|---------|-------------|-------------|-------------|-------|
| 秘密（名词） | Geheimnis | 秘密 | 秘密 | 应用文的中心概念 | | 应用文的中心概念 | | 应用文的中心概念 | | 应用文的中心概念
| secret (adj) | geheim | secret/sécurisé | 秘密/sécurisé | | | |
| passphrase | Sicherheitsphrase | phrase secrète | mot de passe | 保密认证方法
| 在查看前删除密文的操作
```

**Problems:**
- Table cells are duplicated and merged incorrectly
- Missing separators between cells
- German and French translations in wrong columns
- Incomplete rows and orphaned text
- Title is "曾经的秘密翻译词汇" which translates to "Former Secret Translation Vocabulary" - should be "Onetime Secret 翻译词汇"

**Impact:** Translators cannot use this glossary as a reference, leading to inconsistent terminology.

**Recommendation:** Completely rebuild the glossary table from the English source, ensuring:
- Proper markdown table formatting
- Correct Chinese translations in the zh-CN column
- Remove German/French/etc columns (those belong in their respective locale files)
- Fix the title translation

---

### 3. Style Guide Translation Contradicts Language Notes (CRITICAL)

**Issue:** The Chinese style guide (`translations/guide.md`) is a direct translation of the English style guide and contradicts the Chinese-specific language notes.

**Evidence:**

**Line 6 of guide.md:**
```markdown
### 翻译风格指南 英语，加拿大 (en-CA)
```
Translation: "Translation Style Guide English, Canada (en-CA)"

This is the ENGLISH style guide translated to Chinese! It should be the CHINESE style guide.

**Lines 158-161 of guide.md:**
```markdown
- **secret** (n.) - 共享的机密信息
    - 翻译时必须保持机密的语境
    - 优先于 "信息" 或 "内容" 等术语
    - 例如："创建一个新的秘密" 而不是 "创建一个新的信息"。
```

Translation: "Preferred over terms like 'message' or 'content'" - Example: "Create a new secret" not "Create a new message"

**This DIRECTLY CONTRADICTS language-notes.md** which says:
> - `"createSecrets": "Create Secrets"` → `"创建内容"` (create content)

**Impact:** Translators receive contradictory guidance, leading to inconsistent translations.

**Recommendation:**
- Replace the generic style guide with Chinese-specific guidance
- Incorporate the language-notes.md principles into the main style guide
- Remove contradictory English-centric examples
- Add Chinese-specific examples and rationale

---

## Major Issues

### 4. Inconsistent Terminology in Documentation Content

**Issue:** Documentation files don't follow the standardized terminology from language notes.

**Examples:**

| File | Current (Incorrect) | Should Be (Per Language Notes) | Line Reference |
|------|---------------------|--------------------------------|----------------|
| `introduction/index.md` | Title: "入门" | "开始使用" | Line 2 |
| `secret-links/index.md` | Title: "秘密链接介绍" | "一次性链接介绍" | Line 2 |
| `secret-links/why-use-secret-links.md` | Title: "为什么使用秘密链接？" | "为什么使用一次性链接？" | Line 2 |
| `rest-api/v1/create-secrets.md` | Title: "创造秘密" | "创建内容" | Line 2 |
| `secret-links/index.md` | "什么是秘密链接？" | "什么是一次性链接？" | Line 8 |
| `secret-links/index.md` | "秘密链接是独一无二的自毁 URL" | "一次性链接是独一无二的自毁 URL" | Line 10 |
| `secret-links/why-use-secret-links.md` | "Secret Links" throughout | "一次性链接" | Throughout |

**Impact:** Creates confusion for Chinese readers who see different terms for the same concept.

**Recommendation:**
- Perform global search and replace across all content files
- Update all titles to match language-notes.md conventions
- Ensure consistency between UI and documentation terminology

---

### 5. Tone and Voice Issues

**Issue:** Some translations lack the conciseness and directness emphasized in the language notes.

**Evidence:**

**From language-notes.md (lines 22-31):**
> UI Text Optimization for Chinese Language Patterns
> **Reasoning:** Chinese language structure allows for more concise expressions
> - `"page.editLink": "Edit page"` → `"编辑"` (edit - concise button text)
> - `"pagefind.load_more": "Load more results"` → `"加载更多"` (load more - simplified)

**Applied correctly in zh-cn.json ✅:**
```json
"page.editLink": "编辑",
"pagefind.load_more": "更多结果"
```

**But content files are verbose:**
- `custom-domains/index.md` line 8: "这一功能将您的品牌形象融入到秘密共享体验中，增强了信任感和专业性。"
  - Could be more concise: "将您的品牌融入安全共享体验，增强信任和专业性。"

**Recommendation:** Review content for opportunities to use more natural, concise Chinese expressions while maintaining clarity.

---

## Moderate Issues

### 6. Brand Term Translation Inconsistency

**Issue:** The brand name "Onetime Secret" appears in Chinese as "曾经的秘密" in glossary.md title.

**Evidence:**
- `glossary.md` line 6: "曾经的秘密翻译词汇" (Former Secret Translation Vocabulary)

**Correct usage:**
- Brand names should NOT be translated (per English guide line 135)
- Should be "Onetime Secret 翻译词汇" or "Onetime Secret 词汇表"

**Recommendation:** Never translate the brand name "Onetime Secret" - keep it in English.

---

### 7. Punctuation Inconsistency

**Issue:** Some files use exclamation marks contrary to style guide.

**English style guide (line 82):**
> "Avoid exclamations"

**Language notes (line 68):**
> **Removed exclamation marks**: Following style guide punctuation principles

**Evidence:**
- Mostly correct in UI: `"expressiveCode.copyButtonCopied": "已复制"` (no exclamation)
- Need to verify all content files don't use unnecessary exclamations

**Recommendation:** Audit all content for exclamation marks and remove per style guide.

---

## Positive Findings

### What's Working Well ✅

1. **UI Translations (zh-cn.json)**: Excellent implementation of language notes principles
   - Correct use of "一次性链接" instead of "秘密链接"
   - Concise button text: "编辑" not "编辑页面"
   - Simplified tooltips: "复制" not "复制到剪贴板"
   - No unnecessary punctuation

2. **Language Notes Documentation**: Comprehensive, well-reasoned guidance
   - Clear rationale for terminology choices
   - Good examples comparing old vs. new translations
   - Cultural and linguistic context provided

3. **Technical Terminology**: Appropriate handling
   - API, REST, v1, v2 kept in English (correct)
   - Technical terms properly translated: "客户端库" (client libraries)

4. **Professional Tone**: Generally maintains appropriate formality level
   - Suitable for both technical and general Chinese users
   - Avoids overly casual language

---

## Recommendations Summary

### Immediate Actions (Critical Priority)

1. **Fix Glossary File**
   - Rebuild table structure from scratch
   - Remove non-Chinese columns (create separate files for other locales)
   - Correct title to "Onetime Secret 词汇表"
   - Ensure all Chinese translations match language-notes.md

2. **Update All Content Files**
   - Global replace: "秘密链接" → "一次性链接"
   - Update titles in introduction/index.md: "入门" → "开始使用"
   - Update API docs: "创造秘密" → "创建内容", "检索秘密" → "获取内容"

3. **Fix Style Guide**
   - Either create Chinese-specific style guide OR
   - Merge language-notes.md content into guide.md
   - Remove contradictory English examples
   - Update header: should reference zh-CN not en-CA

### High Priority

4. **Terminology Audit**
   - Create list of all files using "秘密" terminology
   - Systematically update to "内容" or "一次性" as appropriate
   - Verify consistency with language-notes.md

5. **Review Content Conciseness**
   - Apply Chinese language optimization principles from language-notes.md
   - Shorten verbose phrases where natural

### Medium Priority

6. **Punctuation Review**
   - Audit all content for exclamation marks
   - Ensure compliance with style guide

7. **Cross-Reference Check**
   - Verify all internal links use correct Chinese paths
   - Ensure translated filenames match conventions

---

## Quality Metrics

| Aspect | Rating | Notes |
|--------|--------|-------|
| UI Translations | ✅ Excellent | Correctly implements language notes |
| Content Translations | ❌ Poor | Does not follow language notes |
| Glossary | ❌ Critical Issues | Broken formatting, incorrect content |
| Style Guide | ❌ Critical Issues | Wrong locale, contradictory guidance |
| Tone & Voice | ⚠️ Good | Generally appropriate, some improvements needed |
| Technical Accuracy | ✅ Good | Proper handling of technical terms |
| Consistency | ❌ Poor | Major discrepancies between UI and content |

**Overall Assessment:** ⚠️ Requires Major Revisions

---

## Conclusion

The zh-cn translations demonstrate a clear understanding of appropriate Chinese localization principles (evidenced by the excellent UI translations), but these principles have not been systematically applied to the documentation content. The language-notes.md document provides solid guidance that should be the foundation for all Chinese translations.

The critical issue is **inconsistency**: the UI uses one set of terminology while the documentation uses another. This creates a disjointed user experience and undermines the thoughtful work documented in language-notes.md.

**Primary Recommendation:** Treat language-notes.md as the source of truth and update all content files, the glossary, and the style guide to align with its principles. The UI translations should be used as the reference model for quality.

---

## Files Requiring Updates

### Critical Updates Needed
- `src/content/docs/zh-cn/translations/glossary.md` - REBUILD
- `src/content/docs/zh-cn/translations/guide.md` - MAJOR REVISION
- `src/content/docs/zh-cn/introduction/index.md` - Update title
- `src/content/docs/zh-cn/secret-links/index.md` - Update terminology
- `src/content/docs/zh-cn/secret-links/why-use-secret-links.md` - Update terminology
- `src/content/docs/zh-cn/rest-api/v1/create-secrets.md` - Update terminology
- `src/content/docs/zh-cn/rest-api/v1/retrieve-secrets.md` - Update terminology

### All Content Files Requiring Review
All `.md` files in `src/content/docs/zh-cn/` should be audited for:
- Use of "秘密链接" (should be "一次性链接")
- Use of "秘密" in create/retrieve contexts (should be "内容")
- Conciseness of Chinese expressions
- Punctuation compliance
- Brand name handling

**Reference Implementation:** `src/content/i18n/zh-cn.json` (UI translations) - use as quality benchmark

---

## Next Steps

1. Review and approve this assessment
2. Prioritize fixes (recommend: Critical → High → Medium)
3. Update content files systematically
4. Validate changes against language-notes.md
5. Test user experience with consistent terminology
6. Consider creating automated checks for terminology consistency
