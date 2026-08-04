// bin/lib/nav.mjs
//
// Shared slug and locale collection for the bin/check-*.mjs drift checks.
// Plain Node ESM, zero dependencies; paths resolve relative to this file so
// the scripts work from any cwd.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
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

/**
 * Parse a `value # reason` allowlist (config/*.allow).
 *
 * Blank lines and whole-line `#` comments are skipped; every entry must carry
 * a trailing "# reason" so the list explains itself. Returns entries in file
 * order plus syntax `problems` already prefixed with `path:line`, ready to
 * print. Stale-entry detection is the caller's job — it knows what "stale"
 * means for its own domain.
 *
 * @param {string} path Repo-relative path (absolute paths are used as-is).
 * @returns {{ entries: {value: string, reason: string}[], problems: string[] }}
 */
export function parseAllowlist(path) {
  const absolute = resolve(repoRoot, path);
  const entries = [];
  const problems = [];
  const lines = existsSync(absolute) ? readFileSync(absolute, "utf8").split("\n") : [];
  for (const [i, raw] of lines.entries()) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const match = line.match(/^(\S+)\s+#\s*(\S.*)$/);
    if (!match) {
      problems.push(`${path}:${i + 1}: entry needs a trailing "# reason" comment: "${line}"`);
      continue;
    }
    entries.push({ value: match[1], reason: match[2] });
  }
  return { entries, problems };
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
 * Slugs of every EN docs page, mirroring Starlight's docsLoader: any DOC_EXT
 * file under src/content/docs/en, basenames starting with "_" excluded,
 * trailing "/index" collapsing to its directory. The root index page has no
 * directory to collapse into, so it keeps the slug "index".
 */
export function docsSlugs() {
  const dir = join(repoRoot, "src", "content", "docs", "en");
  const slugs = new Set();
  for (const path of walk(dir)) {
    if (!DOC_EXT.test(path) || basename(path).startsWith("_")) continue;
    slugs.add(relative(dir, path).replace(DOC_EXT, "").replace(/\/index$/, ""));
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
    slugs.add(relative(dir, path).replace(/\.astro$/, "").replace(/\/index$/, ""));
  }
  return slugs;
}

/**
 * Locale codes declared in config/i18n.mjs, including the default locale.
 *
 * Compared verbatim against localeDirs(): Astro resolves a locale by directory
 * name, so `pt-br` in i18n.mjs only serves `src/content/docs/pt-br`. Casing is
 * deliberately not normalized here — a `pt-BR` directory really would be
 * unconfigured. (config/sidebar.mjs keys its label overrides by Starlight's
 * BCP-47 casing instead; that is a separate namespace.)
 */
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
