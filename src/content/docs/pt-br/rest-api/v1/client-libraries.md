---
title: Bibliotecas Cliente
description: Explore as bibliotecas cliente disponíveis para a API do Onetime Secret, incluindo Ruby, Python, Perl, Java, C#, Go e muito mais.
---

## Ruby

[Página no Github onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
por [Delano](https://delanotes.com/) (atualizado em 09/06/2024)

### Exemplo de Uso

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

[Página no Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
por [slashpass](https://github.com/slashpass) (adicionado em 08/07/2021)

### Exemplo de Uso

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # return a link like https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Página no Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
por [Vladislav Stepanov](https://github.com/utter-step/) (adicionado em 26/06/2012)

### Exemplo de Uso

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

[Net::OneTimeSecret no CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
por [Kyle Dawkins](http://www.shoffle.com/) (adicionado em 06/01/2012)

### Exemplo de Uso

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

[Página no Github - onetime-java](https://github.com/mpawlowski/onetime-java)
por [Marcin Pawlowski](https://github.com/mpawlowski) (adicionado em 22/05/2014)

### Exemplo de Uso

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

[Página no Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
por [Vladislav Stepanov](https://github.com/utter-step/) (adicionado em 29/05/2014)

### Exemplo de Uso

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

[Página no Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
por [Corbalt](https://github.com/corbaltcode/) (adicionado em 10/12/2021)

### Exemplo de Uso

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

### Exemplo de Uso como CLI

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

[Página no Github](https://github.com/emdneto/otsgo)
por [Emídio Neto](https://github.com/emdneto) (adicionado em 09/06/2024)

### Exemplo de Uso

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

[Página no Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
por [Craig Gumbley](https://www.helloitscraig.co.uk) (atualizado em 28/04/2017)

### Exemplo de Uso

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

[Página no Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
por [Eric Engstrom](https://eengstrom.github.io/) (atualizado em 19/12/2018)

### Exemplo de Uso como API de Script

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

### Exemplo de Uso como CLI

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

### Exemplo de Uso como CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
