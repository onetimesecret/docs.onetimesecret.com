---
title: Client-Bibliotheken
description: Entdecken Sie die Client-Bibliotheken, die für die Onetime Secret API verfügbar sind, darunter Ruby, Python, Perl, Java, C#, Go und mehr.
---

## Ruby


[Github-Seite onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
by [Delano](https://delanotes.com/) (updated 2024-06-09)

### Usage Example

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
secret: 'Jazz, jazz and more jazz. ',
recipient: 'example@onetimesecret.com',
ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Github-Seite - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
by [slashpass](https://github. com/slashpass) (hinzugefügt 2021-07-08)

### Anwendungsbeispiel

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # liefert einen Link wie https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Github page - py\_onetimesecret](https://github. com/utter-step/py_onetimesecret)
by [Vladislav Stepanov](https://github.com/utter-step/) (added 2012-06-26)

### Usage Example

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o. share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[Net::OneTimeSecret auf CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
by [Kyle Dawkins](http://www.shoffle.com/) (added 2012-01-06)

### Usage Example

```perl
#! /usr/bin/env perl

use Net::OneTimeSecret;

# Hinweis: Ersetzen Sie diese Angaben durch Ihre, damit es funktioniert!
my $customerId = 'YOUR_EMAIL';
my $testApiKey = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, Jazz und noch mehr Jazz. ',
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


[Github-Seite - onetime-java](https://github. com/mpawlowski/onetime-java)
by [Marcin Pawlowski](https://github.com/mpawlowski) (added 2014-05-22)

### Usage Example

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
"https://path/to/ots/instance",
"ots-username",
"ots-apikey");

GenerateResponse generateResponse = ots.generate(
new GenerateRequest.Builder()
.withPassphrase("supersecret")
. build());

RetrieveResponse retrieveResponse = ots.retrieve(
new RetrieveRequest.Builder()
.withSecretKey(shareResponse.getSecretKey())
.withPassphrase("supersecret")
.build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Github-Seite - OneTimeSharp](https://github. com/utter-step/OneTimeSharp)
by [Vladislav Stepanov](https://github.com/utter-step/) (added 2014-05-29)

### Usage Example

```csharp
# Sie können OneTimeSharp in jedem Ihrer Projekte verwenden, das mit .NET (4.0+) oder Mono (2.10.8+) kompatibel ist.
using VStepanov. OneTimeSharp;

class Test
{
static void Main(string[] args)
{
var ots = new OneTimeSecret("IHRE_EMAIL", "IHR_OTS_APIKEY");

var generated = ots. GenerateSecret();

Console.WriteLine(generated.Value); // LR*?us*A(UT*

Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
Console.WriteLine(ots. GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

var shared = ots.ShareSecret("Hallo, OTS!");

Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
}
}
```

---

## Go


[Github-Seite - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
by [Corbalt](https://github.com/corbaltcode/) (added 2021-12-10)

### Usage Example

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
Username: "user@example.com",
Key: "my api key",
}

metadata, err := client.Put("the launch codes", ‚passphrase‘, 0, ‚‘)
if err != nil {
// Fehler behandeln
}

secret, err := client.Get(metadata.SecretKey, ‚passphrase‘)
if err != nil {
// Fehler behandeln
}

// druckt "die Startcodes"
print(secret)
```

### Anwendungsbeispiel als CLI

```bash
$ go install github. com/corbaltcode/go- onetimesecret/cmd/ots@latest

$ ots put 'was wesentlich ist, ist für das Auge unsichtbar'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
was wesentlich ist, ist für das Auge unsichtbar

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Github-Seite](https://github.com/emdneto/otsgo)
von [Emídio Neto](https://github. com/emdneto) (added 2024-06-09)

### Usage Example

```go
// Erstellen eines neuen Clients
client := ots.NewClient(
WithUsername("otsuser@domain.com"),
WithApiKey("xxxxxxxx"),
)

// Senden Sie eine Anfrage mit Kontext
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github-Seite - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
von [Craig Gumbley](https://www.helloitscraig.co. uk) (updated 2017-04-28)

### Usage Example

```powershell
# Installieren aus der PowerShell-Galerie
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Setze Verbindungsinformationen
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Erzeuge ein neues gemeinsames Geheimnis
New- OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Abrufen eines Geheimnisses
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Anzeigen aller verfügbaren Funktionen
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Github-Seite - OneTimeSecret-bash](https: //github. com/eengstrom/onetimesecret-bash)
by [Eric Engstrom](https://eengstrom.github.io/) (updated 2018-12-19)

### Verwendungsbeispiel als Scripting-API

```bash
# Quelle zur anonymen Verwendung (Geheimnisse werden anonym erstellt)
Quelle ots. bash

# oder Quelle mit bestimmten Zugangsdaten
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# Status des Servers prüfen
ots_status

# ein Geheimnis erstellen und die URL zurückbekommen
URL=$(echo "secret" | ots_share)

# ein mehrzeiliges Geheimnis über HEREDOC teilen.
URL=$(ots_share <<-EOF
Dies ist ein Geheimnis
... auf mehreren Zeilen
EOF
)

# Übergeben Sie Optionen zum Teilen oder Erzeugen.
URL=$(ots_share ttl=600 \
passphrase="shared-secret" \
recipient="someone@somewhere.com" <<< "SECRET")

# holen Sie die geheimen Daten
local DATA="$(ots_retrieve ‚$URL‘)"

# teilen/erzeugen Sie ein neues Geheimnis und erhalten Sie den privaten Metadatenschlüssel zurück
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# erhalten Sie eine Liste der kürzlich erstellten privaten Metadatenschlüssel.
# beachten Sie, dass dies gültige Anmeldedaten erfordert
local -a RECENT=( $(ots_recent) )

#
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
Dies ist ein mehrzeiliges Geheimnis via HEREDOC.
Hier kommt etwas anderes hin.
EOF

# Ein Geheimnis erhalten/abrufen:
./ots get <key|url>
./ots retrieve <key|url>

### Beispiel für die Verwendung als CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
