// src/components/config-generator/legacy-route.ts
//
// The one piece of compatibility the route move needs (plan A4).
//
// The generator moved from the custom route /en/self-hosting/configuration-generator/
// into the documentation collection at /en/reference/generator/. Astro's static
// redirects are a one-hop meta-refresh stub with a fixed URL: the stub cannot
// carry the query string the generator stores its selections in, nor the
// #apply-configuration fragment. A bookmark such as
//
//   /en/self-hosting/configuration-generator/?auth=full&db=postgres#apply-configuration
//
// would therefore arrive at the new page with every selection dropped. So the
// old English route keeps ONE page whose only job is to forward, and the
// movedPages table skips the default locale for that slug — no source URL is
// both a page and a redirect.
//
// The non-English copies of the old route were never pages: they redirected to
// the English one. They now redirect straight to the new route, because
// redirecting through a retired English URL is what the plan forbids.

/** The route the generator lives at now. */
export const GENERATOR_ROUTE = '/en/reference/generator/';

/** The retired route this module forwards from. */
export const LEGACY_GENERATOR_ROUTE = '/en/self-hosting/configuration-generator/';

/**
 * Where a request to the retired route should land, selections intact.
 *
 * `search` and `hash` are passed in rather than read from `location` so the
 * behaviour is testable without a browser. Both arrive with their leading `?`
 * and `#` when present, which is what `location.search` and `location.hash`
 * give, and an empty string otherwise.
 */
export function generatorTarget(search = '', hash = ''): string {
  const query = search && search !== '?' ? (search.startsWith('?') ? search : `?${search}`) : '';
  const fragment = hash && hash !== '#' ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  return `${GENERATOR_ROUTE}${query}${fragment}`;
}
