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
import { CONFIG_COVERAGE_PATH, CONFIG_DATA_PATH } from "./extract-config.mjs";
import { loadManifest, MANIFEST_PATH, sha256 } from "./manifest.mjs";
import { COVERAGE_PATH, DATA_PATH } from "./render-env.mjs";

const temps = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop(), { recursive: true, force: true });
});
const fixtures = new URL("./fixtures/snapshot/", import.meta.url);
const source = readFileSync(new URL("./fixtures/snapshot.envref", import.meta.url), "utf8");
const OUTPUTS = [DATA_PATH, COVERAGE_PATH, CONFIG_DATA_PATH, CONFIG_COVERAGE_PATH];

function commit(git, message) {
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
    message,
  );
}

/** A fixture upstream repository holding the snapshot inputs, and a copy of the real manifest. */
function setup({ env = source, yaml = {} } = {}) {
  const root = mkdtempSync(join(tmpdir(), "reference-refresh-"));
  temps.push(root);
  const repo = join(root, "upstream");
  const manifestPath = join(root, "data", "manifest.json");
  mkdirSync(repo);
  mkdirSync(dirname(manifestPath));
  cpSync(MANIFEST_PATH, manifestPath);
  const { manifest } = loadManifest({ manifestPath });
  for (const { path } of manifest.configurationSources) {
    mkdirSync(dirname(join(repo, path)), { recursive: true });
    writeFileSync(join(repo, path), yaml[path] ?? readFileSync(new URL(path, fixtures), "utf8"));
  }
  writeFileSync(join(repo, ".env.reference"), env);
  const git = (...args) =>
    execFileSync("git", ["--no-pager", "-C", repo, ...args], {
      encoding: "utf8",
      env: { ...process.env, GIT_EDITOR: "true", GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "--quiet");
  git("add", ".");
  commit(git, "fixture");
  git("tag", "fixture-release");
  return { root, repo, manifestPath, ref: "fixture-release", commit: git("rev-parse", "HEAD"), git };
}

/** Every committed output and the manifest, for before/after comparisons. */
function snapshotOf(options) {
  return {
    manifest: readFileSync(options.manifestPath, "utf8"),
    outputs: OUTPUTS.map((path) =>
      existsSync(join(options.root, path)) ? readFileSync(join(options.root, path), "utf8") : null,
    ),
  };
}

describe("pinned refresh", () => {
  it("reads pinned blobs, not the working tree, and writes both snapshots, both reports and the manifest", () => {
    const options = setup();
    writeFileSync(join(options.repo, ".env.reference"), 'BROKEN="dirty\n');
    writeFileSync(join(options.repo, "etc/defaults/config.defaults.yaml"), "dirty: true\n");
    const first = refreshSnapshots(options);
    expect(first.manifest.upstream).toMatchObject({ release: "fixture-release", commit: options.commit });
    expect(first.manifest.environmentSource).toEqual({
      path: ".env.reference",
      sha256: sha256(source),
      lines: 19,
    });
    expect(first.manifest.configurationSources.map(({ role }) => role)).toEqual([
      "config-defaults",
      "auth-defaults",
      "logging-defaults",
      "billing-example",
    ]);
    for (const entry of first.manifest.configurationSources) {
      const text = readFileSync(new URL(entry.path, fixtures), "utf8");
      expect(entry.sha256).toBe(sha256(text));
      expect(entry.lines).toBe((text.match(/\n/g) ?? []).length);
    }

    expect(first.environment.data.sections.flatMap(({ records }) => records).map(({ name }) => name)).toEqual([
      "HOST",
      "API_TOKEN",
    ]);
    expect(first.configuration.data.sources).toEqual(first.manifest.configurationSources);
    expect(first.configuration.data.pages[0].groups[0].records[0].heading).toBe("config: site.host");

    expect(readFileSync(join(options.root, COVERAGE_PATH), "utf8")).toBe(first.environment.report);
    expect(readFileSync(join(options.root, CONFIG_COVERAGE_PATH), "utf8")).toBe(first.configuration.report);
    expect(JSON.parse(readFileSync(join(options.root, CONFIG_DATA_PATH), "utf8"))).toEqual(
      first.configuration.data,
    );
    expect(JSON.parse(readFileSync(options.manifestPath, "utf8"))).toEqual(first.manifest);
    expect(loadManifest({ manifestPath: options.manifestPath }).manifest).toEqual(first.manifest);

    const before = snapshotOf(options);
    refreshSnapshots(options);
    expect(snapshotOf(options)).toEqual(before);
  });

  it.each([
    ["malformed", { env: `${source}\nBROKEN="unterminated\n` }, /malformed or unresolved/],
    ["unresolved", { env: `OUTSIDE=1\n${source}` }, /malformed or unresolved/],
    [
      "duplicate-key YAML",
      { yaml: { "etc/defaults/logging.defaults.yaml": "---\na: 1\na: 2\n" } },
      /configuration extraction failed/,
    ],
    [
      "anchor-colliding YAML",
      { yaml: { "etc/defaults/config.defaults.yaml": "---\ncollide:\n  a:\n    b: 1\n  ab: 2\n" } },
      /anchor collision/,
    ],
  ])("leaves all outputs unchanged on %s input", (_kind, input, error) => {
    const options = setup(input);
    for (const path of OUTPUTS) {
      mkdirSync(dirname(join(options.root, path)), { recursive: true });
      writeFileSync(join(options.root, path), "previous snapshot\n");
    }
    const before = snapshotOf(options);
    expect(() => refreshSnapshots(options)).toThrow(error);
    expect(snapshotOf(options)).toEqual(before);
  });

  it("onboards a source with only path and role; refresh records its hash and line count", () => {
    const options = setup();
    const { manifestPath } = options;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const entry = manifest.configurationSources.find((file) => file.role === "auth-defaults");
    manifest.configurationSources = manifest.configurationSources.map((file) =>
      file.role === entry.role ? { path: entry.path, role: entry.role } : file,
    );
    writeFileSync(manifestPath, JSON.stringify(manifest));
    expect(() => loadManifest({ manifestPath: options.manifestPath })).toThrow(/sha256/);
    const result = refreshSnapshots(options);
    const text = readFileSync(join(options.repo, entry.path), "utf8");
    expect(result.manifest.configurationSources.find((file) => file.role === entry.role)).toEqual({
      path: entry.path,
      role: entry.role,
      sha256: sha256(text),
      lines: (text.match(/\n/g) ?? []).length,
    });
    expect(() => loadManifest({ manifestPath: options.manifestPath })).not.toThrow();
  });

  it("refreshes a moved upstream path", () => {
    const options = setup();
    const { manifestPath } = options;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const entry = manifest.configurationSources.find((file) => file.role === "auth-defaults");
    const oldPath = entry.path;
    entry.path = "etc/moved/auth.defaults.yaml";
    mkdirSync(dirname(join(options.repo, entry.path)), { recursive: true });
    options.git("mv", oldPath, entry.path);
    commit(options.git, "move source");
    writeFileSync(manifestPath, JSON.stringify(manifest));
    const result = refreshSnapshots({ ...options, ref: options.git("rev-parse", "HEAD") });
    expect(result.configuration.data.sources.find((file) => file.role === "auth-defaults").path).toBe(entry.path);
    expect(JSON.stringify(result.configuration.data)).not.toContain(oldPath);
  });

  it.each([
    ["unsafe path", { path: "../outside.yaml", role: "auth-defaults" }, /must not escape/],
    ["unsupported role", { path: "etc/new.yaml", role: "unknown" }, /not one of/],
    ["duplicate role", { path: "etc/new.yaml", role: "config-defaults" }, /more than one file/],
  ])("still rejects %s before refresh writes", (_kind, replacement, error) => {
    const options = setup();
    const { manifestPath } = options;
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    manifest.configurationSources = manifest.configurationSources.map((entry) =>
      entry.role === "auth-defaults" ? replacement : entry,
    );
    const before = JSON.stringify(manifest);
    writeFileSync(manifestPath, before);
    expect(() => refreshSnapshots(options)).toThrow(error);
    expect(readFileSync(manifestPath, "utf8")).toBe(before);
    for (const path of OUTPUTS) expect(existsSync(join(options.root, path))).toBe(false);
  });

  it("does not write anything when a pinned source is missing", () => {
    const options = setup();
    const before = snapshotOf(options);
    options.git("rm", "--quiet", "etc/defaults/auth.defaults.yaml");
    commit(options.git, "remove source");
    expect(() => refreshSnapshots({ ...options, ref: options.git("rev-parse", "HEAD") })).toThrow();
    expect(snapshotOf(options)).toEqual(before);
    for (const path of OUTPUTS) expect(existsSync(join(options.root, path))).toBe(false);
  });

  it("refuses a ref that is not a commit", () => {
    const options = setup();
    expect(() => refreshSnapshots({ ...options, ref: "no-such-tag" })).toThrow();
    expect(existsSync(join(options.root, DATA_PATH))).toBe(false);
  });
});
