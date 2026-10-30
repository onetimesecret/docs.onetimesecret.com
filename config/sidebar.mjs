// config/sidebar.mjs
import { existsSync, readFileSync } from "fs";
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

// Extensions Starlight's docsLoader picks up, as in bin/lib/nav.mjs.
const DOC_EXTS = ["md", "mdx", "mdoc", "markdown"];
const enDocsRoot = join(__dirname, "../src/content/docs/en");

/**
 * Whether the English page a sidebar link points at sets `draft: true`.
 *
 * One sidebar serves every locale, so the English page decides for all of
 * them. A link with no page behind it (a src/pages route, an external URL) is
 * never a draft. Like bin/check-textprov.mjs, this matches the literal
 * `draft: true` line in the frontmatter block rather than parsing YAML.
 *
 * @param {string} link - Sidebar link ("/", "start", "start/glossary")
 * @param {string} [root] - Docs collection root to resolve the link against
 * @returns {boolean}
 */
export function isDraftLink(link, root = enDocsRoot) {
  const slug = link.replace(/^\/+|\/+$/g, "");
  const bases = slug === "" ? ["index"] : [slug, `${slug}/index`];
  for (const base of bases) {
    for (const ext of DOC_EXTS) {
      const path = join(root, `${base}.${ext}`);
      if (!existsSync(path)) continue;
      const frontmatter = readFileSync(path, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return Boolean(frontmatter && /^draft:\s*true\s*$/m.test(frontmatter[1]));
    }
  }
  return false;
}

/**
 * Drop links to draft pages, then any group left with no items.
 *
 * Starlight leaves draft pages out of production builds, but a `link` item is
 * a plain URL it never checks against the docs collection: without this, the
 * entry would stay in the sidebar and lead to a 404.
 *
 * @param {Array} items - Sidebar items (links and groups)
 * @param {(link: string) => boolean} [isDraft] - Draft test for a link
 * @returns {Array} The items that still have a page to show
 */
export function pruneDrafts(items, isDraft = isDraftLink) {
  return items.flatMap((item) => {
    if (item.items) {
      const kept = pruneDrafts(item.items, isDraft);
      return kept.length > 0 ? [{ ...item, items: kept }] : [];
    }
    return item.link && isDraft(item.link) ? [] : [item];
  });
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
// NOTE: Link order is defined here, not in frontmatter.
//
// Groups nest: Starlight's ManualSidebarGroupSchema accepts a group inside
// another group's `items` (schemas/sidebar.ts), and createGroup passes `items`
// straight through, so no helper change was needed for the two-level sections.
// "Using Onetime Secret" and "Self-hosting" nest; nothing goes deeper.
//
// Labels are sentence case ("Send your first secret", "Upgrade guides"), with
// proper nouns and acronyms kept as written (Docker, Linux, TLS, DNS, SSO,
// REST API). The label lives in src/content/i18n/en.json, not here.
//
// Every link label is a distinct translation key. "Overview" used to appear
// seven times, disambiguated only by which group it happened to be under, which
// made the sidebar unusable as a flat search result and useless to a screen
// reader reading the links out of context. Each index page now says what it is.
//
// Pages with `draft: true` in frontmatter are skipped on the live site, but
// visible in dev with a callout warning. Links to draft pages are automatically
// pruned from the sidebar, but if a draft page is linked from a non-draft page we
// leave its link here. Production builds drop the link (see pruneDrafts); the
// dev server and the check:* scripts still see it, so check:orphans passes.
// ---------------------------------------------------------------------------
const entries = [
  createLink("home", "/"),

  createGroup("startHere", [
    createLink("whereToBegin", "start"),
    createLink("sendYourFirstSecret", "start/send-your-first-secret"),
    createLink("glossary", "start/glossary"),
    createLink("hostingChoice", "start/hosted-or-self-hosted"),
  ]),

  createGroup("usingOnetimeSecret", [
    createGroup("sharingSecrets", [
      createLink("shareASecret", "share"),
      createLink("yourReceipt", "share/your-receipt"),
      createLink("whatRecipientsSee", "share/what-recipients-see"),
      createLink("whenALinkDoesntWork", "share/when-a-link-doesnt-work"),
      createLink("requestSecret", "share/request-secret"),
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
      // Only the label changed (auditLog → secretActivity); the slug stays so
      // existing audit-trail links keep working without a redirect. Contrast
      // share/request-secret, which replaced receiving-secrets and redirects.
      createLink("secretActivity", "organizations/audit-trail"),
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
    // entries with one would be circular. The two pricing pages follow the
    // docs snapshot of the billing catalog; merging both into billing/index
    // waits on the production catalog. The billing pages describe the
    // mechanism and assert no plan contents.
    createGroup("plansAndBilling", [
      createLink("howPlansWork", "billing"),
      createLink("managingYourSubscription", "billing/managing-your-subscription"),
      createLink("plansAndPricing", "pricing"),
      createLink("comparePlans", "pricing/compare-plans"),
    ]),
  ]),

  // The version-specific upgrade guides (self-hosting/upgrading-v0-*) are NOT
  // listed. They are reached from the table on self-hosting/upgrade-guides,
  // and bin/check-orphans.mjs counts a page linked from a sidebar-linked page
  // in the same directory as reachable, so a new release guide needs a row in
  // that table and nothing here. The named IdP recipes use the same pattern:
  // configure/sso/index links its siblings without adding sidebar entries.
  createGroup("selfHosting", [
    createLink("aboutSelfHosting", "self-hosting"),
    createLink("authModeChoice", "self-hosting/simple-or-full-auth"),

    createGroup("installationDeployment", [
      createLink("imagesAndVariants", "install/images-and-variants"),
      createLink("installWithDocker", "install/docker"),
      createLink("installOnLinux", "install/linux"),
      createLink("runAsAService", "install/run-as-a-service"),
      createLink("reverseProxyAndTls", "install/reverse-proxy-and-tls"),
      createLink("verifyYourInstall", "install/verify"),
    ]),

    createGroup("configuration", [
      createLink("configurationOverview", "configure"),
      createLink("configureSecretsAndKeys", "configure/secrets-and-keys"),
      createLink("configureEmail", "configure/email"),
      createLink("configureSessions", "configure/sessions-and-cookies"),
      createLink("configureAuthentication", "configure/authentication"),
      createLink("configureSso", "configure/sso"),
      createLink("configureSecurityHeaders", "configure/security-headers"),
      createLink("configureSecretOptions", "configure/secret-options"),
    ]),

    createGroup("operate", [
      createLink("operateDatastore", "operate/datastore"),
      createLink("operateBackups", "operate/backup-and-key-rotation"),
      createLink("operateHealth", "operate/health-and-monitoring"),
      createLink("operateAdminConsole", "operate/admin-console"),
      createLink("operateBackgroundJobs", "operate/background-jobs"),
      createLink("operateQueues", "operate/queues-and-dlq"),
      createLink("operateScheduledJobs", "operate/scheduled-and-maintenance-jobs"),
      createLink("operateScaleAndTune", "operate/scale-and-tune"),
      createLink("operateLogging", "operate/logging-and-error-tracking"),
      createLink("operateRateLimits", "operate/rate-limits-and-network-access"),
      createLink("operateOwnershipTransfer", "operate/ownership-transfer"),
      createLink("operateHardening", "operate/harden-your-deployment"),
    ]),

    // Troubleshooting pages are organized by symptom-led diagnosis. Someone
    // looks for the symptom, not for the directory it happens to be stored in.
    createGroup("troubleshootAndUpgrade", [
      createLink("troubleshootBootFailures", "troubleshoot/boot-failures"),
      createLink("troubleshootSignIn", "troubleshoot/sign-in-and-signup-problems"),
      createLink("upgradeDataMigrations", "upgrades/data-migrations"),
      createLink("upgradeGuides", "self-hosting/upgrade-guides"),
    ]),
  ]),

  createGroup("apiAndSdks", [
    createLink("restApi", "api"),
    createLink("clientLibraries", "api/client-libraries"),
  ]),

  // Reference documents are generated from the onetimesecret codebase and its
  // default configuration.
  createGroup("reference", [
    createLink("referenceOverview", "reference"),
    createLink("configurationFilesReference", "reference/configuration-files-and-precedence"),
    createLink("siteAndInterfaceReference", "reference/site-and-interface"),
    createLink("featuresAndBrandingReference", "reference/features-and-branding"),
    createLink("datastoreAndQueuesReference", "reference/datastore-and-queues"),
    createLink("emailAndDeliveryReference", "reference/email-and-delivery"),
    createLink("ancillaryFilesReference", "reference/auth-logging-and-billing-files"),
    createLink("environmentVariablesReference", "reference/environment-variables"),
    createLink("configurationGenerator", "reference/generator"),
    createLink("cliReference", "reference/cli"),
    createLink("scheduledJobsReference", "reference/scheduled-jobs"),
    createLink("healthEndpointsReference", "reference/health-endpoints"),
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
      createLink("textProvenance", "contribute/text-provenance"),
      createLink("howTranslationsWork", "translations"),
      createLink("styleGuide", "translations/guide"),
      createLink("translationGlossary", "translations/glossary"),
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

// `astro build` sets NODE_ENV to "production" before it loads this config.
export const sidebar = process.env.NODE_ENV === "production" ? pruneDrafts(entries) : entries;

/**
 * The translation keys `sidebar` above was built from, populated as a side
 * effect of the createLink/createGroup calls in it. Declared after the array so
 * it is complete when a consumer imports it.
 *
 * @type {readonly string[]}
 */
export const sidebarKeys = Object.freeze([...requestedKeys]);
