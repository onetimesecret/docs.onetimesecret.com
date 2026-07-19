# Official client: JavaScript / TypeScript

## Why

The single highest-leverage gap. There is **no** JS/TS client on our
client-libraries page at all — in the ecosystem where most integration code is
written. We also already have working v2 client code inside our own Vue/TS
frontend, so this is as much extraction as greenfield.

## What to build

A **TypeScript-first** client (ships its own types, no `@types` package needed)
implementing the [common contract](./README.md#the-common-contract-applies-to-all-five).

- **Runtime-agnostic.** Build on the platform `fetch` so one package runs on
  Node (LTS), Deno, Bun, and edge/worker runtimes. No Node-only APIs in the core.
- **Dual module format.** Ship ESM and CJS.
- **Async.** Promise-based; every network method returns a promise.
- **Server-side only, by design.** Using this in a browser would expose the API
  token. The quickstart and docs must say so plainly.

## Distribution

npm, published as `@onetimesecret/client` (or similar under our npm org).
Zero runtime dependencies is the target — platform `fetch` makes it achievable.

## Target ergonomics

```ts
const ots = new OneTimeSecret({ baseUrl: "https://us.onetimesecret.com", organization, apiToken });
const receipt = await ots.secrets.conceal({ secret: "...", ttl: 7200 });
const revealed = await ots.secrets.reveal(receipt.secretKey, { passphrase: "..." });
```

## Done when

The [common definition of done](./README.md#definition-of-done-all-clients) is
met, plus: types are exported for every request/response, and the package is
verified on at least Node and one non-Node runtime.
