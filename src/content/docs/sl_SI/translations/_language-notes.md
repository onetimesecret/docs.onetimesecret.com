---
title: Slovenian Translation Notes
description: Translation guidelines for Slovenian locale
---

# Slovenian (sl_SI) Translation Notes

## Translation Goals

The Slovenian translation aims to:
- Maintain consistency across all application interfaces
- Use clear, natural phrasing for Slovenian-speaking audiences
- Follow technical accuracy for security-related terminology
- Apply appropriate voice and tone for different contexts
- Properly handle Slovenian's unique dual number system and grammatical cases

## Core Terminology

**Secret:** skrivnost (feminine) - Appropriate for professional contexts. Emphasizes the confidential nature of the shared item.

**Password vs Passphrase:**
- Password: geslo (neuter) - for account authentication ONLY
- Passphrase: pristopna fraza - for secret protection

This distinction must be maintained throughout the application to avoid confusion.

**Burn:** trajno izbrisati (permanently delete) - More natural in digital Slovenian context than literal translation. Clearly conveys permanent deletion concept.

## Slovenian Language Specifics

### Unique Dual Number System

Slovenian is one of few languages with a dual number (dvojina). Three number forms are required:
- Singular (1): 1 dan
- Dual (2): 2 dni
- Plural (3+): 3+ dni

Same pattern for all countable nouns. Always use dual forms for quantity 2 - never use plural for 2 items.

### Grammatical Cases

Slovenian has 6 cases (imenovalnik, rodilnik, dajalnik, tožilnik, mestnik, orodnik). Apply correct case declension based on context.

### Three Genders

Masculine, feminine, and neuter with proper agreement:
- skrivnost (feminine) - ustvarjena
- geslo (neuter) - ustvarjeno
- dostop (masculine) - ustvarjen

Adjectives and past participles must agree with noun gender. Incorrect gender agreement sounds unnatural.

### Diacritics

Essential characters that change meaning: č, š, ž. Never substitute with c, s, z. Omitting diacritics creates spelling errors and may change meaning entirely.

### Verb Aspects

Slovenian verbs have perfective and imperfective aspects:
- Perfective: completed action (ustvariti - to create, once)
- Imperfective: ongoing/repeated action (ustvarjati - to be creating)

Choose appropriate aspect based on context.

## Voice and Tone

### Polite Address Forms

Always use polite vi forms for professional tone, never informal ti. Professional interfaces require formal address. Maintain consistency throughout application.

### Imperative Voice (for Actions)

Use imperative forms with polite vi for buttons, links, and user actions.

### Passive/Declarative Voice (for Information)

Use past participles with correct gender agreement for status descriptions. Use declarative sentences with polite second person (vi) for help text and descriptions.

## Technical Security Terms

Prioritize accuracy over casual localization. Use established Slovenian technical vocabulary:
- `šifriranje` (encryption)
- `šifrirano` (encrypted)
- `preverjanje` (verification)
- `avtentikacija` (authentication)

## Summary

Key points for Slovenian translation:
- Unique dual number system (singular, dual, plural)
- 6 grammatical cases
- 3 genders with proper agreement
- Diacritics essential: č, š, ž
- Polite vi forms for professional tone
- Verb aspects: perfective vs imperfective
- Dual forms: 1/2/3+ (dan/dni/dni)
