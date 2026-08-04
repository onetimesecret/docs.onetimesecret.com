---
title: Spanish Translation Notes
description: Translation guidelines and terminology for Spanish (es) locale
---

# Spanish (es) Translation Notes

## Overview

The Spanish translation aims to:
- Maintain consistency across all application interfaces
- Use clear, natural phrasing for Spanish-speaking audiences
- Follow technical accuracy for security-related terminology
- Apply appropriate voice and tone for different contexts
- Distinguish between neutral Spanish where possible while remaining accessible

## Thinking Behind Translation Adjustments

The goal was to ensure accuracy, consistency, natural phrasing for Spanish spoken broadly (aiming for neutrality where possible), and adherence to the provided translation guidelines.

### 1. Consistency of Core Terms

**Rationale:** The initial file had some inconsistencies or used terms that could be refined based on the guidelines, especially regarding `secret`, `password`, and `passphrase`.

**Examples:**
- **`secret`**: Consistently translated as `secreto` when referring to the confidential item being shared (e.g., `web.COMMON.secret`, `web.COMMON.button_create_secret`, `web.private.created_success`). This aligns with the guideline to emphasize the confidential *item*, distinguishing it from personal secrets. While `mensaje` (message) could be used, `secreto` retains the core concept of confidentiality inherent in the platform's name and function.

- **`password`**: Consistently translated as `contraseña` when referring to the *account login* credential (e.g., `web.COMMON.password_placeholder`, `web.login.button_sign_in`, `web.account.changePassword.currentPassword`). This is the standard term in Spanish for account passwords.

- **`passphrase`**: Consistently translated as `frase de contraseña` when referring to the protection for an *individual secret* (e.g., `web.COMMON.secret_passphrase`, `web.COMMON.incorrect_passphrase`, `web.secrets.enterPassphrase`). This compound term clearly distinguishes it from the account `contraseña` and follows the guideline to use a term implying a phrase-based security measure.

- `web.COMMON.header_dashboard`: Changed from `Cuenta` (Account) to `Panel` (Dashboard) for better accuracy, although `Cuenta` was retained elsewhere when referring to the user account itself.

- `web.COMMON.header_sign_in`: Changed from `Ingresar` to `Iniciar sesión` (a very common term for logging in).

- `web.COMMON.burn`, `web.COMMON.burned`, `web.STATUS.burned`, `web.STATUS.destroyed`: Standardized to `Destruir` (verb) / `Destruido` (past participle/status) as per the guideline for "burn".

### 2. Appropriate Voice (Imperative vs. Declarative/Passive)

**Rationale:** Guidelines specify imperative for user actions (buttons, links) and passive/declarative for informational text (status, descriptions, help).

**Examples:**
- `web.help.learn_more`: Translated as `Más información` (Common infinitive/noun phrase for links)
- `web.COMMON.button_generate_secret_short`: Translated as `Generar Contraseña` (Imperative/Infinitive action)
- `web.help.secret_view_faq.*.description`: Descriptions translated using declarative sentences (e.g., "Estás viendo...", "Este contenido se muestra...")
- `web.STATUS.*_description`: Status descriptions translated using declarative/passive voice (e.g., "El enlace secreto ha sido creado...", "El secreto fue destruido manualmente...")
- `web.shared.post_reveal_default`: Translated as `Tu mensaje seguro se muestra a continuación.` (Passive voice)

### 3. Clarity and Natural Phrasing

**Rationale:** Some existing translations were literal or could be improved for natural flow in Spanish.

**Examples:**
- `web.COMMON.copied_to_clipboard`, `web.LABELS.copy_to_clipboard`: Changed to the standard Spanish phrase `Copiado al portapapeles` / `Copiar al portapapeles`
- `web.COMMON.faq_title`: Changed from `F.A.Q.` to `Preguntas Frecuentes` (Clearer, full phrase)
- `web.LABELS.loading`: Changed from `Loading...` to `Cargando...` (Standard)
- `web.login.remember_me`: Changed from "Remember me" to `Recuérdame` (Standard phrase for this function)
- `web.private.requires_passphrase`: Corrected from "Requiere una frase de contraseña." to "Requiere una frase de contraseña:" for consistency in context (often followed by an input field)

### 4. Direct Address (Tú vs. Usted)

**Rationale:** Spanish requires choosing between the informal "tú" and the formal "usted". The translations aimed for consistency, generally using the informal "tú" form (e.g., "Introduce tu contraseña", "Tu mensaje seguro"), which was used more consistently than initially thought, likely matching a pre-existing informal tone. The goal was consistency with the chosen form.

**Examples:**
Most user-facing instructions and descriptions use forms implying "tú":
- `web.help.secret_view_faq.*.description` uses "Estás viendo..." (2nd person singular informal 'tú')
- Many other descriptions use 3rd person passive like "Se notificará..." which avoids direct address choice
- Imperatives like "Introduce..." can map to either form but were used consistently

### 5. Completeness

**Rationale:** Many keys contained only the English source text. These were translated according to the guidelines.

**Examples:** `web.help.*`, `web.FEATURES.*`, `web.UNITS.*`, `web.INSTRUCTION.*`, `web.meta.*`, `email.*`, and many others throughout the file.

## Summary of Changes to the Spanish (`es`) Translation

- **Terminology:** Standardized key terms like `secreto`, `contraseña`, `frase de contraseña`, `Panel`, `Iniciar sesión`, `Destruir` for consistency and guideline adherence

- **Voice:** Consistently applied imperative voice for actions and passive/declarative voice for informational text and descriptions

- **Phrasing:** Improved clarity and naturalness using standard Spanish expressions (e.g., `Copiar al portapapeles`, `Preguntas Frecuentes`, `Recuérdame`)

- **Direct Address:** Ensured consistent use of the chosen direct address form (primarily informal "tú") when addressing the user

- **Completeness:** Translated numerous previously untranslated English strings across the entire file

- **Corrections:** Addressed minor grammatical issues, inconsistencies (e.g., trailing punctuation), and suboptimal word choices from the initial file

The translations aim for clarity and adherence to standard Spanish usage in technical contexts, while respecting the specific distinctions required by the translation guidelines, particularly between `contraseña` (for accounts) and `frase de contraseña` (for secrets).

## Common Translation Patterns

### User Instructions
Use imperative or infinitive forms:
- `Introduce tu contraseña` (Enter your password)
- `Copiar al portapapeles` (Copy to clipboard)

### Status Descriptions
Use passive voice or past participles:
- `Copiado al portapapeles` (Copied to clipboard)
- `El secreto ha sido creado` (The secret has been created)

### Help Text and Descriptions
Use declarative sentences in 2nd person informal:
- `Estás viendo el contenido secreto` (You are viewing the secret content)
- `Este contenido se muestra solo una vez` (This content is shown only once)

### Error Messages
Use clear, direct language:
- `Frase de contraseña incorrecta` (Incorrect passphrase)
- `Ha ocurrido un error` (An error has occurred)

## Special Considerations

### The Term "Secret"
- Fundamental to the application - translate consistently as `secreto`
- Emphasizes the confidential nature of the shared item
- Distinguishes from personal secrets or confidential information in general

### Password vs. Passphrase
Critical distinction:
- **`contraseña`** - for user account login credentials
- **`frase de contraseña`** - for protecting individual secrets

This distinction must be maintained throughout the application to avoid confusion.

### UI Element Conventions
- Follow platform conventions for the target language
- Use standard Spanish terminology for common UI elements
- Maintain consistency with other Spanish applications

### Technical Security Terms
- Prioritize accuracy over casual localization
- Use established Spanish technical vocabulary
- Examples:
  - `cifrado` (encrypted)
  - `cifrar` (to encrypt)
  - `verificación` (verification)
  - `autenticación` (authentication)

## Summary of Translation Principles

The Spanish translation maintains:

1. **Terminology Consistency** - Standardized key terms throughout the application
2. **Appropriate Voice** - Imperative for actions, passive/declarative for information
3. **Natural Phrasing** - Standard Spanish expressions and idioms
4. **Consistent Address** - Informal "tú" form when addressing users
5. **Complete Coverage** - All user-facing strings translated
6. **Technical Accuracy** - Precise terminology for security concepts
7. **Clear Distinctions** - Especially between account passwords and secret passphrases
