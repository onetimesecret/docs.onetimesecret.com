// bin/reference/render-env.test.mjs
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

import { parseEnvReference } from "./env-parser.mjs";
import { repoRoot } from "./manifest.mjs";
import { anchorFor, envId } from "./ids.mjs";
import {
  buildEnvironmentData,
  DATA_PATH,
  inlineCode,
  renderCoverageReport,
} from "./render-env.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = (name) => readFileSync(join(here, "fixtures", name), "utf8");

const manifest = {
  extractorFormatVersion: 1,
  upstream: {
    repository: "https://github.com/onetimesecret/onetimesecret",
    release: "v9.9.9",
    commit: "0123456789abcdef0123456789abcdef01234567",
  },
  refreshOwner: "someone",
  backupReviewer: "someone-else",
  files: [{ path: ".env.reference", role: "env-reference", sha256: "x".repeat(64), lines: 80 }],
};

const parsed = parseEnvReference(fixture("sample.envref"), { sourceName: ".env.reference" });
const built = buildEnvironmentData({ parsed, manifest });
const { data, coverage, sections, anchors } = built;
const records = data.sections.flatMap((section) => section.records);
const record = (name) => records.find((entry) => entry.name === name);

describe("inlineCode", () => {
  it("escapes a pipe so a value cannot split a table row", () => {
    expect(inlineCode("keep|me")).toBe("`keep\\|me`");
  });

  it("picks a backtick run longer than any in the value", () => {
    expect(inlineCode("`rm -rf /`")).toBe("`` `rm -rf /` ``");
    expect(inlineCode("a ``b`` c")).toBe("```a ``b`` c```");
  });

  it("leaves an ordinary value alone", () => {
    expect(inlineCode("production")).toBe("`production`");
  });

  it("preserves literal values and table columns through Astro's processor", async () => {
    const astroRequire = createRequire(
      createRequire(import.meta.url).resolve("astro/package.json"),
    );
    const { createSatteriMarkdownProcessor } = await import(
      pathToFileURL(astroRequire.resolve("@astrojs/markdown-satteri")).href
    );
    const processor = await createSatteriMarkdownProcessor({ syntaxHighlight: false });
    for (const value of [
      "path\\to\\file",
      "trailing\\",
      "plain|pipe",
      "one\\|pipe",
      "two\\\\|pipe",
      "three\\\\\\|pipe",
      "`edge`",
      "html<&>\\|<img src=x>",
      "literal&amp;\\|entity",
    ]) {
      const { code } = await processor.render(
        `| Value | Sentinel |\n| --- | --- |\n| ${inlineCode(value)} | unchanged |\n`,
      );
      const dom = new JSDOM(code);
      try {
        const cells = dom.window.document.querySelectorAll("tbody tr td");
        expect(cells, value).toHaveLength(2);
        expect(cells[0].querySelector("code")?.textContent, value).toBe(value);
        expect(cells[1].textContent).toBe("unchanged");
        expect(dom.window.document.querySelector("img")).toBeNull();
      } finally {
        dom.window.close();
      }
    }
  });
});

describe("environment data contract", () => {
  it("returns data and the coverage and anchor bookkeeping, not a page", () => {
    expect(Object.keys(built).sort()).toEqual(["anchors", "coverage", "data", "sections"]);
    expect(Object.keys(data).sort()).toEqual(["header", "sections", "source", "upstream"]);
    expect(DATA_PATH).toBe("src/data/reference/environment-variables.json");
    expect(JSON.parse(JSON.stringify(data))).toEqual(data);
  });

  it("preserves the full upstream metadata and the source path and line count", () => {
    expect(data.upstream).toEqual(manifest.upstream);
    expect(data.source).toEqual({ path: ".env.reference", lines: 80 });
  });

  it("publishes sections and records in source order with no presentation fields", () => {
    expect(data.sections.map((section) => section.heading)).toEqual(["Sample Section"]);
    for (const [index, section] of data.sections.entries()) {
      expect(Object.keys(section).sort()).toEqual(["anchor", "heading", "prose", "records"]);
      expect(section.anchor).toBe(anchorFor(section.heading));
      expect(section.records.map((entry) => entry.name)).toEqual(
        sections[index].published.map((entry) => entry.name),
      );
    }
    expect(records).toHaveLength(16);
    expect(records.map((entry) => entry.lineStart)).toEqual(
      records.map((entry) => entry.lineStart).sort((a, b) => a - b),
    );
  });

  it("preserves every original published record field and adds only derived fields", () => {
    const original = parseEnvReference(fixture("sample.envref"));
    for (const entry of records) {
      const source = original.records.find((candidate) => candidate.lineStart === entry.lineStart);
      const { anchor, sourceSpan, example, ...published } = entry;
      expect(published).toEqual({ ...source, id: envId(source.name) });
      expect(anchor).toBe(anchorFor(source.name));
      const start = Math.min(source.proseStart, source.lineStart);
      expect(sourceSpan).toBe(start === source.lineEnd ? `${start}` : `${start}-${source.lineEnd}`);
      expect(example).toBe(
        `${source.active ? "" : "#"}${source.name}=${source.exampleValue.replace(/\n/g, " ")}`,
      );
    }
  });

  it("excludes development-only, duplicate and malformed declarations", () => {
    expect(data.sections.map((section) => section.heading)).not.toContain("Development Only");
    expect(record("DEV_ONLY_FLAG")).toBeUndefined();
    expect(record("MALFORMED_QUOTE")).toBeUndefined();
    expect(records.filter((entry) => entry.name === "ACTIVE_VALUE")).toHaveLength(1);
    expect(records.map((entry) => entry.name)).toEqual(
      coverage.published.map((entry) => entry.name),
    );
  });

  it("gives every variable a unique id and a separate underscore-preserving anchor", () => {
    expect(record("ACTIVE_VALUE")).toMatchObject({
      id: "env-active-value",
      anchor: "active_value",
    });
    expect(new Set(records.map((entry) => entry.id)).size).toBe(records.length);
    expect(new Set(records.map((entry) => entry.anchor)).size).toBe(records.length);
    expect(anchors.size).toBe(records.length + data.sections.length);
    for (const entry of records) expect(anchors.get(entry.anchor).name).toBe(entry.name);
  });

  it("rejects a record anchor that collides with a section", () => {
    const collision = parseEnvReference(fixture("sample.envref"));
    collision.sections[0].heading = "ACTIVE_VALUE";
    expect(() => buildEnvironmentData({ parsed: collision, manifest })).toThrow(/anchor collision/);
  });

  it("keeps a prose-only section but drops an empty section", () => {
    const banner = (name) => `# ═══════════════\n#  ${name}\n# ═══════════════\n`;
    const proseOnly = parseEnvReference(
      `${banner("EXPERIMENTAL FEATURES")}# Not yet available.\n\n${banner("EMPTY SECTION")}`,
    );
    expect(buildEnvironmentData({ parsed: proseOnly, manifest }).data.sections).toEqual([
      {
        heading: "Experimental Features",
        anchor: "experimental-features",
        prose: ["Not yet available."],
        records: [],
      },
    ]);
  });

  it("retains section publication counts for the coverage report", () => {
    expect(sections[0].published).toHaveLength(records.length);
    const report = renderCoverageReport({ parsed, manifest, coverage, sections });
    expect(report).toContain("| Published | 16 |");
    expect(report).toContain("| Sample Section | 16 | `#sample-section` |");
  });
});

describe("source text is verbatim", () => {
  it("keeps Markdown, HTML and fences as plain source strings without escaping", () => {
    expect(record("MARKDOWN_HOSTILE").prose).toEqual([
      "Prose that would be Markdown if it were not fenced: *starred*, _under_,",
      "[derived] reads as a link reference, a pipe | mid-sentence, <b>html</b>,",
      "an & ampersand, and a fence ``` inside the comment.",
    ]);
    expect(record("MARKDOWN_HOSTILE").example).toBe("#MARKDOWN_HOSTILE=keep|me");
  });

  it("copies the header legend, removing the filename and trimming blank edges only", () => {
    expect(data.header).toEqual([
      "Fixture - Full Environment Variable Reference",
      "",
      "This file documents every supported environment variable.",
      "",
      "Variables marked:",
      "  * [derived] are generated by `rake ots:init` via HKDF from SECRET.",
      "",
      "A trailing `# Since vX.Y.Z` records the release a variable first shipped in;",
      "`# Since unreleased` means it ships in the next one.",
    ]);
  });

  it("keeps section prose separate from variable prose", () => {
    expect(data.sections[0].prose).toEqual([
      "Section prose: belongs to the section, not to the first variable.",
    ]);
    expect(record("ACTIVE_EMPTY").prose).toEqual([
      "Active assignment, empty value. Unset and empty are different things and",
      "this is the empty one.",
    ]);
    expect(record("DETACHED_PROSE").prose).toEqual([]);
  });
});

describe("record values", () => {
  it("keeps active, commented and empty example lines without Since annotations", () => {
    expect(record("ACTIVE_VALUE").example).toBe("ACTIVE_VALUE=production");
    expect(record("COMMENTED_TTL").example).toBe("#COMMENTED_TTL=3600");
    expect(record("ACTIVE_EMPTY").example).toBe("ACTIVE_EMPTY=");
  });

  it("keeps quoted hashes, embedded equals signs and shell-like values inert", () => {
    expect(record("QUOTED_HASH").example).toBe("#QUOTED_HASH='#3B82F6'");
    expect(record("URL_WITH_EQUALS").example).toBe(
      "#URL_WITH_EQUALS='redis://host:6379/0?timeout=5&other=1'",
    );
    expect(record("SHELL_LOOKALIKE").example).toBe("#SHELL_LOOKALIKE=$(rm -rf /)");
    expect(record("BACKTICK_LOOKALIKE").example).toBe("#BACKTICK_LOOKALIKE=`rm -rf /`");
    expect(record("BRACE_LOOKALIKE").example).toBe("#BRACE_LOOKALIKE=${HOME}/nope");
  });

  it("flattens multiline examples without changing exampleValue or raw source", () => {
    const entry = record("MULTILINE_VALUE");
    expect(entry.example).toBe(`MULTILINE_VALUE=${entry.exampleValue.replace(/\n/g, " ")}`);
    expect(entry.example).not.toContain("\n");
    expect(entry.exampleValue).toContain("\nsecond");
    expect(entry.raw).toContain("\nsecond");
  });

  it("keeps missing defaults null instead of promoting the example", () => {
    expect(record("ACTIVE_VALUE").declaredDefault).toBeNull();
    expect(record("AMBIGUOUS_DEFAULT").declaredDefault).toBeNull();
    expect(record("COMMENTED_TTL").declaredDefault.value).toBe("3600 (1 hour).");
  });

  it("keeps release annotations and tags structured, including missing values", () => {
    expect(record("QUOTED_HASH").since).toBeNull();
    expect(record("QUOTED_HASH").tags).toEqual([]);
    expect(record("ACTIVE_VALUE").since).toBe("v0.26.0");
    expect(record("TAGGED_KEY")).toMatchObject({ since: "unreleased", tags: ["derived"] });
  });

  it("cites prose through the last assignment line, or a single unattached line", () => {
    expect(record("ACTIVE_VALUE").sourceSpan).toBe("22-23");
    expect(record("MULTILINE_VALUE").sourceSpan).toBe("59-61");
    expect(record("DETACHED_PROSE").sourceSpan).toBe("66");
  });
});

// The 25 section fragments self-hosting/environment-variables published, in
// source order, as of the last revision before it retired
// (bd7c212538b21c0bfb4d9305398476b060ed399e). Pinned here rather than read off
// the page: the page is gone, and the point of the check is that the published
// URLs it left behind keep resolving. Recover it with
// `git show bd7c2125:src/content/docs/en/self-hosting/environment-variables.md`.
const LEGACY_SECTION_FRAGMENTS = [
  "secrets--cryptography",
  "connections",
  "site-identity--core",
  "secret-ttl-configuration",
  "secret-options",
  "email",
  "authentication",
  "organizations",
  "custom-mail-sender-dns-settings",
  "sso--omniauth",
  "stripe-billing",
  "custom-domains",
  "feature-flags",
  "api-access",
  "incoming-secrets",
  "reverse-proxy--client-ip",
  "middleware",
  "ui--homepage",
  "branding--private-label",
  "logging--diagnostics",
  "job-system",
  "server--worker-tuning",
  "compatibility",
  "experimental-features",
  "development-only",
];

describe("the tracked data", () => {
  const tracked = JSON.parse(readFileSync(join(repoRoot, DATA_PATH), "utf8"));

  it("keeps every section fragment the legacy page published, except development-only", () => {
    const now = new Set(tracked.sections.map((section) => section.anchor));
    const missing = LEGACY_SECTION_FRAGMENTS.filter((slug) => !now.has(slug));
    // The one intentional loss: plan section 2 excludes unsupported variables
    // from the supported reference, so there is no Development Only section to
    // land on. Recorded here so adding a second loss fails.
    expect(missing).toEqual(["development-only"]);
  });

  it("has no suffixed or duplicate section or record anchors", () => {
    const fragments = tracked.sections.flatMap((section) => [
      section.anchor,
      ...section.records.map((entry) => entry.anchor),
    ]);
    expect(fragments.filter((anchor) => /-\d+$/.test(anchor))).toEqual([]);
    expect(new Set(fragments).size).toBe(fragments.length);
  });
});
