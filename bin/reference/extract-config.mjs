// bin/reference/extract-config.mjs
//
// Build the configuration-reference data snapshot and the internal coverage
// report from the upstream ERB-templated YAML defaults files and the billing
// example. Refresh-only: `bin/reference.mjs refresh` reads the pinned upstream
// blobs, calls `extractConfigurationSnapshot`, and commits the result as
// `src/data/reference/configuration.json`. Nothing here renders a page;
// presentation belongs to src/components/ConfigReference.astro and the helpers
// in src/lib/reference/configuration.mjs, which read the committed JSON.
//
// THE DATA IS STRUCTURED, NOT PRE-RENDERED. A record carries the extractor's
// classification (literal value or parsed ERB expression, with its environment
// reads, static fallback and unset behaviour), its source comment as lines, its
// release annotation and its source span. The component decides how to show a
// shipped default, an ERB-derived default or a value only the running
// application can resolve; the data keeps those three apart so it can.
//
// THE BILLING EXAMPLE IS AN EXAMPLE. `etc/examples/billing.example.yaml`
// carries real configuration-contract keys (schema version, Stripe wiring,
// currency, product matching) and a sample catalog. The catalog sections are
// recorded as structure only — entry counts and field names, no values — so
// nothing published reads as a production price list or a plan matrix.
//
// ANCHORS come from ids.mjs's `anchorFor`, the slugger the built page uses, and
// every anchor on every page goes through collision detection. The slugger
// drops `.` and `:`, so `config: site.host` anchors as `config-sitehost`; that
// is deterministic, and a collision fails the refresh rather than being
// silently suffixed.
import { anchorFor } from "./ids.mjs";
import { assignOwner, buildCoverageReport, extractAll } from "./yaml-erb.mjs";

/** The generated data, relative to the repository root. */
export const CONFIG_DATA_PATH = "src/data/reference/configuration.json";

/** The internal configuration coverage report, relative to the repository root. */
export const CONFIG_COVERAGE_PATH = "docs/reference/coverage-configuration.md";

/** The pages the data feeds, in sidebar order, with the upstream roles each reads. */
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

/** Upstream roles this extractor reads, in the order their records are walked. */
export const CONFIG_ROLES = ["config-defaults", "auth-defaults", "logging-defaults", "billing-example"];

/**
 * Top-level paths in the billing example that are sample catalog content.
 *
 * Their keys are counted and their field names listed; no value from them
 * reaches the data.
 */
export const BILLING_STRUCTURAL_PATHS = ["entitlements", "plans", "stripe_metadata_schema"];

/** The page wrapper for an owner, relative to the repository root. */
export function pagePathFor(owner) {
  return `src/content/docs/en/reference/${owner}.mdx`;
}

/**
 * The source comment block for a record, as the lines a reader sees.
 *
 * The leading `#` and one following space are dropped, exactly as
 * render-env.mjs does for `.env.reference` prose. Nothing else is altered. A
 * trailing comment that only records the release is dropped, because `since`
 * already carries it.
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

/**
 * The group heading for one file and one top-level path.
 *
 * The word "file" is not decoration. A top-level scalar key such as the auth
 * file's `mode` would otherwise produce a group heading and a record heading
 * with the same text, and the slugger would hand both the same fragment.
 */
export function groupHeading(fileShort, segment) {
  return `${fileShort} file: ${segment}`;
}

/** The record heading: the file-qualified key path. */
export function recordHeading(record) {
  return `${record.fileShort}: ${record.path}`;
}

/** The heading for a blocked structural ERB block. */
export function blockHeading(block, fileShort) {
  return `${fileShort}: ${block.path} (conditional)`;
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

/** `24-30`, or `24` when a span is one line. */
export function sourceSpan(lineStart, lineEnd) {
  return lineStart === lineEnd ? `${lineStart}` : `${lineStart}-${lineEnd}`;
}

/** Reject any anchor claimed twice on one page; return anchor -> heading. */
export function assertPageAnchors(owner, headings) {
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

/** The published form of one extracted key record. */
function publishRecord(record) {
  const heading = recordHeading(record);
  const published = {
    id: record.id,
    heading,
    anchor: anchorFor(heading),
    owner: record.owner,
    file: record.file,
    fileShort: record.fileShort,
    path: record.path,
    lineStart: record.lineStart,
    lineEnd: record.lineEnd,
    sourceSpan: sourceSpan(record.lineStart, record.lineEnd),
    rawValue: record.rawValue,
    erb: record.erb ?? null,
    comment: commentLines(record),
    since: record.since,
  };
  // A literal's value is a fact of the file, including a literal `null`, so it
  // is present exactly when there is no ERB expression. JSON cannot carry
  // `undefined`, which is why the key is added rather than always written.
  if (!record.erb) published.literalValue = record.literalValue ?? null;
  return published;
}

function publishBlock(block, fileShort) {
  const heading = blockHeading(block, fileShort);
  return {
    heading,
    anchor: anchorFor(heading),
    file: block.file,
    fileShort,
    path: block.path || "",
    subject: block.path || "the enclosing section",
    keys: blockedKeys(block),
    openerExpr: block.openerExpr,
    raw: block.raw,
    lineStart: block.lineStart,
    lineEnd: block.lineEnd,
    sourceSpan: sourceSpan(block.lineStart, block.lineEnd),
  };
}

function structuralSection({ fileShort, file, section, records }) {
  const members = records.filter(
    (record) =>
      record.path === section ||
      record.path.startsWith(`${section}.`) ||
      record.path.startsWith(`${section}[`),
  );
  if (members.length === 0) return null;
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
  return {
    heading,
    anchor: anchorFor(heading),
    file,
    fileShort,
    section,
    entries: entries.size,
    fields: [...fields].sort(),
    lineStart,
    lineEnd,
    sourceSpan: sourceSpan(lineStart, lineEnd),
  };
}

/**
 * Extract the configuration data snapshot and the coverage report.
 *
 * @param {object} input
 * @param {Map<string, {path: string, role: string, sha256?: string, lines?: number, text: string}>} input.inputs
 * @param {object} input.manifest
 * @returns {{data: object, report: string, coverage: {records: number, perPage: Map<string, number>, structuralBlocks: number}}}
 */
export function extractConfigurationSnapshot({ inputs, manifest }) {
  const { release, commit } = manifest.upstream;

  const files = [];
  for (const role of CONFIG_ROLES) {
    const entry = inputs.get(role);
    if (!entry) throw new Error(`the manifest declares no ${role} input, which this extractor needs`);
    files.push({
      role,
      fileName: entry.path,
      text: entry.text,
      sha256: entry.sha256,
      lines: lineCount(entry.text),
    });
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

  const pages = [];
  const perPage = new Map();

  for (const page of CONFIG_PAGES) {
    const groups = [];
    const structural = [];
    const headings = [];
    let published = 0;

    for (const role of page.roles) {
      const extraction = byRole.get(role);
      const file = files.find((candidate) => candidate.role === role);
      const fileShort = extraction.fileShort;
      const isBilling = role === "billing-example";
      const owned = extraction.records.filter((record) => record.owner === page.owner);

      const grouped = new Map();
      for (const record of owned) {
        const top = record.path.split(/[.[]/)[0];
        if (isBilling && BILLING_STRUCTURAL_PATHS.includes(top)) continue;
        const heading = groupHeading(fileShort, topLevelPathOf(record.path));
        if (!grouped.has(heading)) {
          grouped.set(heading, {
            heading,
            anchor: anchorFor(heading),
            fileShort,
            segment: topLevelPathOf(record.path),
            records: [],
            blocks: [],
          });
        }
        grouped.get(heading).records.push(publishRecord(record));
      }

      for (const group of grouped.values()) {
        headings.push(group.heading);
        for (const record of group.records) {
          headings.push(record.heading);
          published += 1;
        }
        // A blocked structural block is reported under the group whose path it
        // sits in, so the condition is next to the keys it affects.
        for (const block of extraction.structuralBlocks) {
          if (groupHeading(fileShort, blockGroupSegment(block)) !== group.heading) continue;
          // The same top-level path can be split across two pages (site.* is),
          // so the block follows the ownership rules like a key would rather
          // than appearing on every page that has a group with its name.
          if (assignOwner({ fileShort, path: block.path || "" }) !== page.owner) continue;
          const publishedBlock = publishBlock(block, fileShort);
          group.blocks.push(publishedBlock);
          headings.push(publishedBlock.heading);
        }
        groups.push(group);
      }

      if (isBilling) {
        for (const section of BILLING_STRUCTURAL_PATHS) {
          const rendered = structuralSection({
            fileShort,
            file: file.fileName,
            section,
            records: owned,
          });
          if (!rendered) continue;
          structural.push(rendered);
          headings.push(rendered.heading);
        }
      }
    }

    assertPageAnchors(page.owner, headings);
    perPage.set(page.owner, published);
    pages.push({ owner: page.owner, roles: [...page.roles], groups, structural });
  }

  const data = {
    extractorFormatVersion: manifest.extractorFormatVersion,
    upstream: manifest.upstream,
    sources: files.map(({ role, fileName, sha256, lines }) => ({
      role,
      path: fileName,
      sha256,
      lines,
    })),
    pages,
  };

  const report = `${buildCoverageReport(extractions, {
    sourceRelease: release,
    sourceSha: commit,
  }).replace(/\n+$/, "")}\n`;

  return {
    data,
    report,
    coverage: {
      records: allRecords.length,
      perPage,
      structuralBlocks: extractions.reduce(
        (sum, entry) => sum + entry.result.structuralBlocks.length,
        0,
      ),
    },
  };
}

function lineCount(text) {
  return (text.match(/\n/g) ?? []).length;
}
