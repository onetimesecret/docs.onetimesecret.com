---
name: Translation Contribution
about: Submit a new translation or update an existing translation
title: '[i18n] Add/Update [LANGUAGE] translation for [SECTION]'
labels: translation, i18n
---

## Translation Details

**Language:** <!-- e.g., French (fr), Spanish (es), Japanese (ja) -->
**Locale Code:** <!-- e.g., fr, es, ja, pt-br -->
**Section/Files:** <!-- e.g., Custom Domains, Self-Hosting, specific file names -->

## Translation Type

- [ ] New translation (first time for this language)
- [ ] Update existing translation
- [ ] Fix translation errors
- [ ] Add missing translations

## Files Changed

<!-- List the files you've added or modified -->
- `src/content/docs/[locale]/[path]/[file].md`
- `src/content/i18n/[locale].json` (if UI strings updated)

## Quality Checklist

I have reviewed my translation against the [Quality Checklist](https://docs.onetimesecret.com/en/translations/quality-checklist):

### Core Criteria
- [ ] ✅ **Completeness**: All content translated, no missing sections
- [ ] ✅ **Formality Consistency**: Formal/informal address used consistently
- [ ] ✅ **Terminology Standards**: Followed glossary for core terms (secret, passphrase, password, burn)
- [ ] ✅ **Link Localization**: All internal links use locale prefix (e.g., `/fr/`, `/es/`)
- [ ] ✅ **Markdown Formatting**: No malformed links, proper bold/italic syntax
- [ ] ✅ **File Structure**: Correct directory, filename matches source
- [ ] ✅ **Cultural Adaptation**: Examples/formats appropriate for locale
- [ ] ✅ **Natural Language**: Translation sounds natural, not machine-translated

### Review
- [ ] Self-reviewed translation by reading aloud
- [ ] Tested all links (no 404s)
- [ ] Verified markdown renders correctly
- [ ] Spell-checked in target language
- [ ] (Optional) Peer-reviewed by another native speaker

## Translation Approach

<!-- Briefly describe your translation approach -->

**Formality Level:** <!-- Formal / Informal (explain choice if informal) -->

**Key Terminology Decisions:**
<!-- List any important translation choices for core terms -->
- secret →
- passphrase →
- password →
- burn →

**Cultural Adaptations:**
<!-- Note any cultural adaptations made (if any) -->

## References

<!-- Check all that apply -->
- [ ] Followed [Translation Style Guide](https://docs.onetimesecret.com/en/translations/guide)
- [ ] Referenced [Terminology Glossary](https://docs.onetimesecret.com/en/translations/glossary)
- [ ] Reviewed [Language-Specific Notes](https://docs.onetimesecret.com/en/translations/language-notes) (if available)
- [ ] Consistent with existing translations in this language

## Additional Context

<!-- Any additional information about this translation -->
<!-- For example: Native speaker region, translation tools used, questions/uncertainties -->

## Related Issues

<!-- Link any related issues, e.g., "Closes #123" or "Related to #456" -->

---

## For Reviewers

**Review Focus Areas:**
- [ ] Terminology matches glossary
- [ ] Formality is consistent
- [ ] Links are properly localized
- [ ] Markdown formatting is correct
- [ ] Natural phrasing for target audience

**Language Reviewer Needed:** <!-- Tag if you know specific reviewers for this language -->

---

**Thank you for contributing to Onetime Secret translations! 🌍**
