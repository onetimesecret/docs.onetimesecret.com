// bin/lib/nav.test.mjs
//
// Unit tests for the pure helpers behind the check:* drift checks. The checks
// themselves are executable assertions over real repo state; these cover the
// parsing edge cases that would otherwise regress silently.
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { enLinkSlugs, fileSlug, normalizeLink, parseAllowlist, repoRoot, unresolvedSidebarKeys } from "./nav.mjs";

describe("normalizeLink", () => {
  it("maps the site root to the index slug", () => {
    expect(normalizeLink("/")).toBe("index");
    expect(normalizeLink("")).toBe("index");
    expect(normalizeLink("///")).toBe("index");
  });

  it("strips leading and trailing slashes", () => {
    expect(normalizeLink("/foo")).toBe("foo");
    expect(normalizeLink("foo/")).toBe("foo");
    expect(normalizeLink("/a/b/")).toBe("a/b");
  });

  it("leaves an already-normalized slug alone", () => {
    expect(normalizeLink("a/b")).toBe("a/b");
  });
});

describe("parseAllowlist", () => {
  const fixture = (contents) => {
    const path = join(mkdtempSync(join(tmpdir(), "nav-allow-")), "test.allow");
    writeFileSync(path, contents);
    return path;
  };

  it("returns entries with their reasons", () => {
    const { entries, problems } = parseAllowlist(
      fixture("alpha # linked from the homepage hero\nbeta  #   redirect target\n"),
    );
    expect(problems).toEqual([]);
    expect(entries).toEqual([
      { value: "alpha", reason: "linked from the homepage hero" },
      { value: "beta", reason: "redirect target" },
    ]);
  });

  it("skips blank lines and whole-line comments", () => {
    const { entries, problems } = parseAllowlist(
      fixture("# header comment\n\n   \nalpha # a reason\n"),
    );
    expect(problems).toEqual([]);
    expect(entries.map((e) => e.value)).toEqual(["alpha"]);
  });

  it("reports entries with no reason, with a 1-based line number", () => {
    const path = fixture("alpha # a reason\nbeta\ngamma #\n");
    const { entries, problems } = parseAllowlist(path);
    expect(entries.map((e) => e.value)).toEqual(["alpha"]);
    expect(problems).toEqual([
      `${path}:2: entry needs a trailing "# reason" comment: "beta"`,
      `${path}:3: entry needs a trailing "# reason" comment: "gamma #"`,
    ]);
  });

  it("treats a missing allowlist as empty", () => {
    const { entries, problems } = parseAllowlist("config/does-not-exist.allow");
    expect(entries).toEqual([]);
    expect(problems).toEqual([]);
  });

  it("resolves repo-relative paths against the repo root, not the cwd", () => {
    const absolute = parseAllowlist(join(repoRoot, "config/nav-orphans.allow"));
    const cwd = process.cwd();
    try {
      process.chdir(tmpdir());
      const relative = parseAllowlist("config/nav-orphans.allow");
      expect(relative.entries).toEqual(absolute.entries);
    } finally {
      process.chdir(cwd);
    }
  });
});

describe("fileSlug", () => {
  const DOC_EXT = /\.(md|mdx|mdoc|markdown)$/;

  it("keeps the root index page at the index slug", () => {
    expect(fileSlug("index.mdoc", DOC_EXT)).toBe("index");
    expect(fileSlug("index.md", DOC_EXT)).toBe("index");
    expect(fileSlug("index.astro", /\.astro$/)).toBe("index");
  });

  it("collapses a nested index file to its directory", () => {
    expect(fileSlug("regions/index.mdoc", DOC_EXT)).toBe("regions");
    expect(fileSlug("a/b/index.mdx", DOC_EXT)).toBe("a/b");
  });

  it("normalises Windows separators before collapsing", () => {
    // path.relative() yields backslashes on Windows; a slug always uses "/".
    expect(fileSlug("regions\\index.mdoc", DOC_EXT)).toBe("regions");
    expect(fileSlug("a\\b\\page.md", DOC_EXT)).toBe("a/b/page");
  });

  it("strips the extension from a non-index page", () => {
    expect(fileSlug("pricing.md", DOC_EXT)).toBe("pricing");
    expect(fileSlug("a/b/index-of-things.markdown", DOC_EXT)).toBe("a/b/index-of-things");
  });
});

describe("enLinkSlugs", () => {
  it("collects absolute /en/ links as normalized slugs, in order", () => {
    const md = [
      "| [v0.26.18](/en/self-hosting/upgrading-v0-26-18) | migration |",
      "| [v0.26.17](/en/self-hosting/upgrading-v0-26-17/) | backfill |",
      "See [the index](/en/self-hosting/) too.",
    ].join("\n");
    expect([...enLinkSlugs(md)]).toEqual([
      "self-hosting/upgrading-v0-26-18",
      "self-hosting/upgrading-v0-26-17",
      "self-hosting",
    ]);
  });

  it("drops fragments, queries, and link titles", () => {
    const md = '[a](/en/security/our-principles/#privacy-first) [b](/en/pricing?x=1) [c](/en/api/ "REST API")';
    expect([...enLinkSlugs(md)]).toEqual(["security/our-principles", "pricing", "api"]);
  });

  it("ignores relative, external, other-locale, and image links", () => {
    const md = [
      "[rel](./upgrading-v0-26-18) [up](../install/docker/) [bare](upgrading-v0-24)",
      "[ext](https://onetimesecret.com/en/pricing/) [de](/de/self-hosting/)",
      "![img](/images/en/diagram.png) [root](/en/)",
    ].join("\n");
    expect([...enLinkSlugs(md)]).toEqual(["index"]);
  });

  it("deduplicates repeated targets", () => {
    expect([...enLinkSlugs("[a](/en/x/) [b](/en/x)")]).toEqual(["x"]);
  });

  it("ignores links inside HTML comments", () => {
    const md = [
      "<!-- [one](/en/hidden-one) -->",
      "<!--",
      "| [two](/en/hidden-two) |",
      "-->",
      "[kept](/en/kept)",
      "<!-- [unclosed](/en/hidden-three)",
    ].join("\n");
    expect([...enLinkSlugs(md)]).toEqual(["kept"]);
  });

  it("ignores links inside fenced code blocks", () => {
    const md = [
      "```markdown",
      "[a](/en/hidden-a)",
      "```",
      "[kept](/en/kept)",
      "~~~~",
      "```",
      "[b](/en/hidden-b)",
      "~~~~",
      "````",
      "[c](/en/hidden-c)",
    ].join("\n");
    expect([...enLinkSlugs(md)]).toEqual(["kept"]);
  });

  it("closes a fence only on a long-enough run of its character, alone on its line", () => {
    const shorter = "````\n```\n[a](/en/hidden-a)\n````\n[kept](/en/kept)";
    const longer = "```\n[a](/en/hidden-a)\n`````\n[kept](/en/kept)";
    const trailing = "```\n``` not a closer\n[a](/en/hidden-a)\n```\n[kept](/en/kept)";
    for (const md of [shorter, longer, trailing]) {
      expect([...enLinkSlugs(md)]).toEqual(["kept"]);
    }
  });

  it("opens and closes a fence only at the start of a line", () => {
    for (const fence of ["```", "~~~"]) {
      const closer = `${fence}\nsee ${fence}\n[a](/en/hidden-a)\n${fence}\n[kept](/en/kept)`;
      const opener = `A stray ${fence}\n[kept](/en/kept)`;
      for (const md of [closer, opener]) {
        expect([...enLinkSlugs(md)]).toEqual(["kept"]);
      }
    }
  });

  it("treats backticks in a fence's info string as a code span", () => {
    const md = "```js``` then [kept](/en/kept)\nand [also](/en/also)";
    expect([...enLinkSlugs(md)]).toEqual(["kept", "also"]);
  });

  it("ignores links inside inline code", () => {
    const md = "Write `[a](/en/hidden-a)` or ``[b](/en/hidden-b)`` to link; [kept](/en/kept).";
    expect([...enLinkSlugs(md)]).toEqual(["kept"]);
  });

  it("reads code spans left to right, across lines but not paragraphs", () => {
    const cases = [
      "Type `<!--` to start a comment.\n\n[kept](/en/kept)",
      "Set `FOO\nBAR` and [kept](/en/kept) and `x`.",
      "A stray `` run, [kept](/en/kept) and `x`.",
      "An escaped \\` mark, [kept](/en/kept) and `x`.",
      "An open `span\n\n[kept](/en/kept) and `x`.",
    ];
    for (const md of cases) {
      expect([...enLinkSlugs(md)]).toEqual(["kept"]);
    }
  });

  it("ignores images but keeps the link around a linked image", () => {
    const md = "![diagram](/en/hidden.png) [![badge](/badge.svg)](/en/kept)";
    expect([...enLinkSlugs(md)]).toEqual(["kept"]);
  });
});


describe("unresolvedSidebarKeys", () => {
  it("accepts readable labels, including surrounding whitespace", () => {
    expect(unresolvedSidebarKeys(["valid", "padded"], { valid: "Install", padded: " SSO " })).toEqual([]);
  });

  it("distinguishes missing keys from blank or non-string labels", () => {
    expect(unresolvedSidebarKeys(
      ["missing", "empty", "space", "null", "false", "number", "object", "array"],
      { empty: "", space: " \t\n", null: null, false: false, number: 42, object: {}, array: [] },
    )).toEqual([
      { key: "array", kind: "empty" },
      { key: "empty", kind: "empty" },
      { key: "false", kind: "empty" },
      { key: "missing", kind: "missing" },
      { key: "null", kind: "empty" },
      { key: "number", kind: "empty" },
      { key: "object", kind: "empty" },
      { key: "space", kind: "empty" },
    ]);
  });

  it("sorts and deduplicates requested keys, ignoring unused bundle entries", () => {
    expect(unresolvedSidebarKeys(["z", "a", "z"], { unused: "" })).toEqual([
      { key: "a", kind: "missing" }, { key: "z", kind: "missing" },
    ]);
    expect(unresolvedSidebarKeys(["a"], undefined)).toEqual([{ key: "a", kind: "missing" }]);
  });
});
