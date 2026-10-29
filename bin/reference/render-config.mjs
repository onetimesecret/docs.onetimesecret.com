// bin/reference/render-config.mjs
//
// Render the five generated English configuration key-record pages under
// `reference/` from the vendored ERB-templated YAML defaults files and the
// vendored billing example. Plain Node ESM, zero dependencies beyond the
// extractor it reads records from.
//
// SAME PROVENANCE CONTRACT AS render-env.mjs (plan A3). Everything on these
// pages is either text copied out of the vendored source, a value the
// extractor derived from it, or one of the strings in RENDERER_STRINGS. There
// is no third category, and RENDERER_STRINGS is exported with a test that
// asserts no other prose paragraph reaches a page.
//
// VERBATIM MEANS FENCED, for the same reason render-env.mjs gives: a YAML
// comment is written for a terminal, and reinterpreting it as Markdown changes
// what the reader sees. Source comments go inside a fence whose length is
// computed from the content; values that must sit inline go through
// `inlineCode` from render-env.mjs, which is the one escaping decision.
//
// NO VALUE IS PROMOTED. A literal in the defaults file is reported as the
// shipped value, an ERB fallback as the ERB-derived default, and anything the
// extractor classified `runtime-defined` is reported as determined at run time
// with the expression shown verbatim. Keys inside a blocked structural ERB
// block get the condition and the affected key names, never an unconditional
// default.
//
// THE BILLING EXAMPLE IS AN EXAMPLE. `etc/examples/billing.example.yaml`
// carries real configuration-contract keys (schema version, Stripe wiring,
// currency, product matching) and a sample catalog. The catalog sections are
// rendered as structure only — entry counts and field names, no values — so
// nothing on the page reads as a production price list or a plan matrix.
//
// ANCHORS come from ids.mjs's `anchorFor`, which is the slugger the built page
// uses, and every anchor on every page goes through collision detection. The
// slugger drops `.` and `:`, so `config: site.host` anchors as
// `config-sitehost`; that is deterministic, and a collision fails the run
// rather than being silently suffixed.
import { anchorFor } from "./ids.mjs";
import { inlineCode } from "./render-env.mjs";
import { assignOwner, buildCoverageReport, extractAll } from "./yaml-erb.mjs";

/**
 * Every string this renderer introduces into published prose.
 *
 * `<...>` placeholders are filled from the vendored inputs. Frontmatter is
 * outside TextProv's marking scope and is listed anyway so the accounting is
 * complete.
 */
export const RENDERER_STRINGS = {
  preamble: "This reference reflects Onetime Secret <release> (`<shortSha>`).",
  columnShape: "Shape",
  columnValue: "Value",
  columnEnvironment: "Environment variables",
  columnUnset: "When unset",
  columnSince: "Since",
  columnSource: "Source",
  columnEntries: "Entries",
  columnEntryFields: "Entry fields",
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
  frontmatter: {
    "site-and-interface": {
      title: "Site and interface configuration",
      description:
        "Key records for the site, internationalization and diagnostics sections of the Onetime Secret configuration file, with shapes, values, environment reads and source locations.",
    },
    "features-and-branding": {
      title: "Features and branding configuration",
      description:
        "Key records for the feature switches, secret options, sign-in switches and branding sections of the Onetime Secret configuration file.",
    },
    "datastore-and-queues": {
      title: "Datastore and queues configuration",
      description:
        "Key records for the datastore endpoint, logical databases, job broker, worker pools and scheduled-job switches in the Onetime Secret configuration file.",
    },
    "email-and-delivery": {
      title: "Email and delivery configuration",
      description:
        "Key records for the delivery mode, SMTP credentials, per-provider API delivery and outbound address validation in the Onetime Secret configuration file.",
    },
    "auth-logging-and-billing-files": {
      title: "Auth, logging and billing files",
      description:
        "Key records and file structures for the separate Onetime Secret authentication, logging and billing configuration files.",
    },
  },
};

/** The internal configuration coverage report, relative to the repository root. */
export const CONFIG_COVERAGE_PATH = "docs/reference/coverage-configuration.md";

/** The pages this renderer owns, in sidebar order. */
export const CONFIG_PAGES = [
  { owner: "site-and-interface", roles: ["config-defaults"] },
  { owner: "features-and-branding", roles: ["config-defaults"] },
  { owner: "datastore-and-queues", roles: ["config-defaults"] },
  { owner: "email-and-delivery", roles: ["config-defaults"] },
  {
    owner: "auth-logging-and-billing-files",
    roles: ["auth-defaults", "logging-defaults", "billing-example"],
  },
];

/** Vendored roles this renderer reads, in the order their records are walked. */
export const CONFIG_ROLES = ["config-defaults", "auth-defaults", "logging-defaults", "billing-example"];

/**
 * Top-level paths in the billing example that are sample catalog content.
 *
 * Their keys are counted and their field names listed; no value from them
 * reaches a page.
 */
export const BILLING_STRUCTURAL_PATHS = ["entitlements", "plans", "stripe_metadata_schema"];

/** The page path for an owner, relative to the repository root. */
export function pagePathFor(owner) {
  return `src/content/docs/en/reference/${owner}.md`;
}

/** A fence long enough to hold `content` verbatim. */
function fence(content) {
  let longest = 0;
  for (const run of content.match(/`+/g) ?? []) longest = Math.max(longest, run.length);
  return "`".repeat(Math.max(3, longest + 1));
}

/** `lines` as a verbatim block that cannot be reinterpreted as Markdown. */
function verbatimBlock(lines, language = "") {
  const content = lines.join("\n");
  const mark = fence(content);
  return [`${mark}${language}`, content, mark];
}

/** Fill `<name>` placeholders in a RENDERER_STRINGS template. */
export function fill(template, values) {
  return template.replace(/<([a-zA-Z]+)>/g, (whole, name) =>
    Object.hasOwn(values, name) ? String(values[name]) : whole,
  );
}

/**
 * The source comment block for a record, as the lines a reader sees.
 *
 * The leading `#` and one following space are dropped, exactly as
 * render-env.mjs does for `.env.reference` prose. Nothing else is altered, and
 * the result goes inside a fence. A trailing comment that only records the
 * release is dropped, because the Since column already carries it.
 */
export function commentLines(record) {
  const lines = [];
  if (record.comment) {
    for (const line of record.comment.split("\n")) {
      lines.push(line.replace(/^\s*#[ \t]?/, "").replace(/\s+$/, ""));
    }
  }
  if (record.trailingComment) {
    const text = record.trailingComment.replace(/^#[ \t]?/, "").replace(/\s+$/, "");
    if (text !== "" && !/^Since\s+v/i.test(text)) lines.push(text);
  }
  while (lines.length > 0 && lines[0] === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

/** The shape cell: what kind of value the key takes. */
export function shapeOf(record) {
  if (record.erb) {
    const casts = record.erb.cast ?? [];
    if (casts.includes("split")) return "list";
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
export function valueCell(record) {
  if (record.erb) {
    if (record.erb.kind === "runtime-defined") return RENDERER_STRINGS.cellRuntimeDefined;
    const fallback = record.erb.staticFallback;
    if (fallback === null || fallback === undefined) return RENDERER_STRINGS.cellNoValue;
    if (typeof fallback === "string") {
      return fallback === "" ? inlineCode('""') : inlineCode(fallback);
    }
    return inlineCode(String(fallback));
  }
  const value = record.literalValue;
  if (value === null || value === undefined) return inlineCode("null");
  if (typeof value === "string") return value === "" ? inlineCode('""') : inlineCode(value);
  if (Array.isArray(value)) return inlineCode("[]");
  if (typeof value === "object") return inlineCode("{}");
  return inlineCode(String(value));
}

/** The unset cell: what the key resolves to when no environment value is set. */
export function unsetCell(record) {
  if (!record.erb) return RENDERER_STRINGS.cellShippedValue;
  switch (record.erb.unsetBehaviour) {
    case "static fallback":
      return RENDERER_STRINGS.cellStaticFallback;
    case "true":
      return inlineCode("true");
    case "false":
      return inlineCode("false");
    case "nil":
      return RENDERER_STRINGS.cellNoValue;
    default:
      return RENDERER_STRINGS.cellRuntimeDefined;
  }
}

/** The environment cell: the variables whose value reaches this key. */
export function environmentCell(record) {
  const reads = record.erb?.envReads ?? [];
  if (reads.length === 0) return RENDERER_STRINGS.cellNoEnvironment;
  const seen = [];
  for (const name of reads) if (!seen.includes(name)) seen.push(name);
  return seen.map((name) => inlineCode(name)).join(", ");
}

/** `etc/defaults/config.defaults.yaml:24-30`, or a single line. */
export function sourceCell(record) {
  const span = record.lineStart === record.lineEnd ? `${record.lineStart}` : `${record.lineStart}-${record.lineEnd}`;
  return inlineCode(`${record.file}:${span}`);
}

/**
 * The group heading a record sits under: its top-level configuration path,
 * qualified by the file it came from.
 *
 * The word "file" is not decoration. A top-level scalar key such as the auth
 * file's `mode` would otherwise produce a group heading and a record heading
 * with the same text, and the slugger would hand both the same fragment.
 */
export function groupKeyFor(record) {
  return groupHeading(record.fileShort, topLevelPathOf(record.path));
}

/**
 * The top-level configuration path a key is grouped under.
 *
 * A key with no nesting (`mode`, `schema_version`, `match_fields[0]`) has no
 * section of its own, so those group together rather than each minting a
 * one-record section.
 */
export function topLevelPathOf(path) {
  return path.includes(".") ? path.split(/[.[]/)[0] : "top-level keys";
}

/** The group heading for one file and one top-level path. */
export function groupHeading(fileShort, segment) {
  return `${fileShort} file: ${segment}`;
}

/** The record heading: the file-qualified key path. */
export function recordHeading(record) {
  return `${record.fileShort}: ${record.path}`;
}

/**
 * The top-level path a blocked structural block is grouped under.
 *
 * A block's path is always a section, never a scalar key, so its first segment
 * is the group even when the path has one segment. `topLevelPathOf` cannot be
 * reused here: it would read a one-segment path as a top-level scalar key.
 */
export function blockGroupSegment(block) {
  const path = block.path || "";
  return path === "" ? "top-level keys" : path.split(/[.[]/)[0];
}

/** The keys a blocked structural ERB block sets, in source order. */
export function blockedKeys(block) {
  const names = [];
  for (const line of block.raw.split("\n")) {
    const match = /^\s*(?:-\s+)?([A-Za-z0-9_]+):(\s|$)/.exec(line);
    if (match && !names.includes(match[1])) names.push(match[1]);
  }
  return names;
}

/** Reject any anchor claimed twice on one page. */
function assertPageAnchors(owner, headings) {
  const seen = new Map();
  for (const heading of headings) {
    const anchor = anchorFor(heading);
    const existing = seen.get(anchor);
    if (existing) {
      throw new Error(
        `anchor collision on "#${anchor}" in reference/${owner}: "${heading}" and "${existing}" slug the same — the two headings need distinct text, which means the source paths need distinct spellings`,
      );
    }
    seen.set(anchor, heading);
  }
  return seen;
}

function frontmatter({ owner, release, sources }) {
  const { title, description } = RENDERER_STRINGS.frontmatter[owner];
  const sourceOfTruth = sources
    .map((entry) => `onetimesecret/${entry.path}:1-${entry.lines}`)
    .join("; ")
    .concat(` (vendored at ${release} and rendered by bin/reference.mjs)`);
  return [
    "---",
    `title: ${title}`,
    `description: "${description}"`,
    "audience: operator",
    "pageType: reference",
    `sourceOfTruth: "${sourceOfTruth}"`,
    "---",
  ];
}

function recordRows(record) {
  const out = [`### ${recordHeading(record)}`, ""];
  const comment = commentLines(record);
  if (comment.length > 0) out.push(...verbatimBlock(comment), "");
  out.push(
    `| ${RENDERER_STRINGS.columnShape} | ${RENDERER_STRINGS.columnValue} | ${RENDERER_STRINGS.columnEnvironment} | ${RENDERER_STRINGS.columnUnset} | ${RENDERER_STRINGS.columnSince} | ${RENDERER_STRINGS.columnSource} |`,
    "| --- | --- | --- | --- | --- | --- |",
    `| ${shapeOf(record)} | ${valueCell(record)} | ${environmentCell(record)} | ${unsetCell(record)} | ${
      record.since ?? RENDERER_STRINGS.cellNoSince
    } | ${sourceCell(record)} |`,
    "",
  );
  if (record.erb?.kind === "runtime-defined") {
    out.push(...verbatimBlock(record.erb.raw.split("\n"), "ruby"), "");
  }
  return out;
}

function structuralSection({ fileShort, file, section, records }) {
  const members = records.filter(
    (record) => record.path === section || record.path.startsWith(`${section}.`) || record.path.startsWith(`${section}[`),
  );
  const entries = new Set();
  const fields = new Set();
  let lineStart = Infinity;
  let lineEnd = 0;
  for (const record of members) {
    const parts = record.path.split(".");
    if (parts.length > 1) entries.add(parts[1]);
    if (parts.length > 2) fields.add(parts[2].replace(/\[\d+\]$/, ""));
    lineStart = Math.min(lineStart, record.lineStart);
    lineEnd = Math.max(lineEnd, record.lineEnd);
  }
  const heading = groupHeading(fileShort, section);
  // No source comment here: the only comment the extractor attaches to this
  // region belongs to the first child key, and reprinting a child's comment
  // under a section heading would attribute it to the wrong thing.
  const out = [`## ${heading}`, "", fill(RENDERER_STRINGS.structuralOnly, { section }), ""];
  out.push(
    `| ${RENDERER_STRINGS.columnEntries} | ${RENDERER_STRINGS.columnEntryFields} | ${RENDERER_STRINGS.columnSource} |`,
    "| --- | --- | --- |",
    `| ${entries.size} | ${
      fields.size === 0
        ? RENDERER_STRINGS.cellNoEnvironment
        : [...fields].sort().map((name) => inlineCode(name)).join(", ")
    } | ${inlineCode(`${file}:${lineStart}-${lineEnd}`)} |`,
    "",
  );
  return { lines: out, heading, members };
}

function blockSection(block, fileShort) {
  const keys = blockedKeys(block);
  const subject = block.path || "the enclosing section";
  const heading = `${fileShort}: ${block.path} (conditional)`;
  const out = [`### ${heading}`, ""];
  out.push(
    fill(RENDERER_STRINGS.conditionalBlock, {
      keys: keys.map((name) => `\`${name}\``).join(", "),
      subject: `\`${subject}\``,
    }),
    "",
  );
  out.push(...verbatimBlock(block.raw.split("\n"), "erb"), "");
  out.push(
    `| ${RENDERER_STRINGS.columnSource} |`,
    "| --- |",
    `| ${inlineCode(`${block.file}:${block.lineStart}-${block.lineEnd}`)} |`,
    "",
  );
  return { lines: out, heading };
}

/**
 * Render every generated configuration page and the configuration coverage
 * report.
 *
 * @param {object} input
 * @param {Map<string, {path: string, role: string, text: string}>} input.inputs
 * @param {object} input.manifest
 * @returns {{artifacts: {path: string, content: string}[], coverage: object, anchors: Map<string, Map<string, string>>}}
 */
export function renderConfigurationPages({ inputs, manifest }) {
  const { release, commit } = manifest.upstream;
  const shortSha = commit.slice(0, 8);

  const files = [];
  for (const role of CONFIG_ROLES) {
    const entry = inputs.get(role);
    if (!entry) throw new Error(`the manifest declares no ${role} input, which this renderer needs`);
    files.push({ role, fileName: entry.path, text: entry.text, lines: lineCount(entry.text) });
  }

  const extractions = extractAll(files.map(({ text, fileName }) => ({ text, fileName })));
  const failed = extractions.filter((entry) => !entry.ok);
  if (failed.length > 0) {
    throw new Error(
      `configuration extraction failed for ${failed.length} input(s):\n${failed
        .map((entry) => `  - ${entry.fileName}: ${entry.error.message}`)
        .join("\n")}`,
    );
  }

  const byRole = new Map(files.map((file, index) => [file.role, extractions[index].result]));
  const allRecords = extractions.flatMap((entry) => entry.result.records);
  const unassigned = allRecords.filter((record) => record.owner === "unassigned");
  if (unassigned.length > 0) {
    throw new Error(
      `${unassigned.length} configuration key(s) have no owning page — add an OWNERSHIP_RULES row rather than publishing them nowhere:\n${unassigned
        .map((record) => `  - ${record.fileShort}:${record.path}`)
        .join("\n")}`,
    );
  }

  const artifacts = [];
  const anchors = new Map();
  const perPage = new Map();

  for (const page of CONFIG_PAGES) {
    const sources = page.roles.map((role) => {
      const file = files.find((candidate) => candidate.role === role);
      return { path: file.fileName, lines: file.lines };
    });
    const out = [
      ...frontmatter({ owner: page.owner, release, sources }),
      "",
      fill(RENDERER_STRINGS.preamble, { release, shortSha }),
      "",
    ];
    const headings = [];
    let published = 0;

    for (const role of page.roles) {
      const extraction = byRole.get(role);
      const file = files.find((candidate) => candidate.role === role);
      const fileShort = extraction.fileShort;
      const isBilling = role === "billing-example";
      const owned = extraction.records.filter((record) => record.owner === page.owner);

      const groups = new Map();
      for (const record of owned) {
        const top = record.path.split(/[.[]/)[0];
        if (isBilling && BILLING_STRUCTURAL_PATHS.includes(top)) continue;
        const key = groupKeyFor(record);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(record);
      }

      for (const [groupKey, records] of groups) {
        out.push(`## ${groupKey}`, "");
        headings.push(groupKey);
        for (const record of records) {
          out.push(...recordRows(record));
          headings.push(recordHeading(record));
          published += 1;
        }
        // A blocked structural block is reported under the group whose path it
        // sits in, so the condition is next to the keys it affects.
        for (const block of extraction.structuralBlocks) {
          if (groupHeading(fileShort, blockGroupSegment(block)) !== groupKey) continue;
          // The same top-level path can be split across two pages (site.* is),
          // so the block follows the ownership rules like a key would rather
          // than appearing on every page that has a group with its name.
          if (assignOwner({ fileShort, path: block.path || "" }) !== page.owner) continue;
          const section = blockSection(block, fileShort);
          out.push(...section.lines);
          headings.push(section.heading);
        }
      }

      if (isBilling) {
        for (const section of BILLING_STRUCTURAL_PATHS) {
          const rendered = structuralSection({
            fileShort,
            file: file.fileName,
            section,
            records: owned,
          });
          if (rendered.members.length === 0) continue;
          out.push(...rendered.lines);
          headings.push(rendered.heading);
        }
      }
    }

    anchors.set(page.owner, assertPageAnchors(page.owner, headings));
    perPage.set(page.owner, published);
    artifacts.push({
      path: pagePathFor(page.owner),
      content: `${out.join("\n").replace(/\n+$/, "")}\n`,
    });
  }

  artifacts.push({
    path: CONFIG_COVERAGE_PATH,
    content: `${buildCoverageReport(extractions, {
      sourceRelease: release,
      sourceSha: commit,
    }).replace(/\n+$/, "")}\n`,
  });

  return {
    artifacts,
    anchors,
    coverage: {
      records: allRecords.length,
      perPage,
      structuralBlocks: extractions.reduce((sum, entry) => sum + entry.result.structuralBlocks.length, 0),
    },
  };
}

function lineCount(text) {
  return (text.match(/\n/g) ?? []).length;
}

/** Every prose template a generated configuration page may contain. */
export const PROSE_TEMPLATES = [
  RENDERER_STRINGS.preamble,
  RENDERER_STRINGS.conditionalBlock,
  RENDERER_STRINGS.structuralOnly,
];
