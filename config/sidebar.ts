import type { StarlightConfig } from "@astrojs/starlight/types";
import type { StarlightUserConfig } from "@astrojs/starlight/types";

// Helper function to create sidebar link items with required attrs
function createLink(
  label: string,
  link: string,
  translations: Record<string, string> = {},
  badge?: {
    text: string;
    variant: "note" | "danger" | "success" | "caution" | "tip";
    class?: string;
  },
) {
  return {
    label,
    link,
    translations,
    attrs: {},
    ...(badge ? { badge } : {}),
  };
}

// Helper function to create sidebar group items
function createGroup(
  label: string,
  translations: Record<string, string> = {},
  items: any[] = [],
) {
  return {
    label,
    translations,
    items,
  };
}

export const sidebar: StarlightUserConfig["sidebar"] = [
  createLink("Home", "/"),

  createGroup("Introduction", { de: "Einführung" }, [
    createLink("Getting Started", "introduction", { de: "Erste Schritte" }),
  ]),

  createGroup("Secret Links", { de: "Geheime Links" }, [
    createLink("Overview", "secret-links", { de: "Überblick" }),
    createLink("Why Use Secret Links", "secret-links/why-use-secret-links", {
      de: "Warum geheime Links verwenden",
    }),
    createLink("Use Cases", "secret-links/use-cases", {
      de: "Anwendungsfälle",
    }),
  ]),

  // Additional groups follow the same pattern
  createGroup("Custom Domains", { de: "Benutzerdefinierte Domains" }, [
    createLink("Overview", "custom-domains", { de: "Überblick" }),
    createLink("How It Works", "custom-domains/how-it-works", {
      de: "Wie es funktioniert",
    }),
    createLink(
      "Setup Guide",
      "custom-domains/setup-guide",
      { de: "Einrichtungsanleitung" },
      { text: "Helpful!", variant: "note", class: "small" },
    ),
    createLink("Brand Guide", "custom-domains/brand-guide", {
      de: "Markenrichtlinie",
    }),
    createLink("Compare Plans", "custom-domains/compare-plans", {
      de: "Pläne vergleichen",
    }),
    createLink("Use Cases", "custom-domains/use-cases", {
      de: "Anwendungsfälle",
    }),
  ]),

  createGroup("Regions", { de: "Regionen" }, [
    createLink("Overview", "regions", { de: "Überblick" }),
  ]),

  createGroup("REST API", { de: "REST API" }, [
    createLink("Overview", "rest-api", { de: "Überblick" }),
    createLink("Create Secrets", "rest-api/create-secrets", {
      de: "Geheimnisse erstellen",
    }),
    createLink("Retrieve Secrets", "rest-api/retrieve-secrets", {
      de: "Geheimnisse abrufen",
    }),
    createLink("Client Libraries", "rest-api/client-libraries", {
      de: "Client-Bibliotheken",
    }),
  ]),

  createGroup("Security Best Practices", { de: "Sicherheits-Best-Practices" }, [
    createLink("Overview", "security-best-practices", { de: "Überblick" }),
  ]),

  createGroup("Our Principles", { de: "Unsere Prinzipien" }, [
    createLink("Overview", "principles", { de: "Überblick" }),
    createLink("Privacy First", "principles/privacy-first", {
      de: "Datenschutz zuerst",
    }),
    createLink("Trust", "principles/trust", {
      de: "Vertrauen",
    }),
    createLink("Communication", "principles/communication", {
      de: "Kommunikation",
    }),
    createLink("Data Minimization", "principles/data-minimization", {
      de: "Datenminimierung",
    }),
  ]),

  createGroup("Translations", { de: "Übersetzungen" }, [
    createLink("Overview", "translations", { de: "Überblick" }),
    createLink("Style Guide", "translations/guide-en", {
      de: "Stilrichtlinien",
    }),
    createLink("Glossary", "translations/glossary", {
      de: "Glossar",
    }),
  ]),
];

// export const sidebar2: StarlightConfig["sidebar"] = [
//   { label: "Home", link: "/" },
//   {
//     label: "Introduction",
//     translations: {
//       de: "Einführung",
//     },
//     items: [
//       {
//         label: "Getting Started",
//         translations: {
//           de: "Erste Schritte",
//         },
//         link: "introduction",
//       },
//     ],
//   },
//   {
//     label: "Secret Links",
//     translations: {
//       de: "Geheime Links",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "secret-links",
//       },
//       {
//         label: "Why Use Secret Links",
//         translations: {
//           de: "Warum geheime Links verwenden",
//         },
//         link: "secret-links/why-use-secret-links",
//       },
//       {
//         label: "Use Cases",
//         translations: {
//           de: "Anwendungsfälle",
//         },
//         link: "secret-links/use-cases",
//       },
//     ],
//   },
//   {
//     label: "Custom Domains",
//     translations: {
//       de: "Benutzerdefinierte Domains",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "custom-domains",
//       },
//       {
//         label: "How It Works",
//         translations: {
//           de: "Wie es funktioniert",
//         },
//         link: "custom-domains/how-it-works",
//       },
//       {
//         label: "Setup Guide",
//         translations: {
//           de: "Einrichtungsanleitung",
//         },
//         link: "custom-domains/setup-guide",
//         badge: { text: "Helpful!", variant: "note", class: "small" },
//       },
//       {
//         label: "Brand Guide",
//         translations: {
//           de: "Markenrichtlinie",
//         },
//         link: "custom-domains/brand-guide",
//       },
//       {
//         label: "Compare Plans",
//         translations: {
//           de: "Pläne vergleichen",
//         },
//         link: "custom-domains/compare-plans",
//       },
//       {
//         label: "Use Cases",
//         translations: {
//           de: "Anwendungsfälle",
//         },
//         link: "custom-domains/use-cases",
//       },
//     ],
//   },
//   {
//     label: "Regions",
//     translations: {
//       de: "Regionen",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "regions",
//       },
//     ],
//   },
//   {
//     label: "REST API",
//     translations: {
//       de: "REST API",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "rest-api",
//       },
//       {
//         label: "Create Secrets",
//         translations: {
//           de: "Geheimnisse erstellen",
//         },
//         link: "rest-api/create-secrets",
//       },
//       {
//         label: "Retrieve Secrets",
//         translations: {
//           de: "Geheimnisse abrufen",
//         },
//         link: "rest-api/retrieve-secrets",
//       },
//       {
//         label: "Client Libraries",
//         translations: {
//           de: "Client-Bibliotheken",
//         },
//         link: "rest-api/client-libraries",
//       },
//     ],
//   },
//   {
//     label: "Security Best Practices",
//     translations: {
//       de: "Sicherheits-Best-Practices",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "security-best-practices",
//       },
//     ],
//   },
//   {
//     label: "Our Principles",
//     translations: {
//       de: "Unsere Prinzipien",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "principles",
//       },
//       {
//         label: "Privacy First",
//         translations: {
//           de: "Datenschutz zuerst",
//         },
//         link: "principles/privacy-first",
//       },
//       {
//         label: "Trust",
//         translations: {
//           de: "Vertrauen",
//         },
//         link: "principles/trust",
//       },
//       {
//         label: "Communication",
//         translations: {
//           de: "Kommunikation",
//         },
//         link: "principles/communication",
//       },
//       {
//         label: "Data Minimization",
//         translations: {
//           de: "Datenminimierung",
//         },
//         link: "principles/data-minimization",
//       },
//     ],
//   },
//   {
//     label: "Translations",
//     translations: {
//       de: "Übersetzungen",
//     },
//     items: [
//       {
//         label: "Overview",
//         translations: {
//           de: "Überblick",
//         },
//         link: "translations",
//       },
//       {
//         label: "Style Guide",
//         translations: {
//           de: "Stilrichtlinien",
//         },
//         link: "translations/guide-en",
//       },
//       {
//         label: "Glossary",
//         translations: {
//           de: "Glossar",
//         },
//         link: "translations/glossary",
//       },
//     ],
//   },
// ];
