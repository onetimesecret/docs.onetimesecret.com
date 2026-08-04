// config/redirects.mjs

import { i18nConfig } from "./i18n.mjs";

/**
 * Astro's redirect configuration is static and evaluated at build time, not
 * runtime so we can't access browser language preferences here. For dynamic
 * language redirection, we'd need to use one of the following approaches:
 *
 *    * Option 1: Client-side redirect with index.astro
 *    * Option 2: Server middleware (SSR mode only)
 *
 */
export function createRedirectsConfig() {
  // The standalone Trust principles page was merged into Privacy First
  // (#DOCS-1), so its URL redirects in every locale.
  const trustMergeRedirects = Object.fromEntries(
    Object.keys(i18nConfig.locales).map((locale) => [
      `/${locale}/principles/trust`,
      `/${locale}/principles/privacy-first/`,
    ]),
  );

  // The configuration generator is an interactive page (src/pages) that only
  // exists in English, so non-EN sidebar links redirect to the EN page.
  const configGeneratorRedirects = Object.fromEntries(
    Object.keys(i18nConfig.locales)
      .filter((locale) => locale !== i18nConfig.defaultLocale)
      .map((locale) => [
        `/${locale}/self-hosting/configuration-generator`,
        `/en/self-hosting/configuration-generator`,
      ]),
  );

  // Translator notes are now repo-only reference material: the per-locale
  // language-notes.md and for-translators.md files were renamed with an
  // underscore prefix so Astro stops routing them, and the EN
  // language-notes.md template was deleted. Their previously published URLs
  // redirect to the locale's translations index rather than 404.
  const translatorNotesRedirects = Object.fromEntries(
    Object.keys(i18nConfig.locales).flatMap((locale) => [
      [`/${locale}/translations/language-notes`, `/${locale}/translations/`],
      // EN never had a for-translators page; the other locales did.
      ...(locale === i18nConfig.defaultLocale
        ? []
        : [
            [
              `/${locale}/translations/for-translators`,
              `/${locale}/translations/`,
            ],
          ]),
    ]),
  );

  // Content directories that exist under src/content/docs but are not in
  // i18nConfig.locales. Astro still builds pages for them, so their
  // translator-note routes were published too and need the same treatment.
  // They have no translations/index.md, so they land on the EN index instead.
  // Keys use the lowercased URL form Astro emits (ca_ES -> /ca_es/).
  const unconfiguredLocaleNoteRedirects = Object.fromEntries(
    ["ar", "ca_ES", "cs", "el_GR", "he", "hu", "ru", "sl_SI", "vi"].flatMap(
      (dir) => {
        const locale = dir.toLowerCase();
        return [
          [`/${locale}/translations/language-notes`, `/en/translations/`],
          [`/${locale}/translations/for-translators`, `/en/translations/`],
        ];
      },
    ),
  );

  return {
    ...trustMergeRedirects,
    ...configGeneratorRedirects,
    ...translatorNotesRedirects,
    ...unconfiguredLocaleNoteRedirects,
    "/api": "/en/rest-api/",
    "/rest-api": "/en/rest-api/",
    "/docs/rest-api": "/en/rest-api/",
    "/rest-api/v1": "/en/rest-api/",
    "/rest-api/v1/create-secrets": "/en/rest-api/",
    "/rest-api/v1/retrieve-secrets": "/en/rest-api/",
    "/rest-api/v1/client-libraries": "/en/resources/client-libraries/",
    "/rest-api/v2": "/en/rest-api/",
    "/blog": "https://blog.onetimesecret.com/",
    "/contact": "https://onetimesecret.com/feedback",
    "/docs": "/en/",
    "/domains": "/en/custom-domains/",
    "/feedback": "https://onetimesecret.com/feedback",
    "/getting-started": "/en/introduction",
    "/homepage": "/en/custom-domains/brand-guide/",
    "/intro": "/en/introduction",
    "/introduction": "/en/introduction",
    "/pricing": "https://onetimesecret.com/pricing",
    "/principals": "/en/principles/",
    "/principles": "/en/principles/",
    "/regions": "/en/regions/",
    "/regions/ca": "/en/regions/canada/",
    "/regions/eu": "/en/regions/european-union/",
    "/regions/nz": "/en/regions/new-zealand/",
    "/regions/uk": "/en/regions/united-kingdom/",
    "/regions/us": "/en/regions/united-states/",
  };
}
