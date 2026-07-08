# Official client: Python

## Why

Large automation, scripting, and ops audience. Today they get a choice between a
**dead Python 2** library and a **v1-only** CLI wrapper — neither speaks v2 or
regions. An official, typed PyPI package replaces both.

## What to build

A modern Python client implementing the
[common contract](./README.md#the-common-contract-applies-to-all-five).

- **Python 3.9+**, fully type-hinted, ships `py.typed`.
- **Sync first.** A synchronous client covers the automation use case. An async
  client is a fast-follow, not a launch blocker — but design the internals so it
  can be added without a breaking API change.
- **Pythonic surface.** Snake_case methods mirroring the reference; typed
  exceptions; dataclass-like or mapping responses with attribute access.

## Distribution

PyPI, as `onetimesecret` (claim the name). Prefer the standard library for the
sync path to stay dependency-light; if async lands on a third-party HTTP client,
keep it optional (an extra), not a hard dependency of the base install.

## Target ergonomics

```python
ots = OneTimeSecret(base_url="https://eu.onetimesecret.com", organization=org, api_token=token)
receipt = ots.secrets.conceal(secret="...", ttl=7200)
revealed = ots.secrets.reveal(receipt.secret_key, passphrase="...")
```

## Done when

The [common definition of done](./README.md#definition-of-done-all-clients) is
met, plus: `py.typed` present, passes a type checker in strict mode, and the
sync client is complete (async may trail).
