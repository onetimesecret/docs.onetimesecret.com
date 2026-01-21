---
title: Swedish Translation Notes
description: Translation guidelines and terminology for Swedish (sv-SE) locale
---

# Swedish (sv-SE) Translation Notes

## Translation Goals

The Swedish translation aims to:
- Maintain consistency across all application interfaces
- Use clear, natural phrasing for Swedish-speaking audiences
- Follow technical accuracy for security-related terminology
- Apply appropriate voice and tone for different contexts
- Provide clarity while maintaining professional tone

## Rationale for Adjustments

The primary goal was to align the existing Swedish text more closely with the specific terminology and tone guidelines. This involved:

1. **Distinguishing `password` and `passphrase`:** Ensuring "lösenord" is used strictly for account login and a distinct term like "lösenfras" is used for secret protection
2. **Clarifying `secret`:** Translating `secret` as "hemlighet" or "meddelande" depending on context, emphasizing the confidential *information* being shared rather than a personal secret
3. **Improving Clarity and Natural Flow:** Refining phrasing to sound more natural in Swedish and ensuring clarity, especially for potentially less technical users (recipients)
4. **Applying Voice Guidelines:** Adjusting verbs in UI elements to the imperative mood ("Skapa", "Spara") and using declarative/passive voice for informational text ("Hemlighet skapad", "Sparad")
5. **Consistency:** Ensuring terms like "burn" ("bränn"), "view" ("visa"), "share" ("dela"), etc., were used consistently throughout

## Important Examples of Adjustments

### `secret` Translation

While often kept as **"hemlighet"**, context determines the best choice:
- In `created_success` ("Hemlighet skapad!"), it reinforces the idea of the *item* created
- In `your_secret_message` ("Ditt hemliga meddelande:"), **"meddelande"** clarifies it's a message being viewed

### `password` vs. `passphrase` Distinction

**Critical terminology distinction maintained:**
- `field_password`: **"Lösenord"** (Correctly used for account login)
- `secret_passphrase`: **"Lösenfras"** (Correctly used for secret protection)
- `incorrect_passphrase`: **"Felaktig lösenfras"** (Adjusted for consistency)
- `enter_passphrase_here`: **"Ange lösenfrasen här"** (Adjusted for consistency)

### `burn` Translation

Consistently translated as **"bränn"**:
- `burn_this_secret`: **"Bränn denna hemlighet"**

### UI Actions vs. Status

**Imperative mood for actions, declarative for status:**
- `button_create_secret`: **"Skapa hemlig länk"** (Imperative action)
- `STATUS.created`: **"Skapad"** (Declarative status)
- `LABELS.save`: **"Spara"** (Imperative action)
- `LABELS.saved`: **"Sparad"** (Declarative status)

### Clarity Improvements

- `secret_hint` (homepage): **"* En länk som bara kan användas en gång och sedan försvinner för alltid."** (Simplified for clarity)
- `why_use_description` (about): Phrasing adjusted slightly for better flow in Swedish while retaining the core meaning

## Summary of Changes to the Swedish (Sweden) Translation

The translation was updated to ensure strict adherence to the distinction between:
- **"lösenord"** (account password)
- **"lösenfras"** (secret passphrase)

The term **"hemlighet"** was generally used for `secret`, but **"meddelande"** was employed where it improved clarity regarding the shared information.

### Voice and Grammar
- Verbs adjusted to use imperative mood for actions/buttons
- Declarative/passive mood for statuses/notifications

### Natural Flow and Consistency
- Minor phrasing adjustments made throughout for improved natural flow
- Clarity and consistency following the project's style guide
- Untranslatable brand names preserved

## Key Terminology

| English | Swedish | Context |
|---------|---------|---------|
| secret (noun) | hemlighet / meddelande | Context-dependent; "meddelande" for clarity about the message |
| password | lösenord | Account login credential only |
| passphrase | lösenfras | Secret protection mechanism |
| burn | bränn | Permanent deletion metaphor |
| create | skapa | Imperative form for buttons |
| created | skapad | Past participle for status |
| save | spara | Imperative form for buttons |
| saved | sparad | Past participle for status |
| view | visa | Display/show content |
| share | dela | Share/distribute |

## Voice and Tone

### Direct Address

Use informal "du" form consistently when addressing users:
- `Ange ditt lösenord` (Enter your password)
- `Ditt hemliga meddelande` (Your secret message)
- `Du visar...` (You are viewing...)

Swedish naturally flows with direct "du" address in most contexts.

### Imperative Voice (for Actions)

Use imperative voice for buttons, links, and user actions:
- `Skapa hemlig länk` (Create secret link)
- `Kopiera till urklipp` (Copy to clipboard)
- `Skapa konto` (Create account)
- `Spara` (Save)
- `Bränn denna hemlighet` (Burn this secret)

### Passive/Declarative Voice (for Information)

Use passive or declarative voice for informational text, status messages, and descriptions:
- `Hemlighet skapad!` (Secret created!)
- `Din hemliga länk visas nedan.` (Your secret link is shown below.)
- `Hemligheten förstördes manuellt...` (The secret was manually destroyed...)
- `Sparad` (Saved - status message)

## Common Translation Patterns

### User Instructions

Use imperative forms:
- `Ange ditt lösenord` (Enter your password)
- `Kopiera till urklipp` (Copy to clipboard)
- `Ange lösenfrasen här` (Enter the passphrase here)

### Status Descriptions

Use passive voice or past participles:
- `Kopierad till urklipp` (Copied to clipboard)
- `Hemlighet skapad` (Secret created)
- `Sparad` (Saved)

### Help Text and Descriptions

Use declarative sentences in 2nd person informal:
- `Du visar det hemliga innehållet` (You are viewing the secret content)
- `Detta innehåll visas endast en gång` (This content is shown only once)

### Error Messages

Use clear, direct language:
- `Felaktig lösenfras` (Incorrect passphrase)
- `Ett fel har uppstått` (An error has occurred)

## Special Considerations

### The Term "Secret"

Fundamental to the application - translate as `hemlighet` or `meddelande` depending on context:
- `hemlighet` emphasizes the confidential item/concept
- `meddelande` clarifies it's a message when context requires

Examples:
- `Hemlighet skapad!` (Secret created! - the item)
- `Ditt hemliga meddelande:` (Your secret message: - the content)

### The Term "Burn"

Consistently translated as **`bränn`** (verb) / **`bränd`** (past participle):
- Conveys the permanent, irreversible nature of deletion
- Metaphor works well in Swedish

Examples:
- `Bränn denna hemlighet` (Burn this secret - button)
- `Hemligheten är bränd` (The secret is burned - status)

### Technical Security Terms

Prioritize accuracy over casual localization. Use established Swedish technical vocabulary:
- `krypterad` (encrypted)
- `kryptera` (to encrypt)
- `verifiering` (verification)
- `autentisering` (authentication)
