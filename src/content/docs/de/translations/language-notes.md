---
title: Deutsch
description: Kritische Regeln für die deutsche Übersetzung
---

# Deutsch

## Translation Choices for German Locale

### Key Terminology

### 1. `secret` → `Geheimnis`

**Choice:** The term `secret` was consistently translated as `Geheimnis`.

**Rationale:** `Geheimnis` is the direct German equivalent of `secret`. While the guidelines suggest emphasizing "confidential information or message" (like the Danish "besked"), `Geheimnis` is commonly understood in German technical contexts to refer to sensitive data or credentials. Using `Nachricht` (message) might lose the implication of confidentiality, and longer phrases like `vertrauliche Information` are unsuitable for UI elements.

**Distinction from `de_AT`:** Usage is expected to be identical in Austrian German. `Geheimnis` is standard German and used similarly in Austria.

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

### Related Guide Sections

- See "Brand Voice" for tone guidance
- See "Grammar and style guidelines" for voice usage
- See Glossary for specific term variations between DE and AT
