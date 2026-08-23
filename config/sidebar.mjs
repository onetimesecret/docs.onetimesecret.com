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

// Every translation key the sidebar below asks for, in call order.
//
// createLink and createGroup both resolve a label as `sidebar?.[key] || key`,
// which means a mistyped key neither throws nor blanks the entry: it renders the
// raw camelCase key as the visible label. bin/check-nav.mjs reads this array and
// fails on any key with no entry in src/content/i18n/en.json, which is the only
// thing that catches the typo before someone looks at the rendered sidebar.
const requestedKeys = [];

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
  requestedKeys.push(key);
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
  requestedKeys.push(key);
  const enLabel = enTranslations.sidebar?.[key] || key;
  return {
    label: enLabel,
    translations: buildTranslations(key),
    items,
    collapsed,
  };
}

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
      createLink("receivingSecrets", "share/receiving-secrets"),
      createLink("whyUseSecretLinks", "share/why-secret-links"),
      createLink("useCases", "share/use-cases"),
    ]),

    createGroup("yourAccount", [
      createLink("signingIn", "account/signing-in"),
      createLink("twoFactorAndPasskeys", "account/two-factor-and-passkeys"),
      createLink("sessionsAndIdentities", "account/sessions-and-identities"),
      createLink("dashboardAndRecentSecrets", "account/dashboard-and-recent-secrets"),
      createLink("preferences", "account/preferences"),
      createLink("changeYourEmail", "account/change-your-email"),
      createLink("switchingRegions", "account/change-your-region"),
      createLink("closeYourAccount", "account/close-your-account"),
    ]),

    createGroup("organizations", [
      createLink("whatOrganizationsDo", "organizations"),
      createLink("rolesAndPermissions", "organizations/roles-and-permissions"),
      createLink("memberInvites", "organizations/inviting-members"),
      createLink("ownershipAndTransfer", "organizations/ownership-and-transfer"),
      createLink("sso", "organizations/sso"),
      createLink("auditLog", "organizations/audit-trail"),
    ]),

    createGroup("customDomains", [
      createLink("whatCustomDomainsDo", "custom-domains"),
      createLink("setupGuide", "custom-domains/setup-guide"),
      createLink("dnsValidation", "custom-domains/dns-validation"),
      createLink("brandGuide", "custom-domains/branding"),
      createLink("emailSender", "custom-domains/email-sender"),
      createLink("homepageAndIncoming", "custom-domains/homepage-and-incoming"),
      createLink("accessAndPrivacy", "custom-domains/access-and-privacy"),
    ]),

    // No badges here: this group is *about* the tiers, so labelling its own
    // entries with one would be circular. The two pricing pages are carried
    // across unchanged pending the production billing catalog — the merge of
    // both into billing/index is what the catalog gates, not the existence of
    // the billing pages, which describe the mechanism and assert no plan
    // contents.
    createGroup("plansAndBilling", [
      createLink("howPlansWork", "billing"),
      createLink("managingYourSubscription", "billing/managing-your-subscription"),
      createLink("plansAndPricing", "pricing"),
      createLink("comparePlans", "pricing/compare-plans"),
    ]),
  ]),

  createGroup("selfHosting", [
    // Install & deploy. The first two are orientation and the one decision that
    // changes what you install; the six install/* pages are the split of the
    // retired self-hosting/installation (Phase 3) in the order a first-time
    // operator meets them. install/ has no index page on purpose — nothing
    // links to /en/install/ and the group IS the index.
    //
    // Order is array position, not a number. createLink/createGroup emit no
    // `order` key and there is no autogenerate group anywhere in this repo, so
    // Starlight renders this array as written and adding a group later is a
    // pure splice that renumbers nothing.
    //
    // For the same reason the install/* pages carry no `sidebar.order` in their
    // frontmatter. Starlight only reads that key for an autogenerate group;
    // under a manual array it is inert, and an inert number that disagrees with
    // the array below is worse than no number at all — it reads as the source of
    // truth to the next editor. Reorder here, not in frontmatter.
    createGroup("installAndDeploy", [
      createLink("aboutSelfHosting", "self-hosting"),
      createLink("authModeChoice", "self-hosting/simple-or-full-auth"),
      createLink("imagesAndVariants", "install/images-and-variants"),
      createLink("installWithDocker", "install/docker"),
      createLink("installOnLinux", "install/linux"),
      createLink("runAsAService", "install/run-as-a-service"),
      createLink("reverseProxyAndTls", "install/reverse-proxy-and-tls"),
      createLink("verifyYourInstall", "install/verify"),
    ]),

    // Configure. The three entries below are the surviving reference pages;
    // Phase 4 retires them as movedPages families. The task-shaped configure/*
    // pages are appended ABOVE them when they land — tasks first, reference
    // last.
    createGroup("configure", [
      createLink("configurationReference", "self-hosting/configuration"),
      createLink("configurationGenerator", "self-hosting/configuration-generator"),
      createLink("environmentVariables", "self-hosting/environment-variables"),
    ]),

    // A createGroup("features", [...]) call goes here when the first features/*
    // page lands. It is NOT added empty: bin/check-nav.mjs:68-72 fails on a
    // group with no items.

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
      createLink("developerOnRamp", "contribute/developer-on-ramp"),
      createLink("howTranslationsWork", "translations"),
      createLink("styleGuide", "translations/guide"),
      createLink("glossary", "translations/glossary"),
      createLink("universalGuidance", "translations/universal"),
      createLink("translatingSecret", "translations/universal/secret-concept"),
      createLink("passwordVsPassphrase", "translations/universal/password-passphrase"),
      createLink("brandTerms", "translations/universal/brand-terms"),
      createLink("voiceAndTone", "translations/universal/voice-and-tone"),
      createLink("qualityChecklist", "translations/universal/quality-checklist"),
    ],
    true,
  ),
];

/**
 * The translation keys `sidebar` above was built from, populated as a side
 * effect of the createLink/createGroup calls in it. Declared after the array so
 * it is complete when a consumer imports it.
 *
 * @type {readonly string[]}
 */
export const sidebarKeys = Object.freeze([...requestedKeys]);
