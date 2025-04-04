import type { StarlightConfig } from "@astrojs/starlight/types";
import { i18nConfig } from "./i18n";
import { sidebar } from "./sidebar";

export const starlightConfig: StarlightConfig = {
  title: "Onetime Secret - Docs",
  editLink: {
    baseUrl:
      "https://github.com/onetimesecret/docs.onetimesecret.com/edit/migrate-to-starlight/",
  },
  disable404Route: true,
  credits: true,
  logo: {
    src: "./src/assets/img/onetime-logo-v3-xs.png",
    alt: "Onetime Secret",
    replacesTitle: true,
  },
  pagefind: false,
  plugins: [],
  components: {
    Header: "./src/components/starlight/Header.astro",
    SiteTitle: "./src/components/starlight/SiteTitle.astro",
  },
  social: {
    // Prioritize runtime validation errors over TypeScript errors when
    // they conflict so keep this a string rather than an object for now.
    blueSky: "https://bskyapp/profile/onetimesecretcom",
    github: "https://github.com/onetimesecret/onetimesecret",
  },
  customCss: ["./src/styles/tailwind.css", "./src/fonts/font-face.css"],
  defaultLocale: i18nConfig.defaultLocale,
  locales: i18nConfig.locales,
  sidebar,
};
