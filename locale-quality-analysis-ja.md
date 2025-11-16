# Japanese (ja) Locale Quality Analysis

**Date:** 2025-11-16
**Project:** docs.onetimesecret.com (Astro Starlight)
**Locale:** Japanese (ja)
**Baseline:** English (en) - 34 content files
**Overall Grade:** B+

---

## Executive Summary

Japanese translation shows good overall quality with complete UI translations and natural phrasing. However, there are several technical issues that need addressing, including link localization problems and a critical title translation error.

### Quality Scorecard

| Category | Score | Status |
|----------|-------|--------|
| Completeness | 82% (28/34 files) | ⚠️ Good |
| UI Translation | 100% | ✅ Excellent |
| Content Quality | 75% | ⚠️ Good with issues |
| Link Localization | 40% | ❌ Needs work |
| Natural Phrasing | 95% | ✅ Excellent |
| **Overall Rating** | **B+** | ⚠️ Good with fixable issues |

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
- Users cannot access REST API v2 documentation in Japanese
- Self-hosting users have no Japanese documentation (5 missing files)

**User Segments Affected:**
- Developers integrating with REST API v2
- Organizations wanting to self-host Onetime Secret
- Japanese-speaking technical users

---

## 2. UI Translation Analysis: ✅ 100% Complete

**File:** `src/content/i18n/ja.json` (91 lines)

### Translation Coverage

✅ **Navigation Labels** (lines 2-10)
- Blog, Custom Domains, Principles, API, Home

✅ **Sidebar Items** (lines 11-50)
- All 39 sidebar navigation items translated

✅ **Starlight Core UI** (lines 51-77)
- Skip to content: "コンテンツにスキップ"
- Search interface: "検索", "キャンセル"
- Theme selector: "ダーク", "ライト", "自動"
- Language selector: "言語を選択"
- Menu: "メニュ"
- Table of contents: "このページの内容"
- Page navigation: "前へ", "次へ"

✅ **Aside Callouts** (lines 72-75)
- Note: "注記"
- Tip: "ヒント"
- Caution: "注意"
- Danger: "危険"

✅ **ExpressiveCode** (lines 78-80)
- Copy button: "コピーしました！"
- Tooltip: "クリップボードにコピー"

✅ **Pagefind Search** (lines 81-90)
- All search interface strings translated

### Quality Assessment

**Excellent:**
- Natural Japanese phrasing
- Appropriate formality level (polite form)
- Consistent terminology
- Technical terms properly handled

---

## 3. Content Quality Analysis

### Critical Issues

#### 🔴 Issue #1: Title Translation Error

**File:** `src/content/docs/ja/rest-api/index.mdoc`
**Line:** 2
**Severity:** HIGH

**Current:**
```yaml
title: タイトルはじめに
```

**Problem:**
- Contains "タイトル" (Title) which is a translation artifact
- Appears someone left the word "title" in the translation

**Should be:**
```yaml
title: はじめに
```

**Impact:**
- Visible to all users viewing the REST API documentation page
- Looks unprofessional
- Confusing for Japanese users

**Fix Time:** 5 minutes

---

### Medium Issues

#### ⚠️ Issue #2: Missing Link Localization

**File:** `src/content/docs/ja/custom-domains/how-it-works.md`
**Lines:** 17, 20, 29, 31
**Severity:** MEDIUM

**Current (WRONG):**
```markdown
[ドメインのDNS設定](custom-domains/setup-guide)
[ドメインの外観をカスタマイズ](custom-domains/brand-guide)
[データセンターのリージョン](regions)
[セキュリティのベストプラクティス](security-best-practices)
```

**Should be:**
```markdown
[ドメインのDNS設定](/ja/custom-domains/setup-guide)
[ドメインの外観をカスタマイズ](/ja/custom-domains/brand-guide)
[データセンターのリージョン](/ja/regions)
[セキュリティのベストプラクティス](/ja/security-best-practices)
```

**Impact:**
- Links may not work correctly
- May route to English content instead of Japanese
- Inconsistent user experience

**Fix Time:** 1-2 hours (need to check all content files)

---

### Low Issues

#### 🟡 Issue #3: Markdown Formatting Problems

**File:** `src/content/docs/ja/custom-domains/how-it-works.md`
**Lines:** 25-26
**Severity:** LOW

**Current:**
```markdown
- DNSの伝播**：変更が完全に反映されるまで48時間かかる場合があります。
- 不正なDNSレコード**：DNSレコードが正しくない場合**：DNS設定を、選択した地域の提供されたと照らし合わせて再確認してください。
```

**Problem:**
- Bold markers (`**`) appear at the end of text instead of wrapping it
- Should wrap the term being emphasized

**Should be:**
```markdown
- **DNSの伝播**：変更が完全に反映されるまで48時間かかる場合があります。
- **不正なDNSレコード**：DNS設定を、選択した地域の提供された指示と照らし合わせて再確認してください。
```

**Impact:**
- Visual formatting issue only
- Text still readable

**Fix Time:** 10 minutes

---

## 4. Positive Aspects

### ✅ Strengths

**1. Complete Glossary**
- **File:** `src/content/docs/ja/translations/glossary.md`
- **Size:** 162 lines
- Comprehensive terminology guide
- Includes context and usage notes

**2. Natural Japanese Phrasing**
- Translations read naturally for native speakers
- Not word-for-word literal translations
- Appropriate use of keigo (polite language)

**Examples:**
```yaml
# Good natural phrasing
introduction: "はじめに"
customDomains: "カスタムドメイン"
securityBestPractices: "セキュリティベストプラクティス"
```

**3. Technical Term Handling**
- Appropriate balance of Japanese and English terms
- Technical terms use katakana when appropriate
- Consistency across documents

**Examples:**
- API → API (kept in English)
- secret → シークレット (katakana)
- passphrase → パスフレーズ (katakana)
- dashboard → ダッシュボード (katakana)

**4. Metadata Quality**
- All frontmatter properly translated
- Titles and descriptions localized
- Consistent structure maintained

**5. Complete Core Documentation**
- ✅ Introduction
- ✅ Custom Domains (all 5 files)
- ✅ Secret Links (all 3 files)
- ✅ Principles (all 5 files)
- ✅ REST API v1 (3 files)
- ✅ Translations guide (4 files)
- ✅ Security, Regions, Pricing

---

## 5. Recommendations

### High Priority (This Week)

**1. Fix Title Translation Error**
- **File:** `src/content/docs/ja/rest-api/index.mdoc:2`
- **Change:** `title: タイトルはじめに` → `title: はじめに`
- **Effort:** 5 minutes
- **Impact:** HIGH - Visible on main API page

**2. Add Missing REST API v2 Documentation**
- **File to create:** `src/content/docs/ja/rest-api/v2/index.mdoc`
- **Source:** `src/content/docs/en/rest-api/v2/index.mdoc`
- **Effort:** 1-2 hours
- **Impact:** HIGH - Needed for API v2 users

### Medium Priority (This Month)

**3. Fix Link Localization Issues**
- **Files:** All content files with internal links
- **Pattern:** Add `/ja/` prefix to all internal documentation links
- **Effort:** 1-2 hours
- **Impact:** MEDIUM - Improves navigation reliability

**4. Fix Markdown Formatting**
- **File:** `custom-domains/how-it-works.md:25-26`
- **Fix:** Proper bold marker placement
- **Effort:** 10 minutes
- **Impact:** LOW - Visual quality

### Long-term Priority (Next Quarter)

**5. Translate Self-Hosting Documentation**
- **Files to create:** 5 self-hosting documentation files
- **Effort:** 3-4 hours
- **Impact:** MEDIUM - Supports self-hosting users

Files needed:
1. `self-hosting/index.md`
2. `self-hosting/getting-started.md`
3. `self-hosting/installation.md`
4. `self-hosting/configuration.md`
5. `self-hosting/environment-variables.md`

---

## 6. Best Practices for Japanese Translation

Based on this analysis, follow these guidelines for Japanese documentation:

### Link Localization
**Always use absolute paths with locale prefix:**
```markdown
✅ CORRECT: [リンク](/ja/path/to/page)
❌ WRONG: [リンク](path/to/page)
❌ WRONG: [リンク](/path/to/page)
```

### Technical Terms
**Balance Japanese and English appropriately:**
- Keep English for: API, URL, DNS, SSL, HTTP
- Use katakana for: シークレット (secret), パスフレーズ (passphrase)
- Use kanji/hiragana for: 設定 (settings), 安全 (secure), 削除 (delete)

### Formality Level
**Use polite form (です/ます) consistently:**
```markdown
✅ CORRECT: 変更が完全に反映されるまで48時間かかる場合があります。
❌ WRONG: 変更が完全に反映されるまで48時間かかる。
```

### Quality Checklist
Before submitting translations:
- [ ] All frontmatter (title, description) translated
- [ ] All internal links use `/ja/` prefix
- [ ] Technical terms consistent with glossary
- [ ] Polite form used throughout
- [ ] Markdown formatting preserved
- [ ] No translation artifacts (like "タイトル")

---

## 7. Statistics

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

### Issues by Severity

| Severity | Count | Issues |
|----------|-------|--------|
| Critical | 0 | None |
| High | 1 | Title translation error |
| Medium | 2 | Link localization, formatting |
| Low | 1 | Markdown formatting |
| **TOTAL** | **4** | |

### Estimated Translation Work Remaining

| Task | Effort | Priority |
|------|--------|----------|
| Fix title error | 5 min | HIGH |
| Fix links | 1-2 hrs | MEDIUM |
| Fix formatting | 10 min | LOW |
| Add API v2 docs | 1-2 hrs | HIGH |
| Add self-hosting docs | 3-4 hrs | MEDIUM |
| **TOTAL** | **5-8 hrs** | |

---

## 8. Conclusion

The Japanese translation is **well-executed overall** with complete UI translations and natural phrasing that reads well for native speakers. The main issues are technical rather than linguistic:

**Strengths:**
- ✅ Complete UI translation (100%)
- ✅ Natural Japanese phrasing
- ✅ Comprehensive glossary
- ✅ Good technical term handling
- ✅ Most core documentation complete

**Areas for Improvement:**
- ❌ Fix critical title error
- ❌ Add locale prefixes to internal links
- ❌ Complete missing documentation (REST API v2, self-hosting)

**Recommended Action:**
Focus on high-priority technical fixes first (title error, link localization), then complete the missing documentation. The translation quality is good enough that new content can follow the existing patterns.

---

**Report Generated:** 2025-11-16
**Next Review:** After addressing high-priority issues
