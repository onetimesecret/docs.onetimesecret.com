---
title: Hebrew Translation Notes
description: Translation guidelines for Hebrew locale
---

# Hebrew (he) Translation Notes

## Core Terminology

**Secret:** סוד (masculine) - Appropriate for professional contexts

**Password vs Passphrase:**
- Password: סיסמה - for account authentication (feminine)
- Passphrase: ביטוי סיסמה - for secret protection

**Burn:** מחיקה סופית (permanent deletion)

## Key Points

- Right-to-left (RTL) layout essential
- Modern Hebrew without vowel points (niqqud)
- Gender agreement (masculine/feminine)
- Gershayim (״) for Hebrew acronyms
- Masculine singular imperative for buttons (standard in Hebrew UI)
- דוא״ל for email (with gershayim)

## Translation Guidelines

### Consistency
- Use the same translation for a term throughout the application
- Maintain standardized terminology from the glossary
- Key distinctions to preserve:
  - `סיסמה` for account passwords
  - `ביטוי סיסמה` for secret protection
  - `סוד` as the core concept

### Context Awareness
- Consider how the term is used in the application
- Account for surrounding UI elements and user flow
- Ensure translations make sense in their specific context

### Technical Accuracy
- Security-related terms must be translated accurately
- Prioritize precision over localization for technical terminology
- Use established Hebrew technical vocabulary

### Voice and Tone
- Use masculine singular imperative for buttons (standard in Hebrew UI)
- Maintain professional but approachable language
- Ensure consistency in formality level across all interfaces

## Hebrew Language Specifics

### Right-to-Left (RTL) Layout
- Hebrew is written from right to left
- UI elements should be mirrored appropriately
- Numbers and Latin script remain LTR within RTL text
- Pay special attention to interface layout requirements
- Mixed content (Hebrew + numbers/Latin) requires careful handling

### Modern Hebrew Without Niqqud
- Do not use vowel points (niqqud) except in very special cases
- Modern Hebrew text is written without diacritical marks
- Example: סוד (correct), not סוֹד (with niqqud - avoid)
- Vowel points are only for religious texts, poetry, or children's books
- Always write unvocalized text: סוד, סיסמה, הצפנה

### Gender Agreement
- Hebrew has masculine and feminine genders
- Ensure adjectives and verbs agree with noun gender
- Important gender assignments:
  - סוד (masculine)
  - סיסמה (feminine)
  - הצפנה (feminine)
  - קישור (masculine)
- Examples:
  - הסוד נוצר (masculine - the secret was created)
  - הסיסמה נוצרה (feminine - the password was created)

### Plural Forms
- Use appropriate plural forms
- Examples:
  - סוד/סודות (secret/secrets)
  - קישור/קישורים (link/links)
  - שעה/שעות (hour/hours)

### Gershayim and Geresh
- Use gershayim (״) for Hebrew acronyms: דוא״ל, צה״ל
- Use geresh (׳) for single-letter abbreviations
- These are proper Hebrew punctuation marks
- Never use regular quotation marks for this purpose
- Example: דוא״ל (email) - short for דואר אלקטרוני

## Common Translation Patterns

### User Instructions
Use masculine singular imperative forms (standard in Hebrew UI)

### Status Descriptions
Use passive voice or past participles with correct gender agreement

### Help Text and Descriptions
Use declarative sentences with appropriate formality

### Error Messages
Use clear, direct language with professional tone

## Special Considerations

### The Term "Secret"
- Fundamental to the application - translate consistently as `סוד`
- Masculine gender
- Appropriate for professional contexts
- Emphasizes the confidential nature of the shared item

### Password vs. Passphrase
Critical distinction:
- **`סיסמה`** - for user account login credentials (feminine)
- **`ביטוי סיסמה`** - for protecting individual secrets

This distinction must be maintained throughout the application to avoid confusion.

### The Term "Burn"
- Translated as `מחיקה סופית` (permanent deletion)
- More natural in digital Hebrew context than literal translation
- Clearly conveys permanent deletion concept

### UI Element Conventions
- Follow platform conventions for Hebrew interfaces
- Use standard Hebrew terminology for common UI elements
- Maintain consistency with other Hebrew applications
- Buttons use masculine singular imperative as standard

### Technical Security Terms
- Prioritize accuracy over casual localization
- Use established Hebrew technical vocabulary
- Examples:
  - `הצפנה` (encryption)
  - `מוצפן` (encrypted)
  - `אימות` (verification/authentication)
  - `אבטחה` (security)
