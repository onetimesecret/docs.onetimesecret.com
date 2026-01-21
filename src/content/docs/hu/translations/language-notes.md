---
title: Hungarian Translation Notes
description: Translation guidelines for Hungarian locale
---

# Hungarian (hu) Translation Notes

## Core Terminology

**Secret:** titok - Appropriate for professional contexts

**Password vs Passphrase:**
- Password: jelszó - for account authentication
- Passphrase: hozzáférési mondat - for secret protection

**Burn:** végleges törlés (permanent deletion)

## Key Points

- Agglutinative language with 18+ cases
- Vowel harmony essential for suffixes
- No grammatical gender (simplification)
- Diacritics essential: á, é, í, ó, ö, ő, ú, ü, ű
- Formal address (maga/ön forms) for professional tone
- Definite vs indefinite verb conjugation

## Translation Guidelines

### Consistency
- Use the same translation for a term throughout the application
- Maintain standardized terminology from the glossary
- Key distinctions to preserve:
  - `jelszó` for account passwords
  - `hozzáférési mondat` for secret protection
  - `titok` as the core concept

### Context Awareness
- Consider how the term is used in the application
- Account for surrounding UI elements and user flow
- Ensure translations make sense in their specific context

### Technical Accuracy
- Security-related terms must be translated accurately
- Prioritize precision over localization for technical terminology
- Use established Hungarian technical vocabulary

### Voice and Tone
- Use formal address (maga/ön forms) for professional tone
- Maintain professional but approachable language
- Ensure consistency in formality level across all interfaces

## Hungarian Language Specifics

### Agglutinative Grammar
- Hungarian uses 18+ grammatical cases expressed through suffixes
- Cases are formed by adding suffixes to word stems
- Each suffix must follow vowel harmony rules

### Vowel Harmony
- Essential for correct suffix attachment
- Front vowels (e, é, i, í, ö, ő, ü, ű) take front-vowel suffixes
- Back vowels (a, á, o, ó, u, ú) take back-vowel suffixes
- Examples:
  - házban (in the house - back vowel)
  - kertben (in the garden - front vowel)
  - NOT "házben" (incorrect)
- Never violate vowel harmony rules
- Incorrect vowel harmony sounds very unnatural to native speakers

### Diacritics (Ékezetek)
- Essential and change meaning completely
- Must be used correctly: á, é, í, ó, ö, ő, ú, ü, ű
- Never omit or substitute
- Examples where diacritics change meaning:
  - kor (age) vs kór (disease)
  - tuz (imperative: endure) vs tűz (fire)
- Hungarian diacritics are not optional decorations
- They represent entirely different sounds

### No Grammatical Gender
- Unlike many European languages, Hungarian has no grammatical gender
- This simplifies some aspects of translation
- No need to worry about masculine/feminine agreement
- Same adjective/verb form regardless of noun
- Focus on case suffixes and vowel harmony instead

### Definite vs Indefinite Conjugation
- Verbs have two different conjugation patterns
- Definite conjugation used when object is definite
- Indefinite conjugation used when object is indefinite
- Examples:
  - látom a titkot (I see the secret - definite)
  - látok egy titkot (I see a secret - indefinite)
- Pay attention to whether objects are definite or indefinite
- Use correct verb conjugation pattern
- This affects how natural the translation sounds

### Articles
- Definite articles: a (before consonants), az (before vowels)
- Indefinite article: egy
- Examples:
  - a titok (the secret)
  - az e-mail (the email)
  - egy hivatkozás (a link)

## Common Translation Patterns

### User Instructions
Use imperative forms or infinitives for instructions

### Status Descriptions
Use passive voice or past participles appropriately

### Help Text and Descriptions
Use declarative sentences with formal address (maga/ön)

### Error Messages
Use clear, direct language with professional tone

## Special Considerations

### The Term "Secret"
- Fundamental to the application - translate consistently as `titok`
- Appropriate for professional contexts
- Emphasizes the confidential nature of the shared item

### Password vs. Passphrase
Critical distinction:
- **`jelszó`** - for user account login credentials
- **`hozzáférési mondat`** - for protecting individual secrets

This distinction must be maintained throughout the application to avoid confusion.

### The Term "Burn"
- Translated as `végleges törlés` (permanent deletion)
- More natural in digital Hungarian context than literal translation
- Clearly conveys permanent deletion concept

### UI Element Conventions
- Follow platform conventions for Hungarian interfaces
- Use standard Hungarian terminology for common UI elements
- Maintain consistency with other Hungarian applications

### Technical Security Terms
- Prioritize accuracy over casual localization
- Use established Hungarian technical vocabulary
- Examples:
  - `titkosítás` (encryption)
  - `titkosított` (encrypted)
  - `ellenőrzés` (verification)
  - `hitelesítés` (authentication)
