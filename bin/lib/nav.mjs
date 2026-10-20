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
export const DOC_EXT = /\.(md|mdx|mdoc|markdown)$/;

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

/** The evaluated `sidebar` array from config/sidebar.mjs, structure intact. */
export async function sidebarTree() {
  const url = pathToFileURL(join(repoRoot, "config", "sidebar.mjs")).href;
  const { sidebar } = await import(url);
  return sidebar;
}

/** Every `link` value in config/sidebar.mjs, recursing into group `items`. */
export async function sidebarLinks() {
  const links = [];
  const collect = (items) => {
    for (const item of items) {
      if (item.link) links.push(item.link);
      if (item.items) collect(item.items);
    }
  };
  collect(await sidebarTree());
  return links;
}

/**
 * Flatten the sidebar into one record per *sibling list*, so a check can reason
 * about an entry's neighbours rather than only about the entry.
 *
 * The root array is included as the group at path "" — a duplicate label
 * between two top-level entries is the same defect as one inside a group.
 *
 * @returns {{path: string, items: object[]}[]} Outermost group first.
 */
export async function sidebarGroups() {
  const groups = [];
  const collect = (items, path) => {
    groups.push({ path, items });
    for (const item of items) {
      if (item.items) collect(item.items, `${path}/${item.label}`);
    }
  };
  collect(await sidebarTree(), "");
  return groups;
}

/**
 * Slug for a content file, from its path relative to the collection root:
 * strip the extension, then collapse a trailing "/index" to its directory.
 * The root index page has no directory to collapse into (the regex needs a
 * leading slash), so it keeps the slug "index".
 */
export function fileSlug(relativePath, ext) {
  return relativePath.replace(ext, "").replace(/\/index$/, "");
}

/**
 * Every EN docs page, mirroring Starlight's docsLoader: any DOC_EXT file under
 * src/content/docs/en, basenames starting with "_" excluded.
 *
 * `dir` is the page's directory relative to the collection root ("" at the
 * root), taken from the FILE path rather than the slug: an index page's slug
 * is its directory, so "self-hosting/index.md" and "self-hosting/upgrade-guides.md"
 * both report dir "self-hosting" and are siblings.
 *
 * @returns {{slug: string, dir: string, path: string}[]}
 */
export function docsPages() {
  const root = join(repoRoot, "src", "content", "docs", "en");
  const pages = [];
  for (const path of walk(root)) {
    if (!DOC_EXT.test(path) || basename(path).startsWith("_")) continue;
    const rel = relative(root, path);
    const dir = dirname(rel);
    pages.push({ slug: fileSlug(rel, DOC_EXT), dir: dir === "." ? "" : dir, path });
  }
  return pages;
}

/** Slugs of every EN docs page; see docsPages(). */
export function docsSlugs() {
  return new Set(docsPages().map((page) => page.slug));
}

/**
 * Markdown constructs whose links a reader can't follow; see enLinkSlugs().
 * One alternation, so the leftmost construct wins as it does in Markdown:
 * `<!--` inside a code span is code, and a fence inside a comment is hidden.
 */
const HIDDEN_MARKDOWN = new RegExp(
  [
    // HTML comment; an unclosed one runs to the end of the page.
    /<!--[\s\S]*?(?:-->|(?![\s\S]))/.source,
    // Fenced code, as in CommonMark: the closer is a run of the same character
    // at least as long, alone on its line, and an unclosed fence runs to the
    // end of the page. A backtick fence's info string can't hold a backtick.
    /^ {0,3}(?<bt>`{3,})[^`\n]*\n[\s\S]*?(?:^ {0,3}\k<bt>`*[ \t]*\r?$|(?![\s\S]))/.source,
    /^ {0,3}(?<tl>~{3,})[^\n]*\n[\s\S]*?(?:^ {0,3}\k<tl>~*[ \t]*\r?$|(?![\s\S]))/.source,
    // Code span: an unescaped backtick run closed by a run of the same length
    // before the paragraph ends. An unmatched run is plain text.
    /(?<![`\\])(?<cs>`+)(?!`)(?:[^\n]|\n(?![ \t]*\r?\n))*?(?<!`)\k<cs>(?!`)/.source,
    // Image; the outer link of a linked image survives.
    /!\[[^\]]*\]\([^)]*\)/.source,
  ].join("|"),
  "gm",
);

/**
 * EN docs slugs that a page's Markdown body links to.
 *
 * Only absolute, locale-prefixed targets count — `](/en/self-hosting/upgrade-guides/)`,
 * with or without the trailing slash, and with any `#fragment` or `?query`
 * dropped. Relative targets (`./sibling`, `../up`) are ignored on purpose:
 * Starlight serves every page at a trailing-slash URL, so `./sibling` from
 * /en/a/b/ resolves to /en/a/b/sibling, not /en/a/sibling, and a link checker
 * that "understood" the author's intent would pass a link the browser breaks.
 *
 * Links a reader can't follow don't count either: HTML comments, fenced and
 * inline code, and images are removed before matching, so commenting out a
 * page's last inbound link fails the orphan check instead of passing it.
 *
 * @param {string} markdown Page source, frontmatter included or not.
 * @returns {Set<string>} Normalized slugs, in link order.
 */
export function enLinkSlugs(markdown) {
  const visible = markdown.replace(HIDDEN_MARKDOWN, "");
  const slugs = new Set();
  for (const match of visible.matchAll(/\]\(\s*<?\/en\/([^)\s>]*)>?\s*(?:"[^"]*")?\)/g)) {
    const target = match[1].replace(/[#?].*$/, "");
    slugs.add(normalizeLink(target));
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
    slugs.add(fileSlug(relative(dir, path), /\.astro$/));
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
