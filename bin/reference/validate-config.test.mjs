import { describe, expect, it } from "vitest";

import { extractConfigurationSnapshot } from "./extract-config.mjs";
import { inputsFor } from "./fixtures/snapshot-inputs.mjs";
import { validateConfigurationData } from "./validate-config.mjs";

const manifest = {
  extractorFormatVersion: 1,
  upstream: {
    repository: "https://github.com/onetimesecret/onetimesecret",
    release: "v1.0.0",
    commit: "a".repeat(40),
  },
  configurationSources: [...inputsFor().values()].map(({ role, path, sha256, lines }) => ({
    path,
    role,
    sha256,
    lines,
  })),
};
const fixture = () =>
  JSON.parse(JSON.stringify(extractConfigurationSnapshot({ inputs: inputsFor(), manifest }).data));
const site = (data) => data.pages[0];
const firstRecord = (data) => site(data).groups[0].records[0];

describe("configuration snapshot validation", () => {
  it("accepts a serialized fixture and reports what it holds", () => {
    const data = fixture();
    const result = validateConfigurationData(data, manifest);
    expect(result.records.map(({ heading }) => heading)).toContain("config: site.host");
    expect([...result.perPage.keys()]).toEqual(data.pages.map((page) => page.owner));
    expect(result.blocks).toBe(1);
    expect(result.structural).toBe(3);
    expect(data.sources).toEqual(manifest.configurationSources.map(({ role, path, sha256, lines }) => ({ role, path, sha256, lines })));
  });

  it.each([
    ["root", () => null],
    ["version", (data) => { data.extractorFormatVersion = 2; }],
    ["repository", (data) => { data.upstream.repository = "other"; }],
    ["release", (data) => { data.upstream.release = "v2"; }],
    ["commit", (data) => { data.upstream.commit = "a"; }],
    ["missing source", (data) => { data.sources.pop(); }],
    ["source path", (data) => { data.sources[0].path = "../config.yaml"; }],
    ["source hash", (data) => { data.sources[0].sha256 = "b".repeat(64); }],
    ["source lines", (data) => { data.sources[0].lines++; }],
    ["duplicate source role", (data) => { data.sources[1].role = data.sources[0].role; }],
    ["missing page", (data) => { data.pages.pop(); }],
    ["page order", (data) => { data.pages.reverse(); }],
    ["page roles", (data) => { site(data).roles = ["auth-defaults"]; }],
    ["group anchor", (data) => { site(data).groups[0].anchor = "wrong"; }],
    ["group heading", (data) => { site(data).groups[0].heading = "config file: other"; }],
    ["record id", (data) => { firstRecord(data).id = ""; }],
    ["duplicate record id", (data) => { const [a, b] = site(data).groups[0].records; b.id = a.id; }],
    ["record heading", (data) => { firstRecord(data).heading = "config: other"; }],
    ["record anchor", (data) => { firstRecord(data).anchor = "wrong"; }],
    ["record owner", (data) => { firstRecord(data).owner = "features-and-branding"; }],
    ["record grouping", (data) => { firstRecord(data).path = "features.x"; firstRecord(data).heading = "config: features.x"; firstRecord(data).anchor = "config-featuresx"; }],
    ["record file", (data) => { firstRecord(data).file = "etc/other.yaml"; }],
    ["source bounds", (data) => { firstRecord(data).lineEnd = 999; firstRecord(data).sourceSpan = "4-999"; }],
    ["source span", (data) => { firstRecord(data).sourceSpan = "1"; }],
    ["source order", (data) => { site(data).groups[0].records.reverse(); }],
    ["raw value", (data) => { firstRecord(data).rawValue = null; }],
    ["comment", (data) => { firstRecord(data).comment = "text"; }],
    ["since", (data) => { firstRecord(data).since = ""; }],
    ["erb kind", (data) => { firstRecord(data).erb.kind = "magic"; }],
    ["erb reads", (data) => { firstRecord(data).erb.envReads = "HOST"; }],
    ["erb unset", (data) => { firstRecord(data).erb.unsetBehaviour = "maybe"; }],
    ["erb with literal", (data) => { firstRecord(data).literalValue = "x"; }],
    ["literal without value", (data) => { const r = site(data).groups[0].records.find((e) => e.erb === null); delete r.literalValue; }],
    ["literal shape", (data) => { const r = site(data).groups[0].records.find((e) => e.erb === null); r.literalValue = { nested: true }; }],
    ["block heading", (data) => { site(data).groups[0].blocks[0].heading = "config: site"; }],
    ["block anchor", (data) => { site(data).groups[0].blocks[0].anchor = "wrong"; }],
    ["block subject", (data) => { site(data).groups[0].blocks[0].subject = "other"; }],
    ["block keys", (data) => { site(data).groups[0].blocks[0].keys = "extra"; }],
    ["block bounds", (data) => { site(data).groups[0].blocks[0].lineEnd = 999; site(data).groups[0].blocks[0].sourceSpan = "11-999"; }],
    ["structural section", (data) => { data.pages[4].structural[0].section = "prices"; }],
    ["structural heading", (data) => { data.pages[4].structural[0].heading = "billing file: other"; }],
    ["structural entries", (data) => { data.pages[4].structural[0].entries = -1; }],
    ["structural fields", (data) => { data.pages[4].structural[0].fields = [1]; }],
    ["structural on the wrong page", (data) => { site(data).structural.push(data.pages[4].structural[0]); }],
    ["anchor collision", (data) => { const group = site(data).groups[0]; group.records.push({ ...group.records[0], id: "other-id" }); }],
  ])("rejects invalid %s", (_name, mutate) => {
    const data = fixture();
    const result = mutate(data);
    expect(() => validateConfigurationData(result === null ? null : data, manifest)).toThrow();
  });
});
