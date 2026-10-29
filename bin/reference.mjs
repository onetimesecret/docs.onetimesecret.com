#!/usr/bin/env node
// bin/reference.mjs
//
// The documentation-owned reference pipeline (plan A1).
//
//   node bin/reference.mjs generate   write the page and the coverage report
//   node bin/reference.mjs check      read-only equality gate, exit 1 on drift
//   node bin/reference.mjs refresh    maintainer-only snapshot update
//
// `generate` and `check` read nothing but vendor/onetimesecret/ and touch
// neither the network nor an application checkout. `check` writes nothing, so
// it is safe to run before a production build. `refresh` is the one operation
// that reads an application checkout, and it reads it through `git show` at an
// explicit ref rather than from its working tree.
//
// Nothing here reads process.env. The generated page is a function of the
// vendored bytes alone, which is what makes "regenerate and compare" a real
// gate rather than a reflection of whoever ran it. Paths resolve from
// import.meta.url, so any cwd works.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { parseEnvReference } from "./reference/env-parser.mjs";
import { loadManifest, repoRoot, sha256, ROLES, VENDOR_DIR } from "./reference/manifest.mjs";
import {
  COVERAGE_PATH,
  PAGE_PATH,
  renderCoverageReport,
  renderEnvironmentPage,
} from "./reference/render-env.mjs";

const USAGE = `usage:
  node bin/reference.mjs generate
  node bin/reference.mjs check
  node bin/reference.mjs refresh --repo <path-to-app-checkout> --ref <tag>`;

/**
 * Build every artifact in memory.
 *
 * @param {{vendorDir?: string}} [options]
 * @returns {{artifacts: {path: string, content: string}[], coverage: object, warnings: string[]}}
 */
export function build({ vendorDir = VENDOR_DIR } = {}) {
  const { manifest, inputs, warnings } = loadManifest({ vendorDir });
  const envInput = inputs.get("env-reference");
  const parsed = parseEnvReference(envInput.text, { sourceName: envInput.path });
  const { page, coverage, sections } = renderEnvironmentPage({ parsed, manifest });
  const report = renderCoverageReport({ parsed, manifest, coverage, sections });
  return {
    artifacts: [
      { path: PAGE_PATH, content: page },
      { path: COVERAGE_PATH, content: report },
    ],
    coverage,
    warnings,
  };
}

/** A unified-diff-style summary of the first divergence between two texts. */
export function diffSummary(path, expected, actual) {
  const want = expected.split("\n");
  const have = actual.split("\n");
  let start = 0;
  while (start < want.length && start < have.length && want[start] === have[start]) start++;
  let tailWant = want.length;
  let tailHave = have.length;
  while (tailWant > start && tailHave > start && want[tailWant - 1] === have[tailHave - 1]) {
    tailWant--;
    tailHave--;
  }
  const context = 3;
  const from = Math.max(0, start - context);
  const lines = [
    `--- ${path} (tracked)`,
    `+++ ${path} (regenerated)`,
    `@@ -${from + 1},${tailHave - from} +${from + 1},${tailWant - from} @@`,
  ];
  for (let i = from; i < start; i++) lines.push(` ${have[i]}`);
  for (let i = start; i < tailHave && i < start + 20; i++) lines.push(`-${have[i]}`);
  if (tailHave - start > 20) lines.push(`- ... ${tailHave - start - 20} more removed lines`);
  for (let i = start; i < tailWant && i < start + 20; i++) lines.push(`+${want[i]}`);
  if (tailWant - start > 20) lines.push(`+ ... ${tailWant - start - 20} more added lines`);
  return lines.join("\n");
}

function write(root, path, content) {
  const absolute = join(root, path);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
}

/**
 * Compare the generated artifacts against the ones on disk under `root`.
 *
 * Pure in the sense that matters: it reads and reports, and writes nothing.
 * `root` and `vendorDir` are parameters so the tests can compare a throwaway
 * copy instead of mutating the tracked tree — a drift test that edits the real
 * page races every other test file that reads it.
 *
 * @param {{root?: string, vendorDir?: string}} [options]
 * @returns {{problems: string[], coverage: object, warnings: string[], artifacts: object[]}}
 */
export function compareArtifacts({ root = repoRoot, vendorDir } = {}) {
  const { artifacts, coverage, warnings } = build(vendorDir ? { vendorDir } : {});
  const problems = [];
  for (const artifact of artifacts) {
    const absolute = join(root, artifact.path);
    if (!existsSync(absolute)) {
      problems.push(`${artifact.path} does not exist — run \`pnpm run reference:generate\``);
      continue;
    }
    const tracked = readFileSync(absolute, "utf8");
    if (tracked !== artifact.content) {
      problems.push(
        `${artifact.path} differs from what the vendored inputs generate — run \`pnpm run reference:generate\` and commit the result\n${diffSummary(artifact.path, artifact.content, tracked)}`,
      );
    }
  }
  return { problems, coverage, warnings, artifacts };
}

function generate() {
  const { artifacts, coverage, warnings } = build();
  for (const artifact of artifacts) write(repoRoot, artifact.path, artifact.content);
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  console.log(
    `OK: wrote ${artifacts.map((artifact) => artifact.path).join(", ")} — ` +
      `${coverage.published.length} published, ${coverage.excluded.length} excluded, ` +
      `${coverage.unresolved.length} unresolved of ${coverage.totalRecognized} recognized lines`,
  );
  return 0;
}

function check() {
  const { problems, coverage, warnings } = compareArtifacts();
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  if (problems.length > 0) {
    console.error("FAIL: generated reference output has drifted");
    for (const problem of problems) console.error(`\n${problem}`);
    return 1;
  }
  console.log(
    `OK: generated reference matches the vendored inputs — ` +
      `${coverage.published.length} published, ${coverage.excluded.length} excluded, ` +
      `${coverage.unresolved.length} unresolved of ${coverage.totalRecognized} recognized lines`,
  );
  return 0;
}

/**
 * Maintainer-only: copy snapshots out of a local application checkout at an
 * explicit ref and rewrite the manifest.
 *
 * Reads with `git show <ref>:<path>`, never from the checkout's working tree,
 * so an uncommitted local edit cannot become a documented upstream fact. No
 * network call is made here; fetching the checkout is a separate step the
 * maintainer runs (see vendor/onetimesecret/README.md).
 */
function refresh(args) {
  const repo = flag(args, "--repo");
  const ref = flag(args, "--ref");
  if (!repo || !ref) {
    console.error("FAIL: refresh needs --repo <path-to-app-checkout> and --ref <tag>");
    console.error(USAGE);
    return 2;
  }

  const git = (...rest) => execFileSync("git", ["-C", repo, "--no-pager", ...rest], { maxBuffer: 1 << 28 });
  const commit = git("rev-parse", `${ref}^{commit}`).toString("utf8").trim();

  const manifestPath = join(VENDOR_DIR, "manifest.json");
  const previous = JSON.parse(readFileSync(manifestPath, "utf8"));
  const files = [];
  for (const role of ROLES) {
    const entry = previous.files.find((file) => file.role === role);
    if (!entry) continue;
    const buffer = git("show", `${commit}:${entry.path}`);
    const absolute = join(VENDOR_DIR, entry.path);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, buffer);
    files.push({
      path: entry.path,
      role,
      sha256: sha256(buffer),
      lines: (buffer.toString("utf8").match(/\n/g) ?? []).length,
    });
  }

  const manifest = {
    ...previous,
    upstream: { ...previous.upstream, release: ref, commit },
    files,
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `OK: refreshed ${files.length} snapshot(s) from ${relative(process.cwd(), repo)} at ${ref} (${commit}).`,
  );
  console.log("Next: node bin/reference.mjs generate, then review the diff.");
  return 0;
}

function flag(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

export const COMMANDS = { generate, check, refresh };

/** Run a subcommand and return its exit code. */
export function main(argv) {
  const [command, ...args] = argv;
  if (!Object.hasOwn(COMMANDS, command ?? "")) {
    console.error(`FAIL: unknown command ${JSON.stringify(command ?? "")}`);
    console.error(USAGE);
    return 2;
  }
  try {
    return COMMANDS[command](args);
  } catch (error) {
    console.error(`FAIL: ${error.message}`);
    return 2;
  }
}

// Only when run as a script. The tests import `build` and `diffSummary` from
// here, and an unguarded call would run the CLI during collection.
if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  process.exit(main(process.argv.slice(2)));
}
