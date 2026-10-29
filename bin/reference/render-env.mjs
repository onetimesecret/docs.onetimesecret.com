// bin/reference/render-env.mjs
//
// Render the English `reference/environment-variables` page and the internal
// coverage report from parsed `.env.reference` records.
// Plain Node ESM, zero dependencies.
//
// PROVENANCE IS THE DESIGN CONSTRAINT (plan A3, AGENTS.md "Record AI agent
// prose edits with TextProv"). Everything on the page is either text copied
// verbatim from the vendored source, or one of the strings in
// RENDERER_STRINGS. There is no third category, and RENDERER_STRINGS is
// exported so the integration owner can account for all of it under TextProv
// without reading the renderer.
//
// VERBATIM MEANS FENCED. Source prose is emitted inside a code fence rather
// than as a paragraph or a blockquote. The comments in `.env.reference` are
// written for a terminal, not for Markdown: they contain `[derived]` (a
// Markdown link reference), `*` at the start of a line (a list bullet), `|`,
// `<`, `_` and backticks. Rendering them as Markdown changes what the reader
// sees; escaping them changes the bytes and has to make a judgement call on
// every character. A fence does neither — the text goes in and comes out
// unaltered, with no escaping decision and no way for source text to inject
// markup. The fence length is computed from the content, so prose containing a
// fence cannot break out of it.
//
// Escaping still happens where text must sit inline: the table cells. Values
// go through `inlineCode`, which picks a backtick run longer than any in the
// value and escapes a pipe, so a value like `'#3B82F6'` or
// `redis://host/0?timeout=5` cannot split a row.
//
// ANCHORS. Section headings keep the exact text the previous generated page
// used, so existing fragments (`#secrets--cryptography`, `#sso--omniauth`)
// keep resolving. Variables get a plain `### NAME` heading: this stack has no
// custom-heading-id syntax (see bin/reference/ids.mjs), so the fragment is the
// slugger's output for the name — lower-case with underscores preserved,
// `#secret_verifier_mode`.
import { anchorFor, envId, assertNoCollisions } from "./ids.mjs";
import { coverageReport } from "./env-parser.mjs";

/**
 * Every string this renderer introduces into published prose.
 *
 * Frontmatter is outside TextProv's marking scope, and the three frontmatter
 * strings are listed anyway so the accounting is complete rather than
 * complete-except-for-the-part-nobody-mentioned.
 */
export const RENDERER_STRINGS = {
  frontmatterTitle: "Environment variables",
  frontmatterDescription:
    "Every environment variable the Onetime Secret application documents, with its example line, declared default, release annotation and source location.",
  frontmatterSourceOfTruthShape:
    "onetimesecret/.env.reference:1-<lines> (the application's own complete environment-variable reference, vendored at <release> and rendered by bin/reference.mjs)",
  preamble: "This reference reflects Onetime Secret <release> (`<shortSha>`).",
  columnExample: "Example line",
  columnDeclaredDefault: "Declared default",
  columnSince: "Since",
  columnTags: "Tags",
  columnSource: "Source",
  cellNoDeclaredDefault: "not declared",
  cellNoSince: "not annotated",
  cellNoTags: "none",
};

/** The page this renderer owns, relative to the repository root. */
export const PAGE_PATH = "src/content/docs/en/reference/environment-variables.md";

/** The internal coverage report, relative to the repository root. */
export const COVERAGE_PATH = "docs/reference/coverage-environment.md";

/** A fence long enough to hold `content` verbatim. */
function fence(content) {
  let longest = 0;
  for (const run of content.match(/`+/g) ?? []) longest = Math.max(longest, run.length);
  return "`".repeat(Math.max(3, longest + 1));
}

/** `content` as a verbatim block that cannot be reinterpreted as Markdown. */
function verbatimBlock(lines) {
  const content = lines.join("\n");
  const mark = fence(content);
  return [mark, content, mark];
}

/** A value as an inline code span safe to drop into a table cell. */
export function inlineCode(value) {
  if (value === "") return "";
  // GFM splits table cells before parsing code spans. For backslash-pipe pairs,
  // use entities instead of doubling literal backslashes inside a code span.
  if (/\\\|/.test(value)) {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\": "&#92;", "|": "&#124;" };
    return `<code>${value.replace(/[&<>\\|]/g, (char) => entities[char])}</code>`;
  }
  let longest = 0;
  for (const run of value.match(/`+/g) ?? []) longest = Math.max(longest, run.length);
  const mark = "`".repeat(longest + 1);
  // Ordinary backslashes are literal in code spans. Escape only table pipes;
  // pad edge backticks so CommonMark does not mistake them for the delimiter.
  const body = value.replace(/\|/g, "\\|");
  const pad = body.startsWith("`") || body.endsWith("`") ? " " : "";
  return `${mark}${pad}${body}${pad}${mark}`;
}

/** The `Example line` cell: the source line verbatim, minus its Since marker. */
function exampleCell(record) {
  const prefix = record.active ? "" : "#";
  const value = record.exampleValue.replace(/\n/g, " ");
  return inlineCode(`${prefix}${record.name}=${value}`);
}

/**
 * Render the page body.
 *
 * @param {object} input
 * @param {ReturnType<import("./env-parser.mjs").parseEnvReference>} input.parsed
 * @param {object} input.manifest
 * @returns {{page: string, coverage: object, sections: object[], anchors: Map<string, object>}}
 */
export function renderEnvironmentPage({ parsed, manifest }) {
  const coverage = coverageReport(parsed);
  const entry = manifest.files.find((file) => file.role === "env-reference");
  const { release, commit } = manifest.upstream;
  const shortSha = commit.slice(0, 8);

  for (const record of coverage.published) record.id = envId(record.name);

  // Sections that publish nothing AND have nothing to say are dropped; a
  // section with source prose but no variables (Experimental Features) still
  // publishes, because its prose is the fact.
  const publishedIds = new Set(coverage.published.map((record) => record.lineStart));
  const sections = parsed.sections
    .map((section) => ({
      ...section,
      published: section.records.filter((record) => publishedIds.has(record.lineStart)),
    }))
    .filter((section) => section.published.length > 0 || section.prose.length > 0);

  const anchors = assertNoCollisions(
    coverage.published,
    sections.map((section) => ({ heading: section.heading })),
  ).anchors;

  const sourceOfTruth =
    `onetimesecret/${entry.path}:1-${entry.lines} (the application's own complete ` +
    `environment-variable reference, vendored at ${release} and rendered by bin/reference.mjs)`;

  const out = [
    "---",
    `title: ${RENDERER_STRINGS.frontmatterTitle}`,
    `description: "${RENDERER_STRINGS.frontmatterDescription}"`,
    "audience: operator",
    "pageType: reference",
    `sourceOfTruth: "${sourceOfTruth}"`,
    "---",
    "",
    `This reference reflects Onetime Secret ${release} (\`${shortSha}\`).`,
    "",
    ...verbatimBlock(headerProse(parsed.headerLines)),
    "",
  ];

  for (const section of sections) {
    out.push(`## ${section.heading}`, "");
    if (section.prose.length > 0) out.push(...verbatimBlock(section.prose), "");

    for (const record of section.published) {
      out.push(`### ${record.name}`, "");
      if (record.prose.length > 0) out.push(...verbatimBlock(record.prose), "");
      out.push(
        `| ${RENDERER_STRINGS.columnExample} | ${RENDERER_STRINGS.columnDeclaredDefault} | ${RENDERER_STRINGS.columnSince} | ${RENDERER_STRINGS.columnTags} | ${RENDERER_STRINGS.columnSource} |`,
        "| --- | --- | --- | --- | --- |",
        `| ${exampleCell(record)} | ${
          record.declaredDefault
            ? inlineCode(record.declaredDefault.value)
            : RENDERER_STRINGS.cellNoDeclaredDefault
        } | ${record.since ?? RENDERER_STRINGS.cellNoSince} | ${
          record.tags.length > 0 ? record.tags.join(", ") : RENDERER_STRINGS.cellNoTags
        } | ${inlineCode(`${entry.path}:${sourceSpan(record)}`)} |`,
        "",
      );
    }
  }

  return { page: `${out.join("\n").replace(/\n+$/, "")}\n`, coverage, sections, anchors };
}

/** `24-30`, or `24` when an entry is one line. */
function sourceSpan(record) {
  const start = Math.min(record.proseStart, record.lineStart);
  return start === record.lineEnd ? `${start}` : `${start}-${record.lineEnd}`;
}

/**
 * The source file's own header, minus the line that only names the file.
 *
 * Upstream's generator drops that line for the same reason: "# .env.reference"
 * means nothing to someone reading a web page. Everything else in the header
 * is the legend the rest of the page depends on, and it is copied verbatim.
 */
function headerProse(headerLines) {
  const kept = headerLines.filter((line) => line.replace(/^#\s*/, "").trim() !== ".env.reference");
  const prose = kept.map((line) => line.replace(/^#[ \t]?/, "").replace(/\s+$/, ""));
  while (prose.length > 0 && prose[0] === "") prose.shift();
  while (prose.length > 0 && prose[prose.length - 1] === "") prose.pop();
  return prose;
}

/**
 * Render the internal coverage report.
 *
 * This lives under docs/, not in the content collection: it is a maintenance
 * record, and plan section 2 excludes a public graveyard of inactive names.
 *
 * @param {object} input
 * @returns {string}
 */
export function renderCoverageReport({ parsed, manifest, coverage, sections }) {
  const { release, commit } = manifest.upstream;
  const entry = manifest.files.find((file) => file.role === "env-reference");
  const out = [
    "# Environment reference coverage",
    "",
    "Generated by `bin/reference.mjs generate`. Do not edit by hand.",
    "",
    `Source: \`vendor/onetimesecret/${entry.path}\` (${entry.lines} lines) from ` +
      `${manifest.upstream.repository} at ${release}, \`${commit}\`.`,
    "",
    "## Totals",
    "",
    "| Measure | Count |",
    "| --- | --- |",
    `| Lines matching the assignment shape | ${coverage.totalRecognized} |`,
    `| Declarations extracted | ${coverage.declarations} |`,
    `| Published | ${coverage.published.length} |`,
    `| Excluded | ${coverage.excluded.length} |`,
    `| Unresolved | ${coverage.unresolved.length} |`,
    `| Prose mentions (not declarations) | ${coverage.proseReferences.length} |`,
    `| Malformed lines without a name | ${coverage.malformedLines.length} |`,
    "",
    "Published + excluded + unresolved + prose mentions + malformed lines equals the",
    "first row. `coverageReport` throws when it does not.",
    "",
    "## Published",
    "",
    `Active in the source file: ${coverage.active}. Commented out: ${coverage.commented}.`,
    `With a declared default: ${coverage.withDeclaredDefault}. With a release annotation: ${coverage.withSince}.`,
    "",
    "| Section | Published | Anchor |",
    "| --- | --- | --- |",
  ];

  for (const section of sections) {
    out.push(
      `| ${section.heading} | ${section.published.length} | \`#${anchorFor(section.heading)}\` |`,
    );
  }

  out.push("", "## Excluded", "");
  if (coverage.excluded.length === 0) out.push("None.", "");
  else {
    out.push("| Reason | Count | Names |", "| --- | --- | --- |");
    for (const [reason, records] of [...coverage.excludedByReason].sort()) {
      const names = records
        .map((record) => `\`${record.name}\` (line ${record.lineStart})`)
        .join(", ");
      out.push(`| ${reason} | ${records.length} | ${names} |`);
    }
    out.push("");
  }

  out.push("## Unresolved", "");
  if (coverage.unresolved.length === 0) out.push("None.", "");
  else {
    out.push("| Name | Line | Reason |", "| --- | --- | --- |");
    for (const { record, reason } of coverage.unresolved) {
      out.push(`| \`${record.name}\` | ${record.lineStart} | ${reason} |`);
    }
    out.push("");
  }

  out.push("## Diagnostics", "");
  if (coverage.diagnostics.length === 0) out.push("None.", "");
  else {
    out.push("| Kind | Line | Name | Detail |", "| --- | --- | --- | --- |");
    for (const diagnostic of coverage.diagnostics) {
      const detail = diagnostic.detail.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
      out.push(
        `| ${diagnostic.kind} | ${diagnostic.line} | ${diagnostic.name ? `\`${diagnostic.name}\`` : "—"} | ${detail} |`,
      );
    }
    out.push("");
  }

  out.push(
    "## Record identifiers",
    "",
    "Record ids are `env-` plus the lower-cased name with `_` replaced by `-`.",
    "Page fragments are not the same string: this Markdown stack has no custom",
    "heading id syntax, so a fragment is the slug of the heading text, which keeps",
    "underscores. `SECRET_VERIFIER_MODE` is id `env-secret-verifier-mode` and",
    "fragment `#secret_verifier_mode`.",
    "",
  );

  return `${out.join("\n").replace(/\n+$/, "")}\n`;
}
