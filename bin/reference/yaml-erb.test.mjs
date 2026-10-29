import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

import {
  ConfigExtractionError,
  OWNER_PAGES,
  assignOwner,
  buildCoverageReport,
  escapePathForId,
  extractAll,
  extractConfigKeys,
  fileShortName,
  parseErbExpression,
  recordId,
  tokenizeErb,
} from './yaml-erb.mjs';

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'yaml');

const PINNED_DEFAULTS = {
  fileName: 'etc/defaults/config.defaults.yaml',
  text: readFileSync(
    new URL('../../vendor/onetimesecret/etc/defaults/config.defaults.yaml', import.meta.url),
    'utf8',
  ),
};

function fixture(name) {
  return readFileSync(join(FIXTURES, name), 'utf8');
}

function extractFixture(name, options = {}) {
  return extractConfigKeys({ text: fixture(name), fileName: name, ...options });
}

function byPath(result, path) {
  const record = result.records.find((candidate) => candidate.path === path);
  if (!record) throw new Error(`no record for ${path}`);
  return record;
}

describe('tokenizeErb', () => {
  it('replaces output spans with an inert placeholder and keeps every offset', () => {
    const text = "host: <%= ENV['HOST'] || 'localhost' %>  # Since v0.24.0\nport: 3000\n";
    const tokenized = tokenizeErb(text, { fileName: 'memory.yaml' });

    expect(tokenized.text).toHaveLength(text.length);
    expect(tokenized.text.split('\n')).toHaveLength(text.split('\n').length);
    expect(tokenized.text).not.toContain('ENV[');
    expect(tokenized.text).toContain('_E0_');
    expect(tokenized.text).toContain('# Since v0.24.0');
    expect(tokenized.spans).toHaveLength(1);
    expect(tokenized.spans[0]).toMatchObject({
      kind: 'output',
      expr: "ENV['HOST'] || 'localhost'",
      line: 1,
      endLine: 1,
      column: 7,
    });
  });

  it('handles the -%> trim marker and ERB comment spans', () => {
    const tokenized = tokenizeErb("a: <%= ENV['A'] -%>\nb: <%# a note %>c\n", { fileName: 'memory.yaml' });
    expect(tokenized.spans[0].expr).toBe("ENV['A']");
    expect(tokenized.spans[1].kind).toBe('comment');
    expect(tokenized.text).not.toContain('a note');
    expect(tokenized.text).toHaveLength("a: <%= ENV['A'] -%>\nb: <%# a note %>c\n".length);
  });

  it('keeps line structure for a span that covers several lines', () => {
    const text = 'uri: >-\n  <%=\n    ENV[\'A\'] ||\n    ENV[\'B\']\n  %>\nnext: 1\n';
    const tokenized = tokenizeErb(text, { fileName: 'memory.yaml' });
    expect(tokenized.text.split('\n')).toHaveLength(text.split('\n').length);
    expect(tokenized.text).toHaveLength(text.length);
    expect(tokenized.text.split('\n').at(-2)).toBe('next: 1');
  });

  it('preserves UTF-16 offsets with emoji before output, comment and structural spans', () => {
    const text =
      "# 🔐 defaults\nname: \"😀<%= ENV['NAME'] %>\"\n" +
      '# 💬 <%# note\ncontinued %>\n<% if enabled %>\nhidden: 1\n<% end %>\ntail: 2\n';
    const tokenized = tokenizeErb(text);
    expect(tokenized.text).toHaveLength(text.length);
    for (let i = 0; i < text.length; i += 1) {
      expect(tokenized.mapOffset(i)).toBe(i);
      if (text[i] === '\n') expect(tokenized.text[i]).toBe('\n');
    }
    expect(tokenized.text).toContain('# 🔐 defaults\nname: "😀_E0_');
    expect(tokenized.text).not.toMatch(/<%|hidden|continued/);
    const result = extractConfigKeys({ text, fileName: 'memory.yaml' });
    expect(byPath(result, 'name')).toMatchObject({
      lineStart: 2,
      rawValue: "\"😀<%= ENV['NAME'] %>\"",
    });
    expect(byPath(result, 'tail')).toMatchObject({ lineStart: 8, rawValue: '2' });
  });

  it.each(['<%=%>', '<%=\n%>'])('keeps minimal spans inert: %s', (raw) => {
    const text = `value: ${raw}\ntail: 2\n`;
    const tokenized = tokenizeErb(text);
    expect(tokenized.text).toHaveLength(text.length);
    expect(tokenized.text.split('\n')).toHaveLength(text.split('\n').length);
    const result = extractConfigKeys({ text, fileName: 'memory.yaml' });
    expect(byPath(result, 'value')).toMatchObject({ rawValue: raw, erbSpanIndexes: [0] });
    expect(byPath(result, 'tail').rawValue).toBe('2');
    expect(result.accounting.unattachedOutput).toBe(0);
  });

  it('keeps short tokens distinct and maps offsets after expanded multiline placeholders', () => {
    // Base-36 indices 10 and 100 exercise the old delimiter-free prefix pair.
    const count = 1298;
    const text =
      '# 😀\n' +
      Array.from({ length: count }, (_, i) => `key${i}: <%=\n%>\n`).join('') +
      '<% if enabled %>\nhidden: 1\n<% end %>\n# tail comment\ntail: 2 # Since v1.2.3\n';
    const tokenized = tokenizeErb(text);
    const tokens = tokenized.spans
      .filter((span) => span.kind === 'output')
      .map((span) => span.token);
    expect(new Set(tokens).size).toBe(count);
    for (const token of tokens) {
      expect(tokens.some((other) => other !== token && other.startsWith(token))).toBe(false);
    }
    expect(tokenized.text.split('\n')).toHaveLength(text.split('\n').length);
    expect(tokenized.text).not.toMatch(/<%|hidden/);
    for (const suffix of ['# tail comment', 'tail: 2', '# Since v1.2.3']) {
      expect(tokenized.mapOffset(tokenized.text.indexOf(suffix))).toBe(text.indexOf(suffix));
    }
    expect(tokenized.mapOffset(tokenized.text.length)).toBe(text.length);
    const result = extractConfigKeys({ text, fileName: 'memory.yaml' });
    expect(result.records).toHaveLength(count + 1);
    expect(result.accounting.classifiedOutput).toBe(count);
    expect(result.accounting.unattachedOutput).toBe(0);
    for (const i of [0, 36, 1296, 1297]) {
      expect(byPath(result, `key${i}`)).toMatchObject({
        rawValue: '<%=\n%>',
        erbSpanIndexes: [i],
        lineStart: 2 + i * 2,
      });
    }
    expect(byPath(result, 'tail')).toMatchObject({
      rawValue: '2',
      lineStart: count * 2 + 6,
      comment: '# tail comment',
      since: 'v1.2.3',
    });
  });

  it('rejects an unterminated span', () => {
    expect(() => tokenizeErb("a: <%= ENV['A']\n", { fileName: 'memory.yaml' })).toThrow(/Unterminated ERB span/);
  });

  it('rejects an unbalanced block', () => {
    expect(() => tokenizeErb("<% if ENV['A'] %>\na: 1\n", { fileName: 'memory.yaml' })).toThrow(
      /Unterminated ERB block/,
    );
    expect(() => tokenizeErb('<% end %>\n', { fileName: 'memory.yaml' })).toThrow(/Unbalanced ERB/);
  });
});

describe('structure extraction', () => {
  const result = extractFixture('structure.yaml');

  it('walks nested mappings and sequences of mappings', () => {
    expect(byPath(result, 'site.host').literalValue).toBe('localhost:3000');
    expect(byPath(result, 'site.interface.ui.links[0].text').literalValue).toBe('API Docs');
    expect(byPath(result, 'site.interface.ui.links[1].url').literalValue).toBe('/feedback');
    expect(byPath(result, 'site.paths[1]').literalValue).toBe('/status');
  });

  it('reads literal and folded block scalars', () => {
    expect(byPath(result, 'site.banner').literalValue).toBe('first line\nsecond line\n');
    expect(byPath(result, 'site.banner').lineStart).toBe(14);
    expect(byPath(result, 'site.banner').lineEnd).toBe(16);
    expect(byPath(result, 'site.summary').literalValue).toBe('folded line one folded line two\n');
  });

  it('keeps the preceding comment block verbatim and reads the Since marker', () => {
    const host = byPath(result, 'site.host');
    expect(host.comment).toBe('  # The public host and port.\n  # Two comment lines, both preserved.');
    expect(host.since).toBe('v0.24.0');
    expect(byPath(result, 'site.interface.ui.links[1].url').since).toBe('v0.25.0');
    expect(byPath(result, 'site.summary').since).toBeNull();
  });

  it('keeps unset, blank, null and empty collections distinct', () => {
    expect(byPath(result, 'site.unset_value').literalValue).toBeNull();
    expect(byPath(result, 'site.unset_value').rawValue).toBe('');
    expect(byPath(result, 'site.blank_value').literalValue).toBe('');
    expect(byPath(result, 'site.blank_value').rawValue).toBe("''");
    expect(byPath(result, 'site.null_value').literalValue).toBeNull();
    expect(byPath(result, 'site.null_value').rawValue).toBe('null');
    expect(byPath(result, 'site.empty_map').literalValue).toEqual({});
    expect(byPath(result, 'site.empty_seq').literalValue).toEqual([]);
  });

  it('records no ERB for a literal file', () => {
    expect(result.records.every((record) => record.erb === null)).toBe(true);
    expect(result.accounting.totalSpans).toBe(0);
  });
});

describe('parse rejections', () => {
  it('rejects duplicate keys', () => {
    expect(() => extractFixture('duplicate-keys.yaml')).toThrow(ConfigExtractionError);
    expect(() => extractFixture('duplicate-keys.yaml')).toThrow(/Map keys must be unique/);
  });

  it('accepts an anchor and alias pair', () => {
    const result = extractFixture('alias-ok.yaml');
    expect(byPath(result, 'defaults.level').literalValue).toBe('warn');
    expect(byPath(result, 'loggers.app').literalValue).toEqual({ level: 'warn' });
  });

  it('rejects nested aliases beyond the bound', () => {
    expect(() => extractFixture('alias-bomb.yaml', { maxAliasCount: 20 })).toThrow(/alias count/i);
  });

  it('rejects an unknown tag', () => {
    expect(() => extractFixture('unknown-tag.yaml')).toThrow(/Unresolved tag/);
  });

  it('reports rejections through extractAll instead of aborting the run', () => {
    const entries = extractAll([
      { fileName: 'duplicate-keys.yaml', text: fixture('duplicate-keys.yaml') },
      { fileName: 'alias-ok.yaml', text: fixture('alias-ok.yaml') },
    ]);
    expect(entries[0].ok).toBe(false);
    expect(entries[0].error.diagnostics.some((diagnostic) => diagnostic.kind === 'yaml-error')).toBe(true);
    expect(entries[1].ok).toBe(true);
  });
});

describe('expression grammar', () => {
  const result = extractFixture('grammar.yaml');
  const erb = (path) => byPath(result, path).erb;

  it('reads a plain environment variable with either quote style', () => {
    expect(erb('reads.plain_single')).toMatchObject({
      kind: 'env-read',
      envReads: ['PLAIN_SINGLE'],
      staticFallback: null,
      unsetBehaviour: 'nil',
    });
    expect(erb('reads.plain_double').envReads).toEqual(['PLAIN_DOUBLE']);
  });

  it('reads ENV.fetch with a literal default', () => {
    expect(erb('reads.fetch_literal')).toMatchObject({
      kind: 'env-fallback',
      envReads: ['FETCH_LITERAL'],
      staticFallback: 'fallback',
      unsetBehaviour: 'static fallback',
    });
    expect(erb('reads.fetch_empty').staticFallback).toBe('');
    expect(erb('reads.fetch_empty').notes).toContain('fallback is an empty string, not unset');
  });

  it('reads literal fallbacks of each scalar type', () => {
    expect(erb('fallbacks.string').staticFallback).toBe('literal');
    expect(erb('fallbacks.number').staticFallback).toBe(3600);
    expect(erb('fallbacks.float').staticFallback).toBe(0.25);
    expect(erb('fallbacks.yes_literal').staticFallback).toBe(true);
    expect(erb('fallbacks.no_literal').staticFallback).toBe(false);
  });

  it('distinguishes an explicit nil fallback from a value fallback', () => {
    expect(erb('fallbacks.explicit_nil')).toMatchObject({
      kind: 'env-read',
      staticFallback: null,
      unsetBehaviour: 'nil',
    });
    expect(erb('fallbacks.explicit_nil').notes).toContain('explicit nil fallback in source');
    expect(erb('fallbacks.parenthesised')).toMatchObject({ kind: 'env-read', envReads: ['FB_PARENS'] });
  });

  it('keeps ordered alternatives in evaluation order', () => {
    expect(erb('fallbacks.ordered')).toMatchObject({
      kind: 'env-fallback',
      envReads: ['FB_FIRST', 'FB_SECOND'],
      staticFallback: 'last',
    });
    expect(erb('fallbacks.ordered').notes).toContain('ordered alternatives');
    expect(erb('fallbacks.ordered_nil')).toMatchObject({
      envReads: ['FB_ONE', 'FB_TWO'],
      staticFallback: null,
      unsetBehaviour: 'nil',
    });
  });

  it('records that a Ruby empty string is truthy for fallbacks', () => {
    expect(erb('fallbacks.string').notes).toContain('ruby-empty-string-is-truthy');
  });

  it('records boolean polarity in both directions', () => {
    expect(erb('booleans.equals_true')).toMatchObject({
      kind: 'boolean',
      polarity: 'equals-true',
      truthyWhen: "ENV['BOOL_EQ_TRUE'] == 'true'",
      defaultWhenUnset: false,
    });
    expect(erb('booleans.not_equals_false')).toMatchObject({
      kind: 'boolean',
      polarity: 'not-equals-false',
      truthyWhen: "ENV['BOOL_NE_FALSE'] != 'false'",
      defaultWhenUnset: true,
    });
  });

  it('records an explicit boolean fallback and multi-variable polarity', () => {
    expect(erb('booleans.equals_true_or_false')).toMatchObject({
      kind: 'boolean',
      polarity: 'equals-true',
      staticFallback: false,
      defaultWhenUnset: false,
    });
    expect(erb('booleans.any_equals_true')).toMatchObject({
      kind: 'boolean',
      polarity: 'any-equals-true',
      envReads: ['BOOL_A', 'BOOL_B'],
      defaultWhenUnset: false,
    });
    expect(erb('booleans.fetch_compare')).toMatchObject({
      kind: 'boolean',
      envReads: ['BOOL_FETCH'],
      defaultWhenUnset: false,
    });
  });

  it('records the json-quoted blank ternary', () => {
    expect(erb('blank.json_quoted')).toMatchObject({
      kind: 'json-quoted',
      envReads: ['BLANK_JSON'],
      unsetBehaviour: 'nil',
    });
    expect(erb('blank.json_quoted').notes).toEqual(expect.arrayContaining(['json-quoted', 'blank counts as unset']));
  });

  it('treats a blank-guarded boolean as three-state', () => {
    expect(erb('blank.tristate_true')).toMatchObject({
      kind: 'boolean',
      polarity: 'equals-true',
      unsetBehaviour: 'nil',
      defaultWhenUnset: null,
    });
    expect(erb('blank.tristate_false').polarity).toBe('not-equals-false');
  });

  it('treats a blank value as unset when the source strips it', () => {
    expect(erb('blank.strip_fallback')).toMatchObject({
      kind: 'env-fallback',
      envReads: ['BLANK_STRIP'],
      staticFallback: 'sqlite://data/auth.db',
    });
    expect(erb('blank.strip_fallback').notes).toContain('blank counts as unset');
    expect(erb('blank.strip_nil')).toMatchObject({ kind: 'env-read', unsetBehaviour: 'nil' });
  });

  it('records casts', () => {
    expect(erb('casts.integer')).toMatchObject({ kind: 'cast', cast: ['to_i'], envReads: ['CAST_INT'] });
    expect(erb('casts.integer_safe')).toMatchObject({ kind: 'cast', cast: ['to_i'], staticFallback: 5 });
    expect(erb('casts.string').cast).toEqual(['to_s']);
    expect(erb('casts.json').cast).toEqual(['to_json']);
    expect(erb('casts.json').notes).toContain('json-quoted');
    expect(erb('casts.list').cast).toEqual(['split(,)']);
    expect(erb('casts.list_stripped')).toMatchObject({
      kind: 'cast',
      cast: ['split(,)', 'map(&:strip)'],
      staticFallback: [],
    });
    expect(erb('casts.wrapped_list')).toMatchObject({
      kind: 'cast',
      envReads: ['CAST_WRAPPED'],
      cast: ['split(,)', 'map(&:strip)', 'reject(&:empty?)'],
      staticFallback: '',
    });
  });

  it('keeps unsupported expressions verbatim as runtime-defined', () => {
    expect(erb('unsupported.predicate')).toMatchObject({
      kind: 'runtime-defined',
      raw: "File.exist?('x') ? 1 : 2",
      unsetBehaviour: 'unknown',
    });
    expect(erb('unsupported.include_check').kind).toBe('runtime-defined');
    expect(erb('unsupported.include_check').raw).toBe("['true', '1', 'yes'].include?(ENV['UNSUPPORTED_INCLUDE'])");
    expect(erb('unsupported.compound').kind).toBe('runtime-defined');
    expect(erb('unsupported.multiline').raw).toContain("ENV['UNSUPPORTED_MULTILINE'] ||");
  });

  it('classifies an interpolated value as runtime-defined and keeps the raw value', () => {
    const interpolated = byPath(result, 'unsupported.interpolated_value');
    expect(interpolated.erb.kind).toBe('runtime-defined');
    expect(interpolated.erb.notes[0]).toMatch(/interpolated/);
    expect(interpolated.rawValue).toBe("redis://<%= ENV['UNSUPPORTED_HOST'] %>:6379");
    const twoSpans = byPath(result, 'unsupported.two_spans');
    expect(twoSpans.erb.kind).toBe('runtime-defined');
    expect(twoSpans.erbSpanIndexes).toHaveLength(2);
  });

  it('records literals without an ERB block', () => {
    expect(byPath(result, 'literals.string_literal')).toMatchObject({ erb: null, literalValue: 'lax' });
    expect(byPath(result, 'literals.number_literal').literalValue).toBe(86400);
    expect(byPath(result, 'literals.bool_literal').literalValue).toBe(true);
    expect(byPath(result, 'literals.nil_literal').literalValue).toBeNull();
    expect(byPath(result, 'literals.empty_string').literalValue).toBe('');
    expect(byPath(result, 'literals.blank_key').literalValue).toBeNull();
  });

  it('accounts for every ERB span in the fixture', () => {
    expect(result.accounting.unattachedOutput).toBe(0);
    expect(result.accounting.totalSpans).toBe((fixture('grammar.yaml').match(/<%/g) ?? []).length);
  });

  it('classifies unknown expressions without evaluating them', () => {
    expect(parseErbExpression('Time.now.to_i').kind).toBe('runtime-defined');
    expect(parseErbExpression("ENV['A'].fetch(0)").kind).toBe('runtime-defined');
    expect(parseErbExpression("ENV['A'] || ENV['B'] && 'x'").kind).toBe('runtime-defined');
  });
});

describe('structural ERB', () => {
  const result = extractFixture('structural-if.yaml');

  it('blocks the enclosing section instead of inventing unconditional keys', () => {
    expect(result.structuralBlocks).toHaveLength(2);
    const [cookie, links] = result.structuralBlocks;
    expect(cookie).toMatchObject({
      blockedStructural: true,
      path: 'site.session',
      lineStart: 4,
      lineEnd: 10,
      openerExpr: "if %w[true false].include?(ENV['COOKIE_SECURE'].to_s)",
    });
    expect(cookie.raw).toContain("<% if %w[true false].include?(ENV['COOKIE_SECURE'].to_s) %>");
    expect(cookie.raw).toContain('secure: true');
    expect(cookie.raw).toContain('<% end %>');
    expect(links).toMatchObject({ path: 'site.links', openerExpr: "if ENV['FEEDBACK_ENABLED'] != 'false'" });
  });

  it('extracts no record for a key that only exists inside a branch', () => {
    expect(result.records.some((record) => record.path.endsWith('secure'))).toBe(false);
    expect(result.records.some((record) => record.path.includes('Feedback'))).toBe(false);
  });

  it('keeps extracting the keys outside the blocked block', () => {
    expect(byPath(result, 'site.session.same_site').literalValue).toBe('lax');
    expect(byPath(result, 'site.session.same_site').since).toBe('v0.24.0');
    expect(byPath(result, 'site.links[0].url').literalValue).toBe('/docs');
  });

  it('parses despite the repeated key inside the branches', () => {
    expect(result.diagnostics.filter((diagnostic) => diagnostic.kind === 'yaml-error')).toHaveLength(0);
  });
});

describe('inert handling of dangerous expressions', () => {
  const text = fixture('inert-shell.yaml');
  const result = extractConfigKeys({ text, fileName: 'inert-shell.yaml' });

  it('keeps a shell expression as raw runtime-defined text', () => {
    expect(byPath(result, 'danger.spawned').erb).toMatchObject({
      kind: 'runtime-defined',
      raw: "system('echo inert')",
    });
    expect(byPath(result, 'danger.spawned').rawValue).toBe("<%= system('echo inert') %>");
    expect(byPath(result, 'danger.backticked').erb.raw).toBe('`echo inert`');
    expect(byPath(result, 'danger.interpolated').erb.kind).toBe('runtime-defined');
  });

  it('removes the expression from the text handed to the YAML parser', () => {
    const tokenized = tokenizeErb(text, { fileName: 'inert-shell.yaml' });
    expect(tokenized.text).not.toContain('system(');
    expect(tokenized.text).not.toContain('echo inert');
    expect(tokenized.text).not.toContain('`');
  });

  it('exposes no evaluation path: the module source has no eval or process spawn', () => {
    const source = readFileSync(new URL('./yaml-erb.mjs', import.meta.url), 'utf8');
    expect(source).not.toMatch(/\beval\s*\(/);
    expect(source).not.toMatch(/new Function\s*\(/);
    expect(source).not.toMatch(/child_process|execSync|spawnSync/);
  });
});

describe('comment text with Markdown and HTML characters', () => {
  const result = extractFixture('markdown-comments.yaml');

  it('keeps the raw characters and leaves escaping to the renderer', () => {
    const limit = byPath(result, 'site.limit');
    expect(limit.comment).toBe('  # Values over 100 mean "unlimited" <see docs> | pipe | & ampersand.');
    expect(limit.trailingComment).toBe('# Since v0.26.1 <!-- inline html comment -->');
    expect(limit.since).toBe('v0.26.1');
  });
});

describe('identifiers', () => {
  it('escapes a dotted path deterministically', () => {
    expect(escapePathForId('site.secret_options.ttl_options')).toBe('site.secret-options.ttl-options');
    expect(escapePathForId('site.links[2].url')).toBe('site.links[2].url');
    expect(escapePathForId('Site.Secret')).toBe('site.secret');
    expect(recordId('config', 'site.host')).toBe('config-config-site.host');
    expect(recordId('auth', 'full.restrict_to')).toBe('config-auth-full.restrict-to');
  });

  it('detects and disambiguates colliding identifiers', () => {
    const result = extractFixture('id-collisions.yaml');
    const ids = result.records.map((record) => record.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(['config-id-collisions-section.a-b', 'config-id-collisions-section.a-b-2', 'config-id-collisions-section.a-b-3']);
    expect(result.diagnostics.filter((diagnostic) => diagnostic.kind === 'id-collision')).toHaveLength(2);
  });

  it('maps file names to short names', () => {
    expect(fileShortName('etc/defaults/config.defaults.yaml')).toBe('config');
    expect(fileShortName('fixtures/yaml/config.defaults.v0.26.19.yaml')).toBe('config');
    expect(fileShortName('vendor/onetimesecret/etc/defaults/auth.defaults.yaml')).toBe('auth');
    expect(fileShortName('etc/defaults/logging.defaults.yaml')).toBe('logging');
  });
});

describe('assignOwner', () => {
  it('is a pure function of the file and path', () => {
    expect(assignOwner({ fileShort: 'config', path: 'site.host' })).toBe('site-and-interface');
    expect(assignOwner({ fileShort: 'config', path: 'site.interface.ui.links[0].url' })).toBe('site-and-interface');
    expect(assignOwner({ fileShort: 'config', path: 'site.secret' })).toBe('site-and-interface');
    expect(assignOwner({ fileShort: 'config', path: 'site.secret_options.default_ttl' })).toBe(
      'features-and-branding',
    );
    expect(assignOwner({ fileShort: 'config', path: 'site.authentication.signup' })).toBe('features-and-branding');
    expect(assignOwner({ fileShort: 'config', path: 'brand.product_name' })).toBe('features-and-branding');
    expect(assignOwner({ fileShort: 'config', path: 'features.domains.enabled' })).toBe('features-and-branding');
    expect(assignOwner({ fileShort: 'config', path: 'redis.uri' })).toBe('datastore-and-queues');
    expect(assignOwner({ fileShort: 'config', path: 'jobs.workers.default' })).toBe('datastore-and-queues');
    expect(assignOwner({ fileShort: 'config', path: 'emailer.host' })).toBe('email-and-delivery');
    expect(assignOwner({ fileShort: 'config', path: 'email_providers.ses.region' })).toBe('email-and-delivery');
    expect(assignOwner({ fileShort: 'config', path: 'mail.truemail.default_validation_type' })).toBe(
      'email-and-delivery',
    );
    expect(assignOwner({ fileShort: 'config', path: 'compatibility.deprecated_config_mode' })).toBe(
      'configuration-files-and-precedence',
    );
    expect(assignOwner({ fileShort: 'config', path: 'development.debug' })).toBe(
      'configuration-files-and-precedence',
    );
    expect(assignOwner({ fileShort: 'auth', path: 'full.restrict_to' })).toBe('auth-logging-and-billing-files');
    expect(assignOwner({ fileShort: 'logging', path: 'loggers.app.level' })).toBe('auth-logging-and-billing-files');
  });

  it('routes the billing example to the ancillary-files page', () => {
    expect(assignOwner({ fileShort: 'billing', path: 'plans.free' })).toBe(
      'auth-logging-and-billing-files',
    );
  });

  it('returns unassigned for a file with no rules', () => {
    expect(assignOwner({ fileShort: 'unknown', path: 'anything.at.all' })).toBe('unassigned');
  });

  it('gives every record exactly one known owner', () => {
    const result = extractConfigKeys(PINNED_DEFAULTS);
    for (const record of result.records) {
      expect([...OWNER_PAGES, 'unassigned']).toContain(record.owner);
    }
  });
});

describe('stability against the pinned defaults file', () => {
  const { fileName: name, text } = PINNED_DEFAULTS;
  const result = extractConfigKeys(PINNED_DEFAULTS);

  it('parses with no duplicate-key or tag diagnostics', () => {
    expect(result.diagnostics.filter((diagnostic) => diagnostic.kind === 'yaml-error')).toHaveLength(0);
    expect(result.diagnostics.filter((diagnostic) => diagnostic.kind === 'yaml-tag')).toHaveLength(0);
    expect(result.diagnostics.filter((diagnostic) => diagnostic.kind === 'id-collision')).toHaveLength(0);
  });

  it('sees every ERB span in the file', () => {
    const occurrences = (text.match(/<%/g) ?? []).length;
    expect(result.accounting.totalSpans).toBe(occurrences);
    expect(result.accounting.output + result.accounting.structural + result.accounting.comment).toBe(occurrences);
  });

  it('accounts for every output span as parsed, blocked or commented out', () => {
    const { accounting } = result;
    expect(accounting.unattachedOutput).toBe(0);
    expect(
      accounting.classifiedOutput + accounting.outputInsideStructuralBlocks + accounting.outputInYamlComments,
    ).toBe(accounting.output);
  });

  it('classifies every ERB-backed key as a grammar kind or runtime-defined', () => {
    const kinds = new Set(['env-read', 'env-fallback', 'boolean', 'json-quoted', 'cast', 'runtime-defined']);
    for (const record of result.records) {
      if (record.erb) expect(kinds).toContain(record.erb.kind);
    }
  });

  it('gives every key a unique identifier and a line range inside the file', () => {
    const lineCount = text.split('\n').length;
    const ids = result.records.map((record) => record.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const record of result.records) {
      expect(record.lineStart).toBeGreaterThanOrEqual(1);
      expect(record.lineEnd).toBeGreaterThanOrEqual(record.lineStart);
      expect(record.lineEnd).toBeLessThanOrEqual(lineCount);
    }
  });

  it('is deterministic across runs', () => {
    const again = extractConfigKeys({ text, fileName: name });
    expect(JSON.stringify(again.records)).toBe(JSON.stringify(result.records));
  });

  it('reports the known structural blocks rather than silently dropping them', () => {
    expect(result.structuralBlocks.map((block) => block.path)).toEqual([
      'site.interface.ui.workspace_links.links',
      'site.session',
    ]);
  });
});

describe('buildCoverageReport', () => {
  const entries = extractAll([
    PINNED_DEFAULTS,
    { fileName: 'structural-if.yaml', text: fixture('structural-if.yaml') },
    { fileName: 'duplicate-keys.yaml', text: fixture('duplicate-keys.yaml') },
  ]);
  const markdown = buildCoverageReport(entries);

  it('reports counts, kinds, blocks, diagnostics and precedence evidence', () => {
    expect(markdown).toContain('## Keys per file');
    expect(markdown).toContain('## Keys per destination page');
    expect(markdown).toContain('## ERB kind histogram');
    expect(markdown).toContain('## Runtime-defined expressions');
    expect(markdown).toContain('## Blocked structural blocks');
    expect(markdown).toContain('## Unassigned keys');
    expect(markdown).toContain('## Diagnostics');
    expect(markdown).toContain('## Precedence evidence');
    expect(markdown).toContain('onetimesecret/lib/onetime/config.rb:362-412');
    expect(markdown).toContain('failed extraction');
    expect(markdown).toContain("if %w[true false].include?(ENV['SESSION_COOKIE_SECURE'].to_s)");
  });

  it.each([
    'plain|pipe.yaml',
    'one\\|pipe.yaml',
    'two\\\\|pipe.yaml',
    'three\\\\\\|pipe.yaml',
    'path\\without-pipe.yaml',
    'trailing\\',
    'one`tick|pipe.yaml',
    'two``ticks|pipe.yaml',
    'html<&>\\|pipe.yaml',
  ])('preserves table code values without splitting cells: %s', (fileName) => {
    const report = buildCoverageReport(extractAll([{ fileName, text: 'key: 1\n' }]));
    const tree = unified().use(remarkParse).use(remarkGfm).parse(report);
    const tables = tree.children.filter((node) => node.type === 'table');
    for (const [index, columns] of [
      [0, 6],
      [1, 9],
    ]) {
      const row = tables[index].children[1];
      expect(row.children).toHaveLength(columns);
      const content = row.children[0].children;
      expect(
        content
          .filter((node) => node.type !== 'html')
          .map((node) => node.value)
          .join(''),
      ).toBe(fileName);
      expect(
        content.every((node) => node.type === 'inlineCode') ||
          (content[0].value === '<code>' && content.at(-1).value === '</code>'),
      ).toBe(true);
    }
  });

  it('does not add table escapes to inline code outside tables', () => {
    const fileName = 'path\\|pipe.yaml';
    const report = buildCoverageReport(extractAll([{ fileName, text: 'key: 1\n' }]));
    const tree = unified().use(remarkParse).use(remarkGfm).parse(report);
    const headingIndex = tree.children.findIndex(
      (node) => node.type === 'heading' && node.children[0].value === 'Unassigned keys',
    );
    const code = tree.children[headingIndex + 1].children[0].children[0].children[0];
    expect(code).toMatchObject({ type: 'inlineCode', value: `${fileShortName(fileName)}:key` });
  });

  it('is deterministic', () => {
    expect(buildCoverageReport(entries)).toBe(markdown);
  });
});
