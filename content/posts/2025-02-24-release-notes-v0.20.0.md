---
layout: post
title: "Onetime Secret v0.20.0: Internationalization"
date: 2025-02-24
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/release-0.20.svg
badge:
  label: Release
readingTime: 1
---

Today we're announcing Onetime Secret v0.20.0, a release focused on renewed language support and enhanced type safety and error handling.

[Full v0.20.0 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.20.0)


## Key Improvements

### Internationalization Support

We're pleased to report that Onetime Secret now supports multiple languages... again for the first time. We've had translations since 2017 [thanks to our community contributors](https://onetimesecret.com/translations) but a lot has changed since then, including replacing the entire frontend with a new Vue 3 implementation. That plus the addition of new features and content meant we needed to circle back and update our translations.

This work was originally planned as a stretch goal for 2025, but we decided to tackle it sooner to make our service more accessible globally. This internationalization effort is a key priority for us, ensuring Onetime Secret is available to users worldwide and removing language barriers that might otherwise prevent people from securing their sensitive information.

For v0.20.0, we've enabled support for:
- English (en)
- French (France) (fr_FR)
- French (Canada) (fr_CA)
- German (Austria) (de_AT)

Other languages are temporarily disabled as we work to complete their translations. We'll be re-enabling them in future updates as they become more complete. If you'd like to check on the status of a specific language or contribute to this effort, please visit our [translation page](https://onetimesecret.com/translations).

In our earlier versions, we supported a wide range of languages including Arabic, Bulgarian, Catalan, Czech, Danish, German, Greek, Spanish, Hebrew, Hungarian, Italian, Japanese, Dutch, Polish, Portuguese (Brazil and Portugal), Russian, Slovenian, Swedish, Turkish, Ukrainian, Vietnamese, and Chinese. We're working to update these translations and will be re-enabling them in upcoming releases.

#### Translation Process

Our translation workflow combined several approaches:
- Machine translation services ([DeepL](https://www.deepl.com/en/translator))
- AI assistance (Claude 3.5 Sonnet and 3.7)
- Manual review and corrections
- Community contributions

##### Tools

The [i18n Ally extension](https://github.com/lokalise/i18n-ally) from Lokalise has been very useful for two stages of the work: reviewing translation files locally and extracting hardcoded strings into the translation files.

We leaned heavily on the power of [`jq`](https://github.com/jqlang/jq), the command-line JSON processor. Who knew it could run powerful scripts like this:

```javascript
// Sample from our harmonization script
jq -r '
  # Start with the main locale file (en.json)
  . as $main_locale
  # Create a new object
  | {}
  # Add all keys from main locale
  | . * ($main_locale | map_values(null))
  # Override with any existing values from target locale
  | . * ($current_locale | map_values(.))
' "$REFERENCE_FILE" > temp_file.json
```

(__In the interest of transparency, while I understand this script when analyzing it line by line, crafting it from scratch would have been challenging within our timeline constraints. This efficient solution was developed with assistance from Claude 3.5 Sonnet.__)

We wrote a couple bash scripts around the jq commands to actually do the work of harmonizing the JSON locales files. [This was a huge time saver](https://github.com/onetimesecret/onetimesecret/blob/v0.20.0/src/locales/scripts/harmonize-locale-file) and allowed us to focus on the actual translations. This updates the Dutch translation file with any missing keys from the English file, including the order and hierarchical structure of the keys:

```bash
  $ ./src/locales/scripts/harmonize-locale-file -v -c src/locales/nl.json
  Repaired src/locales/nl.json
```

If you have suggestions about our internationalization efforts or would like to contribute to improving translations, please visit our [feedback page](https://onetimesecret.com/feedback) or our [translation page](https://onetimesecret.com/translations).

### Also in this release

#### Enhanced Error Handling & Type Safety

We've significantly improved:
- Error handling in API requests
- Type safety throughout the application
- Configuration options for Sentry monitoring

#### Configuration Changes

Note that we've renamed the `services` configuration key to `diagnostics` in etc/config.yaml, and we've introduced several new environment variables to support internationalization and enhanced monitoring. See the [full v0.20.0 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.20.0) for details.


## New to Onetime Secret?

Onetime Secret lets you share sensitive information that's automatically destroyed after it's viewed.

- Try our hosted service at [onetimesecret.com](https://onetimesecret.com)
- Self-host your own instance by forking our [GitHub repository](https://github.com/onetimesecret/onetimesecret) or official [Docker image](https://hub.docker.com/r/onetimesecret/onetimesecret).

## Additional Resources
- [Documentation](https://docs.onetimesecret.com/docs/)
- [Status](https://status.onetimesecret.com/)
- [Roadmap](https://github.com/orgs/onetimesecret/projects/1)

Thank you to everyone who contributed to this release. We appreciate all your support and feedback.


::ImageModal{src="/img/blog/2025/release-0.20.0.svg" alt="" width="600"}
::
