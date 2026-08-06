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
// Plan tier as a badge, not as navigation
//
// Until Phase 2 this file grouped pages by billing entitlement: four top-level
// groups (Custom Domains / Free Plan / Identity Plus / Team Plus) that a reader
// had to already know the tier of to find a feature in. That filing rule is
// gone. A tier is an attribute of a page, not a place — so the pages are filed
// by what a reader is trying to do, and the tier rides along as a badge.
//
// The badge is a MECHANICAL CARRY-ACROSS of the group each page already sat
// under. Nothing here asserts, corrects or re-tiers an entitlement: the
// production etc/billing.yaml is the only source of truth for what a plan
// contains, and it lives outside this repo. Do not add, remove or change a
// badge without reading it.
//
// Starlight allows exactly one badge per sidebar entry (see
// @astrojs/starlight/schemas/badge.ts — `text` is a single string or a
// per-locale record). The two pages that already carried a ★ therefore carry
// star and tier in one badge text rather than losing either.
// ---------------------------------------------------------------------------

/**
 * Badge marking the billing tier a page's subject belongs to.
 * @param {"Free"|"Identity Plus"|"Team Plus"} tier
 * @returns {{text: string, variant: string, class: string}}
 */
const planBadge = (tier) => ({ text: tier, variant: "note", class: "small" });

/**
 * Plan badge for a page that also carries the pre-existing ★ highlight.
 * @param {"Free"|"Identity Plus"|"Team Plus"} tier
 * @returns {{text: string, variant: string, class: string}}
 */
const starredPlanBadge = (tier) => ({
  text: `★ ${tier}`,
  variant: "tip",
  class: "small",
});

// ---------------------------------------------------------------------------
// Sidebar configuration using translation keys
//
// Seven top-level entries. An eighth, the generated Reference, lands in Phase 4.
//
// Groups nest: Starlight's ManualSidebarGroupSchema accepts a group inside
// another group's `items` (schemas/sidebar.ts), and createGroup passes `items`
// straight through, so no helper change was needed for the two-level sections.
//
// Every link label is a distinct translation key. "Overview" used to appear
// seven times, disambiguated only by which group it happened to be under, which
// made the sidebar unusable as a flat search result and useless to a screen
// reader reading the links out of context. Each index page now says what it is.
// ---------------------------------------------------------------------------
export const sidebar = [
  createLink("home", "/"),

  createGroup("startHere", [
    createLink("whereToBegin", "start"),
    createLink("sendYourFirstSecret", "start/send-your-first-secret"),
    createLink("glossaryOfTerms", "start/glossary"),
    createLink("hostingChoice", "start/hosted-or-self-hosted"),
    createLink("runYourOwnInstance", "start/run-your-own-instance"),
  ]),

  createGroup("usingOnetimeSecret", [
    createGroup("sharingSecrets", [
      createLink("shareASecret", "share"),
      createLink("yourReceipt", "share/your-receipt"),
      createLink("whatRecipientsSee", "share/what-recipients-see"),
      createLink("whenALinkDoesntWork", "share/when-a-link-doesnt-work"),
      createLink("whyUseSecretLinks", "share/why-secret-links"),
      createLink("useCases", "share/use-cases"),
    ]),

    createGroup("yourAccount", [
      createLink("signingIn", "account/signing-in"),
      createLink("twoFactorAndPasskeys", "account/two-factor-and-passkeys"),
      createLink("sessionsAndIdentities", "account/sessions-and-identities"),
      createLink(
        "dashboardAndRecentSecrets",
        "account/dashboard-and-recent-secrets",
      ),
      createLink("preferences", "account/preferences"),
      createLink("changeYourEmail", "account/change-your-email"),
      createLink("switchingRegions", "account/change-your-region"),
      createLink("closeYourAccount", "account/close-your-account"),
    ]),

    createGroup("organizations", [
      createLink("whatOrganizationsDo", "organizations"),
      createLink(
        "memberInvites",
        "organizations/inviting-members",
        planBadge("Identity Plus"),
      ),
      createLink("sso", "organizations/sso", starredPlanBadge("Team Plus")),
      createLink(
        "auditLog",
        "organizations/audit-trail",
        planBadge("Team Plus"),
      ),
    ]),

    createGroup("customDomains", [
      createLink("whatCustomDomainsDo", "custom-domains"),
      createLink("setupGuide", "custom-domains/setup-guide"),
      createLink("dnsValidation", "custom-domains/dns-validation"),
      createLink(
        "brandGuide",
        "custom-domains/branding",
        starredPlanBadge("Identity Plus"),
      ),
      createLink(
        "emailSender",
        "custom-domains/email-sender",
        planBadge("Identity Plus"),
      ),
      createLink(
        "homepageAndIncoming",
        "custom-domains/homepage-and-incoming",
        planBadge("Free"),
      ),
      createLink(
        "accessAndPrivacy",
        "custom-domains/access-and-privacy",
        planBadge("Identity Plus"),
      ),
    ]),

    // No badges here: this group is *about* the tiers, so labelling its own
    // entries with one would be circular. Both pages are carried across
    // unchanged pending the production billing catalog.
    createGroup("plansAndBilling", [
      createLink("plansAndPricing", "pricing"),
      createLink("comparePlans", "pricing/compare-plans"),
    ]),
  ]),

  createGroup("selfHosting", [
    createGroup("installAndDeploy", [
      createLink("aboutSelfHosting", "self-hosting"),
      createLink("authModeChoice", "self-hosting/simple-or-full-auth"),
      createLink("installationDeployment", "self-hosting/installation"),
    ]),

    createGroup("configure", [
      createLink("configurationReference", "self-hosting/configuration"),
      createLink(
        "configurationGenerator",
        "self-hosting/configuration-generator",
      ),
      createLink("environmentVariables", "self-hosting/environment-variables"),
    ]),

    createGroup("troubleshootAndUpgrade", [
      createLink("upgradingToV024", "self-hosting/upgrading-v0-24"),
      createLink("upgradingToV023", "self-hosting/upgrading-v0-23"),
    ]),
  ]),

  createGroup("apiAndSdks", [
    createLink("restApi", "api"),
    createLink("clientLibraries", "api/client-libraries"),
  ]),

  createGroup("securityTrust", [
    createLink("ourApproachToSecurity", "security"),
    createLink("dataProtection", "security/data-protection"),
    createLink("whereYourDataLives", "security/where-your-data-lives"),
    createLink("securityBestPractices", "security/best-practices"),
    createLink("ourPrinciples", "security/our-principles"),
    createLink("vulnerabilityDisclosure", "security/vulnerability-disclosure"),
  ]),

  createGroup(
    "translations",
    [
      createLink("howTranslationsWork", "translations"),
      createLink("styleGuide", "translations/guide"),
      createLink("glossary", "translations/glossary"),
      createLink("universalGuidance", "translations/universal"),
      createLink("translatingSecret", "translations/universal/secret-concept"),
      createLink(
        "passwordVsPassphrase",
        "translations/universal/password-passphrase",
      ),
      createLink("brandTerms", "translations/universal/brand-terms"),
      createLink("voiceAndTone", "translations/universal/voice-and-tone"),
      createLink("qualityChecklist", "translations/universal/quality-checklist"),
    ],
    true,
  ),
];
