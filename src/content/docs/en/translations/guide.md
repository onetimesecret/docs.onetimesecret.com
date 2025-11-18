---
title: Translation style guide
description: A comprehensive guide for translators working on Onetime Secret localization, covering brand voice, terminology standards, and language-specific requirements to ensure high-quality and consistent translations
---

## Translation Style Guide English, Canada (en-CA)

![Translation Style Guide](/socialcards/onetime-socialcard-20250226-1.png)

This style guide provides instruction for translating to the Canadian English locale.

| *This Style Guide is based on content from [Mozilla L10N Styleguides](https://github.com/mozilla-l10n/styleguides/) by Mozilla Contributors, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*  |
|  |

## Target Audience

Our English-speaking audience includes:

### Customers

- Professional background: IT professionals, agency teams (design, development, marketing), and corporate support teams (HR, provisioning, logistics, finance)
- Audience: Professionals ages 20-60 with some tech proficiency. These individuals have chosen or work for a company that has chosen to incorporate Onetime Secret into their workflow.
- Location: North America, UK, Ireland, New Zealand, Australia, Netherlands, Germany
- Writing approach: Use clear, accessible language with professional tone

### Recipients

- Audience: Diverse age range (18-80) including students, seniors, parents, clients, coworkers. These individuals may have never heard of Onetime Secret and generally have less context around how it works/
- Writing approach: Clear, accessible language with an empathetic tone


**Translation Note:** These audience descriptions provide context about how the product is used by different groups and should inform translation tone and style. They are not intended to define or limit how we view our customers.

## Brand Voice

About the brand voice and tone.

### Core Values

- Authentic and transparent

- Patient and focused

- Efficient without sacrificing quality

- Professional yet approachable

### Communication Principles

- Adapt tone to match user expertise, from beginners to security professionals

- Balance friendliness with reliability

- Prioritize clarity over casual language

- Provide delightful experiences through thoughtful interactions

### Writing Guidelines

- Use clear, direct language that respects users' time

- Maintain a helpful, patient tone even when explaining complex concepts

- Write with warmth while keeping focus on the task

- Scale technical detail based on user context

- Casual language should not be used at the expense of clarity, regardless of the context.

## Language preferences

*Guidance: This involves determining language-specific preferences, such as spelling variations, punctuation rules, and date and time formats, which resonate with your target audience. — Remember, adhering closely to your audience's language preferences can significantly reduce barriers to communication and enhance their experience with the brand.*

- Use American English. However for date formats use yyyy-mm-dd and times use 24h. Distances in km, weights in lbs.
- Translations should sound as natural as possible. Borrowed words should never be used (with the exception of branded names).
- Our english speaking audience is 50% english as a first language and 50% as a second/third/professional language. We need to keep this in mind when choosing terms and phrases to avoid inappropriate or confusing translations.

## Grammar and style guidelines

*Guidance: Pinpoint rules for grammar, style, and punctuation to maintain consistency throughout all your translated content.*

- Use oxford commas, periods, and question marks. Avoid exclamations, contractions, and semi-colons.
- Use active, imperative voice where users take action. Use passive or declarative voice when informing users.
- Sentence fragments are ok on their own. Otherwise full sentences with proper business grammar.
- Divide lengthy information into multiple sentences, if needed.
- In general, use the second person (`you`) to address the user.
- Avoid using the first person (`my`, `I`) as it can create confusion about who is being addressed.

### UI Text: When to Use Active vs Passive Voice

#### Active, Imperative Voice ("Do something")

Buttons
✓ Save changes
✓ Delete file
✓ Send message

Menu items
✓ View settings
✓ Create new folder

#### Passive or Declarative Voice ("Something happened")

Status messages
✓ Changes saved
✓ File deleted
✓ Payment declined

Notifications
✓ 3 new messages
✓ Download complete
✓ Server unavailable

System states
✓ Upload in progress
✓ Connection lost
✓ Email address not found

#### Examples in Context

Form submission
✓ Save changes (button->active)
✓ Changes saved successfully (status->passive)

File upload
✓ Upload file (button)
✓ Upload complete (status)


## Terminology consistency

*Create a glossary of key terms, along with their approved translations, to ensure consistent usage across all content.*

### Brand Terms (Do Not Translate)

- Onetime Secret
- OTS (when used as product abbreviation)
- Identity Plus (product name)
- Global Elite (product name)
- Custom Install (product name)

### About the Brand Name

In "Onetime Secret", "Onetime" functions as a compound adjective (also called a attributive adjective) that modifies the noun "Secret". It describes a key characteristic of the secret - that it can only be accessed once. Note the spelling choice. There are actually three common variants of this term:

- "one-time" (hyphenated)
- "one time" (two words)
- "onetime" (compound)

The hyphenated form "one-time" is considered the standard spelling when the term functions as an adjective before a noun, as in "one-time password" or "one-time code". This follows the general English rule that compound modifiers before nouns are often hyphenated.

The compound form is the canonical spelling for the brand and company name: Onetime Secret.

### Core Concepts

#### Secret Management

- **secret** (n.) - The confidential information being shared
    - Translations must maintain the context of confidentiality
    - Preferred over terms like "message" or "content"
    - Example: "Create a new secret" not "Create a new message"
- **one-time** (adj.) - Describing the single-use nature of the service
    - Must emphasize the temporary, single-use aspect
    - Hyphenated when used as adjective
    - Example: "This is a one-time secret" not "This is a single secret"
- **Onetime** (compound adj.) - Part of the brand name Onetime Secret.
    - Must not be used on its own; always paired with "Secret"
    - Example: "Onetime Secret"
- **burn** (v.) - The act of destroying a secret before it's viewed
    - Technical term for destruction of a secret message
    - Translations should maintain the permanence implied
    - Example: "The secret was burned and no longer available"

#### Security Terms

- **encryption** (n.) - The process of encoding secrets
    - Technical term that should remain consistent
    - Distinguish from "encoding" or "hashing"
    - Example: "All secrets use end-to-end encryption"
- **rate limiting** (n.) - System to prevent abuse
    - Technical term for request restriction
    - Keep hyphenation in English
    - Example: "Rate limiting prevents abuse"
- **secure**
- **private**
- **password / passphrase**
- **expiration / expiry / time-to-live**

### Translating Key Terms

#### Translating the word "secret"

The word "secret" is central to our brand, product, and communication strategy. We protect secrets. We also provide a secret service.

The word secret can take a number of meanings with subtle but important differences. Our canonical example comes from an update to our Danish translation by [jetdk](https://github.com/onetimesecret/onetimesecret/pull/956#issue-2782747525):

##### Word Choice: "Beskeder" vs "Hemmeligheder"

CORRECT:   **Beskeder** (messages)
INCORRECT: Hemmeligheder (secrets)

The term "Beskeder" should be used when referring to a secret (e.g. a secret message or secret link that is generated by Onetime Secret). While "Hemmeligheder" is a literal translation of "Secrets", it carries connotations of personal or hidden information in everyday Danish usage that don't match the intended meaning.

Example usage:

✅ Du har 3 nye beskeder (You have 3 new messages)
❌ Du har 3 nye hemmeligheder (You have 3 new secrets)

#### When to Apply the "Message" Exception

The Danish exception (using "message" instead of "secret") should ONLY be applied when ALL of the following conditions are met:

1. **The literal translation of "secret" carries inappropriate connotations** in the target language
2. **These connotations specifically undermine the professional/security context**, such as:
   - Personal or private secrets (gossip, hidden information)
   - Childish or trivial usage
   - Meanings that sound unprofessional in a business context
3. **Native speakers confirm the security framing is lost** when using the literal translation

**Examples:**

✅ **Danish "Hemmeligheder"** - Has childish/personal connotations (exception justified)
- Using "Beskeder" (messages) maintains professional tone

✅ **Dutch "Geheim"** - Inappropriate connotations (exception justified)
- Use "bericht" (message) or "beveiligd bericht" (secured message) instead of "geheim" (secret)
- While "geheim" is a literal translation, it evokes associations with criminal underworld rather than business security
- Use "beveiligd" (secured) as adjective for describing protection: "Beveiligde links" (Secure links)
- Avoid "vertrouwelijk" (confidential) in general UI - sounds like you're trying to convince users you're trustworthy
- Native speaker feedback: "'Beveiligd' makes me more likely to trust you. 'Vertrouwelijk' makes me think you have to convince me that you're trustworthy. 'Geheim' makes me think of the German underworld."
- Example usage: "Je hebt 3 nieuwe berichten" (You have 3 new messages) ✓ vs "Je hebt 3 nieuwe geheimen" (You have 3 new secrets) ✗

❌ **Polish "Sekret"** - Works perfectly across all contexts (no exception needed)
- Appropriate from "sekret państwowy" (state secret) to business usage
- Maintains security context naturally

❌ **German "Geheimnis"** - Appropriate for security contexts (no exception needed)
- Standard term for confidential information

**Decision Process:**

When translating "secret" to a new language:

1. **Test the literal translation** with native speakers unfamiliar with the product
2. **Ask:** Does "[Create a secret]" sound professional and security-focused?
3. **If YES:** Use the literal translation (like German "Geheimnis", Polish "Sekret")
4. **If NO:** Consider the "message" exception (like Danish "Beskeder")

**Important:** The default should always be to use the literal translation of "secret" unless there is clear evidence of problematic connotations that undermine the security context.

### Translating "password" vs "passphrase"

Onetime Secret makes an important distinction between two security concepts that must be consistently maintained across all translations:

#### Password
- **Definition**: A standard authentication credential used for account access
- **Context**: Used exclusively for logging into user accounts on the Onetime Secret platform
- **Examples**: "Account password", "Login password", "Reset password"
- **Translation guidance**:
  - Use the most common, standard term in your language for authentication credentials
  - This should be the term users would expect to see when logging into any website
  - Typically shorter and more familiar to general users

#### Passphrase
- **Definition**: A security measure specifically for protecting individual secrets
- **Context**: Used when creating or accessing protected secrets (not for account access)
- **Examples**: "Protect with passphrase", "Enter passphrase to view", "Passphrase-protected secret"
- **Translation guidance**:
  - Must be clearly distinguished from regular account passwords
  - Should convey the concept of a potentially longer, phrase-based protection mechanism
  - If your language lacks a direct equivalent, create a consistent compound term that conveys this specialized security concept
  - Consider terms equivalent to "key phrase", "access phrase", or "security phrase" if needed

#### Maintaining the Distinction

Different languages handle this distinction in various ways:

| Language | Password (Account) | Passphrase (Secret Protection) | Notes |
|----------|-------------------|------------------------------|-------|
| English  | password          | passphrase                   | Clear distinction with compound word |
| Bulgarian| парола (parola)   | ключова фраза (klyuchova fraza) | "Key phrase" |
| Danish   | adgangskode       | adgangssætning               | "Access code" vs "Access sentence" |
| Spanish  | contraseña        | frase de seguridad           | "Counter-sign" vs "Security phrase" |

When translating these terms:

1. Always maintain consistent distinction between the two concepts
2. Test your chosen terms with native speakers unfamiliar with the product
3. Ensure the passphrase term conveys additional security/complexity compared to password
4. Use the exact same term for each concept throughout the entire translation

✅ Correct approach:
Account section: "Enter your [PASSWORD] to log in"
Secret section: "This secret is protected with a [PASSPHRASE]"

❌ Incorrect approach:
Using the same term for both concepts, or inconsistently switching between terms

#### User Management

- **colonel** (n.) - Administrator role
    - Project-specific term, rhymes with "kernel" which is a technical term and central component of an operating system. No other project uses this term in this way. It can be confusing even in North America.
    - Translate to the common term for an "administrator" in the context of software permissions. The account with the highest level of privileges.
    - Example: "Only colonels can access this feature" (i.e. "Only admins can access this feature").
- **plan** (n.) - Subscription level
    - Use consistently for service tiers
    - Prefer over "tier" or "level"
    - Example: "Upgrade to a premium plan"

## Formatting and layout

*Set standards for formatting, layout, and typography to maintain visual and design consistency across different languages.*

- Use consistent header styles to improve readability and content flow. For example H1 for main headings, H2, H3, etc for sub-headings
- Write headings in sentence case unless the heading is a punctuated sentence:
    - Good example: How localization drives growth for fintech firms
    - Good example: Localization made easy. Why wait?
    - Bad example: How Localization Drives Growth for Fintech Firms
    - Bad example: Localization made easy. why wait?

### Time format

Generally, a 12-hour clock is used in the United States. 24-hour clocks are used in aviation and other logistical contexts.

### Numerals

|  Symbol Purpose  |  Character Name  |  Symbol  |  Example  |
| --- | --- | --- | --- |
|  Decimal  |  Period  |  `.`  |  1.23  |
|  Thousands  |  Comma  |  `,`  |  1,234  |
|  Percentage  |  Percent sign  |  `%`  |  99.95%  |

### Currency

The currency of the Canada is the Canadian Dollar (CAD). The monetary symbols are `$` and rarely `¢`.

### Units of measurement

The imperial system is used for everyday weights in Canada. Everything else including distances, quantities, are in metric. Primarily m, Km, cm, mm ("deci" is used rarely).

### Address and postal code format

    [addressee]
    [street number and name][building and suite numbers]
    [district][city][state/province][postal code]
    [Country]

    British Columbia Sugar Refinery Ltd.
	123 Rogers Street
    Vancouver, BC. V6A 3N2
    CANADA

## Clear, Respectful Communication

Our goal: We want our writing to connect effectively with all readers while being clear, accurate, and respectful.

To verify your writing achieves these goals, ask:

- Is my language clear and specific?
- Am I addressing my readers directly and respectfully?
- Have I avoided assumptions about my readers?

## Translation style

- Use literal translation for legal or technical texts
- Translate with cultural context when translating content for marketing or advertising
- Use transcreation where you adapt the message so it resonates culturally and emotively with the audience, for creative content including blog posts and marketing copy.

## Related Resources

### For Translators

- **[Translation Overview](/en/translations/)** - Introduction and available languages
- **[Terminology Glossary](/en/translations/glossary)** - Standardized translations for key terms across languages
- **[Quality Checklist](/en/translations/quality-checklist)** - Comprehensive checklist to verify translation quality
- **[Language-Specific Notes](/en/translations/language-notes)** - Special considerations for specific languages

### Submission Guidelines

- Use the [Translation PR Template](https://github.com/onetimesecret/docs.onetimesecret.com/blob/main/.github/PULL_REQUEST_TEMPLATE/translation.md) when submitting translations
- Review the [Quality Checklist](/en/translations/quality-checklist) before creating your pull request
- Tag language-specific reviewers if known

### Getting Help

- Open a [Translation Request Issue](https://github.com/onetimesecret/docs.onetimesecret.com/issues/new?template=translation-request.md) for questions or coordination
- Join [GitHub Discussions](https://github.com/onetimesecret/docs.onetimesecret.com/discussions) for translator community
- [Contact the team](https://onetimesecret.com/contact) for translation support
