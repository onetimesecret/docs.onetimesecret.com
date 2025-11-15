---
title: Klientbibliotek
description: Utforska klientbiblioteken tillgängliga för Onetime Secret API, inklusive Ruby, Python, Perl, Java, C#, Go och mer.
---

## Ruby

[Github-sida onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
av [Delano](https://delanotes.com/) (uppdaterad 2024-06-09)

### Användningsexempel

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

[Github-sida - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
av [slashpass](https://github.com/slashpass) (tillagd 2021-07-08)

### Användningsexempel

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # returnerar en länk som https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Github-sida - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
av [Vladislav Stepanov](https://github.com/utter-step/) (tillagd 2012-06-26)

### Användningsexempel

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

[Net::OneTimeSecret på CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
av [Kyle Dawkins](http://www.shoffle.com/) (tillagd 2012-01-06)

### Användningsexempel

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret;

# Notera: ersätt dessa med dina för att detta ska fungera!
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

[Github-sida - onetime-java](https://github.com/mpawlowski/onetime-java)
av [Marcin Pawlowski](https://github.com/mpawlowski) (tillagd 2014-05-22)

### Användningsexempel

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

[Github-sida - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
av [Vladislav Stepanov](https://github.com/utter-step/) (tillagd 2014-05-29)

### Användningsexempel

```csharp
# Du kan använda OneTimeSharp i vilket som helst av dina projekt som är kompatibla med .NET (4.0+) eller Mono (2.10.8+).
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

[Github-sida - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
av [Corbalt](https://github.com/corbaltcode/) (tillagd 2021-12-10)

### Användningsexempel

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Username: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // hantera fel
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // hantera fel
}

// skriver ut "the launch codes"
print(secret)
```

### Användningsexempel som CLI

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

[Github-sida](https://github.com/emdneto/otsgo)
av [Emídio Neto](https://github.com/emdneto) (tillagd 2024-06-09)

### Användningsexempel

```go
// Bygg en ny klient
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Skicka en förfrågan med kontext
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell

[Github-sida - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
av [Craig Gumbley](https://www.helloitscraig.co.uk) (uppdaterad 2017-04-28)

### Användningsexempel

```powershell
# Installera från PowerShell-galleriet
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Ställ in anslutningsinformation
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Generera en ny delad hemlighet
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Hämta en hemlighet
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Visa alla funktioner som är tillgängliga
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash

[Github-sida - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
av [Eric Engstrom](https://eengstrom.github.io/) (uppdaterad 2018-12-19)

### Användningsexempel som skripting-API

```bash
# source för att använda anonymt (hemligheter skapade anonymt)
source ots.bash

# eller, source med specifika autentiseringsuppgifter
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# kontrollera serverstatus
ots_status

# skapa en hemlighet och få tillbaka URL:en
URL=$(echo "secret" | ots_share)

# dela en flerradig hemlighet via HEREDOC.
URL=$(ots_share <<-EOF
      This is a Secret
      ... on multiple lines
EOF
)

# skicka alternativ till share eller generate.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# hämta hemlig data
local DATA="$(ots_retrieve "$URL")"

# dela/generera en ny hemlighet och få tillbaka den privata metadatanyckeln
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# få en lista över privata metadatanycklar som nyligen skapats.
# notera att detta kräver giltiga autentiseringsuppgifter
local -a RECENT=( $(ots_recent) )

# kontrollera det aktuella tillståndet för en hemlighet, givet den privata nyckeln
ots_state $KEY

# bränn en hemlighet, givet den privata nyckeln
ots_burn $KEY
```

### Användningsexempel som CLI

```bash
# Dela en hemlighet (från stdin)
./ots share
SECRET
^D

# Dela en hemlighet (via HEREDOC)
./ots share <<-EOF
      This is a mulit-line secret via HEREDOC.
      Somthing else goes here.
EOF

# Hämta/få en hemlighet:
./ots get <key|url>
./ots retrieve <key|url>

### Användningsexempel som CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
