import { describe, expect, it } from "vitest";
import { Markdoc } from "@astrojs/markdoc/config";
import config from "../../markdoc.config.mjs";

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
    expect(html).toBe("<article><details><summary>Read the <strong>conversation</strong></summary><p>Transcript body.</p></details></article>");
  });

  it("escapes summary text instead of interpreting it as HTML", () => {
    expect(render("{% summary %}\nA & B\n{% /summary %}")).toContain("<summary>A &amp; B</summary>");
  });
});
