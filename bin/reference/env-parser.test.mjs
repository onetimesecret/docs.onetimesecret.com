// bin/reference/env-parser.test.mjs
//
// Fixture-driven tests for the `.env.reference` extractor (plan section 6).
// The fixture in fixtures/sample.envref carries one line per hazard the plan
// lists; these tests pin what the parser makes of each one.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  COVERAGE_RE,
  coverageReport,
  declaredDefaultFrom,
  parseEnvReference,
  sectionHeading,
  sectionSlug,
} from "./env-parser.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = (name) => readFileSync(join(here, "fixtures", name), "utf8");

const sample = parseEnvReference(fixture("sample.envref"), { sourceName: "sample.envref" });
const byName = (name) => sample.records.filter((record) => record.name === name);
const one = (name) => {
  const found = byName(name);
  expect(found, `${name} should appear exactly once`).toHaveLength(1);
  return found[0];
};
// ACTIVE_VALUE is the deliberate duplicate: declared once in the sample
// section and again in the development-only one.
const first = (name) => byName(name)[0];

describe("sections", () => {
  it("reads sections out of the banner comments", () => {
    expect(sample.sections.map((section) => section.heading)).toEqual([
      "Sample Section",
      "Development Only",
    ]);
  });

  it("keeps the acronym casing the published headings depend on", () => {
    expect(sectionHeading("SSO / OMNIAUTH")).toBe("SSO / OmniAuth");
    expect(sectionHeading("BRANDING / PRIVATE-LABEL")).toBe("Branding / Private-Label");
    expect(sectionHeading("UI / HOMEPAGE")).toBe("UI / Homepage");
    expect(sectionHeading("SECRET TTL CONFIGURATION")).toBe("Secret TTL Configuration");
    expect(sectionSlug("SSO / OMNIAUTH")).toBe("sso-omniauth");
  });

  it("attaches prose that follows a banner to the section, not to the first variable", () => {
    expect(sample.sections[0].prose).toEqual([
      "Section prose: belongs to the section, not to the first variable.",
    ]);
    expect(one("ACTIVE_EMPTY").prose[0]).toMatch(/^Active assignment, empty value/);
  });

  it("classifies the development-only section", () => {
    expect(sample.sections[1].classification).toBe("development-only");
    expect(one("DEV_ONLY_FLAG").classification).toBe("development-only");
  });

  it("refuses a file with no section banners", () => {
    expect(() => parseEnvReference(fixture("no-banners.envref"))).toThrow(/no .* section banners/);
  });
});

describe("assignments", () => {
  it("separates active from commented", () => {
    expect(first("ACTIVE_VALUE").active).toBe(true);
    expect(first("ACTIVE_VALUE").commented).toBe(false);
    expect(one("COMMENTED_TTL").active).toBe(false);
    expect(one("COMMENTED_TTL").commented).toBe(true);
  });

  it("keeps an empty value empty rather than calling it unset", () => {
    expect(one("ACTIVE_EMPTY").exampleValue).toBe("");
    expect(one("ACTIVE_EMPTY").declaredDefault).toBeNull();
  });

  it("strips the release annotation off the value and records it", () => {
    expect(first("ACTIVE_VALUE").exampleValue).toBe("production");
    expect(first("ACTIVE_VALUE").since).toBe("v0.26.0");
    expect(one("TAGGED_KEY").since).toBe("unreleased");
    expect(one("QUOTED_HASH").since).toBeNull();
  });

  it("preserves a quoted hash inside a value", () => {
    expect(one("QUOTED_HASH").exampleValue).toBe("'#3B82F6'");
  });

  it("preserves equals signs and a colon inside a value", () => {
    expect(one("URL_WITH_EQUALS").exampleValue).toBe("'redis://host:6379/0?timeout=5&other=1'");
  });

  it("preserves a pipe inside a value", () => {
    expect(one("MARKDOWN_HOSTILE").exampleValue).toBe("keep|me");
  });

  it("joins a backslash continuation into one record spanning both lines", () => {
    const record = one("MULTILINE_VALUE");
    expect(record.exampleValue).toBe("first \nsecond");
    expect(record.lineEnd).toBe(record.lineStart + 1);
  });

  it("records the raw line verbatim", () => {
    expect(first("ACTIVE_VALUE").raw).toBe("ACTIVE_VALUE=production  # Since v0.26.0");
    expect(one("QUOTED_HASH").raw).toBe("#QUOTED_HASH='#3B82F6'");
  });

  it("reads the tags the prose carries", () => {
    expect(one("TAGGED_KEY").tags).toEqual(["derived"]);
    expect(first("ACTIVE_VALUE").tags).toEqual([]);
    // The hostile-prose fixture quotes `[derived]` as an example of Markdown
    // link-reference syntax, and the tag reader takes it at face value: tags
    // come from the prose text, with no attempt to tell a tag from a mention
    // of one. Pinned so a change to that rule is a visible decision.
    expect(one("MARKDOWN_HOSTILE").tags).toEqual(["derived"]);
  });
});

describe("malicious-looking values stay inert", () => {
  // Nothing in this module evaluates, interpolates or shells out. These assert
  // the strings survive byte-for-byte; if anything ever did run them, the
  // recorded value would not be the source text.
  it("keeps a command substitution as text", () => {
    expect(one("SHELL_LOOKALIKE").exampleValue).toBe("$(rm -rf /)");
  });

  it("keeps a backtick command as text", () => {
    expect(one("BACKTICK_LOOKALIKE").exampleValue).toBe("`rm -rf /`");
  });

  it("keeps a brace expansion as text and does not read the environment", () => {
    expect(one("BRACE_LOOKALIKE").exampleValue).toBe("${HOME}/nope");
  });
});

describe("declared defaults", () => {
  it("takes `Default: X` and drops the explanation after it", () => {
    expect(one("COMMENTED_TTL").declaredDefault).toMatchObject({
      value: "3600",
      form: "default-colon",
    });
  });

  it("takes the `Default when unset:` phrasing", () => {
    expect(one("PHRASED_DEFAULT").declaredDefault).toMatchObject({
      value: '"Secure Links"',
      form: "default-colon",
    });
  });

  it("takes `X (default)` when X is the variable's own example value", () => {
    expect(one("ENUM_MODE").declaredDefault).toMatchObject({
      value: "warn",
      form: "default-parenthetical",
    });
  });

  it("refuses `(default)` after a word that is not a value, and says so", () => {
    expect(one("AMBIGUOUS_DEFAULT").declaredDefault).toBeNull();
    expect(
      sample.diagnostics.find(
        (d) => d.kind === "ambiguous-default" && d.name === "AMBIGUOUS_DEFAULT",
      ),
    ).toBeTruthy();
  });

  it("never promotes an example value to a default", () => {
    // ACTIVE_VALUE ships uncommented with a value and no stated default. That
    // value is an example, and plan A2 forbids renaming it to "Default".
    expect(first("ACTIVE_VALUE").exampleValue).toBe("production");
    expect(first("ACTIVE_VALUE").declaredDefault).toBeNull();
  });

  it("accepts a state word the plan requires be kept distinct", () => {
    expect(declaredDefaultFrom(["When false (default), headers are ignored."], "")).toMatchObject({
      value: "false",
    });
    expect(declaredDefaultFrom(["Unset (default) = the canonical hosts."], "")).toMatchObject({
      value: "Unset",
    });
    expect(declaredDefaultFrom(["Empty (default) = no passphrase."], "")).toMatchObject({
      value: "Empty",
    });
  });

  it("reports nothing when the prose states nothing", () => {
    expect(declaredDefaultFrom(["Just a description."], "whatever")).toBeNull();
  });
});

describe("diagnostics", () => {
  it("does not attach a comment block separated by a blank line", () => {
    const record = one("DETACHED_PROSE");
    expect(record.prose).toEqual([]);
    expect(
      sample.diagnostics.find(
        (d) => d.kind === "ambiguous-comment-attachment" && d.name === "DETACHED_PROSE",
      ),
    ).toBeTruthy();
  });

  it("reports an unbalanced quote as malformed", () => {
    expect(one("MALFORMED_QUOTE").classification).toBe("malformed");
    expect(
      sample.diagnostics.find(
        (d) => d.kind === "malformed-assignment" && d.name === "MALFORMED_QUOTE",
      ),
    ).toBeTruthy();
  });

  it("reports a repeated name against its first declaration", () => {
    const repeats = byName("ACTIVE_VALUE");
    expect(repeats).toHaveLength(2);
    expect(repeats[1].classification).toBe("duplicate");
    expect(repeats[1].firstDeclaredAt).toBe(repeats[0].lineStart);
  });

  it("reads a variable named mid-prose as prose, not as a declaration", () => {
    const prose = sample.diagnostics.filter((d) => d.kind === "prose-reference");
    expect(prose).toHaveLength(1);
    expect(prose[0].name).toBe("ENUM_MODE");
    // The mention does not mint a second ENUM_MODE record, and therefore does
    // not report a false duplicate.
    expect(byName("ENUM_MODE")).toHaveLength(1);
  });
});

describe("coverage", () => {
  it("accounts for every line matching the assignment shape", () => {
    const lines = fixture("sample.envref").split("\n").filter((line) => COVERAGE_RE.test(line));
    const coverage = coverageReport(sample);
    expect(coverage.totalRecognized).toBe(lines.length);
    expect(
      coverage.published.length +
        coverage.excluded.length +
        coverage.unresolved.length +
        coverage.proseReferences.length +
        coverage.malformedLines.length,
    ).toBe(lines.length);
  });

  it("excludes development-only, duplicate and malformed declarations", () => {
    const coverage = coverageReport(sample);
    const excluded = coverage.excluded.map((entry) => [entry.record.name, entry.classification]);
    expect(excluded).toEqual(
      expect.arrayContaining([
        ["MALFORMED_QUOTE", "malformed"],
        ["ACTIVE_VALUE", "duplicate"],
        ["DEV_ONLY_FLAG", "development-only"],
      ]),
    );
    expect(coverage.published.map((record) => record.name)).not.toContain("DEV_ONLY_FLAG");
  });

  it("throws rather than report a total that does not add up", () => {
    const broken = {
      ...sample,
      records: sample.records.slice(1),
      totalRecognized: sample.totalRecognized,
    };
    expect(() => coverageReport(broken)).toThrow(/coverage does not add up/);
  });

  it("hard-codes no total: the number comes from the file", () => {
    const smaller = parseEnvReference(fixture("collision.envref"));
    expect(coverageReport(smaller).totalRecognized).toBe(1);
  });
});
