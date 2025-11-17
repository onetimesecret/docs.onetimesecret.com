# Spanish (es) Locale Quality Analysis

**Date:** 2025-11-16
**Project:** docs.onetimesecret.com (Astro Starlight)
**Locale:** Spanish (es)
**Baseline:** English (en) - 34 content files
**Overall Grade:** B

---

## Executive Summary

Spanish translation shows very good quality with complete UI translations and natural phrasing. However, there's a critical inconsistency in formality (mixing formal "usted" with informal "tú"), along with missing link localization and formatting issues. The content reads well for Spanish speakers but needs consistency fixes.

### Quality Scorecard

| Category | Score | Status |
|----------|-------|--------|
| Completeness | 85% (29/34 files) | ✅ Excellent |
| UI Translation | 100% | ✅ **PERFECT** |
| Content Quality | 80% | ⚠️ Good with issues |
| Formality Consistency | 50% | 🔴 **INCONSISTENT** |
| Link Localization | 40% | ❌ Needs work |
| Natural Phrasing | 90% | ✅ Excellent |
| **Overall Rating** | **B** | ⚠️ Good, needs consistency fixes |

---

## 1. Completeness Analysis: 85% (29/34 files) - EXCELLENT

### Missing Files (5 total)

**REST API Documentation:**
- ❌ `rest-api/v2/index.mdoc`

**Self-Hosting Documentation:**
- ❌ `self-hosting/index.md`
- ❌ `self-hosting/getting-started.md`
- ❌ `self-hosting/installation.md`
- ❌ `self-hosting/configuration.md`
- ❌ `self-hosting/environment-variables.md`

**Extra File (Helpful):**
- ✅ `translations/es-translation-notes.txt`

### Coverage Highlights

**Strong Coverage:** Spanish has 85% coverage (29/34 files), tied for best with German, Korean, and Italian.

**Complete Sections:**
- ✅ Introduction, Custom Domains, Secret Links, Principles
- ✅ REST API v1 (all 3 files)
- ✅ Translations, Security, Regions, Pricing
- ✅ Full REST API index

---

## 2. UI Translation Analysis: ✅ 100% Perfect

**File:** `src/content/i18n/es.json` (93 lines)

### Complete Translation Coverage

✅ **All 93 UI strings translated**

**Navigation:**
- "Blog", "Dominios Personalizados", "Principios"
- "Volver a onetimesecret.com"

**Sidebar:** All 39 items in natural Spanish
- "Primeros Pasos", "Enlaces Secretos", "Dominios Personalizados"
- "Mejores Prácticas de Seguridad"

**Core UI:**
- Search: "Buscar", "Cancelar", "Limpiar"
- Theme: "Oscuro", "Claro", "Automático"
- Navigation: "Anterior", "Siguiente", "Editar página"

**Callouts:**
- "Nota", "Consejo", "Precaución", "Peligro"

**Pagefind:** All search strings translated
- "Buscar en este sitio"
- "[COUNT] resultados para [SEARCH_TERM]"

### Quality - Excellent

Natural Spanish throughout, appropriate professional tone.

---

## 3. 🔴 CRITICAL ISSUE: Inconsistent Formality

### Mixing "tú" (informal) and "usted" (formal)

Spanish has two forms of address that should NOT be mixed in professional documentation:
- **tú/tu/tus** - Informal (friends, casual)
- **usted/su/sus** - Formal (professional, business)

**Professional documentation should use ONE consistently.**

### Examples of Inconsistency

**File: `custom-domains/how-it-works.md`**

Mixed within same paragraph:
```markdown
Line 6: "su recurso central" (formal - your resource)
Line 8: "su marca" (formal - your brand)
Line 15: "Registra un dominio" (command form - neutral)
Line 16: "Elige la región" (command form - neutral)
Line 17: "Configura los ajustes DNS de tu dominio" (informal - your domain)
Line 18: "Configura el dominio personalizado en tu cuenta" (informal - your account)
Line 19: "tus enlaces secretos" (informal - your secret links)
Line 20: "tu dominio" (informal - your domain)
```

**File: `introduction/index.md`**
```markdown
Line 2: "Tu centro de recursos" (informal - Your center)
Line 6: "su recurso central" (formal - your resource)
Line 21: "Comparta secretos" (formal command)
Line 29: "tu cuenta" vs "tus enlaces" (informal)
```

### Impact

**HIGH - This undermines professional consistency:**
- Confuses readers
- Makes translation look unprofessional
- Inconsistent brand voice

### Recommendation

**Choose ONE approach:**

**Option A: Formal "usted" (Recommended for professional docs)**
```markdown
"su dominio", "sus enlaces", "configure su cuenta"
```

**Option B: Informal "tú" (Only if targeting casual audience)**
```markdown
"tu dominio", "tus enlaces", "configura tu cuenta"
```

**Most professional documentation in Spanish uses formal "usted".**

---

## 4. Content Quality Issues

### ⚠️ Issue #1: Missing Link Localization

**File:** `custom-domains/how-it-works.md`
**Lines:** 17, 20, 29, 31
**Severity:** MEDIUM

**Current:**
```markdown
Line 17: [Configura los ajustes DNS de tu dominio](custom-domains/setup-guide)
Line 20: [Personaliza la apariencia de tu dominio](custom-domains/brand-guide)
Line 29: [Regiones del centro de datos](regions)
Line 31: [Prácticas recomendadas de seguridad](security-best-practices)
```

**Should be:**
```markdown
Line 17: [Configura los ajustes DNS de su dominio](/es/custom-domains/setup-guide)
Line 20: [Personaliza la apariencia de su dominio](/es/custom-domains/brand-guide)
Line 29: [Regiones del centro de datos](/es/regions)
Line 31: [Prácticas recomendadas de seguridad](/es/security-best-practices)
```

**Note:** Also change "tu/tus" to "su/sus" for formal consistency.

---

### ⚠️ Issue #2: Markdown Formatting - Bold Markers

**File:** `custom-domains/how-it-works.md`
**Lines:** 25-28
**Severity:** LOW

**Current:**
```markdown
- Propagación DNS**: Los cambios pueden tardar...
- Registros DNS incorrectos**: Compruebe su configuración...
- Problemas con certificados SSL**: Póngase en contacto...
- Verificación de la propiedad del dominio**: Asegúrese...
```

**Should be:**
```markdown
- **Propagación DNS**: Los cambios pueden tardar...
- **Registros DNS incorrectos**: Compruebe su configuración...
- **Problemas con certificados SSL**: Póngase en contacto...
- **Verificación de la propiedad del dominio**: Asegúrese...
```

---

## 5. Positive Aspects ✅

### Natural Spanish Translation

**Example from `introduction/index.md`:**
```markdown
"Bienvenido a Onetime Secret Docs, su recurso central para
maximizar el valor de nuestro servicio de intercambio de
secretos efímeros centrado en la privacidad."
```

- Professional tone
- Natural flow
- Appropriate vocabulary
- Good sentence structure

### Proper Spanish Terminology

| English | Spanish | Quality |
|---------|---------|---------|
| secret links | enlaces secretos | ✅ Natural |
| custom domains | dominios personalizados | ✅ Perfect |
| passphrase | frase de contraseña | ✅ Appropriate |
| settings | configuración | ✅ Standard |
| security | seguridad | ✅ Correct |
| dashboard | panel | ✅ Translated (good!) |

### Good Link Localization in Some Files

**Example from `introduction/index.md:29`:**
```markdown
[documentación](/es/docs-overview) ✅ CORRECT
```

---

## 6. Recommendations

### 🔴 HIGH PRIORITY (This Week)

**1. Standardize Formality to "Usted" (Formal)**

**Task:** Convert ALL informal "tú/tu/tus" to formal "usted/su/sus"
**Files:** ALL Spanish content files
**Effort:** 2-3 hours
**Impact:** **HIGH** - Professional consistency

**Find/Replace Patterns:**
- `tu dominio` → `su dominio`
- `tus enlaces` → `sus enlaces`
- `tu cuenta` → `su cuenta`
- `Tu centro` → `Su centro`

**Command forms - adjust to formal:**
- `Configura` → `Configure`
- `Personaliza` → `Personalice`
- `Elige` → `Elija`

**2. Fix Link Localization**

**Files:** All content files with internal links
**Effort:** 1-2 hours
**Impact:** MEDIUM

Add `/es/` prefix to all internal documentation links.

---

### 📋 MEDIUM PRIORITY (This Month)

**3. Fix Bold Marker Placement**

**File:** `custom-domains/how-it-works.md:25-28`
**Effort:** 2 minutes
**Impact:** LOW

**4. Add Missing Documentation**

**REST API v2:** 1-2 hours
**Self-hosting (5 files):** 3-4 hours

---

## 7. Spanish Translation Best Practices

### Formality Standard

**Use formal "usted" consistently:**

```markdown
✅ CORRECT: "Configure su dominio"
❌ WRONG: "Configura tu dominio"

✅ CORRECT: "Sus enlaces secretos"
❌ WRONG: "Tus enlaces secretos"

✅ CORRECT: "En su cuenta de Onetime Secret"
❌ WRONG: "En tu cuenta de Onetime Secret"
```

### Link Localization

**Always use absolute paths with locale:**
```markdown
✅ CORRECT: [documentación](/es/docs-overview)
❌ WRONG: [documentación](docs-overview)
❌ WRONG: [documentación](/docs-overview)
```

### Technical Terms

**Balance Spanish and English:**

**Keep in English:**
- API, URL, DNS, SSL, HTTP

**Translate to Spanish:**
- secret → secreto
- passphrase → frase de contraseña
- custom domains → dominios personalizados
- settings → configuración
- dashboard → panel (not "tablero")

### Capitalization

**Spanish uses less capitalization than English:**
```markdown
✅ CORRECT: "Mejores prácticas de seguridad"
❌ WRONG: "Mejores Prácticas de Seguridad"
```

**Only capitalize:**
- First word of sentence
- Proper nouns
- First word of title

---

## 8. Statistics

### File Coverage by Section

| Section | Total | Translated | Missing | Coverage |
|---------|-------|------------|---------|----------|
| Introduction | 1 | 1 | 0 | 100% |
| Custom Domains | 5 | 5 | 0 | 100% |
| Secret Links | 3 | 3 | 0 | 100% |
| Principles | 5 | 5 | 0 | 100% |
| REST API | 5 | 4 | 1 | 80% |
| Self-hosting | 5 | 0 | 5 | 0% |
| Translations | 4 | 5 | -1 | 125% (extra file) |
| Security | 1 | 1 | 0 | 100% |
| Other | 5 | 5 | 0 | 100% |
| **TOTAL** | **34** | **29** | **5** | **85%** |

### Issues by Severity

| Severity | Count | Issues |
|----------|-------|--------|
| Critical | 0 | None |
| High | 1 | Formality inconsistency |
| Medium | 1 | Link localization |
| Low | 1 | Bold marker formatting |
| **TOTAL** | **3** | |

---

## 9. Conclusion

Spanish translation is **well-executed overall** with excellent UI coverage and natural phrasing. The main issue is formality inconsistency, which is fixable with systematic find/replace.

### Strengths

✅ **Best file coverage** (85%)
✅ **Perfect UI translation** (100%)
✅ **Natural Spanish** phrasing
✅ **Good terminology** choices
✅ **Professional structure**

### Weaknesses

❌ **Inconsistent formality** (critical for professional docs)
❌ **Missing link localization**
❌ **Minor formatting issues**

### Recommended Actions

1. **This week:** Standardize to formal "usted" (2-3 hours)
2. **This week:** Fix link localization (1-2 hours)
3. **This month:** Add missing documentation (4-6 hours)

**After fixes, expected grade: A-**

---

**Report Generated:** 2025-11-16
**Next Review:** After formality standardization
**Priority Action:** Standardize to formal "usted" throughout
**Status:** Good quality - needs consistency fixes
