---
title: Arabic Translation Notes
description: Translation guidelines and terminology for Arabic locale
---

# Arabic (ar) Translation Notes

## Language Considerations

### Right-to-Left (RTL) Layout
- Arabic is written from right to left
- UI elements should be mirrored appropriately
- Numbers and Latin script remain LTR within RTL text
- Pay special attention to interface layout requirements

### Modern Standard Arabic (MSA)
- Use Modern Standard Arabic for professional and technical content
- Professional language suitable for all Arabic-speaking regions
- Ensures accessibility across different Arabic dialects

### Core Terminology

**Secret:** سر (sirr)
- Fundamental to the application - translate consistently
- Appropriate for professional security contexts
- Used from "سر الدولة" (state secret) to business usage
- Emphasizes the confidential nature of the shared item

**Password vs Passphrase:**
- Password: كلمة المرور (kalimat al-muroor) - for account authentication
- Passphrase: عبارة المرور (ibarat al-muroor) - for secret protection
- This distinction must be maintained throughout the application to avoid confusion

**Burn:** حذف نهائياً (hadhf niha'iyan)
- "Final deletion" is more natural than literal "burn" in digital context
- Clearly conveys permanent deletion concept

### Formality
- Use formal second person with appropriate verb forms
- Maintain respectful, professional tone throughout
- Ensure consistency in formality level across all interfaces

### Technical Terms
- Use established Arabic technical terminology where available
- Keep DNS, URL, and similar acronyms in Latin script as universally used
- Prioritize accuracy over casual localization for security terms
- Examples:
  - تشفير (encryption)
  - مشفر (encrypted)
  - التحقق (verification)
  - المصادقة (authentication)

---

## Translation Guidelines

### 1. Consistency
- Use the same translation for a term throughout the application
- Maintain standardized terminology from the glossary
- Key distinctions to preserve:
  - `كلمة المرور` for account passwords
  - `عبارة المرور` for secret protection
  - `سر` as the core concept

### 2. Context Awareness
- Consider how the term is used in the application
- Account for surrounding UI elements and user flow
- Ensure translations make sense in their specific context

### 3. Cultural Adaptation
- Adapt terms to local conventions when necessary
- Use Modern Standard Arabic (MSA) for professional and technical content
- Use established Arabic technical vocabulary

### 4. Technical Accuracy
- Security-related terms must be translated accurately
- Prioritize precision over localization for technical terminology
- Use established Arabic technical terms where available

### 5. Voice and Tone
- Use formal second person with appropriate verb forms
- Maintain respectful, professional tone throughout
- Ensure consistency in formality level across all interfaces

### 6. Right-to-Left (RTL) Layout
- Arabic is written from right to left
- UI elements should be mirrored appropriately
- Numbers and Latin script remain LTR within RTL text
- Pay special attention to interface layout requirements

### 7. Clarity and Natural Phrasing
- Prioritize natural Arabic expressions over literal translations
- Use standard phrases familiar to Arabic speakers
- Ensure terminology is accessible and professional

### 8. Completeness
- Ensure all user-facing strings are translated
- Avoid leaving English text in the interface
- Translate help text, descriptions, and metadata

---

## Common Translation Patterns

### User Instructions
Use appropriate verb forms for instructions and actions

### Status Descriptions
Use passive voice or completed action forms

### Help Text and Descriptions
Use declarative sentences with formal tone

### Error Messages
Use clear, direct language with appropriate formality

---

## UI Element Conventions
- Follow platform conventions for Arabic interfaces
- Implement proper RTL layout and mirroring
- Use standard Arabic terminology for common UI elements
- Maintain consistency with other Arabic applications

---

## Summary of Translation Principles

The Arabic translation maintains:

1. **Terminology Consistency** - Standardized key terms throughout the application
2. **Appropriate Formality** - Formal, respectful tone for professional context
3. **Natural Phrasing** - Standard Arabic expressions and idioms
4. **RTL Awareness** - Proper implementation of right-to-left layout
5. **Complete Coverage** - All user-facing strings translated
6. **Technical Accuracy** - Precise terminology for security concepts
7. **Clear Distinctions** - Especially between account passwords and secret passphrases
8. **Modern Standard Arabic** - Professional language suitable for all Arabic-speaking regions
