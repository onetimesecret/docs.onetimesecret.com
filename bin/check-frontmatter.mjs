#!/usr/bin/env node
//
// check-frontmatter.mjs — hold the Phase 2 page contract: frontmatter that
// matches the schema, anchors that redirects can actually land on, and defaults
// that stay in the reference.
//
// Five assertions, each guarding something that otherwise fails silently:
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
//  4. THE "CITE WHERE THE VALUE CAME FROM" RULE (plan rule 3, D-4.1). A page
//     that spells out a configurable default has forked the reference: the
//     number goes stale the first time an operator changes it, and nothing
//     connects the copy back to the source it was read from. Fails on an
//     ALL_CAPS environment-variable name with its value written out beside it,
//     on pages that declare `audience: end-user` or `audience: operator` and
//     carry no `sourceOfTruth`.
//
//     `sourceOfTruth` is the whole exemption, for both audiences. Phase 3
//     considered making the operator rule stricter — citation AND a link to
//     self-hosting/environment-variables or self-hosting/configuration — and
//     dropped it: the Phase 3 anchor audit found 14 staleness defects across
//     those two pages, and 11 of their 14 anchors index the superseded v0.24
//     stack. A rule that forces operator pages to link there would route
//     readers into wrong content to satisfy a checker. Operator pages cite app
//     source instead, in the `path:lines (what it proves)` form
//     src/content/docs/en/billing/index.md uses. When Phase 4 regenerates the
//     Reference, revisit the link half of D-4.1.
//
//     REFERENCE_OWNERS stay exempt outright, cited or not: stating values is
//     what those two pages are for.
//
//     Tuned against the real tree, and the narrowing rules were each measured.
//     Over the EN tree: 45 candidate hits with code blocks included, 1 once
//     fenced blocks are excluded (`GENERATED_VALUE_DISPLAY_TTL=60` in prose on
//     self-hosting/upgrading-v0-24, which now carries the `.env.reference`
//     citation it was read from), and 0 after the audience gate. So it reports
//     nothing today and has no false positives to report: it is a ratchet
//     against the next page, not a cleanup task.
//
//     Known limit: it catches a NAMED variable with a value, not a bare number.
//     "Links last 7 days" on a page with no sourceOfTruth passes. Catching that
//     means flagging every numeral in reader-facing prose, which is exactly the
//     cry-wolf check that gets deleted.
//
//  5. AUDIENCE IS NOT OPTIONAL WHERE ASSERTION 4 IS THE POINT. Assertion 4 is
//     gated on `audience`, and src/content.config.ts makes every Phase 2 field
//     optional (deliberately — 60 pre-audit pages carry none of them). Those two
//     facts together made the citation rule OPT-IN: deleting one frontmatter
//     line exempted a page from D-4.1 entirely, and the only trace was the
//     operator counter in the OK line below dropping by one. Removing the field
//     has to be a FAILURE, not an exemption, so `audience` and `pageType` are
//     REQUIRED on every EN page under GATED_TREES. The trees are the ones whose
//     pages are written to a template and quote knobs at a reader: install/ and
//     self-hosting/ today, configure/ and features/ pre-emptively, because the
//     next 18 operator pages land there and the rule has to be in place before
//     the pages are, not after.
//
//     Scope is deliberately narrow. The other ~60 pages predate the audit and
//     are not being retrofitted here; widening this list is how a tree opts in,
//     one line, once its pages have been through the audit.
//
// Fails (exit 1) listing every problem with the file to edit. Warns (exit 0)
// where a fragment resolves in EN but not in a locale still holding its own
// copy of the target page.
//
// Usage: pnpm run check:frontmatter
import { existsSync } from "node:fs";
import { join } from "node:path";

import { parse as parseYaml } from "yaml";

import {
  ENUM_FIELDS,
  GATED_FIELDS,
  GATED_TREES,
  docsPages,
  headings,
  inGatedTree,
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

// D-4.1. The two pages that own every default until the generated Reference
// lands in Phase 4. They are exempt from assertion 4 whether or not they cite
// sourceOfTruth: stating values is what they are for. Every other page — of
// either audience — states a default only with a citation beside it.
const REFERENCE_OWNERS = ["self-hosting/environment-variables", "self-hosting/configuration"];

// Assertion 5's tree list, its required fields and the segment-wise prefix test
// live in bin/lib/frontmatter.mjs — this script runs its assertions at import
// time, so anything a unit test needs to reach has to sit in the library.

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
let operatorPages = 0;
let gatedPages = 0;

for (const page of pages) {
  const { fields, body, bodyLine, raw } = parseFrontmatter(page.source);

  // 0: the block is YAML a build would accept. Everything below reads fields
  // out of the lenient line parser in bin/lib/frontmatter.mjs, which takes a
  // value as the rest of the line and so accepts input Astro rejects — an
  // unquoted scalar ends at the next ": ", and a long sourceOfTruth citation
  // containing an ordinary English colon parses here and then fails the build
  // with "bad indentation of a mapping entry". This check passed such a page.
  if (raw) {
    try {
      parseYaml(raw);
    } catch (error) {
      problems.push(
        `${page.path}: frontmatter is not valid YAML — ${error.message.split("\n")[0]}. The build fails on this even though the rest of this check passes it; an unquoted scalar ends at the first ": ", so a citation like "what the installer does: version gates" needs the colon removed or the whole value quoted`,
      );
    }
  }

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

  // 5: the gate below reads `audience`, so on the trees that gate is FOR, the
  // field is mandatory. Deleting it must fail here rather than skip the page.
  if (inGatedTree(page.slug)) {
    gatedPages++;
    for (const required of GATED_FIELDS) {
      if (!fields[required]) {
        problems.push(
          `${page.path}: no ${required} in frontmatter — every EN page under ${GATED_TREES.map((t) => `${t}/`).join(", ")} declares both ${GATED_FIELDS.join(" and ")}; the "cite where the value came from" rule (D-4.1) is gated on audience, so an operator page without one is exempt from it by omission rather than by decision`,
        );
      }
    }

    // D-4.1 has two clauses, and assertion 6 below only enforces the second.
    // "State a default, cite it" leaves an operator page that states no default
    // uncited, which is the loophole the rule was written to close: these pages
    // exist because the reference pages could not be trusted, so the citation
    // is the whole contract, not a conditional on wording. REFERENCE_OWNERS are
    // the reference — they cite themselves.
    if (fields.audience === "operator" && !REFERENCE_OWNERS.includes(page.slug)) {
      if (!fields.sourceOfTruth) {
        problems.push(
          `${page.path}: audience: operator under ${GATED_TREES.map((t) => `${t}/`).join(", ")} with no sourceOfTruth — D-4.1 has these pages carry a citation to app source in the "path:lines (what it proves)" form, whether or not they state a default outright`,
        );
      }
    }
  }

  // Rule 3 applies to prose that is not itself the reference. Both reader
  // audiences are gated; sourceOfTruth is the exemption for both (D-4.1).
  // Pages with no audience, or a developer/contributor audience, are out of
  // scope — they are writing about the code, not quoting a knob at a reader.
  const { audience } = fields;
  if (audience === "end-user") endUserPages++;
  else if (audience === "operator") operatorPages++;
  else continue;

  if (REFERENCE_OWNERS.includes(page.slug)) continue;
  if (fields.sourceOfTruth) continue;

  for (const stated of statedDefaults(body)) {
    problems.push(
      `${page.path}:${bodyLine + stated.line - 1}: ${audience} page states the default for ${stated.variable} outright: "${stated.excerpt}" — add sourceOfTruth frontmatter citing the app source you read it from, in the "path:lines (what it proves)" form, or stop stating the value and describe the behaviour instead`,
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

const { createRedirectsConfig, isOffsiteTarget } = await import(
  new URL("../config/redirects.mjs", import.meta.url).href
);

// createRedirectsConfig() runs config/redirects.mjs's own assertions, and they
// THROW. Uncaught, that would abort this script with a stack trace and take the
// 68 pages' worth of findings already sitting in `problems` down with it —
// they are not printed until the end. So the redirects failure becomes one more
// reported problem and the rest of the run still reports itself. bin/check-nav
// loads the same module the same way, for the same reason.
let redirects = null;
try {
  redirects = createRedirectsConfig();
} catch (error) {
  problems.push(
    `${REDIRECTS} did not load, so no redirect fragment could be resolved (the per-page assertions above still ran): ${error.message}`,
  );
}

const localeAnchors = new Map();

/** Heading ids of `slug` in `locale`, or null if that locale has no such page. */
function localAnchors(locale, slug) {
  if (locale === "en") return anchorsBySlug.get(slug) ?? null;
  if (!localeAnchors.has(locale)) {
    // `locale` comes from the redirect TARGET url, lowercased (`zh-cn`), and is
    // used verbatim as a directory name. That holds because the content
    // directories are lowercase too. If a BCP-47 tag ever diverges from its
    // directory (the `zh-CN` vs `zh-cn` hazard config/sidebar.mjs warns about),
    // existsSync misses and this returns an empty map — the stale-translation
    // warning below goes quiet rather than failing, so the divergence has to be
    // caught here rather than downstream.
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

for (const [from, to] of Object.entries(redirects ?? {})) {
  const hash = to.indexOf("#");
  if (hash === -1) continue;
  fragments++;
  if (isOffsiteTarget(to)) {
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
  `check:frontmatter OK — ${pages.length} EN pages (${endUserPages} end-user, ${operatorPages} operator), ` +
    `${gatedPages} of them under ${GATED_TREES.map((t) => `${t}/`).join(", ")} with audience and pageType required, ` +
    `${contracted} contracted anchors, ${fragments} redirect fragment${fragments === 1 ? "" : "s"} resolved`,
);
