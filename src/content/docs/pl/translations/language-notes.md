---
title: Polish Translation Notes
description: Translation guidelines and terminology for Polish (pl) locale
---

# Polish (pl) Translation Notes

## Core Reasoning

The primary driver for Polish translation adjustments was strict adherence to the translation guidelines, particularly concerning critical terminology.

### Critical Terminology Distinctions

#### 1. `secret` vs. `password` vs. `passphrase` Distinction

This was the most critical guideline. The original Polish translation often used the word `Hasło` (Password) for both the *account password* and the *secret's passphrase*. The guidelines explicitly forbid this, requiring distinct terms.

**Key Terms:**
- **`password` (Account):** Should refer only to the user account login credential
  - Polish translation: **`Hasło`** (appropriate for account passwords)

- **`passphrase` (Secret Protection):** Should refer only to the protection applied to an individual secret
  - Polish translation: **`Fraza dostępowa`** (Access Phrase)
  - Implies a potentially longer phrase used for access, distinct from a typical account password

- **`secret` (The Content):** Should be translated as confidential information being shared
  - Polish translation: **`Sekret`** (Secret)
  - This maintains the security and confidentiality context essential to the application
  - Unlike Danish "Hemmeligheder", Polish "Sekret" is appropriate across all contexts, from "sekret państwowy" (state secret) to casual usage, without childish or trivial connotations

#### 2. Clarity and Context

Some original translations, while technically correct, needed adjustment to maintain proper security context. Using "Sekret" (Secret) is essential to communicate the confidential and security-focused nature of the information being shared, which is a core principle of the application.

#### 3. Consistency

Ensuring that terms like `passphrase`, `secret`, and related actions (`create secret`, `view secret`) were translated consistently throughout the file using the newly established terminology.

## Important Examples of Changes

### 1. `passphrase` related keys

- `web.COMMON.secret_passphrase`: Changed from `Hasło` to `Fraza dostępowa`
- `web.COMMON.secret_passphrase_hint`: Changed from `Trudne do odgadnięcia słowo lub fraza` to `Trudne do odgadnięcia słowo lub fraza chroniąca sekret` (to clarify its purpose)
- `web.COMMON.incorrect_passphrase`: Changed from `Nieprawidłowe hasło` to `Nieprawidłowa fraza dostępowa`
- `web.COMMON.enter_passphrase_here`: Changed from `Wprowadź hasło tutaj` to `Wprowadź frazę dostępową tutaj`
- `web.secrets.enterPassphrase`: Changed from `Enter Passphrase` (English) to `Wprowadź frazę dostępową`
- `web.private.requires_passphrase`: Changed from `Wymaga hasła.` to `Wymaga frazy dostępowej.`
- `web.shared.requires_passphrase`: Changed from `Ten sekret wymaga podania hasła:` to `Ten sekret wymaga podania frazy dostępowej:`
- `web.LABELS.passphrase_protected`: Changed from `Protected with passphrase` (English) to `Chronione frazą dostępową`
- `web.LABELS.no_passphrase`: Changed from `No Passphrase Required` (English) to `Fraza dostępowa nie jest wymagana`

### 2. `secret` related keys

- `web.COMMON.secret`: Translated to `Sekret`
- `web.COMMON.button_create_secret`: Translated to `Utwórz sekret`
- `web.COMMON.view_secret`: Translated to `Wyświetl sekret`
- `web.COMMON.share_a_secret`: Translated to `Udostępnij sekret`
- `web.LABELS.secret_link`: Translated to `Link do sekretu` or `Tajny link`
- `web.LABELS.create_new_secret`: Translated to `Utwórz nowy sekret`
- `web.LABELS.secret_status`: Translated to `Status sekretu`
- Status descriptions under `web.STATUS` refer to `sekret` and `link do sekretu` consistently

### 3. `password` (Account) related keys

These generally remained `Hasło`, as this aligns with the guideline for account credentials:
- `web.COMMON.password_placeholder`
- `web.COMMON.field_password`
- `web.account.changePassword.currentPassword`

### 4. Other Minor Adjustments

- Translated remaining English strings
- Ensured consistency in tone and voice (e.g., using imperative for button labels)
- Adjusted pluralization for `UNITS` based on Polish grammar rules

## Summary of Changes to the Polish Translation

- **Implemented Critical Terminology:** Differentiated between account `password` (`Hasło`) and secret `passphrase` (`Fraza dostępowa`)

- **Maintained Security Context for `secret`:** Used `Sekret` (Secret) throughout to maintain the confidential and security-focused nature of the information being shared. Polish "Sekret" is appropriate across all contexts and does not carry problematic connotations.

- **Ensured Consistency:** Applied the terminology consistently across related keys (buttons, labels, feedback messages, hints)

- **Translated Remaining English:** Provided Polish translations for all previously untranslated English strings

- **Minor Refinements:** Adjusted phrasing for clarity and natural Polish expression within the context of the application and guidelines

These changes ensure that Polish users can clearly distinguish between different types of credentials (account password vs. secret passphrase) and understand the confidential nature of the content they're sharing through Onetime Secret.
