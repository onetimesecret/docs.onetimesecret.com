import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { build, compareArtifacts, diffSummary } from "../reference.mjs";
import { repoRoot } from "./manifest.mjs";
import { CONFIG_COVERAGE_PATH, CONFIG_PAGES, pagePathFor } from "./render-config.mjs";
import { COVERAGE_PATH, DATA_PATH } from "./render-env.mjs";

const temps = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop(), { recursive: true, force: true });
});
function temp() {
  const dir = mkdtempSync(join(tmpdir(), "reference-cli-"));
  temps.push(dir);
  return dir;
}
function stagedRoot() {
  const root = temp();
  mkdirSync(dirname(join(root, DATA_PATH)), { recursive: true });
  cpSync(join(repoRoot, DATA_PATH), join(root, DATA_PATH));
  for (const artifact of build().artifacts) {
    mkdirSync(dirname(join(root, artifact.path)), { recursive: true });
    writeFileSync(join(root, artifact.path), artifact.content);
  }
  return root;
}
function run(args, { cwd = repoRoot, env = process.env } = {}) {
  return spawnSync(process.execPath, [join(repoRoot, "bin/reference.mjs"), ...args], {
    cwd,
    env,
    encoding: "utf8",
  });
}

describe("JSON-only environment pipeline", () => {
  it("validates the committed JSON and reproducibly generates only YAML artifacts", () => {
    const first = build();
    expect(first.artifacts).toEqual(build().artifacts);
    expect(first.artifacts.map(({ path }) => path)).toEqual([
      ...CONFIG_PAGES.map((page) => pagePathFor(page.owner)),
      CONFIG_COVERAGE_PATH,
    ]);
    expect(first.coverage.published).toHaveLength(445);
    for (const artifact of first.artifacts) {
      expect(readFileSync(join(repoRoot, artifact.path), "utf8")).toBe(artifact.content);
    }
  });

  it("checks without an environment source or environment coverage report", () => {
    expect(compareArtifacts({ root: stagedRoot() }).problems).toEqual([]);
  });

  it("accepts valid snapshot prose edits rather than re-extracting upstream", () => {
    const root = stagedRoot();
    const path = join(root, DATA_PATH);
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.sections[0].prose.push("Reviewed snapshot prose.");
    const changed = JSON.stringify(data);
    writeFileSync(path, changed);
    expect(compareArtifacts({ root }).problems).toEqual([]);
    expect(readFileSync(path, "utf8")).toBe(changed);
  });

  it.each(["invalid JSON", "anchor", "metadata", "missing"])(
    "rejects %s in the JSON input",
    (kind) => {
      const root = stagedRoot();
      const path = join(root, DATA_PATH);
      const data = JSON.parse(readFileSync(path, "utf8"));
      if (kind === "anchor") data.sections[0].anchor = "wrong";
      if (kind === "metadata") data.upstream.commit = "a".repeat(40);
      writeFileSync(path, kind === "invalid JSON" ? "{" : JSON.stringify(data));
      if (kind === "missing") rmSync(path);
      expect(() => compareArtifacts({ root })).toThrow(DATA_PATH);
    },
  );

  it("does not regenerate or check refresh-only environment coverage", () => {
    const root = stagedRoot();
    mkdirSync(dirname(join(root, COVERAGE_PATH)), { recursive: true });
    writeFileSync(join(root, COVERAGE_PATH), "Refresh-only report\n");
    expect(compareArtifacts({ root }).problems).toEqual([]);
    expect(readFileSync(join(root, COVERAGE_PATH), "utf8")).toBe("Refresh-only report\n");
  });

  it.each(["changed", "missing"])("detects %s YAML output without writing", (kind) => {
    const root = stagedRoot();
    const path = join(root, CONFIG_COVERAGE_PATH);
    if (kind === "missing") rmSync(path);
    else writeFileSync(path, "drift\n");
    const { problems } = compareArtifacts({ root });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain(CONFIG_COVERAGE_PATH);
    if (kind === "changed") expect(readFileSync(path, "utf8")).toBe("drift\n");
  });

  it("still rejects a changed YAML vendor hash", () => {
    const vendorDir = temp();
    cpSync(join(repoRoot, "vendor/onetimesecret"), vendorDir, { recursive: true });
    writeFileSync(join(vendorDir, "etc/defaults/config.defaults.yaml"), "changed: true\n");
    expect(() => build({ vendorDir })).toThrow(/hashes to/);
  });
});

describe("CLI", () => {
  it("checks from another cwd, ignoring application environment variables", () => {
    const result = run(["check"], {
      cwd: temp(),
      env: { ...process.env, HOST: "garbage", SECRET: "garbage", RACK_ENV: "garbage" },
    });
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("environment JSON validated");
    expect(result.stderr).not.toMatch(/refreshOwner|backupReviewer/);
  });
  it("rejects unknown commands", () => {
    const result = run(["nope"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain('unknown command "nope"');
  });
  it("requires explicit repo and ref", () => {
    const result = run(["refresh"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("--repo");
  });
  it("prints stacks only with --debug", () => {
    const args = ["refresh", "--repo", join(temp(), "missing"), "--ref", "v0.26.19"];
    const normal = run(args);
    const debug = run([...args, "--debug"]);
    expect(normal.status).toBe(2);
    expect(debug.status).toBe(2);
    expect(normal.stderr).not.toMatch(/at refreshSnapshots/);
    expect(debug.stderr).toMatch(/at refreshSnapshots/);
  });
});

describe("diffSummary", () => {
  it("shows tracked and regenerated lines", () => {
    const diff = diffSummary("page.md", "a\nnew\nc\n", "a\nold\nc\n");
    expect(diff).toContain("--- page.md (tracked)");
    expect(diff).toContain("+++ page.md (regenerated)");
    expect(diff).toContain("-old");
    expect(diff).toContain("+new");
  });
  it("caps large differences", () => {
    expect(
      diffSummary("page.md", Array.from({ length: 200 }, (_, i) => `x${i}`).join("\n"), "y\n"),
    ).toMatch(/\+ \.\.\. \d+ more added lines/);
  });
});
