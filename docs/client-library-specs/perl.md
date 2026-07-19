# Official client: Perl

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
