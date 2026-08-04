---
title: Japanese Translation Notes
description: Translation guidelines and terminology for Japanese (ja) locale
---

# Japanese (ja) Translation Notes

## Key Terminology

### "Secret" Translation
- **Choice:** "シークレット" (shīkuretto)
- **Rationale:** Creates a clear technical term for shared confidential information
- **Avoided:** "秘密" (himitsu) which has connotations of "personal secrets"

### "Burn" Translation
- **Choice:** "削除" (sakujo) - "delete/remove"
- **Rationale:** Better communicates permanent deletion concept than literal "burn" (燃やす/moyasu)
- **Avoided:** Literal translations that don't convey technical meaning well

### Passphrase vs Password Distinction
- **Password:** "パスワード" (pasuwaado) - for account login
- **Passphrase:** "パスフレーズ" (pasufureizu) - for protecting individual secrets
- **Rationale:** Critical distinction for user understanding of security mechanisms

## Important Translation Examples

### 1. Security Terminology
```
"burn_this_secret": "このシークレットを削除"
```
Changed from literal "burn" to "delete" for clarity in Japanese context

### 2. Technical Clarity
```
"secret_was_truncated": "メッセージが切り詰められました"
```
Used "message was truncated" rather than "secret was truncated" for natural Japanese expression

### 3. Cultural Adaptation
```
"careful_only_see_once": "注意: これは一度しか表示されません。"
```
Added Japanese warning marker "注意:" to emphasize importance in culturally appropriate way

### 4. Consistent Terminology
```
"view_secret": "シークレットを表示"
```
Consistently used "シークレット" rather than mixing with "秘密"

### 5. Security Section Completion
```
"security-policy": "セキュリティポリシー"
```
Completed previously truncated security section with proper translations

## Summary of Changes to Japanese Translation

### 1. Terminology Standardization
- Established consistent translations for key terms (secret, password, passphrase)
- Created clear distinctions between technical concepts
- Aligned technical terms with existing translations

### 2. Cultural Adaptation
- Adjusted phrasing to sound more natural in Japanese
- Used Japanese-style warnings and notifications where appropriate
- Applied imperative form for action buttons
- Used passive form for status messages

### 3. Technical Accuracy
- Ensured security concepts were accurately conveyed
- Maintained all placeholders ({0}, {count}, etc.) for dynamic content
- Preserved formatting and special characters

### 4. Structural Improvements
- Fixed JSON structure issues
- Completed previously incomplete translations
- Ensured consistency across all sections

### 5. Clarity Enhancements
- Replaced literal translations with functionally equivalent Japanese terms
- Prioritized user understanding over word-for-word translation
- Used proper honorifics and politeness levels

### 6. Voice and Tone Adjustments
- Applied imperative form for action buttons and controls
- Used passive form for status messages and system notifications
- Maintained professional yet approachable tone throughout
- Used proper particles and sentence endings (です/ます)

## Translation Principles

1. **Consistency with existing terminology** - Matched terms already translated elsewhere
2. **Natural language flow** - Prioritized natural-sounding Japanese over literal translations
3. **Voice and tone adaptation** - Used appropriate active/imperative voice for UI actions and passive/declarative voice for status messages
4. **Technical precision** - Maintained accurate translations for security terms
5. **Cultural appropriateness** - Adapted expressions to fit Japanese communication norms

These changes collectively improve the Japanese user experience by providing translations that are linguistically accurate, technically precise, and culturally appropriate.
