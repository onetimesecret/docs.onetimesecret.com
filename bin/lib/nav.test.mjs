// bin/lib/nav.test.mjs
//
// Unit tests for the pure helpers behind the check:* drift checks. The checks
// themselves are executable assertions over real repo state; these cover the
// parsing edge cases that would otherwise regress silently.
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { fileSlug, normalizeLink, parseAllowlist, repoRoot } from "./nav.mjs";

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

  it("strips the extension from a non-index page", () => {
    expect(fileSlug("pricing.md", DOC_EXT)).toBe("pricing");
    expect(fileSlug("a/b/index-of-things.markdown", DOC_EXT)).toBe("a/b/index-of-things");
  });
});
