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

// ---------------------------------------------------------------------------
// Which locales get a fan-out
//
// Object.keys(i18nConfig.locales) — the 17 locales Starlight is configured for
// — and NOT the 26 directories under src/content/docs. Starlight only emits a
// route (translated, or falling back to the EN page) for a *configured* locale,
// so /en/regions/canada/ and /fr/regions/canada/ were both real published URLs
// while /ar/regions/canada/ never was. The nine unconfigured directories hold
// translations/* files only (see config/unconfigured-locales.allow); they get
// exactly one fan-out below, unconfiguredLocaleNoteRedirects, because those
// pages did physically exist there. Fanning the page moves over all 26 would
// mint ~300 redirect stubs for URLs that never existed.
// ---------------------------------------------------------------------------
const LOCALES = Object.keys(i18nConfig.locales);

/**
 * Every page family retired by the Phase 2 information-architecture rework,
 * as slugs relative to the locale root (no leading slash, no locale prefix).
 *
 * `from` is the retired slug, `to` is the slug that now owns the content, and
 * the optional `fragment` is the heading anchor on `to` where the absorbed
 * topic landed. A merge target only gets a fragment where the merged page gave
 * the absorbed topic its own heading — start/index and organizations/index
 * folded their sources into new prose with no dedicated heading, so those
 * redirect to the page.
 *
 * Fragments are derived, not hand-matched: every one below is the
 * github-slugger slug of an H2 that literally exists on the target page (that
 * is the D1 contract for the region merge, and the same treatment is applied to
 * the principles and custom-domains merges). If a target heading is ever
 * reworded, the fragment here must be re-derived rather than the heading bent
 * back to fit.
 *
 * `toDefaultLocale` sends every locale to the EN copy of the target. Set it
 * only when the absorbed content exists in English only, so a same-locale
 * redirect would send the reader to a page that does not contain what they
 * followed the link for.
 *
 * `skipLocales` omits the fan-out for the locales it names. Exactly one entry
 * uses it, and only because that URL is still a page: the retired generator
 * route keeps an English forwarder (src/pages/en/self-hosting/configuration-generator.astro)
 * so a bookmarked query string and the #apply-configuration fragment survive,
 * which a static redirect stub cannot do. Astro would refuse to serve a URL
 * that is both a page and a redirect, and the plan forbids it outright, so the
 * EN row is skipped and the other sixteen locales redirect straight to the new
 * route. Do not reach for this to paper over a missing translation.
 *
 * Every merge target resolves in-locale: either the locale has its own
 * translated copy (moved with the page this phase), or it has none and
 * Starlight serves the EN fallback, whose headings are the EN headings. Both
 * cases make the fragments below resolve.
 *
 * @type {{from: string, to: string, fragment?: string, toDefaultLocale?: boolean, skipLocales?: string[]}[]}
 */
const movedPages = [
  // Start here — three entry points merged into one, plus the orientation
  // page that used to live under self-hosting.
  { from: "docs-overview", to: "start" },
  { from: "introduction", to: "start" },
  { from: "introduction/guides", to: "start" },
  { from: "self-hosting/self-hosting-vs-hosted", to: "start/hosted-or-self-hosted" },

  // start/run-your-own-instance (itself the successor of
  // self-hosting/getting-started) duplicated the install/* pages step for step
  // and was folded into the self-hosting index. Both retired slugs aim straight
  // at it — a redirect whose target is another redirect 404s in a static build.
  // The non-EN copies were deleted with the EN page, which also retired the
  // start/installation and start/configuration link shims that existed only to
  // catch their stale relative links.
  { from: "self-hosting/getting-started", to: "self-hosting" },
  { from: "start/run-your-own-instance", to: "self-hosting" },

  // Phase 3: the 481-line installation page did six jobs and was split into six
  // install/* pages. A movedPages row fans one `from` to one `to` —
  // assertNoDuplicateSources forbids a second row for the same slug, and
  // `fragment` only appends an anchor to the same target — so a 1:6 split has
  // to pick one successor. install/docker is it: the retired page led with
  // Docker, and its five siblings sit next to install/docker in the same
  // sidebar group, one click away.
  { from: "self-hosting/installation", to: "install/docker" },

  // Using Onetime Secret › Sharing secrets
  { from: "share/receiving-secrets", to: "share/request-secret" },
  { from: "secret-links", to: "share" },
  { from: "secret-links/why-use-secret-links", to: "share/why-secret-links" },
  { from: "secret-links/use-cases", to: "share/use-cases" },

  // Using Onetime Secret › Your account
  { from: "regions/switching-regions", to: "account/change-your-region" },

  // Using Onetime Secret › Organizations & members. The old "team" prefix and
  // the misfiled custom-domains/member-invites both land here.
  { from: "team/shared-dashboard", to: "organizations" },
  { from: "custom-domains/member-invites", to: "organizations/inviting-members" },
  { from: "team/sso", to: "organizations/sso" },
  { from: "team/audit-log", to: "organizations/audit-trail" },

  // Using Onetime Secret › Custom domains
  //
  // custom-domains/how-it-works and use-cases were first absorbed into the EN
  // custom-domains/index. That page has since dropped both sections: its setup
  // route replaces how-it-works, and the examples were general sharing advice
  // that share/use-cases already covers. Both now resolve in-locale with no
  // fragment; share/use-cases exists in every configured locale.
  { from: "custom-domains/how-it-works", to: "custom-domains" },
  { from: "custom-domains/use-cases", to: "share/use-cases" },
  { from: "custom-domains/brand-guide", to: "custom-domains/branding" },
  {
    from: "custom-domains/homepage-secrets",
    to: "custom-domains/homepage-and-incoming",
    fragment: "homepage-secrets",
  },
  {
    from: "custom-domains/incoming-secrets",
    to: "custom-domains/homepage-and-incoming",
    fragment: "incoming-secrets",
  },
  {
    from: "custom-domains/privacy-options",
    to: "custom-domains/access-and-privacy",
    fragment: "privacy-options",
  },
  {
    from: "custom-domains/signin-settings",
    to: "custom-domains/access-and-privacy",
    fragment: "sign-in-settings",
  },
  {
    from: "custom-domains/signup-settings",
    to: "custom-domains/access-and-privacy",
    fragment: "sign-up-settings",
  },

  // API & SDKs
  { from: "rest-api", to: "api" },
  { from: "resources/client-libraries", to: "api/client-libraries" },

  // Trust & security
  { from: "security-best-practices", to: "security/best-practices" },

  // The region family: the index goes to the page, each jurisdiction to its own
  // H2 anchor on the merged page (D1).
  { from: "regions", to: "security/where-your-data-lives" },
  { from: "regions/canada", to: "security/where-your-data-lives", fragment: "canada" },
  {
    from: "regions/european-union",
    to: "security/where-your-data-lives",
    fragment: "european-union",
  },
  { from: "regions/new-zealand", to: "security/where-your-data-lives", fragment: "new-zealand" },
  {
    from: "regions/united-kingdom",
    to: "security/where-your-data-lives",
    fragment: "united-kingdom",
  },
  {
    from: "regions/united-states",
    to: "security/where-your-data-lives",
    fragment: "united-states",
  },

  // Phase 4: the environment reference moved out of self-hosting/ into the
  // generated Reference group. The page is now rendered by bin/reference.mjs
  // from a pinned application snapshot, and its 25 section fragments are
  // preserved verbatim, so an old deep link such as
  // /en/self-hosting/environment-variables/#sso--omniauth still resolves once
  // the reader follows this redirect. The eight translated copies retired with
  // the English page; their final revisions are recorded in
  // docs/planning/documentation-audit-2026-08-phase-4-evidence.md.
  { from: "self-hosting/environment-variables", to: "reference/environment-variables" },

  // Phase 4 P3: the configuration family followed it. The 637-line English
  // configuration page is replaced by the authored precedence reference plus
  // five generated key-record pages, and the interactive generator moved from
  // a custom src/pages route into the documentation collection. The eight
  // translated configuration copies retired with the English page; their final
  // revisions are recorded in
  // docs/planning/documentation-audit-2026-08-phase-4-configuration-retirement.md.
  //
  // The generator row sends every locale to the English page (the tool is
  // English-only, which is what the removed configGeneratorRedirects fan-out
  // used to do) and skips EN, where the forwarder page lives.
  { from: "self-hosting/configuration", to: "reference/configuration-files-and-precedence" },
  {
    from: "self-hosting/configuration-generator",
    to: "reference/generator",
    toDefaultLocale: true,
    skipLocales: ["en"],
  },

  // The principles family, same treatment.
  { from: "principles", to: "security/our-principles" },
  { from: "principles/privacy-first", to: "security/our-principles", fragment: "privacy-first" },
  { from: "principles/communication", to: "security/our-principles", fragment: "communication" },
  {
    from: "principles/data-minimization",
    to: "security/our-principles",
    fragment: "data-minimization",
  },
  // Legacy, and previously a bug: the standalone Trust principles page was
  // merged into Privacy First (#DOCS-1) in an earlier pass, and this URL was
  // pointed at /{locale}/principles/privacy-first/ — which is itself now a
  // retired slug. A redirect whose target is another redirect does not resolve
  // in a static build, so it is folded into the same table and sent straight to
  // the final destination.
  { from: "principles/trust", to: "security/our-principles", fragment: "privacy-first" },
];

/** Strip the fragment and any trailing slash so two spellings of one path compare equal. */
function pathKey(url) {
  const path = url.split("#")[0];
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

/**
 * Locale-prefixed URL for a slug, with the site's trailing-slash-then-fragment
 * spelling: /fr/security/where-your-data-lives/#canada
 */
function localeUrl(locale, slug, fragment) {
  return `/${locale}/${slug}/${fragment ? `#${fragment}` : ""}`;
}

/**
 * Fail the build on a redirect whose target is itself a redirect key.
 *
 * Astro's static redirects are one hop: the emitted stub points at the target
 * URL, and if nothing is built there the reader gets a 404. Chains are easy to
 * introduce by retargeting one entry and not its neighbours, and impossible to
 * spot by eye across ~700 entries, so the invariant is asserted rather than
 * reviewed. Off-site targets are exempt — they leave the build.
 *
 * @param {Record<string, string>} redirects
 */
export function assertNoChainedRedirects(redirects) {
  const keys = new Set(Object.keys(redirects).map(pathKey));
  const chains = [];
  for (const [from, to] of Object.entries(redirects)) {
    if (isOffsiteTarget(to)) continue;
    if (keys.has(pathKey(to))) chains.push(`  ${from} -> ${to}`);
  }
  if (chains.length > 0) {
    throw new Error(
      `config/redirects.mjs: ${chains.length} chained redirect(s) — the target is itself a ` +
        `redirect key, which 404s in a static build:\n${chains.join("\n")}`,
    );
  }
}

/**
 * Fail the build on a duplicate `from` in movedPages.
 *
 * Object.fromEntries would silently keep the last one, so a copy-paste slip
 * would quietly drop a whole page family's redirects in all 17 locales.
 *
 * @param {{from: string}[]} pages
 */
export function assertNoDuplicateSources(pages) {
  const seen = new Set();
  const duplicates = [];
  for (const { from } of pages) {
    if (seen.has(from)) duplicates.push(from);
    seen.add(from);
  }
  if (duplicates.length > 0) {
    throw new Error(
      `config/redirects.mjs: duplicate movedPages "from" slug(s): ${duplicates.join(", ")}`,
    );
  }
}

/**
 * True when a redirect target leaves this site (any URI scheme).
 *
 * The single source for the "is this off-site?" test — bin/check-frontmatter
 * imports it too, so the exemption in assertNoChainedRedirects and the
 * fragment check can never classify the same target differently.
 *
 * @param {string} target
 */
export const isOffsiteTarget = (target) => /^[a-z][a-z0-9+.-]*:/i.test(target);

export function createRedirectsConfig() {
  assertNoDuplicateSources(movedPages);

  // Phase 2 information-architecture rework: every retired page family, in
  // every configured locale. Generated rather than written out so the source of
  // truth stays the ~40-row movedPages table above instead of ~600 literals.
  const movedPageRedirects = Object.fromEntries(
    LOCALES.flatMap((locale) =>
      movedPages
        .filter(({ skipLocales }) => !skipLocales?.includes(locale))
        .map(({ from, to, fragment, toDefaultLocale }) => [
          `/${locale}/${from}`,
          localeUrl(toDefaultLocale ? i18nConfig.defaultLocale : locale, to, fragment),
        ]),
    ),
  );

  // Translator notes are now repo-only reference material: the per-locale
  // language-notes.md and for-translators.md files were renamed with an
  // underscore prefix so Astro stops routing them, and the EN
  // language-notes.md template was deleted. Their previously published URLs
  // redirect to the locale's translations index rather than 404.
  const translatorNotesRedirects = Object.fromEntries(
    LOCALES.flatMap((locale) => [
      [`/${locale}/translations/language-notes`, `/${locale}/translations/`],
      // EN never had a for-translators page; the other locales did.
      ...(locale === i18nConfig.defaultLocale
        ? []
        : [[`/${locale}/translations/for-translators`, `/${locale}/translations/`]]),
    ]),
  );

  // Content directories that exist under src/content/docs but are not in
  // i18nConfig.locales. Astro still builds pages for them, so their
  // translator-note routes were published too and need the same treatment.
  // They have no translations/index.md, so they land on the EN index instead.
  // Keys use the lowercased URL form Astro emits (ca_ES -> /ca_es/).
  const unconfiguredLocaleNoteRedirects = Object.fromEntries(
    ["ar", "ca_ES", "cs", "el_GR", "he", "hu", "ru", "sl_SI", "vi"].flatMap((dir) => {
      const locale = dir.toLowerCase();
      return [
        [`/${locale}/translations/language-notes`, `/en/translations/`],
        [`/${locale}/translations/for-translators`, `/en/translations/`],
      ];
    }),
  );

  const redirects = {
    ...movedPageRedirects,
    ...translatorNotesRedirects,
    ...unconfiguredLocaleNoteRedirects,

    // ---------------------------------------------------------------------
    // Bare, locale-less vanity paths. These are hand-maintained because they
    // are not a fan-out of anything: each one is a short URL that has been
    // printed, emailed or linked somewhere, and they all resolve into EN.
    // Every on-site target below must be a page that exists in the tree; the
    // chain assertion at the end of this function catches the other failure
    // mode, where the target is itself a key here.
    // ---------------------------------------------------------------------

    // The API docs moved from /rest-api to /api this phase.
    "/api": "/en/api/",
    "/rest-api": "/en/api/",
    "/docs/rest-api": "/en/api/",
    "/rest-api/v1": "/en/api/",
    "/rest-api/v1/create-secrets": "/en/api/",
    "/rest-api/v1/retrieve-secrets": "/en/api/",
    "/rest-api/v1/client-libraries": "/en/api/client-libraries/",
    "/rest-api/v2": "/en/api/",

    // Off-site.
    "/blog": "https://blog.onetimesecret.com/",
    "/contact": "https://onetimesecret.com/feedback",
    "/feedback": "https://onetimesecret.com/feedback",

    // The SSO demos moved to ssowhat.dev.
    "/artifacts/2026/sso-demos": "https://ssowhat.dev/",
    "/artifacts/2026/sso-demos/oidc-saml-bridge": "https://ssowhat.dev/oidc-saml-bridge/",

    // The site root is not redirected. src/pages/index.astro renders the EN
    // homepage entry at "/" with a canonical link to /en/, so one source file
    // serves both URLs and "/" answers 200 instead of a meta-refresh stub.
    "/docs": "/en/",
    "/domains": "/en/custom-domains/",

    // The three orientation shortcuts pointed at /en/introduction, which this
    // phase merged into start/. They pointed at a bare path with no trailing
    // slash too, costing a second hop.
    "/getting-started": "/en/start/",
    "/intro": "/en/start/",
    "/introduction": "/en/start/",

    // Was /en/custom-domains/brand-guide/; that page is now custom-domains/branding.
    "/homepage": "/en/custom-domains/branding/",

    // Was sent off-site to the marketing pricing page because /en/pricing/ was
    // an unnavigable orphan. It is linked under Plans & billing now, so the
    // short path keeps the reader in the docs.
    "/pricing": "/en/pricing/",

    // Follow the principles merge ("/principals" is a long-standing typo catch).
    "/principals": "/en/security/our-principles/",
    "/principles": "/en/security/our-principles/",

    // Follow the region merge, each short code to its jurisdiction's anchor.
    "/regions": "/en/security/where-your-data-lives/",
    "/regions/ca": "/en/security/where-your-data-lives/#canada",
    "/regions/eu": "/en/security/where-your-data-lives/#european-union",
    "/regions/nz": "/en/security/where-your-data-lives/#new-zealand",
    "/regions/uk": "/en/security/where-your-data-lives/#united-kingdom",
    "/regions/us": "/en/security/where-your-data-lives/#united-states",
  };

  assertNoChainedRedirects(redirects);

  return redirects;
}
