// bin/reference/ids.mjs
//
// Deterministic record IDs and page anchors for the generated reference.
// Plain Node ESM; no dependencies beyond the existing slug helper.
//
// TWO DIFFERENT THINGS, deliberately not merged:
//
//   id      `env-secret-verifier-mode`   the stable record identity (plan A3)
//   anchor  `#secret_verifier_mode`      the fragment the built page actually has
//
// Plan A3 asks for lower-case `env-` IDs with a checked escaping rule, and
// that is what `envId` mints: it is the key a consolidation ledger, a coverage
// report or a later adapter cites, and it stays stable even if the rendered
// heading changes.
//
// The anchor cannot be chosen. This stack renders Markdown with
// @astrojs/markdown-satteri (Astro's processor in pnpm-lock.yaml), whose
// heading-ids plugin slugs the heading's TEXT and only leaves an id alone when
// some earlier plugin already set one. There is no `{#custom-id}` syntax: rendering
//
//   ### SECRET_VERIFIER_MODE {#env-secret-verifier-mode}
//
// through the installed processor produces
//
//   <h3 id="secret_verifier_mode-env-secret-verifier-mode">
//     SECRET_VERIFIER_MODE {#env-secret-verifier-mode}</h3>
//
// — the braces land in the visible heading and corrupt the slug. So the
// renderer emits a plain `### SECRET_VERIFIER_MODE` and the anchor is whatever
// the slugger makes of it: lower-cased, with underscores PRESERVED (the
// slugger strips punctuation but keeps `_`). Hence `#secret_verifier_mode`,
// not `#secret-verifier-mode`.
//
// `slugifyHeading` is imported rather than restated so the anchors this module
// predicts and the anchors bin/check-frontmatter.mjs looks for are computed by
// one function.
import { slugifyHeading } from "../lib/frontmatter.mjs";

/** Prefix for environment-variable record IDs (plan A3). */
export const ENV_ID_PREFIX = "env-";

/**
 * The shape an environment-variable name must have to get an ID.
 *
 * This is the escaping rule, and it is a whitelist rather than a substitution:
 * an ID is only safe to publish as a fragment and cite in a ledger if every
 * character survives the transform unambiguously. `A-Z`, `0-9` and `_` do;
 * anything else would have to be escaped or dropped, and both of those let two
 * different names collapse onto one ID. So a name outside this shape throws
 * instead, and the caller records it as a diagnostic.
 */
export const ENV_NAME = /^[A-Z_][A-Z0-9_]*$/;

/**
 * Stable record ID for an environment variable.
 *
 * `SECRET_VERIFIER_MODE` -> `env-secret-verifier-mode`.
 *
 * @param {string} name
 * @returns {string}
 */
export function envId(name) {
  if (typeof name !== "string" || !ENV_NAME.test(name)) {
    throw new Error(
      `cannot mint an id for ${JSON.stringify(name)}: an environment-variable name must match ${ENV_NAME} — a name outside that shape needs a diagnostic, not an escaped id`,
    );
  }
  const id = `${ENV_ID_PREFIX}${name.toLowerCase().replace(/_/g, "-")}`;
  // Belt and braces: the whitelist above makes this unreachable, and it stays
  // because the whole value of an explicit ID is that nothing can smuggle a
  // character into a published fragment.
  if (!/^env-[a-z0-9-]+$/.test(id)) {
    throw new Error(`minted id ${JSON.stringify(id)} for ${name} is not a safe fragment`);
  }
  return id;
}

/**
 * The fragment the built page will have for a heading with this text.
 *
 * @param {string} text
 * @returns {string}
 */
export function anchorFor(text) {
  return slugifyHeading(text);
}

/**
 * Reject any collision across a set of published records.
 *
 * Throws on the FIRST collision with both colliding records named, because a
 * collision is a content bug (two records claiming one identity) and silently
 * suffixing one of them is how a deep link starts pointing at the wrong
 * variable. Checks three namespaces: record IDs, page anchors, and anchors
 * against the section headings they sit under.
 *
 * @param {{id: string, name: string, lineStart: number}[]} records
 * @param {{heading: string}[]} [sections=[]]
 * @returns {{ids: Map<string, object>, anchors: Map<string, object>}}
 */
export function assertNoCollisions(records, sections = []) {
  const ids = new Map();
  const anchors = new Map();

  for (const section of sections) {
    const anchor = anchorFor(section.heading);
    const existing = anchors.get(anchor);
    if (existing) {
      throw new Error(
        `anchor collision on "#${anchor}": section "${section.heading}" and section "${existing.heading}" slug the same — rename one section in the source file`,
      );
    }
    anchors.set(anchor, section);
  }

  for (const record of records) {
    const existingId = ids.get(record.id);
    if (existingId) {
      throw new Error(
        `id collision on "${record.id}": ${record.name} (line ${record.lineStart}) and ${existingId.name} (line ${existingId.lineStart}) mint the same record id`,
      );
    }
    ids.set(record.id, record);

    const anchor = anchorFor(record.name);
    const existingAnchor = anchors.get(anchor);
    if (existingAnchor) {
      const where = existingAnchor.heading
        ? `section "${existingAnchor.heading}"`
        : `${existingAnchor.name} (line ${existingAnchor.lineStart})`;
      throw new Error(
        `anchor collision on "#${anchor}": ${record.name} (line ${record.lineStart}) and ${where} produce the same page fragment`,
      );
    }
    anchors.set(anchor, record);
  }

  return { ids, anchors };
}
