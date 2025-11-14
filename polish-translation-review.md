# Polish Translation Quality Review

**Date:** 2025-11-14
**Reviewer:** Claude
**Locale:** Polish (pl)
**Status:** Corrections Required

## Executive Summary

The Polish translation demonstrates excellent technical execution in most areas, particularly in distinguishing between `password` and `passphrase`. However, a critical error was identified: the translation incorrectly applied the Danish exception pattern by using "Wiadomość" (message) instead of "Sekret" (secret).

**Overall Quality:** ⭐⭐⭐½ (3.5/5)
**Recommendation:** Revert "Wiadomość" → "Sekret" throughout all translations

---

## Detailed Findings

### ✅ Strengths

#### 1. Excellent passphrase/password Distinction (CRITICAL SUCCESS)

The translation correctly implements the guide's most important requirement:

- **Account password:** `Hasło` ✅
- **Secret passphrase:** `Fraza dostępowa` (Access Phrase) ✅

This distinction is crucial and was executed perfectly. Examples:
- `web.COMMON.secret_passphrase`: `Fraza dostępowa`
- `web.COMMON.field_password`: `Hasło`
- `web.account.changePassword.currentPassword`: `Hasło`

**Assessment:** This follows the guide requirements precisely (guide.md:209-256).

#### 2. Consistency and Completeness

- All related keys updated consistently across buttons, labels, hints, and feedback messages
- Remaining English strings fully translated
- Proper Polish grammar and pluralization rules applied
- Clear, natural phrasing within application context

#### 3. UX Enhancements

Added clarifying context where helpful:
- `web.COMMON.secret_passphrase_hint`: Added "chroniąca wiadomość" (protecting the message) to clarify purpose

---

### ❌ Critical Issue: Incorrect "secret" Translation

#### The Problem

**Current translation:**
- `secret` → `Wiadomość` (Message)

**Correct translation should be:**
- `secret` → `Sekret` (Secret)

#### Why This Is Wrong

**1. Linguistic Assessment**

Polish "Sekret" does NOT have the problematic connotations that justified the Danish exception:

- ❌ Danish "Hemmeligheder" = personal/childish secrets (inappropriate for security context)
- ✅ Polish "Sekret" = appropriate across all contexts, from "sekret państwowy" (state secret) to casual usage

**2. Security Context Loss**

"Wiadomość" significantly weakens the security framing:

| Polish Phrase | English Equivalent | User Interpretation |
|--------------|-------------------|---------------------|
| Utwórz sekret | Create a secret | Something private/confidential is being created |
| Utwórz wiadomość | Create a message | Just sending another message (email, SMS, etc.) |

The security signal is completely lost.

**3. Guide Misapplication**

The translation incorrectly applied the Danish exception pattern (guide.md:194-208) when it should have followed the general rule (guide.md:158-161):

> **secret** (n.) - The confidential information being shared
> - Translations must maintain the context of confidentiality
> - **Preferred over terms like "message" or "content"**
> - Example: "Create a new secret" NOT "Create a new message"

**4. Glossary Inconsistency**

No other language in the glossary uses "message" as the primary translation:

| Language | Translation | Approach |
|----------|------------|----------|
| German (DE/AT) | Geheimnis | Direct equivalent of "secret" |
| French (FR/CA) | secret | Untranslated (loanword) |
| Polish | ~~Wiadomość~~ | ❌ Incorrect exception application |
| Polish | **Sekret** | ✅ Should be this |

---

## Required Corrections

### High Priority: Revert All "Wiadomość" → "Sekret"

All instances where "secret" was translated to "Wiadomość" must be changed to "Sekret":

#### Examples from language-notes.md:

**Line 55:**
```diff
- `web.COMMON.secret`: Changed from `Sekret` to `Wiadomość`
+ `web.COMMON.secret`: Should remain `Sekret`
```

**Line 56:**
```diff
- `web.COMMON.button_create_secret`: Changed from `Utwórz tajne łącze` to `Utwórz link do wiadomości`
+ `web.COMMON.button_create_secret`: Should be `Utwórz sekret` or `Utwórz tajne łącze`
```

**Line 57:**
```diff
- `web.COMMON.view_secret`: Changed from `Pokaż poufną wiadomość` to `Wyświetl wiadomość`
+ `web.COMMON.view_secret`: Should be `Wyświetl sekret` or `Pokaż sekret`
```

**Line 58:**
```diff
- `web.COMMON.share_a_secret`: Changed from `Udostępnij poufną wiadomość` to `Udostępnij wiadomość`
+ `web.COMMON.share_a_secret`: Should be `Udostępnij sekret`
```

**Line 59-62 (Labels):**
```diff
- `web.LABELS.secret_link`: `Link do wiadomości`
+ `web.LABELS.secret_link`: `Link do sekretu` or `Tajny link`

- `web.LABELS.create_new_secret`: `Utwórz nową wiadomość`
+ `web.LABELS.create_new_secret`: `Utwórz nowy sekret`

- `web.LABELS.secret_status`: `Status wiadomości`
+ `web.LABELS.secret_status`: `Status sekretu`
```

### Recommended Translation: "Sekret"

**Primary recommendation:** Use `Sekret` (clean, direct)

**Alternative (if more formal tone desired):** `Poufny sekret` (Confidential secret)
- Note: Likely redundant since "sekret" already implies confidentiality
- Only use if formal/legal context requires extra emphasis

### Passphrase Translations: Keep Current Approach

**No changes needed** for passphrase-related translations. The current approach is correct:

- `Fraza dostępowa` ✅
- All related hints, labels, and messages ✅

However, update any passphrase hints that currently say "chroniąca wiadomość" to "chroniąca sekret":

```diff
- `web.COMMON.secret_passphrase_hint`: `Trudne do odgadnięcia słowo lub fraza chroniąca wiadomość`
+ `web.COMMON.secret_passphrase_hint`: `Trudne do odgadnięcia słowo lub fraza chroniąca sekret`
```

Or keep it simpler:
```
`web.COMMON.secret_passphrase_hint`: `Trudne do odgadnięcia słowo lub fraza`
```

---

## Documentation Updates Required

### 1. Update Polish language-notes.md

- Remove or rewrite the entire "secret" vs "password" vs "passphrase" section
- Correct the reasoning: Polish DOES use "Sekret" (not "Wiadomość")
- Keep the passphrase/password distinction section (it's correct)
- Update all example translations to use "Sekret"

### 2. Add Polish to Glossary

Add a Polish column to the glossary (glossary.md) showing correct translations:

| English | Polish (PL) | Context |
|---------|------------|---------|
| secret (noun) | Sekret | Central concept |
| passphrase | Fraza dostępowa | Secret protection |
| password | Hasło | Account credential |
| burn | Zniszczyć/Spalić | Delete before viewing |

### 3. Update English Translation Guide

Add clarification to guide.md about when to apply the Danish exception:

**After the Danish example (line 208), add:**

```markdown
#### When to Apply the "Message" Exception

The Danish exception (using "message" instead of "secret") should ONLY be applied when:

1. The literal translation of "secret" carries inappropriate connotations in the target language
2. These connotations are specifically about:
   - Personal/private secrets (gossip, hidden information)
   - Childish or trivial usage
   - Meanings that undermine the security/professional context

**Examples:**
- ✅ Danish "Hemmeligheder" - Has childish/personal connotations (exception justified)
- ❌ Polish "Sekret" - Works perfectly across all contexts (no exception needed)
- ❌ German "Geheimnis" - Appropriate for security contexts (no exception needed)

**When in doubt:** Test with native speakers unfamiliar with the product. If "Create a [secret]"
sounds professional and security-focused in the target language, use the literal translation.
```

---

## Testing Recommendations

Before finalizing the corrected translations:

1. **Native speaker review:** Have Polish speakers unfamiliar with the product review phrases like:
   - "Utwórz sekret"
   - "Wyświetl sekret"
   - "Udostępnij sekret"

2. **Security context test:** Confirm these phrases convey confidentiality and security

3. **Consistency check:** Ensure all instances of "secret" are translated consistently

---

## Implementation Checklist

- [ ] Revert all "Wiadomość" → "Sekret" in Polish translation files
- [ ] Update Polish language-notes.md with corrected reasoning
- [ ] Add Polish to the glossary (glossary.md)
- [ ] Update English guide with exception criteria clarification
- [ ] Test updated translations with native Polish speakers
- [ ] Update any related documentation or examples

---

## Summary Assessment

| Category | Score | Notes |
|----------|-------|-------|
| Password/Passphrase Distinction | ⭐⭐⭐⭐⭐ | Perfect implementation |
| Consistency | ⭐⭐⭐⭐⭐ | Excellent throughout |
| Completeness | ⭐⭐⭐⭐⭐ | Fully translated |
| Grammar/Natural Polish | ⭐⭐⭐⭐ | Good, minor polish needed |
| **"Secret" Translation** | ⭐ | **Critical error - needs correction** |
| **Overall** | ⭐⭐⭐½ | **Good work, but requires fix** |

**Recommendation:** Once the "Sekret" correction is applied, this will be an excellent translation (⭐⭐⭐⭐⭐).

---

## Conclusion

The Polish translation team demonstrated strong attention to detail and excellent understanding of the critical password/passphrase distinction. The primary issue is a misapplication of the Danish exception pattern that resulted in using "Wiadomość" (message) instead of "Sekret" (secret).

This is easily correctable and, once fixed, the Polish translation will fully align with the style guide and maintain the appropriate security context for Polish-speaking users.
