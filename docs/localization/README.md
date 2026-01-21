# Localization Resources

Internal process documentation for Onetime Secret localization. For translator-facing content, see the universal translation guidance at `src/content/docs/en/translations/universal/`.

## Overview

This directory contains:
- Internal process documentation (management approach, tooling)
- Machine-readable reference data (core-terms.json)
- Specialized reference content not suitable for the docs site

Translator-facing content has been consolidated into the documentation site under `/en/translations/universal/`.

## Directory Structure

```
/docs/localization/
├── README.md                         # This file
├── management-approach.md            # When to adopt a TMS vs. current pattern
├── glossary/
│   └── core-terms.json               # Essential terms in JSON format (machine-readable)
├── style-guides/
│   └── general.md                    # Universal principles (internal reference)
└── reference/
    ├── self-hosted-terms.md          # "Self-hosted" translations
    └── language-specific-notes.md    # Key insights from translation work
```

## For Translators

Start with the documentation site resources:

1. **Universal guidance**: `/en/translations/universal/`
   - Translating "secret" across languages
   - Password vs. passphrase distinctions
   - Voice and tone guidelines
   - Brand terms (do not translate)
   - Quality checklist

2. **Language-specific resources**: `/{lang}/translations/`
   - Glossary with standardized terms
   - Language-specific notes and rules
   - For-translators guide (generated reference)

## For Developers

- **Core terminology data**: [`glossary/core-terms.json`](glossary/core-terms.json)
- **General principles**: [`style-guides/general.md`](style-guides/general.md)
- **Specialized references**: [`reference/`](reference/)

## For Project Maintainers

- **Management approach**: [`management-approach.md`](management-approach.md) - TMS vs. documentation-driven localization
- **For-translators generation**: `bin/generate-for-translators` - Generate locale-specific translator guides

## Tools

- **Translation utility**: `bin/translation-pluribus-util` for batch processing
- **For-translators generator**: `bin/generate-for-translators` for generating for-translators.md files
- **Build commands**: See main project README for testing translations
