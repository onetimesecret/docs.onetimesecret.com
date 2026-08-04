// bin/lib/nav.mjs
//
// Shared slug and locale collection for the bin/check-*.mjs drift checks.
// Plain Node ESM, zero dependencies; paths resolve relative to this file so
// the scripts work from any cwd.
import { existsSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Same extensions Starlight's docsLoader picks up.
const DOC_EXT = /\.(md|mdx|mdoc|markdown)$/;

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** Normalize a sidebar link ("/", "/foo/", "foo") to a slug ("index", "foo"). */
export function normalizeLink(link) {
  const slug = link.replace(/^\/+|\/+$/g, "");
  return slug === "" ? "index" : slug;
}

/** Every `link` value in config/sidebar.mjs, recursing into group `items`. */
export async function sidebarLinks() {
  const url = pathToFileURL(join(repoRoot, "config", "sidebar.mjs")).href;
  const { sidebar } = await import(url);
  const links = [];
  const collect = (items) => {
    for (const item of items) {
      if (item.link) links.push(item.link);
      if (item.items) collect(item.items);
    }
  };
  collect(sidebar);
  return links;
}

/**
 * Slugs of every EN docs page, mirroring Starlight's docsLoader: *.md|mdx|
 * mdoc|markdown under src/content/docs/en, basenames starting with "_"
 * excluded, trailing "/index" collapsing to the directory (root index.mdoc
 * stays "index").
 */
export function docsSlugs() {
  const dir = join(repoRoot, "src", "content", "docs", "en");
  const slugs = new Set();
  for (const path of walk(dir)) {
    if (!DOC_EXT.test(path) || basename(path).startsWith("_")) continue;
    const slug = relative(dir, path).replace(DOC_EXT, "");
    slugs.add(slug === "index" ? "index" : slug.replace(/\/index$/, ""));
  }
  return slugs;
}

/** Slugs of EN custom pages (src/pages/en/**\/*.astro). */
export function pagesSlugs() {
  const dir = join(repoRoot, "src", "pages", "en");
  const slugs = new Set();
  if (!existsSync(dir)) return slugs;
  for (const path of walk(dir)) {
    if (!path.endsWith(".astro")) continue;
    const slug = relative(dir, path).replace(/\.astro$/, "");
    slugs.add(slug === "index" ? "index" : slug.replace(/\/index$/, ""));
  }
  return slugs;
}

/** Locale codes declared in config/i18n.mjs, including the default locale. */
export async function configuredLocales() {
  const url = pathToFileURL(join(repoRoot, "config", "i18n.mjs")).href;
  const { i18nConfig } = await import(url);
  return new Set(Object.keys(i18nConfig.locales));
}

/** Locale directory names present under src/content/docs. */
export function localeDirs() {
  const dir = join(repoRoot, "src", "content", "docs");
  return new Set(
    readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );
}
