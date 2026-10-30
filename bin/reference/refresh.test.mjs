import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { refreshSnapshots } from "../reference.mjs";
import { loadManifest, repoRoot, sha256 } from "./manifest.mjs";
import { COVERAGE_PATH, DATA_PATH } from "./render-env.mjs";

const temps = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop(), { recursive: true, force: true });
});
const source = readFileSync(new URL("./fixtures/snapshot.envref", import.meta.url), "utf8");
function setup(text = source) {
  const root = mkdtempSync(join(tmpdir(), "reference-refresh-"));
  temps.push(root);
  const repo = join(root, "upstream");
  const vendorDir = join(root, "vendor");
  mkdirSync(repo);
  cpSync(join(repoRoot, "vendor/onetimesecret"), vendorDir, { recursive: true });
  const { manifest } = loadManifest({ vendorDir });
  for (const { path } of manifest.files) {
    mkdirSync(dirname(join(repo, path)), { recursive: true });
    cpSync(join(vendorDir, path), join(repo, path));
  }
  writeFileSync(join(repo, ".env.reference"), text);
  const git = (...args) =>
    execFileSync("git", ["--no-pager", "-C", repo, ...args], {
      encoding: "utf8",
      env: { ...process.env, GIT_EDITOR: "true", GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "--quiet");
  git("add", ".");
  git(
    "-c",
    "user.name=Fixture",
    "-c",
    "user.email=fixture@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "-c",
    "core.hooksPath=/dev/null",
    "commit",
    "--quiet",
    "-m",
    "fixture",
  );
  const commit = git("rev-parse", "HEAD");
  git("tag", "fixture-release");
  return { root, repo, vendorDir, ref: "fixture-release", commit, git };
}

describe("pinned refresh", () => {
  it("reads pinned blobs, not the working tree, and writes JSON plus coverage but no env vendor", () => {
    const options = setup();
    writeFileSync(join(options.repo, ".env.reference"), 'BROKEN="dirty\n');
    writeFileSync(join(options.repo, "etc/defaults/config.defaults.yaml"), "dirty: true\n");
    const first = refreshSnapshots(options);
    expect(first.manifest.upstream).toMatchObject({
      release: "fixture-release",
      commit: options.commit,
    });
    expect(first.data.source).toEqual({
      path: ".env.reference",
      sha256: sha256(source),
      lines: 19,
    });
    expect(first.data.sections.flatMap(({ records }) => records).map(({ name }) => name)).toEqual([
      "HOST",
      "API_TOKEN",
    ]);
    expect(existsSync(join(options.vendorDir, ".env.reference"))).toBe(false);
    expect(loadManifest({ vendorDir: options.vendorDir }).inputs.size).toBe(4);
    expect(readFileSync(join(options.root, COVERAGE_PATH), "utf8")).toBe(first.report);
    const json = readFileSync(join(options.root, DATA_PATH), "utf8");
    refreshSnapshots(options);
    expect(readFileSync(join(options.root, DATA_PATH), "utf8")).toBe(json);
  });

  it.each([
    ["malformed", `${source}\nBROKEN="unterminated\n`],
    ["unresolved", `OUTSIDE=1\n${source}`],
  ])("leaves all outputs unchanged on %s input", (_kind, text) => {
    const options = setup(text);
    const before = readFileSync(join(options.vendorDir, "manifest.json"), "utf8");
    const snapshots = loadManifest({ vendorDir: options.vendorDir }).manifest.files.map(
      ({ path }) => [path, readFileSync(join(options.vendorDir, path))],
    );
    for (const path of [DATA_PATH, COVERAGE_PATH]) {
      mkdirSync(dirname(join(options.root, path)), { recursive: true });
      writeFileSync(join(options.root, path), "previous snapshot\n");
    }
    expect(() => refreshSnapshots(options)).toThrow(/malformed or unresolved/);
    expect(readFileSync(join(options.vendorDir, "manifest.json"), "utf8")).toBe(before);
    for (const [path, buffer] of snapshots)
      expect(readFileSync(join(options.vendorDir, path))).toEqual(buffer);
    for (const path of [DATA_PATH, COVERAGE_PATH])
      expect(readFileSync(join(options.root, path), "utf8")).toBe("previous snapshot\n");
  });

  it("onboards a supported input with only path and role, without local bytes or hash", () => {
    const options = setup();
    const manifestPath = join(options.vendorDir, "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const entry = manifest.files.find((file) => file.role === "auth-defaults");
    manifest.files = manifest.files.filter((file) => file.role !== entry.role);
    rmSync(join(options.vendorDir, entry.path));
    writeFileSync(manifestPath, JSON.stringify(manifest));
    expect(loadManifest({ vendorDir: options.vendorDir }).inputs.has(entry.role)).toBe(false);

    manifest.files.push({ path: entry.path, role: entry.role });
    writeFileSync(manifestPath, JSON.stringify(manifest));
    expect(() => loadManifest({ vendorDir: options.vendorDir })).toThrow(/sha256/);
    const result = refreshSnapshots(options);
    expect(result.manifest.files.find((file) => file.role === entry.role)).toEqual(entry);
    expect(loadManifest({ vendorDir: options.vendorDir }).inputs.get(entry.role).text).toBe(
      readFileSync(join(options.repo, entry.path), "utf8"),
    );
  });

  it("refreshes a moved upstream path without requiring the new local snapshot", () => {
    const options = setup();
    const manifestPath = join(options.vendorDir, "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const entry = manifest.files.find((file) => file.role === "auth-defaults");
    const oldPath = entry.path;
    entry.path = "etc/moved/auth.defaults.yaml";
    mkdirSync(dirname(join(options.repo, entry.path)), { recursive: true });
    options.git("mv", oldPath, entry.path);
    options.git(
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "-c",
      "core.hooksPath=/dev/null",
      "commit",
      "--quiet",
      "-m",
      "move source",
    );
    writeFileSync(manifestPath, JSON.stringify(manifest));
    expect(() => loadManifest({ vendorDir: options.vendorDir })).toThrow(/does not exist/);
    refreshSnapshots({ ...options, ref: options.git("rev-parse", "HEAD") });
    expect(readFileSync(join(options.vendorDir, entry.path), "utf8")).toBe(
      readFileSync(join(options.repo, entry.path), "utf8"),
    );
    // Refresh does not delete unlisted local files; strict checks still flag them.
    expect(() => loadManifest({ vendorDir: options.vendorDir })).toThrow(/is not listed/);
    rmSync(join(options.vendorDir, oldPath));
    expect(loadManifest({ vendorDir: options.vendorDir }).inputs.get(entry.role).path).toBe(
      entry.path,
    );
  });

  it("replaces stale local YAML from the pinned source", () => {
    const options = setup();
    const path = "etc/defaults/auth.defaults.yaml";
    writeFileSync(join(options.vendorDir, path), "stale: true\n");
    expect(() => loadManifest({ vendorDir: options.vendorDir })).toThrow(/hashes to/);
    refreshSnapshots(options);
    expect(loadManifest({ vendorDir: options.vendorDir }).inputs.get("auth-defaults").text).toBe(
      readFileSync(join(options.repo, path), "utf8"),
    );
  });

  it.each([
    ["unsafe path", { path: "../outside.yaml", role: "auth-defaults" }, /must not escape/],
    ["unsupported role", { path: "etc/new.yaml", role: "unknown" }, /not one of/],
    ["duplicate role", { path: "etc/new.yaml", role: "config-defaults" }, /more than one file/],
  ])("still rejects %s before refresh writes", (_kind, replacement, error) => {
    const options = setup();
    const manifestPath = join(options.vendorDir, "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    manifest.files = manifest.files.map((entry) =>
      entry.role === "auth-defaults" ? replacement : entry,
    );
    const before = JSON.stringify(manifest);
    writeFileSync(manifestPath, before);
    expect(() => refreshSnapshots(options)).toThrow(error);
    expect(readFileSync(manifestPath, "utf8")).toBe(before);
    expect(existsSync(join(options.root, DATA_PATH))).toBe(false);
  });

  it("does not write anything when a pinned source is missing", () => {
    const options = setup();
    const before = readFileSync(join(options.vendorDir, "manifest.json"), "utf8");
    options.git("rm", "etc/defaults/auth.defaults.yaml");
    options.git(
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "-c",
      "core.hooksPath=/dev/null",
      "commit",
      "--quiet",
      "-m",
      "remove source",
    );
    expect(() => refreshSnapshots({ ...options, ref: options.git("rev-parse", "HEAD") })).toThrow();
    expect(readFileSync(join(options.vendorDir, "manifest.json"), "utf8")).toBe(before);
    expect(existsSync(join(options.root, DATA_PATH))).toBe(false);
  });
});
