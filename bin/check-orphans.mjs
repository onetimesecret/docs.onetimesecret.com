#!/usr/bin/env node
//
// check-orphans.mjs — fail on EN docs pages reachable from no sidebar link.
//
// Every slug under src/content/docs/en (except the root "index") must either
// be linked from config/sidebar.mjs or listed in config/nav-orphans.allow
// with a "# reason" comment. Stale allowlist entries (slug now linked, or
// page deleted) also fail, so the list cannot rot.
//
// Usage: pnpm run check:orphans
import { docsSlugs, normalizeLink, parseAllowlist, sidebarLinks } from "./lib/nav.mjs";

const ALLOWLIST = "config/nav-orphans.allow";

const linked = new Set((await sidebarLinks()).map(normalizeLink));
const docs = docsSlugs();
const allowed = new Set();
const { entries, problems } = parseAllowlist(ALLOWLIST);

for (const { value: slug } of entries) {
  allowed.add(slug);
  if (linked.has(slug)) {
    problems.push(`stale allowlist entry "${slug}": now linked from the sidebar — remove it from ${ALLOWLIST}`);
  } else if (!docs.has(slug)) {
    problems.push(`stale allowlist entry "${slug}": page no longer exists — remove it from ${ALLOWLIST}`);
  }
}

for (const slug of [...docs].sort()) {
  if (slug === "index" || linked.has(slug) || allowed.has(slug)) continue;
  problems.push(
    `orphaned page "${slug}": not linked from config/sidebar.mjs — add a sidebar link, or allowlist it with a reason in ${ALLOWLIST}`,
  );
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`FAIL: ${problem}`);
  process.exit(1);
}

console.log(`check:orphans OK — ${docs.size} EN pages, ${allowed.size} allowlisted orphans`);
