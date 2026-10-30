import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { validateSnapshots } from "../reference.mjs";
import { repoRoot } from "./manifest.mjs";
import { CONFIG_COVERAGE_PATH, CONFIG_DATA_PATH } from "./extract-config.mjs";
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
/** A throwaway root holding copies of both committed snapshots and nothing else. */
function stagedRoot() {
  const root = temp();
  for (const path of [DATA_PATH, CONFIG_DATA_PATH]) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    cpSync(join(repoRoot, path), join(root, path));
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

describe("JSON-only reference pipeline", () => {
  it("validates both committed snapshots against the manifest", () => {
    const result = validateSnapshots();
    expect(result.environment.published).toHaveLength(445);
    expect([...result.configuration.perPage.keys()]).toEqual([
      "site-and-interface",
      "features-and-branding",
      "datastore-and-queues",
      "email-and-delivery",
      "auth-logging-and-billing-files",
    ]);
    expect(result.configuration.records.length).toBe(
      [...result.configuration.perPage.values()].reduce((a, b) => a + b, 0),
    );
    expect(result.warnings).toEqual([]);
  });

  it("needs neither coverage report nor any upstream source to check", () => {
    expect(() => validateSnapshots({ root: stagedRoot() })).not.toThrow();
  });

  it("accepts a valid snapshot prose edit rather than re-extracting upstream", () => {
    const root = stagedRoot();
    const path = join(root, DATA_PATH);
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.sections[0].prose.push("Reviewed snapshot prose.");
    writeFileSync(path, JSON.stringify(data));
    expect(() => validateSnapshots({ root })).not.toThrow();
  });

  it("accepts a reviewed configuration comment edit rather than re-extracting upstream", () => {
    const root = stagedRoot();
    const path = join(root, CONFIG_DATA_PATH);
    const data = JSON.parse(readFileSync(path, "utf8"));
    data.pages[0].groups[0].records[0].comment.push("Reviewed snapshot comment.");
    writeFileSync(path, JSON.stringify(data));
    expect(() => validateSnapshots({ root })).not.toThrow();
  });

  it.each(["invalid JSON", "anchor", "metadata", "missing"])(
    "rejects %s in the environment snapshot",
    (kind) => {
      const root = stagedRoot();
      const path = join(root, DATA_PATH);
      const data = JSON.parse(readFileSync(path, "utf8"));
      if (kind === "anchor") data.sections[0].anchor = "wrong";
      if (kind === "metadata") data.upstream.commit = "a".repeat(40);
      writeFileSync(path, kind === "invalid JSON" ? "{" : JSON.stringify(data));
      if (kind === "missing") rmSync(path);
      expect(() => validateSnapshots({ root })).toThrow(DATA_PATH);
    },
  );

  it.each(["invalid JSON", "anchor", "metadata", "source hash", "missing"])(
    "rejects %s in the configuration snapshot",
    (kind) => {
      const root = stagedRoot();
      const path = join(root, CONFIG_DATA_PATH);
      const data = JSON.parse(readFileSync(path, "utf8"));
      if (kind === "anchor") data.pages[0].groups[0].anchor = "wrong";
      if (kind === "metadata") data.upstream.commit = "a".repeat(40);
      if (kind === "source hash") data.sources[0].sha256 = "b".repeat(64);
      writeFileSync(path, kind === "invalid JSON" ? "{" : JSON.stringify(data));
      if (kind === "missing") rmSync(path);
      expect(() => validateSnapshots({ root })).toThrow(CONFIG_DATA_PATH);
    },
  );

  it("treats both coverage reports as refresh-only records, not inputs", () => {
    const root = stagedRoot();
    for (const path of [COVERAGE_PATH, CONFIG_COVERAGE_PATH]) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), "Refresh-only report\n");
    }
    expect(() => validateSnapshots({ root })).not.toThrow();
    for (const path of [COVERAGE_PATH, CONFIG_COVERAGE_PATH]) {
      expect(readFileSync(join(root, path), "utf8")).toBe("Refresh-only report\n");
    }
  });

  it("rejects a manifest that still lists vendored files", () => {
    const vendorDir = temp();
    cpSync(join(repoRoot, "vendor/onetimesecret"), vendorDir, { recursive: true });
    mkdirSync(join(vendorDir, "etc/defaults"), { recursive: true });
    writeFileSync(join(vendorDir, "etc/defaults/config.defaults.yaml"), "stowaway: true\n");
    expect(() => validateSnapshots({ vendorDir })).toThrow(/is not an input/);
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
    expect(result.stdout).toContain("configuration JSON validated");
    expect(result.stderr).not.toMatch(/refreshOwner|backupReviewer/);
  });
  it("rejects unknown commands, including the retired generate", () => {
    for (const command of ["nope", "generate"]) {
      const result = run([command]);
      expect(result.status).toBe(2);
      expect(result.stderr).toContain(`unknown command "${command}"`);
    }
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
