// bin/lib/llms.test.mjs
//
// Unit tests for the rules behind check:llms. The check itself asserts over
// the real public/llms.txt; these cover the failure cases the file does not
// currently contain, with a fabricated page inventory and change dates.
import { describe, expect, it } from "vitest";

import { auditLlms, daysBetween, enSlug, parseLlms, sitePath } from "./llms.mjs";

const TODAY = "2026-10-30";

const pages = new Map([
  ["index", { path: "src/content/docs/en/index.mdoc", draft: false }],
  ["start/glossary", { path: "src/content/docs/en/start/glossary.md", draft: false }],
  ["pricing", { path: "src/content/docs/en/pricing/index.md", draft: false }],
  ["operate/datastore", { path: "src/content/docs/en/operate/datastore.md", draft: true }],
]);

const changedOn = (dates) => (path) => dates[path] ?? "2026-01-01";

// Stamp followed by prose, as the real file writes it.
const file = (body, stamp = TODAY) =>
  `# Onetime Secret\n\n> Shares secrets through links that work only once.\n\nLast updated: ${stamp}.\n\n## Docs\n\n${body}\n`;

const stamped = (body, stamp = TODAY) =>
  `# Onetime Secret\n\n> Shares secrets through links that work only once.\n\nLast updated: ${stamp}\n\n## Docs\n\n${body}\n`;

const audit = (text, overrides = {}) =>
  auditLlms(text, { pages, changedOn: changedOn({}), today: TODAY, ...overrides });

describe("parseLlms", () => {
  it("reads the title, summary, stamp and links with line numbers", () => {
    const parsed = parseLlms(stamped("- [Glossary](https://docs.onetimesecret.com/en/start/glossary/): terms\n- <https://example.com/x>"));
    expect(parsed.title).toBe("Onetime Secret");
    expect(parsed.summary).toBe("Shares secrets through links that work only once.");
    expect(parsed.stamps).toEqual([{ date: TODAY, line: 5 }]);
    expect(parsed.links).toEqual([
      { href: "https://docs.onetimesecret.com/en/start/glossary/", line: 9 },
      { href: "https://example.com/x", line: 10 },
    ]);
  });

  it("does not collect bare URLs in prose", () => {
    expect(parseLlms("# T\n\n> S\n\nSee https://example.com for more.\n").links).toEqual([]);
  });
});

describe("sitePath and enSlug", () => {
  it("maps absolute and root-relative links into the site, dropping fragments", () => {
    expect(sitePath("https://docs.onetimesecret.com/en/start/glossary/#secret")).toBe("/en/start/glossary/");
    expect(sitePath("/en/pricing/?x=1")).toBe("/en/pricing/");
    expect(sitePath("https://api.onetimesecret.com/llms.txt")).toBeNull();
    expect(sitePath("//evil.example/en/")).toBeNull();
  });

  it("resolves English paths to page slugs and nothing else", () => {
    expect(enSlug("/en/")).toBe("index");
    expect(enSlug("/en/start/glossary/")).toBe("start/glossary");
    expect(enSlug("/en/start/glossary")).toBe("start/glossary");
    expect(enSlug("/de/start/glossary/")).toBeNull();
    expect(enSlug("/llms.txt")).toBeNull();
  });
});

describe("auditLlms", () => {
  it("passes a well-formed file whose links resolve to live English pages", () => {
    const { problems, summary } = audit(
      stamped(
        "- [Home](https://docs.onetimesecret.com/en/): start\n" +
          "- [Glossary](https://docs.onetimesecret.com/en/start/glossary/): terms\n" +
          "- [API](https://api.onetimesecret.com/llms.txt): elsewhere\n" +
          "- [Self](https://docs.onetimesecret.com/llms.txt): this file",
      ),
    );
    expect(problems).toEqual([]);
    expect(summary).toEqual({ links: 2, pages: 2, stamp: TODAY, ageDays: 0 });
  });

  it("requires the H1 and summary blockquote", () => {
    const { problems } = audit(`Intro\n\nLast updated: ${TODAY}\n`);
    expect(problems).toEqual(expect.arrayContaining([expect.stringContaining("H1"), expect.stringContaining("blockquote")]));
  });

  it("requires exactly one valid, non-future stamp", () => {
    expect(audit("# T\n\n> S\n").problems).toEqual([expect.stringContaining("missing `Last updated")]);
    expect(audit(stamped("", "2026-02-30")).problems).toEqual([expect.stringContaining("not a calendar date")]);
    expect(audit(stamped("", "2026-11-01")).problems).toEqual([expect.stringContaining("in the future")]);
    expect(audit(`# T\n\n> S\n\nLast updated: ${TODAY}\n\nLast updated: ${TODAY}\n`).problems).toEqual([
      expect.stringContaining("appears 2 times"),
    ]);
  });

  it("accepts prose after the date on the stamp line", () => {
    expect(audit(file("")).problems).toEqual([]);
    expect(audit(file("", "2026-10-3")).problems).toEqual([expect.stringContaining("missing `Last updated")]);
  });

  it("rejects links to translations, missing pages, drafts and duplicates", () => {
    const { problems } = audit(
      stamped(
        "- [DE](https://docs.onetimesecret.com/de/start/glossary/)\n" +
          "- [Gone](/en/start/removed/)\n" +
          "- [Draft](https://docs.onetimesecret.com/en/operate/datastore/)\n" +
          "- [Pricing](https://docs.onetimesecret.com/en/pricing/)\n" +
          "- [Pricing again](/en/pricing/#plans)",
      ),
    );
    expect(problems).toEqual([
      expect.stringMatching(/line 9: .*not an English page/),
      expect.stringMatching(/line 10: .*no page under src\/content\/docs\/en \(slug "start\/removed"\)/),
      expect.stringMatching(/line 11: .*is a draft \(src\/content\/docs\/en\/operate\/datastore\.md\)/),
      expect.stringMatching(/line 13: .*already linked on line 12/),
    ]);
  });

  it("fails a stamp older than the age limit", () => {
    const { problems, summary } = audit(stamped("", "2026-07-01"));
    expect(summary.ageDays).toBe(daysBetween("2026-07-01", TODAY));
    expect(problems).toEqual([expect.stringContaining("is 121 days old (limit 90)")]);
    expect(audit(stamped("", "2026-07-01"), { maxAgeDays: 200 }).problems).toEqual([]);
  });

  it("fails when a linked page changed after the stamp, naming the page", () => {
    const text = stamped(
      "- [Glossary](https://docs.onetimesecret.com/en/start/glossary/)\n- [Pricing](https://docs.onetimesecret.com/en/pricing/)",
      "2026-10-20",
    );
    const dates = { "src/content/docs/en/pricing/index.md": "2026-10-25" };
    const { problems } = audit(text, { changedOn: changedOn(dates) });
    expect(problems).toEqual([expect.stringContaining("1 linked page(s) changed after `Last updated: 2026-10-20`")]);
    expect(problems[0]).toContain("src/content/docs/en/pricing/index.md (2026-10-25)");

    // Same-day change is fine: the stamp was moved with the edit.
    expect(audit(text, { changedOn: changedOn({ "src/content/docs/en/pricing/index.md": "2026-10-20" }) }).problems).toEqual([]);
    // Unknown history (null) is not drift.
    expect(audit(text, { changedOn: () => null }).problems).toEqual([]);
  });

  it("skips the drift and age rules when the stamp is unusable", () => {
    const { problems } = audit(stamped("- [Pricing](/en/pricing/)", "2026-11-01"), {
      changedOn: () => "2026-12-01",
    });
    expect(problems).toEqual([expect.stringContaining("in the future")]);
  });
});
