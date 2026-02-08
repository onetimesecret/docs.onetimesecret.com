// config/redirects.mjs

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
  return {
    "/api": "/en/rest-api/",
    "/rest-api": "/en/rest-api/",
    "/docs/rest-api": "/en/rest-api/",
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
