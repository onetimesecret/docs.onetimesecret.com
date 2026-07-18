// src/components/config-generator/generate.ts
//
// Pure, dependency-light logic for the Configuration Generator. Turns a set of
// selections into config.yaml / auth.yaml override fragments and a .env starter,
// entirely client-side — no application backend involved.
//
// The vendored JSON schemas (src/components/config-generator/schemas/*.schema.json) are the
// source of truth for defaults and value constraints; the preset manifest
// (presets.ts) supplies the curation and the ENV mapping the schemas don't
// carry. See generateConfig() for how the two combine.

import { stringify } from 'yaml';
import configStaticSchema from './schemas/config-static.schema.json';
import configAuthSchema from './schemas/config-auth.schema.json';
import { OPTIONS, type OptionSpec } from './presets';

type Scalar = string | number | boolean;
type SchemaNode = Record<string, unknown>;

const SCHEMAS: Record<'config' | 'auth', SchemaNode> = {
  config: configStaticSchema as SchemaNode,
  auth: configAuthSchema as SchemaNode,
};

/** Walk a dotted path through a JSON Schema's nested `properties`. */
function schemaNodeAt(file: 'config' | 'auth', path: string): SchemaNode | undefined {
  let node: SchemaNode | undefined = SCHEMAS[file];
  for (const key of path.split('.')) {
    const props = node?.properties as Record<string, SchemaNode> | undefined;
    node = props?.[key];
    if (!node) return undefined;
  }
  return node;
}

/**
 * Resolve an option's effective default: the schema default if present,
 * otherwise the manifest's fallbackDefault. This is what makes the generator
 * "schema-backed" — the numbers/booleans come from the app's Zod shapes, not
 * hard-coded copies, wherever the schema exposes them.
 */
export function defaultFor(opt: OptionSpec): Scalar {
  if (opt.schemaPath) {
    const node = schemaNodeAt(opt.schemaPath.file, opt.schemaPath.path);
    const d = node?.default;
    // Only trust a scalar schema default. If a future schema regeneration emits
    // an object/array default for a mapped path, fall through to fallbackDefault
    // rather than writing a non-scalar into the generated YAML.
    if (typeof d === 'string' || typeof d === 'number' || typeof d === 'boolean') {
      return d;
    }
  }
  return opt.fallbackDefault;
}

/**
 * Derive select choices from a schema enum when the manifest doesn't spell them
 * out. (Currently every select declares explicit, human-labelled choices, so
 * this is a fallback for future options.)
 */
export function choicesFor(opt: OptionSpec): Array<{ value: Scalar; label: string }> {
  if (opt.choices) return opt.choices;
  if (opt.schemaPath) {
    const node = schemaNodeAt(opt.schemaPath.file, opt.schemaPath.path);
    const values = node?.enum as Scalar[] | undefined;
    if (values) return values.map((v) => ({ value: v, label: String(v) }));
  }
  return [];
}

export type Selections = Record<string, Scalar>;

/** Every option at its effective default. */
export function defaultSelections(): Selections {
  const out: Selections = {};
  for (const opt of OPTIONS) out[opt.key] = defaultFor(opt);
  return out;
}

/** Coerce a raw (e.g. URL-query) value to the option's type, or fall back. */
export function coerce(opt: OptionSpec, raw: unknown): Scalar {
  if (raw == null) return defaultFor(opt);
  if (opt.type === 'boolean') {
    return raw === true || ['true', '1', 'yes'].includes(String(raw).toLowerCase());
  }
  const choices = choicesFor(opt);
  const match = choices.find((c) => String(c.value) === String(raw));
  return match ? match.value : defaultFor(opt);
}

// Reject the dangerous prototype-pollution keys before any property write.
// The comparison is spelled out inline at each write site (rather than a
// Set/array lookup) so static analysis recognizes it as a guard on the
// property name. The paths here come from the hard-coded preset manifest, not
// user input, so this is defense-in-depth — but it keeps the writer safe
// regardless of the source.
function setPath(target: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');

  let node = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
    if (typeof node[key] !== 'object' || node[key] == null) node[key] = {};
    node = node[key] as Record<string, unknown>;
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey === '__proto__' || lastKey === 'constructor' || lastKey === 'prototype') return;
  node[lastKey] = value;
}

export interface GenerateResult {
  configYaml: string;
  authYaml: string;
  envSnippet: string;
  warnings: string[];
}

/**
 * A dependent option whose requirement isn't met is reset to its default and a
 * warning is recorded — never a hard error, so a stale shared link degrades
 * gracefully.
 */
function enforceDependencies(selections: Selections): string[] {
  const warnings: string[] = [];
  for (const opt of OPTIONS) {
    if (!opt.requires) continue;
    const unmet = Object.entries(opt.requires).some(([dep, val]) => selections[dep] !== val);
    if (unmet && selections[opt.key] !== defaultFor(opt)) {
      const req = Object.entries(opt.requires)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join(', ');
      warnings.push(`${opt.label} requires ${req}; ignoring the selected value.`);
      selections[opt.key] = defaultFor(opt);
    }
  }
  return warnings;
}

function dumpFragment(doc: Record<string, unknown>): string {
  if (Object.keys(doc).length === 0) return '';
  return stringify(doc);
}

export function generate(rawSelections: Selections): GenerateResult {
  // Normalize + coerce every option, ignoring unknown keys.
  const selections: Selections = {};
  for (const opt of OPTIONS) selections[opt.key] = coerce(opt, rawSelections[opt.key]);

  const warnings = enforceDependencies(selections);

  const config: Record<string, unknown> = {};
  const auth: Record<string, unknown> = {};

  for (const opt of OPTIONS) {
    const value = selections[opt.key];
    const target = opt.file === 'auth' ? auth : config;

    if (opt.key === 'deployment_mode') {
      auth.mode = value;
      continue;
    }
    if (opt.key === 'sso_enabled') {
      // Only meaningful in full mode (enforceDependencies guarantees this).
      if (selections.deployment_mode === 'full') setPath(auth, 'full.features.sso', value);
      continue;
    }
    if (opt.path) setPath(target, opt.path, value);
  }

  return {
    configYaml: dumpFragment(config),
    authYaml: dumpFragment(auth),
    envSnippet: envSnippet(selections),
    warnings,
  };
}

/**
 * Build the .env starter: the secrets and connection details the selected
 * options require, emitted as empty placeholders for the operator to fill in.
 *
 * Only values the operator must supply themselves appear here — never a
 * generated value that could leak through a shared link. Feature toggles and
 * modes are expressed in the config.yaml / auth.yaml above, not here (emitting
 * e.g. `EMAILER_MODE=` blank would override the setting to an empty string).
 * SECRET is always required, so it leads the list.
 */
export function envSnippet(selections: Selections): string {
  const lines = [
    '# Secrets and connection details your selections require — fill these in',
    '# yourself. Never commit the secret values or paste them into a shared',
    '# link. Feature toggles and modes are in the YAML above, not here.',
    'SECRET=',
  ];
  const seen = new Set<string>(['SECRET']);

  for (const opt of OPTIONS) {
    const value = selections[opt.key];
    for (const env of opt.env ?? []) {
      if (env.when !== undefined && env.when !== value) continue;
      if (seen.has(env.name)) continue;
      seen.add(env.name);
      lines.push(`${env.name}=`);
    }
  }
  return lines.join('\n') + '\n';
}

/** Selections → shareable URL query (only non-default values, for short links). */
export function toQuery(selections: Selections): Record<string, string> {
  const query: Record<string, string> = {};
  for (const opt of OPTIONS) {
    const value = selections[opt.key];
    if (value === defaultFor(opt)) continue;
    query[opt.key] = String(value);
  }
  return query;
}
