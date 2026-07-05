// src/components/config-generator/presets.ts
//
// Preset manifest for the Configuration Generator.
//
// This is the small, hand-authored curation layer the JSON schemas can't
// provide. The vendored schemas (src/components/config-generator/schemas/*.schema.json) are the
// source of truth for field *structure, types, defaults, and constraints*; this
// manifest declares:
//
//   1. WHICH handful of fields are the installer-facing choices (the schema
//      describes hundreds of fields — this picks the fork-in-the-road ones).
//   2. WHERE each choice writes in config.yaml / auth.yaml (its dotted path).
//   3. WHICH env vars each choice implies (env mapping lives only in the app's
//      ERB etc/defaults/*.yaml, never in the schema).
//
// Defaults and select choices are read from the schemas at runtime where they
// exist (see generate.ts); a manifest `fallbackDefault` covers the cases the
// generated schema omits (e.g. secret_options.default_ttl carries no default in
// the schema, and site.network.trusted_proxy isn't in the static schema at all).

export type OptionType = 'select' | 'boolean';

export interface Choice {
  value: string | number;
  label: string;
}

export interface OptionSpec {
  /** Stable key — also the URL query param and the schema-lookup id. */
  key: string;
  label: string;
  description?: string;
  type: OptionType;
  /** Which file the value is written to. */
  file: 'config' | 'auth';
  /**
   * Dotted path within that file's document, e.g.
   * 'site.secret_options.passphrase.required'. When omitted (deployment_mode,
   * email_provider), a custom applier in generate.ts handles the mapping.
   */
  path?: string;
  /** Dotted path into the vendored schema to read default/constraints from. */
  schemaPath?: { file: 'config' | 'auth'; path: string };
  /** Used when the schema has no default for schemaPath (or there is none). */
  fallbackDefault: string | number | boolean;
  /** For selects. When omitted, derived from a schema enum where available. */
  choices?: Choice[];
  /** Gate this option on another selection (e.g. sso needs full mode). */
  requires?: Record<string, string | number | boolean>;
  /** Env vars this choice implies. Rendered as empty placeholders when the
   *  value is secret-bearing (secret:true) so nothing sensitive is ever baked. */
  env?: Array<{ name: string; secret?: boolean; when?: string | number | boolean }>;
}

// Keep TTL choices in lockstep with
// src/schemas/shapes/config/section/secret_options.ts (ttl_options bounds).
const TTL_CHOICES: Choice[] = [
  { value: 300, label: '5 minutes' },
  { value: 1800, label: '30 minutes' },
  { value: 3600, label: '1 hour' },
  { value: 14400, label: '4 hours' },
  { value: 43200, label: '12 hours' },
  { value: 86400, label: '1 day' },
  { value: 259200, label: '3 days' },
  { value: 604800, label: '7 days' },
  { value: 1209600, label: '14 days' },
  { value: 2592000, label: '30 days' },
];

export const OPTIONS: OptionSpec[] = [
  {
    key: 'deployment_mode',
    label: 'Deployment mode',
    description:
      'Simple mode uses Redis/Valkey only, no SQL database. Full mode adds ' +
      'PostgreSQL-backed accounts, teams, and SSO.',
    type: 'select',
    file: 'auth',
    // path handled by a custom applier (writes auth.mode)
    schemaPath: { file: 'auth', path: 'mode' },
    fallbackDefault: 'simple',
    choices: [
      { value: 'simple', label: 'Simple — single container, Redis/Valkey only' },
      { value: 'full', label: 'Full — accounts, teams, SSO (adds PostgreSQL)' },
    ],
    env: [
      { name: 'AUTHENTICATION_MODE' },
      { name: 'AUTH_DATABASE_URL', secret: true, when: 'full' },
      { name: 'ARGON2_SECRET', secret: true, when: 'full' },
    ],
  },
  {
    key: 'email_provider',
    label: 'Email delivery',
    description:
      'How outgoing mail (verification, notifications, password reset) is sent.',
    type: 'select',
    file: 'config',
    path: 'emailer.mode',
    schemaPath: { file: 'config', path: 'emailer.mode' },
    fallbackDefault: 'smtp',
    choices: [
      { value: 'smtp', label: 'Generic SMTP' },
      { value: 'ses', label: 'Amazon SES' },
      { value: 'sendgrid', label: 'SendGrid' },
      { value: 'lettermint', label: 'Lettermint' },
    ],
    env: [
      { name: 'EMAILER_MODE' },
      { name: 'SMTP_HOST', when: 'smtp' },
      { name: 'SMTP_USERNAME', when: 'smtp' },
      { name: 'SMTP_PASSWORD', secret: true, when: 'smtp' },
      { name: 'AWS_ACCESS_KEY_ID', secret: true, when: 'ses' },
      { name: 'AWS_SECRET_ACCESS_KEY', secret: true, when: 'ses' },
      { name: 'SENDGRID_API_KEY', secret: true, when: 'sendgrid' },
      { name: 'LETTERMINT_API_TOKEN', secret: true, when: 'lettermint' },
      { name: 'LETTERMINT_TEAM_TOKEN', secret: true, when: 'lettermint' },
    ],
  },
  {
    key: 'sso_enabled',
    label: 'Single sign-on (SSO)',
    description:
      'External identity providers via OmniAuth (OIDC, Entra ID, Google, ' +
      'GitHub). Requires Full deployment mode.',
    type: 'boolean',
    file: 'auth',
    path: 'full.features.sso',
    fallbackDefault: false,
    requires: { deployment_mode: 'full' },
    env: [{ name: 'AUTH_SSO_ENABLED' }],
  },
  {
    key: 'domains_enabled',
    label: 'Custom domains',
    description:
      'Let users share secrets from their own domain instead of the default host.',
    type: 'boolean',
    file: 'config',
    path: 'features.domains.enabled',
    schemaPath: { file: 'config', path: 'features.domains.enabled' },
    fallbackDefault: false,
    env: [{ name: 'DOMAINS_ENABLED' }],
  },
  {
    key: 'regions_enabled',
    label: 'Multi-region / jurisdictions',
    description:
      'Advertise multiple regional deployments for data-residency requirements.',
    type: 'boolean',
    file: 'config',
    path: 'features.regions.enabled',
    schemaPath: { file: 'config', path: 'features.regions.enabled' },
    fallbackDefault: false,
    env: [{ name: 'REGIONS_ENABLED' }],
  },
  {
    key: 'diagnostics_enabled',
    label: 'Error tracking (Sentry)',
    description: 'Report backend, frontend, and worker exceptions to Sentry.',
    type: 'boolean',
    file: 'config',
    path: 'diagnostics.enabled',
    schemaPath: { file: 'config', path: 'diagnostics.enabled' },
    fallbackDefault: false,
    env: [
      { name: 'DIAGNOSTICS_ENABLED' },
      { name: 'SENTRY_DSN_BACKEND', secret: true, when: true },
    ],
  },
  {
    key: 'trusted_proxy_enabled',
    label: 'Behind a reverse proxy / load balancer',
    description:
      'Trust X-Forwarded-For from an upstream proxy (nginx, Caddy, ALB, k8s ' +
      'ingress) when resolving client IPs.',
    type: 'boolean',
    file: 'config',
    path: 'site.network.trusted_proxy.enabled',
    // NOTE: site.network is not present in the static schema, so there is no
    // schemaPath — the fallbackDefault is authoritative here.
    fallbackDefault: false,
    env: [{ name: 'TRUSTED_PROXY_ENABLED' }],
  },
  {
    key: 'passphrase_required',
    label: 'Require a passphrase on every secret',
    type: 'boolean',
    file: 'config',
    path: 'site.secret_options.passphrase.required',
    schemaPath: { file: 'config', path: 'site.secret_options.passphrase.required' },
    fallbackDefault: false,
    env: [{ name: 'PASSPHRASE_REQUIRED' }],
  },
  {
    key: 'default_ttl',
    label: 'Default secret lifetime',
    type: 'select',
    file: 'config',
    path: 'site.secret_options.default_ttl',
    schemaPath: { file: 'config', path: 'site.secret_options.default_ttl' },
    fallbackDefault: 604800,
    choices: TTL_CHOICES,
    env: [{ name: 'DEFAULT_TTL' }],
  },
];
