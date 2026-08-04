#!/usr/bin/env node
//
// check-nav.mjs — verify every sidebar link resolves to a real EN page.
//
// Starlight never validates this repo's manual label+link sidebar entries,
// so dead links build green. Fails (exit 1) listing any link with no page
// under src/content/docs/en or src/pages/en; warns (exit 0) on links served
// only by src/pages, which have no locale fallback for non-EN locales.
//
// Usage: pnpm run check:nav
import { docsSlugs, normalizeLink, pagesSlugs, sidebarLinks } from "./lib/nav.mjs";

const docs = docsSlugs();
const pages = pagesSlugs();
const links = await sidebarLinks();
// Sets, so a slug linked from two sidebar groups is only reported once.
const dead = new Set();
const pagesOnly = new Set();

for (const link of links) {
  const slug = normalizeLink(link);
  // Docs win over pages: a slug with both a docs entry and an .astro page is
  // served by the docs route, which has the locale fallback — not a warning.
  if (docs.has(slug)) continue;
  (pages.has(slug) ? pagesOnly : dead).add(slug);
}

for (const slug of pagesOnly) {
  console.warn(
    `WARN: sidebar link "${slug}" is served by src/pages, no locale fallback — non-EN locales 404 unless redirected in config/redirects.mjs`,
  );
}

if (dead.size > 0) {
  for (const slug of dead) {
    console.error(
      `FAIL: sidebar link "${slug}" matches no page in src/content/docs/en or src/pages/en — fix the link in config/sidebar.mjs or add the page`,
    );
  }
  process.exit(1);
}

console.log(
  `check:nav OK — ${links.length} sidebar links resolve (${pagesOnly.size} warning${pagesOnly.size === 1 ? "" : "s"})`,
);
