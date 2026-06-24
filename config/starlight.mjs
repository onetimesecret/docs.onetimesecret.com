// docs.onetimesecret.com/starlight/config/starlight.mjs
import { i18nConfig } from "./i18n.mjs";
import { sidebar } from "./sidebar.mjs";
import {
  showStagingWarning,
  showStagingWatermark,
  isPrereleaseBuild,
} from "./domains.mjs";

// Prerelease builds (e.g. docs.onetimesecret.dev) get a top warning banner
// and/or a diagonal "PRERELEASE" watermark, independently toggled at build time
// via SHOW_STAGING_WARNING / SHOW_STAGING_WATERMARK (see config/domains.mjs).
// The markers are baked into the static HTML — no client-side JS, no layout
// shift. A prerelease build is also marked `noindex` so the staging/preview
// site stays out of search engines (the directive Google honours; the page
// canonical is left self-referential). On production builds none of this is
// wired up, so the output is untouched.
const warning = showStagingWarning();
const watermark = showStagingWatermark();
const prerelease = isPrereleaseBuild();

/**
 * Starlight configuration object
 * Defines the structure and behavior of the documentation site
 */
export const starlightConfig = {
  title: "Onetime Secret - Docs",
  // favicon: "./src/assets/img/favicon.ico",
  editLink: {
    baseUrl:
      "https://github.com/onetimesecret/docs.onetimesecret.com/edit/main/",
  },
  disable404Route: true,
  credits: true,
  logo: {
    src: "./src/assets/img/onetime-logo-v3-xl.svg",
    alt: "Onetime Secret",
    replacesTitle: true,
  },
  pagefind: false,
  plugins: [],

  // Prerelease only: keep the staging/preview deploy out of search engines.
  // noindex is the directive Google honours for this; we deliberately do NOT
  // add a cross-host canonical (it would conflict with noindex).
  head: prerelease
    ? [
        {
          tag: "meta",
          attrs: { name: "robots", content: "noindex, nofollow" },
        },
      ]
    : [],

  components: {
    Header: "./src/components/starlight/Header.astro",
    SiteTitle: "./src/components/starlight/SiteTitle.astro",
    // Prerelease only: wrap PageFrame to mount the banner and/or watermark.
    // The override renders each marker conditionally on its own flag.
    ...(prerelease
      ? { PageFrame: "./src/components/starlight/PageFrame.astro" }
      : {}),
  },
  social: [
    {
      icon: "blueSky",
      label: "BlueSky",
      href: "https://bsky.app/profile/onetimesecret.com",
    },
    {
      icon: "github",
      label: "GitHub",
      href: "https://github.com/onetimesecret/onetimesecret",
    },
  ],
  customCss: [
    "./src/styles/tailwind.css",
    "./src/fonts/font-face.css",
    "./src/styles/theme-overrides.css",
    // Only when the banner is shown: offsets Starlight's fixed header/sidebars
    // for it. The watermark needs no layout offsets, so it is gated on
    // `warning`, not the watermark flag.
    ...(warning ? ["./src/styles/staging.css"] : []),
  ],
  defaultLocale: i18nConfig.defaultLocale,
  locales: i18nConfig.locales,
  sidebar,
};
