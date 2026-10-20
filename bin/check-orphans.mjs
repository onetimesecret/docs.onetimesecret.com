#!/usr/bin/env node
//
// check-orphans.mjs — fail on EN docs pages reachable from no sidebar link.
//
// Every slug under src/content/docs/en (except the root "index") must be
//
//  1. linked from config/sidebar.mjs, or
//  2. linked from a sidebar-linked page in the SAME directory (a hub — the
//     table on self-hosting/upgrade-guides is the canonical case: the nine
//     version guides are reached from it and from release notes, never
//     browsed, and listing them in the sidebar buried the twelve pages
//     operators do browse), or
//  3. listed in config/nav-orphans.allow with a "# reason" comment.
//
// Rule 2 is one hop and same-directory only. One hop, because "reachable from
// something reachable" is true of every page with an inbound link and would
// make the check vacuous. Same directory, because that is the shape of an
// index-and-children section; a page that only the homepage links to is still
// filed nowhere. Only absolute `/en/...` links count — see enLinkSlugs().
//
// Stale allowlist entries (slug now linked or hub-linked, or page deleted)
// also fail, so the list cannot rot.
//
// Usage: pnpm run check:orphans
import { readFileSync } from "node:fs";

import { docsPages, enLinkSlugs, normalizeLink, parseAllowlist, sidebarLinks } from "./lib/nav.mjs";

const ALLOWLIST = "config/nav-orphans.allow";

const linked = new Set((await sidebarLinks()).map(normalizeLink));
const pages = docsPages();
const docs = new Set(pages.map((page) => page.slug));
const byDir = new Map();
for (const page of pages) {
  if (!byDir.has(page.dir)) byDir.set(page.dir, new Set());
  byDir.get(page.dir).add(page.slug);
}

// slug -> the sidebar-linked sibling that links to it.
const hubLinked = new Map();
for (const hub of pages) {
  if (!linked.has(hub.slug)) continue;
  const siblings = byDir.get(hub.dir);
  for (const target of enLinkSlugs(readFileSync(hub.path, "utf8"))) {
    if (target === hub.slug || linked.has(target) || !siblings.has(target)) continue;
    if (!hubLinked.has(target)) hubLinked.set(target, hub.slug);
  }
}

const allowed = new Set();
const { entries, problems } = parseAllowlist(ALLOWLIST);

for (const { value: slug } of entries) {
  allowed.add(slug);
  if (linked.has(slug)) {
    problems.push(`stale allowlist entry "${slug}": now linked from the sidebar — remove it from ${ALLOWLIST}`);
  } else if (hubLinked.has(slug)) {
    problems.push(
      `stale allowlist entry "${slug}": now linked from its sidebar-linked sibling "${hubLinked.get(slug)}" — remove it from ${ALLOWLIST}`,
    );
  } else if (!docs.has(slug)) {
    problems.push(`stale allowlist entry "${slug}": page no longer exists — remove it from ${ALLOWLIST}`);
  }
}

for (const slug of [...docs].sort()) {
  if (slug === "index" || linked.has(slug) || hubLinked.has(slug) || allowed.has(slug)) continue;
  problems.push(
    `orphaned page "${slug}": not linked from config/sidebar.mjs or from a sidebar-linked page in its directory — add a sidebar link, link it from its section's index, or allowlist it with a reason in ${ALLOWLIST}`,
  );
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(
  `check:orphans OK — ${docs.size} EN pages, ${linked.size} sidebar-linked, ${hubLinked.size} hub-linked, ${allowed.size} allowlisted orphans`,
);
