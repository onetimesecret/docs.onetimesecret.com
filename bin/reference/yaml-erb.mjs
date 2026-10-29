// Static extractor for the application's ERB-templated YAML defaults files.
//
// Contract (Phase 4 plan A2/A3): tokenize ERB spans into inert placeholders,
// parse the result with the `yaml` package under strict options, and emit one
// record per configuration key with its source line range, raw value, parsed
// ERB classification, preceding comment block and `# Since vX.Y.Z` marker.
//
// This module never evaluates anything. There is no `eval`, no `new Function`,
// no template engine and no child process: ERB spans are replaced textually and
// their expressions are matched against a small, tested grammar. Expressions
// outside that grammar are kept verbatim and classified `runtime-defined`.
//
// Input is file text plus a logical file name. The module does no file IO, so
// the caller decides where the text comes from (in production: the byte
// preserved snapshots under `vendor/onetimesecret/`).

import { LineCounter, isAlias, isMap, isScalar, isSeq, parseDocument } from 'yaml';

// ---------------------------------------------------------------------------
// Ownership mapping
// ---------------------------------------------------------------------------

// Each row maps a file (short name) and a dotted path prefix to exactly one
// destination reference page. Matching is longest-prefix within the file, so a
// specific row below overrides the file's catch-all row. One comment per row
// records why that destination owns those keys.
export const OWNERSHIP_RULES = [
  // The separate auth and logging files are the subject of the files page, so
  // every key in them belongs there regardless of topic.
  { file: 'auth', path: '', owner: 'auth-logging-and-billing-files' },
  { file: 'logging', path: '', owner: 'auth-logging-and-billing-files' },

  // Main-file catch-all: an unmatched top-level section is a site record until
  // a row below claims it, which keeps new upstream sections visible rather
  // than silently unassigned.
  { file: 'config', path: '', owner: 'site-and-interface' },

  // site.* is the site and interface surface: identity, URLs, sessions,
  // middleware, network and admin access all describe the deployed site.
  { file: 'config', path: 'site', owner: 'site-and-interface' },
  // site.secret and site.secret_verifier_mode are instance-level identity and
  // verification settings, not feature switches, so they stay with the site.
  { file: 'config', path: 'site.secret', owner: 'site-and-interface' },
  { file: 'config', path: 'site.secret_verifier_mode', owner: 'site-and-interface' },
  // site.secret_options.* are the secret-creation limits and switches
  // (TTL choices, passphrase rules, content ceilings): feature behaviour.
  { file: 'config', path: 'site.secret_options', owner: 'features-and-branding' },
  // site.authentication.* are sign-in feature switches in the main file; the
  // separate auth file keeps its own page.
  { file: 'config', path: 'site.authentication', owner: 'features-and-branding' },

  // brand.* is branding proper.
  { file: 'config', path: 'brand', owner: 'features-and-branding' },
  // features.* is the feature switch tree.
  { file: 'config', path: 'features', owner: 'features-and-branding' },

  // redis.* is the datastore endpoint and logical database assignment.
  { file: 'config', path: 'redis', owner: 'datastore-and-queues' },
  // jobs.* is the broker URL, pools, workers, scheduler and per-job switches.
  { file: 'config', path: 'jobs', owner: 'datastore-and-queues' },

  // emailer.* is the delivery mode and SMTP credentials.
  { file: 'config', path: 'emailer', owner: 'email-and-delivery' },
  // email_providers.* is per-provider API delivery configuration.
  { file: 'config', path: 'email_providers', owner: 'email-and-delivery' },
  // mail.* is address validation applied to outbound mail.
  { file: 'config', path: 'mail', owner: 'email-and-delivery' },

  // internationalization.* selects locales and date presentation: interface.
  { file: 'config', path: 'internationalization', owner: 'site-and-interface' },
  // diagnostics.* (Sentry DSNs and sampling) configures the running site; the
  // files page covers the separate logging file, not this section.
  { file: 'config', path: 'diagnostics', owner: 'site-and-interface' },

  // development.* selects deployment mode behaviour (dev server, debug, dev
  // auth bypasses), which is configuration mechanics rather than site content.
  { file: 'config', path: 'development', owner: 'configuration-files-and-precedence' },
  // compatibility.deprecated_config_mode governs how the config layer reacts to
  // deprecated keys, which is precedence and resolution behaviour.
  { file: 'config', path: 'compatibility', owner: 'configuration-files-and-precedence' },
  // experimental is an extension point of the config file itself.
  { file: 'config', path: 'experimental', owner: 'configuration-files-and-precedence' },
];

export const OWNER_PAGES = [
  'configuration-files-and-precedence',
  'site-and-interface',
  'features-and-branding',
  'datastore-and-queues',
  'email-and-delivery',
  'auth-logging-and-billing-files',
];

// Structured precedence evidence. Read from the loader implementation, not from
// the YAML: the YAML alone does not establish how layers combine. Citations are
// `onetimesecret/<path>:<start>-<end>` at v0.26.19 (e98a88c9b5832bbae249f38885aa28bd78a5db4d).
export const PRECEDENCE_EVIDENCE = [
  {
    claim:
      'The shipped defaults file is the base layer and the deployment file is deep-merged on top, so deployment values win.',
    citations: ['onetimesecret/lib/onetime/config.rb:362-412'],
    detail:
      'Config.load loads etc/defaults/config.defaults.yaml first, then the resolved environment file, then Enumerables.deep_merge(base, env, preserve_nils: false).',
  },
  {
    claim:
      'At the YAML layer an explicit nil in the deployment file means nil; it does not fall back to the defaults file.',
    citations: ['onetimesecret/lib/onetime/config.rb:370-373', 'onetimesecret/lib/onetime/utils/enumerables.rb:29-49'],
    detail:
      'preserve_nils: false selects the branch that lets a nil override win. Enumerables.deep_merge only keeps the base value for a nil override when preserve_nils is true.',
  },
  {
    claim:
      'After the file layers merge, in-code DEFAULTS are merged underneath with nil preservation, so a key that resolves to nil takes the in-code default.',
    citations: ['onetimesecret/lib/onetime/config.rb:472-485', 'onetimesecret/lib/onetime/config.rb:1629-1660'],
    detail:
      'after_load calls deep_merge(DEFAULTS, conf); that merger returns the DEFAULTS value when the loaded value is nil. An empty string is truthy in Ruby and therefore replaces the default.',
  },
  {
    claim:
      'Environment variables take effect through ERB inside the YAML files, so an environment read wins over the file literal only for keys whose value is an ERB environment read.',
    citations: ['onetimesecret/lib/onetime/config.rb:432-445'],
    detail:
      'load_yaml_with_erb renders the file with ERB and then parses it with YAML.safe_load(permitted_classes: [Symbol, Date, Time], aliases: true). Keys with no ERB span cannot be set from the environment.',
  },
  {
    claim: 'Passing an explicit path to Config.load skips the defaults layer entirely.',
    citations: ['onetimesecret/lib/onetime/config.rb:375-403'],
    detail:
      'base_config is only populated when the path argument was nil (using_default_path); with an explicit path the base layer is {} and the single file is used as-is.',
  },
  {
    claim:
      'File resolution order is test-aware, then etc/<name>.yaml, with the defaults file resolved separately from etc/defaults/<name>.defaults.yaml.',
    citations: ['onetimesecret/lib/onetime/utils/config_resolver.rb:36-82'],
    detail:
      'ConfigResolver.resolve checks spec/<name>.test.yaml and apps/**/spec/<name>.test.yaml when RACK_ENV=test, then etc/<name>.yaml. defaults_path checks etc/defaults/<name>.defaults.yaml only.',
  },
  {
    claim:
      'When ConfigResolver finds no main config file, the search falls back to fixed service or utility directories.',
    citations: ['onetimesecret/lib/onetime/config.rb:36-38', 'onetimesecret/lib/onetime/config.rb:1507-1509', 'onetimesecret/lib/onetime/config.rb:1598-1620'],
    detail:
      'Config.path falls back to find_configs.first, which searches SERVICE_PATHS (/etc/onetime, ./etc, ./etc/defaults) in service mode and UTILITY_PATHS (~/.onetime first) in CLI mode.',
  },
  {
    claim:
      'There is no environment variable that overrides the configuration file path at this release.',
    citations: ['onetimesecret/lib/onetime/config.rb:1507-1509', 'onetimesecret/lib/onetime/utils/config_resolver.rb:36-64'],
    detail:
      'A repository-wide search for ONETIME_CONFIG at v0.26.19 returns no matches. Path selection is RACK_ENV-aware through ConfigResolver.test_environment? and otherwise fixed.',
  },
  {
    claim:
      'Deprecated keys and environment variables are refused by default: the boot policy is strict unless the deployment downgrades it.',
    citations: ['onetimesecret/lib/onetime/config.rb:200-235', 'onetimesecret/lib/onetime/config.rb:1449-1501', 'onetimesecret/lib/onetime/config.rb:2084-2090'],
    detail:
      "compatibility.deprecated_config_mode defaults to 'strict' (DEPRECATED_CONFIG_MODE); strict raises OT::ConfigError, 'warn' logs, 'silent' ignores, and an unrecognized value is treated as strict. Entries marked severity: :warn log under both strict and warn.",
  },
  {
    claim: 'The auth file layers the same way, but its YAML load permits no extra classes.',
    citations: ['onetimesecret/lib/onetime/auth_config.rb:1119-1146', 'onetimesecret/lib/onetime/auth_config.rb:51-52'],
    detail:
      'AuthConfig.load_config merges etc/defaults/auth.defaults.yaml under the resolved etc/auth.yaml with preserve_nils: false; load_yaml_from calls YAML.safe_load without permitted_classes, so an unquoted date in the auth file raises where the main file would accept it. A load failure raises ConfigError.',
  },
  {
    claim: 'The logging file layers the same way through the same resolver.',
    citations: ['onetimesecret/lib/onetime/initializers/setup_loggers.rb:277-303'],
    detail:
      'load_logging_config renders both etc/defaults/logging.defaults.yaml and the resolved etc/logging.yaml with ERB, parses each with YAML.safe_load(permitted_classes: [Symbol, Date, Time], aliases: true), and deep-merges with preserve_nils: false.',
  },
];

const FILE_SHORT_NAMES = new Map([
  ['config.defaults.yaml', 'config'],
  ['auth.defaults.yaml', 'auth'],
  ['logging.defaults.yaml', 'logging'],
]);

export class ConfigExtractionError extends Error {
  constructor(message, diagnostics = []) {
    super(message);
    this.name = 'ConfigExtractionError';
    this.diagnostics = diagnostics;
  }
}

// `config.defaults.v0.26.19.yaml` and `etc/defaults/config.defaults.yaml` both
// resolve to `config`; anything else uses its basename without extensions.
export function fileShortName(fileName) {
  const base = String(fileName).split('/').pop();
  for (const [name, short] of FILE_SHORT_NAMES) {
    if (base === name) return short;
    const stem = name.replace(/\.yaml$/, '');
    if (base.startsWith(`${stem}.`) && base.endsWith('.yaml')) return short;
  }
  return base.replace(/\.(ya?ml)$/, '').replace(/\.defaults$/, '');
}

// ---------------------------------------------------------------------------
// ERB tokenizer
// ---------------------------------------------------------------------------

const STRUCTURAL_OPENERS = /^(if|unless|case|while|until|for|begin)\b/;
const STRUCTURAL_CONTINUATIONS = /^(else|elsif|when|in|rescue|ensure)\b/;
const STRUCTURAL_END = /^end\b/;
const BLOCK_SUFFIX = /\bdo(\s*\|[^|]*\|)?\s*$/;

function lineStartOffsets(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

function lineAt(starts, offset) {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const mid = (low + high + 1) >> 1;
    if (starts[mid] <= offset) low = mid;
    else high = mid - 1;
  }
  return low + 1; // 1-based
}

function placeholderFor(index, spanLength) {
  const candidates = [`_E${index}_`, `_${index}_`, `_${index.toString(36)}`];
  for (const candidate of candidates) {
    if (candidate.length <= spanLength) return { token: candidate, fits: true };
  }
  return { token: candidates[candidates.length - 1], fits: false };
}

/**
 * Replace every ERB span with an inert placeholder and report the spans.
 *
 * Output spans (`<%= ... %>`) become a placeholder scalar padded to the original
 * span length, which keeps every byte offset, line and column of the remaining
 * YAML identical to the source. Comment spans become spaces. Structural spans
 * are grouped into blocks; the lines a block covers are blanked so the YAML
 * parses without the extractor inventing unconditional keys, and the block is
 * reported for review.
 */
export function tokenizeErb(text, { fileName = '<memory>' } = {}) {
  const starts = lineStartOffsets(text);
  const spans = [];
  const diagnostics = [];

  let cursor = 0;
  while (cursor < text.length) {
    const open = text.indexOf('<%', cursor);
    if (open === -1) break;
    if (text.startsWith('<%%', open)) {
      // ERB's literal `<%` escape. Nothing to classify, and the span is not a
      // key value, so record it and move past the escape.
      diagnostics.push({ kind: 'erb-literal-escape', fileName, line: lineAt(starts, open) });
      cursor = open + 3;
      continue;
    }
    const close = text.indexOf('%>', open + 2);
    if (close === -1) {
      throw new ConfigExtractionError(
        `Unterminated ERB span in ${fileName} at line ${lineAt(starts, open)}`,
        diagnostics,
      );
    }
    const end = close + 2;
    const raw = text.slice(open, end);
    let inner = raw.slice(2, -2);
    let kind = 'structural';
    if (inner.startsWith('=')) {
      kind = 'output';
      inner = inner.slice(1);
    } else if (inner.startsWith('#')) {
      kind = 'comment';
      inner = inner.slice(1);
    }
    if (inner.endsWith('-')) inner = inner.slice(0, -1); // `-%>` trim marker
    spans.push({
      index: spans.length,
      kind,
      raw,
      expr: inner.trim(),
      start: open,
      end,
      line: lineAt(starts, open),
      column: open - starts[lineAt(starts, open) - 1] + 1,
      endLine: lineAt(starts, end - 1),
      endColumn: end - starts[lineAt(starts, end - 1) - 1],
      token: null,
      blockIndex: null,
    });
    cursor = end;
  }

  // Group structural spans into blocks.
  const structuralBlocks = [];
  const stack = [];
  for (const span of spans) {
    if (span.kind !== 'structural') continue;
    const expr = span.expr;
    if (STRUCTURAL_END.test(expr)) {
      const open = stack.pop();
      if (!open) {
        throw new ConfigExtractionError(
          `Unbalanced ERB \`end\` in ${fileName} at line ${span.line}`,
          diagnostics,
        );
      }
      open.spans.push(span);
      if (stack.length === 0) {
        const block = {
          index: structuralBlocks.length,
          openerExpr: open.opener.expr,
          lineStart: open.opener.line,
          lineEnd: span.endLine,
          raw: text.slice(starts[open.opener.line - 1], starts[span.endLine] ?? text.length).replace(/\n$/, ''),
          spanIndexes: open.spans.map((s) => s.index),
        };
        structuralBlocks.push(block);
        for (const member of open.spans) member.blockIndex = block.index;
      } else {
        stack[stack.length - 1].spans.push(span);
      }
      continue;
    }
    if (STRUCTURAL_CONTINUATIONS.test(expr) && stack.length > 0) {
      stack[stack.length - 1].spans.push(span);
      continue;
    }
    if (STRUCTURAL_OPENERS.test(expr) || BLOCK_SUFFIX.test(expr)) {
      if (stack.length > 0) stack[stack.length - 1].spans.push(span);
      stack.push({ opener: span, spans: [span] });
      continue;
    }
    // A statement span that opens nothing (for example `<% x = 1 %>`). Treat it
    // as its own one-line blocked region: it can change the YAML below it.
    const block = {
      index: structuralBlocks.length,
      openerExpr: expr,
      lineStart: span.line,
      lineEnd: span.endLine,
      raw: text.slice(starts[span.line - 1], starts[span.endLine] ?? text.length).replace(/\n$/, ''),
      spanIndexes: [span.index],
    };
    structuralBlocks.push(block);
    span.blockIndex = block.index;
    if (stack.length > 0) stack[stack.length - 1].spans.push(span);
  }
  if (stack.length > 0) {
    throw new ConfigExtractionError(
      `Unterminated ERB block in ${fileName} at line ${stack[0].opener.line}`,
      diagnostics,
    );
  }

  // Build the transformed text.
  const chars = Array.from(text);
  const shifts = [];
  for (const span of spans) {
    if (span.kind === 'output') {
      // A span may cover several lines. Blank every character it covered,
      // keep its newlines exactly where they were, and write the placeholder
      // into the first line segment with room for it. Offsets, line numbers and
      // the total length therefore all match the source.
      const segments = [];
      let segmentStart = 0;
      for (let i = 0; i <= span.raw.length; i += 1) {
        if (i === span.raw.length || span.raw[i] === '\n') {
          segments.push({ start: segmentStart, length: i - segmentStart });
          segmentStart = i + 1;
        }
      }
      const longest = segments.reduce((best, segment) => (segment.length > best.length ? segment : best), segments[0]);
      const { token, fits } = placeholderFor(span.index, longest.length);
      span.token = token;
      const target = segments.find((segment) => segment.length >= token.length) ?? longest;
      const blanked = span.raw.replace(/[^\n]/g, ' ').split('');
      // Left-align in the first segment (keeps the source column); right-align
      // in a later segment so the placeholder stays indented under its key.
      const at = target === segments[0] ? target.start : target.start + target.length - token.length;
      for (let i = 0; i < token.length && at + i < blanked.length; i += 1) blanked[at + i] = token[i];
      const padded = fits ? blanked.join('') : token;
      if (!fits) {
        diagnostics.push({
          kind: 'placeholder-longer-than-span',
          fileName,
          line: span.line,
          detail: `placeholder ${token} exceeds span length ${span.raw.length}`,
        });
        shifts.push({ at: span.start, delta: padded.length - span.raw.length });
      }
      chars.splice(span.start, span.raw.length, ...padded.split(''));
      // Keep the array length stable for the common padded case; a shifted span
      // changes length, which `mapOffset` accounts for.
    } else {
      for (let i = span.start; i < span.end; i += 1) chars[i] = ' ';
    }
  }

  // Blank every line a structural block covers, so the conditional body never
  // reaches the parser as if it were unconditional.
  for (const block of structuralBlocks) {
    for (let line = block.lineStart; line <= block.lineEnd; line += 1) {
      const from = starts[line - 1];
      const to = starts[line] ?? text.length;
      for (let i = from; i < to; i += 1) {
        if (chars[i] !== '\n') chars[i] = ' ';
      }
    }
  }

  const transformed = chars.join('');
  const mapOffset = (offset) => {
    let delta = 0;
    for (const shift of shifts) {
      if (shift.at < offset) delta += shift.delta;
    }
    return offset - delta;
  };

  return { text: transformed, spans, structuralBlocks, diagnostics, mapOffset };
}

// ---------------------------------------------------------------------------
// Expression grammar
// ---------------------------------------------------------------------------

const ENV_NAME = "[A-Za-z_][A-Za-z0-9_]*";
const ENV_READ = `ENV\\[(?:'(${ENV_NAME})'|"(${ENV_NAME})")\\]`;

function envReadMatch(fragment) {
  const match = new RegExp(`^${ENV_READ}$`).exec(fragment.trim());
  if (!match) return null;
  return match[1] ?? match[2];
}

const LITERAL_PATTERNS = [
  { re: /^nil$/, value: () => null },
  { re: /^true$/, value: () => true },
  { re: /^false$/, value: () => false },
  { re: /^\[\s*\]$/, value: () => [] },
  { re: /^\{\s*\}$/, value: () => ({}) },
  { re: /^-?\d+$/, value: (m) => Number.parseInt(m[0], 10) },
  { re: /^-?\d+\.\d+$/, value: (m) => Number.parseFloat(m[0]) },
  { re: /^'([^'\\]*)'$/, value: (m) => m[1] },
  { re: /^"([^"\\]*)"$/, value: (m) => m[1] },
];

function literalMatch(fragment) {
  const text = fragment.trim();
  for (const pattern of LITERAL_PATTERNS) {
    const match = pattern.re.exec(text);
    if (match) return { ok: true, value: pattern.value(match) };
  }
  return { ok: false };
}

// Split on top-level `||`, ignoring quoted strings and bracketed groups.
function splitAlternatives(expr) {
  const parts = [];
  let depth = 0;
  let quote = null;
  let start = 0;
  for (let i = 0; i < expr.length; i += 1) {
    const char = expr[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === '(' || char === '[' || char === '{') depth += 1;
    else if (char === ')' || char === ']' || char === '}') depth -= 1;
    else if (depth === 0 && char === '|' && expr[i + 1] === '|') {
      parts.push(expr.slice(start, i));
      i += 1;
      start = i + 1;
    }
  }
  parts.push(expr.slice(start));
  return parts.map((part) => part.trim());
}

const CAST_STEP = /^&?\.(to_i|to_s|to_f|to_json|strip|split\('([^']*)'\)|split\("([^"]*)"\)|map\(&:strip\)|reject\(&:empty\?\))/;

// Parse an optional cast suffix (`.to_i`, `&.split(',')&.map(&:strip)`, ...).
// Returns null when the suffix contains anything outside the supported steps.
function parseCastChain(suffix) {
  const steps = [];
  let rest = suffix.trim();
  while (rest.length > 0) {
    const match = CAST_STEP.exec(rest);
    if (!match) return null;
    const name = match[1];
    if (name.startsWith('split(')) steps.push(`split(${match[2] ?? match[3]})`);
    else steps.push(name);
    rest = rest.slice(match[0].length);
  }
  return steps;
}

// Index of the `)` that closes the `(` at position 0, ignoring quoted text.
function matchingParen(expr) {
  let depth = 0;
  let quote = null;
  for (let i = 0; i < expr.length; i += 1) {
    const char = expr[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === '(') depth += 1;
    else if (char === ')') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function termWithCast(fragment) {
  const text = fragment.trim();
  const direct = envReadMatch(text);
  if (direct) return { env: direct, cast: [] };
  const match = new RegExp(`^${ENV_READ}((?:&?\\.[^\\s]*)+)$`).exec(text);
  if (!match) return null;
  const env = match[1] ?? match[2];
  const cast = parseCastChain(match[3]);
  if (!cast) return null;
  return { env, cast };
}

function emptyErb(raw, kind) {
  return {
    raw,
    kind,
    envReads: [],
    staticFallback: null,
    polarity: null,
    unsetBehaviour: null,
    cast: null,
    truthyWhen: null,
    defaultWhenUnset: null,
    notes: [],
  };
}

const EMPTY_STRING_TRUTHY = 'ruby-empty-string-is-truthy';

function booleanRecord(raw, envReads, operator, comparand, { explicitFallback = undefined, fetchDefault = undefined } = {}) {
  const erb = emptyErb(raw, 'boolean');
  erb.envReads = envReads;
  const names = envReads.map((name) => `ENV['${name}']`).join(" == 'true' || ");
  if (operator === '==' && comparand === 'true') {
    erb.polarity = envReads.length > 1 ? 'any-equals-true' : 'equals-true';
    erb.truthyWhen = envReads.length > 1 ? `${names} == 'true'` : `ENV['${envReads[0]}'] == 'true'`;
    erb.defaultWhenUnset = false;
  } else if (operator === '!=' && comparand === 'false') {
    erb.polarity = 'not-equals-false';
    erb.truthyWhen = `ENV['${envReads[0]}'] != 'false'`;
    erb.defaultWhenUnset = true;
  } else if (operator === '==' && comparand === 'false') {
    erb.polarity = 'equals-false';
    erb.truthyWhen = `ENV['${envReads[0]}'] == 'false'`;
    erb.defaultWhenUnset = false;
  } else if (operator === '!=' && comparand === 'true') {
    erb.polarity = 'not-equals-true';
    erb.truthyWhen = `ENV['${envReads[0]}'] != 'true'`;
    erb.defaultWhenUnset = true;
  } else {
    return null;
  }
  if (fetchDefault !== undefined) {
    erb.defaultWhenUnset = operator === '==' ? fetchDefault === comparand : fetchDefault !== comparand;
    erb.notes.push(`unset reads as ${JSON.stringify(fetchDefault)}`);
  }
  if (explicitFallback !== undefined) {
    erb.staticFallback = explicitFallback;
    erb.notes.push('explicit boolean fallback in source');
  }
  erb.unsetBehaviour = erb.defaultWhenUnset === true ? 'true' : 'false';
  return erb;
}

/**
 * Classify one ERB output expression.
 *
 * Anything outside the grammar below returns kind `runtime-defined` with the
 * expression kept verbatim, which is the honest answer for a value only the
 * running application can resolve.
 */
export function parseErbExpression(rawExpr) {
  const raw = String(rawExpr).trim();

  // `(v = ENV['X'].to_s).empty? ? nil : <branch>` and its relatives.
  const triState = new RegExp(
    `^\\(\\s*v\\s*=\\s*${ENV_READ}\\.to_s\\s*\\)\\.empty\\?\\s*\\?\\s*nil\\s*:\\s*(.+)$`,
  ).exec(raw);
  if (triState) {
    const env = triState[1] ?? triState[2];
    const branch = triState[3].trim();
    if (branch === 'v.to_json') {
      const erb = emptyErb(raw, 'json-quoted');
      erb.envReads = [env];
      erb.unsetBehaviour = 'nil';
      erb.notes.push('json-quoted', 'blank counts as unset');
      return erb;
    }
    const comparison = /^v\s*(==|!=)\s*'(true|false)'$/.exec(branch);
    if (comparison) {
      const erb = booleanRecord(raw, [env], comparison[1], comparison[2]);
      if (erb) {
        erb.unsetBehaviour = 'nil';
        erb.defaultWhenUnset = null;
        erb.notes.push('blank counts as unset', 'three-state: nil when unset or blank');
        return erb;
      }
    }
    if (branch === 'v') {
      const erb = emptyErb(raw, 'env-read');
      erb.envReads = [env];
      erb.unsetBehaviour = 'nil';
      erb.notes.push('blank counts as unset');
      return erb;
    }
    return runtimeDefined(raw);
  }

  // `ENV['X'].to_s.strip.empty? ? <literal|nil> : ENV['X']`
  const blankTernary = new RegExp(
    `^${ENV_READ}\\.to_s(?:\\.strip)?\\.empty\\?\\s*\\?\\s*(.+?)\\s*:\\s*${ENV_READ}$`,
  ).exec(raw);
  if (blankTernary) {
    const env = blankTernary[1] ?? blankTernary[2];
    const elseEnv = blankTernary[4] ?? blankTernary[5];
    const literal = literalMatch(blankTernary[3]);
    if (env === elseEnv && literal.ok) {
      const erb = emptyErb(raw, literal.value === null ? 'env-read' : 'env-fallback');
      erb.envReads = [env];
      erb.staticFallback = literal.value;
      erb.unsetBehaviour = literal.value === null ? 'nil' : 'static fallback';
      erb.notes.push('blank counts as unset');
      return erb;
    }
    return runtimeDefined(raw);
  }

  // `ENV.fetch('X', 'false') == 'true'`
  const fetchBoolean = new RegExp(
    `^ENV\\.fetch\\((?:'(${ENV_NAME})'|"(${ENV_NAME})")\\s*,\\s*(.+?)\\)\\s*(==|!=)\\s*'(true|false)'$`,
  ).exec(raw);
  if (fetchBoolean) {
    const env = fetchBoolean[1] ?? fetchBoolean[2];
    const fallback = literalMatch(fetchBoolean[3]);
    if (fallback.ok) {
      const erb = booleanRecord(raw, [env], fetchBoolean[4], fetchBoolean[5], { fetchDefault: fallback.value });
      if (erb) return erb;
    }
    return runtimeDefined(raw);
  }

  // `ENV.fetch('X', 'lit')`
  const fetchRead = new RegExp(
    `^ENV\\.fetch\\((?:'(${ENV_NAME})'|"(${ENV_NAME})")\\s*,\\s*(.+?)\\)$`,
  ).exec(raw);
  if (fetchRead) {
    const env = fetchRead[1] ?? fetchRead[2];
    const fallback = literalMatch(fetchRead[3]);
    if (!fallback.ok) return runtimeDefined(raw);
    const erb = emptyErb(raw, fallback.value === null ? 'env-read' : 'env-fallback');
    erb.envReads = [env];
    erb.staticFallback = fallback.value;
    erb.unsetBehaviour = fallback.value === null ? 'nil' : 'static fallback';
    if (fallback.value === '') erb.notes.push('fallback is an empty string, not unset');
    return erb;
  }

  // `( ... )` with an optional cast chain after it: `(ENV['A'] || '').split(',')`.
  if (raw.startsWith('(')) {
    const close = matchingParen(raw);
    if (close === -1) return runtimeDefined(raw);
    const inner = parseErbExpression(raw.slice(1, close));
    const suffix = raw.slice(close + 1).trim();
    if (inner.kind === 'runtime-defined' || inner.envReads.length === 0) return runtimeDefined(raw);
    if (suffix === '') return { ...inner, raw };
    const cast = parseCastChain(suffix);
    if (!cast) return runtimeDefined(raw);
    return { ...inner, raw, kind: 'cast', cast: [...(inner.cast ?? []), ...cast], notes: [...inner.notes] };
  }

  const alternatives = splitAlternatives(raw);

  // Boolean comparison, optionally with an explicit literal fallback.
  const comparison = new RegExp(`^${ENV_READ}\\s*(==|!=)\\s*'(true|false)'$`);
  const firstComparison = comparison.exec(alternatives[0]);
  if (firstComparison) {
    const env = firstComparison[1] ?? firstComparison[2];
    if (alternatives.length === 1) {
      const erb = booleanRecord(raw, [env], firstComparison[3], firstComparison[4]);
      if (erb) return erb;
      return runtimeDefined(raw);
    }
    // `A == 'true' || B == 'true'`
    const allComparisons = alternatives.every((part) => comparison.test(part));
    if (allComparisons && firstComparison[3] === '==' && firstComparison[4] === 'true') {
      const envReads = alternatives.map((part) => {
        const match = comparison.exec(part);
        return match[1] ?? match[2];
      });
      const erb = booleanRecord(raw, envReads, '==', 'true');
      if (erb) return erb;
    }
    // `A == 'true' || false`
    if (alternatives.length === 2) {
      const fallback = literalMatch(alternatives[1]);
      if (fallback.ok && typeof fallback.value === 'boolean') {
        const erb = booleanRecord(raw, [env], firstComparison[3], firstComparison[4], {
          explicitFallback: fallback.value,
        });
        if (erb) return erb;
      }
    }
    return runtimeDefined(raw);
  }

  // Ordered environment reads with an optional trailing literal, plus casts.
  const terms = [];
  let trailingLiteral;
  let sawLiteral = false;
  for (const [position, part] of alternatives.entries()) {
    const term = termWithCast(part);
    if (term) {
      if (sawLiteral) return runtimeDefined(raw);
      terms.push(term);
      continue;
    }
    const literal = literalMatch(part);
    if (!literal.ok) return runtimeDefined(raw);
    if (position !== alternatives.length - 1) return runtimeDefined(raw);
    trailingLiteral = literal.value;
    sawLiteral = true;
  }
  if (terms.length === 0) return runtimeDefined(raw);

  const casts = terms.flatMap((term) => term.cast);
  const hasCast = casts.length > 0;
  let kind;
  if (hasCast) kind = 'cast';
  else if (sawLiteral && trailingLiteral !== null) kind = 'env-fallback';
  else if (terms.length > 1) kind = 'env-fallback';
  else kind = 'env-read';

  const erb = emptyErb(raw, kind);
  erb.envReads = terms.map((term) => term.env);
  erb.cast = hasCast ? casts : null;
  erb.staticFallback = sawLiteral ? trailingLiteral : null;
  if (sawLiteral && trailingLiteral !== null) {
    erb.unsetBehaviour = 'static fallback';
  } else {
    erb.unsetBehaviour = 'nil';
    if (sawLiteral) erb.notes.push('explicit nil fallback in source');
  }
  if (erb.envReads.length > 1) erb.notes.push('ordered alternatives', EMPTY_STRING_TRUTHY);
  else if (sawLiteral) erb.notes.push(EMPTY_STRING_TRUTHY);
  if (casts.includes('to_json')) erb.notes.push('json-quoted');
  return erb;
}

function runtimeDefined(raw) {
  const erb = emptyErb(raw, 'runtime-defined');
  erb.unsetBehaviour = 'unknown';
  return erb;
}

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

// Escaping rule: lower-case, then replace every run of characters outside
// [a-z0-9.[]] with a single `-`, then trim leading and trailing `-`. The rule is
// lossy by design, so callers rely on the collision detection in
// `extractConfigKeys` rather than on reversibility.
export function escapePathForId(path) {
  return String(path)
    .toLowerCase()
    .replace(/[^a-z0-9.[\]]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function recordId(fileShort, path) {
  return `config-${escapePathForId(fileShort)}-${escapePathForId(path)}`;
}

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

const SINCE_PATTERN = /Since\s+(v\d+(?:\.\d+)*)/i;

function collectComment(sourceLines, keyLine) {
  const block = [];
  for (let line = keyLine - 1; line >= 1; line -= 1) {
    const text = sourceLines[line - 1] ?? '';
    if (/^\s*#/.test(text)) {
      block.unshift(text.replace(/\s+$/, ''));
      continue;
    }
    break;
  }
  return block.length > 0 ? block.join('\n') : null;
}

// 1-based column where a YAML comment starts on this line, or null.
function commentStartColumn(text) {
  let quote = null;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === '#' && (i === 0 || /\s/.test(text[i - 1]))) return i + 1;
  }
  return null;
}

function trailingCommentOf(sourceLines, line) {
  const text = sourceLines[line - 1] ?? '';
  const column = commentStartColumn(text);
  return column === null ? null : text.slice(column - 1).replace(/\s+$/, '');
}

function keyText(node) {
  if (isScalar(node)) return String(node.value);
  return null;
}

export function assignOwner(record) {
  let best = null;
  for (const rule of OWNERSHIP_RULES) {
    if (rule.file !== record.fileShort) continue;
    if (rule.path !== '') {
      const path = record.path;
      const matches = path === rule.path || path.startsWith(`${rule.path}.`) || path.startsWith(`${rule.path}[`);
      if (!matches) continue;
    }
    if (best === null || rule.path.length >= best.path.length) best = rule;
  }
  return best ? best.owner : 'unassigned';
}

/**
 * Extract configuration key records from one ERB-templated YAML file.
 *
 * @param {object} input
 * @param {string} input.text Raw file text.
 * @param {string} input.fileName Logical file name (used for the short name and IDs).
 * @param {number} [input.maxAliasCount] Alias expansion bound.
 * @throws {ConfigExtractionError} on duplicate keys, unresolved or custom tags,
 *   alias expansion beyond the bound, unterminated ERB and unbalanced blocks.
 */
export function extractConfigKeys({ text, fileName, maxAliasCount = 50 }) {
  if (typeof text !== 'string') throw new TypeError('extractConfigKeys requires text');
  if (!fileName) throw new TypeError('extractConfigKeys requires fileName');
  const fileShort = fileShortName(fileName);
  const tokenized = tokenizeErb(text, { fileName });
  const diagnostics = [...tokenized.diagnostics];
  const sourceLines = text.split('\n');

  const lineCounter = new LineCounter();
  const doc = parseDocument(tokenized.text, {
    uniqueKeys: true,
    schema: 'core',
    customTags: [],
    maxAliasCount,
    keepSourceTokens: true,
    lineCounter,
    prettyErrors: true,
  });

  if (doc.errors.length > 0) {
    const messages = doc.errors.map((error) => error.message.split('\n')[0]);
    for (const [position, error] of doc.errors.entries()) {
      diagnostics.push({ kind: 'yaml-error', fileName, detail: messages[position], code: error.code });
    }
    throw new ConfigExtractionError(`${fileName}: ${messages.join('; ')}`, diagnostics);
  }
  const tagWarnings = doc.warnings.filter((warning) => /tag/i.test(warning.message));
  if (tagWarnings.length > 0) {
    for (const warning of tagWarnings) {
      diagnostics.push({ kind: 'yaml-tag', fileName, detail: warning.message.split('\n')[0] });
    }
    throw new ConfigExtractionError(
      `${fileName}: ${tagWarnings.map((warning) => warning.message.split('\n')[0]).join('; ')}`,
      diagnostics,
    );
  }
  for (const warning of doc.warnings) {
    if (!tagWarnings.includes(warning)) {
      diagnostics.push({ kind: 'yaml-warning', fileName, detail: warning.message.split('\n')[0] });
    }
  }
  try {
    doc.toJS({ maxAliasCount });
  } catch (error) {
    diagnostics.push({ kind: 'yaml-alias-bound', fileName, detail: error.message.split('\n')[0] });
    throw new ConfigExtractionError(`${fileName}: ${error.message.split('\n')[0]}`, diagnostics);
  }

  const lineOf = (offset) => lineCounter.linePos(tokenized.mapOffset(offset)).line;
  const tokenMap = new Map();
  for (const span of tokenized.spans) {
    if (span.token) tokenMap.set(span.token, span);
  }
  const tokenPattern =
    tokenMap.size > 0
      ? new RegExp([...tokenMap.keys()].map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
      : null;

  const records = [];
  const seenIds = new Map();

  const emit = (pair, path, valueNode) => {
    const keyRange = pair.key?.range ?? valueNode?.range;
    const lineStart = keyRange ? lineOf(keyRange[0]) : 1;
    const valueRange = valueNode?.range ?? keyRange;
    const scalarStringValue = isScalar(valueNode) && typeof valueNode.value === 'string' ? valueNode.value : null;
    const valueTokens = scalarStringValue && tokenPattern ? scalarStringValue.match(tokenPattern) ?? [] : [];
    const valueSpans = valueTokens.map((token) => tokenMap.get(token)).filter(Boolean);
    // A placeholder is shorter than the span it stands for, so the raw value
    // extends to the end of the last ERB span it contains.
    const rawStart = valueRange ? tokenized.mapOffset(valueRange[0]) : 0;
    const rawEnd = valueRange
      ? valueSpans.reduce((end, span) => Math.max(end, span.end), tokenized.mapOffset(valueRange[1]))
      : 0;
    const lineEnd = valueRange ? lineOf(Math.max(valueRange[0], valueRange[1] - 1)) : lineStart;
    const rawValue = valueRange ? text.slice(rawStart, rawEnd) : '';
    const comment = collectComment(sourceLines, lineStart);
    const trailingComment = trailingCommentOf(sourceLines, lineEnd);
    const sinceSource = trailingComment ?? comment ?? '';
    const sinceMatch = SINCE_PATTERN.exec(sinceSource) ?? SINCE_PATTERN.exec(comment ?? '');

    let erb = null;
    let literalValue;
    let isStructuralErb = false;
    const erbSpanIndexes = [];

    const scalarString = scalarStringValue;
    const tokensInValue = valueTokens;
    for (const span of valueSpans) erbSpanIndexes.push(span.index);
    if (tokensInValue.length === 1) {
      const residue = scalarString.replace(tokenPattern, '').trim();
      const span = tokenMap.get(tokensInValue[0]);
      if (residue === '') {
        erb = parseErbExpression(span.expr);
      } else {
        erb = runtimeDefined(rawValue.trim());
        erb.notes.push('interpolated: the ERB span is part of a larger value');
      }
    } else if (tokensInValue.length > 1) {
      erb = runtimeDefined(rawValue.trim());
      erb.notes.push('interpolated: several ERB spans in one value');
    } else if (isScalar(valueNode)) {
      literalValue = valueNode.value;
    } else if (isAlias(valueNode)) {
      literalValue = valueNode.resolve(doc)?.toJSON() ?? null;
    } else if (isMap(valueNode)) {
      literalValue = {};
    } else if (isSeq(valueNode)) {
      literalValue = [];
    } else {
      literalValue = null;
    }

    for (const block of tokenized.structuralBlocks) {
      if (lineStart >= block.lineStart && lineStart <= block.lineEnd) isStructuralErb = true;
    }

    let id = recordId(fileShort, path);
    const previous = seenIds.get(id);
    if (previous) {
      diagnostics.push({
        kind: 'id-collision',
        fileName,
        detail: `${id} is produced by both "${previous}" and "${path}"`,
      });
      let suffix = 2;
      while (seenIds.has(`${id}-${suffix}`)) suffix += 1;
      id = `${id}-${suffix}`;
    }
    seenIds.set(id, path);

    const record = {
      id,
      file: fileName,
      fileShort,
      path,
      lineStart,
      lineEnd,
      rawValue,
      erb,
      literalValue: erb ? undefined : literalValue,
      comment,
      trailingComment,
      since: sinceMatch ? sinceMatch[1] : null,
      isStructuralErb,
      erbSpanIndexes,
      owner: null,
    };
    record.owner = assignOwner(record);
    records.push(record);
  };

  const walk = (node, path) => {
    if (isMap(node)) {
      for (const pair of node.items) {
        const key = keyText(pair.key);
        if (key === null) {
          diagnostics.push({
            kind: 'non-scalar-key',
            fileName,
            detail: `non-scalar mapping key at ${path || '<root>'}`,
          });
          continue;
        }
        const childPath = path ? `${path}.${key}` : key;
        const value = pair.value;
        if ((isMap(value) || isSeq(value)) && value.items.length > 0) {
          walk(value, childPath);
        } else {
          emit(pair, childPath, value);
        }
      }
      return;
    }
    if (isSeq(node)) {
      for (const [index, item] of node.items.entries()) {
        const childPath = `${path}[${index}]`;
        if ((isMap(item) || isSeq(item)) && item.items.length > 0) {
          walk(item, childPath);
        } else {
          emit({ key: null, value: item }, childPath, item);
        }
      }
    }
  };

  if (doc.contents) walk(doc.contents, '');

  const outputSpans = tokenized.spans.filter((span) => span.kind === 'output');
  const classifiedSpans = new Set();
  for (const record of records) {
    if (!record.erb) continue;
    for (const index of record.erbSpanIndexes) classifiedSpans.add(index);
  }
  const spansInsideBlocks = outputSpans.filter((span) => span.blockIndex !== null || isInsideBlock(span, tokenized));
  // A span inside a YAML comment belongs to a commented-out example key. It is
  // not a live setting, so it is accounted separately rather than left dangling.
  const spansInYamlComments = outputSpans.filter((span) => {
    const commentStart = commentStartColumn(sourceLines[span.line - 1] ?? '');
    return commentStart !== null && span.column > commentStart;
  });
  const accounting = {
    totalSpans: tokenized.spans.length,
    output: outputSpans.length,
    structural: tokenized.spans.filter((span) => span.kind === 'structural').length,
    comment: tokenized.spans.filter((span) => span.kind === 'comment').length,
    classifiedOutput: classifiedSpans.size,
    outputInsideStructuralBlocks: spansInsideBlocks.length,
    outputInYamlComments: spansInYamlComments.length,
    unattachedOutput: outputSpans.filter(
      (span) =>
        !classifiedSpans.has(span.index) &&
        !spansInsideBlocks.includes(span) &&
        !spansInYamlComments.includes(span),
    ).length,
  };

  return {
    file: fileName,
    fileShort,
    records,
    structuralBlocks: tokenized.structuralBlocks.map((block) => ({
      ...block,
      file: fileName,
      path: enclosingPath(sourceLines, block.lineStart),
      blockedStructural: true,
    })),
    diagnostics,
    accounting,
    spans: tokenized.spans,
  };
}

function isInsideBlock(span, tokenized) {
  return tokenized.structuralBlocks.some(
    (block) => span.line >= block.lineStart && span.line <= block.lineEnd,
  );
}

// The mapping or section that encloses a blocked structural block, derived from
// indentation in the original source. Used for the review report only.
export function enclosingPath(sourceLines, line) {
  const target = sourceLines[line - 1] ?? '';
  const segments = [];
  const indent = /^(\s*)/.exec(target)[1].length;
  // When the block's body starts a sequence item at the block's own
  // indentation, the owning key sits at that same indentation; otherwise the
  // owning key must be strictly shallower.
  const body = sourceLines[line] ?? '';
  const addsSequenceItems = new RegExp(`^\\s{${indent}}-\\s`).test(body);
  let allowed = addsSequenceItems ? indent : indent - 1;
  for (let cursor = line - 1; cursor >= 1 && allowed >= 0; cursor -= 1) {
    const text = sourceLines[cursor - 1] ?? '';
    if (/^\s*(#|$)/.test(text)) continue;
    const match = /^(\s*)(-\s+)?([A-Za-z0-9_.-]+):(\s|$)/.exec(text);
    if (!match) continue;
    const candidateIndent = match[1].length;
    if (candidateIndent > allowed) continue;
    if (candidateIndent === allowed && match[2]) continue; // sibling sequence item
    segments.unshift(match[3]);
    allowed = candidateIndent - 1;
  }
  return segments.join('.');
}

// ---------------------------------------------------------------------------
// Coverage report
// ---------------------------------------------------------------------------

/**
 * Extract several files, keeping per-file failures as diagnostics instead of
 * aborting the run, so the coverage report can list them.
 */
export function extractAll(files, options = {}) {
  return files.map(({ text, fileName }) => {
    try {
      return { fileName, ok: true, result: extractConfigKeys({ text, fileName, ...options }) };
    } catch (error) {
      return {
        fileName,
        ok: false,
        error: { message: error.message, diagnostics: error.diagnostics ?? [] },
      };
    }
  });
}

// Inline code for a table cell: pipes are escaped, newlines are collapsed, and
// content with a backtick gets a longer fence. Raw multi-line text goes in a
// fenced block instead (see the runtime-defined section).
function mdCode(text) {
  const inline = String(text).replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|');
  const fence = inline.includes('`') ? '``' : '`';
  const pad = inline.includes('`') ? ' ' : '';
  return `${fence}${pad}${inline}${pad}${fence}`;
}

function histogram(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.erb ? record.erb.kind : 'no-erb (literal)';
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/**
 * Render the internal coverage report for `docs/reference/coverage-configuration.md`.
 *
 * @param {Array} extractions Output of `extractAll`.
 * @param {object} [meta] `{ sourceRelease, sourceSha }` for the scope line.
 */
export function buildCoverageReport(extractions, meta = {}) {
  const { sourceRelease = 'v0.26.19', sourceSha = 'e98a88c9b5832bbae249f38885aa28bd78a5db4d' } = meta;
  const ok = extractions.filter((entry) => entry.ok);
  const failed = extractions.filter((entry) => !entry.ok);
  const allRecords = ok.flatMap((entry) => entry.result.records);
  const lines = [];

  lines.push('# Configuration key coverage');
  lines.push('');
  lines.push(
    `Generated by \`bin/reference/yaml-erb.mjs\` from the Onetime Secret ${sourceRelease} defaults files (\`${sourceSha.slice(0, 8)}\`). Internal review record, not published content.`,
  );
  lines.push('');

  lines.push('## Keys per file');
  lines.push('');
  lines.push('| File | Keys | ERB-backed | Literal | Blocked structural blocks | Diagnostics |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const entry of ok) {
    const { records, structuralBlocks, diagnostics } = entry.result;
    const erbBacked = records.filter((record) => record.erb).length;
    lines.push(
      `| ${mdCode(entry.fileName)} | ${records.length} | ${erbBacked} | ${records.length - erbBacked} | ${structuralBlocks.length} | ${diagnostics.length} |`,
    );
  }
  lines.push(`| **total** | ${allRecords.length} | ${allRecords.filter((r) => r.erb).length} | ${allRecords.filter((r) => !r.erb).length} | ${ok.reduce((sum, entry) => sum + entry.result.structuralBlocks.length, 0)} | ${ok.reduce((sum, entry) => sum + entry.result.diagnostics.length, 0)} |`);
  lines.push('');

  lines.push('## ERB span accounting');
  lines.push('');
  lines.push(
    '| File | Spans | Output | Structural | ERB comment | Classified | Inside blocked blocks | In commented-out keys | Unattached |',
  );
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const entry of ok) {
    const a = entry.result.accounting;
    lines.push(
      `| ${mdCode(entry.fileName)} | ${a.totalSpans} | ${a.output} | ${a.structural} | ${a.comment} | ${a.classifiedOutput} | ${a.outputInsideStructuralBlocks} | ${a.outputInYamlComments} | ${a.unattachedOutput} |`,
    );
  }
  lines.push('');

  lines.push('## Keys per destination page');
  lines.push('');
  lines.push('| Destination | Keys |');
  lines.push('| --- | --- |');
  const owners = new Map();
  for (const record of allRecords) owners.set(record.owner, (owners.get(record.owner) ?? 0) + 1);
  for (const owner of [...OWNER_PAGES, 'unassigned']) {
    if (!owners.has(owner)) continue;
    lines.push(`| ${mdCode(owner)} | ${owners.get(owner)} |`);
  }
  lines.push('');

  lines.push('## ERB kind histogram');
  lines.push('');
  lines.push('| Kind | Keys |');
  lines.push('| --- | --- |');
  for (const [kind, count] of histogram(allRecords)) lines.push(`| ${mdCode(kind)} | ${count} |`);
  lines.push('');

  lines.push('## Runtime-defined expressions');
  lines.push('');
  const runtime = allRecords.filter((record) => record.erb?.kind === 'runtime-defined');
  if (runtime.length === 0) {
    lines.push('None.');
  } else {
    lines.push('Kept verbatim with citations; no value is inferred for these keys.');
    lines.push('');
    for (const record of runtime) {
      lines.push(`- ${mdCode(`${record.fileShort}:${record.path}`)} lines ${record.lineStart}-${record.lineEnd}:`);
      lines.push('');
      lines.push('  ```ruby');
      for (const line of record.erb.raw.split('\n')) lines.push(`  ${line}`);
      lines.push('  ```');
      lines.push('');
    }
  }
  lines.push('');

  lines.push('## Blocked structural blocks');
  lines.push('');
  const blocks = ok.flatMap((entry) => entry.result.structuralBlocks);
  if (blocks.length === 0) {
    lines.push('None.');
  } else {
    lines.push(
      'Keys inside these blocks are not extracted. The section stays blocked until a reviewer decides how to document the condition.',
    );
    lines.push('');
    for (const block of blocks) {
      lines.push(
        `- ${mdCode(`${fileShortName(block.file)}:${block.path || '<root>'}`)} lines ${block.lineStart}-${block.lineEnd}, opener ${mdCode(block.openerExpr)}:`,
      );
      lines.push('');
      lines.push('  ```erb');
      for (const line of block.raw.split('\n')) lines.push(`  ${line}`);
      lines.push('  ```');
      lines.push('');
    }
  }

  lines.push('## Unassigned keys');
  lines.push('');
  const unassigned = allRecords.filter((record) => record.owner === 'unassigned');
  if (unassigned.length === 0) {
    lines.push('None.');
  } else {
    for (const record of unassigned) lines.push(`- ${mdCode(`${record.fileShort}:${record.path}`)}`);
  }
  lines.push('');

  lines.push('## Diagnostics');
  lines.push('');
  const diagnostics = ok.flatMap((entry) => entry.result.diagnostics);
  if (diagnostics.length === 0 && failed.length === 0) {
    lines.push('No duplicate keys, tag rejections or identifier collisions.');
  } else {
    for (const entry of failed) {
      lines.push(`- ${mdCode(entry.fileName)} failed extraction: ${entry.error.message}`);
    }
    for (const diagnostic of diagnostics) {
      lines.push(
        `- ${mdCode(diagnostic.fileName)} ${diagnostic.kind}${diagnostic.line ? ` (line ${diagnostic.line})` : ''}${diagnostic.detail ? `: ${diagnostic.detail}` : ''}`,
      );
    }
  }
  lines.push('');

  lines.push('## Precedence evidence');
  lines.push('');
  lines.push(
    `Read from the loader implementation at ${sourceRelease} (\`${sourceSha.slice(0, 8)}\`). The defaults YAML alone does not establish precedence.`,
  );
  lines.push('');
  for (const item of PRECEDENCE_EVIDENCE) {
    lines.push(`1. ${item.claim}`);
    lines.push(`   - Evidence: ${item.citations.map((citation) => mdCode(citation)).join(', ')}`);
    lines.push(`   - Detail: ${item.detail}`);
  }
  lines.push('');

  return `${lines.join('\n')}`;
}
