// config/sidebar.mjs
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load translations from JSON files
function loadTranslations(locale) {
  const filePath = join(__dirname, "../src/content/i18n", `${locale}.json`);
  try {
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    return {};
  }
}

const enTranslations = loadTranslations("en");
const deTranslations = loadTranslations("de");
const nlTranslations = loadTranslations("nl");
const frTranslations = loadTranslations("fr");
const esTranslations = loadTranslations("es");
const ukTranslations = loadTranslations("uk");
const koTranslations = loadTranslations("ko");
const jaTranslations = loadTranslations("ja");
const miTranslations = loadTranslations("mi");
const bgTranslations = loadTranslations("bg");
const itTranslations = loadTranslations("it");
const zhCnTranslations = loadTranslations("zh-cn");
const daTranslations = loadTranslations("da");
const plTranslations = loadTranslations("pl");
const ptBrTranslations = loadTranslations("pt-br");
const svTranslations = loadTranslations("sv");
const trTranslations = loadTranslations("tr");

/**
 * Helper function to create sidebar link items with required attrs
 * @param {string} key - Translation key for the label
 * @param {string} link - URL path for the link
 * @param {Object} [badge] - Optional badge configuration
 * @returns {Object} Formatted sidebar link item
 */
function createLink(key, link, badge) {
  const enLabel = enTranslations.sidebar?.[key] || key;
  return {
    label: enLabel,
    link,
    translations: {
      de: deTranslations.sidebar?.[key],
      nl: nlTranslations.sidebar?.[key],
      fr: frTranslations.sidebar?.[key],
      es: esTranslations.sidebar?.[key],
      uk: ukTranslations.sidebar?.[key],
      ko: koTranslations.sidebar?.[key],
      ja: jaTranslations.sidebar?.[key],
      mi: miTranslations.sidebar?.[key],
      bg: bgTranslations.sidebar?.[key],
      it: itTranslations.sidebar?.[key],
      "zh-cn": zhCnTranslations.sidebar?.[key],
      da: daTranslations.sidebar?.[key],
      pl: plTranslations.sidebar?.[key],
      "pt-br": ptBrTranslations.sidebar?.[key],
      sv: svTranslations.sidebar?.[key],
      tr: trTranslations.sidebar?.[key],
    },
    attrs: {},
    ...(badge ? { badge } : {}),
  };
}

/**
 * Helper function to create sidebar group items
 * @param {string} key - Translation key for the group label
 * @param {Array} items - Child items (links or groups) within this group
 * @param {boolean} collapsed - Whether the group should be collapsed by default
 * @returns {Object} Formatted sidebar group item
 */
function createGroup(key, items = [], collapsed = false) {
  const enLabel = enTranslations.sidebar?.[key] || key;
  return {
    label: enLabel,
    translations: {
      de: deTranslations.sidebar?.[key],
      nl: nlTranslations.sidebar?.[key],
      fr: frTranslations.sidebar?.[key],
      es: esTranslations.sidebar?.[key],
      uk: ukTranslations.sidebar?.[key],
      ko: koTranslations.sidebar?.[key],
      ja: jaTranslations.sidebar?.[key],
      mi: miTranslations.sidebar?.[key],
      bg: bgTranslations.sidebar?.[key],
      it: itTranslations.sidebar?.[key],
      "zh-cn": zhCnTranslations.sidebar?.[key],
      da: daTranslations.sidebar?.[key],
      pl: plTranslations.sidebar?.[key],
      "pt-br": ptBrTranslations.sidebar?.[key],
      sv: svTranslations.sidebar?.[key],
      tr: trTranslations.sidebar?.[key],
    },
    items,
    collapsed,
  };
}

// Sidebar configuration using translation keys
export const sidebar = [
  createLink("home", "/"),

  createGroup("introduction", [createLink("gettingStarted", "introduction")]),

  createGroup("secretLinks", [
    createLink("overview", "secret-links"),
    createLink("whyUseSecretLinks", "secret-links/why-use-secret-links"),
    createLink("useCases", "secret-links/use-cases"),
  ]),

  createGroup("customDomains", [
    createLink("overview", "custom-domains"),
    createLink("howItWorks", "custom-domains/how-it-works"),
    createLink("setupGuide", "custom-domains/setup-guide"),
    createLink("brandGuide", "custom-domains/brand-guide", {
      text: "Helpful!",
      variant: "tip",
      class: "small",
    }),
    createLink("comparePlans", "custom-domains/compare-plans"),
    createLink("useCases", "custom-domains/use-cases"),
  ]),

  createGroup("regions", [createLink("overview", "regions")]),

  createGroup("selfHosting", [
    createLink("overview", "self-hosting"),
    createLink("gettingStarted", "self-hosting/getting-started"),
    createLink("installationDeployment", "self-hosting/installation"),
    createLink("configurationReference", "self-hosting/configuration"),
    createLink("environmentVariables", "self-hosting/environment-variables"),
  ]),

  createGroup("restApi", [
    createLink("overview", "rest-api"),

    createGroup("v2", [createLink("overview", "rest-api/v2")]),

    createGroup("v1", [
      createLink("createSecrets", "rest-api/v1/create-secrets"),
      createLink("retrieveSecrets", "rest-api/v1/retrieve-secrets"),
      createLink("clientLibraries", "rest-api/v1/client-libraries"),
    ]),
  ]),

  createGroup("securityBestPractices", [
    createLink("overview", "security-best-practices"),
  ]),

  createGroup(
    "ourPrinciples",
    [
      createLink("overview", "principles"),
      createLink("privacyFirst", "principles/privacy-first"),
      createLink("trust", "principles/trust"),
      createLink("communication", "principles/communication"),
      createLink("dataMinimization", "principles/data-minimization"),
    ],
    true,
  ),

  createGroup(
    "translations",
    [
      createLink("overview", "translations"),
      createLink("styleGuide", "translations/guide"),
      createLink("glossary", "translations/glossary"),
    ],
    true,
  ),
];
