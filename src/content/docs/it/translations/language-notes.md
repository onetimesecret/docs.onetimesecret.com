---
title: Italian Translation Notes
description: Translation guidelines and terminology for Italian (it) locale
---

# Italian (it) Translation Notes

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

## Summary of Italian Translation Standards

### Core Terminology Standards
- **"Segreto" maintained**: "Secret" translated as "segreto" to preserve confidentiality context, aligning with guide requirements
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
