// bin/reference/manifest.test.mjs
//
// The manifest is the provenance record: it pins the upstream revision and
// describes every upstream input by path, hash and line count. Nothing is
// vendored, so the checks are on its structure. These tests write throwaway
// manifests so each failure mode is exercised without touching the real one.
import { mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { isPortableUpstreamPath, loadManifest, MANIFEST_PATH, repoRoot, ROLES } from "./manifest.mjs";

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

function tempDir() {
  const dir = mkdtempSync(join(tmpdir(), "reference-manifest-"));
  temps.push(dir);
  return dir;
}

/** A valid throwaway manifest, with each piece overridable; returns its path. */
function manifestFile({ manifest = {}, sources = SOURCES } = {}) {
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
  const path = join(tempDir(), "manifest.json");
  writeFileSync(path, `${JSON.stringify(body, null, 2)}\n`);
  return path;
}

/** Rewrite the manifest at `path` through `mutate`. */
function edit(path, mutate) {
  const manifest = JSON.parse(readFileSync(path, "utf8"));
  mutate(manifest);
  writeFileSync(path, JSON.stringify(manifest));
  return path;
}

describe("the tracked manifest", () => {
  it("sits beside the snapshots it governs", () => {
    expect(MANIFEST_PATH).toBe(join(repoRoot, "src/data/reference/manifest.json"));
  });

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

  it("warns when the refresh owner is unassigned", () => {
    const { warnings } = loadManifest({ manifestPath: manifestFile({ manifest: { refreshOwner: "unassigned" } }) });
    expect(warnings.join(" ")).toMatch(/refreshOwner is "unassigned"/);
  });

  it("rejects a declared absence of a reviewer with no note", () => {
    const manifestPath = manifestFile({ manifest: { backupReviewer: "none: single maintainer" } });
    expect(() => loadManifest({ manifestPath })).toThrow(/accountabilityNote/);
  });

  it("accepts a declared absence of a reviewer when the risk is recorded", () => {
    const manifestPath = manifestFile({
      manifest: {
        backupReviewer: "none: single maintainer",
        accountabilityNote: "Goes stale silently while the owner is away.",
      },
    });
    expect(loadManifest({ manifestPath }).warnings).toEqual([]);
  });

  it("warns when the backup reviewer is unassigned", () => {
    const manifestPath = manifestFile({ manifest: { backupReviewer: "unassigned" } });
    expect(loadManifest({ manifestPath }).warnings.join(" ")).toMatch(/backupReviewer is "unassigned"/);
  });

  it.each(
    ["refreshOwner", "backupReviewer"].flatMap((field) =>
      [undefined, null, 42, ""].map((value) => [field, value]),
    ),
  )("rejects invalid accountability field %s = %s", (field, value) => {
    const manifestPath = manifestFile({ manifest: { [field]: value } });
    expect(() => loadManifest({ manifestPath })).toThrow(`${field} must be a string`);
  });

  it("lets refresh read a manifest whose onboarding entry has no hash yet", () => {
    const manifestPath = edit(manifestFile(), (manifest) => {
      manifest.configurationSources[1] = { path: "etc/defaults/auth.defaults.yaml", role: "auth-defaults" };
    });
    expect(() => loadManifest({ manifestPath })).toThrow(/sha256/);
    expect(loadManifest({ manifestPath, requireHashes: false }).manifest.configurationSources).toHaveLength(4);
  });
});

describe("rejections", () => {
  it("rejects the retired files key in place of configurationSources", () => {
    const manifestPath = edit(manifestFile(), (manifest) => {
      manifest.files = manifest.configurationSources;
      delete manifest.configurationSources;
    });
    expect(() => loadManifest({ manifestPath })).toThrow(/configurationSources must be a non-empty array/);
  });

  it("rejects a missing role", () => {
    const manifestPath = manifestFile({ sources: SOURCES.slice(1) });
    expect(() => loadManifest({ manifestPath })).toThrow(/no entry declares the config-defaults role/);
  });

  it("rejects a duplicated role and a duplicated path", () => {
    expect(() =>
      loadManifest({ manifestPath: manifestFile({ sources: [...SOURCES, ["etc/other.yaml", "config-defaults"]] }) }),
    ).toThrow(/claimed by more than one file/);
    expect(() => loadManifest({ manifestPath: manifestFile({ sources: [...SOURCES, SOURCES[0]] }) })).toThrow(
      /listed twice/,
    );
  });

  it.each([
    ["sha256", (source) => { source.sha256 = "abc"; }, /sha256 must be 64/],
    ["lines", (source) => { source.lines = 0; }, /lines must be a positive integer/],
    ["role", (source) => { source.role = "env-reference"; }, /role.*env-reference.*not one of/],
  ])("rejects an invalid source %s", (_field, mutate, error) => {
    const manifestPath = edit(manifestFile(), (manifest) => mutate(manifest.configurationSources[0]));
    expect(() => loadManifest({ manifestPath })).toThrow(error);
  });

  it("rejects an abbreviated commit", () => {
    const manifestPath = manifestFile({
      manifest: {
        upstream: {
          repository: "https://github.com/onetimesecret/onetimesecret",
          release: "v0.26.19",
          commit: "e98a88c9",
        },
      },
    });
    expect(() => loadManifest({ manifestPath })).toThrow(/full 40-character SHA/);
  });

  it("requires upstream environment metadata", () => {
    const manifestPath = manifestFile({ manifest: { environmentSource: undefined } });
    expect(() => loadManifest({ manifestPath })).toThrow(/environmentSource/);
  });

  it("rejects a path that escapes the upstream repository", () => {
    const manifestPath = edit(manifestFile(), (manifest) => {
      manifest.configurationSources[0].path = "../../.env";
    });
    expect(() => loadManifest({ manifestPath })).toThrow(/must not escape/);
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
    const manifestPath = edit(manifestFile(), (manifest) => {
      manifest.configurationSources[0].path = path;
    });
    expect(() => loadManifest({ manifestPath })).toThrow(/path must be relative.*must not escape/);
  });

  it("rejects a symlinked manifest before reading its target", () => {
    const real = manifestFile();
    const link = join(tempDir(), "manifest.json");
    symlinkSync(real, link);
    expect(() => loadManifest({ manifestPath: link })).toThrow(/not a symlink/);
  });

  it("rejects a missing manifest", () => {
    expect(() => loadManifest({ manifestPath: join(tempDir(), "manifest.json") })).toThrow(
      /manifest.json is missing/,
    );
  });

  it("rejects a manifest that is not JSON", () => {
    const manifestPath = manifestFile();
    writeFileSync(manifestPath, "{ nope");
    expect(() => loadManifest({ manifestPath })).toThrow(/not valid JSON/);
  });
});
