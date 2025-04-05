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
  createLink("Home", "/", { de: "Startseite", nl: "Home" }),

  createGroup("Introduction", { de: "Einführung", nl: "Introductie" }, [
    createLink("Getting Started", "introduction", {
      de: "Erste Schritte",
      nl: "Aan de slag",
    }),
  ]),

  createGroup("Secret Links", { de: "Geheime Links", nl: "Geheime links" }, [
    createLink("Overview", "secret-links", {
      de: "Überblick",
      nl: "Overzicht",
    }),
    createLink("Why Use Secret Links", "secret-links/why-use-secret-links", {
      de: "Warum geheime Links verwenden",
      nl: "Waarom geheime links gebruiken",
    }),
    createLink("Use Cases", "secret-links/use-cases", {
      de: "Anwendungsfälle",
      nl: "Gebruikscasussen",
    }),
  ]),

  createGroup(
    "Custom Domains",
    { de: "Benutzerdefinierte Domains", nl: "Aangepaste domeinen" },
    [
      createLink("Overview", "custom-domains", {
        de: "Überblick",
        nl: "Overzicht",
      }),
      createLink("How It Works", "custom-domains/how-it-works", {
        de: "Wie es funktioniert",
        nl: "Hoe werken ze?",
      }),
      createLink("Setup Guide", "custom-domains/setup-guide", {
        de: "Einrichtungsanleitung",
        nl: "Installatiegids",
      }),
      createLink(
        "Brand Guide",
        "custom-domains/brand-guide",
        {
          de: "Markenrichtlinie",
          nl: "Merkgids",
        },
        { text: "Helpful!", variant: "tip", class: "small" },
      ),
      createLink("Compare Plans", "custom-domains/compare-plans", {
        de: "Pläne vergleichen",
        nl: "Plannen vergelijken",
      }),
      createLink("Use Cases", "custom-domains/use-cases", {
        de: "Anwendungsfälle",
        nl: "Gebruikscasussen",
      }),
    ],
  ),

  createGroup("Regions", { de: "Regionen", nl: "Regio's" }, [
    createLink("Overview", "regions", { de: "Überblick", nl: "Overzicht" }),
  ]),

  createGroup("REST API", { de: "REST API", nl: "REST API" }, [
    createLink("Overview", "rest-api", { de: "Überblick", nl: "Overzicht" }),

    createGroup("v1", { de: "v1", nl: "v1" }, [
      createLink("Create Secrets", "rest-api/v1/create-secrets", {
        de: "Geheimnisse erstellen",
        nl: "Geheimen aanmaken",
      }),
      createLink("Retrieve Secrets", "rest-api/v1/retrieve-secrets", {
        de: "Geheimnisse abrufen",
        nl: "Geheimen ophalen",
      }),
      createLink("Client Libraries", "rest-api/v1/client-libraries", {
        de: "Client-Bibliotheken",
        nl: "Client bibliotheken",
      }),
    ]),
  ]),

  createGroup(
    "Security Best Practices",
    { de: "Sicherheits-Best-Practices", nl: "Beveiligingsbest practices" },
    [
      createLink("Overview", "security-best-practices", {
        de: "Überblick",
        nl: "Overzicht",
      }),
    ],
  ),

  createGroup(
    "Our Principles",
    { de: "Unsere Prinzipien", nl: "Onze principes" },
    [
      createLink("Overview", "principles", {
        de: "Überblick",
        nl: "Overzicht",
      }),
      createLink("Privacy First", "principles/privacy-first", {
        de: "Datenschutz zuerst",
        nl: "Privacy eerst",
      }),
      createLink("Trust", "principles/trust", {
        de: "Vertrauen",
        nl: "Vertrouwen",
      }),
      createLink("Communication", "principles/communication", {
        de: "Kommunikation",
        nl: "Communicatie",
      }),
      createLink("Data Minimization", "principles/data-minimization", {
        de: "Datenminimierung",
        nl: "Gegevensminimalisatie",
      }),
    ],
    true,
  ),

  createGroup(
    "Translations",
    { de: "Übersetzungen", nl: "Vertalingen" },
    [
      createLink("Overview", "translations", {
        de: "Überblick",
        nl: "Overzicht",
      }),
      createLink("Style Guide", "translations/guide-en", {
        de: "Stilrichtlinien",
        nl: "Stijlgids",
      }),
      createLink("Glossary", "translations/glossary", {
        de: "Glossar",
        nl: "Woordenlijst",
      }),
    ],
    true,
  ),
];
