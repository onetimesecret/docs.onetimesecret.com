// bin/reference/cli.test.mjs
//
// Pipeline-level tests: reproducibility, isolation from the ambient
// environment, and the behaviour of the non-writing equality gate.
//
// NOTHING HERE MUTATES A TRACKED FILE. Vitest runs test files in parallel, so
// a drift test that edited the real generated page would race every other file
// that reads the content tree — and it did, once, before `compareArtifacts`
// took a `root`. Drift is now staged in a temporary copy.
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { build, compareArtifacts, diffSummary } from "../reference.mjs";
import { repoRoot, sha256 } from "./manifest.mjs";
import {
  CONFIG_COVERAGE_PATH,
  CONFIG_PAGES,
  pagePathFor,
} from "./render-config.mjs";
import { COVERAGE_PATH, PAGE_PATH } from "./render-env.mjs";

const ENTRY = join(repoRoot, "bin", "reference.mjs");

/** Run the CLI and return {status, stdout, stderr}. */
function run(args, { cwd = repoRoot, env } = {}) {
  const result = spawnSync(process.execPath, [ENTRY, ...args], {
    cwd,
    env: env ?? process.env,
    encoding: "utf8",
  });
  if (result.error) throw result.error;
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

const temps = [];
afterEach(() => {
  while (temps.length > 0) rmSync(temps.pop(), { recursive: true, force: true });
});

function temp(prefix) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  temps.push(dir);
  return dir;
}

/** A throwaway root holding the generated artifacts, ready to be perturbed. */
function stagedRoot() {
  const root = temp("reference-root-");
  for (const artifact of build().artifacts) {
    const absolute = join(root, artifact.path);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, artifact.content);
  }
  return root;
}

/** A throwaway copy of the vendor directory. */
function stagedVendor() {
  const dir = temp("reference-vendor-");
  cpSync(join(repoRoot, "vendor", "onetimesecret"), dir, { recursive: true });
  return dir;
}

describe("reproducibility", () => {
  it("builds byte-identical output twice", () => {
    const first = build();
    const second = build();
    expect(first.artifacts.map((a) => a.content)).toEqual(second.artifacts.map((a) => a.content));
  });

  it("matches the tracked artifacts", () => {
    for (const artifact of build().artifacts) {
      expect(readFileSync(join(repoRoot, artifact.path), "utf8"), artifact.path).toBe(artifact.content);
    }
  });

  it("writes every artifact the pipeline owns", () => {
    expect(build().artifacts.map((artifact) => artifact.path)).toEqual([
      PAGE_PATH,
      COVERAGE_PATH,
      ...CONFIG_PAGES.map((page) => pagePathFor(page.owner)),
      CONFIG_COVERAGE_PATH,
    ]);
  });
});

describe("isolation from the ambient environment", () => {
  it("generates the same page from a different working directory", () => {
    const elsewhere = temp("reference-cwd-");
    const result = run(["check"], { cwd: elsewhere });
    expect(result.stdout).toContain("OK:");
    expect(result.status).toBe(0);
  });

  it("ignores unrelated process environment values", () => {
    // The generator never reads process.env. Garbage in the variables the
    // application itself uses must not reach the page.
    const expected = build().artifacts;
    const env = {
      ...process.env,
      HOST: "garbage-host",
      SECRET: "garbage-secret",
      RACK_ENV: "garbage",
      DEFAULT_LOG_LEVEL: "garbage",
      SITE_HOST: "garbage.example",
      NODE_ENV: "garbage",
    };
    const result = run(["check"], { env });
    expect(result.status).toBe(0);
    for (const artifact of expected) {
      expect(readFileSync(join(repoRoot, artifact.path), "utf8")).toBe(artifact.content);
    }
  });
});

describe("check", () => {
  it("passes against the tracked artifacts", () => {
    const result = run(["check"]);
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/OK: generated reference matches the vendored inputs/);
  });

  it("emits no accountability warning now that the owner is named", () => {
    const result = run(["check"]);
    expect(result.status).toBe(0);
    expect(result.stderr).not.toMatch(/refreshOwner/);
    expect(result.stderr).not.toMatch(/backupReviewer/);
  });

  it("reports no problem against an unperturbed copy", () => {
    expect(compareArtifacts({ root: stagedRoot() }).problems).toEqual([]);
  });

  it("fails with a diff when the page is edited", () => {
    const root = stagedRoot();
    const page = join(root, PAGE_PATH);
    writeFileSync(
      page,
      readFileSync(page, "utf8").replace("## Secrets & Cryptography", "## Secrets and Cryptography"),
    );
    const { problems } = compareArtifacts({ root });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain(PAGE_PATH);
    expect(problems[0]).toContain("-## Secrets and Cryptography");
    expect(problems[0]).toContain("+## Secrets & Cryptography");
  });

  it("fails when the coverage report is edited", () => {
    const root = stagedRoot();
    const report = join(root, COVERAGE_PATH);
    writeFileSync(report, `${readFileSync(report, "utf8")}hand-written line\n`);
    const { problems } = compareArtifacts({ root });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain(COVERAGE_PATH);
  });

  it("fails when an artifact is missing entirely", () => {
    const root = stagedRoot();
    rmSync(join(root, PAGE_PATH));
    expect(compareArtifacts({ root }).problems[0]).toMatch(/does not exist/);
  });

  it("writes nothing", () => {
    const root = stagedRoot();
    const page = join(root, PAGE_PATH);
    const drifted = readFileSync(page, "utf8").replace("## Connections", "## Connexions");
    writeFileSync(page, drifted);
    compareArtifacts({ root });
    expect(readFileSync(page, "utf8")).toBe(drifted);
  });

  it("fails when a vendored snapshot is edited without rewriting the manifest", () => {
    const vendorDir = stagedVendor();
    const snapshot = join(vendorDir, ".env.reference");
    writeFileSync(snapshot, `${readFileSync(snapshot, "utf8")}SMUGGLED=1\n`);
    expect(() => compareArtifacts({ root: stagedRoot(), vendorDir })).toThrow(
      /sha256 is .* but the file hashes to/,
    );
  });

  it("accepts a snapshot change whose manifest hash was rewritten", () => {
    // The other half of the contract: refreshing is allowed, refreshing
    // silently is not. A rehashed snapshot parses, and the output changes.
    const vendorDir = stagedVendor();
    const snapshot = join(vendorDir, ".env.reference");
    const text = `${readFileSync(snapshot, "utf8")}\n# A new entry.\n#SMUGGLED=1  # Since v9.9.9\n`;
    writeFileSync(snapshot, text);
    const manifestPath = join(vendorDir, "manifest.json");
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const entry = manifest.files.find((file) => file.role === "env-reference");
    entry.sha256 = sha256(Buffer.from(text));
    entry.lines = (text.match(/\n/g) ?? []).length;
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    const { problems, coverage } = compareArtifacts({ root: stagedRoot(), vendorDir });
    // Appended text lands in the file's last section, which is Development
    // Only, so the new entry is extracted and then excluded by the plan's
    // exclusion rule rather than published.
    expect(
      coverage.excluded.some(
        (entry) => entry.record.name === "SMUGGLED" && entry.classification === "development-only",
      ),
    ).toBe(true);
    // Both artifacts move: the coverage report gains the entry, and the page's
    // sourceOfTruth citation carries the file's line count. The gate reports a
    // reviewable difference rather than regenerating silently.
    expect(problems).toHaveLength(2);
    expect(problems.join("\n")).toContain(PAGE_PATH);
    expect(problems.join("\n")).toContain(COVERAGE_PATH);
  });
});

describe("the CLI surface", () => {
  it("rejects an unknown command", () => {
    const result = run(["nope"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain('unknown command "nope"');
  });

  it("rejects refresh without a repository and a ref", () => {
    const result = run(["refresh"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("--repo");
  });
});

describe("diffSummary", () => {
  it("shows the tracked line and the regenerated line", () => {
    const summary = diffSummary("page.md", "a\nnew\nc\n", "a\nold\nc\n");
    expect(summary).toContain("--- page.md (tracked)");
    expect(summary).toContain("+++ page.md (regenerated)");
    expect(summary).toContain("-old");
    expect(summary).toContain("+new");
  });

  it("caps a large divergence instead of printing the whole file", () => {
    const summary = diffSummary("page.md", Array.from({ length: 200 }, (_, i) => `x${i}`).join("\n"), "y\n");
    expect(summary).toMatch(/\+ \.\.\. \d+ more added lines/);
  });
});
