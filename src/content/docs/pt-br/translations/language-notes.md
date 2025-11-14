# Portuguese (Brazil, pt-BR) Translation Notes

## Translation Goals

The primary goal was to ensure the translation aligns precisely with the guidelines, focusing on:

1. **Consistency and Clarity of Core Concepts:** Ensuring terms like `secret` and `passphrase` are translated consistently and accurately according to their specific meanings within the Onetime Secret platform
2. **Brand Voice and Tone:** Refining the language to be professional, clear, and efficient, while remaining approachable
3. **Grammar and Style:** Applying rules regarding active/imperative voice for actions (buttons) and passive/declarative voice for informational text (status messages or descriptions)
4. **Natural Language:** Selecting translations that sound natural in Brazilian Portuguese, rather than overly literal translations from English

## Important Translation Examples

### 1. `secret` Translation

**Guideline:** Translate `secret` as the confidential information/message, not personal secrets.

**Changes:** Keys like `create-a-secret`, `recent-secrets-count`, `hide-secret-message`, `view-secret-message`, `secret-content`, `secrets-details-counts-secret_count` were updated.

**Reasoning:** The previous translations might have used "segredo," which could imply a personal secret. The updated translations consistently use variations like **"mensagem confidencial"** (confidential message) or **"conteúdo confidencial"** (confidential content) to more accurately reflect the nature of the shared item.

**Examples:**
- `create-a-secret`: "Criar um Segredo" → **"Criar Mensagem Confidencial"**
- `secret-content`: "Conteúdo secreto" → **"Conteúdo confidencial"**

### 2. `passphrase` Translation

**Guideline:** Distinguish clearly between account `password` and secret `passphrase`. Use a term implying a phrase-based security measure for the latter.

**Change:** Keys like `enter-a-passphrase` and the new `Double check that passphrase` use **"frase secreta"**.

**Reasoning:** To avoid ambiguity with the account `password` (typically "senha"), the distinct term **"frase secreta"** (secret phrase) was consistently applied for protecting individual secrets, directly following the guideline.

**Examples:**
- `enter-a-passphrase`: Potentially ambiguous term → **"Insira uma frase secreta"**

### 3. Clarity and Conciseness

**Guideline:** Prioritize clarity, avoid redundancy.

**Changes:**
- `e-g-example`: Changed from "p. ex. exemplo" to **"ex."**
  - Reasoning: "ex." is the standard and more concise abbreviation for "for example" in Portuguese, making the UI cleaner

- `docs`: Changed from "Documentos" to **"Documentação"**
  - Reasoning: "Documentação" is the more common and precise term for technical documentation in this context

### 4. Voice Consistency (Imperative for Actions)

**Guideline:** Use active, imperative voice for user actions (buttons, etc.).

**Changes:** `hide-secret-message` and `view-secret-message` verbs were refined.

**Reasoning:** Ensured the verbs used (**"Ocultar"**, **"Visualizar"**) are clear commands appropriate for button labels, alongside the updated term for `secret`.

## Summary of Changes to the Portuguese (Brazil) Translation

The Portuguese (Brazil) translation was updated to align more closely with the specific terminology and style guidelines. Key changes involved:

### Standardizing `secret`
Consistently translating `secret` as **"mensagem confidencial"** or **"conteúdo confidencial"** to emphasize the nature of the shared information rather than personal secrets.

### Clarifying `passphrase`
Using the distinct term **"frase secreta"** for secret protection to differentiate it clearly from the account `password` (**"senha"**).

### Improving Clarity and Conciseness
Refining phrasing for better natural language flow and using standard abbreviations (e.g., **"ex."** for "e.g.").

### Ensuring Voice Consistency
Applying imperative verbs for user actions (buttons) and declarative/passive voice for informational text where appropriate.

These adjustments aim to enhance the accuracy, consistency, and clarity of the user interface for Brazilian Portuguese speakers using Onetime Secret.

## Key Terminology

| English | Portuguese (Brazil) | Notes |
|---------|-------------------|-------|
| secret (noun) | mensagem confidencial / conteúdo confidencial | Emphasizes the information being shared |
| password | senha | Account login credential only |
| passphrase | frase secreta | Secret protection mechanism |
| burn | queimar | Permanent deletion metaphor |
| view | visualizar | Imperative form for buttons |
| hide | ocultar | Imperative form for buttons |
| documentation | documentação | Technical documentation |
