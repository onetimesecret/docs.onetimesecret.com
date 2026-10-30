// bin/reference/present-config.test.mjs
//
// The presentation helpers the ConfigReference component and the rendered-HTML
// check share. They turn structured records into cells; they never read upstream.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  cellText,
  conditionalText,
  environmentOf,
  environmentText,
  fill,
  pageHeadings,
  preambleText,
  recordRowText,
  shapeOf,
  STRINGS,
  structuralRowText,
  structuralText,
  unsetOf,
  valueOf,
} from "../../src/lib/reference/configuration.mjs";
import { anchorFor } from "./ids.mjs";
import { CONFIG_DATA_PATH } from "./extract-config.mjs";
import { repoRoot } from "./manifest.mjs";

// The committed snapshot, parsed once for every suite that reads it.
const data = JSON.parse(readFileSync(`${repoRoot}/${CONFIG_DATA_PATH}`, "utf8"));
const records = data.pages.flatMap((page) => page.groups.flatMap((group) => group.records));
const recordAt = (path) => {
  const record = records.find((candidate) => candidate.path === path);
  expect(record, path).toBeDefined();
  return record;
};
const isSplitCast = (record) => (record.erb?.cast ?? []).some((cast) => cast.startsWith("split("));

describe("cell helpers", () => {
  it("distinguishes an empty string from no value", () => {
    expect(valueOf({ erb: { kind: "env-fallback", staticFallback: "" } })).toEqual({ code: '""' });
    expect(valueOf({ erb: { kind: "env-read", staticFallback: null } })).toEqual({ text: STRINGS.cellNoValue });
    expect(valueOf({ erb: null, literalValue: null })).toEqual({ code: "null" });
    expect(valueOf({ erb: null, literalValue: {} })).toEqual({ code: "{}" });
    expect(valueOf({ erb: null, literalValue: [] })).toEqual({ code: "[]" });
    expect(valueOf({ erb: null, literalValue: "" })).toEqual({ code: '""' });
    expect(valueOf({ erb: null, literalValue: 3 })).toEqual({ code: "3" });
  });

  it("prints a collection default as it is, never as an empty one", () => {
    expect(valueOf({ erb: { kind: "env-fallback", staticFallback: [] } })).toEqual({ code: "[]" });
    expect(valueOf({ erb: { kind: "env-fallback", staticFallback: {} } })).toEqual({ code: "{}" });
    expect(valueOf({ erb: { kind: "env-fallback", staticFallback: ["a", "b"] } })).toEqual({ code: '["a","b"]' });
    expect(valueOf({ erb: null, literalValue: { a: 1 } })).toEqual({ code: '{"a":1}' });
  });

  it("says a runtime-defined value is determined at run time", () => {
    const record = { erb: { kind: "runtime-defined", unsetBehaviour: "unknown", envReads: ["A", "B"] } };
    expect(shapeOf(record)).toBe("runtime-defined");
    expect(valueOf(record)).toEqual({ text: STRINGS.cellRuntimeDefined });
    expect(unsetOf(record)).toEqual({ text: STRINGS.cellRuntimeDefined });
  });

  it("reports a literal as the shipped default rather than as an environment read", () => {
    expect(unsetOf({ erb: null, literalValue: "smtp" })).toEqual({ text: STRINGS.cellShippedValue });
    expect(environmentOf({ erb: null, literalValue: "smtp" })).toEqual([]);
    expect(environmentText({ erb: null, literalValue: "smtp" })).toBe(STRINGS.cellNoEnvironment);
  });

  it("maps each unset behaviour to its cell", () => {
    expect(unsetOf({ erb: { unsetBehaviour: "static fallback" } })).toEqual({ text: STRINGS.cellStaticFallback });
    expect(unsetOf({ erb: { unsetBehaviour: "true" } })).toEqual({ code: "true" });
    expect(unsetOf({ erb: { unsetBehaviour: "false" } })).toEqual({ code: "false" });
    expect(unsetOf({ erb: { unsetBehaviour: "nil" } })).toEqual({ text: STRINGS.cellNoValue });
  });

  it("derives the shape from the cast chain, the ERB kind or the literal", () => {
    expect(shapeOf({ erb: { kind: "cast", cast: ["to_i"] } })).toBe("integer");
    expect(shapeOf({ erb: { kind: "cast", cast: ["to_f"] } })).toBe("number");
    expect(shapeOf({ erb: { kind: "cast", cast: ["split(,)"] } })).toBe("list");
    expect(shapeOf({ erb: { kind: "cast", cast: ["to_json"] } })).toBe("JSON string");
    expect(shapeOf({ erb: { kind: "boolean" } })).toBe("boolean");
    expect(shapeOf({ erb: { kind: "json-quoted" } })).toBe("JSON string");
    expect(shapeOf({ erb: { kind: "env-fallback" } })).toBe("string");
    expect(shapeOf({ erb: null, literalValue: 3 })).toBe("integer");
    expect(shapeOf({ erb: null, literalValue: 2.5 })).toBe("number");
    expect(shapeOf({ erb: null, literalValue: true })).toBe("boolean");
    expect(shapeOf({ erb: null, literalValue: [] })).toBe("list");
    expect(shapeOf({ erb: null, literalValue: {} })).toBe("mapping");
    expect(shapeOf({ erb: null, literalValue: null })).toBe("null");
    expect(shapeOf({ erb: null, literalValue: "x" })).toBe("string");
  });

  it("de-duplicates ordered environment alternatives in order", () => {
    expect(environmentOf({ erb: { envReads: ["A", "B", "A"] } })).toEqual(["A", "B"]);
    expect(environmentText({ erb: { envReads: ["A", "B", "A"] } })).toBe("A, B");
  });

  it("builds the whole row in column order", () => {
    const record = {
      erb: { kind: "env-fallback", staticFallback: "localhost:3000", envReads: ["HOST"], unsetBehaviour: "static fallback" },
      since: null,
      file: "etc/defaults/config.defaults.yaml",
      sourceSpan: "7",
    };
    expect(STRINGS.columns).toEqual(["Shape", "Value", "Environment variables", "When unset", "Since", "Source"]);
    expect(recordRowText(record)).toEqual([
      "string",
      "localhost:3000",
      "HOST",
      STRINGS.cellStaticFallback,
      STRINGS.cellNoSince,
      "etc/defaults/config.defaults.yaml:7",
    ]);
    expect(cellText({ code: "x" })).toBe("x");
    expect(cellText({ text: "y" })).toBe("y");
  });
});

describe("committed extracted records", () => {
  it("renders every split cast as a list", () => {
    const splitRecords = records.filter(isSplitCast);
    expect(splitRecords.length).toBeGreaterThan(0);
    for (const record of splitRecords) {
      expect(shapeOf(record), record.path).toBe("list");
      expect(recordRowText(record)[0], record.path).toBe("list");
    }
  });

  it.each([
    "site.interface.ui.homepage.matching_cidrs",
    "site.network.trusted_proxy.cidrs",
    "site.admin.allowed_cidrs",
    "site.authentication.allowed_signup_domains",
  ])("renders %s as a list with an explicit empty-array fallback", (path) => {
    const record = recordAt(path);
    expect(record.erb.cast).toContain("split(,)");
    expect(record.erb.staticFallback).toEqual([]);
    expect(shapeOf(record)).toBe("list");
    expect(valueOf(record)).toEqual({ code: "[]" });
    expect(recordRowText(record).slice(0, 2)).toEqual(["list", "[]"]);
  });

  it.each(["site.admin.allowed_hosts", "features.incoming.recipients[0]"])(
    "renders %s as a list without inventing a fallback",
    (path) => {
      const record = recordAt(path);
      expect(record.erb.cast).toContain("split(,)");
      expect(record.erb.staticFallback).toBeNull();
      expect(shapeOf(record)).toBe("list");
      expect(valueOf(record)).toEqual({ text: STRINGS.cellNoValue });
    },
  );
});

describe("sentences", () => {
  it("fills placeholders and leaves unknown ones alone", () => {
    expect(fill("<a> and <b>", { a: 1 })).toBe("1 and <b>");
  });

  it("names the conditional keys and the subject", () => {
    expect(conditionalText({ keys: ["text", "url"], subject: "site.links" })).toBe(
      "The shipped defaults file sets text, url inside a conditional block, so it states no unconditional value for site.links.",
    );
  });

  it("describes a structural section and its row", () => {
    const section = { section: "plans", entries: 2, fields: ["name", "tier"], file: "etc/examples/billing.example.yaml", sourceSpan: "10-20" };
    expect(structuralText(section)).toContain("The plans section of the example file is reproduced here as a structure only");
    expect(structuralRowText(section)).toEqual(["2", "name, tier", "etc/examples/billing.example.yaml:10-20"]);
    expect(structuralRowText({ ...section, fields: [] })[1]).toBe(STRINGS.cellNoEnvironment);
  });

  it("names the release and short SHA exactly as the environment page does", () => {
    expect(preambleText({ release: "v9.9.9", commit: "0123456789abcdef0123456789abcdef01234567" })).toBe(
      "This reference reflects Onetime Secret v9.9.9 (01234567).",
    );
  });
});

describe("page headings", () => {
  it("lists groups, records, blocks and structural sections in document order with their depths", () => {
    const page = {
      groups: [
        {
          heading: "config file: site",
          anchor: "config-file-site",
          records: [{ heading: "config: site.host", anchor: "config-sitehost" }],
          blocks: [{ heading: "config: site (conditional)", anchor: "config-site-conditional" }],
        },
      ],
      structural: [{ heading: "billing file: plans", anchor: "billing-file-plans" }],
    };
    expect(pageHeadings(page)).toEqual([
      { depth: 2, text: "config file: site", slug: "config-file-site" },
      { depth: 3, text: "config: site.host", slug: "config-sitehost" },
      { depth: 3, text: "config: site (conditional)", slug: "config-site-conditional" },
      { depth: 2, text: "billing file: plans", slug: "billing-file-plans" },
    ]);
  });

  it("predicts the committed snapshot's anchors from its headings", () => {
    for (const page of data.pages) {
      const headings = pageHeadings(page);
      expect(headings.length).toBeGreaterThan(0);
      for (const heading of headings) expect(heading.slug).toBe(anchorFor(heading.text));
      expect(new Set(headings.map((heading) => heading.slug)).size).toBe(headings.length);
    }
  });
});
