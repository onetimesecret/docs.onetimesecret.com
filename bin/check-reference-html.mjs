// Validate component-rendered reference content after `pnpm build`. Source-only
// checks cannot see headings or fragments rendered by an Astro component, so
// this reads dist/ and compares every rendered heading, fragment and table cell
// with the committed data it was rendered from.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";

import {
  conditionalText,
  pageHeadings,
  preambleText,
  recordRowText,
  sourceOf,
  STRINGS,
  structuralRowText,
  structuralText,
} from "../src/lib/reference/configuration.mjs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const environment = JSON.parse(read("src/data/reference/environment-variables.json"));
const configuration = JSON.parse(read("src/data/reference/configuration.json"));

/** Run `check` against one built page, closing the DOM afterwards. */
function withPage(slug, check) {
  const dom = new JSDOM(read(`dist/en/reference/${slug}/index.html`));
  try {
    const doc = dom.window.document;
    const content = doc.querySelector(".sl-markdown-content");
    assert.ok(content, `${slug}: missing reference content`);
    assert.ok(content.closest("[data-pagefind-body]"), `${slug}: reference is outside Pagefind content`);
    const ids = [...doc.querySelectorAll("[id]")].map((element) => element.id);
    assert.equal(new Set(ids).size, ids.length, `${slug}: duplicate rendered ids`);
    return check(doc, content);
  } finally {
    dom.window.close();
  }
}

const cellsOf = (row) => [...row.cells].map((td) => td.textContent);
const headersOf = (table) => [...table.querySelectorAll("thead th")].map((th) => th.textContent);

function checkEnvironment() {
  return withPage("environment-variables", (doc, content) => {
    assert.equal(
      content.querySelectorAll("table").length,
      environment.sections.filter((section) => section.records.length > 0).length,
    );
    assert.ok(
      [...content.querySelectorAll("p")].some((p) => p.textContent === environment.header.join("\n")),
      "header text changed",
    );

    for (const table of content.querySelectorAll("table")) {
      assert.deepEqual(headersOf(table), ["Example line", "Default", "Since"]);
    }

    let records = 0;
    for (const section of environment.sections) {
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
        assert.deepEqual(
          cellsOf(cell.parentElement),
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
    return { sections: environment.sections.length, records };
  });
}

/** The verbatim block that follows a heading's section, if any. */
function verbatim(section, selector, label) {
  const pre = section.querySelector(`:scope > pre${selector}`);
  assert.ok(pre, `${label}: missing verbatim block`);
  assert.equal(pre.querySelector("code")?.children.length, 0, `${label}: verbatim block interpreted as markup`);
  return pre.textContent;
}

function checkConfiguration(page) {
  return withPage(page.owner, (doc, content) => {
    assert.ok(
      [...content.querySelectorAll("p")].some(
        (p) => p.textContent.replace(/\s+/g, " ").trim() === preambleText(configuration.upstream),
      ),
      `${page.owner}: preamble changed`,
    );

    // Every heading the data predicts is rendered at its depth with its text,
    // and the depth-2 ones reach the table of contents.
    const expected = pageHeadings(page);
    for (const heading of expected) {
      const element = doc.getElementById(heading.slug);
      assert.equal(element?.tagName, `H${heading.depth}`, `${page.owner}: missing #${heading.slug}`);
      assert.equal(element.textContent, heading.text, `${page.owner}: heading text for #${heading.slug}`);
      if (heading.depth === 2) {
        assert.ok(
          doc.querySelector(`starlight-toc a[href="#${heading.slug}"]`),
          `${page.owner}: #${heading.slug} missing from table of contents`,
        );
      }
    }
    const rendered = [...content.querySelectorAll("h2[id], h3[id]")].map((h) => h.id);
    assert.deepEqual(rendered, expected.map((h) => h.slug), `${page.owner}: heading order`);

    let records = 0;
    let blocks = 0;
    for (const group of page.groups) {
      for (const record of group.records) {
        const label = `${page.owner} ${record.heading}`;
        const section = doc.getElementById(record.anchor).closest("section");
        const table = section.querySelector("table");
        assert.deepEqual(headersOf(table), STRINGS.columns, `${label}: columns`);
        assert.deepEqual(cellsOf(table.querySelector("tbody tr")), recordRowText(record), `${label}: cells`);
        if (record.comment.length > 0) {
          assert.equal(verbatim(section, ".source-comment", label), record.comment.join("\n"), `${label}: comment`);
        } else {
          assert.equal(section.querySelector(":scope > pre.source-comment"), null, `${label}: unexpected comment`);
        }
        if (record.erb?.kind === "runtime-defined") {
          assert.equal(verbatim(section, ".expression", label), record.erb.raw, `${label}: expression`);
        }
        records++;
      }
      for (const block of group.blocks) {
        const label = `${page.owner} ${block.heading}`;
        const section = doc.getElementById(block.anchor).closest("section");
        assert.equal(section.querySelector(":scope > p")?.textContent, conditionalText(block), `${label}: sentence`);
        assert.equal(verbatim(section, ".expression", label), block.raw, `${label}: block text`);
        const table = section.querySelector("table");
        assert.deepEqual(headersOf(table), STRINGS.blockColumns, `${label}: columns`);
        assert.deepEqual(cellsOf(table.querySelector("tbody tr")), [sourceOf(block)], `${label}: source`);
        blocks++;
      }
    }
    for (const structural of page.structural) {
      const label = `${page.owner} ${structural.heading}`;
      const section = doc.getElementById(structural.anchor).closest("section");
      assert.equal(section.querySelector(":scope > p")?.textContent, structuralText(structural), `${label}: sentence`);
      const table = section.querySelector("table");
      assert.deepEqual(headersOf(table), STRINGS.structuralColumns, `${label}: columns`);
      assert.deepEqual(cellsOf(table.querySelector("tbody tr")), structuralRowText(structural), `${label}: cells`);
    }
    assert.equal(
      content.querySelectorAll("table").length,
      records + blocks + page.structural.length,
      `${page.owner}: table count`,
    );
    return { records, blocks, structural: page.structural.length };
  });
}

const env = checkEnvironment();
const totals = { records: 0, blocks: 0, structural: 0 };
for (const page of configuration.pages) {
  const counts = checkConfiguration(page);
  for (const key of Object.keys(totals)) totals[key] += counts[key];
}
console.log(
  `check:reference:html OK — environment: ${env.sections} sections, ${env.records} example-cell fragments and literal descriptions; ` +
    `configuration: ${configuration.pages.length} pages, ${totals.records} key records, ${totals.blocks} conditional blocks, ${totals.structural} structural sections, every heading fragment and cell matching the data`,
);
