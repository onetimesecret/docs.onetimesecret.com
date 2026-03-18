// docs.onetimesecret.com/starlight/config/starlight.mjs
import { i18nConfig } from "./i18n.mjs";
import { sidebar } from "./sidebar.mjs";
import starlightOpenAPI, {
  openAPISidebarGroups,
} from "starlight-openapi";

// Patch API Reference sidebar group with i18n translations
const patchedOpenAPISidebarGroups = openAPISidebarGroups.map((group) => ({
  ...group,
  translations: {
    de: "API-Referenz",
    nl: "API-referentie",
    fr: "Référence API",
    es: "Referencia de API",
    uk: "Довідник API",
    ko: "API 레퍼런스",
    ja: "APIリファレンス",
    mi: "Tohutoro API",
    bg: "API Справочник",
    it: "Riferimento API",
    "zh-CN": "API 参考",
    da: "API-reference",
    pl: "Dokumentacja API",
    "pt-BR": "Referência da API",
    sv: "API-referens",
    tr: "API Referansı",
  },
}));

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
  plugins: [
    starlightOpenAPI([
      {
        base: "api",
        schema: "./schemas/openapi.json",
        sidebar: {
          label: "API Reference",
          collapsed: true,
        },
      },
    ]),
  ],

  components: {
    Header: "./src/components/starlight/Header.astro",
    SiteTitle: "./src/components/starlight/SiteTitle.astro",
    Banner: "./src/components/starlight/Banner.astro",
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
  ],
  defaultLocale: i18nConfig.defaultLocale,
  locales: i18nConfig.locales,
  sidebar: [...sidebar, ...patchedOpenAPISidebarGroups],
};
