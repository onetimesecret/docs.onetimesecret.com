---
title: Klantenbibliotheken
description: Verken de client libraries die beschikbaar zijn voor de Onetime Secret API, waaronder Ruby, Python, Perl, Java, C#, Go en meer.
---

## Ruby


[Github pagina onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
door [Delano](https://delanotes.com/) (bijgewerkt op 2024-06-09)

### Gebruiksvoorbeeld

``ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
opties = {
  secret: "Jazz, jazz en nog meer jazz,
  ontvanger: "example@onetimesecret.com",
  ttl: 7200
}

ret = api.post('/share', opties)
puts ret['secret_key']
```

---

## Python


[Github pagina - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
door [slashpass](https://github.com/slashpass) (toegevoegd 2021-07-08)

### Gebruiksvoorbeeld

``python
van onetimesecret importeer OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # stuur een link terug zoals https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Github pagina - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
door [Vladislav Stepanov](https://github.com/utter-step/) (toegevoegd 2012-06-26)

### Gebruiksvoorbeeld

``python
van onetimesecret importeer OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
geheim = o.share(u"test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'waarde': u'test'}
```

---

## Perl


[Net::OneTimeSecret op CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
door [Kyle Dawkins](http://www.shoffle.com/) (toegevoegd 2012-01-06)

### Gebruiksvoorbeeld

``perl
#!/usr/bin/env perl

gebruik Net::OneTimeSecret;

# Let op: vervang deze door de jouwe om dit te laten werken!
mijn $customerId = 'YOUR_EMAIL';
mijn $testApiKey = 'YOUR_OTS_APIKEY';

mijn $api = Net::OneTimeSecret->new( $klantId, $testApiKey );
mijn $result = $api->shareSecret( 'Jazz, jazz en nog meer jazz.',
                   wachtwoord => 'thepassword',
                   ontvanger => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

mijn $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );
```

---

## Java


[Github pagina - onetime-java](https://github.com/mpawlowski/onetime-java)
door [Marcin Pawlowski](https://github.com/mpawlowski) (toegevoegd 2014-05-22)

### Gebruiksvoorbeeld

Java
OneTimeSecret ots = nieuwe OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-gebruikersnaam",
    "ots-apikey");

GenerateResponse generateResponse = ots.generate(
                nieuwGenereerRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                nieuw RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Github pagina - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
door [Vladislav Stepanov](https://github.com/utter-step/) (toegevoegd op 2014-05-29)

### Gebruiksvoorbeeld

``csharp
# U kunt OneTimeSharp gebruiken in elk van uw projecten die compatibel zijn met .NET (4.0+) of Mono (2.10.8+).
Gebruik VStepanov.OneTimeSharp;

klasse Test
{
    static void Main(string[] args)
    {
        var ots = nieuwe OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var gedeeld = ots.ShareSecret("Hallo, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Ga


[Github pagina - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
door [Corbalt](https://github.com/corbaltcode/) (toegevoegd 2021-12-10)

### Gebruiksvoorbeeld

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Gebruikersnaam: "user@example.com",
  Sleutel: "mijn api-sleutel",
}

metagegevens, err := client.put("de lanceercodes", "wachtwoordzin", 0, "")
if err != nil {
  // fout afhandelen
}

geheim, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // fout afhandelen
}

// drukt "de lanceercodes" af
print(secret)
```

### Gebruiksvoorbeeld als CLI

``bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots zet 'wat essentieel is, is onzichtbaar voor het oog'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots krijgen hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
wat essentieel is, is onzichtbaar voor het oog

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots brandwond flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Github-pagina](https://github.com/emdneto/otsgo)
door [Emídio Neto](https://github.com/emdneto) (toegevoegd 2024-06-09)

### Gebruiksvoorbeeld

```go
// Een nieuwe client bouwen
client := ots.NewClient(
      MetGebruikersnaam("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Een verzoek verzenden met context
ctx := context.Achtergrond()
antwoord, err := client.GetStatus(ctx)
Als err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github pagina - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
door [Craig Gumbley](https://www.helloitscraig.co.uk) (bijgewerkt op 2017-04-28)

### Gebruiksvoorbeeld

``powershell
# Installeren vanuit de PowerShell-galerij
Installeer-module -Naam OneTimeSecret -Scope CurrentUser

# Verbindingsinformatie instellen
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Genereer een nieuw gedeeld geheim
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Een geheim ophalen
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Bekijk alle functies die beschikbaar zijn
Get-Command -Module OneTimeSecret | Selecteer Naam
```

---

## Bash


[Github pagina - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
door [Eric Engstrom](https://eengstrom.github.io/) (bijgewerkt 2018-12-19)

### Gebruiksvoorbeeld als Scripting API

``bash
# bron voor anoniem gebruik (geheimen anoniem aangemaakt)
bron ots.bash

# of, bron met specifieke auth credentials
APIUSER="GEBRUIKERSNAAM"
APIKEY="APIKEY"
bron ots.bash -u $APIUSER -k $APIKEY

# controleer status van server
ots_status

# maak een geheim en krijg de URL terug
URL=$(echo "secret" | ots_share)

# deel een geheim van meerdere regels via HEREDOC.
URL=$(ots_share <<-EOF
      Dit is een geheim
      ... op meerdere regels
EOF
)

# opties doorgeven om te delen of te genereren.
URL=$(ots_share ttl=600 \
                  wachtwoordzin="gedeeld-geheim" \
                  ontvanger="someone@somewhere.com" <<< "SECRET")

# de geheime gegevens ophalen
local DATA="$(ots_retrieve "$URL")"

# deel/genereer een nieuw geheim en krijg de privé metagegevenssleutel terug
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# krijg een lijst van privé metadata sleutels die recent zijn aangemaakt.
# merk op dat hiervoor geldige autnenticatiegegevens nodig zijn
local -a RECENT=( $(ots_recent) )

# controleer de huidige status van een geheim, gegeven de privésleutel
ots_status $KEY

# brand een geheim, gegeven de privésleutel
ots_branden $KEY
```

### Gebruiksvoorbeeld als CLI

``bash
# Deel een geheim (vanaf stdin
./ots delen
GEHEIM
^D

# Een geheim delen (via HEREDOC)
./ots delen <<-EOF
      Dit is een meerregelig geheim via HEREDOC.
      Iets anders moet hier.
EOF

# Haal een geheim op:
./ots get <key|url>
./ots ophalen <sleutel|url>

### Gebruiksvoorbeeld als CLI

``bash
$ ots brand flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
