// bin/reference/manifest.mjs
//
// Load and verify src/data/reference/manifest.json (plan A1). Plain Node ESM,
// zero dependencies.
//
// The manifest pins the upstream revision the reference documents and records,
// for every upstream input, the path that was read, its SHA-256 and its line
// count. No upstream bytes are kept in this repository: the environment and
// configuration snapshots beside the manifest are what refresh extracted from
// those pinned blobs, and their validators check them against the metadata
// recorded here.
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync } from "node:fs";
import { dirname, join, relative, win32 } from "node:path";
import { fileURLToPath } from "node:url";

/** Repository root, resolved from this file so any cwd works. */
export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const MANIFEST_PATH = join(repoRoot, "src", "data", "reference", "manifest.json");

/** Roles a configuration source may declare. */
export const ROLES = ["config-defaults", "auth-defaults", "logging-defaults", "billing-example"];

const SHA256 = /^[0-9a-f]{64}$/;
const FULL_SHA = /^[0-9a-f]{40}$/;
export const EXTRACTOR_FORMAT_VERSION = 1;

/** Upstream-only input: its bytes are deliberately not kept here. */
export function validateEnvironmentSource(source) {
  if (
    source?.path !== ".env.reference" ||
    typeof source.sha256 !== "string" ||
    !SHA256.test(source.sha256) ||
    !Number.isSafeInteger(source.lines) ||
    source.lines < 1
  ) {
    throw new Error(
      "environmentSource must describe .env.reference with a SHA-256 hash and positive line count",
    );
  }
}

export function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

/** A manifest path usable as `git show <commit>:<path>` and nothing more. */
export function isPortableUpstreamPath(path) {
  return (
    typeof path === "string" &&
    path !== "" &&
    !path.startsWith("/") &&
    !win32.isAbsolute(path) &&
    !/^[a-z]:/i.test(path) &&
    !path.includes("\\") &&
    !path.split("/").includes("..")
  );
}

/**
 * Load and verify the manifest.
 *
 * `requireHashes: false` is for refresh, which reads the previous manifest to
 * learn which upstream paths to fetch and then writes fresh hashes and line
 * counts itself. An onboarding entry may then carry only `path` and `role`.
 *
 * @param {{manifestPath?: string, requireHashes?: boolean}} [options]
 * @returns {{manifest: object, warnings: string[]}}
 */
export function loadManifest({ manifestPath = MANIFEST_PATH, requireHashes = true } = {}) {
  const shown = relative(repoRoot, manifestPath);
  if (!existsSync(manifestPath)) {
    throw new Error(
      `${shown} is missing — the reference pins its upstream revision there, so there is nothing to validate against`,
    );
  }
  // A symlinked manifest would let a read land outside the tree it describes.
  if (lstatSync(manifestPath).isSymbolicLink()) {
    throw new Error(`${shown}: the manifest must be a regular file, not a symlink`);
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`${shown} is not valid JSON — ${error.message}`);
  }

  const problems = [];
  const warnings = [];

  if (manifest.extractorFormatVersion !== EXTRACTOR_FORMAT_VERSION) {
    problems.push(`unsupported extractorFormatVersion: expected ${EXTRACTOR_FORMAT_VERSION}`);
  }
  try {
    validateEnvironmentSource(manifest.environmentSource);
  } catch (error) {
    problems.push(error.message);
  }
  const upstream = manifest.upstream ?? {};
  if (typeof upstream.repository !== "string" || upstream.repository === "") {
    problems.push("upstream.repository must name the application repository");
  }
  if (typeof upstream.commit !== "string" || !FULL_SHA.test(upstream.commit)) {
    problems.push(
      "upstream.commit must be a full 40-character SHA — an abbreviated SHA is ambiguous and a branch name is not a revision",
    );
  }
  if (typeof upstream.release !== "string" || upstream.release === "") {
    problems.push("upstream.release must name the release this snapshot documents");
  }

  // Accountability. Plan A6 asks for a named refresh owner and a backup
  // reviewer. This project has one maintainer, so the second field cannot name
  // a person without recording a fiction, and a check satisfied by a fiction is
  // worse than one that is honest about the gap. So:
  //
  //   refreshOwner        must name someone, and "unassigned" still warns.
  //   backupReviewer      may declare there is none, in the "none: <reason>"
  //                       form, which then requires accountabilityNote to say
  //                       what breaks when the single maintainer is away.
  //
  // Only the literal "unassigned" values warn. Missing, empty or non-string
  // fields fail validation, as does a declared absence without its risk note.
  if (typeof manifest.refreshOwner !== "string" || manifest.refreshOwner === "") {
    problems.push('refreshOwner must be a string (use "unassigned" until a handle is recorded)');
  } else if (manifest.refreshOwner === "unassigned") {
    warnings.push(
      `refreshOwner is "unassigned" in ${shown} — plan A6 needs a real handle recorded before Phase 4 exits`,
    );
  }

  if (typeof manifest.backupReviewer !== "string" || manifest.backupReviewer === "") {
    problems.push(
      'backupReviewer must be a string (use "none: <reason>" when there is no second reviewer)',
    );
  } else if (manifest.backupReviewer === "unassigned") {
    warnings.push(
      `backupReviewer is "unassigned" in ${shown} — plan A6 needs a real handle, or "none: <reason>" with an accountabilityNote`,
    );
  } else if (manifest.backupReviewer.startsWith("none")) {
    // A declared absence is accepted, but not silently: the note is what makes
    // it a recorded risk instead of an empty field.
    if (
      typeof manifest.accountabilityNote !== "string" ||
      manifest.accountabilityNote.trim() === ""
    ) {
      problems.push(
        "backupReviewer declares no second reviewer, so accountabilityNote must record what breaks while the refresh owner is unavailable",
      );
    }
  }

  const sources = manifest.configurationSources;
  if (!Array.isArray(sources) || sources.length === 0) {
    problems.push("configurationSources must be a non-empty array of upstream source entries");
    throw new Error(describe(problems, shown));
  }

  const seenPaths = new Set();
  const seenRoles = new Set();

  for (const source of sources) {
    const where = `configurationSources entry ${JSON.stringify(source?.path ?? "(no path)")}`;
    if (!isPortableUpstreamPath(source?.path)) {
      problems.push(
        `${where}: path must be relative, use / separators, and must not escape the upstream repository`,
      );
      continue;
    }
    if (seenPaths.has(source.path)) {
      problems.push(`${where}: listed twice`);
      continue;
    }
    seenPaths.add(source.path);

    if (!ROLES.includes(source.role)) {
      problems.push(
        `${where}: role ${JSON.stringify(source.role)} is not one of ${ROLES.join(", ")}`,
      );
    } else if (seenRoles.has(source.role)) {
      problems.push(`${where}: role ${source.role} is claimed by more than one file`);
    } else {
      seenRoles.add(source.role);
    }

    if (!requireHashes) continue;

    if (typeof source.sha256 !== "string" || !SHA256.test(source.sha256)) {
      problems.push(`${where}: sha256 must be 64 lower-case hex characters`);
    }
    if (!Number.isSafeInteger(source.lines) || source.lines < 1) {
      problems.push(`${where}: lines must be a positive integer`);
    }
  }

  for (const role of ROLES) {
    if (!seenRoles.has(role)) {
      problems.push(`no entry declares the ${role} role, which the configuration reference reads`);
    }
  }

  if (problems.length > 0) throw new Error(describe(problems, shown));

  return { manifest, warnings };
}

function describe(problems, shown) {
  return [`${shown} failed validation:`, ...problems.map((problem) => `  - ${problem}`)].join("\n");
}
