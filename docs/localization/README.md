# Localization Resources

Quick reference for translators and developers working on Onetime Secret's multi-language support.

## Overview

This directory contains centralized localization guidelines that complement the per-language translation resources. Use these references to maintain consistency across all language versions.

## Directory Structure

```
/docs/localization/
├── README.md                         # This file
├── glossary/
│   └── core-terms.json               # Essential terms in JSON format
├── terminology/
│   ├── secret-concept.md             # Translating "secret" across languages
│   └── password-passphrase.md        # Distinguishing authentication terms
├── style-guides/
│   ├── general.md                    # Universal principles
│   └── voice-and-tone.md             # Active/passive voice guidelines
└── reference/
    ├── self-hosted-terms.md          # "Self-hosted" translations
    └── language-specific-notes.md    # Key insights from translation work
```

## Quick References

### For Translators

1. **Start with language-specific resources**: `src/content/docs/{lang}/translations/`
   - Existing glossaries and style guides
   - Language-specific translation notes

2. **Check core terminology**: [`glossary/core-terms.json`](glossary/core-terms.json)
   - Essential terms that must be consistent
   - Terms that have proven challenging across languages

3. **Understand nuanced concepts**: [`terminology/`](terminology/)
   - Why "secret" translation matters
   - Password vs. passphrase distinctions

### For Developers

1. **General principles**: [`style-guides/general.md`](style-guides/general.md)
2. **Voice guidelines**: [`style-guides/voice-and-tone.md`](style-guides/voice-and-tone.md)
3. **Reference translations**: [`reference/`](reference/)

## Language-Specific Resources

Each language has its own detailed resources in the content directory:
- **German**: [`src/content/docs/de/translations/`](../../../src/content/docs/de/translations/)
- **Spanish**: [`src/content/docs/es/translations/`](../../../src/content/docs/es/translations/)
- **French**: [`src/content/docs/fr/translations/`](../../../src/content/docs/fr/translations/)
- **Italian**: [`src/content/docs/it/translations/`](../../../src/content/docs/it/translations/)
- **Japanese**: [`src/content/docs/ja/translations/`](../../../src/content/docs/ja/translations/)
- **Korean**: [`src/content/docs/ko/translations/`](../../../src/content/docs/ko/translations/)
- **Māori**: [`src/content/docs/mi/translations/`](../../../src/content/docs/mi/translations/)
- **Dutch**: [`src/content/docs/nl/translations/`](../../../src/content/docs/nl/translations/)
- **Bulgarian**: [`src/content/docs/bg/translations/`](../../../src/content/docs/bg/translations/)
- **Ukrainian**: [`src/content/docs/uk/translations/`](../../../src/content/docs/uk/translations/)
- **Chinese (Simplified)**: [`src/content/docs/zh-cn/translations/`](../../../src/content/docs/zh-cn/translations/)

## Contributing

When updating translations:

1. Check existing terminology in this directory first
2. Update central resources if establishing new patterns
3. Keep language-specific details in their respective directories
4. Focus on insights that help other languages, not repetitive details

## Tools

- **Translation utility**: `bin/translation-util` for batch processing
- **Build commands**: See main project README for testing translations
