#!/usr/bin/env node
//
// check-textprov.mjs — fail when a built page breaks the TextProv enrollment
// contract. Run after `pnpm build`; it reads dist/.
//
// An enrolled page (frontmatter `textprov: true`) is decoded by the middleware
// only when its HTML carries the marker TextProvMarker.astro emits. Without
// it the page ships its raw U+E0101 selectors, which is the failure the
// checks below exist to catch:
//
//  1. Every expected enrolled page exists in dist/ and has exactly one marker.
//     Expected pages are each locale's own enrolled files plus, for a locale
//     missing a translation, Starlight's English fallback of an enrolled EN
//     page. The site root (src/pages/index.astro) re-renders the EN homepage
//     and is expected when that page is enrolled.
//  2. No page in dist/ has more than one marker.
//  3. No page with a marker still contains U+E0101. Pages without a marker are
//     not scanned: the selector is a real Unicode variation selector and may
//     appear legitimately in text that was never enrolled.
//
// Usage: pnpm run check:textprov
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { i18nConfig } from "../config/i18n.mjs";

const repoRoot = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const CONTENT = join(repoRoot, "src", "content", "docs");
const DIST = join(repoRoot, "dist");
const DOC_EXT = /\.(md|mdx|mdoc|markdown)$/;
const MARKER = /data-textprov-document="true"/g;
const SELECTOR = "\u{E0101}";

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** Top-level `textprov: true` in the frontmatter block. */
function isEnrolled(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return Boolean(match && /^textprov:\s*true\s*$/m.test(match[1]));
}

/** slug -> enrolled, for every doc under one locale directory. */
function localePages(locale) {
  const dir = join(CONTENT, locale);
  const pages = new Map();
  if (!existsSync(dir)) return pages;
  for (const path of walk(dir)) {
    if (!DOC_EXT.test(path) || basename(path).startsWith("_")) continue;
    const slug = relative(dir, path).replaceAll("\\", "/").replace(DOC_EXT, "").replace(/(^|\/)index$/, "");
    pages.set(slug, isEnrolled(readFileSync(path, "utf8")));
  }
  return pages;
}

if (!existsSync(DIST)) {
  console.error("check:textprov FAIL — dist/ not found; run `pnpm build` first");
  process.exit(1);
}

const defaultLocale = i18nConfig.defaultLocale;
const locales = Object.keys(i18nConfig.locales);
const defaultPages = localePages(defaultLocale);

// Expected enrolled output files, relative to dist/.
const expected = new Set();
for (const locale of locales) {
  const own = locale === defaultLocale ? defaultPages : localePages(locale);
  const slugs = new Set([...own.keys(), ...defaultPages.keys()]);
  for (const slug of slugs) {
    const enrolled = own.has(slug) ? own.get(slug) : defaultPages.get(slug);
    if (enrolled) expected.add(join(locale, slug, "index.html"));
  }
}
if (defaultPages.get("")) expected.add("index.html");

const failures = [];
let withMarker = 0;
const seen = new Set();
for (const path of walk(DIST)) {
  if (!path.endsWith(".html")) continue;
  const rel = relative(DIST, path);
  const html = readFileSync(path, "utf8");
  const markers = (html.match(MARKER) ?? []).length;
  if (markers > 1) failures.push(`${rel}: ${markers} enrollment markers`);
  if (markers === 0) continue;
  withMarker += 1;
  seen.add(rel);
  if (html.includes(SELECTOR)) failures.push(`${rel}: enrolled page still contains U+E0101`);
}
for (const rel of expected) {
  if (!seen.has(rel)) failures.push(`${rel}: enrolled page ${existsSync(join(DIST, rel)) ? "has no enrollment marker" : "was not built"}`);
}

if (failures.length) {
  console.error(`check:textprov FAIL — ${failures.length} problem(s):`);
  for (const line of failures) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`check:textprov OK — ${withMarker} enrolled pages in dist/ (${expected.size} expected), one marker each, no raw selectors`);
