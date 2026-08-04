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
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { docsSlugs, normalizeLink, repoRoot, sidebarLinks } from "./lib/nav.mjs";

const ALLOWLIST = "config/nav-orphans.allow";
const allowlistPath = join(repoRoot, ALLOWLIST);

const linked = new Set((await sidebarLinks()).map(normalizeLink));
const docs = docsSlugs();
const allowed = new Set();
const problems = [];

const lines = existsSync(allowlistPath)
  ? readFileSync(allowlistPath, "utf8").split("\n")
  : [];
for (const [i, raw] of lines.entries()) {
  const line = raw.trim();
  if (line === "" || line.startsWith("#")) continue;
  const match = line.match(/^(\S+)\s+#\s*(\S.*)$/);
  if (!match) {
    problems.push(`${ALLOWLIST}:${i + 1}: entry needs a trailing "# reason" comment: "${line}"`);
    continue;
  }
  const slug = match[1];
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
