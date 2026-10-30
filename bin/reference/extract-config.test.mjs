// bin/reference/extract-config.test.mjs
//
// Fixture-level tests for the configuration data snapshot. The committed
// snapshot's own validity is covered by cli.test.mjs and validate-config.test.mjs.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { anchorFor } from "./ids.mjs";
import {
  BILLING_STRUCTURAL_PATHS,
  CONFIG_COVERAGE_PATH,
  CONFIG_DATA_PATH,
  CONFIG_PAGES,
  CONFIG_ROLES,
  blockedKeys,
  commentLines,
  extractConfigurationSnapshot,
  groupHeading,
  pagePathFor,
  topLevelPathOf,
} from "./extract-config.mjs";
import { inputsFor } from "./fixtures/snapshot-inputs.mjs";
import { repoRoot } from "./manifest.mjs";

const manifest = {
  extractorFormatVersion: 1,
  upstream: {
    repository: "https://github.com/onetimesecret/onetimesecret",
    release: "v9.9.9",
    commit: "0123456789abcdef0123456789abcdef01234567",
  },
};

const snapshot = extractConfigurationSnapshot({ inputs: inputsFor(), manifest });
const { data } = snapshot;
const pageFor = (owner) => data.pages.find((page) => page.owner === owner);
const recordsOf = (page) => page.groups.flatMap((group) => group.records);
const record = (owner, heading) => recordsOf(pageFor(owner)).find((entry) => entry.heading === heading);

describe("snapshot shape", () => {
  it("returns structured data, the coverage report and counts, not pages", () => {
    expect(Object.keys(snapshot).sort()).toEqual(["coverage", "data", "report"]);
    expect(Object.keys(data).sort()).toEqual(["extractorFormatVersion", "pages", "sources", "upstream"]);
    expect(CONFIG_DATA_PATH).toBe("src/data/reference/configuration.json");
    expect(CONFIG_COVERAGE_PATH).toBe("docs/reference/coverage-configuration.md");
    expect(JSON.parse(JSON.stringify(data))).toEqual(data);
  });

  it("is identical when extracted again from the same inputs", () => {
    expect(extractConfigurationSnapshot({ inputs: inputsFor(), manifest })).toEqual(snapshot);
  });

  it("records the upstream revision and every source's path, hash and line count", () => {
    expect(data.upstream).toEqual(manifest.upstream);
    expect(data.extractorFormatVersion).toBe(1);
    expect(data.sources.map((source) => source.role)).toEqual(CONFIG_ROLES);
    for (const source of data.sources) {
      const input = inputsFor().get(source.role);
      expect(source).toEqual({ role: source.role, path: input.path, sha256: input.sha256, lines: input.lines });
    }
  });

  it("emits one page per owner, in sidebar order, reading the planned roles", () => {
    expect(data.pages.map((page) => page.owner)).toEqual(CONFIG_PAGES.map((page) => page.owner));
    for (const [index, page] of data.pages.entries()) expect(page.roles).toEqual(CONFIG_PAGES[index].roles);
    expect(pagePathFor("site-and-interface")).toBe("src/content/docs/en/reference/site-and-interface.mdx");
  });

  it("stores no pre-rendered Markdown", () => {
    const text = JSON.stringify(data);
    expect(text).not.toMatch(/\| --- \|/);
    expect(text).not.toMatch(/```/);
    expect(text).not.toMatch(/"#{2,3} /);
  });
});

describe("key records", () => {
  const site = pageFor("site-and-interface");

  it("heads each record with the file-qualified key path and its slug", () => {
    const host = record("site-and-interface", "config: site.host");
    expect(host).toMatchObject({
      id: "config-config-site.host",
      anchor: anchorFor("config: site.host"),
      path: "site.host",
      fileShort: "config",
      file: "etc/defaults/config.defaults.yaml",
      owner: "site-and-interface",
      lineStart: 4,
      lineEnd: 4,
      sourceSpan: "4",
      since: null,
    });
    expect(record("site-and-interface", "config: site.nested.depth")).toBeDefined();
  });

  it("groups records under their top-level configuration path", () => {
    expect(site.groups.map((group) => group.heading)).toEqual([
      "config file: site",
      "config file: internationalization",
    ]);
    expect(site.groups[0]).toMatchObject({ anchor: anchorFor("config file: site"), fileShort: "config", segment: "site" });
  });

  it("groups keys with no nesting together rather than one section each", () => {
    expect(topLevelPathOf("mode")).toBe("top-level keys");
    expect(topLevelPathOf("site.host")).toBe("site");
    expect(pageFor("auth-logging-and-billing-files").groups.map((group) => group.heading)).toContain(
      "auth file: top-level keys",
    );
  });

  it("keeps the ERB classification, environment reads and unset behaviour", () => {
    const host = record("site-and-interface", "config: site.host");
    expect(host.erb).toMatchObject({
      kind: "env-fallback",
      envReads: ["HOST"],
      staticFallback: "localhost:3000",
      unsetBehaviour: "static fallback",
    });
    expect(host).not.toHaveProperty("literalValue");
    expect(host.rawValue).toBe("<%= ENV['HOST'] || 'localhost:3000' %>");
  });

  it("keeps a literal, including null, apart from an ERB expression", () => {
    const mode = record("email-and-delivery", "config: emailer.mode");
    expect(mode.erb).toBeNull();
    expect(mode.literalValue).toBe("smtp");
    const depth = record("site-and-interface", "config: site.nested.depth");
    expect(depth.literalValue).toBe(2);
  });

  it("keeps keys that share a source line in walk order", () => {
    const fallback = recordsOf(site).filter((entry) => entry.path.startsWith("internationalization.fallback"));
    // A populated sequence yields one record per element, not one for the key.
    expect(fallback.map((entry) => entry.path)).toEqual([
      "internationalization.fallback[0]",
      "internationalization.fallback[1]",
    ]);
    expect(new Set(fallback.map((entry) => entry.lineStart)).size).toBe(1);
  });

  it("carries the source comment as lines without the comment marker", () => {
    expect(record("site-and-interface", "config: site.host").comment).toEqual(["Where the site answers."]);
    expect(record("site-and-interface", "config: site.ssl").comment).toEqual([]);
  });

  it("reads the Since annotation out of the trailing comment and omits it from the comment", () => {
    const pattern = record("site-and-interface", "config: site.pattern");
    expect(pattern.since).toBe("v0.26.0");
    expect(pattern.comment).toEqual(["A value a pipe could split."]);
    expect(pattern.literalValue).toBe("a|b");
  });

  it("never promotes a missing value to a default", () => {
    const secret = record("site-and-interface", "config: site.secret");
    expect(secret.erb).toMatchObject({ kind: "env-read", staticFallback: null });
  });
});

describe("runtime-defined and conditional values", () => {
  it("keeps a runtime-defined expression verbatim", () => {
    const uri = record("datastore-and-queues", "config: redis.uri");
    expect(uri.erb.kind).toBe("runtime-defined");
    expect(uri.erb.raw).toContain("ENV['A'] || ENV['B']");
  });

  it("records a blocked structural block under its group with its keys and raw text", () => {
    const [site] = pageFor("site-and-interface").groups;
    expect(site.blocks).toHaveLength(1);
    expect(site.blocks[0]).toMatchObject({
      heading: "config: site (conditional)",
      anchor: anchorFor("config: site (conditional)"),
      path: "site",
      subject: "site",
      keys: ["extra"],
      openerExpr: "if ENV['FEEDBACK'] != 'false'",
      lineStart: 11,
      lineEnd: 13,
      sourceSpan: "11-13",
    });
    expect(site.blocks[0].raw).toContain("<% if ENV['FEEDBACK'] != 'false' %>");
    expect(pageFor("features-and-branding").groups.flatMap((group) => group.blocks)).toEqual([]);
  });

  it("reads the keys a blocked block sets out of its raw text", () => {
    expect(blockedKeys({ raw: "<% if x %>\n- text: Feedback\n  url: <%= y %>\n<% end %>" })).toEqual([
      "text",
      "url",
    ]);
  });
});

describe("the billing example", () => {
  const page = pageFor("auth-logging-and-billing-files");

  it("publishes the file's configuration-contract keys as records", () => {
    const headings = recordsOf(page).map((entry) => entry.heading);
    expect(headings).toContain("billing: schema_version");
    expect(headings).toContain("billing: currency");
  });

  it("records the catalog sections as structure only, with no value from them", () => {
    expect(page.structural.map((section) => section.section)).toEqual(BILLING_STRUCTURAL_PATHS);
    for (const section of page.structural) {
      expect(section.heading).toBe(groupHeading("billing", section.section));
      expect(section.anchor).toBe(anchorFor(section.heading));
    }
    expect(recordsOf(page).some((entry) => entry.path.startsWith("plans"))).toBe(false);
    expect(JSON.stringify(page)).not.toContain('"Free"');
  });

  it("counts the entries and lists the entry field names", () => {
    const plans = page.structural.find((section) => section.section === "plans");
    expect(plans).toMatchObject({ entries: 1, fields: ["name", "tier"], file: "etc/examples/billing.example.yaml" });
    expect(plans.sourceSpan).toMatch(/^\d+-\d+$/);
  });
});

describe("coverage", () => {
  it("counts published records per page and every extracted key", () => {
    expect([...snapshot.coverage.perPage.keys()]).toEqual(CONFIG_PAGES.map((page) => page.owner));
    const published = data.pages.reduce((sum, page) => sum + recordsOf(page).length, 0);
    expect([...snapshot.coverage.perPage.values()].reduce((a, b) => a + b, 0)).toBe(published);
    expect(snapshot.coverage.records).toBeGreaterThan(published);
    expect(snapshot.coverage.structuralBlocks).toBe(1);
  });

  it("renders the internal coverage report from the refresh, scoped to the release", () => {
    expect(snapshot.report).toContain("Generated by `bin/reference.mjs refresh`");
    expect(snapshot.report).toContain("v9.9.9 defaults files (`01234567`)");
    expect(snapshot.report).toContain("## Blocked structural blocks");
    expect(snapshot.report.endsWith("\n")).toBe(true);
  });
});

describe("refusals", () => {
  it("mints a unique anchor for every heading on every page", () => {
    for (const page of data.pages) {
      const anchors = [
        ...page.groups.flatMap((group) => [group.anchor, ...group.records.map((r) => r.anchor), ...group.blocks.map((b) => b.anchor)]),
        ...page.structural.map((section) => section.anchor),
      ];
      expect(new Set(anchors).size).toBe(anchors.length);
    }
  });

  it("fails loudly when two headings would claim one anchor", () => {
    // `a.b` and `a-b` both slug to `config-ab`, so the same page cannot carry
    // both. A suffixed anchor would silently retarget a deep link.
    const collide = "---\ncollide:\n  a:\n    b: 1\n  ab: 2\n";
    expect(() =>
      extractConfigurationSnapshot({ inputs: inputsFor({ texts: { "config-defaults": collide } }), manifest }),
    ).toThrow(/anchor collision on "#config-collideab"/);
  });

  it("refuses when a key has no owning page", () => {
    // The auth file's catch-all rule is keyed on the short name, so a file the
    // ownership rules do not know about produces unassigned keys.
    expect(() =>
      extractConfigurationSnapshot({
        inputs: inputsFor({ paths: { "auth-defaults": "etc/defaults/unknown.yaml" } }),
        manifest,
      }),
    ).toThrow(/have no owning page/);
  });

  it("refuses malformed YAML rather than publishing a partial extraction", () => {
    expect(() =>
      extractConfigurationSnapshot({
        inputs: inputsFor({ texts: { "logging-defaults": "---\na: 1\na: 2\n" } }),
        manifest,
      }),
    ).toThrow(/configuration extraction failed/);
  });

  it("refuses when a declared role is missing", () => {
    const inputs = inputsFor();
    inputs.delete("billing-example");
    expect(() => extractConfigurationSnapshot({ inputs, manifest })).toThrow(/no billing-example input/);
  });
});

describe("helpers", () => {
  it("drops the comment marker and a Since-only trailing comment", () => {
    expect(commentLines({ comment: "# one\n#  two", trailingComment: "# Since v1.2.3" })).toEqual(["one", " two"]);
    expect(commentLines({ comment: null, trailingComment: "# note" })).toEqual(["note"]);
  });

  it("the tracked page wrappers exist for every owner", () => {
    for (const page of CONFIG_PAGES) {
      expect(() => readFileSync(`${repoRoot}/${pagePathFor(page.owner)}`, "utf8")).not.toThrow();
      expect(readFileSync(`${repoRoot}/${pagePathFor(page.owner)}`, "utf8")).toContain(
        `<ConfigReference owner="${page.owner}" />`,
      );
    }
  });
});
