# General Translation Guidelines

Core principles extracted from translation work across multiple languages.

## Brand Voice Principles

### Core Values
- **Authenticity and transparency**
- **Patient and focused**
- **Efficient without sacrificing quality**
- **Professional but accessible**

### Communication Guidelines
- Adapt tone to user expertise (beginner to security professional)
- Balance friendliness with reliability
- Prioritize clarity over casual language
- Provide pleasant experiences through thoughtful interactions

## Voice and Grammar

### Active vs. Passive Voice

**Use active/imperative voice for:**
- Buttons and action elements
- User instructions
- Menu items
- Calls to action

Examples:
- ✅ "Create secret" / "Delete file" / "Copy link"
- ✅ "Sign in" / "Save changes" / "Generate password"

**Use passive/declarative voice for:**
- Status messages
- System notifications
- Informational content
- Error descriptions

Examples:
- ✅ "Secret created" / "File deleted" / "Link copied"
- ✅ "Changes saved" / "Password generated" / "Connection lost"

### Direct Address
- Generally use second person (you/your) to address users
- Avoid first person (my/I) as it can create confusion about who is speaking
- Choose appropriate formality level for your language and audience

## Terminology Standards

### Brand Terms (Never Translate)
- Onetime Secret
- OTS (when used as product abbreviation)
- Identity Plus
- Global Elite
- Custom Install

### Technical Terms
- Maintain consistency for security concepts
- Prioritize accuracy over literal translation
- Use established technical terminology where available

### Key Concepts to Handle Carefully
- **"secret"** - See [terminology/secret-concept.md](../terminology/secret-concept.md)
- **"password" vs "passphrase"** - See [terminology/password-passphrase.md](../terminology/password-passphrase.md)
- **"colonel"** - Always translate as "administrator"
- **"burn"** - Emphasize permanent deletion aspect

## Punctuation and Style

### Standard Practices
- Use commas, periods, and question marks appropriately
- Avoid exclamation marks unless specifically warranted
- Avoid contractions in interface text
- Avoid semicolons in user-facing content

### Sentence Structure
- Sentence fragments are acceptable for labels and buttons
- Use complete sentences for descriptions and help text
- Break long information into multiple sentences when needed

## Cultural Adaptation

### General Approach
- Natural language flow over literal translation
- Respect local conventions for:
  - Date and time formats
  - Number formatting
  - Currency symbols
  - Address formats

### Tone Considerations
- Professional yet approachable
- Clear and direct
- Respectful of user's time
- Appropriate for business context

## Quality Checks

Before finalizing translations, verify:

1. **Consistency**
   - Same term always translated the same way
   - Voice patterns followed throughout

2. **Clarity**
   - Instructions are unambiguous
   - Technical concepts are accessible

3. **Cultural Appropriateness**
   - Tone matches expectations for your language
   - No unintended implications or offense

4. **Functionality**
   - Text fits in UI elements
   - Maintains all placeholders and formatting

## Common Patterns

### Forms and Input
- Use imperative for field labels ("Enter password")
- Use declarative for validation messages ("Password required")
- Use passive for success states ("Password updated")

### Navigation and Menus
- Use clear, descriptive labels
- Maintain parallel structure within menus
- Consider reading order and hierarchy

### Error Handling
- Be helpful and specific
- Avoid technical jargon unless necessary
- Provide clear next steps when possible

## When in Doubt

1. **Check existing translations** in your language's directory
2. **Consult core terminology** in [glossary/core-terms.json](../glossary/core-terms.json)
3. **Review similar software** in your language for conventions
4. **Test with native speakers** in your target audience
5. **Prioritize user understanding** over translation perfection

Remember: The goal is effective communication, not perfect linguistic fidelity.
