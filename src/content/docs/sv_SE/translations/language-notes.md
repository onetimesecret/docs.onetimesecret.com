---
title: Swedish Translation Notes
description: Translation guidelines for Swedish locale
---

# Swedish (sv_SE) Translation Notes

## Core Terminology

**Secret:** hemlighet - Appropriate for professional contexts (common gender: en hemlighet)

**Password vs Passphrase:**
- Password: lösenord - for account authentication
- Passphrase: lösenfras - for secret protection

**Burn:** radera permanent (delete permanently) - more natural in digital Swedish context than literal translation

## Key Points

- Compound words written as one word (lösenord, lösenfras)
- Two genders: common (en) and neuter (ett)
- Swedish letters å, ä, ö are essential distinct letters
- Informal "du" universally used since du-reformen
- No verb conjugation for person/number
- V2 rule: verb second when not starting with subject

## Swedish Grammar Specifics

### Compound Words

Swedish compound words are written as one word without spaces or hyphens:
- lösenord (password) - NOT "lösen ord"
- lösenfras (passphrase) - NOT "lösen fras"
- användargränssnitt (user interface) - NOT "användare gränssnitt"

This is essential for proper Swedish orthography.

### Two Genders

- Common gender (utrum): en - masculine and feminine merged
- Neuter gender (neutrum): ett

Important gender assignments:
- en hemlighet (common - the secret)
- ett lösenord (neuter - the password)
- en länk (common - the link)
- ett konto (neuter - the account)

### Gender Agreement for Adjectives

Adjectives must agree with noun gender:
- Common gender: -en ending (den skapade hemligheten)
- Neuter gender: -et ending (det skapade lösenordet)
- Indefinite common: -ad ending (en skapad hemlighet)
- Indefinite neuter: -at ending (ett skapat lösenord)

### Swedish Letters å, ä, ö

- These are distinct letters, not variants of a and o
- Alphabetically come after z
- Never substitute with a, a, o or ae, oe
- Essential for proper Swedish spelling

### V2 Rule (Verb Second)

In declarative sentences, the verb comes second. When sentence doesn't start with subject, word order changes:
- Subject first: "Hemligheten skapas här" (The secret is created here)
- Other element first: "Här skapas hemligheten" (Here is created the secret)

## Common Translation Patterns

### User Instructions
Use imperative forms with informal du understood

### Status Descriptions
Use past participles with correct gender agreement

### Help Text and Descriptions
Use declarative sentences with informal du

### Error Messages
Use clear, direct language with friendly tone

## Special Considerations

### Compound Words Must Be Written Together

Never separate Swedish compound words with spaces:
- This is a fundamental rule of Swedish orthography
- Incorrect spacing looks unprofessional and is grammatically wrong
- Examples of correct compounds:
  - lösenord (not "lösen ord")
  - lösenfras (not "lösen fras")
  - säkerhetskopia (not "säkerhets kopia")
  - användarnamn (not "användar namn")

### Swedish Letters Cannot Be Substituted

- å, ä, ö are distinct letters
- Never use a, a, o as substitutes
- Never use ae or oe as substitutes
- Essential for proper Swedish

### UI Element Conventions

- Follow platform conventions for Swedish interfaces
- Use standard Swedish terminology for common UI elements
- Maintain consistency with other Swedish applications
- Use informal du universally

### Technical Security Terms

Prioritize accuracy over casual localization:
- `kryptering` (encryption)
- `krypterad` (encrypted)
- `verifiering` (verification)
- `autentisering` (authentication)
