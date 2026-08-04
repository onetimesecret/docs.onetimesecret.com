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

**Reasoning:** While "sır" is the literal Turkish translation of "secret", it carries strong connotations of personal, intimate, or hidden information in everyday Turkish usage. This doesn't align with the technical, neutral meaning intended by Onetime Secret.

**Precedent from Translation Guide:**
The English translation guide provides a Danish example that directly parallels our Turkish decision:

> **Danish Translation:**
> - CORRECT: **"Beskeder"** (messages)
> - INCORRECT: "Hemmeligheder" (secrets)
>
> Reasoning: While "Hemmeligheder" is a literal translation of "Secrets", it carries connotations of personal or hidden information in everyday Danish usage that don't match the intended meaning.

**Turkish follows the same pattern:**
- CORRECT: **"gizli mesaj"** (secret/confidential message)
- INCORRECT: "sır" (personal secret)

**Usage Examples:**
- ✅ "3 yeni gizli mesajınız var" (You have 3 new secret messages) - neutral, technical
- ❌ "3 yeni sırrınız var" (You have 3 new secrets) - sounds too personal/intimate

This choice emphasizes that the content is a message with confidential information rather than a deeply personal secret.

### 2. "Burn" Translation

**Choice:** Translated as **"yak"** (to burn) maintaining the metaphor from English.

**Reasoning:** Creates a strong mental image of permanent deletion rather than using more generic terms like "sil" (delete).

### 3. "Passphrase" vs "Password" (CRITICAL DISTINCTION)

Onetime Secret makes an important distinction between two security concepts that must be consistently maintained across all translations.

**Password (Account Authentication):**
- **Turkish:** "parola" or "şifre"
- **Context:** Used exclusively for logging into user accounts
- **Examples:** "Hesap parolası", "Giriş şifresi", "Parolayı sıfırla"

**Passphrase (Secret Protection):**
- **Turkish:** "güvenlik ifadesi" or "erişim ifadesi"
- **Context:** Used when creating or accessing protected secrets (not for account access)
- **Examples:** "Güvenlik ifadesi ile koru", "Görüntülemek için güvenlik ifadesini girin"

**Why This Matters:**
This distinction is critical for security clarity. Users need to understand that:
1. **Password** = credentials to access their Onetime Secret account
2. **Passphrase** = an optional extra layer of protection for individual secrets

**Precedent from Other Languages:**
- Bulgarian: "парола" (password) vs "ключова фраза" (key phrase)
- Danish: "adgangskode" (access code) vs "adgangssætning" (access sentence)
- Spanish: "contraseña" vs "frase de seguridad" (security phrase)

**Updated Choice:**
- **password** → **"parola"** or **"şifre"** (account login)
- **passphrase** → **"güvenlik ifadesi"** (secret protection)

### 4. Status Terms

Terms in the STATUS section were carefully translated to maintain their technical meaning while being natural in Turkish:

- "Expiring soon" → **"Yakında sona erecek"** (approaching its end soon)
- "Orphaned" → **"Sahipsiz"** (without an owner)
- "Securing" → **"Güvenli hale getiriliyor"** (being made secure)

### 5. Formal Address

**Choice:** Use formal "siz" form rather than informal "sen".

**Reasoning:** Maintains professional tone appropriate for a security-focused application. While some modern Turkish software uses "sen" to be friendly, Onetime Secret's brand values (authentic, professional yet approachable) are better served by the respectful "siz" form.

**Application Context:**
- Professional users (IT teams, corporate support teams)
- Diverse age range of recipients (18-80)
- Security-focused context requires trust and professionalism

## Brand Voice in Turkish

The Onetime Secret brand voice must be consistently maintained across the Turkish translation:

### Core Values
- **Authentic and transparent** (Özgün ve şeffaf) - Use clear, honest language
- **Patient and focused** (Sabırlı ve odaklı) - Provide helpful explanations without overwhelming users
- **Efficient without sacrificing quality** (Kaliteden ödün vermeden verimli) - Be concise but complete
- **Professional yet approachable** (Profesyonel ama ulaşılabilir) - Balance formality with warmth

### Communication Principles in Turkish
- Adapt technical detail based on user context
- Balance friendliness with reliability
- Prioritize clarity over casual language
- Use patient, helpful tone even when explaining complex concepts

### Turkish-Specific Considerations
- Avoid overly bureaucratic language while maintaining professionalism
- Use clear, direct sentences (Turkish can become verbose - resist this)
- Technical terms should remain consistent and clear
- Maintain warmth through respectful language, not informality

## UI Text: Active vs Passive Voice in Turkish

### Active, Imperative Voice ("Bir şey yap" - Do something)

**Buttons (Düğmeler):**
- ✓ Değişiklikleri kaydet (Save changes)
- ✓ Dosyayı sil (Delete file)
- ✓ Mesajı gönder (Send message)
- ✓ Gizli mesaj oluştur (Create secret)

**Menu items (Menü öğeleri):**
- ✓ Ayarları görüntüle (View settings)
- ✓ Yeni klasör oluştur (Create new folder)

### Passive or Declarative Voice ("Bir şey oldu" - Something happened)

**Status messages (Durum mesajları):**
- ✓ Değişiklikler kaydedildi (Changes saved)
- ✓ Dosya silindi (File deleted)
- ✓ Ödeme reddedildi (Payment declined)
- ✓ Gizli mesaj yakıldı (Secret burned)

**Notifications (Bildirimler):**
- ✓ 3 yeni mesaj (3 new messages)
- ✓ İndirme tamamlandı (Download complete)
- ✓ Sunucu kullanılamıyor (Server unavailable)

**System states (Sistem durumları):**
- ✓ Yükleme devam ediyor (Upload in progress)
- ✓ Bağlantı kesildi (Connection lost)
- ✓ E-posta adresi bulunamadı (Email address not found)

### Examples in Context

**Form submission:**
- Button (active): "Değişiklikleri kaydet"
- Status (passive): "Değişiklikler başarıyla kaydedildi"

**File upload:**
- Button: "Dosya yükle"
- Status: "Yükleme tamamlandı"

**Secret creation:**
- Button: "Gizli mesaj oluştur"
- Status: "Gizli mesaj oluşturuldu"

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

## Key Terminology Reference

### Core Concepts

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| secret (noun) | gizli mesaj | The confidential content being shared; emphasizes message vs personal secret |
| one-time | tek kullanımlık | Single-use nature of the service |
| burn (verb) | yakmak / yak | Strong metaphor for permanent deletion |
| link | bağlantı / link | URL that provides access to a secret |

### Security & Authentication

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| password | parola / şifre | **Account login credential only** |
| passphrase | güvenlik ifadesi | **Secret protection only** (NOT account login) |
| encryption | şifreleme | Process of encoding secrets |
| encrypted | şifrelenmiş | State of being encoded |
| secure | güvenli | State of protection |
| private | özel / gizli | Confidential |
| confidential | gizli | Private/secret information |

### User Interface Elements

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| share a secret | gizli mesaj paylaş | Main action |
| create account | hesap oluştur | Registration |
| sign in | giriş yap | Authentication |
| dashboard | kontrol paneli | User's main page |
| settings | ayarlar | Configuration page |
| feedback | geri bildirim | User comments |

### Status Terms

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| received | alındı | Secret has been viewed |
| burned | yakıldı | Secret was deleted before viewing |
| expired | süresi doldu | Secret no longer available due to time |
| created | oluşturuldu | Secret has been generated |
| active | aktif | Secret is available |
| inactive | pasif / etkin değil | Secret is not available |
| expiring soon | yakında sona erecek | Approaching expiration |
| orphaned | sahipsiz | Without an owner |
| securing | güvenli hale getiriliyor | Being made secure |

### Time-Related Terms

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| expires in | ... içinde sona erer | Time until unavailable |
| day/days | gün | Time unit |
| hour/hours | saat | Time unit |
| minute/minutes | dakika | Time unit |
| second/seconds | saniye | Time unit |

### Actions & Buttons

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| submit | gönder | Form submission (active voice) |
| cancel | iptal et | Negative action (active voice) |
| confirm | onayla | Positive action (active voice) |
| copy to clipboard | panoya kopyala | Utility action |
| continue | devam et | Navigation |
| back | geri | Navigation |
| save | kaydet | Preserve changes |
| delete | sil | Remove item |

### Account & Plans

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| account | hesap | User profile |
| email | e-posta | User identifier |
| subscription | abonelik | Paid service |
| plan | plan | Service tier |
| customer | müşteri | Paying user |
| colonel | yönetici / admin | Administrator role (highest privileges) |

### Error Messages

| English | Turkish | Context/Notes |
|---------|---------|---------------|
| error | hata | Problem notification |
| warning | uyarı | Caution notification |
| oops | Hata! / Hay aksi! | Friendly error intro |

## Translation Goals

The primary goal was to create a translation that:
- Feels natural to Turkish speakers
- Precisely conveys technical concepts
- Maintains security focus of the Onetime Secret application
- Uses consistent terminology for key concepts like "secret messages," "burning," and "security features" throughout the interface

Special attention was given to maintaining the security-focused terminology in ways that would be familiar to Turkish users while ensuring the interface remains accessible and professional.
