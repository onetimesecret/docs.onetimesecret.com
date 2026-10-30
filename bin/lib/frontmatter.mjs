// bin/lib/frontmatter.mjs
//
// Frontmatter, heading and schema parsing behind the check:frontmatter drift
// check. Plain Node ESM, zero dependencies; paths resolve relative to this file
// so the scripts work from any cwd.
//
// Nothing here hard-codes a schema value. The allowed `plan` / `audience` /
// `pageType` values are read OUT of src/content.config.ts (see schemaEnums), so
// widening an enum there is what widens the check — the two cannot drift apart,
// which is the whole reason the check is worth having.
import { readFileSync, readdirSync } from "node:fs";
import { basename, join, relative } from "node:path";

import { DOC_EXT, enLinkSlugs, fileSlug, repoRoot } from "./nav.mjs";

export const CONTENT_CONFIG = join(repoRoot, "src", "content.config.ts");

/** Frontmatter fields whose value must be a member of a content.config.ts enum. */
export const ENUM_FIELDS = ["plan", "audience", "pageType"];

// Assertion 5 in check-frontmatter. Reader-facing trees where the audience gate
// on assertion 4 is load-bearing, so the field that gate reads cannot be
// optional. A slug matches a tree when it IS the tree (self-hosting/index.md ->
// slug "self-hosting") or sits under it. features/ holds no pages yet — it is
// listed so the first page that lands there arrives under the rule. Lives here
// rather than in the check script so it is testable: the script runs its
// assertions at import time and cannot be imported by a test.
//
// Phase 4 adds the four operator trees it creates. reference/ carries the
// generated and pinned inventories, operate/ the Day-2 procedures,
// troubleshoot/ the symptom-led diagnosis and upgrades/ the general migration
// workflow. All four are operator-facing, so the citation rule applies to them
// for the same reason it applies to install/ and self-hosting/.
export const GATED_TREES = [
  "install",
  "self-hosting",
  "configure",
  "features",
  "reference",
  "operate",
  "troubleshoot",
  "upgrades",
];
export const GATED_FIELDS = ["audience", "pageType"];

/**
 * Is `slug` inside a tree where `audience` and `pageType` are mandatory?
 *
 * Prefix match on a path SEGMENT, not on the string: "installation" is not
 * inside "install", and getting that wrong would silently pull the retired
 * self-hosting/installation family under the rule (or, in the other direction,
 * exempt a real install/ page).
 *
 * @param {string} slug
 * @returns {boolean}
 */
export const inGatedTree = (slug) =>
  GATED_TREES.some((tree) => slug === tree || slug.startsWith(`${tree}/`));

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/**
 * Every content page in a locale, mirroring docsSlugs() but carrying the file
 * text along — the checks need the body, not just the slug.
 *
 * @param {string} [locale="en"]
 * @returns {{slug: string, path: string, source: string}[]} `path` is
 *   repo-relative, so it can be printed straight into a FAIL message.
 */
export function docsPages(locale = "en") {
  const dir = join(repoRoot, "src", "content", "docs", locale);
  const pages = [];
  for (const path of walk(dir)) {
    if (!DOC_EXT.test(path) || basename(path).startsWith("_")) continue;
    pages.push({
      slug: fileSlug(relative(dir, path), DOC_EXT),
      path: relative(repoRoot, path),
      source: readFileSync(path, "utf8"),
    });
  }
  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Split a content file into its frontmatter fields and its body.
 *
 * Deliberately NOT a YAML parser. It reads TOP-LEVEL scalar keys only, which is
 * every key these checks care about; nested blocks (Starlight's `hero`,
 * `tableOfContents`) are skipped by the indentation test rather than
 * misparsed. No page in the repo uses a folded or block scalar (`key: >`,
 * `key: |`) — if one ever does, its value arrives truncated to the empty
 * string and the "missing title/description" check fires, which is a loud
 * failure rather than a silent pass.
 *
 * `bodyLine` is the 1-based line the body starts on, so a body offset can be
 * reported as a real line number in the file.
 *
 * `raw` is the frontmatter block verbatim, for callers that need to hand it to
 * a real YAML parser. This one accepts input Astro rejects: it reads a value as
 * everything after the first `key:`, where YAML reads an unquoted scalar as
 * ending at the next `: `. A citation containing a phrase like "what the
 * installer does: version gates" parses cleanly here and fails the build with
 * "bad indentation of a mapping entry". See assertion 0 in check-frontmatter.
 *
 * @param {string} source
 * @returns {{fields: Record<string,string>, body: string, bodyLine: number, raw: string}}
 */
export function parseFrontmatter(source) {
  const lines = source.split("\n");
  if (lines[0]?.trim() !== "---") return { fields: {}, body: source, bodyLine: 1, raw: "" };

  const fields = {};
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      return {
        fields,
        body: lines.slice(i + 1).join("\n"),
        bodyLine: i + 2,
        raw: lines.slice(1, i).join("\n"),
      };
    }
    // Top level only: an indented line belongs to a nested block.
    const match = lines[i].match(/^([A-Za-z_][\w.-]*):[ \t]*(.*)$/);
    if (!match) continue;
    fields[match[1]] = unquote(match[2].trim());
  }
  // Unterminated frontmatter: treat the whole file as frontmatter-less so the
  // required-field check reports it rather than this parser guessing.
  return { fields: {}, body: source, bodyLine: 1, raw: "" };
}

/** Strip one layer of matching quotes from a scalar value. */
function unquote(value) {
  const match = value.match(/^"(.*)"$/s) || value.match(/^'(.*)'$/s);
  return match ? match[1] : value;
}

/**
 * Slugify heading text the way the published page does.
 *
 * Reimplements github-slugger (which rehype-slug, and therefore Starlight, uses
 * to mint heading ids) rather than importing it: these checks take no
 * dependencies, and github-slugger is a transitive package that pnpm is free to
 * drop. The algorithm is lowercase, delete everything that is not a letter,
 * number, combining mark, space, hyphen or underscore, then spaces to hyphens.
 * bin/lib/frontmatter.test.mjs pins it against every heading in the repo.
 *
 * @param {string} text
 * @returns {string}
 */
export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M} _-]/gu, "")
    .replace(/ /g, "-");
}

/** Reduce a heading's inline markdown to the text a reader sees. */
function headingText(raw) {
  // Code spans render literally, so park their contents until the end: the
  // emphasis and html rules must not eat the underscores in `OIDC_CLIENT_ID`
  // or the tag in `<code>`.
  const spans = [];
  let text = raw
    .replace(/`([^`]*)`/g, (_, code) => `\0${spans.push(code) - 1}\0`)
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images
    .replace(/[*_]{1,3}(?=\S)([^*_]*)(?<=\S)[*_]{1,3}/g, "$1"); // emphasis
  // Inline html: strip tags until nothing changes. This is slug math, not
  // output sanitization, and one pass is already stable for this pattern; the
  // do/while is the shape CodeQL's incomplete-multi-character-sanitization
  // check recognises. A for loop with the first replace() in its initializer
  // still raised the alert.
  let previous;
  do {
    previous = text;
    text = text.replace(/<[^>]+>/g, "");
  } while (text !== previous);
  return text
    .replace(/\0(\d+)\0/g, (_, i) => spans[i])
    .replace(/\s+#*\s*$/, "") // closing ATX hashes
    .trim();
}

/**
 * Every ATX heading in a body, with the anchor id the built page gives it.
 *
 * Fenced code blocks are skipped, so a `# comment` inside a shell sample is not
 * mistaken for a heading. Repeated headings get github-slugger's `-1`, `-2`
 * suffixes in document order, so "does this anchor exist" stays accurate on a
 * page that says "Overview" twice.
 *
 * @param {string} body
 * @returns {{depth: number, text: string, slug: string, line: number}[]}
 */
export function headings(body) {
  const found = [];
  const seen = new Map();
  let fence = null;

  for (const [i, line] of body.split("\n").entries()) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) continue;

    const text = headingText(match[2]);
    const base = slugifyHeading(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    found.push({
      depth: match[1].length,
      text,
      slug: count === 0 ? base : `${base}-${count}`,
      line: i + 1,
    });
  }
  return found;
}

/**
 * Read the string enums out of the Zod schema in src/content.config.ts.
 *
 * Matches `field: z.enum([...])` allowing the line break Prettier inserts
 * before `.enum` on a long field. A field that stops being a plain `z.enum`
 * yields no entry rather than a wrong one, and the caller fails loudly — a
 * checker that silently accepts every value once the schema is reshaped is
 * worse than no checker.
 *
 * @param {string} [source] Defaults to reading CONTENT_CONFIG.
 * @returns {Record<string, string[]>} Field name -> allowed values.
 */
export function schemaEnums(source = readFileSync(CONTENT_CONFIG, "utf8")) {
  // Drop line comments first: the header comment above the schema names these
  // very fields in prose.
  const code = source.replace(/^\s*\/\/.*$/gm, "");
  const enums = {};
  for (const field of ENUM_FIELDS) {
    const match = code.match(
      new RegExp(`(?<![\\w.])${field}\\s*:\\s*z\\s*\\.\\s*enum\\(\\s*\\[([^\\]]*)\\]`),
    );
    if (!match) continue;
    const values = [...match[1].matchAll(/"([^"]*)"|'([^']*)'/g)].map((m) => m[1] ?? m[2]);
    if (values.length > 0) enums[field] = values;
  }
  return enums;
}

/**
 * An ALL_CAPS environment-variable name whose value is spelled out beside it.
 *
 * Two segments minimum (`SESSION_TTL`, not `API` or `DNS`), so the acronyms
 * end-user prose is full of — SSO, GDPR, CNAME, TXT — cannot match. The value
 * must contain a digit: plan rule 3 is about restating a configurable NUMERIC
 * default, and naming a variable in order to link to the page that owns it is
 * exactly the behaviour the rule wants, so a bare mention never fires.
 */
const ENV_VAR = /\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\b/g;
const VALUE_WINDOW = 120;
const VALUE = /(?:^|[\s=:(`'"])[-+]?\d/;

/**
 * A line that opens a new Markdown block rather than continuing this one: a
 * blank line, a fence, or a fresh list item. The stated-defaults window must
 * not read past these — the next block is a different claim, and a numbered
 * list marker ("1. …") would otherwise look like a value.
 */
const BLOCK_BREAK = /^\s*$|^\s{0,3}(`{3,}|~{3,})|^\s*(?:[-*+]|\d+[.)])\s/;

/**
 * Prose in `body` that states a configurable default outright.
 *
 * Fenced code blocks are excluded: a docker-compose sample or an .env excerpt
 * is a transcript, not a claim about the hosted service. The run of text after
 * the variable name is searched to VALUE_WINDOW characters, continuing across
 * hard-wrapped lines of the same block — this repo wraps prose at ~78 columns,
 * so a variable at end-of-line and its value opening the next line are one
 * sentence — but never past a blank line, fence, or new list item, so a number
 * in the NEXT block does not attach itself to a variable in this one.
 *
 * @param {string} body
 * @returns {{line: number, variable: string, excerpt: string}[]}
 */
export function statedDefaults(body) {
  const found = [];
  let fence = null;
  const lines = body.split("\n");

  for (const [i, line] of lines.entries()) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1][0];
      else if (fenceMatch[1][0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;

    ENV_VAR.lastIndex = 0;
    for (const match of line.matchAll(ENV_VAR)) {
      let after = line.slice(match.index + match[0].length);
      for (let j = i + 1; after.length < VALUE_WINDOW && j < lines.length; j++) {
        if (BLOCK_BREAK.test(lines[j])) break;
        after += ` ${lines[j]}`;
      }
      if (!VALUE.test(after.slice(0, VALUE_WINDOW))) continue;
      found.push({
        line: i + 1,
        variable: match[0],
        excerpt: line.slice(match.index, match.index + 100).trim(),
      });
    }
  }
  return found;
}

/**
 * Visible absolute EN links anywhere in the body (not an aside-only check).
 * Reuses the orphan check's Markdown exclusions; also accepts quoted HTML
 * anchor hrefs. Relative, external and other-locale links do not count.
 */
export function pageLinks(body) {
  return enLinkSlugs(body, { html: true });
}

/**
 * The reciprocal-link contract (audit §4.4, plan rule 2): a hosted feature
 * page and its operator counterpart each point at the other.
 * Reads page-wide links, not just note asides.
 *
 * Asserts REACHABILITY IN BOTH DIRECTIONS, not pairing. The table is not a
 * bijection and never was — custom-domains/homepage-and-incoming answers to two
 * operator pages, and three separate billing and organization pages all
 * converge on features/billing-and-entitlements — so a 1:1 assertion would fail
 * on correct content. What is actually required is that from a hosted page you
 * can get to *at least one* of its operator counterparts, and from an operator
 * page back to *at least one* of its hosted ones. Many-to-one and one-to-many
 * both pass; zero in either direction is the failure.
 *
 * Operator pages that are not written yet are declared, not inferred. An
 * undeclared missing page fails (the table names a page nobody is tracking) and
 * so does a declared one that now exists (the allowlist has gone stale). That
 * second failure is the point of the mechanism: it is what turns "the page
 * arrived" into "write the reciprocal links", instead of leaving the assertion
 * permanently asleep.
 *
 * Pure: every fact it needs is an argument, so the tests can hand it a bad
 * tree without writing files.
 *
 * @param {object} input
 * @param {Record<string, string[]>} input.pairs Hosted slug -> operator slugs.
 * @param {Map<string, {path: string, links: Set<string>}>} input.pages Every EN
 *   page that exists, by slug. Membership IS existence.
 * @param {Map<string, string>} input.pending Declared not-yet-written operator
 *   slug -> the reason it is pending.
 * @param {Set<string>} [input.stagedOperators] Explicitly staged link checks;
 *   existence and pending-list validation still apply to these pages.
 * @param {string} [input.allowlist] Path named in stale-entry messages.
 * @returns {{problems: string[], pendingPairs: string[], hosted: number, operator: number, stagedPairs: string[]}}
 *   `hosted` / `operator` count the pages actually asserted in each direction.
 */
export function reciprocalReachability({
  pairs,
  pages,
  pending,
  stagedOperators = new Set(),
  allowlist = "the allowlist",
}) {
  const problems = [];
  const pendingPairs = [];
  const stagedPairs = [];

  const hostedFor = new Map();
  for (const [hosted, operators] of Object.entries(pairs)) {
    for (const operator of operators) {
      if (!hostedFor.has(operator)) hostedFor.set(operator, []);
      hostedFor.get(operator).push(hosted);
    }
  }

  for (const slug of stagedOperators) {
    if (!hostedFor.has(slug)) {
      problems.push(
        `reciprocal links: staged operator "${slug}" is not in the counterpart table — remove the stale activation entry`,
      );
    }
  }

  // The allowlist tracks operator pages only, and only ones the table names.
  for (const [slug, reason] of pending) {
    if (!hostedFor.has(slug)) {
      problems.push(
        `${allowlist}: "${slug}" is not an operator page in the reciprocal-link table (${reason}) — remove the entry, or add the pair to RECIPROCAL_PAIRS if the page really is one half of a contract`,
      );
    } else if (pages.has(slug)) {
      problems.push(
        `${allowlist}: "${slug}" is listed as not written yet (${reason}) but src/content/docs/en/${slug} now exists — delete that line, then link the page to ${hostedFor.get(slug).map((h) => `/en/${h}`).join(" or ")} and add a link on the hosted side`,
      );
    }
  }

  for (const [operator, hostedSlugs] of [...hostedFor].sort()) {
    if (pages.has(operator) || pending.has(operator)) continue;
    problems.push(
      `reciprocal links: src/content/docs/en/${operator} does not exist and is not declared in ${allowlist} — the contract names it as the operator half of ${hostedSlugs.map((h) => `/en/${h}`).join(", ")}; write the page, or declare it pending with a reason so the check fires when it lands`,
    );
  }

  let hosted = 0;
  for (const [hostedSlug, operators] of Object.entries(pairs).sort()) {
    const page = pages.get(hostedSlug);
    if (!page) {
      problems.push(
        `reciprocal links: src/content/docs/en/${hostedSlug} does not exist, but the contract names it as the hosted half of ${operators.join(", ")} — fix the slug in RECIPROCAL_PAIRS or restore the page`,
      );
      continue;
    }
    const asserted = operators.filter((operator) => !stagedOperators.has(operator));
    if (asserted.length === 0) {
      stagedPairs.push(hostedSlug);
      continue;
    }
    const live = asserted.filter((operator) => pages.has(operator));
    if (live.length === 0) {
      pendingPairs.push(hostedSlug);
      continue;
    }
    hosted++;
    if (!live.some((operator) => page.links.has(operator))) {
      problems.push(
        `${page.path}: no link to any of its operator counterparts (${live.map((o) => `/en/${o}`).join(", ")}) — rule 2 has each half of a hosted/operator pair point at the other; add a visible link`,
      );
    }
  }

  let operator = 0;
  for (const [operatorSlug, hostedSlugs] of [...hostedFor].sort()) {
    if (stagedOperators.has(operatorSlug)) continue;
    const page = pages.get(operatorSlug);
    if (!page) continue;
    const live = hostedSlugs.filter((slug) => pages.has(slug));
    if (live.length === 0) continue;
    operator++;
    if (!live.some((slug) => page.links.has(slug))) {
      problems.push(
        `${page.path}: no link back to any of its hosted counterparts (${live.map((h) => `/en/${h}`).join(", ")}) — the contract is reciprocal, so the operator half links back; one of them is enough`,
      );
    }
  }

  return { problems, pendingPairs, stagedPairs, hosted, operator };
}
