// config/i18n.mjs

/**
 * Internationalization configuration for Starlight
 * Defines supported locales and their properties.
 *
 * To add a new language:
 * 0. export code={locale}
 * 1. Add locale configuration to the 'locales' object below
 * 2. Create a matching translation file at src/content/i18n/$code.json
 * 3. Create content directory at src/content/docs/$code
 * 4. Translate required content files from the English source
 * 5. Update sidebar.mjs to load and use translations for the new language:
 *    - Import the new language's translations
 *    - Add the new language to the 'translations' property in createLink/createGroup functions
 * 6. Verify with build and preview commands: pnpm run build && pnpm run preview
 *
 * Translation Utility:
 * For large translation projects, use the translation-util script:
 *
 * 1. Prepare files for translation:
 *    python3 ./bin/translation-util prepare -s ./src/content/docs/$code -t ./translation_files
 *
 * 2. Combine into single file (for translation services):
 *    python3 ./bin/translation-util combine -t ./translation_files -o ./combined-source.txt
 *
 * 3. AFTER translation, split the combined file (NOTE: typically requires manually fixing the delimiters):
 *    python3 ./bin/translation-util split -c ./combined-$code.txt -t ./translation_files
 *
 * 4. Restore files to target language directory:
 *    python3 ./bin/translation-util restore -t ./translation_files -s ./src/content/docs/$code
 */

export const i18nConfig = {
  defaultLocale: "en",
  locales: {
    en: {
      label: "English (en)",
      lang: "en",
      dir: "ltr",
    },
    bg: {
      label: "Български (bg)",
      lang: "bg",
      dir: "ltr",
    },
    es: {
      label: "Español (es)",
      lang: "es",
      dir: "ltr",
    },
    de: {
      label: "Deutsch (de)",
      lang: "de",
      dir: "ltr",
    },
    fr: {
      label: "Français (fr)",
      lang: "fr",
      dir: "ltr",
    },
    it: {
      label: "Italiano (it)",
      lang: "it",
      dir: "ltr",
    },
    ja: {
      label: "日本語 (ja)",
      lang: "ja",
      dir: "ltr",
    },
    ko: {
      label: "한국어 (ko)",
      lang: "ko",
      dir: "ltr",
    },
    mi: {
      label: "Māori (mi)",
      lang: "mi",
      dir: "ltr",
    },
    nl: {
      label: "Nederlands (nl)",
      lang: "nl",
      dir: "ltr",
    },
    uk: {
      label: "Українська (uk)",
      lang: "uk",
      dir: "ltr",
    },
    zh_cn: {
      label: "简体中文 (zh_cn)",
      lang: "zh_cn",
      dir: "ltr",
    },
  },
};
