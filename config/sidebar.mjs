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

// Map of Starlight locale code (BCP-47) -> that locale's translation bundle.
const localeTranslations = {
  de: deTranslations,
  nl: nlTranslations,
  fr: frTranslations,
  es: esTranslations,
  uk: ukTranslations,
  ko: koTranslations,
  ja: jaTranslations,
  mi: miTranslations,
  bg: bgTranslations,
  it: itTranslations,
  "zh-CN": zhCnTranslations,
  da: daTranslations,
  pl: plTranslations,
  "pt-BR": ptBrTranslations,
  sv: svTranslations,
  tr: trTranslations,
};

/**
 * Build the per-locale label overrides for a sidebar key.
 *
 * Only locales that actually have a translation for `key` are included.
 * Starlight's schema rejects `undefined` translation values, and for any
 * locale we omit it falls back to the default (English) `label`. This lets us
 * add English-only sidebar keys without breaking the build or hand-editing
 * all 16 non-English locale files first — the translation pipeline fills them
 * in later.
 * @param {string} key - Translation key for the label
 * @returns {Record<string, string>} Locale -> translated label
 */
function buildTranslations(key) {
  const translations = {};
  for (const [locale, bundle] of Object.entries(localeTranslations)) {
    const value = bundle.sidebar?.[key];
    if (value !== undefined) {
      translations[locale] = value;
    }
  }
  return translations;
}

/**
 * Helper function to create sidebar link items with required attrs
 * @param {string} key - Translation key for the label
 * @param {string} link - URL path for the link
 * @param {Object} [badge] - Optional badge configuration
 * @returns {Object} Formatted sidebar link item
 *
 * Note: Translation keys must use BCP-47 format (e.g., "zh-CN", "pt-BR")
 * to match Starlight's internal locale processing, even though locale keys
 * in i18n.mjs and directory names use lowercase (e.g., "zh-cn", "pt-br").
 */
function createLink(key, link, badge) {
  const enLabel = enTranslations.sidebar?.[key] || key;
  return {
    label: enLabel,
    link,
    translations: buildTranslations(key),
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
 *
 * Note: Translation keys must use BCP-47 format (e.g., "zh-CN", "pt-BR")
 * to match Starlight's internal locale processing, even though locale keys
 * in i18n.mjs and directory names use lowercase (e.g., "zh-cn", "pt-br").
 */
function createGroup(key, items = [], collapsed = false) {
  const enLabel = enTranslations.sidebar?.[key] || key;
  return {
    label: enLabel,
    translations: buildTranslations(key),
    items,
    collapsed,
  };
}

// ---------------------------------------------------------------------------
// Custom-domain, Identity Plus & Team Plus navigation
//
// Three product-oriented top-level groups:
//   - Custom Domains: setting up and branding a custom domain.
//   - Identity Plus:  the per-domain features included with the plan.
//   - Team Plus:      team/account capabilities — SSO today; Audit Log and
//                     Shared Dashboard are placeholders for upcoming team
//                     plans. NOTE: "Team Plus" is a working name; the roadmap
//                     currently says "Team plans (April 2026)".
// ---------------------------------------------------------------------------

const cdBaseLinks = () => [
  createLink("overview", "custom-domains"),
  createLink("howItWorks", "custom-domains/how-it-works"),
  createLink("setupGuide", "custom-domains/setup-guide"),
  createLink("brandGuide", "custom-domains/brand-guide", {
    text: "★",
    variant: "tip",
    class: "small",
  }),
  createLink("useCases", "custom-domains/use-cases"),
];

const identityPlusLinks = () => [
  createLink("incomingSecrets", "custom-domains/incoming-secrets"),
  createLink("homepageSecrets", "custom-domains/homepage-secrets"),
  createLink("signupSettings", "custom-domains/signup-settings"),
  createLink("signinSettings", "custom-domains/signin-settings"),
  createLink("dnsValidation", "custom-domains/dns-validation"),
  createLink("privacyOptions", "custom-domains/privacy-options"),
];

const teamPlusLinks = () => [
  createLink("sso", "team/sso", { text: "★", variant: "tip", class: "small" }),
  createLink("auditLog", "team/audit-log"),
  createLink("sharedDashboard", "team/shared-dashboard"),
];

// Sidebar configuration using translation keys
export const sidebar = [
  createLink("home", "/"),

  createGroup("introduction", [
    createLink("gettingStarted", "introduction"),
    createLink("guides", "introduction/guides"),
  ]),

  createGroup("secretLinks", [
    createLink("overview", "secret-links"),
    createLink("whyUseSecretLinks", "secret-links/why-use-secret-links"),
    createLink("useCases", "secret-links/use-cases"),
    createLink("comparePlans", "pricing/compare-plans"),
  ]),

  createGroup("customDomains", cdBaseLinks()),

  createGroup("identityPlus", identityPlusLinks()),

  createGroup("teamPlus", teamPlusLinks()),

  createGroup("regions", [
    createLink("overview", "regions"),
    createLink("regionCA", "regions/canada"),
    createLink("regionEU", "regions/european-union"),
    createLink("regionNZ", "regions/new-zealand"),
    createLink("regionUK", "regions/united-kingdom"),
    createLink("regionUS", "regions/united-states"),
  ]),

  createGroup("selfHosting", [
    createLink("overview", "self-hosting"),
    createLink("gettingStarted", "self-hosting/getting-started"),
    createLink("installationDeployment", "self-hosting/installation"),
    createLink("configurationReference", "self-hosting/configuration"),
    createLink("environmentVariables", "self-hosting/environment-variables"),
    createLink("upgradingToV023", "self-hosting/upgrading-v0-23"),
    createLink("upgradingToV024", "self-hosting/upgrading-v0-24"),
  ]),

  createLink("restApi", "rest-api"),

  createGroup("resources", [
    createLink("clientLibraries", "resources/client-libraries"),
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
      createLink("universalGuidance", "translations/universal"),
      createLink("styleGuide", "translations/guide"),
      createLink("glossary", "translations/glossary"),
    ],
    true,
  ),
];
