// config/domains.mjs
// Canonical URL + prerelease-marker configuration for the documentation site.

/**
 * The canonical production origin. Used as the target of the "Go to live docs"
 * link in the prerelease banner (StagingBanner.astro). It is intentionally NOT
 * used to derive page canonicals — those come from Astro's `site` / `SITE_URL`
 * (see astro.config.mjs).
 */
export const CANONICAL_ORIGIN = "https://docs.onetimesecret.com";

/** Coerce an env-var string to a boolean: "true"/"1" => true, anything else => false. */
function flag(value) {
  return value === "true" || value === "1";
}

/**
 * Whether to render the prerelease warning banner (StagingBanner.astro).
 *
 * Driven by the build-time `SHOW_STAGING_WARNING` env var, deliberately
 * DECOUPLED from `SITE_URL`. `SITE_URL` governs the canonical/sitemap/OG URLs;
 * the prerelease markers are a separate, explicit signal. Off by default, so a
 * production build (which sets neither flag) never shows the banner.
 *
 * To preview locally: `SHOW_STAGING_WARNING=true pnpm dev`.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
export function showStagingWarning(env = process.env) {
  return flag(env.SHOW_STAGING_WARNING);
}

/**
 * Whether to render the diagonal "PRERELEASE" watermark overlay
 * (StagingWatermark.astro). Driven by `SHOW_STAGING_WATERMARK`, independent of
 * the banner so the two can be toggled separately.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
export function showStagingWatermark(env = process.env) {
  return flag(env.SHOW_STAGING_WATERMARK);
}

/**
 * Whether this is a prerelease build at all (either marker enabled).
 *
 * Used to emit a site-wide `noindex` so the staging/preview deploy stays out of
 * search engines — the directive Google actually honours for keeping a page out
 * of the index. The page canonical is left self-referential (we do NOT add a
 * cross-host canonical, which would conflict with `noindex`).
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
export function isPrereleaseBuild(env = process.env) {
  return showStagingWarning(env) || showStagingWatermark(env);
}
