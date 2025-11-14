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

- **`passphrase` (Secret Protection):** Should refer only to the protection applied to an individual secret/message
  - Polish translation: **`Fraza dostępowa`** (Access Phrase)
  - Implies a potentially longer phrase used for access, distinct from a typical account password

- **`secret` (The Content):** Should be translated as the confidential *information* or *message* being shared, not a personal secret
  - Original: `Sekret` (too literal)
  - Updated: **`Wiadomość`** (Message) or **`Poufna wiadomość`** (Confidential message)
  - Better reflects the nature of the shared item

#### 2. Clarity and Context

Some original translations, while technically correct, could be clearer or more natural in the context of the application. Referring to the shared item as a "message" (`Wiadomość`) is often more intuitive for users than "secret" (`Sekret`).

#### 3. Consistency

Ensuring that terms like `passphrase`, `secret`, and related actions (`create secret`, `view secret`) were translated consistently throughout the file using the newly established terminology.

## Important Examples of Changes

### 1. `passphrase` related keys

- `web.COMMON.secret_passphrase`: Changed from `Hasło` to `Fraza dostępowa`
- `web.COMMON.secret_passphrase_hint`: Changed from `Trudne do odgadnięcia słowo lub fraza` to `Trudne do odgadnięcia słowo lub fraza chroniąca wiadomość` (to clarify its purpose)
- `web.COMMON.incorrect_passphrase`: Changed from `Nieprawidłowe hasło` to `Nieprawidłowa fraza dostępowa`
- `web.COMMON.enter_passphrase_here`: Changed from `Wprowadź hasło tutaj` to `Wprowadź frazę dostępową tutaj`
- `web.secrets.enterPassphrase`: Changed from `Enter Passphrase` (English) to `Wprowadź frazę dostępową`
- `web.private.requires_passphrase`: Changed from `Wymaga hasła.` to `Wymaga frazy dostępowej.`
- `web.shared.requires_passphrase`: Changed from `Ta wiadomość wymaga podania hasła:` to `Ta wiadomość wymaga podania frazy dostępowej:`
- `web.LABELS.passphrase_protected`: Changed from `Protected with passphrase` (English) to `Chronione frazą dostępową`
- `web.LABELS.no_passphrase`: Changed from `No Passphrase Required` (English) to `Fraza dostępowa nie jest wymagana`

### 2. `secret` related keys

- `web.COMMON.secret`: Changed from `Sekret` to `Wiadomość`
- `web.COMMON.button_create_secret`: Changed from `Utwórz tajne łącze` to `Utwórz link do wiadomości`
- `web.COMMON.view_secret`: Changed from `Pokaż poufną wiadomość` to `Wyświetl wiadomość`
- `web.COMMON.share_a_secret`: Changed from `Udostępnij poufną wiadomość` to `Udostępnij wiadomość`
- `web.LABELS.secret_link`: Changed from `Secret Link` (English) to `Link do wiadomości`
- `web.LABELS.create_new_secret`: Changed from `Create New Secret` (English) to `Utwórz nową wiadomość`
- `web.LABELS.secret_status`: Changed from `Secret Status` (English) to `Status wiadomości`
- Many status descriptions under `web.STATUS` were updated from referring to `secret link` to `link do wiadomości`

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

- **Clarified `secret`:** Changed `Sekret` to `Wiadomość` (Message) or similar context-dependent terms to emphasize the shared content rather than a personal secret

- **Ensured Consistency:** Applied the new terminology consistently across related keys (buttons, labels, feedback messages, hints)

- **Translated Remaining English:** Provided Polish translations for all previously untranslated English strings

- **Minor Refinements:** Adjusted phrasing for clarity and natural Polish expression within the context of the application and guidelines

These changes ensure that Polish users can clearly distinguish between different types of credentials and understand the nature of the content they're sharing through Onetime Secret.
