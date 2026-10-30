// Validate the committed snapshot without consulting or re-extracting upstream bytes.
import { anchorFor, assertNoCollisions, envId } from "./ids.mjs";
import { EXTRACTOR_FORMAT_VERSION, validateEnvironmentSource } from "./manifest.mjs";

export function validateEnvironmentData(data, manifest) {
  const require = (condition, field) => {
    if (!condition) throw new Error(`environment JSON: invalid ${field}`);
  };
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const string = (value) => typeof value === "string";
  const nonempty = (value) => string(value) && value.trim() !== "";
  const strings = (value) => Array.isArray(value) && value.every(string);
  const positive = (value) => Number.isSafeInteger(value) && value > 0;
  require(object(data), "root");
  require(data.extractorFormatVersion === EXTRACTOR_FORMAT_VERSION &&
    data.extractorFormatVersion === manifest.extractorFormatVersion, "extractorFormatVersion");
  require(object(data.upstream), "upstream");
  for (const key of ["repository", "release", "commit"]) {
    require(nonempty(data.upstream[key]) && data.upstream[key] === manifest.upstream[key], `upstream.${key}`);
  }
  require(/^[0-9a-f]{40}$/.test(data.upstream.commit), "upstream.commit");
  validateEnvironmentSource(data.source);
  for (const key of ["path", "sha256", "lines"]) {
    require(data.source[key] === manifest.environmentSource[key], `source.${key}`);
  }
  require(strings(data.header), "header");
  require(Array.isArray(data.sections) && data.sections.length > 0, "sections");
  const records = [];
  let lastLine = 0;
  for (const section of data.sections) {
    require(object(section) && nonempty(section.heading), "section.heading");
    require(nonempty(section.anchor) && section.anchor === anchorFor(section.heading), "section.anchor");
    require(strings(section.prose), "section.prose");
    require(Array.isArray(section.records), "section.records");
    for (const record of section.records) {
      require(object(record), "record");
      require(record.id === envId(record.name), "record.id");
      require(record.anchor === anchorFor(record.name), "record.anchor");
      require(record.section === section.heading && nonempty(record.sectionSlug), "record.section");
      for (const key of ["lineStart", "lineEnd", "proseStart"]) {
        require(positive(record[key]) && record[key] <= data.source.lines, `record.${key}`);
      }
      require(record.proseStart <= record.lineStart && record.lineStart <= record.lineEnd &&
        record.lineStart > lastLine, "record source order/span");
      lastLine = record.lineEnd;
      require(string(record.raw) && string(record.exampleValue), "record raw/exampleValue");
      require(typeof record.active === "boolean" && record.commented === !record.active, "record active/commented");
      require(record.since === null || nonempty(record.since), "record.since");
      require(strings(record.prose) && strings(record.tags), "record prose/tags");
      require(["supported", "compatibility", "experimental"].includes(record.classification), "record.classification");
      require(record.firstDeclaredAt === null, "record.firstDeclaredAt");
      if (record.declaredDefault !== null) {
        require(object(record.declaredDefault), "record.declaredDefault");
        for (const key of ["value", "form", "evidence"]) {
          require(string(record.declaredDefault[key]), `record.declaredDefault.${key}`);
        }
        require(["default-colon", "default-parenthetical"].includes(record.declaredDefault.form), "record.declaredDefault.form");
      }
      const start = record.proseStart;
      require(record.sourceSpan === (start === record.lineEnd ? `${start}` : `${start}-${record.lineEnd}`), "record.sourceSpan");
      require(record.example === `${record.active ? "" : "#"}${record.name}=${record.exampleValue.replace(/\n/g, " ")}`, "record.example");
      records.push(record);
    }
  }
  assertNoCollisions(records, data.sections);
  return { published: records };
}
