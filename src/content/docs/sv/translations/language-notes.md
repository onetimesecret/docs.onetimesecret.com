# Swedish (sv-SE) Translation Notes

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
