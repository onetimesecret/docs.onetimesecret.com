#!/usr/bin/env node
//
// check-frontmatter.mjs — hold the Phase 2 page contract: frontmatter that
// matches the schema, anchors that redirects can actually land on, and defaults
// that stay in the reference.
//
// Four assertions, each guarding something that otherwise fails silently:
//
//  1. Every EN page has a title and a description. Starlight's schema requires
//     `title` but not `description`, so a page can ship with no meta
//     description and no social card and still build green.
//
//  2. Any plan / audience / pageType value is one the schema allows. Astro DOES
//     enforce this at build time — but only for values it can see, and only
//     when a build runs. Reading the enums OUT of src/content.config.ts (rather
//     than restating them here) is what makes this check follow the schema
//     instead of drifting from it, and it turns a build-time surprise into a
//     one-second local failure that names the file.
//
//  3. THE ANCHOR CONTRACT (D1). Merging the five region pages into
//     security/where-your-data-lives, and the four principles pages into
//     security/our-principles, only preserves their inbound links because each
//     merged page keeps an H2 whose auto-generated id equals the old page's
//     slug. Rename "## Canada" to "## Canada (Montréal)" and every /regions/ca
//     redirect silently lands at the top of a long page instead of at the
//     section it promised. Nothing in Astro checks a redirect's fragment: the
//     fragment never reaches the server. So this asserts BOTH directions — the
//     contract's anchors exist, and every fragment any redirect points at
//     resolves to a real heading on the page it targets. That second direction
//     is what makes the redirect targets derivable rather than hand-matched.
//
//  4. THE "REFERENCE OWNS EVERY DEFAULT" RULE (plan rule 3). An end-user page
//     that spells out a configurable default has forked the reference: the
//     number goes stale the first time an operator changes it, and nothing
//     connects the copy back to the page that owns it. Fails on an ALL_CAPS
//     environment-variable name with its value written out beside it, on pages
//     that declare `audience: end-user` and no `sourceOfTruth`. Scoped that
//     narrowly on purpose — the self-hosting and reference trees state values
//     because stating values is their job, and a check that fires on them would
//     be switched off within a week.
//
//     Tuned against the real tree, and the two narrowing rules were each
//     measured. Over the 57 EN pages: 45 candidate hits with code blocks
//     included, 1 once fenced blocks are excluded (`GENERATED_VALUE_DISPLAY_TTL=60`
//     in prose on self-hosting/upgrading-v0-24), and 0 once the audience gate is
//     applied — every candidate lives in the self-hosting tree. So it reports
//     nothing today and has no false positives to report: it is a ratchet
//     against the next end-user page, not a cleanup task.
//
//     Known limit: it catches a NAMED variable with a value, not a bare number.
//     "Links last 7 days" on a page with no sourceOfTruth passes. Catching that
//     means flagging every numeral in reader-facing prose, which is exactly the
//     cry-wolf check that gets deleted.
//
// Fails (exit 1) listing every problem with the file to edit. Warns (exit 0)
// where a fragment resolves in EN but not in a locale still holding its own
// copy of the target page.
//
// Usage: pnpm run check:frontmatter
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  ENUM_FIELDS,
  docsPages,
  headings,
  parseFrontmatter,
  schemaEnums,
  statedDefaults,
} from "./lib/frontmatter.mjs";
import { repoRoot } from "./lib/nav.mjs";

const CONFIG = "src/content.config.ts";
const REDIRECTS = "config/redirects.mjs";

// D1, the anchor contract. Slug -> the heading ids that page must keep because
// a redirect (or an inbound link from outside this repo) depends on them.
// These are the OLD page slugs the merge absorbed; changing one is a breaking
// change to a published URL, not a copy edit.
const REQUIRED_ANCHORS = {
  "security/where-your-data-lives": [
    "canada",
    "european-union",
    "new-zealand",
    "united-kingdom",
    "united-states",
  ],
  "security/our-principles": ["privacy-first", "communication", "data-minimization"],
};

const problems = [];

// --- 1 + 2 + 4: per-page frontmatter and prose ------------------------------

const enums = schemaEnums();
for (const field of ENUM_FIELDS) {
  if (!enums[field]) {
    problems.push(
      `could not read the "${field}" enum out of ${CONFIG} — this check reads the schema instead of restating it, so reshaping that field (z.enum -> something else) needs bin/lib/frontmatter.mjs updated to match`,
    );
  }
}

const pages = docsPages("en");
const anchorsBySlug = new Map();
let endUserPages = 0;

for (const page of pages) {
  const { fields, body, bodyLine } = parseFrontmatter(page.source);

  for (const required of ["title", "description"]) {
    if (!fields[required]) {
      problems.push(`${page.path}: no ${required} in frontmatter — every page needs both`);
    }
  }

  for (const field of ENUM_FIELDS) {
    const value = fields[field];
    if (value === undefined || !enums[field]) continue;
    if (!enums[field].includes(value)) {
      problems.push(
        `${page.path}: ${field}: "${value}" is not in the schema enum (${enums[field].join(", ")}) — fix the page or widen the enum in ${CONFIG}`,
      );
    }
  }

  if (fields.sourceOfTruth !== undefined && fields.sourceOfTruth.trim() === "") {
    problems.push(
      `${page.path}: sourceOfTruth is empty — it must cite where the fact was verified (a path:line into the app source), or be removed`,
    );
  }

  anchorsBySlug.set(page.slug, new Map(headings(body).map((h) => [h.slug, h])));

  // Rule 3 applies to reader-facing prose only. An operator page states the
  // value because the value is the subject; sourceOfTruth is the declared
  // exception, and it carries the citation that keeps the copy auditable.
  if (fields.audience !== "end-user") continue;
  endUserPages++;
  if (fields.sourceOfTruth) continue;

  for (const stated of statedDefaults(body)) {
    problems.push(
      `${page.path}:${bodyLine + stated.line - 1}: end-user page states the default for ${stated.variable} outright: "${stated.excerpt}" — link to the page that owns it (/en/self-hosting/environment-variables) instead, or add sourceOfTruth frontmatter citing the app source you read it from`,
    );
  }
}

// --- 3a: the contract's anchors exist ---------------------------------------

for (const [slug, required] of Object.entries(REQUIRED_ANCHORS)) {
  const anchors = anchorsBySlug.get(slug);
  if (!anchors) {
    problems.push(
      `anchor contract: src/content/docs/en/${slug} does not exist, but ${REDIRECTS} and the pages merged into it depend on its anchors`,
    );
    continue;
  }
  for (const anchor of required) {
    const heading = anchors.get(anchor);
    if (!heading) {
      problems.push(
        `anchor contract: src/content/docs/en/${slug} has no heading with the id "#${anchor}" — a merged-away page's URL redirects there; restore the heading whose text slugifies to "${anchor}"`,
      );
    } else if (heading.depth !== 2) {
      problems.push(
        `anchor contract: src/content/docs/en/${slug} heading "#${anchor}" is an h${heading.depth}, not an h2 — the absorbed pages were top-level sections and the on-page table of contents lists h2s`,
      );
    }
  }
}

// --- 3b: every redirect fragment resolves to a heading that exists -----------
//
// The contract is asserted against EN, which is where D5 says this plan ships
// and which every locale without its own copy of the target is served by
// fallback. A locale that DOES still hold its own copy of a merge target (only
// custom-domains/index.md today) is reported as a warning rather than a
// failure: its headings are translated, the anchor lands at the top of the
// right page rather than 404ing, and re-merging the 25 non-EN trees is not this
// plan's work. Warnings are collapsed per target+fragment so a lagging
// translation costs one line, not one line per locale — a check nobody can read
// is a check nobody runs.

const { createRedirectsConfig } = await import(
  new URL("../config/redirects.mjs", import.meta.url).href
);
const localeAnchors = new Map();

/** Heading ids of `slug` in `locale`, or null if that locale has no such page. */
function localAnchors(locale, slug) {
  if (locale === "en") return anchorsBySlug.get(slug) ?? null;
  if (!localeAnchors.has(locale)) {
    const dir = join(repoRoot, "src", "content", "docs", locale);
    localeAnchors.set(
      locale,
      existsSync(dir)
        ? new Map(
            docsPages(locale).map((p) => [
              p.slug,
              new Map(headings(parseFrontmatter(p.source).body).map((h) => [h.slug, h])),
            ]),
          )
        : new Map(),
    );
  }
  return localeAnchors.get(locale).get(slug) ?? null;
}

let fragments = 0;
const staleTranslations = new Map();
// One broken anchor is reached by up to 26 redirect entries (the locale
// expansion in config/redirects.mjs). Report it ONCE, by target, with a count:
// 26 copies of the same sentence is how a useful check gets scrolled past.
const broken = new Map();

const record = (map, key, from, detail) => {
  if (!map.has(key)) map.set(key, { froms: [], detail });
  map.get(key).froms.push(from);
};

for (const [from, to] of Object.entries(createRedirectsConfig())) {
  const hash = to.indexOf("#");
  if (hash === -1) continue;
  fragments++;
  if (/^[a-z]+:/i.test(to)) {
    problems.push(
      `${REDIRECTS}: "${from}" points at an external URL with a fragment (${to}) — this check cannot verify it; drop the fragment or point at a page in this repo`,
    );
    continue;
  }

  const fragment = to.slice(hash + 1);
  const [locale, ...rest] = to
    .slice(0, hash)
    .replace(/^\/+|\/+$/g, "")
    .split("/");
  const slug = rest.join("/") || "index";
  const key = `${slug}#${fragment}`;
  const canonical = anchorsBySlug.get(slug);

  if (!canonical) {
    record(
      broken,
      key,
      from,
      `src/content/docs/en/${slug} does not exist, so neither that page nor its locale fallback can carry "#${fragment}"`,
    );
    continue;
  }
  if (!canonical.has(fragment)) {
    const near = [...canonical.keys()].filter((a) => a.includes(fragment) || fragment.includes(a));
    record(
      broken,
      key,
      from,
      `/en/${slug} has no heading with the id "#${fragment}"${near.length ? ` (did you mean "#${near[0]}"?)` : ""} — a fragment is never sent to the server, so this lands at the top of the page instead of 404ing; re-derive the fragment from a heading on the target, or restore the heading`,
    );
    continue;
  }

  // EN resolves. Does this locale's own copy, if it has one?
  const local = localAnchors(locale, slug);
  if (local && !local.has(fragment)) {
    staleTranslations.set(key, (staleTranslations.get(key) ?? 0) + 1);
  }
}

for (const [key, { froms, detail }] of [...broken].sort()) {
  problems.push(
    `${REDIRECTS}: ${detail}. ${froms.length} redirect${froms.length === 1 ? "" : "s"} point${froms.length === 1 ? "s" : ""} at it, starting with "${froms[0]}"`,
  );
}

for (const [key, count] of [...staleTranslations].sort()) {
  const [slug, fragment] = key.split("#");
  console.warn(
    `WARN: redirect fragment "#${fragment}" resolves on /en/${slug} but not in ${count} locale${count === 1 ? "" : "s"} that still hold their own ${slug} page — those readers land at the top of the page, never a 404`,
  );
}

// ---------------------------------------------------------------------------

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

const contracted = Object.values(REQUIRED_ANCHORS).reduce((n, a) => n + a.length, 0);
console.log(
  `check:frontmatter OK — ${pages.length} EN pages (${endUserPages} end-user), ` +
    `${contracted} contracted anchors, ${fragments} redirect fragment${fragments === 1 ? "" : "s"} resolved`,
);
