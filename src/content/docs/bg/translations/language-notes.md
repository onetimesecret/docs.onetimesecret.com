# Bulgarian (bg) Translation Notes

## Thinking Behind Translation Adjustments

The primary goal was to ensure consistency, clarity, and adherence to the translation guidelines, even for text that was already translated.

### 1. Standardizing "Passphrase"

**Guideline:** Maintain consistent translation of key terms like "password/passphrase".

**Observation:** The original file used multiple Bulgarian terms for "passphrase", including "фраза" (phrase), "тайна фраза" (secret phrase), and sometimes "парола" (password).

**Initial Approach:** An initial standardization used "парола" (password) in most user-facing instances, with "Парола за тайната" for the label specifically defining it. While "passphrase" implies potentially longer input, "парола" is the most common and widely understood term in Bulgarian software interfaces. Using a single, familiar term reduces confusion.

**Final Change:** After further review, the translation was updated to distinguish clearly between:
- **"парола" (password)** - for user authentication (account login credentials, password fields in registration forms)
- **"ключова фраза" (key phrase)** - for secret protection (secret creation/viewing, protection mechanism for shared secrets)

This distinction better serves users by making clear the different security contexts.

**Examples:**
- `web.COMMON.incorrect_passphrase`: "Грешна фраза" → "Грешна ключова фраза"
- `web.COMMON.error_passphrase`: "...тайната фраза..." → "...ключовата фраза..."
- `web.private.requires_passphrase`: "Изисква фраза." → "Изисква ключова фраза."
- `web.LABELS.passphrase_protected`: "Protected with passphrase" → "Защитено с ключова фраза"

### 2. Refining "Secret" Translation

**Guideline:** Translate "secret" as confidential information being shared, not personal secrets.

**Observation:** The original file mostly used "секрет" (a direct loanword often implying personal/state secrets) or "тайна" (secret). "Съобщение" (message) was used occasionally.

**Change:** Primarily shifted from "секрет" to "тайна". "Тайна" feels more natural and appropriate in Bulgarian for the concept of confidential information being shared ephemerally.

**Examples:**
- `web.help.secret_view_faq.can_i_view_again.description`: "...този секрет..." → "...тази тайна..."
- `web.help.secret_view_faq.how_to_copy.description`: "...целия секрет." → "...цялата тайна."
- `web.private.created_success`: "Secret created successfully!" → "Тайната е създадена успешно!"
- `information-no-longer-available`: "Този секрет..." → "Тази тайна..."

### 3. Improving Clarity and Natural Phrasing

**Guideline:** Prioritize clarity over casual language; use natural-sounding translations.

**Observation:** Some phrases felt slightly awkward, overly literal, or used non-standard terms.

**Change:** Adjusted wording for better flow and precision in Bulgarian. Replaced vague terms with clearer ones like "изтрито" (deleted) and often added "перманентно" (permanently) for emphasis.

**Examples:**
- `web.COMMON.secret_placeholder`: "...отива тук..." → "...се въвежда тук..." (More natural for input placeholder)
- `web.help.secret_view_faq.can_i_view_again.description`: "...пълно отрязано..." → "...перманентно изтрито..." (Clearer meaning)
- `web.shared.secret_was_truncated`: Corrected typo "tuncated" and used "отрязана" (truncated), which is correct here
- `password-strength` levels: Adjusted English levels ("Great", "Meh") to more standard Bulgarian equivalents ("Отлична", "Задоволителна")

### 4. Ensuring Voice Consistency (Active/Passive)

**Guideline:** Use active, imperative voice for user actions (buttons) and passive/declarative for informational content (status messages).

**Examples:**
- `web.COMMON.button_create_secret`: "Създай тайна връзка" (Imperative - Correct)
- `web.private.created_success`: "Тайната е създадена успешно!" (Passive/Declarative - Correct)

## Summary of Changes to the Bulgarian Translation

### Terminology Distinction

1. **"парола" (password)** - Kept for user authentication contexts:
   - Account login credentials
   - Password fields in registration forms
   - Account-related password operations

2. **"ключова фраза" (key phrase)** - Introduced for secret protection contexts:
   - Secret creation and viewing
   - Protection mechanism for shared secrets
   - Error messages related to incorrect secret access credentials

### Key Changes by Section

1. **Common UI Elements**
   - Changed `secret_passphrase` from "Парола за тайната" to "Ключова фраза за тайната"
   - Updated `incorrect_passphrase` from "Грешна парола" to "Грешна ключова фраза"
   - Changed `enter_passphrase_here` from "Въведете паролата тук" to "Въведете ключовата фраза тук"

2. **Labels**
   - Changed `no_passphrase` from "Не се изисква парола" to "Не се изисква ключова фраза"
   - Updated `passphrase_protected` from "Защитено с парола" to "Защитено с ключова фраза"

3. **Private and Shared Sections**
   - Changed `requires_passphrase` from "Изисква парола" to "Изисква ключова фраза"
   - Updated `this_msg_is_encrypted` to reference "ключова фраза" instead of "парола"
   - Changed `passphrase-protection` from "Защита с парола" to "Защита с ключова фраза"

4. **FAQ Section**
   - Updated all references in the "trust_points" and "passphrase_points" sections
   - Changed `passphrase_title` from "Как работи опцията за парола?" to "Как работи опцията за ключова фраза?"

5. **Root Level Keys**
   - Updated `enter-a-passphrase` and `Double check that passphrase` to use "ключова фраза"

This consistent terminology distinction helps Bulgarian users better understand the different security contexts - regular account passwords versus the special protection mechanism (passphrase) used for securing shared secrets.
