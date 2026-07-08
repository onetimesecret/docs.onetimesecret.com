---
title: Client Libraries
description: Explore the client libraries available for the Onetime Secret API, including Ruby, Python, Perl, Java, C#, Go, and more.
---

The **official client is [onetime-ruby](https://github.com/onetimesecret/onetime-ruby)**,
which supports API v1 and v2, all [regional domains](/en/regions), and custom
base URLs.

Everything else on this page is **community-maintained**. Most of these
libraries predate API v2 and the regional domains, so they typically call the
deprecated v1 endpoints against `onetimesecret.com` — check each entry's
status note, and verify a library works against your region or self-hosted
instance before depending on it.

| Language | Library | Last activity¹ | Regional / custom domain |
|---|---|---|---|
| Ruby | [onetime-ruby](https://github.com/onetimesecret/onetime-ruby) (**official**) | 2026-06 | ✅ all regions + custom base URL |
| Go | [go-onetimesecret](https://github.com/corbaltcode/go-onetimesecret) | 2026-05 | US host |
| Python | [onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli) | 2024-11 | US / EU region option |
| Go | [otsgo](https://github.com/emdneto/otsgo) | 2024-03 | not documented |
| PowerShell | [OneTimeSecret](https://github.com/chelnak/OneTimeSecret) | 2021-06 | custom base URL |
| Bash | [onetimesecret-bash](https://github.com/eengstrom/onetimesecret-bash) | 2020-05 | custom host |
| Python | [py_onetimesecret](https://github.com/utterstep/py_onetimesecret) | 2019-05 | ❌ (Python 2-era) |
| C# | [OneTimeSharp](https://github.com/utterstep/OneTimeSharp) | 2018-05 | ❌ |
| Java | [onetime-java](https://github.com/mpawlowski/onetime-java) | 2014-06 | self-hosted URL only |
| Perl | [Net::OneTimeSecret](https://metacpan.org/pod/Net::OneTimeSecret) | 2012-02 | ❌ |

¹ Most recent commit or release at the time of the last audit (2026-07).

## Ruby


[Github page onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
by [Delano](https://delanotes.com/) — **official client**, actively maintained
(last commit 2026-06). Supports API v1 (deprecated) and v2, regional domains,
and custom base URLs. Requires Ruby 3.1+, zero runtime dependencies.

### Usage Example

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: 'Jazz, jazz and more jazz.',
  recipient: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Github page - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
by [slashpass](https://github.com/slashpass) — community-maintained (last
commit 2024-11). Supports a region option (`us` / `eu`).

### Usage Example

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # return a link like https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Github page - py\_onetimesecret](https://github.com/utterstep/py_onetimesecret)
by [Vladislav Stepanov](https://github.com/utterstep) — **unmaintained** (last
commit 2019; the example below is Python 2). Uses the deprecated v1 API against
`onetimesecret.com` only.

### Usage Example

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u"test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[Net::OneTimeSecret on CPAN](https://metacpan.org/pod/Net::OneTimeSecret)
by [Kyle Dawkins](http://www.shoffle.com/) — **unmaintained** (last release
0.04, 2012-02). Predates API v2 and regional domains.

### Usage Example

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret;

# Note: replace these with yours in order for this to work!
my $customerId  = 'YOUR_EMAIL';
my $testApiKey  = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.',
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );
```

---

## Java


[Github page - onetime-java](https://github.com/mpawlowski/onetime-java)
by [Marcin Pawlowski](https://github.com/mpawlowski) — **unmaintained** (last
commit 2014-06). Takes an instance URL, so it may work self-hosted, but it
predates API v2.

### Usage Example

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

GenerateResponse generateResponse = ots.generate(
                new GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                new RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Github page - OneTimeSharp](https://github.com/utterstep/OneTimeSharp)
by [Vladislav Stepanov](https://github.com/utterstep) — **unmaintained** (last
commit 2018-05). Uses the deprecated v1 API against `onetimesecret.com` only.

### Usage Example

```csharp
# You can use OneTimeSharp in any of your projects which are compatible with .NET (4.0+) or Mono (2.10.8+).
using VStepanov.OneTimeSharp;

class Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Hello, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[Github page - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
by [Corbalt](https://github.com/corbaltcode/) — community-maintained (last
commit 2026-05, updated for the `us.onetimesecret.com` host). Includes a CLI.

### Usage Example

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Username: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // handle error
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // handle error
}

// prints "the launch codes"
print(secret)
```

### Usage Example as CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'what is essential is invisible to the eye'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
what is essential is invisible to the eye

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Github page](https://github.com/emdneto/otsgo)
by [Emídio Neto](https://github.com/emdneto) — community-maintained (last
release v1.1.0, 2024-03). Regional-domain support not documented.

### Usage Example

```go
// Build a new client
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Send a request with context
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github page - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
by [Craig Gumbley](https://www.helloitscraig.co.uk) — **unmaintained** (last
release 2021-06). Supports a custom `-BaseUrl`, so it can point at a region or
self-hosted instance, but it predates API v2.

### Usage Example

```powershell
# Install from the PowerShell gallery
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Set connection information
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Generate a new shared secret
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Retrieve a secret
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# View all functions that are available
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Github page - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
by [Eric Engstrom](https://eengstrom.github.io/) — **unmaintained** (last
commit 2020-05). Supports a custom host via `ots_set_host`, but predates API
v2 and regional domains.

### Usage Example as Scripting API

```bash
# source for use anonymously (secrets created anonymously)
source ots.bash

# or, source with specific auth credentials
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# check status of server
ots_status

# create a secret and get back the URL
URL=$(echo "secret" | ots_share)

# share a multi line secret via HEREDOC.
URL=$(ots_share <<-EOF
      This is a Secret
      ... on multiple lines
EOF
)

# pass options to share or generate.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# fetch the secret data
local DATA="$(ots_retrieve "$URL")"

# share/generate a new secret, and get back the private metadata key
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# get a list of private metadata keys recently created.
# note that this requires valid autnentication credentials
local -a RECENT=( $(ots_recent) )

# check on the current state of a secret, given the private key
ots_state $KEY

# burn a secret, given the private key
ots_burn $KEY
```

### Usage Example as CLI

```bash
# Share a secret (from stdin
./ots share
SECRET
^D

# Share a secret (via HEREDOC)
./ots share <<-EOF
      This is a mulit-line secret via HEREDOC.
      Somthing else goes here.
EOF

# Get/Retrieve a secret:
./ots get <key|url>
./ots retrieve <key|url>

# Burn a secret:
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
