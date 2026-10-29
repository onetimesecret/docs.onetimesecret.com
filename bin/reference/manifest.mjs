// bin/reference/manifest.mjs
//
// Load and verify vendor/onetimesecret/manifest.json and the snapshots it
// describes (plan A1). Plain Node ESM, zero dependencies.
//
// Validation runs BEFORE any parsing, and it is bidirectional: every file the
// manifest names must exist and hash as recorded, and every file present under
// vendor/onetimesecret/ must be named by the manifest. One direction alone is
// not enough — hashing only what the manifest lists lets an untracked extra
// input sit in the directory and get picked up by a later adapter, and listing
// files without hashing them lets a local edit publish itself as upstream
// fact.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

/** Repository root, resolved from this file so any cwd works. */
export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const VENDOR_DIR = join(repoRoot, "vendor", "onetimesecret");
export const MANIFEST_PATH = join(VENDOR_DIR, "manifest.json");

/** Roles a vendored file may declare. */
export const ROLES = [
  "env-reference",
  "config-defaults",
  "auth-defaults",
  "logging-defaults",
  "billing-example",
];

/** Files that live beside the snapshots and are not inputs. */
const NOT_INPUTS = new Set(["manifest.json", "README.md"]);

const SHA256 = /^[0-9a-f]{64}$/;
const FULL_SHA = /^[0-9a-f]{40}$/;

export function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

/** Every file under `dir`, as paths relative to `dir` with `/` separators. */
function filesUnder(dir) {
  const found = [];
  const walk = (current) => {
    for (const name of readdirSync(current).sort()) {
      const path = join(current, name);
      if (statSync(path).isDirectory()) walk(path);
      else found.push(relative(dir, path).split(sep).join("/"));
    }
  };
  walk(dir);
  return found;
}

/**
 * Load the manifest, verify it and read every input.
 *
 * @param {{vendorDir?: string}} [options]
 * @returns {{manifest: object, inputs: Map<string, {path: string, role: string, text: string}>,
 *            warnings: string[]}}
 */
export function loadManifest({ vendorDir = VENDOR_DIR } = {}) {
  const manifestPath = join(vendorDir, "manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error(
      `${relative(repoRoot, manifestPath)} is missing — the generator reads vendored snapshots only, so there is nothing to generate from`,
    );
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    throw new Error(`${relative(repoRoot, manifestPath)} is not valid JSON — ${error.message}`);
  }

  const problems = [];
  const warnings = [];

  if (!Number.isInteger(manifest.extractorFormatVersion)) {
    problems.push("extractorFormatVersion must be an integer");
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
  // Both stay warnings rather than failures: this gate exists to keep the
  // obligation visible, and failing here would stop the pipeline the obligation
  // is about.
  if (typeof manifest.refreshOwner !== "string" || manifest.refreshOwner === "") {
    problems.push('refreshOwner must be a string (use "unassigned" until a handle is recorded)');
  } else if (manifest.refreshOwner === "unassigned") {
    warnings.push(
      'refreshOwner is "unassigned" in vendor/onetimesecret/manifest.json — plan A6 needs a real handle recorded before Phase 4 exits',
    );
  }

  if (typeof manifest.backupReviewer !== "string" || manifest.backupReviewer === "") {
    problems.push('backupReviewer must be a string (use "none: <reason>" when there is no second reviewer)');
  } else if (manifest.backupReviewer === "unassigned") {
    warnings.push(
      'backupReviewer is "unassigned" in vendor/onetimesecret/manifest.json — plan A6 needs a real handle, or "none: <reason>" with an accountabilityNote',
    );
  } else if (manifest.backupReviewer.startsWith("none")) {
    // A declared absence is accepted, but not silently: the note is what makes
    // it a recorded risk instead of an empty field.
    if (typeof manifest.accountabilityNote !== "string" || manifest.accountabilityNote.trim() === "") {
      problems.push(
        'backupReviewer declares no second reviewer, so accountabilityNote must record what breaks while the refresh owner is unavailable',
      );
    }
  }

  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    problems.push("files must be a non-empty array of snapshot entries");
    throw new Error(describe(problems, manifestPath));
  }

  const inputs = new Map();
  const seenPaths = new Set();
  const seenRoles = new Set();

  for (const file of manifest.files) {
    const where = `files entry ${JSON.stringify(file?.path ?? "(no path)")}`;
    if (typeof file.path !== "string" || file.path === "") {
      problems.push(`${where}: path must be a non-empty string`);
      continue;
    }
    if (file.path.startsWith("/") || file.path.split("/").includes("..")) {
      problems.push(`${where}: path must be relative and must not escape the vendor directory`);
      continue;
    }
    if (seenPaths.has(file.path)) {
      problems.push(`${where}: listed twice`);
      continue;
    }
    seenPaths.add(file.path);

    if (!ROLES.includes(file.role)) {
      problems.push(`${where}: role ${JSON.stringify(file.role)} is not one of ${ROLES.join(", ")}`);
    } else if (seenRoles.has(file.role)) {
      problems.push(`${where}: role ${file.role} is claimed by more than one file`);
    } else {
      seenRoles.add(file.role);
    }

    if (typeof file.sha256 !== "string" || !SHA256.test(file.sha256)) {
      problems.push(`${where}: sha256 must be 64 lower-case hex characters`);
      continue;
    }

    const absolute = join(vendorDir, file.path);
    if (!existsSync(absolute)) {
      problems.push(`${where}: the file does not exist — the manifest names an input that is not vendored`);
      continue;
    }

    const buffer = readFileSync(absolute);
    const actual = sha256(buffer);
    if (actual !== file.sha256) {
      problems.push(
        `${where}: sha256 is ${file.sha256} but the file hashes to ${actual} — either the snapshot was edited locally, or it was refreshed without rewriting the manifest`,
      );
      continue;
    }

    const text = buffer.toString("utf8");
    const lines = (text.match(/\n/g) ?? []).length;
    if (Number.isInteger(file.lines) && file.lines !== lines) {
      problems.push(`${where}: lines is ${file.lines} but the file has ${lines}`);
    }
    inputs.set(file.role, { path: file.path, role: file.role, text });
  }

  if (!seenRoles.has("env-reference")) {
    problems.push("no file declares the env-reference role, which is the minimum input");
  }

  for (const path of filesUnder(vendorDir)) {
    if (NOT_INPUTS.has(path) || seenPaths.has(path)) continue;
    problems.push(
      `vendor/onetimesecret/${path} is not listed in the manifest — an unlisted file under the vendor directory is an unprovenanced input; list it with its role and hash, or remove it`,
    );
  }

  if (problems.length > 0) throw new Error(describe(problems, manifestPath));

  return { manifest, inputs, warnings };
}

function describe(problems, manifestPath) {
  return [
    `${relative(repoRoot, manifestPath)} failed validation:`,
    ...problems.map((problem) => `  - ${problem}`),
  ].join("\n");
}
