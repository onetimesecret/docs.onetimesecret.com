// src/components/config-generator/generate.test.ts
//
// Unit coverage for the Configuration Generator's pure logic. generate.ts is
// dependency-light and side-effect-free, so these tests exercise the whole
// path-writing / dependency / env-emission / URL round-trip surface directly.

import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import {
  coerce,
  defaultFor,
  defaultSelections,
  envSnippet,
  generate,
  toQuery,
  type Selections,
} from './generate';
import { OPTIONS } from './presets';

const opt = (key: string) => {
  const found = OPTIONS.find((o) => o.key === key);
  if (!found) throw new Error(`no option ${key}`);
  return found;
};

describe('defaultFor', () => {
  it('reads a scalar default from the schema when present', () => {
    // emailer.mode carries "smtp" as its schema default.
    expect(defaultFor(opt('email_provider'))).toBe('smtp');
    // auth.mode schema default.
    expect(defaultFor(opt('deployment_mode'))).toBe('simple');
  });

  it('falls back to the manifest default when the schema has none', () => {
    // default_ttl has no schema default; site.network isn't in the schema.
    expect(defaultFor(opt('default_ttl'))).toBe(604800);
    expect(defaultFor(opt('trusted_proxy_enabled'))).toBe(false);
  });
});

describe('coerce', () => {
  it('coerces booleans from URL-ish strings', () => {
    const o = opt('domains_enabled');
    expect(coerce(o, 'true')).toBe(true);
    expect(coerce(o, '1')).toBe(true);
    expect(coerce(o, 'yes')).toBe(true);
    expect(coerce(o, 'false')).toBe(false);
    expect(coerce(o, 'garbage')).toBe(false);
  });

  it('accepts only known select choices, else falls back to the default', () => {
    const o = opt('default_ttl');
    // Query values arrive as strings; a valid choice round-trips to its number.
    expect(coerce(o, '300')).toBe(300);
    expect(coerce(o, '999')).toBe(604800); // not a choice → default
  });

  it('returns the default for null/undefined raw values', () => {
    expect(coerce(opt('email_provider'), null)).toBe('smtp');
    expect(coerce(opt('email_provider'), undefined)).toBe('smtp');
  });
});

describe('generate — all defaults', () => {
  const result = generate(defaultSelections());

  it('emits no warnings', () => {
    expect(result.warnings).toEqual([]);
  });

  it('writes auth.mode: simple (never an empty auth fragment)', () => {
    expect(parse(result.authYaml)).toEqual({ mode: 'simple' });
  });

  it('writes every mapped config path at its default value', () => {
    // generate() writes all options unconditionally (unlike toQuery, which
    // strips defaults). Locking this in guards against a silent change to a
    // diff-only emitter.
    expect(parse(result.configYaml)).toEqual({
      emailer: { mode: 'smtp' },
      features: { domains: { enabled: false }, regions: { enabled: false } },
      diagnostics: { enabled: false },
      site: {
        network: { trusted_proxy: { enabled: false } },
        secret_options: { passphrase: { required: false }, default_ttl: 604800 },
      },
    });
  });

  it('env starter always leads with SECRET= and includes the smtp placeholders', () => {
    const lines = result.envSnippet.split('\n');
    const firstVar = lines.find((l) => l.includes('='));
    expect(firstVar).toBe('SECRET=');
    expect(result.envSnippet).toContain('SMTP_HOST=');
    expect(result.envSnippet).toContain('SMTP_PASSWORD=');
    // full-mode-only secrets must not appear in a simple-mode default.
    expect(result.envSnippet).not.toContain('AUTH_DATABASE_URL=');
  });

  it('never emits a value, only blank placeholders', () => {
    for (const line of result.envSnippet.split('\n')) {
      if (line.startsWith('#') || line === '') continue;
      expect(line).toMatch(/^[A-Z0-9_]+=$/);
    }
  });
});

describe('generate — dependency enforcement', () => {
  it('resets sso_enabled and warns when not in full mode', () => {
    const sel: Selections = { ...defaultSelections(), sso_enabled: true };
    const result = generate(sel);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]).toContain('Single sign-on');
    // sso is only written under full.features.sso; simple mode must omit it.
    expect(parse(result.authYaml)).toEqual({ mode: 'simple' });
  });

  it('honours sso_enabled once full mode is selected', () => {
    const sel: Selections = {
      ...defaultSelections(),
      deployment_mode: 'full',
      sso_enabled: true,
    };
    const result = generate(sel);
    expect(result.warnings).toEqual([]);
    expect(parse(result.authYaml)).toMatchObject({
      mode: 'full',
      full: { features: { sso: true } },
    });
  });

  it('surfaces full-mode secrets in the env starter', () => {
    const sel: Selections = { ...defaultSelections(), deployment_mode: 'full' };
    const result = generate(sel);
    expect(result.envSnippet).toContain('AUTH_DATABASE_URL=');
    expect(result.envSnippet).toContain('AUTH_SECRET=');
    expect(result.envSnippet).toContain('ARGON2_SECRET=');
  });
});

describe('generate — prototype-pollution safety', () => {
  it('does not pollute Object.prototype via crafted selection keys', () => {
    // Unknown keys are ignored by generate(); assert no global pollution either
    // way as a regression guard on setPath's inline key checks.
    generate({ '__proto__.polluted': true, 'constructor.x': 1 } as unknown as Selections);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect((Object.prototype as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe('toQuery ↔ seed round-trip', () => {
  it('omits values equal to their default', () => {
    expect(toQuery(defaultSelections())).toEqual({});
  });

  it('serializes only the changed options, and coerce restores them', () => {
    const sel: Selections = {
      ...defaultSelections(),
      domains_enabled: true,
      default_ttl: 300,
      email_provider: 'ses',
    };
    const query = toQuery(sel);
    expect(query).toEqual({
      domains_enabled: 'true',
      default_ttl: '300',
      email_provider: 'ses',
    });

    // Rebuild selections from the query string the way seedFromUrl would.
    const restored = defaultSelections();
    for (const o of OPTIONS) {
      if (o.key in query) restored[o.key] = coerce(o, query[o.key]);
    }
    expect(restored.domains_enabled).toBe(true);
    expect(restored.default_ttl).toBe(300);
    expect(restored.email_provider).toBe('ses');
  });
});
