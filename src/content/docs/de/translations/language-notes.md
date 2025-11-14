---
title: Deutsch
description: Kritische Regeln für die deutsche Übersetzung
---

# Deutsch

| Regel | Korrekt | Inkorrekt | Beispiel |
|-------|---------|-----------|---------|
| Secret Übersetzung | Nachricht (UI-Elemente), Geheimnis (technische Dokumentation) | Mixed usage | ✓ Sie haben 3 neue Nachrichten (UI); ✗ Sie haben 3 neue Geheimnisse (UI) |
| Aktiv vs. Passiv | Aktiv (Schaltflächen/Aktionen), Passiv (Status/Benachrichtigungen) | Mixed forms | ✓ Änderungen speichern (button); ✗ Änderungen speichern (status) |
| Förmliche Anrede | Sie (immer) | du/ihr | ✓ Sie können Ihr Geheimnis erstellen; ✗ Du kannst dein Geheimnis erstellen |
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
