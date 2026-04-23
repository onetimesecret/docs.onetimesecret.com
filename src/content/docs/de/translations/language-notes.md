---
title: Deutsch
description: Kritische Regeln für die deutsche Übersetzung
---

# Deutsch

:::note[Reference baseline for de_AT]
Commit `f95b03f44`, `src/locales/de_AT.json` in the onetimesecret repo — last
human-curated snapshot with consistent Sie-form and the object/content split
pattern. Use this as the authoritative disambiguator for de_AT questions.
:::

## Translation Choices for German Locale

### Key Terminology

### 1. `secret` → `Geheimnis` (object) / `Nachricht` (revealed content)

**Rule (both — de and de_AT):** Translate `secret` based on whether the string
refers to the secret as a record/container or to its revealed payload.

- **`Geheimnis`** — the secret as an object: the record that is created,
  shared, viewed, burned, destroyed, or expired. Use with verbs such as
  `erstellen` (create), `teilen` (share), `ansehen` (view),
  `verbrennen`/`zerstören` (burn/destroy), `ablaufen` (expire).
- **`Nachricht`** — the revealed content/payload: post-reveal display, the
  decrypted body shown to the recipient, truncated previews,
  `encrypted_message`, and phrasing such as "your secure message is ready".

This split is taken from the 2025-04-15 human-curated de_AT baseline
(`f95b03f44`). It applies to both `de` and `de_AT` unless a specific
exception is documented below.

**Examples (both):**

- `Geheimnis erstellen` — Create a secret (object: action on the record)
- `Geheimnis teilen` — Share a secret (object)
- `Geheimnis ansehen` — View a secret (object)
- `Geheimnis verbrennen` / `Geheimnis zerstören` — Burn / destroy the record
- `Das Geheimnis ist abgelaufen` — The secret has expired (object)
- `Ihre sichere Nachricht wird unten angezeigt` (de_AT) /
  `Deine sichere Nachricht wird unten angezeigt` (de) — Post-reveal payload
- `Verschlüsselte Nachricht` — Encrypted message (payload)
- `Die Nachricht wurde gekürzt` — The message has been truncated (payload)

**Anti-pattern (both):** Do not use `Geheimnis` for the revealed payload
(it reads as "a personal secret" rather than "the message body"), and do
not use `Nachricht` for the record itself (it loses the container semantics
that the rest of the UI relies on).

### 2. `password` → `Passwort`

**Rule (both):** Translate `password` (account login credential) as
`Passwort`. `Passwort` is the dominant term for digital account credentials
in all German-speaking regions. `Kennwort` exists but is not used here.

### 3. `passphrase` → `Passphrase` (de) / `Sicherheitsphrase` (de_AT)

**Rule:** `passphrase` refers to the protection on an individual secret and
must remain lexically distinct from `Passwort`.

- **de:** `Passphrase` — the established anglicism in German technical
  contexts.
- **de_AT:** `Sicherheitsphrase` — the native compound used in the
  `f95b03f44` baseline. See glossary for the corresponding compound forms
  (e.g. `Schutz durch Sicherheitsphrase`).

## Critical Translation Rules

| Region | Regel | Korrekt | Inkorrekt |
|--------|-------|---------|-----------|
| both | secret as object | `Geheimnis erstellen`, `Geheimnis teilen`, `Geheimnis verbrennen` | `Nachricht erstellen` für die Datensatz-Aktion |
| both | secret as revealed payload | `Ihre sichere Nachricht wird unten angezeigt` | `Ihr sicheres Geheimnis wird unten angezeigt` |
| both | Aktiv vs. Passiv | Aktiv für Schaltflächen/Aktionen, Passiv für Status/Benachrichtigungen | Vermischte Formen innerhalb einer Kategorie |
| de | Förmliche Anrede | informell `du` | `Sie` |
| de_AT | Förmliche Anrede | formell `Sie`, `Ihr`, `Ihnen` | `du`, `dein` |
| both | Zahlenformat | `1.234,56` (Komma Dezimal, Punkt Tausender) | `1,234.56` |
| both | Rolle `Colonel` | `Administrator` | wörtliche Übersetzung |

## Regional Formality Considerations

### German Language Variants

The German language has two primary forms of address that significantly impact translation tone and style. Both Onetime Secret German translations (de and de_AT) maintain consistent approaches within their respective regions:

#### German (Germany) - de.json
**Address Form:** Informal "du" (second person singular informal)

**Characteristics:**
- Modern tech sector standard
- Approachable, friendly tone
- Common in startup and consumer-facing contexts
- Creates sense of partnership with users
- Used with lowercase "du", "dein", "dir", etc.

**Examples (de only — NOT for de_AT):**
- "Du siehst eine sichere Nachricht" (You see a secure message)
- "Gib dein Passwort ein" (Enter your password)
- "Teile diesen Link" (Share this link)

**When to use:**
- Consumer-facing applications
- Modern SaaS products
- Startup or tech-forward brands
- When emphasizing accessibility and approachability

#### German (Austria) - de_AT.json
**Address Form:** Formal "Sie" (second person formal)

**Characteristics:**
- Austrian business standard
- Professional, respectful tone
- Expected in B2B and enterprise contexts
- Maintains appropriate professional distance
- Used with capitalized "Sie", "Ihr", "Ihnen", etc.

**Examples (de_AT only):**
- "Sie betrachten eine sichere Nachricht" (You view a secure message)
- "Geben Sie Ihr Passwort ein" (Enter your password)
- "Teilen Sie diesen Link" (Share this link)

**When to use:**
- Austrian market (regardless of company size)
- B2B/enterprise products
- Government or institutional contexts
- When emphasizing professionalism and trust

### Implementation Guidelines

1. **Consistency Within Locale:**
   - Never mix "du" and "Sie" within a single locale file
   - Maintain chosen formality throughout all user-facing text
   - Apply consistently to buttons, messages, instructions, and help text

2. **Grammar Implications:**
   - "Du" uses second person singular verb forms
   - "Sie" uses third person plural verb forms (even for one person)
   - Possessive pronouns differ: "dein" (du) vs "Ihr" (Sie)
   - Imperative forms differ: "gib" (du) vs "geben Sie" (Sie)

3. **When Unsure:**
   - For Austrian translations: default to "Sie"
   - For German translations: consider target audience
   - Consumer product → "du" likely appropriate
   - B2B product → consider "Sie" for broader appeal

### Translation Pairs Examples

Common phrases showing both approaches:

| Context | German (DE) - du | German (AT) - Sie |
|---------|------------------|-------------------|
| Error message | "Du hast nichts zum Teilen angegeben" | "Sie haben keine Informationen zur Verfügung gestellt" |
| Instruction | "Klicke auf die Schaltfläche" | "Klicken Sie auf die Schaltfläche" |
| Confirmation | "Bist du sicher?" | "Sind Sie sicher?" |
| Success | "Dein Geheimnis wurde erstellt" | "Ihr Geheimnis wurde erstellt" |
| Help text | "Du findest diese in deiner E-Mail" | "Sie finden diese in Ihrer E-Mail" |

### Other German Regional Variations

Beyond formality, note these additional regional differences:

| Concept | German (DE) | German (AT) | Notes |
|---------|-------------|-------------|-------|
| Email example | tom@myspace.com | kontakt@musterfirma.gv.at | .gv.at = Austrian government |
| Passphrase | Passphrase | Sicherheitsphrase | Anglicism vs native compound |
| Submit | senden | einreichen | Informal vs formal term |
| Domain | Domain | Bereich | Technical vs general |

### Testing Formality Choices

Before finalizing translations:

1. **Native Speaker Review:** Have native speakers from target region review
2. **Context Check:** Ensure formality matches brand positioning
3. **Consistency Audit:** Verify no formality mixing within locale
4. **Competitor Benchmark:** Check how similar products address users in target market

## Translation Guidelines

### Voice and Formality
- **Imperative for Actions**: Use imperative voice for buttons and user actions
- **Passive for Status**: Use passive/declarative voice for informational text and status messages
- **Consistent Address Form**: Never mix "du" and "Sie" within the same locale
- **Regional Consistency**: Maintain formality appropriate to the target region (DE vs AT)

### Number Formatting
- Use comma for decimal separator: `1.234,56`
- Use period for thousands separator
- Never use English number formatting

### Technical Terms
- Prioritize accuracy over localization for security terms
- Use established German technical terminology
- Maintain clear distinction between `Passwort` (account password) and `Passphrase` / `Sicherheitsphrase` (secret protection)

### UI and Platform Conventions
- Follow platform conventions for the target language
- Ensure UI elements are clear and actionable
- Keep button text concise and in imperative form

### Related Guide Sections

- See "Brand Voice" for tone guidance
- See "Grammar and style guidelines" for voice usage
- See Glossary for specific term variations between DE and AT
