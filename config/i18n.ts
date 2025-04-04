// starlight/config/i18n.ts
import type { StarlightUserConfig } from "@astrojs/starlight/types";

// Internationalization configuration
export const i18nConfig: Pick<
  StarlightUserConfig,
  "defaultLocale" | "locales"
> = {
  defaultLocale: "en",
  locales: {
    en: {
      label: "English",
      lang: "en",
      dir: "ltr",
    },
    de: {
      label: "Deutsch",
      lang: "de",
      dir: "ltr",
    },
    fr_CA: {
      label: "Français",
      lang: "fr",
      dir: "ltr",
    },
    nl: {
      label: "Nederlands",
      lang: "nl",
      dir: "ltr",
    },
    fr_FR: {
      label: "Français",
      lang: "fr",
      dir: "ltr",
    },
  },
};
