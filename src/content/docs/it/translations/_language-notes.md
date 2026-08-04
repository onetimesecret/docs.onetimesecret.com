---
title: Italian Translation Notes
description: Translation guidelines and terminology for Italian (it) locale
---

# Italian (it) Translation Notes

## Core Terminology

**Secret:** segreto - Central to the brand; conveys confidential information appropriately in Italian

**Password vs Passphrase:**
- Password: password - for user account login on the Onetime Secret platform
- Passphrase: frase di sicurezza - for protecting individual secrets (NOT for account login)

**Burn:** distruggere/bruciare (delete secret before viewing)

## Key Points

- Use natural Italian phrasing while maintaining technical precision
- Professional yet approachable tone
- Prefer concise button text and UI labels
- Remove exclamation marks from UI text
- Use standard Italian (italiano standard), not regional dialects

## Thinking Behind Translation Adjustments

### 1. Terminology Decision: Using "Segreto" Correctly

**Reasoning:** The translation guide emphasizes that "secret" is central to the brand and should be translated to maintain the context of confidentiality. Unlike the Danish example where "hemmeligheder" carried problematic personal/hidden connotations, Italian "segreto" appropriately conveys confidential information without those issues.

**Core Principle from Guide:**
> "secret (n.) - The confidential information being shared. Translations must maintain the context of confidentiality. Preferred over terms like 'message' or 'content'."

**Correct Italian Usage:**
- `"secretLinks"` → `"Link Segreti"` (maintains confidentiality context)
- `"createSecrets"` → `"Crea Segreti"` (not "Crea Messaggio")
- `"retrieveSecrets"` → `"Recupera Segreti"` (not "Recupera Messaggio")
- `"secret"` → `"segreto"` (noun, maintaining confidentiality)

**Why "Segreto" Works for Italian:**
Unlike Danish "hemmeligheder" which implies deeply personal secrets, Italian "segreto" naturally encompasses:
- Confidential business information
- Professional secrets
- Protected data
- Secure communications

**Alternatives Rejected:**
- "Messaggio" (message) - too generic, loses security context
- "Monouso" (single-use) - describes the mechanism, not the content
- "Temporaneo" (temporary) - describes duration, not confidentiality

### 2. UI Text Simplification for Professional Tone

**Reasoning:** The guide emphasizes "efficient without sacrificing quality" and "clear, direct language that respects users' time."

**Key Examples:**
- `"gettingStarted": "Per Iniziare"` → `"Inizia"` (imperative voice for actions)
- `"page.editLink": "Modifica pagina"` → `"Modifica"` (concise button text)
- `"expressiveCode.copyButtonCopied": "Copiato!"` → `"Copiato"` (removed exclamation per guide)
- `"pagefind.load_more": "Carica altri risultati"` → `"Altri risultati"` (shorter, clearer)

### 3. Voice Consistency Based on Context

**Reasoning:** The guide specifies active/imperative voice for user actions, passive/declarative for status messages.

**Key Examples:**
- **Actions:** "Inizia" (Start), "Modifica" (Edit), "Copia" (Copy)
- **Status:** "Copiato" (Copied), "Ultimo aggiornamento" (Last updated)

### 4. Cultural Adaptation for Italian Users

**Reasoning:** Natural Italian phrasing while maintaining technical precision.

**Key Examples:**
- `"404.text"`: Removed redundant words, made more direct
- `"search.devWarning"`: Simplified technical explanation
- `"sidebarNav.accessibleLabel": "Main"` → `"Navigazione principale"` (more descriptive for screen readers)

## Translation Guidelines

### Core Translation Principles

1. **Authenticity**
   - Use natural Italian phrasing while maintaining technical precision
   - Avoid overly literal translations that sound awkward in Italian
   - Respect Italian grammatical conventions and sentence structure

2. **Efficiency**
   - Use clear, direct language that respects users' time
   - Prefer concise button text and UI labels
   - Remove unnecessary words without sacrificing clarity

3. **Consistency**
   - Use the same translation for a term throughout the application
   - Maintain the distinction between technical concepts (e.g., password vs. passphrase)
   - Follow established terminology standards

4. **Context Awareness**
   - Consider how terms are used in the application
   - Use imperative voice for actions, declarative for status messages
   - Adapt tone based on context (buttons vs. descriptions)

5. **Cultural Adaptation**
   - Adapt terms to Italian conventions when appropriate
   - Ensure accessibility labels are descriptive and clear
   - Maintain professional yet approachable tone

## Voice and Tone Guidelines

### Voice Consistency Based on Context

Use the appropriate voice based on the element type:

**Active/Imperative Voice** (for user actions):
- "Inizia" (Start)
- "Modifica" (Edit)
- "Copia" (Copy)
- "Crea" (Create)
- "Elimina" (Delete)

**Passive/Declarative Voice** (for status messages):
- "Copiato" (Copied)
- "Ultimo aggiornamento" (Last updated)
- "Creato" (Created)
- "Eliminato" (Deleted)

### Punctuation Guidelines
- Remove exclamation marks from UI text
- "Copiato!" → "Copiato" (no exclamation)
- Use periods sparingly in short UI text
- Full sentences in descriptions should have proper punctuation

## Italian-Specific Adaptations

### Cultural Considerations

1. **Professional Yet Approachable Tone**
   - Maintain warmth while being concise
   - Avoid overly formal language that creates distance
   - Use standard Italian, not regional dialects

2. **Technical Precision**
   - Preserve technical accuracy for security-related terms
   - Keep English terms when they're standard in Italian IT contexts (API, REST, DNS)
   - Translate user-facing features into natural Italian

3. **Accessibility**
   - Use descriptive labels for screen readers
   - "Main" → "Navigazione principale" (more descriptive)
   - Ensure ARIA labels are clear and functional

### Common UI Patterns

**Navigation:**
- Getting Started: "Inizia"
- Next: "Avanti"
- Back: "Indietro"
- Continue: "Continua"

**Forms:**
- Submit: "Invia"
- Cancel: "Annulla"
- Confirm: "Conferma"
- Reset: "Reimposta"

**Status Messages:**
- Success: "Operazione completata"
- Error: "Si è verificato un errore"
- Warning: "Attenzione"
- Info: "Informazione"

## Special Considerations

### The Term "Secret"
- Fundamental to the application - translate consistently as `segreto`
- Works perfectly in professional contexts in Italian
- Emphasizes the confidential nature of the shared item

### Password vs. Passphrase
Critical distinction that MUST be maintained:
- **`password`** - for user account login credentials
- **`frase di sicurezza`** - for protecting individual secrets

Examples:
- Account section: "Inserisci la tua **password** per accedere"
- Secrets section: "Questo segreto è protetto con una **frase di sicurezza**"

### Translation Best Practices

1. **Maintain Brand Identity**
   - Keep "Onetime Secret" untranslated
   - Preserve product names (Starlight, etc.)
   - Use consistent branding terminology

2. **Ensure Technical Accuracy**
   - Security terms must be precise
   - Maintain distinction between similar concepts
   - Verify technical terminology with Italian IT standards

3. **Respect Regional Variations**
   - Use standard Italian (italiano standard)
   - Avoid region-specific colloquialisms
   - When in doubt, use neutral terminology

4. **Test for Natural Flow**
   - Read translations aloud to check naturalness
   - Ensure sentence structure follows Italian grammar
   - Verify that translations fit UI space constraints

## Summary of Italian Translation Standards

### Core Terminology Standards
- **"Segreto" maintained**: "Secret" translated as "segreto" to preserve confidentiality context
- **Passphrase distinction**: "Passphrase" → "frase di sicurezza" (for secret protection), distinct from "password" (account authentication)
- **Maintained technical terms**: API, REST, v1, v2 kept unchanged
- **Brand names preserved**: Starlight, Onetime Secret untranslated

### UI/UX Text Refinements
- **Removed exclamation marks**: Following style guide punctuation rules
- **Shortened button text**: "Modifica pagina" → "Modifica" for efficiency
- **Simplified tooltips**: "Copia negli appunti" → "Copia" for clarity
- **Streamlined error messages**: More direct, less verbose

### Voice and Tone Adjustments
- **Imperative for actions**: "Inizia" instead of "Per Iniziare"
- **Declarative for status**: "Copiato" (status) vs "Copia" (action)
- **Professional yet approachable**: Maintained warmth while being concise

### Accessibility Improvements
- **More descriptive labels**: "Main" → "Navigazione principale"
- **Clearer terminology**: Consistent use of functional rather than metaphorical terms

These changes align the Italian translation with the guide's core principles: authenticity, efficiency, and clear communication that serves both technical professionals and general users.
