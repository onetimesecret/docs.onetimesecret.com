import { readFileSync } from "node:fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import textprov from "textprov";
import { describe, expect, it } from "vitest";

const root = new URL("../../", import.meta.url);
const parser = unified().use(remarkParse).use(remarkGfm);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const text = (node) => node.value ?? node.children?.map(text).join("") ?? "";
const visible = (source) =>
  textprov
    .runs(source, { strip: true })
    .map((run) => run.text)
    .join("");
const cellText = (source) =>
  text(parser.parse(source === "unverified" ? "not determined from source" : source));

function tables(markdown) {
  return parser
    .parse(markdown)
    .children.filter((node) => node.type === "table")
    .map((table) => ({
      header: table.children[0].children.map(text),
      rows: table.children.slice(1).map((row) => row.children.map(text)),
    }));
}

function rowsWithHeader(pageTables, header) {
  const selected = pageTables.filter((table) => table.header.join("|") === header.join("|"));
  expect(selected.length, `missing table: ${header.join(" | ")}`).toBeGreaterThan(0);
  const rows = selected.flatMap((table) => table.rows);
  for (const row of rows) expect(row).toHaveLength(header.length);
  return rows;
}

function assertBijection(records, rows, key) {
  const ids = records.map((record) => record.id);
  const names = records.map((record) => record[key]);
  expect(ids.every((id) => typeof id === "string" && id.length > 0)).toBe(true);
  expect(new Set(ids).size, "duplicate record IDs").toBe(ids.length);
  expect(new Set(names).size, `duplicate record ${key}`).toBe(names.length);
  const byName = new Map(records.map((record) => [record[key], record.id]));
  const rowIds = rows.map(([name]) => {
    expect(byName.has(name), `undocumented record in page table: ${name}`).toBe(true);
    return byName.get(name);
  });
  // Compare arrays, not sets: an extra duplicate row must fail too.
  expect(rowIds.sort()).toEqual([...ids].sort());
}

const pages = Object.fromEntries(
  ["cli", "scheduled-jobs", "health-endpoints"].map((slug) => {
    const source = read(`src/content/docs/en/reference/${slug}.md`);
    // These are enrolled pages, not arbitrary Unicode content. Decode in memory only.
    expect(source).toMatch(/^textprov: true$/m);
    const markdown = visible(source);
    return [
      slug,
      {
        data: JSON.parse(read(`src/data/reference/${slug}.json`)),
        markdown,
        tables: tables(markdown),
      },
    ];
  }),
);

for (const [slug, page] of Object.entries(pages)) {
  describe(`runtime reference/${slug}`, () => {
    it("identifies the records' pinned release and revision", () => {
      expect(page.markdown).toContain(
        `This reference reflects Onetime Secret ${page.data.source.release} (\`${page.data.source.sha.slice(0, 8)}\`).`,
      );
    });
  });
}

describe("CLI inventory", () => {
  const { data, tables: pageTables } = pages.cli;
  const commands = rowsWithHeader(pageTables, [
    "Command",
    "Writes",
    "Gate",
    "External effects",
    "Privileges",
    "Description",
  ]);
  const scripts = rowsWithHeader(pageTables, ["Script", "Role"]);

  it("maps each command row to exactly one record ID and vice versa", () => {
    assertBijection(data.records, commands, "command");
  });

  it("maps each shell entrypoint row to exactly one record ID and vice versa", () => {
    assertBijection(data.entry_points, scripts, "path");
    const ids = [...data.records, ...data.entry_points].map((record) => record.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("matches full registered descriptions and external effects", () => {
    const byCommand = new Map(data.records.map((record) => [record.command, record]));
    for (const row of commands) {
      const record = byCommand.get(row[0]);
      expect(row[5], `${row[0]} description`).toBe(cellText(record.description));
      expect(row[3], `${row[0]} external effects`).toBe(cellText(record.external_effects));
    }
  });

  it("matches full shell entrypoint roles", () => {
    const byPath = new Map(data.entry_points.map((record) => [record.path, record]));
    for (const [path, role] of scripts) {
      expect(role, path).toBe(cellText(byPath.get(path).role));
    }
  });
});

describe("scheduled job inventory", () => {
  const { data, tables: pageTables } = pages["scheduled-jobs"];
  const header = ["Job", "Trigger", "Enabled by", "Depends on", "Effects"];
  const jobs = rowsWithHeader(pageTables, header);
  const schedulerEntries = rowsWithHeader(pageTables, ["Entry", ...header.slice(1)]);

  it("maps each scheduled, maintenance and scheduler-owned row to exactly one record ID", () => {
    // The scheduler-owned entry has a shorter display label, not a job class name.
    const records = data.records.map((record) => ({
      ...record,
      job: record.job === "scheduler liveness heartbeat" ? "Liveness heartbeat" : record.job,
    }));
    assertBijection(records, [...jobs, ...schedulerEntries], "job");
  });
});

describe("health endpoint inventory", () => {
  const { data, tables: pageTables } = pages["health-endpoints"];
  const endpoints = rowsWithHeader(pageTables, ["Path", "Method", "Access", "Codes", "Probes"]);

  it("maps each endpoint row to exactly one record ID and vice versa", () => {
    assertBijection(data.records, endpoints, "path");
  });

  it("matches each endpoint's HTTP methods", () => {
    const byPath = new Map(data.records.map((record) => [record.path, record]));
    for (const [path, method] of endpoints) expect(method, path).toBe(byPath.get(path).methods);
  });
});

// Guard the gate itself against omissions, additions and duplicate identities.
describe("runtime inventory bijection guard", () => {
  const records = [
    { id: "cli-one", command: "ots one" },
    { id: "cli-two", command: "ots two" },
  ];
  const rows = [["ots one"], ["ots two"]];

  it.each([
    ["missing row", records, rows.slice(1)],
    ["extra row", records, [...rows, ["ots three"]]],
    ["duplicate row", records, [...rows, rows[0]]],
    ["duplicate ID", [records[0], { ...records[1], id: "cli-one" }], rows],
    ["duplicate command", [records[0], { ...records[1], command: "ots one" }], rows],
  ])("rejects %s", (_label, changedRecords, changedRows) => {
    expect(() => assertBijection(changedRecords, changedRows, "command")).toThrow();
  });
});
