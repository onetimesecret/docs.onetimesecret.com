---
title: Czech Translation Notes
description: Translation guidelines for Czech locale
---

# Czech (cs) Translation Notes

## Core Terminology

**Secret:** tajemství (neuter) - Appropriate for professional contexts

**Password vs Passphrase:**
- Password: heslo - for account authentication
- Passphrase: přístupová fráze - for secret protection

**Burn:** trvale smazat (permanently delete)

## Key Points

- 7 grammatical cases requiring careful attention
- Plural forms: 1/2-4/5+ (den/dny/dnů)
- Diacritics essential: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž
- Informal "ty" for modern UX
- Verb aspects: perfective for completed actions

## Translation Guidelines

### Consistency
- Use the same translation for a term throughout the application
- Maintain standardized terminology from the glossary
- Key distinctions to preserve:
  - `heslo` for account passwords
  - `přístupová fráze` for secret protection
  - `tajemství` as the core concept

### Context Awareness
- Consider how the term is used in the application
- Account for surrounding UI elements and user flow
- Ensure translations make sense in their specific context

### Technical Accuracy
- Security-related terms must be translated accurately
- Prioritize precision over localization for technical terminology
- Use established Czech technical vocabulary

### Voice and Tone
- Use informal "ty" form for modern UX experience
- Maintain professional but approachable language
- Ensure consistency in formality level across all interfaces

## Czech Language Specifics

### Grammatical Cases
- Czech has 7 cases (nominativ, genitiv, dativ, akuzativ, vokativ, lokál, instrumentál)
- Apply correct case declension based on context
- Examples of important gender assignments:
  - tajemství (neuter)
  - heslo (neuter)
  - fráze (feminine)
  - odkaz (masculine)

### Plural Forms
Czech requires three plural forms based on quantity:
- 1: singular (den, hodina, minuta, sekunda)
- 2-4: first plural form (dny, hodiny, minuty, sekundy)
- 5+: second plural form (dnů, hodin, minut, sekund)

### Diacritics
- Essential and change meaning completely
- Must be used correctly: á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž
- Never omit or substitute
- Examples where diacritics matter:
  - být (to be) vs byt (apartment)

### Contractions (Spřežky)
- Use for smoother reading: "ve věci", "ke dni", "ze souboru"
- Common in natural Czech text

### Verb Aspects
- Use perfective aspect for completed actions
- Use imperfective aspect for ongoing or repeated actions
- Choose appropriate aspect based on context

## Common Translation Patterns

### User Instructions
Use imperative forms with appropriate verb aspects

### Status Descriptions
Use passive voice or past participles with correct gender agreement

### Help Text and Descriptions
Use declarative sentences with informal second person (ty)

### Error Messages
Use clear, direct language with friendly tone

## Special Considerations

### The Term "Secret"
- Fundamental to the application - translate consistently as `tajemství`
- Neuter gender
- Appropriate for professional contexts
- Emphasizes the confidential nature of the shared item

### Password vs. Passphrase
Critical distinction:
- **`heslo`** - for user account login credentials
- **`přístupová fráze`** - for protecting individual secrets

This distinction must be maintained throughout the application to avoid confusion.

### The Term "Burn"
- Translated as `trvale smazat` (permanently delete)
- More natural in digital Czech context than literal translation
- Clearly conveys permanent deletion concept

### Diacritics are Essential
- Never omit Czech diacritical marks
- They are not optional decorations but essential characters
- Incorrect diacritics completely change meaning

### Gender Agreement
- Ensure adjectives, past participles, and pronouns agree with noun gender
- Important genders to remember:
  - tajemství (neuter)
  - heslo (neuter)
  - přístupová fráze (feminine - "fráze" is feminine)
  - odkaz (masculine)

### UI Element Conventions
- Follow platform conventions for Czech interfaces
- Use standard Czech terminology for common UI elements
- Maintain consistency with other Czech applications

### Technical Security Terms
- Prioritize accuracy over casual localization
- Use established Czech technical vocabulary
- Examples:
  - `šifrovat` (to encrypt)
  - `šifrovaný` (encrypted)
  - `ověření` (verification)
  - `autentizace` (authentication)
