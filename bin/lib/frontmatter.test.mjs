// bin/lib/frontmatter.test.mjs
//
// Unit tests for the parsers behind check:frontmatter. The check itself is an
// executable assertion over real repo state; these cover the cases the repo
// does not currently contain, so a future page that DOES contain them is caught
// rather than quietly passing.
//
// slugifyHeading is additionally pinned against the real github-slugger — see
// "matches github-slugger" below. That is the assertion that matters most: the
// anchor contract is only meaningful if this file computes the same ids the
// built page does.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  docsPages,
  headings,
  parseFrontmatter,
  schemaEnums,
  slugifyHeading,
  statedDefaults,
} from "./frontmatter.mjs";

describe("parseFrontmatter", () => {
  it("reads top-level scalars and returns the body", () => {
    const { fields, body, bodyLine } = parseFrontmatter(
      "---\ntitle: A page\ndescription: What it is\n---\n\n## Heading\n",
    );
    expect(fields).toEqual({ title: "A page", description: "What it is" });
    expect(body).toBe("\n## Heading\n");
    expect(bodyLine).toBe(5);
  });

  it("skips nested blocks instead of misreading them as top-level keys", () => {
    const { fields } = parseFrontmatter(
      "---\ntitle: Home\nhero:\n  title: Not the page title\n  actions:\n    - text: Go\n---\nbody\n",
    );
    expect(fields.title).toBe("Home");
    expect(fields.text).toBeUndefined();
  });

  it("strips one layer of quotes", () => {
    const { fields } = parseFrontmatter('---\ntitle: "Simple or Full: choosing"\n---\n');
    expect(fields.title).toBe("Simple or Full: choosing");
  });

  it("treats a file with no frontmatter as having none", () => {
    const { fields, body, bodyLine } = parseFrontmatter("# Just a heading\n");
    expect(fields).toEqual({});
    expect(body).toBe("# Just a heading\n");
    expect(bodyLine).toBe(1);
  });

  it("treats unterminated frontmatter as having none, so the check reports it", () => {
    expect(parseFrontmatter("---\ntitle: Oops\n").fields).toEqual({});
  });
});

/** Path to github-slugger in the pnpm store, or null if it is not installed. */
function resolveGithubSlugger() {
  const store = "node_modules/.pnpm";
  if (!existsSync(store)) return null;
  const dir = readdirSync(store).find((name) => name.startsWith("github-slugger@"));
  if (!dir) return null;
  const entry = join(process.cwd(), store, dir, "node_modules/github-slugger/index.js");
  return existsSync(entry) ? entry : null;
}

describe("slugifyHeading", () => {
  it("lowercases and hyphenates", () => {
    expect(slugifyHeading("European Union")).toBe("european-union");
    expect(slugifyHeading("Data minimization")).toBe("data-minimization");
  });

  it("drops punctuation without leaving a gap", () => {
    expect(slugifyHeading("Homepage & incoming secrets")).toBe("homepage--incoming-secrets");
    expect(slugifyHeading("Aotearoa New Zealand")).toBe("aotearoa-new-zealand");
    expect(slugifyHeading("What's stored?")).toBe("whats-stored");
  });

  // github-slugger is what rehype-slug (and so Starlight) mints heading ids
  // with, but it is a TRANSITIVE dependency — not in package.json, not
  // resolvable by bare specifier under pnpm's strict layout, and free to
  // disappear on an upgrade. Declaring it would break the "these checks take no
  // dependencies" rule for the sake of one assertion, so the test locates it in
  // the store and skips itself when it is not there. Skipped, the
  // reimplementation is still covered by the hand-written cases above; present,
  // it is pinned against the real thing over every heading in the repo.
  const slugger = resolveGithubSlugger();

  it.skipIf(!slugger)("matches github-slugger on every heading in the repo", async () => {
    const { default: GithubSlugger } = await import(slugger);
    const locales = readdirSync("src/content/docs", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    let compared = 0;
    for (const locale of locales) {
      for (const page of docsPages(locale)) {
        const slugger = new GithubSlugger();
        for (const heading of headings(parseFrontmatter(page.source).body)) {
          expect([page.path, heading.slug]).toEqual([page.path, slugger.slug(heading.text)]);
          compared++;
        }
      }
    }
    expect(compared).toBeGreaterThan(1000);
  });
});

describe("headings", () => {
  it("gives repeated headings github-slugger's numbered suffixes", () => {
    expect(headings("## Overview\n## Overview\n## Overview\n").map((h) => h.slug)).toEqual([
      "overview",
      "overview-1",
      "overview-2",
    ]);
  });

  it("ignores # inside a fenced code block", () => {
    const body = "## Real\n\n```sh\n# Set the region\n## not a heading\n```\n\n## Also real\n";
    expect(headings(body).map((h) => h.text)).toEqual(["Real", "Also real"]);
  });

  it("reduces inline markdown to the text a reader sees", () => {
    expect(slugifyHeading(headings("## The `burn` [button](/en/share/)\n")[0].text)).toBe(
      "the-burn-button",
    );
  });

  it("records depth and 1-based line", () => {
    expect(headings("intro\n\n### Deep\n")[0]).toMatchObject({ depth: 3, line: 3 });
  });
});

describe("schemaEnums", () => {
  it("reads the real schema out of src/content.config.ts", () => {
    const enums = schemaEnums();
    expect(enums.plan).toContain("Identity Plus");
    expect(enums.audience).toContain("end-user");
    expect(enums.pageType).toEqual(["concept", "how-to", "reference", "architecture"]);
  });

  it("survives the line break Prettier puts before .enum on a long field", () => {
    const enums = schemaEnums('audience: z\n  .enum(["end-user", "operator"])\n  .optional(),');
    expect(enums.audience).toEqual(["end-user", "operator"]);
  });

  it("ignores the field names mentioned in the header comment", () => {
    const enums = schemaEnums('// plan: z.enum(["Wrong"])\nplan: z.enum(["Free"]),');
    expect(enums.plan).toEqual(["Free"]);
  });

  it("yields nothing for a field that is no longer a plain z.enum, so the caller can fail", () => {
    expect(schemaEnums("plan: z.union([z.string()]).optional(),").plan).toBeUndefined();
  });
});

describe("statedDefaults", () => {
  it("fires on an env var with its value written out", () => {
    expect(statedDefaults("Links expire after SECRET_TTL, which defaults to 604800 seconds.")).toEqual(
      [
        {
          line: 1,
          variable: "SECRET_TTL",
          excerpt: "SECRET_TTL, which defaults to 604800 seconds.",
        },
      ],
    );
    expect(statedDefaults("`MAX_SECRET_SIZE=25000` is the ceiling.")).toHaveLength(1);
  });

  it("does not fire on naming the variable without its value", () => {
    expect(
      statedDefaults("The window is set by SECRET_TTL — see the environment variables reference."),
    ).toEqual([]);
  });

  it("does not fire on the acronyms end-user prose is full of", () => {
    expect(
      statedDefaults("Add the TXT record, then the CNAME. SSO and GDPR are unaffected. 30 days."),
    ).toEqual([]);
  });

  it("does not fire inside a fenced code block", () => {
    expect(statedDefaults("```yaml\nREDIS_URL=redis://localhost:6379/0\n```\n")).toEqual([]);
  });

  it("does not attach a number from a later sentence to an earlier variable", () => {
    const far = `Set AUTHENTICATION_MODE to suit your deployment.${" ".repeat(130)}It takes 30 days.`;
    expect(statedDefaults(far)).toEqual([]);
  });
});
