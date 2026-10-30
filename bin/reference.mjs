#!/usr/bin/env node
// bin/reference.mjs
//
// The documentation-owned reference pipeline (plan A1).
//
//   node bin/reference.mjs check      validate the committed environment and configuration JSON
//   node bin/reference.mjs refresh    re-extract both snapshots from a pinned upstream revision
//
// `check` reads the manifest and the two committed snapshots under
// src/data/reference/, touching neither the network nor an application
// checkout, and writes nothing, so it is safe to run before a production build.
// `refresh` is the one operation that reads an application checkout, and it
// reads it through `git show` at an explicit ref rather than from its working
// tree.
//
// The pages themselves are rendered at build time by Astro components from the
// committed JSON. Refresh changes the data; local code changes its
// presentation.
//
// Nothing here reads process.env. Paths resolve from import.meta.url, so any
// cwd works.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { validateEnvironmentData } from "./reference/validate-env.mjs";
import { validateConfigurationData } from "./reference/validate-config.mjs";
import {
  CONFIG_COVERAGE_PATH,
  CONFIG_DATA_PATH,
  extractConfigurationSnapshot,
} from "./reference/extract-config.mjs";
import { loadManifest, MANIFEST_PATH, repoRoot, sha256, ROLES } from "./reference/manifest.mjs";
import { COVERAGE_PATH, DATA_PATH, extractEnvironmentSnapshot } from "./reference/render-env.mjs";

const USAGE = `usage:
  node bin/reference.mjs check
  node bin/reference.mjs refresh --repo <path-to-app-checkout> --ref <tag>
  Add --debug to print a stack trace on failure.`;

/**
 * Validate both committed snapshots against the manifest. Writes nothing.
 *
 * `root` and `manifestPath` are parameters so the tests can validate a
 * throwaway copy instead of the tracked tree.
 *
 * @param {{root?: string, manifestPath?: string}} [options]
 * @returns {{environment: object, configuration: object, warnings: string[]}}
 */
export function validateSnapshots({ root = repoRoot, manifestPath = MANIFEST_PATH } = {}) {
  const { manifest, warnings } = loadManifest({ manifestPath });
  const read = (path, validate) => {
    try {
      return validate(JSON.parse(readFileSync(join(root, path), "utf8")), manifest);
    } catch (error) {
      throw new Error(`${path}: ${error.message} — use explicit refresh to replace the snapshot`);
    }
  };
  const environment = read(DATA_PATH, validateEnvironmentData);
  const configuration = read(CONFIG_DATA_PATH, validateConfigurationData);
  return { environment, configuration, warnings };
}

function summary({ environment, configuration }) {
  return (
    `${environment.published.length} environment records; ` +
    `${configuration.records.length} configuration keys across ` +
    `${configuration.perPage.size} pages (` +
    `${[...configuration.perPage].map(([owner, count]) => `${owner} ${count}`).join(", ")}), ` +
    `${configuration.blocks} conditional block(s), ${configuration.structural} structural section(s)`
  );
}

function check() {
  const result = validateSnapshots();
  for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
  console.log(`OK: environment JSON validated; configuration JSON validated — ${summary(result)}`);
  return 0;
}

function write(root, path, content) {
  const absolute = join(root, path);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
}

/**
 * Maintainer-only: re-extract both snapshots from a local application
 * checkout at an explicit ref, then rewrite the manifest.
 *
 * Reads with `git show <ref>:<path>`, never from the checkout's working tree,
 * so an uncommitted local edit cannot become a documented upstream fact. No
 * network call is made here; fetching the checkout is a separate step the
 * maintainer runs (see docs/reference/README.md).
 */
function refresh(args) {
  const repo = flag(args, "--repo");
  const ref = flag(args, "--ref");
  if (!repo || !ref) {
    console.error("FAIL: refresh needs --repo <path-to-app-checkout> and --ref <tag>");
    console.error(USAGE);
    return 2;
  }

  const result = refreshSnapshots({ repo, ref });
  const { commit } = result.manifest.upstream;
  console.log(
    `OK: refreshed the environment and configuration snapshots from ${relative(process.cwd(), repo)} at ${ref} (${commit}) — ${summary(
      {
        environment: { published: result.environment.coverage.published },
        configuration: validateConfigurationData(result.configuration.data, result.manifest),
      },
    )}`,
  );
  console.log("Next: review the diff under src/data/reference/ and docs/reference/.");
  return 0;
}

/** Read and validate everything before replacing any committed snapshot. */
export function refreshSnapshots({ repo, ref, root = repoRoot, manifestPath = MANIFEST_PATH }) {
  const { manifest: previous } = loadManifest({ manifestPath, requireHashes: false });
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
      text,
      metadata: {
        path: entry.path,
        ...(entry.role ? { role: entry.role } : {}),
        sha256: sha256(buffer),
        lines: text.split("\n").length - (text.endsWith("\n") ? 1 : 0),
      },
    };
  };
  const environment = readSource(previous.environmentSource);
  const sources = ROLES.map((role) => {
    const entry = previous.configurationSources.find((source) => source.role === role);
    if (!entry) throw new Error(`manifest declares no ${role} source to refresh`);
    return readSource(entry);
  });
  const manifest = {
    ...previous,
    upstream: { ...previous.upstream, release: ref, commit },
    environmentSource: environment.metadata,
    configurationSources: sources.map(({ metadata }) => metadata),
  };
  const extractedEnvironment = extractEnvironmentSnapshot(environment.text, manifest);
  const inputs = new Map(
    sources.map(({ metadata, text }) => [metadata.role, { ...metadata, text }]),
  );
  const extractedConfiguration = extractConfigurationSnapshot({ inputs, manifest });
  // Round-trip through JSON before validating: the committed file is what
  // `check` will read, not the in-memory object.
  const serialized = `${JSON.stringify(extractedConfiguration.data, null, 2)}\n`;
  validateConfigurationData(JSON.parse(serialized), manifest);

  write(root, DATA_PATH, `${JSON.stringify(extractedEnvironment.data, null, 2)}\n`);
  write(root, COVERAGE_PATH, extractedEnvironment.report);
  write(root, CONFIG_DATA_PATH, serialized);
  write(root, CONFIG_COVERAGE_PATH, extractedConfiguration.report);
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return { manifest, environment: extractedEnvironment, configuration: extractedConfiguration };
}

function flag(args, name) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

export const COMMANDS = { check, refresh };

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

// Only when run as a script. The tests import `validateSnapshots` and
// `refreshSnapshots` from here, and an unguarded call would run the CLI during
// collection.
if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))
) {
  process.exit(main(process.argv.slice(2)));
}
