#!/usr/bin/env node
//
// check-nav.mjs — verify the sidebar resolves, and that it is navigable.
//
// Four assertions, all of which Starlight leaves to the author:
//
//  1. Every link resolves. Starlight never validates this repo's manual
//     label+link sidebar entries, so dead links build green. Fails listing any
//     link with no page under src/content/docs/en or src/pages/en; warns on
//     links served only by src/pages, which have no locale fallback, for the
//     non-default locales config/redirects.mjs does not already cover.
//
//  2. No group is empty. An empty group renders as a heading with nothing under
//     it — dead furniture that reads as a broken build. It is what you are left
//     with after moving the last page out of a section and forgetting to delete
//     the group, and Starlight builds it happily.
//
//  3. No label appears twice. Until Phase 2 this sidebar had SEVEN entries
//     labelled "Overview" — plus two "Use Cases" and two "Getting Started" —
//     disambiguated only by which group they happened to sit under. That is
//     unusable as a flat search result and useless to a screen reader reading
//     links out of context, and nothing stopped it from happening or from
//     coming back.
//
//     Note the scope: those seven Overviews were one per group, so comparing
//     only against immediate siblings would have caught NONE of them. Labels
//     are therefore compared across the whole tree, and the two shapes get
//     different messages — two identical entries in one menu is a different
//     mistake from one label reused in seven places. Distinct labels that merely
//     look similar are fine: "Glossary of terms" under Start here and "Glossary"
//     under Translations & contributing are different strings and pass.
//
//     EN labels only. A non-EN label comes from that locale's bundle and falls
//     back to English per-key, so a locale mid-translation legitimately shows a
//     mix; failing on that would fire on the translation pipeline rather than
//     on the sidebar.
//
//  4. Every sidebar translation key exists. config/sidebar.mjs resolves a label
//     as `enTranslations.sidebar?.[key] || key`, so a mistyped key does not
//     throw and does not blank the entry — it ships the raw camelCase key as the
//     visible label. `createLink("instalWithDocker", …)` renders a sidebar entry
//     reading "instalWithDocker", and nothing else here would notice: assertion
//     1 validates the LINK, assertion 3 sees a typo as a distinct string, and
//     check:locales never opens src/content/i18n/*.json at all. Non-EN bundles
//     are not checked, for the same reason assertion 3 is EN-only: a missing
//     key there is a translation still in flight and falls back per-key.
//
// Usage: pnpm run check:nav
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { i18nConfig } from "../config/i18n.mjs";
import { createRedirectsConfig } from "../config/redirects.mjs";
import { sidebarKeys } from "../config/sidebar.mjs";

import {
  docsSlugs,
  normalizeLink,
  pagesSlugs,
  repoRoot,
  sidebarGroups,
  sidebarLinks,
} from "./lib/nav.mjs";

const EN_BUNDLE = "src/content/i18n/en.json";
const enSidebarLabels = JSON.parse(readFileSync(join(repoRoot, EN_BUNDLE), "utf8")).sidebar ?? {};

const nonDefaultLocales = Object.keys(i18nConfig.locales).filter(
  (locale) => locale !== i18nConfig.defaultLocale,
);

const docs = docsSlugs();
const pages = pagesSlugs();
const links = await sidebarLinks();
const groups = await sidebarGroups();
// Sets, so a slug linked from two sidebar groups is only reported once.
const dead = new Set();
const pagesOnly = new Set();
const problems = [];

// The src/pages warning below asks whether non-EN locales 404. config/redirects
// may already answer no — configGeneratorRedirects does exactly that for the
// EN-only Configuration Generator, and the warning's own text says "unless
// redirected in config/redirects.mjs" while never looking. A warning that fires
// whether or not the problem was solved is a warning nobody can clear, and a
// check with a permanent warning is a check people stop reading. So consult the
// table, and warn only about the locales it leaves uncovered.
//
// This buys check:nav a dependency on config/redirects.mjs, whose assertions
// run inside createRedirectsConfig() and THROW. Loading it must therefore not be
// able to take this checker down: a chained-redirect bug used to abort the
// module before assertions 1-4 ran, so one commit introducing both a bad
// redirect and a dead sidebar link reported only the redirect, and the dead link
// surfaced a fix-and-rerun cycle later. It is loaded here — after `problems`
// exists, so the failure can be REPORTED — and its absence only costs the
// src/pages coverage warning, which is skipped rather than emitted against an
// empty table.
let redirected = null;
try {
  redirected = new Set(Object.keys(createRedirectsConfig()).map((key) => key.replace(/\/+$/, "")));
} catch (error) {
  problems.push(
    `config/redirects.mjs did not load, so the src/pages locale coverage could not be checked (the sidebar assertions below still ran): ${error.message}`,
  );
}

const keys = [...new Set(sidebarKeys)].sort();
for (const key of keys) {
  if (enSidebarLabels[key] === undefined) {
    problems.push(
      `sidebar key "${key}" has no entry under "sidebar" in ${EN_BUNDLE} — config/sidebar.mjs falls back to the key itself, so this renders as a sidebar entry literally reading "${key}"; add the key to the bundle or fix the typo in config/sidebar.mjs`,
    );
  }
}

for (const link of links) {
  const slug = normalizeLink(link);
  // Docs win over pages: a slug with both a docs entry and an .astro page is
  // served by the docs route, which has the locale fallback — not a warning.
  if (docs.has(slug)) continue;
  (pages.has(slug) ? pagesOnly : dead).add(slug);
}

for (const slug of [...dead].sort()) {
  problems.push(
    `sidebar link "${slug}" matches no page in src/content/docs/en or src/pages/en — fix the link in config/sidebar.mjs or add the page`,
  );
}

const named = (path) => (path === "" ? "the top level" : `group "${path.slice(1)}"`);
const byLabel = new Map();

for (const { path, items } of groups) {
  if (path !== "" && items.length === 0) {
    problems.push(
      `${named(path)} has no items — an empty group renders as a heading with nothing under it; remove the createGroup call in config/sidebar.mjs or give it entries`,
    );
  }
  for (const item of items) {
    if (!byLabel.has(item.label)) byLabel.set(item.label, []);
    byLabel.get(item.label).push({ path, target: item.link ?? "(group)" });
  }
}

for (const [label, uses] of byLabel) {
  if (uses.length < 2) continue;
  const where = [...new Set(uses.map((use) => named(use.path)))];
  problems.push(
    where.length === 1
      ? `${where[0]} has ${uses.length} entries labelled "${label}" (${uses.map((u) => u.target).join(", ")}) — two identical entries in one menu cannot be told apart at all; give each a distinct translation key in config/sidebar.mjs and src/content/i18n/en.json`
      : `the label "${label}" is used ${uses.length} times, in ${where.join(", ")} (${uses.map((u) => u.target).join(", ")}) — a label that only means something once you know which group it sits under is unusable in a flat search result and to a screen reader reading links out of context; give each a distinct translation key in config/sidebar.mjs and src/content/i18n/en.json`,
  );
}

let warnings = 0;

for (const slug of redirected ? [...pagesOnly].sort() : []) {
  const uncovered = nonDefaultLocales.filter((locale) => !redirected.has(`/${locale}/${slug}`));
  if (uncovered.length === 0) continue;
  warnings++;
  console.warn(
    `WARN: sidebar link "${slug}" is served by src/pages and ${uncovered.length} of ${nonDefaultLocales.length} non-default locales have no redirect for it (${uncovered.slice(0, 3).join(", ")}${uncovered.length > 3 ? ", …" : ""}) — those readers 404; add a fan-out in config/redirects.mjs`,
  );
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(
  `check:nav OK — ${links.length} sidebar links resolve across ${groups.length - 1} groups, ` +
    `${keys.length} labels come from ${EN_BUNDLE} ` +
    `(${warnings} warning${warnings === 1 ? "" : "s"})`,
);
