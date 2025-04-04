// docs.onetimesecret.com/starlight/config/sidebar.mjs

/**
 * Helper function to create sidebar link items with required attrs
 * @param {string} label - Display label for the link
 * @param {string} link - URL path for the link
 * @param {Object} translations - Localized versions of the label by language code
 * @param {Object} [badge] - Optional badge configuration
 * @returns {Object} Formatted sidebar link item
 */
function createLink(label, link, translations = {}, badge) {
  return {
    label,
    link,
    translations,
    attrs: {},
    ...(badge ? { badge } : {}),
  };
}

/**
 * Helper function to create sidebar group items
 * @param {string} label - Display label for the group
 * @param {Object} translations - Localized versions of the label by language code
 * @param {Array} items - Child items (links or groups) within this group
 * @param {boolean} collapsed - Whether the group should be collapsed by default
 * @returns {Object} Formatted sidebar group item
 */
function createGroup(label, translations = {}, items = [], collapsed = false) {
  return {
    label,
    translations,
    items,
    collapsed,
  };
}

// Sidebar configuration for Starlight
export const sidebar = [
  createLink("Home", "/", { de: "Startseite" }),

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
    createLink("Setup Guide", "custom-domains/setup-guide", {
      de: "Einrichtungsanleitung",
    }),
    createLink(
      "Brand Guide",
      "custom-domains/brand-guide",
      {
        de: "Markenrichtlinie",
      },
      { text: "Helpful!", variant: "tip", class: "small" },
    ),
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

    // Nested v1 group containing all API endpoint documentation
    createGroup("v1", { de: "v1" }, [
      createLink("Create Secrets", "rest-api/v1/create-secrets", {
        de: "Geheimnisse erstellen",
      }),
      createLink("Retrieve Secrets", "rest-api/v1/retrieve-secrets", {
        de: "Geheimnisse abrufen",
      }),
      createLink("Client Libraries", "rest-api/v1/client-libraries", {
        de: "Client-Bibliotheken",
      }),
    ]),
  ]),

  createGroup("Security Best Practices", { de: "Sicherheits-Best-Practices" }, [
    createLink("Overview", "security-best-practices", { de: "Überblick" }),
  ]),

  createGroup(
    "Our Principles",
    { de: "Unsere Prinzipien" },
    [
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
    ],
    true,
  ),

  createGroup(
    "Translations",
    { de: "Übersetzungen" },
    [
      createLink("Overview", "translations", { de: "Überblick" }),
      createLink("Style Guide", "translations/guide-en", {
        de: "Stilrichtlinien",
      }),
      createLink("Glossary", "translations/glossary", {
        de: "Glossar",
      }),
    ],
    true,
  ),
];
