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
  pageLinks,
  parseFrontmatter,
  reciprocalReachability,
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

  it("fires when the value lands on the next line of a hard-wrapped sentence", () => {
    const wrapped = "Secrets expire after the window set by SECRET_TTL, which defaults to\n604800 seconds.";
    expect(statedDefaults(wrapped)).toHaveLength(1);
  });

  it("does not read past a blank line into the next block", () => {
    expect(statedDefaults("The window is set by SECRET_TTL.\n\nIt takes 30 days.")).toEqual([]);
  });

  it("does not mistake a numbered list marker on the next line for a value", () => {
    expect(statedDefaults("To change SECRET_TTL:\n1. Open the config.")).toEqual([]);
  });
});

describe("pageLinks", () => {
  it("reads Markdown links as EN docs slugs", () => {
    expect(pageLinks("See [Self-hosting](/en/self-hosting) for the rest.")).toEqual(
      new Set(["self-hosting"]),
    );
  });

  it("drops fragments and query strings, so a deep link still counts as the page", () => {
    expect(pageLinks("[a](/en/security/where-your-data-lives#canada) [b](/en/share?x=1)")).toEqual(
      new Set(["security/where-your-data-lives", "share"]),
    );
  });

  it("collapses the locale root and trailing slashes to the index slug", () => {
    expect(pageLinks("[home](/en/) [also](/en) [dir](/en/billing/)")).toEqual(
      new Set(["index", "billing"]),
    );
  });

  it("reads raw HTML hrefs, which several inherited pages still use", () => {
    expect(pageLinks('<a href="/en/configure/sso">SSO</a>')).toEqual(new Set(["configure/sso"]));
  });

  it("ignores off-site links, other locales and assets", () => {
    const body = [
      "[ext](https://example.com/en/share)",
      "[mail](mailto:a@b.c)",
      "[fr](/fr/share)",
      "[img](/img/docs/a.png)",
      "[proto-relative](//example.com/en/share)",
    ].join("\n");
    expect(pageLinks(body)).toEqual(new Set());
  });

  it("does not resolve relative links, by design", () => {
    // The house style is an absolute /en/… link. A relative one is simply not
    // seen, which costs a named failure in the reciprocal check rather than a
    // silent pass — see the note on pageLinks.
    expect(pageLinks("[sibling](branding)")).toEqual(new Set());
  });
});

describe("reciprocalReachability", () => {
  // A tiny stand-in for the real table: one hosted page answered by two
  // operator pages (the row-four shape), and two hosted pages converging on one
  // operator page (the billing shape). Both are legal and must pass.
  const PAIRS = {
    "custom-domains/homepage-and-incoming": [
      "features/incoming-secrets",
      "features/interface-and-homepage",
    ],
    billing: ["features/billing-and-entitlements"],
    "billing/managing-your-subscription": ["features/billing-and-entitlements"],
  };

  const page = (slug, ...links) => [
    slug,
    { path: `src/content/docs/en/${slug}.md`, links: new Set(links) },
  ];

  const run = (pages, pending = []) =>
    reciprocalReachability({
      pairs: PAIRS,
      pages: new Map(pages),
      pending: new Map(pending),
      allowlist: "config/reciprocal-pending.allow",
    });

  const everythingWritten = [
    page("custom-domains/homepage-and-incoming", "features/incoming-secrets"),
    page("billing", "features/billing-and-entitlements"),
    page("billing/managing-your-subscription", "features/billing-and-entitlements"),
    page("features/incoming-secrets", "custom-domains/homepage-and-incoming"),
    page("features/interface-and-homepage", "custom-domains/homepage-and-incoming"),
    page("features/billing-and-entitlements", "billing"),
  ];

  it("passes when one counterpart is reached in each direction", () => {
    // The hosted page links to only ONE of its two operator pages, and the one
    // operator page links back to only ONE of its two hosted pages. Both are
    // reachability, not pairing, so both pass.
    const { problems, hosted, operator } = run(everythingWritten);
    expect(problems).toEqual([]);
    expect(hosted).toBe(3);
    expect(operator).toBe(3);
  });

  it("fails a hosted page that reaches none of its operator counterparts", () => {
    const broken = everythingWritten.map(([slug, value]) =>
      slug === "custom-domains/homepage-and-incoming" ? page(slug) : [slug, value],
    );
    const { problems } = run(broken);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("src/content/docs/en/custom-domains/homepage-and-incoming.md");
    expect(problems[0]).toContain("no link to any of its operator counterparts");
  });

  it("fails an operator page that never links back", () => {
    const broken = everythingWritten.map(([slug, value]) =>
      slug === "features/billing-and-entitlements" ? page(slug) : [slug, value],
    );
    const { problems } = run(broken);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("src/content/docs/en/features/billing-and-entitlements.md");
    expect(problems[0]).toContain("no link back to any of its hosted counterparts");
    // Names both hosted pages it could satisfy, not one arbitrary choice.
    expect(problems[0]).toContain("/en/billing");
    expect(problems[0]).toContain("/en/billing/managing-your-subscription");
  });

  it("suspends a pair whose operator half is declared pending", () => {
    const { problems, pendingPairs, hosted } = run(
      [
        page("custom-domains/homepage-and-incoming"),
        page("billing"),
        page("billing/managing-your-subscription"),
      ],
      [
        ["features/incoming-secrets", "Phase 3, unwritten"],
        ["features/interface-and-homepage", "Phase 3, unwritten"],
        ["features/billing-and-entitlements", "blocked on the billing catalog"],
      ],
    );
    expect(problems).toEqual([]);
    expect(hosted).toBe(0);
    expect(pendingPairs.sort()).toEqual([
      "billing",
      "billing/managing-your-subscription",
      "custom-domains/homepage-and-incoming",
    ]);
  });

  it("fails when a declared-pending operator page has landed, so the pair wakes up", () => {
    // This is the whole reason the pending list is a file rather than silence:
    // writing the page is what forces the line out, and deleting the line is
    // what switches the reachability assertion on for that pair.
    const { problems } = run(
      [
        page("billing"),
        page("billing/managing-your-subscription"),
        page("features/billing-and-entitlements"),
      ],
      [
        ["features/incoming-secrets", "Phase 3, unwritten"],
        ["features/interface-and-homepage", "Phase 3, unwritten"],
        ["features/billing-and-entitlements", "blocked on the billing catalog"],
      ],
    );
    const stale = problems.filter((p) => p.includes("now exists"));
    expect(stale).toHaveLength(1);
    expect(stale[0]).toContain("config/reciprocal-pending.allow");
    expect(stale[0]).toContain("features/billing-and-entitlements");
  });

  it("fails an operator page that is neither written nor declared", () => {
    const { problems } = run([
      page("custom-domains/homepage-and-incoming"),
      page("billing"),
      page("billing/managing-your-subscription"),
    ]);
    expect(problems).toHaveLength(3);
    for (const problem of problems) {
      expect(problem).toContain("is not declared in config/reciprocal-pending.allow");
    }
  });

  it("fails an allowlist entry for a slug the table does not name", () => {
    const { problems } = run(everythingWritten, [["features/languages", "not in the table"]]);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("is not an operator page in the reciprocal-aside table");
  });

  it("fails a hosted slug in the table with no page behind it", () => {
    const { problems } = run(everythingWritten.filter(([slug]) => slug !== "billing"));
    // billing is gone: the hosted-half failure, plus the operator page that can
    // no longer reach it (it linked only to /en/billing).
    expect(problems.some((p) => p.includes("fix the slug in RECIPROCAL_PAIRS"))).toBe(true);
  });
});

describe("the real EN tree", () => {
  it("has every reciprocal aside pointing at a page that exists", () => {
    // Guards the transcription of audit §4.4 into RECIPROCAL_PAIRS: a hosted
    // slug typed wrong there would otherwise only surface when check:frontmatter
    // is run by hand.
    const slugs = new Set(docsPages("en").map((p) => p.slug));
    for (const hosted of [
      "custom-domains",
      "custom-domains/branding",
      "custom-domains/email-sender",
      "custom-domains/homepage-and-incoming",
      "custom-domains/access-and-privacy",
      "organizations/sso",
      "share",
      "account/change-your-region",
      "security/where-your-data-lives",
      "share/receiving-secrets",
      "organizations/roles-and-permissions",
      "billing",
      "billing/managing-your-subscription",
    ]) {
      expect(slugs.has(hosted), `${hosted} is named by the reciprocal-aside contract`).toBe(true);
    }
  });
});
