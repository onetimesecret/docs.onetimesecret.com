// bin/reference/env-parser.mjs
//
// Parse a vendored `.env.reference` into normalized records (plan A2).
// Plain Node ESM, zero dependencies.
//
// TEXT, NEVER SOURCED. Nothing here evaluates, interpolates or shells out. A
// value like `FOO=$(rm -rf /)` is a string with a dollar sign in it, and
// bin/reference/env-parser.test.mjs pins that.
//
// WHAT COUNTS AS AN ASSIGNMENT, and why there are two recognizers:
//
//   COVERAGE_RE  /^\s*#?\s*[A-Z_][A-Z0-9_]*=/   every line that LOOKS like one
//   ASSIGNMENT_RE /^(#?)([A-Z_][A-Z0-9_]*)=(.*)$/  every line that IS one
//
// The file's own convention is `NAME=value` for a shipped line and
// `#NAME=value` for a commented one, with no space after the `#`. Prose in the
// file routinely mentions a setting mid-sentence:
//
//   # AUTH_EMAIL_AUTH_ENABLED=true only; the route does not exist otherwise.
//
// That matches the loose shape and is not a declaration — reading it as one
// invents ten variables that do not exist and reports nine false duplicates.
// So the narrow recognizer requires no leading whitespace and no space between
// `#` and the name, and every line that matches the loose shape without
// matching the narrow one is recorded as a `prose-reference` diagnostic. The
// coverage report then accounts for every loose match exactly once, which is
// what plan A2 asks for ("account for every recognized assignment as
// published, intentionally excluded or unresolved") without hard-coding a
// total.
//
// DEFAULTS ARE DECLARED, NEVER INFERRED. `declaredDefault` is non-null only
// when the attached prose says so outright, in one of two forms:
//
//   # Default: 2592000 (30 days).        -> "2592000 (30 days)."
//   # warn (default) | enforce | off.    -> "warn"
//
// Keep the full Default: paragraph, including wrapped lines: punctuation and
// parentheticals may describe fallback chains or conditional defaults, not
// merely explanations that can safely be discarded.
//
// The second form is the risky one: `(default)` also appears in sentences like
// "all enabled methods are shown (default)", where the preceding word is not a
// value at all. So a `(default)` annotation is accepted only when the token in
// front of it is independently recognizable as a value — it equals the
// variable's own example value, or it is one of the state words the plan
// requires be kept distinct (unset / empty / blank / none / true / false).
// Everything else becomes an `ambiguous-default` diagnostic and leaves
// `declaredDefault` null. Using the example to CONFIRM a default the prose
// already declared is not the same as promoting an example to a default, which
// plan A2 forbids and this module never does.

/** Loose shape: anything a reader might mistake for an assignment. */
export const COVERAGE_RE = /^\s*#?\s*[A-Z_][A-Z0-9_]*=/;

/** Narrow shape: a real declaration, active (`NAME=`) or commented (`#NAME=`). */
const ASSIGNMENT_RE = /^(#?)([A-Z_][A-Z0-9_]*)=(.*)$/;

/** The release annotation, exactly as the application's own tooling writes it. */
const SINCE_RE = /[ \t]+# Since (v[0-9]+\.[0-9]+\.[0-9]+|unreleased)[ \t]*$/;

/** A section banner rule line: `# ═══════...`. */
const BANNER_RE = /^#\s*═+\s*$/;

/** The title line between two banner rules. */
const BANNER_TITLE_RE = /^#\s*(.+?)\s*$/;

/** A comment line (which may be prose, a banner, or a section title). */
const COMMENT_RE = /^\s*#/;

/**
 * `# Default: X` on its own prose line, in the two phrasings the source uses
 * (50 `Default:` and 4 `Default when unset:` at the pinned revision).
 *
 * An explicit alternation rather than `^Default.*:`, so a phrasing nobody has
 * reviewed yields no default instead of a wrong one.
 */
const DECLARED_DEFAULT_RE = /^Default(?: when unset)?:\s*(.+)$/;

/** Tags the file uses to mark key-management behaviour. */
const TAG_RE = /\[(derived|independent|federation|deprecated)\]/g;

/**
 * Value words the `(default)` form may name instead of a literal.
 *
 * These are states, not values, and plan A2 requires keeping them distinct
 * from each other and from a literal. Accepting them by name is how
 * "Unset (default) = the canonical hosts" becomes a recorded fact rather than
 * a guess.
 */
const STATE_WORDS = new Set(["unset", "empty", "blank", "none", "true", "false"]);

/**
 * Section titles are shouted in the source. Title-casing reads better as a
 * heading, but a naive capitalize turns SSO into "Sso". This table is lifted
 * from the upstream generator (tools/envref/src/envref/docsgen.py) unchanged,
 * because the published section headings — and therefore the existing page
 * fragments like `#secrets--cryptography` — are whatever it produced.
 */
const ACRONYMS = {
  API: "API",
  AWS: "AWS",
  CORS: "CORS",
  CSP: "CSP",
  DNS: "DNS",
  HTTP: "HTTP",
  IP: "IP",
  OIDC: "OIDC",
  OMNIAUTH: "OmniAuth",
  SMTP: "SMTP",
  SSL: "SSL",
  SSO: "SSO",
  TTL: "TTL",
  UI: "UI",
  URL: "URL",
};

/**
 * Section slug -> classification, for the sections the plan treats as outside
 * the supported configuration surface.
 */
const SECTION_CLASSIFICATION = {
  "development-only": "development-only",
  "experimental-features": "experimental",
  compatibility: "compatibility",
};

/** `SSO / OMNIAUTH` -> `SSO / OmniAuth`. */
export function sectionHeading(rawTitle) {
  return rawTitle
    .split(" ")
    .filter((word) => word !== "")
    .map((word) =>
      word
        .split("-")
        .map((part) => ACRONYMS[part.toUpperCase()] ?? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("-"),
    )
    .join(" ");
}

/** A stable slug for a section, used for classification and record grouping. */
export function sectionSlug(rawTitle) {
  return rawTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Strip indentation, one `#` and at most one following space from a comment line. */
function uncomment(line) {
  return line.replace(/^\s*#[ \t]?/, "").replace(/\s+$/, "");
}

/**
 * Does a value that starts quoted have a closing quote?
 *
 * This is reference text, not shell syntax: quotes inside an unquoted value
 * (such as `it's fine`) are literal characters. Only a leading quote starts
 * a quoted value. Backslashes escape the next character inside double quotes.
 */
function quotesBalanced(value) {
  const text = value.trimStart();
  const quote = text[0];
  if (quote !== '"' && quote !== "'") return true;
  for (let i = 1; i < text.length; i++) {
    const char = text[i];
    if (quote === '"' && char === "\\") {
      i++;
      continue;
    }
    if (char === quote) return true;
  }
  return false;
}

/** Does this value end in an unquoted backslash continuation? */
function continues(value) {
  if (!value.endsWith("\\")) return false;
  const backslashes = value.length - value.replace(/\\+$/, "").length;
  return backslashes % 2 === 1 && quotesBalanced(value.slice(0, -1));
}

/**
 * The declared default stated by an attached prose block, or null.
 *
 * @param {string[]} prose Uncommented prose lines, in file order.
 * @param {string} exampleValue
 * @returns {{value: string, form: "default-colon"|"default-parenthetical", evidence: string}
 *   | {ambiguous: string, evidence: string} | null}
 */
export function declaredDefaultFrom(prose, exampleValue) {
  for (const [index, line] of prose.entries()) {
    const match = line.match(DECLARED_DEFAULT_RE);
    if (!match) continue;
    // Preserve the whole paragraph rather than guess where a value ends and
    // explanation begins. Wrapped prose may complete a conditional default.
    const paragraph = [line];
    for (let i = index + 1; i < prose.length && prose[i].trim() !== ""; i++) {
      paragraph.push(prose[i]);
    }
    const value = [match[1], ...paragraph.slice(1)].join(" ").trim();
    if (value !== "") {
      return { value, form: "default-colon", evidence: paragraph.join("\n") };
    }
  }

  const example = exampleValue.replace(/^["']|["']$/g, "").trim().toLowerCase();
  for (const line of prose) {
    const match = line.match(/(\S+)\s+\(default\)/);
    if (!match) continue;
    const token = match[1].replace(/^["'(]+|["')]+$/g, "");
    const normalized = token.toLowerCase();
    if (normalized === "") continue;
    const literal = /^[a-z0-9_.$/-]+$/.test(normalized);
    if (literal && (normalized === example || STATE_WORDS.has(normalized))) {
      return { value: token, form: "default-parenthetical", evidence: line };
    }
    return { ambiguous: token, evidence: line };
  }
  return null;
}

/**
 * Parse `.env.reference` text into normalized records.
 *
 * @param {string} text
 * @param {{sourceName?: string}} [options]
 * @returns {{
 *   sourceName: string,
 *   headerLines: string[],
 *   sections: {rawTitle: string, heading: string, slug: string, classification: string,
 *              prose: string[], lineStart: number, lineEnd: number, records: object[]}[],
 *   records: object[],
 *   diagnostics: {kind: string, line: number, name: string|null, detail: string, raw: string}[],
 *   totalRecognized: number,
 * }}
 */
export function parseEnvReference(text, { sourceName = ".env.reference" } = {}) {
  const lines = text.split("\n");
  const diagnostics = [];
  const records = [];
  const sections = [];
  const headerLines = [];
  const seenNames = new Map();

  let current = null; // the open section, or null while in the header
  let comment = []; // {line, text} run of comment lines directly above
  let blankAfterComment = false;

  const push = (kind, line, name, detail, raw) =>
    diagnostics.push({ kind, line, name, detail, raw });

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // --- section banner ---------------------------------------------------
    if (BANNER_RE.test(line) && i + 2 < lines.length && BANNER_RE.test(lines[i + 2])) {
      const titleMatch = lines[i + 1].match(BANNER_TITLE_RE);
      if (!titleMatch) {
        throw new Error(
          `${sourceName}:${lineNumber + 1}: section banner with no title (${JSON.stringify(lines[i + 1])})`,
        );
      }
      if (current) current.lineEnd = lineNumber - 1;
      const rawTitle = titleMatch[1];
      const slug = sectionSlug(rawTitle);
      current = {
        rawTitle,
        heading: sectionHeading(rawTitle),
        slug,
        classification: SECTION_CLASSIFICATION[slug] ?? "supported",
        prose: [],
        lineStart: lineNumber,
        lineEnd: lines.length,
        records: [],
      };
      sections.push(current);
      comment = [];
      blankAfterComment = false;
      i += 2;
      continue;
    }

    // --- assignment -------------------------------------------------------
    const assignment = line.match(ASSIGNMENT_RE);
    if (assignment) {
      const [, hash, name, rest] = assignment;
      const active = hash === "";

      const sinceMatch = rest.match(SINCE_RE);
      const since = sinceMatch ? sinceMatch[1] : null;
      let value = sinceMatch ? rest.slice(0, sinceMatch.index) : rest;

      // Multiline values: a trailing unquoted backslash continues onto the
      // next line. The source file at this revision has none, so this exists
      // for the fixture and for the next revision that grows one.
      let lineEnd = lineNumber;
      const continuation = [];
      while (continues(value) && lineEnd < lines.length) {
        continuation.push(lines[lineEnd]);
        value = `${value.slice(0, -1)}\n${lines[lineEnd]}`;
        lineEnd++;
      }

      const raw = [line, ...continuation].join("\n");
      const prose = blankAfterComment ? [] : comment.map((entry) => entry.text);
      const proseStart = prose.length > 0 ? comment[0].line : lineNumber;

      if (blankAfterComment && comment.length > 0) {
        push(
          "ambiguous-comment-attachment",
          lineNumber,
          name,
          `a comment block ends at line ${comment[comment.length - 1].line} with a blank line before this assignment, so it is not attached as this variable's prose`,
          line,
        );
      }

      const tags = [];
      for (const joined of prose) {
        TAG_RE.lastIndex = 0;
        for (const tag of joined.matchAll(TAG_RE)) tags.push(tag[1]);
      }

      const defaultFound = declaredDefaultFrom(prose, value);
      let declaredDefault = null;
      if (defaultFound && defaultFound.ambiguous !== undefined) {
        push(
          "ambiguous-default",
          lineNumber,
          name,
          `prose says "(default)" after ${JSON.stringify(defaultFound.ambiguous)}, which is not recognizable as a value — no default recorded (evidence: ${JSON.stringify(defaultFound.evidence)})`,
          line,
        );
      } else if (defaultFound) {
        declaredDefault = {
          value: defaultFound.value,
          form: defaultFound.form,
          evidence: defaultFound.evidence,
        };
      }

      let classification = current ? current.classification : "supported";
      if (!quotesBalanced(value)) {
        classification = "malformed";
        push(
          "malformed-assignment",
          lineNumber,
          name,
          "unbalanced quotes in the value, so the intended value cannot be read",
          line,
        );
      }
      const first = seenNames.get(name);
      if (first !== undefined) {
        // Precedence: malformed beats duplicate beats the section's own
        // classification. A dev-only repeat of a supported name is reported
        // under both headings in the coverage report and excluded once.
        if (classification !== "malformed") classification = "duplicate";
        push(
          "duplicate-name",
          lineNumber,
          name,
          `already declared at line ${first}`,
          line,
        );
      } else {
        seenNames.set(name, lineNumber);
      }

      const record = {
        id: null, // minted by the caller via ids.mjs, which owns collisions
        name,
        section: current ? current.heading : null,
        sectionSlug: current ? current.slug : null,
        lineStart: lineNumber,
        lineEnd,
        proseStart,
        raw,
        active,
        commented: !active,
        exampleValue: value,
        since,
        prose,
        tags: [...new Set(tags)],
        declaredDefault,
        classification,
        firstDeclaredAt: first ?? null,
      };
      records.push(record);
      if (current) current.records.push(record);
      else {
        push(
          "assignment-outside-section",
          lineNumber,
          name,
          "declared before the first section banner, so it has no owning section",
          line,
        );
      }

      comment = [];
      blankAfterComment = false;
      i = lineEnd - 1;
      continue;
    }

    // --- comment or blank -------------------------------------------------
    if (COMMENT_RE.test(line)) {
      if (blankAfterComment) {
        comment = [];
        blankAfterComment = false;
      }
      comment.push({ line: lineNumber, text: uncomment(line) });
      if (!current) headerLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      if (comment.length > 0) blankAfterComment = true;
      if (!current) headerLines.push(line);
      continue;
    }

    // Anything else: not a comment, not blank, not an assignment this module
    // recognizes. Recorded rather than ignored.
    if (COVERAGE_RE.test(line)) {
      push("malformed-assignment", lineNumber, null, "not a recognized assignment", line);
    } else {
      push("unrecognized-line", lineNumber, null, "neither a comment, a blank line nor an assignment", line);
    }
    comment = [];
    blankAfterComment = false;
  }

  if (current) current.lineEnd = lines.length;

  // Section prose: the comment block that follows the banner and is not
  // attached to a variable. "# Site-wide client IP resolution (config
  // site.network.trusted_proxy)." under REVERSE PROXY / CLIENT IP is section
  // context, not SECRET's description.
  for (const section of sections) {
    const firstRecord = section.records[0];
    const limit = firstRecord ? firstRecord.proseStart : section.lineEnd + 1;
    const prose = [];
    for (let n = section.lineStart + 3; n < limit; n++) {
      const line = lines[n - 1];
      if (line === undefined) break;
      if (COMMENT_RE.test(line)) prose.push(uncomment(line));
      else if (line.trim() === "" && prose.length > 0) prose.push("");
    }
    while (prose.length > 0 && prose[prose.length - 1] === "") prose.pop();
    section.prose = prose;
  }

  // Every loose match is accounted: a record, or a prose mention.
  let totalRecognized = 0;
  for (const [i, line] of lines.entries()) {
    if (!COVERAGE_RE.test(line)) continue;
    totalRecognized++;
    const lineNumber = i + 1;
    const isRecord = records.some((record) => record.lineStart === lineNumber);
    const isDiagnosed = diagnostics.some(
      (d) => d.line === lineNumber && (d.kind === "malformed-assignment" || d.kind === "prose-reference"),
    );
    if (!isRecord && !isDiagnosed) {
      const name = line.match(/([A-Z_][A-Z0-9_]*)=/)?.[1] ?? null;
      push(
        "prose-reference",
        lineNumber,
        name,
        "comment prose mentioning a variable mid-sentence, not a declaration",
        line,
      );
    }
  }

  if (sections.length === 0) {
    throw new Error(`${sourceName}: no \`# ═══\` section banners — nothing to extract`);
  }

  return { sourceName, headerLines, sections, records, diagnostics, totalRecognized };
}

/**
 * Which records are published, which are excluded and why, which are
 * unresolved — and an assertion that those three add up.
 *
 * The assertion is the point. Plan A2 forbids hard-coding a historical total,
 * so the only way to know the extraction saw everything is to make the sum a
 * computed invariant and fail when it breaks.
 *
 * @param {ReturnType<typeof parseEnvReference>} parsed
 * @returns {object}
 */
export function coverageReport(parsed) {
  const published = [];
  const excluded = [];
  const unresolved = [];

  const EXCLUSION_REASONS = {
    "development-only": "development-only section: not part of the supported configuration surface",
    duplicate: "repeated declaration of a name declared earlier in the file",
    malformed: "the assignment could not be read reliably",
  };

  for (const record of parsed.records) {
    if (record.sectionSlug === null) {
      unresolved.push({ record, reason: "declared outside every section" });
      continue;
    }
    const reason = EXCLUSION_REASONS[record.classification];
    if (reason) excluded.push({ record, reason, classification: record.classification });
    else published.push(record);
  }

  const proseReferences = parsed.diagnostics.filter((d) => d.kind === "prose-reference");
  const malformedLines = parsed.diagnostics.filter(
    (d) => d.kind === "malformed-assignment" && d.name === null,
  );

  const accounted =
    published.length + excluded.length + unresolved.length + proseReferences.length + malformedLines.length;
  if (accounted !== parsed.totalRecognized) {
    throw new Error(
      `coverage does not add up: ${parsed.totalRecognized} lines match ${COVERAGE_RE}, but ${accounted} are accounted for (${published.length} published + ${excluded.length} excluded + ${unresolved.length} unresolved + ${proseReferences.length} prose references + ${malformedLines.length} malformed lines)`,
    );
  }

  const byReason = new Map();
  for (const entry of excluded) {
    const list = byReason.get(entry.reason) ?? [];
    list.push(entry.record);
    byReason.set(entry.reason, list);
  }

  const bySection = new Map();
  for (const record of published) {
    bySection.set(record.section, (bySection.get(record.section) ?? 0) + 1);
  }

  return {
    totalRecognized: parsed.totalRecognized,
    declarations: parsed.records.length,
    published,
    excluded,
    unresolved,
    proseReferences,
    malformedLines,
    excludedByReason: byReason,
    publishedBySection: bySection,
    active: published.filter((r) => r.active).length,
    commented: published.filter((r) => r.commented).length,
    withDeclaredDefault: published.filter((r) => r.declaredDefault !== null).length,
    withSince: published.filter((r) => r.since !== null).length,
    diagnostics: parsed.diagnostics,
  };
}
