---
title: Deutsch
description: Kritische Regeln für die deutsche Übersetzung
---

# Deutsch

## Translation Choices for German Locale

### Key Terminology

### 1. `secret` → `Nachricht` (UI) / `Geheimnis` (technical documentation)

**Choice:** Context-specific translation:
- **UI elements and direct user communication:** `Nachricht` (message)
- **Technical documentation and security descriptions:** `Geheimnis` (secret)

**Rationale:**

The word "secret" can be translated to German as either "Geheimnis" or "Nachricht", with important nuances:

**Prefer "Nachricht" for UI contexts:**
- **"Nachricht"** (neutral meaning) should be preferred when referring to Onetime Secret generated content in the user interface
- While "Geheimnis" is the literal translation of "Secret", it carries strong connotations of something personal or intimate in German, which doesn't match the intended neutral, technical meaning
- **Examples:**
  - ✅ "Sie haben 3 neue Nachrichten" (neutral, technical - You have 3 new secrets)
  - ❌ "Sie haben 3 neue Geheimnisse" (sounds too personal/intimate)

**"Geheimnis" acceptable in technical contexts:**
- In technical descriptions and documentation, "Geheimnis" can be used (e.g., "Ende-zu-Ende-Verschlüsselung schützt Ihre Geheimnisse" - End-to-end encryption protects your secrets)
- For UI and direct user address, "Nachricht" is often the more natural choice

**Regional Differences:**
- **Deutschland (de_DE)**: "Nachricht" preferred as neutral term for UI
- **Österreich (de_AT)**: Same usage as Germany
- **Schweiz (de_CH)**: Identical in written German; dialectal variations exist only in spoken language

**Distinction from `de_AT`:** Usage is expected to be identical in Austrian German.

### 2. `password` → `Passwort`

**Choice:** The term `password`, referring specifically to account login credentials, was translated as `Passwort`.

**Rationale:** `Passwort` is the standard, universally understood term for website/account login credentials in German-speaking regions. The alternative `Kennwort` is sometimes seen but `Passwort` is dominant for digital contexts.

**Distinction from `de_AT`:** Usage is identical in Austrian German. `Passwort` is the standard term.

### 3. `passphrase` → `Passphrase`

**Choice:** The term `passphrase`, referring to the protection for an individual secret, was translated directly as `Passphrase`.

**Rationale:** This follows the guideline to maintain a clear distinction from the account `Passwort`. While `Passphrase` is an adopted English term, it is widely recognized in German technical and security contexts precisely for this distinct meaning (a potentially longer, phrase-based secret protector, different from a standard password).

**Distinction from `de_AT`:** Usage is expected to be very similar in Austrian German. `Passphrase` is understood and used in technical contexts across German-speaking areas, including Austria.

## Thinking Behind Changes & Important Examples

### 1. Consistency of Core Terms

**Rationale:** The initial file sometimes used English terms or less precise German words. The guidelines emphasize consistent terminology.

**Examples:**
- `web.COMMON.secret`: Changed from `Geheim` (adjective) to `Geheimnis` (noun)
- `web.COMMON.header_dashboard`: Changed from `Account` to `Konto`
- `web.COMMON.header_sign_in`: Changed from `Einloggen` to `Anmelden`
- `web.COMMON.burn`: Standardized to `Zerstören` (verb) / `Zerstört` (past participle/status)
- `web.COMMON.received`: Changed from `Erhalten` to `Empfangen`

### 2. Appropriate Voice (Imperative vs. Declarative/Passive)

**Rationale:** Guidelines specify imperative for user actions (buttons, links) and passive/declarative for informational text.

**Examples:**
- `web.help.learn_more`: `Mehr erfahren` (Imperative/infinitive for links)
- `web.COMMON.button_generate_secret_short`: `Passwort generieren` (Imperative action)
- `web.COMMON.share_link_securely`: `Teile diesen Link aus Sicherheitsgründen...` (Clear imperative)
- `web.help.secret_view_faq.*.description`: Declarative sentences (e.g., "Du siehst...", "Dieser Inhalt wird...")
- `web.STATUS.*_description`: Declarative/passive voice (e.g., "Geheimer Link wurde erstellt...")
- `web.shared.post_reveal_default`: `Deine sichere Nachricht wird unten angezeigt.` (Passive voice)

### 3. Clarity and Natural Phrasing

**Rationale:** Some existing translations were literal or slightly awkward. The aim was for natural-sounding German.

**Examples:**
- `web.COMMON.copied_to_clipboard`: `In die Zwischenablage kopiert`
- `web.COMMON.faq_title`: Changed from `F.A.Q.` to `Häufig gestellte Fragen`
- `web.LABELS.loading`: Changed from `Loading...` to `Lädt...`
- `web.login.remember_me`: `Angemeldet bleiben` (Standard phrase)
- `web.shared.viewed_own_secret`: Changed `angeschaut` to `angesehen`

### Voice Usage for Status Messages

**Rationale:** Guidelines specify imperative for user actions (buttons, links) and passive/declarative for informational text.

**Examples:**
- `web.STATUS.*_description`: Declarative/passive voice (e.g., "Geheimer Link wurde erstellt...")
- `web.shared.post_reveal_default`: `Deine sichere Nachricht wird unten angezeigt.` (Passive voice)

### Voice Usage for Actions

**Rationale:** Imperative for user actions (buttons, links).

**Examples:**
- `web.help.learn_more`: `Mehr erfahren` (Imperative/infinitive for links)
- `web.COMMON.button_generate_secret_short`: `Passwort generieren` (Imperative action)
- `web.COMMON.share_link_securely`: `Teile diesen Link aus Sicherheitsgründen...` (Clear imperative)
- `web.help.secret_view_faq.*.description`: Declarative sentences (e.g., "Du siehst...", "Dieser Inhalt wird...")

### 4. Direct Address (Du vs. Sie)

**Rationale:** The existing partial translations predominantly used the informal "Du". This was made consistent across user-facing instructions and questions.

**Examples:**
- `web.COMMON.careful_only_see_once`: Changed "Wir werden es..." to `Du wirst es...`
- `web.LABELS.need_help`: `Brauchst du Hilfe?`
- `web.homepage.cta_title`: Changed from formal "Verwenden Sie..." to informal `Verwende...`
- `web.login.login_to_your_account`: `Melde dich bei deinem Konto an`

### 5. Completeness

Many keys contained only English source text and were translated according to the guidelines (e.g., `web.help.*`, `web.FEATURES.*`, `web.UNITS.*`, `web.INSTRUCTION.*`, `web.meta.*`, `email.*`).

## Critical Translation Rules

| Regel | Korrekt | Inkorrekt | Beispiel |
|-------|---------|-----------|---------|
| Secret Übersetzung | Nachricht (UI-Elemente), Geheimnis (technische Dokumentation) | Mixed usage | ✓ Sie haben 3 neue Nachrichten (UI); ✗ Sie haben 3 neue Geheimnisse (UI) |
| Aktiv vs. Passiv | Aktiv (Schaltflächen/Aktionen), Passiv (Status/Benachrichtigungen) | Mixed forms | ✓ Änderungen speichern (button); ✗ Änderungen speichern (status) |
| Förmliche Anrede | du (informal - DE), Sie (formal - AT) | Mixing forms | ✓ Du kannst dein Geheimnis erstellen (DE); ✓ Sie können Ihr Geheimnis erstellen (AT) |
| Zahlenformat | Komma (Dezimal), Punkt (Tausender) | Englisches Format | ✓ 1.234,56; ✗ 1,234.56 |
| Colonel Rolle | Administrator | Wörtliche Übersetzung | ✓ Nur Administratoren haben Zugriff; ✗ Nur Colonels haben Zugriff |

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

**Examples:**
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

**Examples:**
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
- Maintain clear distinction between `Passwort` (account password) and `Passphrase` (secret protection)

### UI and Platform Conventions
- Follow platform conventions for the target language
- Ensure UI elements are clear and actionable
- Keep button text concise and in imperative form

### Related Guide Sections

- See "Brand Voice" for tone guidance
- See "Grammar and style guidelines" for voice usage
- See Glossary for specific term variations between DE and AT
