# Italian (it) Translation Notes

## Thinking Behind Translation Adjustments

### 1. Terminology Shift: Moving Away from "Segreto"

**Reasoning:** The style guide's Danish example shows that literal translations of "secret" can carry unintended connotations. In Italian, "segreto" implies personal, hidden, or confidential information with emotional weight.

**Key Examples:**
- `"secretLinks": "Link Segreti"` → `"Link Monouso"`
- `"createSecrets": "Crea Segreti"` → `"Crea Messaggio"`
- `"retrieveSecrets": "Recupera Segreti"` → `"Recupera Messaggio"`
- `"whyUseSecretLinks": "Perché Usare Link Segreti"` → `"Perché Usare Link Monouso"`

**Alternative considered:** "Link Temporanei" (temporary links) - also functionally accurate but "monouso" (single-use) better captures the core product feature.

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

## Summary of Changes to the Italian Translation

### Core Terminology Changes
- **"Segreto" → Functional alternatives**: Replaced "secret" with "messaggio" (message) or "monouso" (single-use) to avoid personal/hidden connotations
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
