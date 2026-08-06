#!/usr/bin/env node
//
// check-nav.mjs — verify the sidebar resolves, and that it is navigable.
//
// Three assertions, all of which Starlight leaves to the author:
//
//  1. Every link resolves. Starlight never validates this repo's manual
//     label+link sidebar entries, so dead links build green. Fails listing any
//     link with no page under src/content/docs/en or src/pages/en; warns on
//     links served only by src/pages, which have no locale fallback for non-EN
//     locales.
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
// Usage: pnpm run check:nav
import { docsSlugs, normalizeLink, pagesSlugs, sidebarGroups, sidebarLinks } from "./lib/nav.mjs";

const docs = docsSlugs();
const pages = pagesSlugs();
const links = await sidebarLinks();
const groups = await sidebarGroups();
// Sets, so a slug linked from two sidebar groups is only reported once.
const dead = new Set();
const pagesOnly = new Set();
const problems = [];

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

for (const slug of pagesOnly) {
  console.warn(
    `WARN: sidebar link "${slug}" is served by src/pages, no locale fallback — non-EN locales 404 unless redirected in config/redirects.mjs`,
  );
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(
  `check:nav OK — ${links.length} sidebar links resolve across ${groups.length - 1} groups ` +
    `(${pagesOnly.size} warning${pagesOnly.size === 1 ? "" : "s"})`,
);
