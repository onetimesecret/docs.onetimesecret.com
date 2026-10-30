// Validate component-rendered reference content after `pnpm build`. Source-only
// checks cannot see headings or fragments rendered by an Astro component.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const data = JSON.parse(read("src/data/reference/environment-variables.json"));
const dom = new JSDOM(read("dist/en/reference/environment-variables/index.html"));

try {
  const doc = dom.window.document;
  const content = doc.querySelector(".sl-markdown-content");
  assert.ok(content, "missing reference content");
  assert.ok(content.closest("[data-pagefind-body]"), "reference is outside Pagefind content");
  assert.equal(
    content.querySelectorAll("table").length,
    data.sections.filter((section) => section.records.length > 0).length,
  );
  const ids = [...doc.querySelectorAll("[id]")].map((element) => element.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate rendered ids");
  assert.ok(
    [...content.querySelectorAll("p")].some((p) => p.textContent === data.header.join("\n")),
    "header text changed",
  );

  for (const table of content.querySelectorAll("table")) {
    assert.deepEqual(
      [...table.querySelectorAll("thead th")].map((th) => th.textContent),
      ["Example line", "Default", "Since"],
    );
  }

  let records = 0;
  for (const section of data.sections) {
    const heading = doc.getElementById(section.anchor);
    assert.equal(heading?.tagName, "H2", `missing section #${section.anchor}`);
    assert.equal(heading.textContent, section.heading);
    assert.ok(
      doc.querySelector(`starlight-toc a[href="#${section.anchor}"]`),
      `section missing from table of contents: ${section.anchor}`,
    );
    const container = heading.closest("section");
    if (section.prose.length) {
      assert.equal(container.querySelector(":scope > p")?.textContent, section.prose.join("\n"));
    }
    for (const record of section.records) {
      const cell = doc.getElementById(record.anchor);
      assert.equal(cell?.tagName, "TD", `missing example-cell fragment #${record.anchor}`);
      const cells = [...cell.parentElement.cells];
      assert.deepEqual(
        cells.map((td) => td.textContent),
        [
          record.example,
          record.declaredDefault?.value ?? "not declared",
          record.since ?? "not annotated",
        ],
        `changed reference fields for ${record.name}`,
      );
      if (record.prose.length) {
        const descriptionRow = cell.parentElement.nextElementSibling;
        assert.equal(
          descriptionRow?.querySelector("td")?.colSpan,
          3,
          `incorrect description width for ${record.name}`,
        );
        const description = descriptionRow?.querySelector("details p");
        assert.equal(
          description?.textContent,
          record.prose.join("\n"),
          `changed description for ${record.name}`,
        );
        assert.equal(
          description.children.length,
          0,
          `description interpreted as markup: ${record.name}`,
        );
      }
      records++;
    }
  }
  console.log(
    `check:reference:html OK — ${data.sections.length} sections, ${records} example-cell fragments and literal descriptions`,
  );
} finally {
  dom.window.close();
}
