// src/lib/reference/configuration.mjs
//
// Presentation helpers for the configuration reference pages. They read the
// structured records in src/data/reference/configuration.json and decide how a
// value is shown; they never read upstream and never change the data. The
// component (src/components/ConfigReference.astro) and the rendered-HTML check
// (bin/check-reference-html.mjs) share them so the page and its check agree.
//
// Every string these pages introduce around the source data is listed in
// STRINGS. A record's comment, raw expression and values come from the data.
//
// NO VALUE IS PROMOTED. A literal in the defaults file is reported as the
// shipped value, an ERB fallback as the ERB-derived default, and anything the
// extractor classified `runtime-defined` is reported as determined at run time
// with the expression shown verbatim.

export const STRINGS = {
  preamble: "This reference reflects Onetime Secret <release> (<shortSha>).",
  columns: ["Shape", "Value", "Environment variables", "When unset", "Since", "Source"],
  structuralColumns: ["Entries", "Entry fields", "Source"],
  blockColumns: ["Source"],
  cellNoEnvironment: "none",
  cellNoSince: "not annotated",
  cellRuntimeDefined: "determined at run time",
  cellShippedValue: "the value above is the shipped default",
  cellNoValue: "no value",
  cellStaticFallback: "the value above",
  conditionalBlock:
    "The shipped defaults file sets <keys> inside a conditional block, so it states no unconditional value for <subject>.",
  structuralOnly:
    "The <section> section of the example file is reproduced here as a structure only: its entries are sample content, not production prices, plan names or entitlement grants.",
};

/** Fill `<name>` placeholders in a STRINGS template. */
export function fill(template, values) {
  return template.replace(/<([a-zA-Z]+)>/g, (whole, name) =>
    Object.hasOwn(values, name) ? String(values[name]) : whole,
  );
}

/** A table cell: either literal code or plain text. */
const code = (value) => ({ code: value });
const text = (value) => ({ text: value });

/** The plain-text reading of a cell, for checks and accessible comparisons. */
export function cellText(cell) {
  return cell.code ?? cell.text;
}

/** The shape cell: what kind of value the key takes. */
export function shapeOf(record) {
  if (record.erb) {
    const casts = record.erb.cast ?? [];
    if (casts.some((cast) => cast.startsWith("split("))) return "list";
    if (casts.includes("to_json")) return "JSON string";
    if (casts.includes("to_i")) return "integer";
    if (casts.includes("to_f")) return "number";
    if (record.erb.kind === "boolean") return "boolean";
    if (record.erb.kind === "json-quoted") return "JSON string";
    if (record.erb.kind === "runtime-defined") return "runtime-defined";
    return "string";
  }
  const value = record.literalValue;
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
  if (Array.isArray(value)) return "empty sequence";
  if (typeof value === "object") return "empty mapping";
  return "string";
}

/** The value cell: the literal in the file, or the ERB-derived default. */
export function valueOf(record) {
  if (record.erb) {
    if (record.erb.kind === "runtime-defined") return text(STRINGS.cellRuntimeDefined);
    const fallback = record.erb.staticFallback;
    if (fallback === null || fallback === undefined) return text(STRINGS.cellNoValue);
    if (typeof fallback === "string") return code(fallback === "" ? '""' : fallback);
    if (Array.isArray(fallback)) return code("[]");
    if (typeof fallback === "object") return code("{}");
    return code(String(fallback));
  }
  const value = record.literalValue;
  if (value === null || value === undefined) return code("null");
  if (typeof value === "string") return code(value === "" ? '""' : value);
  if (Array.isArray(value)) return code("[]");
  if (typeof value === "object") return code("{}");
  return code(String(value));
}

/** The unset cell: what the key resolves to when no environment value is set. */
export function unsetOf(record) {
  if (!record.erb) return text(STRINGS.cellShippedValue);
  switch (record.erb.unsetBehaviour) {
    case "static fallback":
      return text(STRINGS.cellStaticFallback);
    case "true":
      return code("true");
    case "false":
      return code("false");
    case "nil":
      return text(STRINGS.cellNoValue);
    default:
      return text(STRINGS.cellRuntimeDefined);
  }
}

/** The environment variables whose value reaches this key, de-duplicated in order. */
export function environmentOf(record) {
  const seen = [];
  for (const name of record.erb?.envReads ?? []) if (!seen.includes(name)) seen.push(name);
  return seen;
}

/** The environment cell as plain text. */
export function environmentText(record) {
  const names = environmentOf(record);
  return names.length === 0 ? STRINGS.cellNoEnvironment : names.join(", ");
}

/** The since cell. */
export function sinceOf(record) {
  return record.since ?? STRINGS.cellNoSince;
}

/** `etc/defaults/config.defaults.yaml:24-30`, or a single line. */
export function sourceOf(item) {
  return `${item.file}:${item.sourceSpan}`;
}

/** The record's whole table row as plain text, in STRINGS.columns order. */
export function recordRowText(record) {
  return [
    shapeOf(record),
    cellText(valueOf(record)),
    environmentText(record),
    cellText(unsetOf(record)),
    sinceOf(record),
    sourceOf(record),
  ];
}

/** The conditional-block sentence as plain text. */
export function conditionalText(block) {
  return fill(STRINGS.conditionalBlock, { keys: block.keys.join(", "), subject: block.subject });
}

/** The structural-section sentence as plain text. */
export function structuralText(section) {
  return fill(STRINGS.structuralOnly, { section: section.section });
}

/** The structural section's table row as plain text, in STRINGS.structuralColumns order. */
export function structuralRowText(section) {
  return [
    String(section.entries),
    section.fields.length === 0 ? STRINGS.cellNoEnvironment : section.fields.join(", "),
    sourceOf(section),
  ];
}

/** The opening sentence as plain text. */
export function preambleText(upstream) {
  return fill(STRINGS.preamble, { release: upstream.release, shortSha: upstream.commit.slice(0, 8) });
}

/**
 * The headings a page renders, in document order, for the table of contents
 * and for checks that need the component's heading set without a build.
 *
 * @returns {{depth: number, text: string, slug: string}[]}
 */
export function pageHeadings(page) {
  const headings = [];
  for (const group of page.groups) {
    headings.push({ depth: 2, text: group.heading, slug: group.anchor });
    for (const record of group.records) headings.push({ depth: 3, text: record.heading, slug: record.anchor });
    for (const block of group.blocks) headings.push({ depth: 3, text: block.heading, slug: block.anchor });
  }
  for (const section of page.structural) {
    headings.push({ depth: 2, text: section.heading, slug: section.anchor });
  }
  return headings;
}
