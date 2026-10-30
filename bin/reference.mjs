#!/usr/bin/env node
// bin/reference.mjs
//
// The documentation-owned reference pipeline (plan A1).
//
//   node bin/reference.mjs generate   validate env JSON; write YAML pages and coverage
//   node bin/reference.mjs check      validate env JSON; read-only YAML equality gate
//   node bin/reference.mjs refresh    pinned env JSON/coverage and YAML vendor update
//
// `generate` and `check` read committed environment JSON and vendored YAML,
// touching neither the network nor an application checkout. `check` writes nothing, so
// it is safe to run before a production build. `refresh` is the one operation
// that reads an application checkout, and it reads it through `git show` at an
// explicit ref rather than from its working tree.
//
// Nothing here reads process.env. The generated output is a function of the
// committed inputs alone, which is what makes "regenerate and compare" a real
// gate rather than a reflection of whoever ran it. Paths resolve from
// import.meta.url, so any cwd works.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { validateEnvironmentData } from "./reference/validate-env.mjs";
import { renderConfigurationPages } from "./reference/render-config.mjs";
import { loadManifest, repoRoot, sha256, ROLES, VENDOR_DIR } from "./reference/manifest.mjs";
import { COVERAGE_PATH, DATA_PATH, extractEnvironmentSnapshot } from "./reference/render-env.mjs";

const USAGE = `usage:
  node bin/reference.mjs generate
  node bin/reference.mjs check
  node bin/reference.mjs refresh --repo <path-to-app-checkout> --ref <tag>
  Add --debug to print a stack trace on failure.`;

/**
 * Validate the environment snapshot and build YAML-derived artifacts in memory.
 * Environment JSON and its coverage report are written only by refresh.
 *
 * @param {{root?: string, vendorDir?: string}} [options]
 * @returns {{artifacts: {path: string, content: string}[], coverage: object, warnings: string[]}}
 */
export function build({ root = repoRoot, vendorDir = VENDOR_DIR } = {}) {
  const { manifest, inputs, warnings } = loadManifest({ vendorDir });
  let coverage;
  try {
    const data = JSON.parse(readFileSync(join(root, DATA_PATH), "utf8"));
    coverage = validateEnvironmentData(data, manifest);
  } catch (error) {
    throw new Error(
      `${DATA_PATH}: ${error.message} — use explicit refresh to replace the environment snapshot`,
    );
  }
  const configuration = renderConfigurationPages({ inputs, manifest });
  return {
    artifacts: [...configuration.artifacts],
    coverage,
    configuration: configuration.coverage,
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
 * artifact races every other test file that reads it.
 *
 * @param {{root?: string, vendorDir?: string}} [options]
 * @returns {{problems: string[], coverage: object, warnings: string[], artifacts: object[]}}
 */
export function compareArtifacts({ root = repoRoot, vendorDir } = {}) {
  const { artifacts, coverage, configuration, warnings } = build({ root, vendorDir });
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
  return { problems, coverage, configuration, warnings, artifacts };
}

function summary(coverage, configuration) {
  return (
    `${coverage.published.length} environment records validated; ` +
    `${configuration.records} configuration keys across ` +
    `${configuration.perPage.size} pages (` +
    `${[...configuration.perPage].map(([owner, count]) => `${owner} ${count}`).join(", ")})`
  );
}

function generate() {
  const { artifacts, coverage, configuration, warnings } = build();
  for (const artifact of artifacts) write(repoRoot, artifact.path, artifact.content);
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  console.log(`OK: wrote ${artifacts.length} artifact(s) — ${summary(coverage, configuration)}`);
  for (const artifact of artifacts) console.log(`  ${artifact.path}`);
  return 0;
}

function check() {
  const { problems, coverage, configuration, warnings } = compareArtifacts();
  for (const warning of warnings) console.warn(`WARN: ${warning}`);
  if (problems.length > 0) {
    console.error("FAIL: generated reference output has drifted");
    for (const problem of problems) console.error(`\n${problem}`);
    return 1;
  }
  console.log(
    `OK: environment JSON validated; generated reference matches the vendored inputs — ${summary(coverage, configuration)}`,
  );
  return 0;
}

/**
 * Maintainer-only: extract environment JSON and copy YAML snapshots from a
 * local application checkout at an explicit ref, then rewrite the manifest.
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

  const { manifest } = refreshSnapshots({ repo, ref });
  const { commit } = manifest.upstream;
  const files = manifest.files;
  console.log(
    `OK: refreshed ${files.length} snapshot(s) from ${relative(process.cwd(), repo)} at ${ref} (${commit}).`,
  );
  console.log("Next: node bin/reference.mjs generate, then review the diff.");
  return 0;
}

/** Read and validate everything before replacing any committed input. */
export function refreshSnapshots({ repo, ref, root = repoRoot, vendorDir = VENDOR_DIR }) {
  const { manifest: previous } = loadManifest({ vendorDir, verifySnapshots: false });
  const git = (...args) =>
    execFileSync("git", ["--no-pager", "-C", repo, ...args], { maxBuffer: 1 << 28 });
  const commit = git("rev-parse", "--verify", "--end-of-options", `${ref}^{commit}`)
    .toString("utf8")
    .trim();
  if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error("refresh did not resolve a full commit SHA");
  const readSource = (entry) => {
    const buffer = git("show", `${commit}:${entry.path}`);
    const text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    return {
      buffer,
      text,
      metadata: {
        ...entry,
        sha256: sha256(buffer),
        lines: text.split("\n").length - (text.endsWith("\n") ? 1 : 0),
      },
    };
  };
  const environment = readSource(previous.environmentSource);
  const snapshots = ROLES.flatMap((role) => {
    const entry = previous.files.find((file) => file.role === role);
    return entry ? [readSource(entry)] : [];
  });
  const manifest = {
    ...previous,
    upstream: { ...previous.upstream, release: ref, commit },
    environmentSource: environment.metadata,
    files: snapshots.map(({ metadata, text }) => ({
      ...metadata,
      lines: (text.match(/\n/g) ?? []).length,
    })),
  };
  const extracted = extractEnvironmentSnapshot(environment.text, manifest);
  const inputs = new Map(
    snapshots.map(({ metadata, text }) => [metadata.role, { ...metadata, text }]),
  );
  renderConfigurationPages({ inputs, manifest });
  for (const { metadata, buffer } of snapshots) write(vendorDir, metadata.path, buffer);
  write(root, DATA_PATH, `${JSON.stringify(extracted.data, null, 2)}\n`);
  write(root, COVERAGE_PATH, extracted.report);
  write(vendorDir, "manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
  return { manifest, ...extracted };
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
    if (args.includes("--debug")) console.error(error.stack);
    return 2;
  }
}

// Only when run as a script. The tests import `build` and `diffSummary` from
// here, and an unguarded call would run the CLI during collection.
if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))
) {
  process.exit(main(process.argv.slice(2)));
}
