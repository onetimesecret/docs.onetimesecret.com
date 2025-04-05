---
title: Bibliothèques des clients
description: Explorer les bibliothèques client disponibles pour l'API Onetime Secret, y compris Ruby, Python, Perl, Java, C#, Go, et plus encore.
---

## Rubis


[Page Github onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
par [Delano](https://delanotes.com/) (mis à jour le 2024-06-09)

### Exemple d'utilisation

``Ruby
nécessite 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret : 'Jazz, jazz et encore du jazz',
  recipient : 'example@onetimesecret.com',
  ttl : 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Page Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
par [slashpass](https://github.com/slashpass) (ajouté le 2021-07-08)

### Exemple d'utilisation

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # renvoie un lien comme https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Page Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
par [Vladislav Stepanov](https://github.com/utter-step/) (ajouté 2012-06-26)

### Exemple d'utilisation

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key' : u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value' : u'test'}
```

---

## Perl


[Net::OneTimeSecret sur CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
par [Kyle Dawkins](http://www.shoffle.com/) (ajouté le 2012-01-06)

### Exemple d'utilisation

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret ;

# Note : remplacez-les par les vôtres pour que cela fonctionne !
my $customerId = 'YOUR_EMAIL' ;
my $testApiKey = 'YOUR_OTS_APIKEY' ;

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey ) ;
my $result = $api->shareSecret('Jazz, jazz et encore jazz.',
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 ) ;
printf("%s\n", $result->{secret_key} ) ;

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" ) ;
printf("%s\n", $secret->{valeur} ) ;
```

---

## Java


[Page Github - onetime-java](https://github.com/mpawlowski/onetime-java)
par [Marcin Pawlowski](https://github.com/mpawlowski) (ajouté 2014-05-22)

### Exemple d'utilisation

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey") ;

GenerateResponse generateResponse = ots.generate(
                nouveau GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build()) ;

RetrieveResponse retrieveResponse = ots.retrieve(
                new RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build()) ;

assertEquals(generateResponse.getValue(), retrieveResponse.getValue()) ;
```

---

## C#


[Page Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
par [Vladislav Stepanov](https://github.com/utter-step/) (ajouté 2014-05-29)

### Exemple d'utilisation

```csharp
# Vous pouvez utiliser OneTimeSharp dans tous vos projets compatibles avec .NET (4.0+) ou Mono (2.10.8+).
using VStepanov.OneTimeSharp ;

classe Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY") ;

        var generated = ots.GenerateSecret() ;

        Console.WriteLine(generated.Value) ; // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey) ; // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)) ; // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Hello, OTS !") ;

        Console.WriteLine(shared.MetadataKey) ; // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)) ; // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[Page Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
par [Corbalt](https://github.com/corbaltcode/) (ajouté le 2021-12-10)

### Exemple d'utilisation

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Nom d'utilisateur : "user@example.com",
  Clé : "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // traiter l'erreur
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // traiter l'erreur
}

// imprime "les codes de lancement"
print(secret)
```

### Exemple d'utilisation en tant que CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'ce qui est essentiel est invisible à l'œil'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6paxy4in8zuq7sm
l'essentiel est invisible à l'œil

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0v5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Page Github](https://github.com/emdneto/otsgo)
par [Emídio Neto](https://github.com/emdneto) (ajouté le 2024-06-09)

### Exemple d'utilisation

```go
// Construire un nouveau client
client := ots.NewClient(
      AvecUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Envoi d'une requête avec le contexte
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Page Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
par [Craig Gumbley](https://www.helloitscraig.co.uk) (mis à jour le 2017-04-28)

### Exemple d'utilisation

```powershell
# Installation à partir de la galerie PowerShell
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Définir les informations de connexion
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxx

# Générer un nouveau secret partagé
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Récupérer un secret
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Afficher toutes les fonctions disponibles
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Page Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
par [Eric Engstrom](https://eengstrom.github.io/) (mis à jour 2018-12-19)

### Exemple d'utilisation en tant qu'API de script

```bash
# source pour utilisation anonyme (secrets créés anonymement)
source ots.bash

# ou, source avec des informations d'authentification spécifiques
APIUSER="NOM D'UTILISATEUR"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# vérifier l'état du serveur
ots_status

# créer un secret et récupérer l'URL
URL=$(echo "secret" | ots_share)

# partager un secret à plusieurs lignes via HEREDOC.
URL=$(ots_share <<-EOF
      Ceci est un secret
      ... sur plusieurs lignes
EOF
)

# passer des options pour partager ou générer.
URL=$(ots_share ttl=600 \N-)
                  passphrase="shared-secret" \N- en anglais seulement
                  recipient="someone@somewhere.com" <<< "SECRET")

# récupérer les données secrètes
local DATA="$(ots_retrieve "$URL")"

# partager/générer un nouveau secret, et récupérer la clé privée des métadonnées
local KEY=$(ots_metashare << "SECRET")
local KEY=$(ots_metagenerate)

# obtenir une liste des clés de métadonnées privées récemment créées.
# noter que cela nécessite des identifiants d'authentification valides
local -a RECENT=( $(ots_recent) )

# vérification de l'état actuel d'un secret, compte tenu de la clé privée
ots_state $KEY

# brûler un secret, à partir de la clé privée
ots_burn $KEY
```

### Exemple d'utilisation en tant que CLI

```bash
# Partager un secret (à partir de stdin
./ots share
SECRET
^D

# Partager un secret (via HEREDOC)
./ots share <<-EOF
      Il s'agit d'un secret à plusieurs lignes via HEREDOC.
      Quelque chose d'autre va ici.
EOF

# Obtenir/récupérer un secret :
./ots get <key|url> (en anglais)
./ots retrieve <key|url> (récupérer la clé)

### Exemple d'utilisation en tant que CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
