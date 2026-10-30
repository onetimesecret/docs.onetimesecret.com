// bin/reference/manifest.test.mjs
//
// The manifest is the provenance record: it pins the upstream revision and
// describes every upstream input by path, hash and line count. Nothing is
// vendored beside it, so the checks are on its structure and on the directory
// staying empty of anything else. These tests build throwaway vendor
// directories so each failure mode is exercised without touching the real one.
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { isPortableUpstreamPath, loadManifest, MANIFEST_PATH, ROLES } from "./manifest.mjs";

const temps = [];
afterEach(() => {
  while (temps.length > 0) rmSync(temps.pop(), { recursive: true, force: true });
});

const SOURCES = [
  ["etc/defaults/config.defaults.yaml", "config-defaults"],
  ["etc/defaults/auth.defaults.yaml", "auth-defaults"],
  ["etc/defaults/logging.defaults.yaml", "logging-defaults"],
  ["etc/examples/billing.example.yaml", "billing-example"],
];

/** A valid throwaway vendor directory, with each piece overridable. */
function vendor({ manifest = {}, sources = SOURCES } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "reference-manifest-"));
  temps.push(dir);
  const body = {
    extractorFormatVersion: 1,
    environmentSource: { path: ".env.reference", sha256: "a".repeat(64), lines: 10 },
    upstream: {
      repository: "https://github.com/onetimesecret/onetimesecret",
      release: "v0.26.19",
      commit: "e98a88c9b5832bbae249f38885aa28bd78a5db4d",
    },
    refreshOwner: "someone",
    backupReviewer: "someone-else",
    configurationSources: sources.map(([path, role], index) => ({
      path,
      role,
      sha256: String(index).repeat(64),
      lines: 10 + index,
    })),
    ...manifest,
  };
  writeFileSync(join(dir, "manifest.json"), `${JSON.stringify(body, null, 2)}\n`);
  writeFileSync(join(dir, "README.md"), "# fixture\n");
  return dir;
}

/** Rewrite the manifest in `dir` through `mutate`. */
function edit(dir, mutate) {
  const path = join(dir, "manifest.json");
  const manifest = JSON.parse(readFileSync(path, "utf8"));
  mutate(manifest);
  writeFileSync(path, JSON.stringify(manifest));
  return dir;
}

describe("the tracked manifest", () => {
  it("validates and describes every upstream input without vendoring any", () => {
    const { manifest, warnings } = loadManifest();
    expect(manifest.upstream.release).toBe("v0.26.19");
    expect(manifest.upstream.commit).toBe("e98a88c9b5832bbae249f38885aa28bd78a5db4d");
    expect(manifest.environmentSource.path).toBe(".env.reference");
    expect(manifest.configurationSources.map(({ role }) => role).sort()).toEqual([...ROLES].sort());
    for (const source of [manifest.environmentSource, ...manifest.configurationSources]) {
      expect(source.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(source.lines).toBeGreaterThan(0);
    }
    expect(manifest).not.toHaveProperty("files");
    // Accountability (plan A6, as amended for a single-maintainer project):
    // the refresh owner is named, the backup reviewer declares that there is
    // none, and the note records what that costs. No warning is due.
    expect(manifest.refreshOwner).not.toBe("unassigned");
    expect(manifest.backupReviewer).toMatch(/^none/);
    expect(manifest.accountabilityNote).toMatch(/single maintainer/i);
    expect(warnings).toEqual([]);
  });

  it("sits in a directory holding nothing but itself and the README", () => {
    expect(readdirSync(join(MANIFEST_PATH, "..")).sort()).toEqual(["README.md", "manifest.json"]);
  });

  it("warns when the refresh owner is unassigned", () => {
    const dir = vendor({ manifest: { refreshOwner: "unassigned" } });
    const { warnings } = loadManifest({ vendorDir: dir });
    expect(warnings.join(" ")).toMatch(/refreshOwner is "unassigned"/);
  });

  it("rejects a declared absence of a reviewer with no note", () => {
    const dir = vendor({ manifest: { backupReviewer: "none: single maintainer" } });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/accountabilityNote/);
  });

  it("accepts a declared absence of a reviewer when the risk is recorded", () => {
    const dir = vendor({
      manifest: {
        backupReviewer: "none: single maintainer",
        accountabilityNote: "Goes stale silently while the owner is away.",
      },
    });
    const { warnings } = loadManifest({ vendorDir: dir });
    expect(warnings).toEqual([]);
  });

  it("warns when the backup reviewer is unassigned", () => {
    const dir = vendor({ manifest: { backupReviewer: "unassigned" } });
    expect(loadManifest({ vendorDir: dir }).warnings.join(" ")).toMatch(
      /backupReviewer is "unassigned"/,
    );
  });

  it.each(
    ["refreshOwner", "backupReviewer"].flatMap((field) =>
      [undefined, null, 42, ""].map((value) => [field, value]),
    ),
  )("rejects invalid accountability field %s = %s", (field, value) => {
    const dir = vendor({ manifest: { [field]: value } });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(`${field} must be a string`);
  });

  it("lets refresh read a manifest whose onboarding entry has no hash yet", () => {
    const dir = edit(vendor(), (manifest) => {
      manifest.configurationSources[1] = { path: "etc/defaults/auth.defaults.yaml", role: "auth-defaults" };
    });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/sha256/);
    expect(loadManifest({ vendorDir: dir, requireHashes: false }).manifest.configurationSources).toHaveLength(4);
  });
});

describe("rejections", () => {
  it("rejects any file beside the manifest and README", () => {
    const dir = vendor();
    mkdirSync(join(dir, "etc/defaults"), { recursive: true });
    writeFileSync(join(dir, "etc/defaults/config.defaults.yaml"), "a: 1\n");
    expect(() => loadManifest({ vendorDir: dir })).toThrow(
      /etc\/defaults\/config.defaults.yaml is not an input/,
    );
  });

  it("rejects the retired files key in place of configurationSources", () => {
    const dir = edit(vendor(), (manifest) => {
      manifest.files = manifest.configurationSources;
      delete manifest.configurationSources;
    });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/configurationSources must be a non-empty array/);
  });

  it("rejects a missing role", () => {
    const dir = vendor({ sources: SOURCES.slice(1) });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/no entry declares the config-defaults role/);
  });

  it("rejects a duplicated role and a duplicated path", () => {
    expect(() =>
      loadManifest({ vendorDir: vendor({ sources: [...SOURCES, ["etc/other.yaml", "config-defaults"]] }) }),
    ).toThrow(/claimed by more than one file/);
    expect(() => loadManifest({ vendorDir: vendor({ sources: [...SOURCES, SOURCES[0]] }) })).toThrow(/listed twice/);
  });

  it.each([
    ["sha256", (source) => { source.sha256 = "abc"; }, /sha256 must be 64/],
    ["lines", (source) => { source.lines = 0; }, /lines must be a positive integer/],
    ["role", (source) => { source.role = "env-reference"; }, /role.*env-reference.*not one of/],
  ])("rejects an invalid source %s", (_field, mutate, error) => {
    const dir = edit(vendor(), (manifest) => mutate(manifest.configurationSources[0]));
    expect(() => loadManifest({ vendorDir: dir })).toThrow(error);
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

  it("requires upstream environment metadata", () => {
    const dir = vendor({ manifest: { environmentSource: undefined } });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/environmentSource/);
  });

  it("rejects a path that escapes the upstream repository", () => {
    const dir = edit(vendor(), (manifest) => {
      manifest.configurationSources[0].path = "../../.env";
    });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/must not escape/);
  });

  it.each([
    "/tmp/.env.reference",
    "C:/snapshots/.env.reference",
    "C:\\snapshots\\.env.reference",
    "C:.env.reference",
    "\\\\server\\share\\.env.reference",
    "//server/share/.env.reference",
    "snapshots\\.env.reference",
    "snapshots\\..\\..\\.env",
    "",
    42,
  ])("rejects a non-portable upstream path %s", (path) => {
    expect(isPortableUpstreamPath(path)).toBe(false);
    const dir = edit(vendor(), (manifest) => {
      manifest.configurationSources[0].path = path;
    });
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/path must be relative.*must not escape/);
  });

  it("rejects a symlinked vendor root", () => {
    const link = join(vendor(), "linked-vendor");
    symlinkSync(vendor(), link, "dir");
    expect(() => loadManifest({ vendorDir: link })).toThrow(/symlinks are not allowed/);
  });

  it("rejects a manifest symlink before reading its invalid JSON target", () => {
    const dir = vendor();
    writeFileSync(join(dir, "README.md"), "not JSON\n");
    rmSync(join(dir, "manifest.json"));
    symlinkSync(join(dir, "README.md"), join(dir, "manifest.json"));
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/symlinks are not allowed/);
  });

  it("rejects symlinks even for the companion README", () => {
    const dir = vendor();
    rmSync(join(dir, "README.md"));
    symlinkSync(join(dir, "missing"), join(dir, "README.md"));
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/symlinks are not allowed/);
  });

  it("rejects a cyclic directory symlink instead of recursing", () => {
    const dir = vendor();
    symlinkSync(dir, join(dir, "cycle"), "dir");
    expect(() => loadManifest({ vendorDir: dir })).toThrow(/symlinks are not allowed/);
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
