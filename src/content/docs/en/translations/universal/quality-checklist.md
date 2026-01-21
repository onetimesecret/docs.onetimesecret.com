---
title: Translation Quality Checklist
description: A comprehensive checklist for ensuring high-quality, consistent translations of Onetime Secret documentation
---

# Translation Quality Checklist

This checklist helps ensure translations meet Onetime Secret's quality standards before submission. Use this as a guide when translating documentation or reviewing translation contributions.

## Pre-Translation Planning

Before starting your translation:

- [ ] Read the [Translation Style Guide](/en/translations/guide) completely
- [ ] Review the [Terminology Glossary](/en/translations/glossary) for your target language
- [ ] Check [Language-Specific Notes](/en/translations/language-notes) if available for your locale
- [ ] Identify the source English files you'll be translating
- [ ] Verify the directory structure for your target locale exists

## Core Quality Criteria

### 1. Completeness ✅

- [ ] All source content sections are translated (no missing paragraphs)
- [ ] All headings and subheadings are translated
- [ ] All list items are translated
- [ ] Frontmatter (title, description) is translated
- [ ] Code comments are translated where appropriate
- [ ] No English text remains except:
  - Technical terms (API, URL, DNS, SSL, HTTP, JSON, etc.)
  - Code examples and command-line syntax
  - Brand names (Onetime Secret, GitHub, etc.)

### 2. Formality Consistency ✅

- [ ] Consistent use of formal/informal address throughout
  - German: Use "Sie/Ihre" (formal) consistently
  - French: Use "vous/votre" (formal) consistently
  - Spanish: Use "usted/su" (formal) consistently
  - Check your language's conventions in the style guide
- [ ] No mixing of formality levels within same document
- [ ] Address matches target audience (professional B2B users)
- [ ] Tone is professional but approachable

### 3. Terminology Standards ✅

- [ ] Core terms match the [Glossary](/en/translations/glossary):
  - **secret** → (check glossary for your language)
  - **passphrase** → (check glossary - must differ from "password")
  - **password** → (check glossary - must differ from "passphrase")
  - **burn** → (check glossary)
  - **one-time** → (check glossary)
- [ ] Technical security terms are accurate and consistent
- [ ] UI element names match the locale's `i18n.json` file
- [ ] Brand terms are not translated:
  - Onetime Secret (not translated)
  - OTS (not translated when used as product abbreviation)
  - Product names: Identity Plus, Global Elite, Custom Install

### 4. Link Localization ✅

- [ ] All internal documentation links use locale prefix:
  - ✅ Correct: `[Guide](/fr/translations/guide)`
  - ❌ Wrong: `[Guide](/translations/guide)`
  - ❌ Wrong: `[Guide](translations/guide)`
- [ ] Link text is translated appropriately
- [ ] External links remain in English (unless linking to localized external content)
- [ ] Anchor links are updated if heading text changed
- [ ] All links tested and working

### 5. Markdown Formatting ✅

- [ ] No malformed markdown syntax:
  - Links: `[text](url)` format correct
  - Bold: `**text**` wraps the text properly
  - Italics: `*text*` or `_text_` wraps properly
  - Code: `` `code` `` inline, ` ```language ` for blocks
- [ ] Headings use proper hierarchy (H1 → H2 → H3)
- [ ] Lists use consistent markers (-, *, or numbered)
- [ ] Tables are properly formatted with aligned columns
- [ ] Line breaks and spacing match source document

### 6. File Structure ✅

- [ ] File placed in correct locale directory (e.g., `/content/docs/fr/`)
- [ ] Filename matches English source exactly
- [ ] Directory structure mirrors English version
- [ ] File encoding is UTF-8
- [ ] Line endings are consistent (LF preferred)
- [ ] Frontmatter YAML is valid and complete

### 7. Cultural Adaptation ✅

- [ ] Examples are culturally appropriate
- [ ] Date formats match locale conventions (if applicable)
- [ ] Number formats match locale (decimal separators, thousands)
- [ ] Currency symbols are appropriate
- [ ] Measurements use locale-standard units
- [ ] Time formats match locale (12h vs 24h)
- [ ] Regional variants respected (e.g., fr-FR vs fr-CA)

### 8. Natural Language Quality ✅

- [ ] Translation sounds natural, not machine-translated
- [ ] Grammar is correct for target language
- [ ] Punctuation follows target language conventions
- [ ] Sentence structure is idiomatic
- [ ] No literal word-for-word translations that sound awkward
- [ ] Technical accuracy maintained while sounding natural
- [ ] Spelling is correct (including diacritics/accents)

## Post-Translation Review

### Self-Review

- [ ] Read entire translation aloud to check flow
- [ ] Compare side-by-side with English to ensure nothing missed
- [ ] Check all links by clicking through them
- [ ] Verify code blocks render correctly
- [ ] Test in local development environment if possible
- [ ] Run spell checker for target language

### Peer Review (Recommended)

- [ ] Have another native speaker review translation
- [ ] Get feedback on terminology choices
- [ ] Verify formality level is appropriate
- [ ] Confirm cultural adaptations make sense

### Technical Validation

- [ ] Markdown renders correctly (no broken formatting)
- [ ] Images display with translated alt text
- [ ] Tables are readable and properly aligned
- [ ] Code examples work (if translatable portions were changed)
- [ ] No broken links or 404 errors

## Accessibility Considerations

- [ ] Image alt text is translated
- [ ] Link text is descriptive (not just "click here")
- [ ] Heading hierarchy is logical for screen readers
- [ ] Tables have proper header cells
- [ ] Language attributes set correctly if using HTML

## Submission Checklist

Before creating your pull request:

- [ ] All files committed to correct branch
- [ ] Commit message follows format: `[i18n] Add [language] translation for [section]`
- [ ] Changes tested locally (if possible)
- [ ] PR description explains what was translated
- [ ] Referenced any related issues
- [ ] Requested review from language-specific reviewers (if known)

## Quick Reference

### Common Issues to Avoid

❌ **Don't:**
- Mix formal and informal address
- Translate brand names
- Leave links without locale prefix
- Use machine translation without review
- Translate technical acronyms (API, DNS, etc.)
- Copy-paste English when stuck (ask for help instead)

✅ **Do:**
- Follow glossary for core terms
- Maintain professional tone
- Test all links
- Ask questions in GitHub issues
- Provide context in PR descriptions
- Review your own work before submitting

## Getting Help

If you're unsure about any aspect of translation:

1. Check the [Translation Style Guide](/en/translations/guide)
2. Review the [Terminology Glossary](/en/translations/glossary)
3. Look at existing translations in your language for examples
4. Ask in GitHub issues or discussions
5. Tag language-specific reviewers if known
6. [Contact the team](https://onetimesecret.com/contact) for clarification

## Quality Grading (Internal Reference)

Based on QA reviews, translations are graded on:

- **Completeness**: % of source files translated
- **UI Translation**: % of UI strings in i18n.json
- **Content Quality**: Grammar, natural phrasing, accuracy
- **Link Localization**: % of links properly localized
- **Natural Phrasing**: How natural the translation sounds
- **Formatting**: Markdown and structure quality

Target grade: **A** (all criteria met consistently)

---

**Last Updated:** 2025-11-18
**Maintained by:** Onetime Secret Documentation Team
