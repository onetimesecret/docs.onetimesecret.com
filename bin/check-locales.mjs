#!/usr/bin/env node
//
// check-locales.mjs — keep src/content/docs locale directories and
// config/i18n.mjs in sync.
//
// A directory under src/content/docs that is not in i18nConfig.locales still
// builds and publishes, but gets no sidebar, no language picker entry and no
// Starlight EN fallback — the pages are live and unreachable. The reverse
// (configured locale with no directory) means the picker offers a language
// that 404s. Both fail here unless the directory is listed in
// config/unconfigured-locales.allow with a "# reason" comment.
//
// It also reports, without failing, every key in src/content/i18n/en.json that
// a configured locale's bundle lacks. A missing custom key falls back to
// English, a missing Starlight key to Starlight's own translation for that
// locale (where it ships one). Adding a key to en.json alone is the documented
// workflow (AGENTS.md), so a gap is not an error. It is reported so the next
// sync can find it: once a bundle is complete, nothing else notices it falling
// behind.
// Keys a bundle has and en.json does not are not reported; some are kept on
// purpose (AGENTS.md lists them).
//
// Usage: pnpm run check:locales
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { i18nConfig } from "../config/i18n.mjs";
import { configuredLocales, localeDirs, parseAllowlist, repoRoot } from "./lib/nav.mjs";

const ALLOWLIST = "config/unconfigured-locales.allow";
const BUNDLES = "src/content/i18n";

const configured = await configuredLocales();
const dirs = localeDirs();
const allowed = new Set();
const { entries, problems } = parseAllowlist(ALLOWLIST);

for (const { value: locale } of entries) {
  allowed.add(locale);
  if (configured.has(locale)) {
    problems.push(
      `stale allowlist entry "${locale}": now configured in config/i18n.mjs — remove it from ${ALLOWLIST}`,
    );
  } else if (!dirs.has(locale)) {
    problems.push(
      `stale allowlist entry "${locale}": src/content/docs/${locale} no longer exists — remove it from ${ALLOWLIST}`,
    );
  }
}

for (const locale of [...dirs].sort()) {
  if (configured.has(locale) || allowed.has(locale)) continue;
  problems.push(
    `unconfigured locale "${locale}": src/content/docs/${locale} publishes pages that no sidebar or language picker reaches — add it to config/i18n.mjs, delete the directory, or allowlist it with a reason in ${ALLOWLIST}`,
  );
}

for (const locale of [...configured].sort()) {
  if (dirs.has(locale)) continue;
  problems.push(
    `configured locale "${locale}": no src/content/docs/${locale} directory — the language picker offers a locale with no content`,
  );
}

// Dotted paths of every string, so nested `sidebar` and `nav` keys compare
// the same way as the flat `notFound.title` style.
const leafKeys = (object, prefix = "") =>
  Object.entries(object).flatMap(([key, value]) =>
    value !== null && typeof value === "object" ? leafKeys(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );
const bundlePath = (locale) => `${BUNDLES}/${locale}.json`;
const readBundle = (locale) => JSON.parse(readFileSync(join(repoRoot, bundlePath(locale)), "utf8"));

const enKeys = leafKeys(readBundle(i18nConfig.defaultLocale));
let warnings = 0;

for (const locale of [...configured].sort()) {
  if (locale === i18nConfig.defaultLocale) continue;
  if (!existsSync(join(repoRoot, bundlePath(locale)))) {
    warnings++;
    console.warn(`WARN: ${bundlePath(locale)} does not exist — every UI string and sidebar label in "${locale}" falls back to English`);
    continue;
  }
  const keys = new Set(leafKeys(readBundle(locale)));
  const missing = enKeys.filter((key) => !keys.has(key));
  if (missing.length === 0) continue;
  warnings++;
  console.warn(
    `WARN: ${bundlePath(locale)} lacks ${missing.length} of ${enKeys.length} keys in ${bundlePath(i18nConfig.defaultLocale)} (${missing.slice(0, 5).join(", ")}${missing.length > 5 ? ", …" : ""}) — each falls back per key until translated`,
  );
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(
  `check:locales OK — ${configured.size} configured locales, ${allowed.size} allowlisted content-only directories ` +
    `(${warnings} bundle${warnings === 1 ? "" : "s"} missing keys)`,
);
