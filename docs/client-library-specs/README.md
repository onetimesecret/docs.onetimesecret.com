# Official client library specs

Internal planning briefs for the official client libraries we intend to build.
Not published to the docs site.

## Why these five

Our client-library audit (July 2026) found that **only
[onetime-ruby](https://github.com/onetimesecret/onetime-ruby) supports API v2**,
and only a handful of community libraries can even be pointed at a regional
domain. Everything else calls the deprecated v1 API against the apex domain and
is largely unmaintained. To be current across the ecosystems our users actually
work in, we will ship official clients for:

| Language | Brief | Primary reason |
|---|---|---|
| JavaScript / TypeScript | [`javascript-typescript.md`](./javascript-typescript.md) | No client exists at all; largest integration audience; we already have v2 client code in our own frontend |
| Python | [`python.md`](./python.md) | Big automation/ops audience; existing options are a dead Python 2 library and a v1-only wrapper |
| Go | [`go.md`](./go.md) | The self-hosting devops crowd; one active community lib exists but is v1-era |
| PowerShell | [`powershell.md`](./powershell.md) | Enterprise Windows credential-sharing; existing module frozen since 2021 |
| Perl | [`perl.md`](./perl.md) | Long-tail sysadmin audience; the CPAN namespace is the ecosystem's expectation |

Each brief says **what** to build and **some of the why**. It deliberately does
not prescribe **how** — the executor owns implementation choices within the
constraints below.

## Reference implementation

[**onetime-ruby**](https://github.com/onetimesecret/onetime-ruby) is the
reference. When a question isn't answered here, match its behaviour. Every
official client should feel like the same product in a different language:
same concepts, same method names where the language allows, same error taxonomy.

## The common contract (applies to all five)

**Target the v2 API.** v1 is deprecated; implement it only if parity with the
reference is cheap, and never as the default.

**Authentication.** HTTP Basic: the organization external id is the username,
the API token is the password.

**Configuration.**

- `base_url` is **required** and has no default. The apex domain
  (`onetimesecret.com`) is the marketing site, not an API host, and must be
  rejected with a clear error.
- `api_version` selects v1 or v2 (default v2).
- Timeouts: read 30s, connect 10s. Retries: 2, idempotent requests only.
- Environment-variable fallbacks: `ONETIME_BASE_URL`, `ONETIME_ORG_EXTID`,
  `ONETIME_API_TOKEN`.

**Regions.** Five regional hosts must be reachable via `base_url`: United States,
Europe, United Kingdom, Canada, Aotearoa New Zealand. Arbitrary custom
`base_url`s (self-hosted instances) must work too.

**Resource surface** (mirror the reference; v2-only members noted):

- **Secrets** — `conceal`, `generate`, `reveal`, `show` (v2), `status`,
  `status_list` (v2)
- **Receipts** — `show`, `recent`, `burn`, `update` (v2)
- **Meta** — `status`, `version`, `supported_locales` (v2), `authcheck` (v1)

**Errors.** A typed hierarchy under a single base error:
`BadRequest` (400), `Authentication` (401), `Forbidden` (403), `NotFound` (404),
`RateLimit` (429), `Server` (5xx). Callers should be able to rescue one family
or the base.

**Dependencies.** Prefer the standard library. Match the reference's
zero-runtime-dependency posture unless a language makes that clearly
impractical, in which case keep dependencies to a well-known minimum and justify
each one.

## Definition of done (all clients)

1. Full v2 resource surface above, at parity with the reference.
2. All five regions plus arbitrary self-hosted `base_url`s.
3. Typed error hierarchy; structured responses.
4. Idiomatic packaging published to the language's canonical registry under an
   `onetimesecret`-owned name.
5. README with a copy-paste quickstart and a regions note.
6. Test suite. A shared, language-neutral conformance fixture set (recorded
   request/response pairs per endpoint) is planned so every client can prove
   parity against the same expectations — build toward consuming it.
