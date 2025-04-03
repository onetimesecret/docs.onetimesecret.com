// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import tailwind from "@astrojs/tailwind";

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

// Remember, for security reasons, only variables prefixed with VITE_ are
// available here to prevent accidental exposure of sensitive
// environment variables to the client-side code.
const viteBaseUrl = process.env.VITE_BASE_URL;

// According to the documentation, we should be able to set the allowed hosts
// via __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS but as of 5.4.15m that is not
// working as expected. So here we capture the value of that env var with
// and without the __ prefix and if they're defined, add them to
// server.allowedHosts below. -- Delano (2025-03-28)
//
// https://vite.dev/config/server-options.html#server-allowedhosts
// https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6
const viteAdditionalServerAllowedHosts =
  process.env.VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;
const __viteAdditionalServerAllowedHosts =
  process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS;

// https://astro.build/config
export default defineConfig({
  site: "https://docs.onetimesecret.com",
  // i18n: {
  //   locales: ["en", "nl", "de", "fr_FR", "fr_CA"],
  //   routing: {
  //     prefixDefaultLocale: true,
  //   },
  //   defaultLocale: "en",
  // },
  integrations: [
    markdoc(),
    starlight({
      title: "Onetime Secret - Docs",

      editLink: {
        baseUrl:
          "https://github.com/onetimesecret/docs.onetimesecret.com/edit/migrate-to-starlight/",
      },

      // https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page
      //
      // See src/pages/404.astro
      disable404Route: true,
      credits: true,
      logo: {
        src: "./src/assets/img/onetime-logo-v3-xs.png",
        alt: "Onetime Secret",
        replacesTitle: true,
      },
      components: {},
      social: {
        github: "https://github.com/onetimesecret/onetimesecret",
      },
      customCss: [
        // Relative path to your custom CSS files
        // "./src/styles/tailwind.css",
        "./src/styles/custom.css",
        "./src/fonts/font-face.css",
      ],
      // Set English as the default language for this site.
      defaultLocale: "en",

      locales: {
        // English docs in `src/content/docs/en/`
        en: {
          label: "English",
          lang: "en",
        },
        // German (Austrian) docs in `src/content/docs/de/`
        de: {
          label: "Deutsch",
          lang: "de",
        },
        // French Canadian docs in `src/content/docs/fr_CA/`
        fr_CA: {
          label: "Français",
          lang: "fr",
          dir: "ltr",
        },
        // Dutch docs in `src/content/docs/nl/`
        nl: {
          label: "Nederlands",
          lang: "nl",
          dir: "ltr",
        },
        // French (France) docs in `src/content/docs/fr_FR/`
        fr_FR: {
          label: "Français",
          lang: "fr",
          dir: "ltr",
        },
      },
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Introduction",
          translations: {
            de: "Einführung",
          },
          items: [
            {
              label: "Getting Started",
              translations: {
                de: "Erste Schritte",
              },
              link: "introduction",
            },
          ],
        },
        {
          label: "Secret Links",
          translations: {
            de: "Geheime Links",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "secret-links",
            },
            {
              label: "Why Use Secret Links",
              translations: {
                de: "Warum geheime Links verwenden",
              },
              link: "secret-links/why-use-secret-links",
            },
            {
              label: "Use Cases",
              translations: {
                de: "Anwendungsfälle",
              },
              link: "secret-links/use-cases",
            },
          ],
        },
        {
          label: "Custom Domains",
          translations: {
            de: "Benutzerdefinierte Domains",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "custom-domains",
            },
            {
              label: "How It Works",
              translations: {
                de: "Wie es funktioniert",
              },
              link: "custom-domains/how-it-works",
            },
            {
              label: "Setup Guide",
              translations: {
                de: "Einrichtungsanleitung",
              },
              link: "custom-domains/setup-guide",
            },
            {
              label: "Brand Guide",
              translations: {
                de: "Markenrichtlinie",
              },
              link: "custom-domains/brand-guide",
            },
            {
              label: "Compare Plans",
              translations: {
                de: "Pläne vergleichen",
              },
              link: "custom-domains/compare-plans",
            },
            {
              label: "Use Cases",
              translations: {
                de: "Anwendungsfälle",
              },
              link: "custom-domains/use-cases",
            },
          ],
        },
        {
          label: "Regions",
          translations: {
            de: "Regionen",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "regions",
            },
          ],
        },
        {
          label: "REST API",
          translations: {
            de: "REST API",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "rest-api",
            },
            {
              label: "Create Secrets",
              translations: {
                de: "Geheimnisse erstellen",
              },
              link: "rest-api/create-secrets",
            },
            {
              label: "Retrieve Secrets",
              translations: {
                de: "Geheimnisse abrufen",
              },
              link: "rest-api/retrieve-secrets",
            },
            {
              label: "Client Libraries",
              translations: {
                de: "Client-Bibliotheken",
              },
              link: "rest-api/client-libraries",
            },
          ],
        },
        {
          label: "Security Best Practices",
          translations: {
            de: "Sicherheits-Best-Practices",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "security-best-practices",
            },
          ],
        },
        {
          label: "Our Principles",
          translations: {
            de: "Unsere Prinzipien",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "principles",
            },
            {
              label: "Privacy First",
              translations: {
                de: "Datenschutz zuerst",
              },
              link: "principles/privacy-first",
            },
            {
              label: "Trust",
              translations: {
                de: "Vertrauen",
              },
              link: "principles/trust",
            },
            {
              label: "Communication",
              translations: {
                de: "Kommunikation",
              },
              link: "principles/communication",
            },
            {
              label: "Data Minimization",
              translations: {
                de: "Datenminimierung",
              },
              link: "principles/data-minimization",
            },
          ],
        },
        {
          label: "Translations",
          translations: {
            de: "Übersetzungen",
          },
          items: [
            {
              label: "Overview",
              translations: {
                de: "Überblick",
              },
              link: "translations",
            },
            {
              label: "Style Guide",
              translations: {
                de: "Stilrichtlinien",
              },
              link: "translations/guide-en",
            },
            {
              label: "Glossary",
              translations: {
                de: "Glossar",
              },
              link: "translations/glossary",
            },
          ],
        },
      ],
    }),
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
      nesting: true,
      configFile: "tailwind.config.ts",
    }),
  ],
  vite: {
    server: {
      origin: viteBaseUrl,
      allowedHosts: (() => {
        // NOTE: This is an Immediately Invoked Function Expression (IIFE)
        // that executes exactly once during config load/parsing time.
        // The returned array becomes the value of allowedHosts. We do
        // this to avoid adding empty strings to the array.
        //
        // Start with default allowed hosts
        const hosts = ["localhost", "127.0.0.1"];

        // Add additional hosts from environment variables if defined
        if (viteAdditionalServerAllowedHosts) {
          hosts.push(viteAdditionalServerAllowedHosts);
        }

        if (__viteAdditionalServerAllowedHosts) {
          hosts.push(__viteAdditionalServerAllowedHosts);
        }

        return hosts;
      })(),
    },
  },
});
