---
title: Turkish Translation Notes
description: Translation guidelines and terminology for Turkish (tr) locale
---

# Turkish (tr) Translation Notes

## Translation Choices and Adjustments

During the translation process, several conscientious choices were made to ensure the Turkish text appropriately conveys the intended meaning while being natural to native speakers.

## Important Translation Choices

### 1. "Secret" Translation

**Choice:** Consistently translated as **"gizli mesaj"** (secret/private message) rather than just "sır" (secret).

**Reasoning:** This better communicates the nature of the content being shared—emphasizing it's a message with confidential information rather than a personal secret.

### 2. "Burn" Translation

**Choice:** Translated as **"yak"** (to burn) maintaining the metaphor from English.

**Reasoning:** Creates a strong mental image of permanent deletion rather than using more generic terms like "sil" (delete).

### 3. "Passphrase" vs "Password"

**Choice:** Both translated as **"parola"**.

**Reasoning:** Turkish doesn't commonly distinguish between these concepts with different terms. This maintains consistency with how users typically refer to authentication credentials in Turkish software interfaces.

### 4. Status Terms

Terms in the STATUS section were carefully translated to maintain their technical meaning while being natural in Turkish:

- "Expiring soon" → **"Yakında sona erecek"** (approaching its end soon)
- "Orphaned" → **"Sahipsiz"** (without an owner)
- "Securing" → **"Güvenli hale getiriliyor"** (being made secure)

### 5. Formal Address

Maintained a balance between formal and conversational tone, using second-person pronouns appropriately for a professional application.

## Encoding Considerations

### Turkish Character Issues

The Turkish translation file had numerous encoding issues where Turkish characters were represented as Unicode escape sequences:

**Turkish characters and their Unicode sequences:**
- `ı` (dotless i) → `\u0131`
- `ğ` (g with breve) → `\u011f`
- `ü` (u with diaeresis) → `\u00fc`
- `ş` (s with cedilla) → `\u015f`
- `ç` (c with cedilla) → `\u00e7`
- `ö` (o with diaeresis) → `\u00f6`
- `İ` (capital I with dot) → `\u0130`

**Resolution:** These encoding issues should be fixed to use proper UTF-8 encoding for better readability and maintenance.

## Summary of Changes to the Turkish Translation

### 1. Encoding Fixes
Corrected numerous encoding issues where Turkish characters (ı, ğ, ü, ş, ç, ö) were represented as Unicode escape sequences.

### 2. Semantic Improvements
- Improved consistency in terminology throughout the interface
- Ensured technical terms maintained their specific meaning in translation
- Enhanced natural flow of Turkish sentences

### 3. Section Completions
- Completed translation of previously untranslated sections including STATUS, FEATURES, and account management areas
- Ensured interface components have appropriate Turkish equivalents

### 4. Contextual Adaptations
- Adapted certain phrases to better fit Turkish language patterns
- Maintained the security-focused terminology in ways that would be familiar to Turkish users

## Key Terminology

| English | Turkish | Notes |
|---------|---------|-------|
| secret (noun) | gizli mesaj | Emphasizes message with confidential information |
| password | parola | Account login credential |
| passphrase | parola | Same as password in Turkish context |
| burn | yak | Strong metaphor for permanent deletion |
| message | mesaj | Standard term |
| confidential | gizli | Private/secret |
| expiring | sona erecek | Coming to an end |
| orphaned | sahipsiz | Without an owner |
| securing | güvenli hale getiriliyor | Being made secure |

## Translation Goals

The primary goal was to create a translation that:
- Feels natural to Turkish speakers
- Precisely conveys technical concepts
- Maintains security focus of the Onetime Secret application
- Uses consistent terminology for key concepts like "secret messages," "burning," and "security features" throughout the interface

Special attention was given to maintaining the security-focused terminology in ways that would be familiar to Turkish users while ensuring the interface remains accessible and professional.
