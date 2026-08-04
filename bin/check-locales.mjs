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
// Usage: pnpm run check:locales
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { configuredLocales, localeDirs, repoRoot } from "./lib/nav.mjs";

const ALLOWLIST = "config/unconfigured-locales.allow";
const allowlistPath = join(repoRoot, ALLOWLIST);

const configured = await configuredLocales();
const dirs = localeDirs();
const allowed = new Set();
const problems = [];

const lines = existsSync(allowlistPath)
  ? readFileSync(allowlistPath, "utf8").split("\n")
  : [];
for (const [i, raw] of lines.entries()) {
  const line = raw.trim();
  if (line === "" || line.startsWith("#")) continue;
  const match = line.match(/^(\S+)\s+#\s*(\S.*)$/);
  if (!match) {
    problems.push(`${ALLOWLIST}:${i + 1}: entry needs a trailing "# reason" comment: "${line}"`);
    continue;
  }
  const locale = match[1];
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

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(
  `check:locales OK — ${configured.size} configured locales, ${allowed.size} allowlisted content-only directories`,
);
