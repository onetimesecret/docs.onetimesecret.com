// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
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
      title: "Onetime Secret - Documentation",
      logo: {
        src: "./src/assets/img/onetime-logo-v3-md.png",
        alt: "Onetime Secret",
      },
      social: {
        github: "https://github.com/onetimesecret/onetimesecret",
      },
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
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
        {
          label: "Home",
          translations: {
            de: "Startseite",
          },
          items: [
            {
              label: "Home Page",
              translations: {
                de: "Startseite",
              },
              link: "home",
            },
          ],
        },
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
          label: "Pricing",
          translations: {
            de: "Preise",
          },
          items: [
            {
              label: "Plans & Pricing",
              translations: {
                de: "Pläne & Preise",
              },
              link: "pricing",
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
  ],
});
