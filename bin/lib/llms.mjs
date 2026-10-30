// bin/lib/llms.mjs
//
// Parsing and assertions behind check:llms. Plain Node ESM, zero
// dependencies, no filesystem or git access: the runner (bin/check-llms.mjs)
// gathers the page inventory and change dates and hands them in, so every
// rule here is unit-testable with fabricated input.
//
// public/llms.txt is a hand-written index for AI agents (https://llmstxt.org).
// It states facts about the product and links the pages that back them, and
// nothing in the build reads it, so a wrong plan limit or a link to a page
// that has since been renamed or drafted would ship unnoticed. The rules:
//
//  1. Shape. The file opens with one H1 and a `> ` summary, which is what the
//     spec requires for a parser to treat it as an llms.txt at all.
//  2. A line starting `Last updated: YYYY-MM-DD`, exactly once, with a real date that is
//     not in the future. It is the review stamp the other rules key off.
//  3. Every link into this site points at an English page (translations lag
//     the English source) that exists and is not `draft: true`. Fragments and
//     query strings are ignored; `/en/` is the English homepage.
//  4. No page is linked twice.
//  5. The stamp is at most MAX_AGE_DAYS old, so the file is re-read on a
//     cadence even when nothing it links has changed.
//  6. No linked page has changed since the stamp. A page edit that touches a
//     fact the index repeats (a plan tier, a limit, a region) is exactly the
//     edit that would otherwise leave the index wrong, so any change to a
//     linked page fails the build until someone re-reads the index and moves
//     the stamp. The stamp is a review marker, not proof of a review.
//
// Everything outside the site (api.onetimesecret.com, onetimesecret.com,
// GitHub) is checked by the weekly external link job in
// .github/workflows/check-links.yml, which scans public/llms.txt alongside
// the content tree, and by `bin/check-links.sh --external` locally.

// Pinned to production on purpose: the file is the published index, and its
// links must be production URLs whatever SITE_URL a staging build uses.
export const SITE_ORIGIN = "https://docs.onetimesecret.com";
export const MAX_AGE_DAYS = 90;
export const DAY_MS = 86_400_000;

// The date may be followed by prose ("Last updated: 2026-10-30. For anything
// that may have changed since, ...").
const STAMP = /^Last updated: (\d{4}-\d{2}-\d{2})(?![\d-])/;
// Inline `[text](href)`, with the destination optionally wrapped in `<...>`
// (which allows spaces) and optionally followed by a `"title"`, or an
// autolink `<https://...>`.
const LINK = /\]\(\s*(?:<([^<>]*)>|([^)\s]+))(?:\s+(?:"[^"]*"|'[^']*'|\([^)]*\)))?\s*\)|<(https?:\/\/[^<>\s]+)>/g;
// Every `](` opens an inline link. One that LINK does not match is a link the
// rules would otherwise skip in silence, so parseLlms reports it instead.
const LINK_OPENER = /\]\(/g;
// A link into this site: the production origin with any path, fragment or
// query, or nothing at all. http:// is accepted here so the rules can flag
// it, rather than treating it as an external link and not looking at it.
const SITE_LINK = /^https?:\/\/docs\.onetimesecret\.com(?=[/#?]|$)/;
const FENCE = /^\s{0,3}(`{3,}|~{3,})/;

/**
 * Pull the parts the rules need out of the file text.
 *
 * `links` carries every Markdown link destination (inline `[text](href)` and
 * autolink `<href>` forms) with its 1-based line, in document order. Bare
 * URLs in prose are not links an agent would follow and are not collected.
 * Fenced code blocks are skipped: a URL in the curl example is not a link,
 * and a `Last updated:` line inside one is not the stamp.
 *
 * `malformed` lists the lines holding a `](` that did not parse as a link.
 *
 * @param {string} text
 * @returns {{
 *   title: string | null,
 *   summary: string | null,
 *   stamps: {date: string, line: number}[],
 *   links: {href: string, line: number}[],
 *   malformed: number[],
 * }}
 */
export function parseLlms(text) {
  const lines = text.split("\n");
  const nonEmpty = lines.map((line, i) => ({ line, n: i + 1 })).filter(({ line }) => line.trim() !== "");

  const first = nonEmpty[0]?.line ?? "";
  const second = nonEmpty[1]?.line ?? "";
  const title = /^# \S/.test(first) ? first.slice(2).trim() : null;
  const summary = /^> \S/.test(second) ? second.slice(2).trim() : null;

  const stamps = [];
  const links = [];
  const malformed = [];
  let fence = null;
  lines.forEach((line, i) => {
    const fenceMatch = line.match(FENCE);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      return;
    }
    if (fence !== null) return;

    const stamp = line.match(STAMP);
    if (stamp) stamps.push({ date: stamp[1], line: i + 1 });

    let inline = 0;
    for (const match of line.matchAll(LINK)) {
      if (match[3] === undefined) inline += 1;
      links.push({ href: match[1] ?? match[2] ?? match[3], line: i + 1 });
    }
    const openers = line.match(LINK_OPENER)?.length ?? 0;
    if (openers !== inline) malformed.push(i + 1);
  });

  return { title, summary, stamps, links, malformed };
}

/**
 * The site-relative path of a link into this site, or null for a link
 * elsewhere. Accepts the absolute origin (with or without a path, over
 * https or http) and root-relative forms; drops fragment and query. The
 * bare origin is `/`.
 *
 * @param {string} href
 * @returns {string | null}
 */
export function sitePath(href) {
  let path;
  const site = href.match(SITE_LINK);
  if (site) path = href.slice(site[0].length);
  else if (href.startsWith("/") && !href.startsWith("//")) path = href;
  else return null;
  path = path.replace(/[#?].*$/, "");
  return path === "" ? "/" : path;
}

/**
 * The English page slug a site path refers to, in the form docsPages() uses
 * (`"index"` for the homepage, `"start/glossary"` otherwise), or null when
 * the path is outside the English docs tree.
 *
 * @param {string} path site-relative, e.g. "/en/start/glossary/"
 * @returns {string | null}
 */
export function enSlug(path) {
  const match = path.match(/^\/en(?:\/(.*?))?\/?$/);
  if (!match) return null;
  const slug = (match[1] ?? "").replace(/\/+$/, "");
  return slug === "" ? "index" : slug;
}

/** `YYYY-MM-DD` for a Date, in UTC. */
export function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

/** Whole days from `from` to `to`, both `YYYY-MM-DD`. Negative when `to` is earlier. */
export function daysBetween(from, to) {
  return Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS);
}

/**
 * Run every rule. Returns the problems found (empty means pass) and a summary
 * of what was checked, for the runner's OK line.
 *
 * @param {string} text the llms.txt source
 * @param {object} env
 * @param {Map<string, {path: string, draft: boolean}>} env.pages EN docs pages by slug
 * @param {(path: string) => string | null} env.changedOn last change date of a
 *   repo-relative path as `YYYY-MM-DD`, or null when unknown
 * @param {string} env.today `YYYY-MM-DD`
 * @param {number} [env.maxAgeDays]
 * @returns {{problems: string[], summary: {links: number, pages: number, stamp: string | null, ageDays: number | null}}}
 */
export function auditLlms(text, { pages, changedOn, today, maxAgeDays = MAX_AGE_DAYS }) {
  const problems = [];
  const { title, summary, stamps, links, malformed } = parseLlms(text);

  if (!title) problems.push("line 1: the file must open with an H1 (`# Title`)");
  if (!summary) problems.push("the H1 must be followed by a `> summary` blockquote");
  for (const line of malformed) {
    problems.push(`line ${line}: a \`[text](href)\` link did not parse; keep the href free of spaces and \`)\` or wrap it in \`<...>\``);
  }

  let stamp = null;
  if (stamps.length === 0) {
    problems.push("missing `Last updated: YYYY-MM-DD` line");
  } else if (stamps.length > 1) {
    problems.push(`\`Last updated:\` appears ${stamps.length} times (lines ${stamps.map((s) => s.line).join(", ")}); keep one`);
  } else {
    stamp = stamps[0].date;
    const parsed = new Date(stamp + "T00:00:00Z");
    if (Number.isNaN(parsed.getTime()) || isoDate(parsed) !== stamp) {
      problems.push(`line ${stamps[0].line}: \`Last updated: ${stamp}\` is not a calendar date`);
      stamp = null;
    } else if (stamp > today) {
      problems.push(`line ${stamps[0].line}: \`Last updated: ${stamp}\` is in the future (today is ${today})`);
    }
  }

  // Keyed by page slug where the link resolves to one, so `/en/pricing` and
  // `/en/pricing/` count as the same link; by path otherwise.
  const seen = new Map();
  const linkedPages = new Map();
  for (const { href, line } of links) {
    const path = sitePath(href);
    if (path === null) continue;
    if (path === "/llms.txt") continue;

    if (href.startsWith("http://")) {
      problems.push(`line ${line}: ${href} uses http://; the site is served over https only`);
    }

    const slug = enSlug(path);
    const key = slug ?? path;
    if (seen.has(key)) {
      problems.push(`line ${line}: ${href} is already linked on line ${seen.get(key)}`);
      continue;
    }
    seen.set(key, line);

    if (slug === null) {
      problems.push(`line ${line}: ${href} is not an English page; link the /en/ source, translations lag behind it`);
      continue;
    }
    // Starlight serves `en/pricing/index.md` at `/en/pricing/`; an explicit
    // `index` segment resolves to the same slug here but 404s on the site.
    if (/\/index\/?$/.test(path)) {
      problems.push(`line ${line}: ${href} ends in /index, which is not a route; link ${path.replace(/index\/?$/, "")} instead`);
      continue;
    }
    const page = pages.get(slug);
    if (!page) {
      problems.push(`line ${line}: ${href} has no page under src/content/docs/en (slug "${slug}")`);
      continue;
    }
    if (page.draft) {
      problems.push(`line ${line}: ${href} is a draft (${page.path}); drafts are not built in production`);
      continue;
    }
    linkedPages.set(slug, page);
  }

  let ageDays = null;
  if (stamp && stamp <= today) {
    ageDays = daysBetween(stamp, today);
    if (ageDays > maxAgeDays) {
      problems.push(
        `\`Last updated: ${stamp}\` is ${ageDays} days old (limit ${maxAgeDays}); re-read public/llms.txt against the pages it links and move the date`,
      );
    }
    const changed = [];
    for (const page of linkedPages.values()) {
      const date = changedOn(page.path);
      if (date && date > stamp) changed.push(`${page.path} (${date})`);
    }
    if (changed.length > 0) {
      problems.push(
        `${changed.length} linked page(s) changed after \`Last updated: ${stamp}\`; check public/llms.txt still matches them and move the date:\n` +
          changed.map((c) => `    ${c}`).join("\n"),
      );
    }
  }

  return { problems, summary: { links: seen.size, pages: linkedPages.size, stamp, ageDays } };
}
