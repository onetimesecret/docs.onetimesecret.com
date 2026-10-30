// bin/reference/validate-config.mjs
//
// Validate the committed configuration snapshot without consulting or
// re-extracting upstream bytes. `check` runs this offline before every build;
// refresh runs it on what it is about to write.
import { anchorFor } from "./ids.mjs";
import {
  BILLING_STRUCTURAL_PATHS,
  CONFIG_PAGES,
  CONFIG_ROLES,
  assertPageAnchors,
  blockGroupSegment,
  groupHeading,
  sourceSpan,
  topLevelPathOf,
} from "./extract-config.mjs";
import { EXTRACTOR_FORMAT_VERSION, ROLES } from "./manifest.mjs";

/** The ERB classifications the extractor can emit (see yaml-erb.mjs). */
export const ERB_KINDS = ["env-fallback", "boolean", "env-read", "cast", "json-quoted", "runtime-defined"];

/** The unset behaviours the extractor can emit for an ERB-backed key. */
export const UNSET_BEHAVIOURS = ["static fallback", "true", "false", "nil", "unknown"];

/**
 * @param {object} data Parsed `src/data/reference/configuration.json`.
 * @param {object} manifest The loaded reference manifest.
 * @returns {{records: object[], perPage: Map<string, number>, blocks: number, structural: number}}
 */
export function validateConfigurationData(data, manifest) {
  const require = (condition, field) => {
    if (!condition) throw new Error(`configuration JSON: invalid ${field}`);
  };
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const string = (value) => typeof value === "string";
  const nonempty = (value) => string(value) && value.trim() !== "";
  const strings = (value) => Array.isArray(value) && value.every(string);
  const positive = (value) => Number.isSafeInteger(value) && value > 0;

  require(object(data), "root");
  require(
    data.extractorFormatVersion === EXTRACTOR_FORMAT_VERSION &&
      data.extractorFormatVersion === manifest.extractorFormatVersion,
    "extractorFormatVersion",
  );
  require(object(data.upstream), "upstream");
  for (const key of ["repository", "release", "commit"]) {
    require(nonempty(data.upstream[key]) && data.upstream[key] === manifest.upstream[key], `upstream.${key}`);
  }
  require(/^[0-9a-f]{40}$/.test(data.upstream.commit), "upstream.commit");

  // Sources: exactly the manifest's configuration inputs, hashed and counted.
  require(Array.isArray(data.sources) && data.sources.length === CONFIG_ROLES.length, "sources");
  const sources = new Map();
  for (const source of data.sources) {
    require(object(source) && ROLES.includes(source.role) && !sources.has(source.role), "source.role");
    const declared = manifest.configurationSources.find((entry) => entry.role === source.role);
    require(declared !== undefined, `source ${source.role} declared in manifest`);
    for (const key of ["path", "sha256", "lines"]) {
      require(source[key] === declared[key], `source.${key}`);
    }
    require(positive(source.lines), "source.lines");
    sources.set(source.role, source);
  }
  for (const role of CONFIG_ROLES) require(sources.has(role), `source ${role}`);
  const sourceByPath = new Map([...sources.values()].map((source) => [source.path, source]));

  // Pages: the fixed set, in order, each reading the roles the plan assigns.
  require(Array.isArray(data.pages) && data.pages.length === CONFIG_PAGES.length, "pages");
  const records = [];
  const ids = new Set();
  const perPage = new Map();
  let blocks = 0;
  let structural = 0;

  const span = (item, field) => {
    const source = sourceByPath.get(item.file);
    require(source !== undefined, `${field}.file`);
    require(positive(item.lineStart) && positive(item.lineEnd), `${field} lines`);
    require(item.lineStart <= item.lineEnd && item.lineEnd <= source.lines, `${field} source bounds`);
    require(item.sourceSpan === sourceSpan(item.lineStart, item.lineEnd), `${field}.sourceSpan`);
  };

  for (const [index, page] of data.pages.entries()) {
    const plan = CONFIG_PAGES[index];
    require(object(page) && page.owner === plan.owner, `pages[${index}].owner`);
    require(Array.isArray(page.roles) && page.roles.join() === plan.roles.join(), `${page.owner} roles`);
    require(Array.isArray(page.groups) && Array.isArray(page.structural), `${page.owner} groups/structural`);
    const headings = [];
    let published = 0;

    for (const group of page.groups) {
      require(object(group) && nonempty(group.heading), `${page.owner} group.heading`);
      require(group.anchor === anchorFor(group.heading), `${page.owner} group.anchor`);
      require(nonempty(group.fileShort) && nonempty(group.segment), `${page.owner} group.fileShort/segment`);
      require(group.heading === groupHeading(group.fileShort, group.segment), `${page.owner} group heading text`);
      require(Array.isArray(group.records) && Array.isArray(group.blocks), `${page.owner} group records/blocks`);
      headings.push(group.heading);

      // Walk order is source order, but keys in one flow sequence or mapping
      // (`ca: [es, en]`) share a line, so starts are non-decreasing, not strict.
      let lastStart = 0;
      for (const record of group.records) {
        const where = `${page.owner} record ${record?.heading ?? "(no heading)"}`;
        require(object(record), where);
        require(nonempty(record.id) && !ids.has(record.id), `${where}.id`);
        ids.add(record.id);
        require(nonempty(record.path) && record.fileShort === group.fileShort, `${where}.path/fileShort`);
        require(record.heading === `${record.fileShort}: ${record.path}`, `${where}.heading`);
        require(record.anchor === anchorFor(record.heading), `${where}.anchor`);
        require(record.owner === page.owner, `${where}.owner`);
        require(topLevelPathOf(record.path) === group.segment, `${where} grouping`);
        span(record, where);
        require(record.lineStart >= lastStart, `${where} source order`);
        lastStart = record.lineStart;
        require(string(record.rawValue), `${where}.rawValue`);
        require(strings(record.comment), `${where}.comment`);
        require(record.since === null || nonempty(record.since), `${where}.since`);
        if (record.erb === null) {
          require(Object.hasOwn(record, "literalValue"), `${where}.literalValue`);
          const value = record.literalValue;
          require(
            value === null ||
              ["string", "number", "boolean"].includes(typeof value) ||
              (Array.isArray(value) && value.length === 0) ||
              (object(value) && Object.keys(value).length === 0),
            `${where}.literalValue shape`,
          );
        } else {
          require(object(record.erb) && !Object.hasOwn(record, "literalValue"), `${where}.erb`);
          require(nonempty(record.erb.raw) && ERB_KINDS.includes(record.erb.kind), `${where}.erb.kind`);
          require(strings(record.erb.envReads) && strings(record.erb.notes), `${where}.erb.envReads/notes`);
          require(
            record.erb.unsetBehaviour === null || UNSET_BEHAVIOURS.includes(record.erb.unsetBehaviour),
            `${where}.erb.unsetBehaviour`,
          );
          require(record.erb.cast === null || strings(record.erb.cast), `${where}.erb.cast`);
        }
        headings.push(record.heading);
        records.push(record);
        published += 1;
      }

      for (const block of group.blocks) {
        const where = `${page.owner} block ${block?.heading ?? "(no heading)"}`;
        require(object(block) && block.fileShort === group.fileShort, where);
        require(string(block.path) && block.heading === `${block.fileShort}: ${block.path} (conditional)`, `${where}.heading`);
        require(block.anchor === anchorFor(block.heading), `${where}.anchor`);
        require(groupHeading(block.fileShort, blockGroupSegment(block)) === group.heading, `${where} grouping`);
        require(block.subject === (block.path || "the enclosing section"), `${where}.subject`);
        require(strings(block.keys) && nonempty(block.raw) && nonempty(block.openerExpr), `${where} keys/raw/opener`);
        span(block, where);
        headings.push(block.heading);
        blocks += 1;
      }
    }

    for (const section of page.structural) {
      const where = `${page.owner} structural ${section?.heading ?? "(no heading)"}`;
      require(object(section) && BILLING_STRUCTURAL_PATHS.includes(section.section), where);
      require(plan.roles.includes("billing-example"), `${where} on a page without the billing example`);
      require(section.heading === groupHeading(section.fileShort, section.section), `${where}.heading`);
      require(section.anchor === anchorFor(section.heading), `${where}.anchor`);
      require(Number.isSafeInteger(section.entries) && section.entries >= 0, `${where}.entries`);
      require(strings(section.fields), `${where}.fields`);
      span(section, where);
      headings.push(section.heading);
      structural += 1;
    }

    assertPageAnchors(page.owner, headings);
    perPage.set(page.owner, published);
  }

  return { records, perPage, blocks, structural };
}
