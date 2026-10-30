// bin/reference/render-env.mjs
//
// Build environment-reference data and the internal coverage report from
// parsed `.env.reference` records. Plain Node ESM, zero dependencies.
//
// Source prose and values stay unescaped in the data; presentation belongs to
// the consuming component. Anchors retain the previous page's fragments,
// including underscores in variable names (see bin/reference/ids.mjs).
import { anchorFor, envId, assertNoCollisions } from "./ids.mjs";
import { coverageReport, parseEnvReference } from "./env-parser.mjs";
import { validateEnvironmentData } from "./validate-env.mjs";

/** The generated data, relative to the repository root. */
export const DATA_PATH = "src/data/reference/environment-variables.json";

/** The internal coverage report, relative to the repository root. */
export const COVERAGE_PATH = "docs/reference/coverage-environment.md";

/**
 * Build the JSON contract consumed by the environment-reference component.
 *
 * @param {object} input
 * @param {ReturnType<import("./env-parser.mjs").parseEnvReference>} input.parsed
 * @param {object} input.manifest
 * @returns {{data: object, coverage: object, sections: object[], anchors: Map<string, object>}}
 */
export function buildEnvironmentData({ parsed, manifest }) {
  const coverage = coverageReport(parsed);
  const entry = manifest.environmentSource;

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

  const data = {
    extractorFormatVersion: manifest.extractorFormatVersion,
    upstream: manifest.upstream,
    source: { path: entry.path, sha256: entry.sha256, lines: entry.lines },
    header: headerProse(parsed.headerLines),
    sections: sections.map((section) => ({
      heading: section.heading,
      anchor: anchorFor(section.heading),
      prose: section.prose,
      records: section.published.map((record) => ({
        ...record,
        anchor: anchorFor(record.name),
        sourceSpan: sourceSpan(record),
        example: `${record.active ? "" : "#"}${record.name}=${record.exampleValue.replace(/\n/g, " ")}`,
      })),
    })),
  };

  return { data, coverage, sections, anchors };
}

/** Refresh-only extraction. Never silently publish a partial parse. */
export function extractEnvironmentSnapshot(text, manifest) {
  const parsed = parseEnvReference(text, { sourceName: manifest.environmentSource.path });
  const failures = parsed.diagnostics.filter(({ kind }) =>
    ["malformed-assignment", "unrecognized-line", "assignment-outside-section"].includes(kind),
  );
  if (failures.length) {
    throw new Error(
      `environment source has malformed or unresolved input:\n${failures
        .map(({ line, name, detail }) => `  line ${line}${name ? ` (${name})` : ""}: ${detail}`)
        .join("\n")}`,
    );
  }
  const built = buildEnvironmentData({ parsed, manifest });
  if (built.coverage.unresolved.length)
    throw new Error("environment source has unresolved declarations");
  validateEnvironmentData(built.data, manifest);
  return {
    ...built,
    report: renderCoverageReport({ parsed, manifest, ...built }),
  };
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
  const entry = manifest.environmentSource;
  const out = [
    "# Environment reference coverage",
    "",
    "Generated by `bin/reference.mjs refresh`. Do not edit by hand.",
    "",
    `Source: \`${entry.path}\` (${entry.lines} lines) from ` +
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
    "Generated data stores page fragments separately as `anchor`, using the slug",
    "of the heading text to preserve existing links, including underscores.",
    "`SECRET_VERIFIER_MODE` is id `env-secret-verifier-mode` and",
    "fragment `#secret_verifier_mode`.",
    "",
  );

  return `${out.join("\n").replace(/\n+$/, "")}\n`;
}
