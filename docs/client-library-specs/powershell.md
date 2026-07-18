# Official client: PowerShell

## Why

Windows-centric enterprise IT teams share credentials constantly, and that is
squarely our audience. The existing community module
([chelnak/OneTimeSecret](https://github.com/chelnak/OneTimeSecret)) proved the
use case but has been frozen since 2021 and is v1-only.

## What to build

A PowerShell module implementing the
[common contract](./README.md#the-common-contract-applies-to-all-five), shaped
to PowerShell conventions rather than mirroring method names literally.

- **PowerShell 7+** (cross-platform) as the primary target; note Windows
  PowerShell 5.1 compatibility if it's cheap, but don't compromise the design
  for it.
- **Verb-Noun cmdlets** from the approved verb list, over a shared `OneTimeSecret`
  noun (e.g. conceal/reveal/burn map to sensible approved verbs). Support the
  pipeline where it's natural.
- **Handle the API token as a `SecureString`/`PSCredential`**, not a plain
  string, and connection settings via a session-scoped configuration cmdlet.
- **Custom base URL** is first-class — this crowd self-hosts and uses regional
  domains.

## Distribution

PowerShell Gallery, as `OneTimeSecret` (coordinate with the existing owner if
the name is taken; otherwise publish under an org-owned name).

## Target ergonomics

```powershell
Set-OTSConnection -BaseUrl "https://uk.onetimesecret.com" -Organization $org -ApiToken $token
$receipt = New-OTSSecret -Secret "..." -Ttl 7200
Read-OTSSecret -SecretKey $receipt.SecretKey -Passphrase "..."
```

## Done when

The [common definition of done](./README.md#definition-of-done-all-clients) is
met, plus: cmdlets use approved verbs, tokens are never handled as plain text,
and the module loads on PowerShell 7 across platforms.
