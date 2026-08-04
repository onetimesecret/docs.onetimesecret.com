---
title: Vietnamese Translation Notes
description: Translation guidelines for Vietnamese locale
---

# Vietnamese (vi) Translation Notes

## Core Terminology

**Secret:** bí mật - Appropriate for professional contexts

**Password vs Passphrase:**
- Password: mật khẩu - for account authentication
- Passphrase: cụm mật khẩu - for secret protection (cụm = phrase/cluster)

**Burn:** xóa vĩnh viễn (delete permanently) - more natural in digital Vietnamese context than literal translation

## Key Points

- Analytic language: no inflection, no conjugation
- Tonal system: 6 tones essential for meaning
- Vietnamese script with diacritics (ă, â, ê, ô, ơ, ư + tones)
- No grammatical gender or plural forms
- Tense markers: đã (past), sẽ (future), đang (progressive)
- Use "bạn" for neutral, respectful formality
- Syllable spacing must be maintained

## Vietnamese Language Specifics

### Analytic Language Structure

- Vietnamese is an analytic language with no inflection or conjugation
- Words do not change form based on tense, number, or gender
- Grammatical relationships expressed through word order and particles
- No verb conjugation: "tôi tạo" (I create), "chúng tôi tạo" (we create)

### Tonal System

Vietnamese has 6 tones that are essential for meaning:
- level (no mark), sharp/rising (sắc), falling (huyền), tumbling (hỏi), broken rising (ngã), heavy (nặng)

Incorrect tones completely change meaning:
- ma (ghost), má (mother), mà (but), mả (tomb), mã (code), mạ (rice seedling)

All tone marks must be preserved accurately.

### Vietnamese Script and Diacritics

- Uses Latin alphabet with additional diacritics
- Vowel modifications: ă, â, ê, ô, ơ, ư
- Tone marks: ́ (sắc), ̀ (huyền), ̉ (hỏi), ̃ (ngã), ̣ (nặng)
- Both vowel and tone diacritics can appear on same letter: ế, ồ, ữ
- Never omit diacritics - they are essential to meaning

### No Grammatical Gender or Plural

- Vietnamese has no grammatical gender
- No plural forms for most nouns (unless emphasis needed)
- Same word form for singular and plural: ngày (day/days), giờ (hour/hours)
- Quantity expressed through numbers or quantifiers: 3 ngày (3 days)

### Tense Markers

Tense indicated by markers, not verb changes:
- đã - past tense marker
- sẽ - future tense marker
- đang - progressive aspect marker

Examples:
- đã tạo (created/have created)
- sẽ tạo (will create)
- đang tạo (is/are creating)

### Word Order

- Subject-Verb-Object (SVO) like English
- Adjectives and modifiers typically follow nouns

Examples:
- bí mật (secret - noun)
- thông tin bí mật (secret information - adjective follows)

### Syllable Spacing

- Vietnamese words can be monosyllabic or multisyllabic
- Compound words written with spaces between syllables

Examples:
- mã hóa (encryption - two syllables, space between)
- bảo mật (security - two syllables, space between)
- tài khoản (account - two syllables, space between)

Never write without spaces like German compounds.

## Common Translation Patterns

### User Instructions
Use imperative verbs without subject (understood "bạn")

### Status Descriptions
Use past tense markers (đã) for completed states

### Help Text and Descriptions
Use declarative sentences with neutral tone

### Error Messages
Use clear, direct language with respectful tone

## Special Considerations

### Tones Cannot Be Omitted

- Vietnamese tones are not optional
- Omitting tones makes text unreadable or changes meaning completely
- Always include all tone marks: á, à, ả, ã, ạ
- Example of importance:
  - ma (ghost), má (mother), mà (but), mả (tomb), mã (code), mạ (rice seedling)

### Diacritics Are Essential

- All Vietnamese diacritics must be preserved
- Both vowel modifications (ă, â, ê, ô, ơ, ư) and tone marks
- Never substitute with unaccented letters
- Example: hoa (flower) vs hoà (harmony) vs hòa (peace/blend)

### No Plural Forms Needed

- Unlike English, Vietnamese doesn't mark plurals on nouns
- Use same form for singular and plural
- Context and numbers indicate quantity

Examples:
- 1 ngày (1 day)
- 5 ngày (5 days) - NOT "5 ngàys"

### Tense Markers Placement

- Place tense markers before main verb
- đã, sẽ, đang come before the verb they modify

Examples:
- Bí mật đã được tạo (The secret has been created)
- Liên kết sẽ hết hạn (The link will expire)

### UI Element Conventions

- Follow platform conventions for Vietnamese interfaces
- Use standard Vietnamese terminology for common UI elements
- Maintain consistency with other Vietnamese applications
- Use "bạn" for respectful but friendly address

### Technical Security Terms

Prioritize accuracy over casual localization. Use established Vietnamese technical vocabulary:
- `mã hóa` (encryption)
- `đã mã hóa` (encrypted)
- `xác minh` (verification)
- `xác thực` (authentication)

### Simplicity of Vietnamese Grammar

- No verb conjugation (simplifies translation)
- No grammatical gender (simplifies agreement)
- No plural marking (simplifies noun forms)
- Main complexity is in tonal system and diacritics
