// config/domains.mjs
// Central domain configuration for canonical URLs and staging detection.
//
// This mirrors the company site's `config/domains.ts` so the documentation
// site marks its staging environment the same way the main onetimesecret.dev
// site does (a top banner + a diagonal "STAGING" watermark). Keeping the
// hostname list and helper identical across properties means the two sites
// stay in sync if a new staging/dev domain is ever added.

/**
 * The canonical production domain for the documentation site. Used for the
 * "Go to live docs" link in the staging banner so visitors can jump from the
 * staging deploy to the real docs.
 */
export const CANONICAL_ORIGIN = "https://docs.onetimesecret.com";

/**
 * Hostnames that indicate a staging/development environment. The banner and
 * watermark are shown on any hostname that exactly matches one of these or is
 * a subdomain of it (e.g. `docs.onetimesecret.dev`).
 */
export const STAGING_HOSTNAMES = [
  "onetimesecret.dev", // Staging deployment (docs.onetimesecret.dev)
  "onetime.dev", // Local development convenience domain
];

/**
 * Check if a hostname is a staging/development environment.
 *
 * Uses strict matching (exact match or subdomain) to prevent spoofing where an
 * attacker could register e.g. `onetimesecret.dev.attacker.com`.
 *
 * @param {string | undefined | null} hostname
 * @returns {boolean}
 */
export function isStagingHostname(hostname) {
  if (!hostname) return false;
  return STAGING_HOSTNAMES.some(
    (staging) => hostname === staging || hostname.endsWith(`.${staging}`),
  );
}

/**
 * Decide at build time whether this is a staging build.
 *
 * The staging deploy sets `SITE_URL` to the .dev domain (see
 * `.github/workflows/deploy-staging.yml`), which also drives canonical URLs
 * and the sitemap. Because staging is a separate build from production we can
 * resolve this once at build time — the banner is then baked into the static
 * HTML with no client-side JavaScript, no layout shift, and no flash.
 *
 * The `STAGING_BANNER` environment variable provides an explicit override that
 * takes precedence over `SITE_URL` detection:
 *   - `STAGING_BANNER=true` (or `1`)  -> force the banner/watermark on
 *   - `STAGING_BANNER=false` (or `0`) -> force them off
 * This is handy for previewing the banner locally (`STAGING_BANNER=true
 * pnpm dev`) or disabling it on a one-off staging build.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
export function isStagingBuild(env = process.env) {
  const flag = env.STAGING_BANNER;
  if (flag === "true" || flag === "1") return true;
  if (flag === "false" || flag === "0") return false;

  const siteUrl = env.SITE_URL;
  if (!siteUrl) return false;
  try {
    return isStagingHostname(new URL(siteUrl).hostname);
  } catch {
    return false;
  }
}
