import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { Markdoc } from "@astrojs/markdoc/config";
import config from "../../markdoc.config.mjs";
import { docsPages } from "./nav.mjs";

const page = new URL("../../src/content/docs/en/contribute/text-provenance.mdoc", import.meta.url);
const partial = new URL("./_conversation.mdoc", page);

function render(source) {
  const ast = Markdoc.parse(source);
  expect(Markdoc.validate(ast, config)).toEqual([]);
  return Markdoc.renderers.html(Markdoc.transform(ast, config));
}

describe("Markdoc disclosure tags", () => {
  it("renders a closed native disclosure with a direct, paragraph-free summary", () => {
    const html = render(`{% details %}
{% summary %}
Read the **conversation**
{% /summary %}

Transcript body.
{% /details %}`);
    expect(html).toBe(
      "<article><details><summary>Read the <strong>conversation</strong></summary><p>Transcript body.</p></details></article>",
    );
  });

  it("escapes summary text instead of interpreting it as HTML", () => {
    expect(render("{% summary %}\nA & B\n{% /summary %}")).toContain(
      "<summary>A &amp; B</summary>",
    );
  });
});

describe("text provenance transcript", () => {
  it("includes a separate partial without adding a documentation route", () => {
    expect(readFileSync(page, "utf8")).toContain('{% partial file="./_conversation.mdoc" /%}');
    const pages = docsPages();
    expect(pages.filter(({ slug }) => slug === "contribute/text-provenance")).toHaveLength(1);
    expect(pages.some(({ slug }) => slug === "contribute/_conversation")).toBe(false);
  });

  it("keeps speaker labels out of the headings and code samples free of provenance selectors", () => {
    const source = readFileSync(partial, "utf8");
    const ast = Markdoc.parse(source);
    expect(source).toContain("**User**");
    expect(source).toContain("**Assistant**");
    expect(source).not.toContain("file:///");
    const nodes = [...ast.walk()];
    expect(nodes.some((node) => node.type === "heading")).toBe(false);
    const fences = nodes.filter((node) => node.type === "fence");
    expect(fences.length).toBeGreaterThan(0);
    for (const node of fences) {
      expect(node.attributes.content).not.toContain("\u{E0101}");
    }
    // Previously recorded prose marks are retained in the archived conversation.
    expect(source).toContain("\u{E0101}");
  });
});
