# Official client: Go

## Why

The self-hosting, devops, and infrastructure crowd lives here. A community
library ([corbaltcode/go-onetimesecret](https://github.com/corbaltcode/go-onetimesecret))
is alive and was recently touched for the `us.` host, but it is v1-era and
includes a CLI.

## Decide first: adopt or greenfield

Before writing anything, evaluate **adopting or upstreaming the corbaltcode
library** — reaching out about v2 support, or bringing it under our org — versus
a clean-room implementation. It is the cheaper path if the maintainer is willing
and the code is sound. Record the decision; the rest of this brief applies
either way.

## What to build

An idiomatic Go client implementing the
[common contract](./README.md#the-common-contract-applies-to-all-five).

- **`context.Context`** as the first argument of every network method.
- **Functional options** for configuration (`base_url`, version, timeouts,
  retries), with the environment-variable fallbacks.
- **Typed sentinel errors** for the taxonomy, usable with `errors.Is`.
- **Ship a CLI** (`cmd/ots`) matching the reference's command set — the existing
  Go community lib set this expectation and it's genuinely useful.
- **Zero dependencies** — `net/http` and the standard library are enough.

## Distribution

A Go module under our org, e.g. `github.com/onetimesecret/onetimesecret-go`,
with the CLI installable via `go install .../cmd/ots@latest`.

## Target ergonomics

```go
client := ots.New(ots.WithBaseURL("https://us.onetimesecret.com"), ots.WithOrg(org), ots.WithToken(token))
receipt, err := client.Secrets.Conceal(ctx, ots.ConcealParams{Secret: "...", TTL: 7200})
revealed, err := client.Secrets.Reveal(ctx, receipt.SecretKey, ots.RevealParams{Passphrase: "..."})
```

## Done when

The [common definition of done](./README.md#definition-of-done-all-clients) is
met, plus: the adopt-vs-greenfield decision is documented, and the CLI ships
alongside the library.
