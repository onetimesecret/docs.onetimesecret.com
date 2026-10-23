// Unit tests for the draft handling in config/sidebar.mjs, so a regression
// there fails a fast test rather than only showing up as a 404 on the live site.
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

import { isDraftLink, pruneDrafts } from "../../config/sidebar.mjs";

describe("isDraftLink", () => {
  const fixture = (files) => {
    const root = mkdtempSync(join(tmpdir(), "sidebar-drafts-"));
    for (const [path, contents] of Object.entries(files)) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), contents);
    }
    return root;
  };

  const draft = "---\ntitle: Draft\ndraft: true\n---\n\nBody.\n";
  const live = "---\ntitle: Live\ndraft: false\n---\n\nBody.\n";

  it("reads the draft flag from the page a link points at", () => {
    const root = fixture({ "a.md": draft, "b.mdoc": live, "c.mdx": "---\ntitle: C\n---\n" });
    expect(isDraftLink("a", root)).toBe(true);
    expect(isDraftLink("b", root)).toBe(false);
    expect(isDraftLink("c", root)).toBe(false);
  });

  it("resolves a section link to its index page, and the root link to the root index", () => {
    const root = fixture({ "index.mdoc": draft, "guide/index.md": draft });
    expect(isDraftLink("/", root)).toBe(true);
    expect(isDraftLink("guide", root)).toBe(true);
    expect(isDraftLink("/guide/", root)).toBe(true);
  });

  it("ignores a draft line outside the frontmatter block", () => {
    const root = fixture({ "a.md": "---\ntitle: A\n---\n\ndraft: true\n" });
    expect(isDraftLink("a", root)).toBe(false);
  });

  it("reads CRLF frontmatter", () => {
    const root = fixture({ "a.md": draft.replaceAll("\n", "\r\n") });
    expect(isDraftLink("a", root)).toBe(true);
  });

  it("treats a link with no docs page behind it as live", () => {
    const root = fixture({});
    expect(isDraftLink("pricing", root)).toBe(false);
    expect(isDraftLink("https://example.com/", root)).toBe(false);
  });
});

describe("pruneDrafts", () => {
  const isDraft = (link) => link.startsWith("draft");

  it("drops draft links and keeps the rest in order", () => {
    const items = [{ link: "a" }, { link: "draft-b" }, { link: "c" }];
    expect(pruneDrafts(items, isDraft)).toEqual([{ link: "a" }, { link: "c" }]);
  });

  it("prunes nested groups and keeps their other fields", () => {
    const items = [
      { label: "Outer", collapsed: true, items: [{ label: "Inner", items: [{ link: "draft-a" }, { link: "b" }] }] },
    ];
    expect(pruneDrafts(items, isDraft)).toEqual([
      { label: "Outer", collapsed: true, items: [{ label: "Inner", items: [{ link: "b" }] }] },
    ]);
  });

  it("drops a group left with no items, and a parent emptied by that", () => {
    const items = [{ link: "a" }, { label: "Outer", items: [{ label: "Inner", items: [{ link: "draft-b" }] }] }];
    expect(pruneDrafts(items, isDraft)).toEqual([{ link: "a" }]);
  });

  it("leaves its input unchanged", () => {
    const items = [{ label: "Group", items: [{ link: "draft-a" }, { link: "b" }] }];
    const before = structuredClone(items);
    pruneDrafts(items, isDraft);
    expect(items).toEqual(before);
  });
});
