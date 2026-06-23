// docs.onetimesecret.com/starlight/config/starlight.mjs
import { i18nConfig } from "./i18n.mjs";
import { sidebar } from "./sidebar.mjs";
import { isStagingBuild } from "./domains.mjs";

// Staging builds (docs.onetimesecret.dev) get a top warning banner and a
// diagonal "STAGING" watermark, mirroring the company site. Detection is done
// once at build time from SITE_URL (see config/domains.mjs), so the markers
// are baked into the static HTML — no client-side JS, no layout shift. On
// production builds nothing below is wired up, so the output is untouched.
const staging = isStagingBuild();

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

  components: {
    Header: "./src/components/starlight/Header.astro",
    SiteTitle: "./src/components/starlight/SiteTitle.astro",
    // Staging only: wrap PageFrame to mount the staging banner + watermark.
    ...(staging
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
    // Staging only: offsets Starlight's fixed header/sidebars for the banner.
    ...(staging ? ["./src/styles/staging.css"] : []),
  ],
  defaultLocale: i18nConfig.defaultLocale,
  locales: i18nConfig.locales,
  sidebar,
};
