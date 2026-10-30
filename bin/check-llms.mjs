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

// Outside a git checkout (a source tarball, some container builds) git is
// missing or refuses, and the rules treat unknown history as "not drift"
// rather than crashing the check.
let historyKnown = true;

function git(...args) {
  try {
    return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    historyKnown = false;
    return null;
  }
}

function changedOn(path) {
  const status = git("status", "--porcelain", "--", path);
  if (status === null) return null;
  if (status !== "") return today;
  return git("log", "-1", "--format=%cs", "--", path) || null;
}

const text = readFileSync(join(repoRoot, LLMS), "utf8");
const { problems, summary } = auditLlms(text, { pages, changedOn, today });

if (problems.length > 0) {
  console.error(`check:llms FAILED — ${problems.length} problem(s) in ${LLMS}:\n`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    "\nThe age and drift rules compare the index with the whole site, so a failure can predate this branch; " +
      "the fix is the same either way: re-read public/llms.txt and move its Last updated date.",
  );
  process.exit(1);
}

console.log(
  `check:llms OK — ${summary.links} links into the site resolve to ${summary.pages} EN pages, none draft; ` +
    `Last updated ${summary.stamp} (${summary.ageDays} day(s) ago, limit ${MAX_AGE_DAYS}); ` +
    (historyKnown ? "no linked page changed since" : "git history unavailable, drift rule skipped"),
);
