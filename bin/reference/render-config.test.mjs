// bin/reference/render-config.test.mjs
//
// Fixture-level tests for the generated configuration pages. The
// pipeline-level reproducibility and drift tests live in cli.test.mjs and now
// cover these artifacts too, because they compare every entry build() returns.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { headings, parseFrontmatter } from "../lib/frontmatter.mjs";
import { anchorFor } from "./ids.mjs";
import { repoRoot } from "./manifest.mjs";
import {
  BILLING_STRUCTURAL_PATHS,
  CONFIG_PAGES,
  CONFIG_ROLES,
  PROSE_TEMPLATES,
  RENDERER_STRINGS,
  blockedKeys,
  commentLines,
  environmentCell,
  fill,
  groupHeading,
  pagePathFor,
  renderConfigurationPages,
  shapeOf,
  topLevelPathOf,
  unsetCell,
  valueCell,
} from "./render-config.mjs";

const here = dirname(fileURLToPath(import.meta.url));

const manifest = {
  extractorFormatVersion: 1,
  upstream: {
    repository: "https://github.com/onetimesecret/onetimesecret",
    release: "v9.9.9",
    commit: "0123456789abcdef0123456789abcdef01234567",
  },
  refreshOwner: "someone",
  backupReviewer: "someone-else",
  files: [],
};

const CONFIG_FIXTURE = `---
site:
  # Where the site answers.
  host: <%= ENV['HOST'] || 'localhost:3000' %>
  ssl: <%= ENV['SSL'] == 'true' %>
  secret: <%= ENV['SECRET'] %>
  # A value a pipe could split.
  pattern: 'a|b'  # Since v0.26.0
  nested:
    depth: 2
  <% if ENV['FEEDBACK'] != 'false' %>
  extra: <%= ENV['FEEDBACK_URL'] || '/feedback' %>
  <% end %>
features:
  homepage: <%= ENV['HOMEPAGE_ENABLED'] != 'false' %>
redis:
  uri: <%= ENV['A'] || ENV['B'] || (ENV['C'] == '1' ? 'x' : 'y') %>
emailer:
  mode: smtp
internationalization:
  enabled: false
`;

const AUTH_FIXTURE = `---
mode: simple
full:
  features:
    verify: <%= ENV['VERIFY'] != 'false' %>
`;

const LOGGING_FIXTURE = `---
default_level: info
loggers:
  app:
    level: <%= ENV['LOG_LEVEL'] || 'info' %>
`;

const BILLING_FIXTURE = `---
schema_version: "1.0"
enabled: <%= ENV['BILLING_ENABLED'] != 'false' %>
currency: <%= ENV['BILLING_CURRENCY'] || 'cad' %>
entitlements:
  create_secrets:
    category: core
    description: Can create basic secrets
plans:
  free_v1:
    name: "Free"
    tier: free
stripe_metadata_schema:
  required:
    - app: "onetimesecret"
`;

function inputsFor(overrides = {}) {
  const texts = {
    "config-defaults": CONFIG_FIXTURE,
    "auth-defaults": AUTH_FIXTURE,
    "logging-defaults": LOGGING_FIXTURE,
    "billing-example": BILLING_FIXTURE,
    ...overrides,
  };
  const paths = {
    "config-defaults": "etc/defaults/config.defaults.yaml",
    "auth-defaults": "etc/defaults/auth.defaults.yaml",
    "logging-defaults": "etc/defaults/logging.defaults.yaml",
    "billing-example": "etc/examples/billing.example.yaml",
  };
  return new Map(
    CONFIG_ROLES.map((role) => [role, { role, path: paths[role], text: texts[role] }]),
  );
}

const rendered = renderConfigurationPages({ inputs: inputsFor(), manifest });
const pages = new Map(rendered.artifacts.map((artifact) => [artifact.path, artifact.content]));
const pageFor = (owner) => pages.get(pagePathFor(owner));

describe("page set", () => {
  it("renders one page per owner plus the coverage report", () => {
    expect(rendered.artifacts.map((artifact) => artifact.path)).toEqual([
      ...CONFIG_PAGES.map((page) => pagePathFor(page.owner)),
      "docs/reference/coverage-configuration.md",
    ]);
  });

  it("is byte-identical when rendered again from the same inputs", () => {
    const again = renderConfigurationPages({ inputs: inputsFor(), manifest });
    expect(again.artifacts).toEqual(rendered.artifacts);
  });

  it("names the release and short SHA exactly as the environment page does", () => {
    for (const page of CONFIG_PAGES) {
      expect(pageFor(page.owner)).toContain(
        "This reference reflects Onetime Secret v9.9.9 (`01234567`).",
      );
    }
  });

  it("gives every page the four required frontmatter fields and a cited source", () => {
    for (const page of CONFIG_PAGES) {
      const { fields } = parseFrontmatter(pageFor(page.owner));
      expect(fields.audience).toBe("operator");
      expect(fields.pageType).toBe("reference");
      expect(fields.title).toBe(RENDERER_STRINGS.frontmatter[page.owner].title);
      expect(fields.sourceOfTruth).toMatch(/^onetimesecret\/etc\/.+:1-\d+/);
      expect(fields.sourceOfTruth).toContain("vendored at v9.9.9");
    }
  });

  it("starts body content at `##`", () => {
    for (const page of CONFIG_PAGES) {
      const { body } = parseFrontmatter(pageFor(page.owner));
      expect(body).not.toMatch(/^# /m);
    }
  });
});

describe("key records", () => {
  const site = pageFor("site-and-interface");

  it("heads each record with the file-qualified key path", () => {
    expect(site).toContain("### config: site.host");
    expect(site).toContain("### config: site.nested.depth");
  });

  it("groups records under their top-level configuration path", () => {
    expect(site).toContain("## config file: site");
    expect(site).toContain("## config file: internationalization");
  });

  it("groups keys with no nesting together rather than one section each", () => {
    expect(topLevelPathOf("mode")).toBe("top-level keys");
    expect(topLevelPathOf("site.host")).toBe("site");
    expect(pageFor("auth-logging-and-billing-files")).toContain("## auth file: top-level keys");
  });

  it("shows the ERB-derived default, the environment reads, the unset behaviour and the source", () => {
    expect(site).toMatch(
      /\| string \| `localhost:3000` \| `HOST` \| the value above \| not annotated \| `etc\/defaults\/config\.defaults\.yaml:4` \|/,
    );
  });

  it("carries the source comment verbatim in a fence", () => {
    expect(site).toContain("```\nWhere the site answers.\n```");
  });

  it("escapes a pipe so a value cannot split a table row", () => {
    expect(site).toContain("`a\\|b`");
  });

  it("reads the Since annotation out of the trailing comment and omits it from the fence", () => {
    const record = site.slice(site.indexOf("### config: site.pattern"));
    expect(record).toContain("A value a pipe could split.");
    expect(record).not.toContain("Since v0.26.0\n```");
    expect(record).toMatch(/\| v0\.26\.0 \|/);
  });

  it("never promotes a missing value to a default", () => {
    const record = site.slice(site.indexOf("### config: site.secret"));
    expect(record).toContain(`| string | ${RENDERER_STRINGS.cellNoValue} | \`SECRET\` |`);
  });
});

describe("runtime-defined and conditional values", () => {
  it("says the value is determined at run time and shows the expression", () => {
    const page = pageFor("datastore-and-queues");
    expect(page).toContain(`| runtime-defined | ${RENDERER_STRINGS.cellRuntimeDefined} |`);
    expect(page).toContain("```ruby");
    expect(page).toContain("ENV['A'] || ENV['B']");
  });

  it("names the conditional keys and states no unconditional default", () => {
    const page = pageFor("site-and-interface");
    expect(page).toContain("### config: site (conditional)");
    expect(page).toContain(
      fill(RENDERER_STRINGS.conditionalBlock, { keys: "`extra`", subject: "`site`" }),
    );
    expect(page).toContain("```erb");
  });

  it("reads the keys a blocked block sets out of its raw text", () => {
    expect(
      blockedKeys({ raw: "<% if x %>\n- text: Feedback\n  url: <%= y %>\n<% end %>" }),
    ).toEqual(["text", "url"]);
  });
});

describe("the billing example", () => {
  const page = pageFor("auth-logging-and-billing-files");

  it("publishes the file's configuration-contract keys as records", () => {
    expect(page).toContain("### billing: schema_version");
    expect(page).toContain("### billing: currency");
  });

  it("renders the catalog sections as structure only, with no value from them", () => {
    for (const section of BILLING_STRUCTURAL_PATHS) {
      expect(page).toContain(`## ${groupHeading("billing", section)}`);
      expect(page).toContain(fill(RENDERER_STRINGS.structuralOnly, { section }));
    }
    expect(page).not.toContain("### billing: plans.free_v1.name");
    expect(page).not.toContain('`Free`');
    expect(page).not.toContain("`free`");
  });

  it("lists the entry field names and the entry count", () => {
    expect(page).toMatch(/\| 1 \| `name`, `tier` \| `etc\/examples\/billing\.example\.yaml:\d+-\d+` \|/);
  });
});

describe("anchors", () => {
  it("mints a unique anchor for every heading on every page", () => {
    for (const page of CONFIG_PAGES) {
      const slugs = headings(pageFor(page.owner)).map((heading) => heading.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("predicts the same anchor the built page will have", () => {
    const found = headings(pageFor("site-and-interface")).find(
      (heading) => heading.text === "config: site.host",
    );
    expect(found.slug).toBe(anchorFor("config: site.host"));
  });

  it("fails loudly when two headings would claim one anchor", () => {
    // `a.b` and `a-b` both slug to `config-ab`, so the same page cannot carry
    // both. A suffixed anchor would silently retarget a deep link.
    const collide = `---
collide:
  a:
    b: 1
  ab: 2
`;
    expect(() =>
      renderConfigurationPages({
        inputs: inputsFor({ "config-defaults": collide }),
        manifest,
      }),
    ).toThrow(/anchor collision on "#config-collideab"/);
  });
});

describe("unassigned keys", () => {
  it("refuses to generate when a key has no owning page", () => {
    // The auth file's catch-all rule is keyed on the short name, so a file the
    // ownership rules do not know about produces unassigned keys.
    const inputs = inputsFor();
    inputs.set("auth-defaults", {
      role: "auth-defaults",
      path: "etc/defaults/unknown.yaml",
      text: AUTH_FIXTURE,
    });
    expect(() => renderConfigurationPages({ inputs, manifest })).toThrow(
      /have no owning page/,
    );
  });
});

describe("renderer-introduced prose", () => {
  const patterns = PROSE_TEMPLATES.map(
    (template) =>
      new RegExp(
        `^${template
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          .replace(/<[a-zA-Z]+>/g, "[\\s\\S]+?")}$`,
      ),
  );

  it("introduces no prose paragraph outside RENDERER_STRINGS", () => {
    for (const page of CONFIG_PAGES) {
      const { body } = parseFrontmatter(pageFor(page.owner));
      let inFence = false;
      for (const line of body.split("\n")) {
        if (/^`{3,}/.test(line)) {
          inFence = !inFence;
          continue;
        }
        if (inFence) continue;
        if (line.trim() === "") continue;
        if (line.startsWith("#")) continue;
        if (line.startsWith("|")) continue;
        expect(
          patterns.some((pattern) => pattern.test(line)),
          `unaccounted prose on reference/${page.owner}: ${line}`,
        ).toBe(true);
      }
    }
  });
});

describe("cell helpers", () => {
  it("distinguishes an empty string from no value", () => {
    expect(valueCell({ erb: { kind: "env-fallback", staticFallback: "" } })).toBe('`""`');
    expect(valueCell({ erb: { kind: "env-read", staticFallback: null } })).toBe(
      RENDERER_STRINGS.cellNoValue,
    );
    expect(valueCell({ literalValue: null })).toBe("`null`");
    expect(valueCell({ literalValue: {} })).toBe("`{}`");
  });

  it("reports a literal as the shipped default rather than as an environment read", () => {
    expect(unsetCell({ literalValue: "smtp" })).toBe(RENDERER_STRINGS.cellShippedValue);
    expect(environmentCell({ literalValue: "smtp" })).toBe(RENDERER_STRINGS.cellNoEnvironment);
  });

  it("derives the shape from the cast chain", () => {
    expect(shapeOf({ erb: { kind: "cast", cast: ["to_i"] } })).toBe("integer");
    expect(shapeOf({ erb: { kind: "cast", cast: ["split"] } })).toBe("list");
    expect(shapeOf({ erb: { kind: "boolean" } })).toBe("boolean");
    expect(shapeOf({ literalValue: 3 })).toBe("integer");
    expect(shapeOf({ literalValue: [] })).toBe("empty sequence");
  });

  it("drops the comment marker and a Since-only trailing comment", () => {
    expect(
      commentLines({ comment: "# one\n#  two", trailingComment: "# Since v1.2.3" }),
    ).toEqual(["one", " two"]);
  });

  it("de-duplicates ordered environment alternatives in order", () => {
    expect(environmentCell({ erb: { envReads: ["A", "B", "A"] } })).toBe("`A`, `B`");
  });
});

describe("the tracked pages", () => {
  it("are the ones the renderer owns", () => {
    for (const page of CONFIG_PAGES) {
      expect(() => readFileSync(join(repoRoot, pagePathFor(page.owner)), "utf8")).not.toThrow();
    }
    expect(here).toContain("bin");
  });
});
