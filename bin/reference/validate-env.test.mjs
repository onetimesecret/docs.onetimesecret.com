import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { sha256 } from "./manifest.mjs";
import { extractEnvironmentSnapshot } from "./render-env.mjs";
import { validateEnvironmentData } from "./validate-env.mjs";

const text = readFileSync(new URL("./fixtures/snapshot.envref", import.meta.url), "utf8");
const manifest = {
  extractorFormatVersion: 1,
  upstream: { repository: "https://github.com/onetimesecret/onetimesecret", release: "v1.0.0", commit: "a".repeat(40) },
  environmentSource: { path: ".env.reference", sha256: sha256(text), lines: text.split("\n").length - 1 },
};
const fixture = () => JSON.parse(JSON.stringify(extractEnvironmentSnapshot(text, manifest).data));

describe("environment snapshot validation", () => {
  it("accepts a serialized fixture and preserves the renderer contract", () => {
    const data = fixture();
    expect(validateEnvironmentData(data, manifest).published.map(({ name }) => name)).toEqual(["HOST", "API_TOKEN"]);
    expect(data.source).toEqual(manifest.environmentSource);
    expect(data.extractorFormatVersion).toBe(1);
    expect(data.sections[0].records[0]).toMatchObject({ anchor: "host", id: "env-host", example: "HOST=localhost", sourceSpan: "9-10" });
  });

  it.each([
    ["root", (data) => null],
    ["version", (data) => { data.extractorFormatVersion = 2; }],
    ["repository", (data) => { data.upstream.repository = "other"; }],
    ["release", (data) => { data.upstream.release = "v2"; }],
    ["commit", (data) => { data.upstream.commit = "a"; }],
    ["source path", (data) => { data.source.path = "../.env"; }],
    ["source hash", (data) => { data.source.sha256 = "b".repeat(64); }],
    ["source lines", (data) => { data.source.lines++; }],
    ["header", (data) => { data.header = [4]; }],
    ["sections", (data) => { data.sections = []; }],
    ["section anchor", (data) => { data.sections[0].anchor = "wrong"; }],
    ["section prose", (data) => { data.sections[0].prose = null; }],
    ["records", (data) => { data.sections[0].records = {}; }],
    ["record id", (data) => { data.sections[0].records[0].id = "wrong"; }],
    ["record anchor", (data) => { data.sections[0].records[0].anchor = "wrong"; }],
    ["record section", (data) => { data.sections[0].records[0].section = "other"; }],
    ["source bounds", (data) => { data.sections[0].records[0].lineEnd = 999; }],
    ["source span", (data) => { data.sections[0].records[0].sourceSpan = "1"; }],
    ["source order", (data) => { data.sections[0].records.reverse(); }],
    ["example", (data) => { data.sections[0].records[0].example = "HOST=wrong"; }],
    ["active", (data) => { data.sections[0].records[0].active = "true"; }],
    ["commented", (data) => { data.sections[0].records[0].commented = true; }],
    ["default", (data) => { data.sections[0].records[0].declaredDefault = {}; }],
    ["excluded record", (data) => { data.sections[0].records[0].classification = "malformed"; }],
    ["duplicate section", (data) => { data.sections.push({ ...data.sections[0], records: [] }); }],
    ["section/record collision", (data) => { data.sections.push({ heading: "HOST", anchor: "host", prose: [], records: [] }); }],
    ["duplicate record", (data) => { const r = data.sections[0].records[1]; Object.assign(r, { name: "HOST", id: "env-host", anchor: "host", example: "#HOST=" }); }],
  ])("rejects invalid %s", (_name, mutate) => {
    const data = fixture();
    const result = mutate(data);
    expect(() => validateEnvironmentData(result === null ? null : data, manifest)).toThrow();
  });
});

describe("refresh extraction gate", () => {
  it.each([
    ["malformed", `${text}\nBROKEN="unterminated\n`],
    ["unresolved", `OUTSIDE=1\n${text}`],
    ["unrecognized", `${text}\nnot an assignment\n`],
  ])("rejects %s input before publishing", (_kind, source) => {
    expect(() => extractEnvironmentSnapshot(source, manifest)).toThrow(/malformed or unresolved/);
  });
  it("records exclusions and refresh provenance in coverage", () => {
    const { coverage, report } = extractEnvironmentSnapshot(text, manifest);
    expect(coverage.excluded.map(({ record }) => record.name)).toEqual(["DEBUG"]);
    expect(report).toContain("bin/reference.mjs refresh");
    expect(report).toContain("| Published | 2 |");
    expect(report).not.toContain("vendor/");
  });
});
