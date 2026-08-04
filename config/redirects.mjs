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

  return {
    ...trustMergeRedirects,
    ...configGeneratorRedirects,
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
