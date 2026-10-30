#!/usr/bin/env node
//
// check-llms.mjs — fail when public/llms.txt has drifted from the site it
// describes. Source-only: reads src/content/docs/en and git history, never
// dist/ or the network, so it runs before the build.
//
// The rules live in bin/lib/llms.mjs (shape, review stamp, English links
// that resolve to non-draft pages, no duplicates, stamp age, and no linked
// page changed after the stamp). This file only gathers their input: the EN
// page inventory with each page's draft flag, and each page's last change
// date from git — the last commit touching the file, or today when the file
// has uncommitted changes, so a local run sees the edit before it is
// committed.
//
// Usage: pnpm run check:llms
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { docsPages, parseFrontmatter } from "./lib/frontmatter.mjs";
import { MAX_AGE_DAYS, auditLlms, isoDate } from "./lib/llms.mjs";
import { repoRoot } from "./lib/nav.mjs";

const LLMS = "public/llms.txt";

const today = isoDate(new Date());

const pages = new Map();
for (const page of docsPages("en")) {
  const { fields } = parseFrontmatter(page.source);
  pages.set(page.slug, { path: page.path, draft: fields.draft === "true" });
}

function git(...args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

function changedOn(path) {
  if (git("status", "--porcelain", "--", path) !== "") return today;
  return git("log", "-1", "--format=%cs", "--", path) || null;
}

const text = readFileSync(join(repoRoot, LLMS), "utf8");
const { problems, summary } = auditLlms(text, { pages, changedOn, today });

if (problems.length > 0) {
  console.error(`check:llms FAILED — ${problems.length} problem(s) in ${LLMS}:\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(
  `check:llms OK — ${summary.links} links into the site resolve to ${summary.pages} EN pages, none draft; ` +
    `Last updated ${summary.stamp} (${summary.ageDays} day(s) ago, limit ${MAX_AGE_DAYS}); no linked page changed since`,
);
