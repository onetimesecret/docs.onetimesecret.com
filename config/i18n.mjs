// config/i18n.mjs

/**
 * Internationalization configuration for Starlight
 * Defines supported locales and their properties.
 *
 * To add a new language:
 * 0. export CODE={locale}
 * 1. Add locale configuration to the 'locales' object below
 * 2. Create a matching translation file at src/content/i18n/$CODE.json
 * 3. Create content directory at src/content/docs/$CODE
 * 4. Translate required content files from the English source
 * 5. Update sidebar.mjs to load and use translations for the new language:
 *    - Import the new language's translations
 *    - Add the new language to the 'translations' property in createLink/createGroup functions
 * 6. Verify with build and preview commands: pnpm run build && pnpm run preview
 *
 * Translation Utility:
 * For large translation projects, use the translation-pluribus-util script:
 *
 * 1. Prepare files for translation:
 *    pnpm run translate:prepare # (Assumes CODE is set in your environment, e.g., export CODE=nl)
 *
 * 2. Combine into single file (for translation services):
 *    pnpm run translate:combine
 *
 * 3. AFTER translation, split the combined file (NOTE: typically requires manually fixing the delimiters):
 *    pnpm run translate:split # (Assumes CODE is set for combined-$CODE.txt, e.g., export CODE=nl)
 *
 * 4. Restore files to target language directory:
 *    pnpm run translate:restore # (Assumes CODE is set in your environment)
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
    da: {
      label: "Dansk (da)",
      lang: "da",
      dir: "ltr",
    },
    de: {
      label: "Deutsch (de)",
      lang: "de",
      dir: "ltr",
    },
    es: {
      label: "Español (es)",
      lang: "es",
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
    pl: {
      label: "Polski (pl)",
      lang: "pl",
      dir: "ltr",
    },
    "pt-br": {
      label: "Português (pt-BR)",
      lang: "pt-BR",
      dir: "ltr",
    },
    sv: {
      label: "Svenska (sv)",
      lang: "sv",
      dir: "ltr",
    },
    tr: {
      label: "Türkçe (tr)",
      lang: "tr",
      dir: "ltr",
    },
    uk: {
      label: "Українська (uk)",
      lang: "uk",
      dir: "ltr",
    },
    "zh-cn": {
      label: "简体中文 (zh-CN)",
      lang: "zh-CN",
      dir: "ltr",
    },
  },
};
