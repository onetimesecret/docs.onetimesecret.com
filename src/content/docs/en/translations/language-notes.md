---
title: English Translation Notes
description: Translation guidelines and terminology for English (en) locale
---

# English (en) Translation Notes

## Core Terminology

### Secret (noun)
- **Usage:** The confidential information being shared
- **Context:** Emphasize the functional, technical nature
- **Avoid:** Personal or emotional connotations
- **Examples:**
  - ✓ "Create a secret" (clear, functional)
  - ✓ "Share secrets securely" (professional context)
  - ✗ "Share your secrets" (too personal/intimate)

### Password vs Passphrase
**CRITICAL DISTINCTION:** These terms must never be confused.

- **Password:** Account authentication credential
  - Used for: Logging into Onetime Secret account
  - Examples: "Enter your password", "Forgot password?"

- **Passphrase:** Secret protection mechanism
  - Used for: Protecting individual secrets with an additional layer of security
  - Examples: "Protect with a passphrase", "Enter the passphrase to view this secret"

- **Why this matters:** Users must clearly understand the difference between their account credentials and optional secret protection

### Burn (verb)
- **Meaning:** Permanently delete before viewing
- **Usage:** Metaphor for irrevocable destruction
- **Examples:**
  - ✓ "Burn this secret" (button action)
  - ✓ "Secret was burned" (past status)

## Voice and Tone

### Active vs Passive Voice

**Actions (buttons, links):**
Use active, imperative voice for user actions:
- ✓ "Create Secret" (imperative)
- ✓ "Copy to Clipboard" (imperative)
- ✓ "Delete Account" (imperative)
- ✗ "Creating Secret" (progressive - use for status instead)

**Status (notifications, descriptions):**
Use passive or declarative voice for informational text:
- ✓ "Secret created" (passive)
- ✓ "Copied to clipboard" (passive)
- ✓ "Account deleted" (passive)
- ✗ "Create secret" (imperative - confusing in status context)

### Brand Voice
- **Authentic and transparent:** Use clear, honest language
- **Patient and focused:** Provide helpful explanations without overwhelming
- **Efficient without sacrificing quality:** Be concise but complete
- **Professional yet approachable:** Balance formality with warmth

## Writing Style

### Clarity and Conciseness
- Use clear, direct language that respects users' time
- Avoid jargon unless necessary for technical accuracy
- Write for users with varying technical backgrounds
- Remove unnecessary exclamation marks in UI

**Examples:**
- ✓ "Copy link" (concise, clear)
- ✗ "Copy the link to your clipboard!" (verbose, unnecessary exclamation)

### Punctuation
- Standard English punctuation rules
- No space before punctuation marks (unlike French)
- Use colons for labels: "Password:"
- Avoid contractions in formal UI text

### User Address
- Use second person ("you/your") for direct engagement
- Be conversational but professional
- Address users respectfully

## Critical Translation Rules

| Rule | Correct | Incorrect | Example |
|------|---------|-----------|---------|
| Password vs Passphrase | password (account), passphrase (secret protection) | Using "password" for both | ✓ "Enter your password" (login); ✓ "Protect with a passphrase" (secret) |
| Active vs Passive Voice | Active (buttons/actions), Passive (status/notifications) | Mixed forms | ✓ "Delete" (button); ✓ "Deleted" (status) |
| Secret Context | Functional, technical | Personal, emotional | ✓ "Share a secret securely"; ✗ "Tell us your secrets" |
| Exclamation Marks | Minimal use, only for warnings | Overuse in UI | ✓ "Copied"; ✗ "Copied!" |
| Colonel Role | Administrator or Account Owner | Literal "colonel" | ✓ "Only administrators can..."; ✗ "Only colonels can..." |

## Numbers and Formatting

### Dates
- Format: MM/DD/YYYY (US standard) or YYYY-MM-DD (ISO 8601)
- Example: "11/17/2025" or "2025-11-17"

### Time
- Use 12-hour format with AM/PM for general audience
- Use 24-hour format for technical/API contexts
- Example: "2:30 PM" (general) or "14:30" (technical)

### Numbers
- Decimal separator: period (.)
- Thousands separator: comma (,)
- Example: "1,234.56"

### Currency
- Symbol: $
- Position: Before amount
- Example: "$19.99"

## Accessibility Considerations

### Screen Readers
- Use descriptive labels for navigation
- Example: "Main navigation" not just "Main"
- Ensure alt text is descriptive and concise

### Clarity
- Write in plain language
- Define technical terms when first used
- Use consistent terminology throughout

## Common Mistakes to Avoid

1. **Confusing password and passphrase**
   - ✗ "Enter passphrase to log in" (should be "password")
   - ✗ "Protect with a password" when referring to secrets (should be "passphrase")

2. **Mixing voice in UI**
   - ✗ Using "Creating..." on a button (should be "Create")
   - ✗ Using "Delete" in a status message (should be "Deleted")

3. **Over-explaining in UI**
   - ✗ "Click this button to copy the link to your clipboard"
   - ✓ "Copy link"

4. **Inconsistent terminology**
   - Choose one term and stick with it throughout
   - Example: "burnt" vs "burned" - choose one

## Technical Terms

### Keep Unchanged
- API
- URL
- DNS
- SSL/TLS
- HTTP/HTTPS
- JSON
- YAML
- OAuth

### Use Standard Terms
- Dashboard (not "control panel")
- Settings (not "preferences" or "options")
- Clipboard (not "paste buffer")

## Reference

For comprehensive insights across all languages, see:
- [Language-Specific Translation Insights](/docs/localization/reference/language-specific-notes.md)

This serves as the reference implementation for all other language translations.
