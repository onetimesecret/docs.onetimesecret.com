import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { parse } from "yaml";
import { describe, expect, it } from "vitest";

const workflow = parse(readFileSync(new URL("../.github/workflows/reference-freshness.yml", import.meta.url), "utf8"));
const script = workflow.jobs.freshness.steps.find((step) => step.run).run;
const hash = (text) => createHash("sha256").update(text).digest("hex");

// Run the actual workflow shell with a fake GitHub API, never the network.
function compare(changedPath = "", latest = "v2") {
  const root = mkdtempSync(join(tmpdir(), "reference-freshness-"));
  try {
    mkdirSync(join(root, "vendor/onetimesecret"), { recursive: true });
    mkdirSync(join(root, "bin"));
    const paths = [".env.reference", "etc/defaults/config.defaults.yaml", "etc/defaults/auth.defaults.yaml", "etc/defaults/logging.defaults.yaml", "etc/examples/billing.example.yaml"];
    const entries = paths.map((path) => ({ path, sha256: hash(path), lines: 1 }));
    writeFileSync(join(root, "vendor/onetimesecret/manifest.json"), JSON.stringify({
      upstream: { release: "v1", commit: "a".repeat(40) },
      environmentSource: entries[0],
      configurationSources: entries.slice(1),
    }));
    writeFileSync(join(root, "bin/gh"), `#!${process.execPath}
const endpoint = process.argv[3];
if (endpoint.endsWith('/releases/latest')) console.log(process.env.TEST_LATEST);
else {
  const path = endpoint.split('/contents/')[1].split('?')[0];
  process.stdout.write(path + (path === process.env.TEST_CHANGED_PATH ? ' changed' : ''));
}
`, { mode: 0o755 });
    // macOS and Linux may expose different SHA-256 utilities.
    writeFileSync(join(root, "bin/sha256sum"), `#!${process.execPath}
const fs = require('node:fs');
const crypto = require('node:crypto');
console.log(crypto.createHash('sha256').update(fs.readFileSync(process.argv[2])).digest('hex') + '  input');
`, { mode: 0o755 });
    execFileSync("jq", ["--version"]);
    return spawnSync("bash", ["-c", script.replaceAll("/tmp/upstream-input", join(root, "upstream-input"))], {
      cwd: root, encoding: "utf8",
      env: { ...process.env, PATH: `${join(root, "bin")}:${process.env.PATH}`, TEST_CHANGED_PATH: changedPath, TEST_LATEST: latest },
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe("reference freshness workflow", () => {
  it("detects an environment-only change even though configurationSources lists only YAML", () => {
    const result = compare(".env.reference");
    expect(result.status, result.stderr).toBe(1);
    expect(result.stdout).toContain("changed upstream: .env.reference");
    expect(result.stdout).toContain("unchanged: etc/defaults/config.defaults.yaml");
  });
  it("still detects YAML changes", () => {
    const result = compare("etc/defaults/auth.defaults.yaml");
    expect(result.status, result.stderr).toBe(1);
    expect(result.stdout).toContain("unchanged: .env.reference");
    expect(result.stdout).toContain("changed upstream: etc/defaults/auth.defaults.yaml");
  });
  it("reports identical inputs only after comparing environment and YAML sources", () => {
    const result = compare();
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout.match(/unchanged:/g)).toHaveLength(5);
    expect(result.stdout).toContain("every pinned input is byte-identical");
  });
  it("skips comparison when already pinned to the latest release", () => {
    const result = compare(".env.reference", "v1");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Nothing to do");
    expect(result.stdout).not.toContain("unchanged:");
  });
});
