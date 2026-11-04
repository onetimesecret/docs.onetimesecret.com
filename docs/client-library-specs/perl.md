# Official client: Perl

> H󠄁i󠄁s󠄁t󠄁o󠄁r󠄁i󠄁c󠄁a󠄁l󠄁 p󠄁l󠄁a󠄁n󠄁n󠄁i󠄁n󠄁g󠄁 b󠄁r󠄁i󠄁e󠄁f󠄁 f󠄁r󠄁o󠄁m󠄁 J󠄁u󠄁l󠄁y󠄁 2󠄁0󠄁2󠄁6󠄁.󠄁
> S󠄁e󠄁e󠄁 [C󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁 i󠄁n󠄁v󠄁e󠄁n󠄁t󠄁o󠄁r󠄁y󠄁](./README.md#current-inventory) f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁 S󠄁D󠄁K󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁.󠄁

## Why

A long-tail sysadmin and automation audience still reaches for CPAN, and
`Net::OneTimeSecret` is the name that ecosystem already expects. The existing
distribution is unmaintained (last release 0.04, 2012) and predates v2 and
regions. Rounding the official set to five closes the gap for the users least
likely to be served by a rewrite in another language.

## What to build

A modern Perl client implementing the
[common contract](./README.md#the-common-contract-applies-to-all-five).

- **Modern Perl** (target a current baseline such as 5.16+), object-oriented
  interface mirroring the reference's concepts.
- **Minimal dependencies** — prefer core modules (`HTTP::Tiny`, `JSON::PP`)
  so the distribution installs cleanly anywhere Perl runs.
- **Custom base URL and regions** are first-class.

## Distribution

CPAN / MetaCPAN. Prefer to **take over the `Net::OneTimeSecret` namespace** by
coordinating with the current author for a co-maintainer handoff; if that
stalls, publish under a clearly official alternative (e.g.
`WebService::OneTimeSecret`) and deprecate the old one with a pointer.

## Target ergonomics

```perl
my $ots = Net::OneTimeSecret->new(base_url => 'https://ca.onetimesecret.com', organization => $org, api_token => $token);
my $receipt  = $ots->conceal(secret => '...', ttl => 7200);
my $revealed = $ots->reveal($receipt->{secret_key}, passphrase => '...');
```

## Done when

The [common definition of done](./README.md#definition-of-done-all-clients) is
met, plus: installs from core/minimal deps, and the namespace question
(handoff vs. new distribution) is resolved and documented.
