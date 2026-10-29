// bin/reference/manifest.test.mjs
//
// The manifest is the provenance gate: nothing is parsed until every vendored
// file is present, hashes as recorded, and is accounted for. These tests build
// throwaway vendor directories so each failure mode is exercised without
// touching the real snapshots.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { loadManifest, MANIFEST_PATH, sha256, VENDOR_DIR } from "./manifest.mjs";

const temps = [];
afterEach(() => {
  while (temps.length > 0) rmSync(temps.pop(), { recursive: true, force: true });
});

/** A valid throwaway vendor directory, with each piece overridable. */
function vendor({ files = { ".env.reference": "# fixture\nFOO=1\n" }, manifest = {} } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "reference-manifest-"));
  temps.push(dir);
  const entries = [];
  for (const [path, content] of Object.entries(files)) {
    const absolute = join(dir, path);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
    entries.push({
      path,
      role: path.endsWith(".env.reference") ? "env-reference" : "config-defaults",
      sha256: sha256(Buffer.from(content)),
      lines: (content.match(/\n/g) ?? []).length,
    });
  }
  const body = {
    extractorFormatVersion: 1,
    upstream: {
      repository: "https://github.com/onetimesecret/onetimesecret",
      release: "v0.26.19",
      commit: "e98a88c9b5832bbae249f38885aa28bd78a5db4d",
    },
    refreshOwner: "someone",
    backupReviewer: "someone-else",
    files: entries,
    ...manifest,
  };
  writeFileSync(join(dir, "manifest.json"), `${JSON.stringify(body, null, 2)}\n`);
  return dir;
}

describe("the tracked manifest", () => {
  it("validates, and every snapshot hashes as recorded", () => {
    const { manifest, inputs, warnings } = loadManifest();
    expect(manifest.upstream.release).toBe("v0.26.19");
    expect(manifest.upstream.commit).toBe("e98a88c9b5832bbae249f38885aa28bd78a5db4d");
    expect(inputs.get("env-reference").path).toBe(".env.reference");
    expect([...inputs.keys()].sort()).toEqual([
      "auth-defaults",
      "billing-example",
      "config-defaults",
      "env-reference",
      "logging-defaults",
    ]);
    // Accountability is a warning so the pipeline runs before a handle exists
    // (plan A6 requires the handle before Phase 4 exits).
    expect(warnings.join(" ")).toMatch(/refreshOwner is "unassigned"/);
    expect(warnings.join(" ")).toMatch(/backupReviewer is "unassigned"/);
  });

  it("records a hash for every file it lists, and lists every file present", () => {
    const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
    for (const file of manifest.files) {
      const actual = sha256(readFileSync(join(VENDOR_DIR, file.path)));
      expect(actual, file.path).toBe(file.sha256);
    }
  });
});

describe("rejections", () => {
  it("rejects a changed snapshot", () => {
    const dir = vendor();
    writeFileSync(join(dir, ".env.reference"), "# fixture\nFOO=2\n");
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/hashes to/);
  });

  it("rejects a missing snapshot", () => {
    const dir = vendor();
    rmSync(join(dir, ".env.reference"));
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/does not exist/);
  });

  it("rejects an unexpected file under the vendor directory", () => {
    const dir = vendor();
    writeFileSync(join(dir, "stowaway.yaml"), "a: 1\n");
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/stowaway.yaml is not listed/);
  });

  it("rejects an abbreviated commit", () => {
    const dir = vendor({
      manifest: {
        upstream: {
          repository: "https://github.com/onetimesecret/onetimesecret",
          release: "v0.26.19",
          commit: "e98a88c9",
        },
      },
    });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/full 40-character SHA/);
  });

  it("rejects a manifest with no env-reference role", () => {
    const dir = vendor({ files: { "etc/defaults/config.defaults.yaml": "a: 1\n" } });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/no file declares the env-reference role/);
  });

  it("rejects a path that escapes the vendor directory", () => {
    const dir = vendor();
    const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
    manifest.files[0].path = "../../.env";
    writeFileSync(join(dir, "manifest.json"), JSON.stringify(manifest));
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/must not escape/);
  });

  it("rejects a missing manifest", () => {
    const dir = mkdtempSync(join(tmpdir(), "reference-manifest-"));
    temps.push(dir);
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/manifest.json is missing/);
  });

  it("rejects a manifest that is not JSON", () => {
    const dir = vendor();
    writeFileSync(join(dir, "manifest.json"), "{ nope");
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/not valid JSON/);
  });
});
