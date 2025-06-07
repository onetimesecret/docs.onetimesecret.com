---
title: Biblioteche clienti
description: Esplora le librerie client disponibili per l'API Onetime Secret, tra cui Ruby, Python, Perl, Java, C#, Go e altre.
---

## Rubino


[Pagina Github onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
di [Delano](https://delanotes.com/) (aggiornato al 2024-06-09)

### Esempio di utilizzo

``ruby
richiedere 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
opzioni = {
  secret: 'Jazz, jazz e ancora jazz',
  destinatario: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', opzioni)
mette ret['secret_key']
```

---

## Python


[Pagina Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
da [slashpass](https://github.com/slashpass) (aggiunto il 2021-07-08)

### Esempio di utilizzo

``python
da onetimesecret importare OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # restituisce un link come https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Pagina Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
di [Vladislav Stepanov](https://github.com/utter-step/) (aggiunto il 2012-06-26)

### Esempio di utilizzo

``python
da onetimesecret import OneTimeSecret

o = OneTimeSecret("LA TUA_EMAIL", "LA TUA_OTS_APIKEY")
secret = o.share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[Net::OneTimeSecret su CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
di [Kyle Dawkins](http://www.shoffle.com/) (aggiunto il 2012-01-06)

### Esempio di utilizzo

``perl
#!/usr/bin/env perl

utilizzare Net::OneTimeSecret;

# Nota: sostituite questi dati con i vostri per farli funzionare!
my $customerId = 'YOUR_EMAIL';
my $testApiKey = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz e ancora jazz.',
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


[Pagina Github - onetime-java](https://github.com/mpawlowski/onetime-java)
di [Marcin Pawlowski](https://github.com/mpawlowski) (aggiunto il 2014-05-22)

### Esempio di utilizzo

``java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

GenerateResponse generateResponse = ots.generate(
                nuovo GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                nuovo RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Pagina Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
di [Vladislav Stepanov](https://github.com/utter-step/) (aggiunto il 2014-05-29)

### Esempio di utilizzo

```csharp
# Si può usare OneTimeSharp in qualsiasi progetto compatibile con .NET (4.0+) o Mono (2.10.8+).
using VStepanov.OneTimeSharp;

classe Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Ciao, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Vai


[Pagina Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
da [Corbalt](https://github.com/corbaltcode/) (aggiunto il 2021-12-10)

### Esempio di utilizzo

``go
importare ots "github.com/corbaltcode/go-onetimesecret".

client := ots.Client{
  Nome utente: "user@example.com",
  Chiave: "la mia chiave api",
}

metadata, err := client.Put("i codici di lancio", "passphrase", 0, "")
if err := nil {
  // gestisce l'errore
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err := nil {
  // gestisce l'errore
}

// stampa "i codici di lancio"
print(secret)
```

### Esempio di utilizzo come CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'ciò che è essenziale è invisibile all'occhio'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots ottenere hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
ciò che è essenziale è invisibile agli occhi

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Pagina Github](https://github.com/emdneto/otsgo)
di [Emídio Neto](https://github.com/emdneto) (aggiunto il 2024-06-09)

### Esempio di utilizzo

```go
// Creare un nuovo client
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Inviare una richiesta con il contesto
ctx := context.Background()
response, err := client.GetStatus(ctx)
se err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Pagina Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
di [Craig Gumbley](https://www.helloitscraig.co.uk) (aggiornato al 2017-04-28)

### Esempio di utilizzo

```powershell
# Installare dalla galleria PowerShell
Installa-modulo -Nome OneTimeSecret - Ambito CurrentUser

# Imposta le informazioni sulla connessione
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Generare un nuovo segreto condiviso
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipiente user@mail.com

# Recupera un segreto
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Visualizza tutte le funzioni disponibili
Get-Command -Modulo OneTimeSecret | Seleziona nome
```

---

## Bash


[Pagina Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
di [Eric Engstrom](https://eengstrom.github.io/) (aggiornato al 2018-12-19)

### Esempio di utilizzo come API di scripting

```bash
# sorgente per l'uso anonimo (segreti creati anonimamente)
sorgente ots.bash

# oppure, sorgente con credenziali di autenticazione specifiche
APIUSER="NOMEUTENTE"
APIKEY="APIKEY"
sorgente ots.bash -u $APIUSER -k $APIKEY

# controllare lo stato del server
ots_status

# creare un segreto e ottenere l'URL
URL=$(echo "secret" | ots_share)

# condividere un segreto su più righe tramite HEREDOC.
URL=$(ots_share <<-EOF
      Questo è un segreto
      ... su più righe
EOF
)

# passare le opzioni per condividere o generare.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  destinatario="someone@somewhere.com" <<< "SECRET")

# recupera i dati segreti
local DATA="$(ots_retrieve "$URL")"

# condividere/generare un nuovo segreto e ottenere la chiave privata dei metadati
local KEY=$(ots_metashare <<< "SECRET")
KEY locale=$(ots_metagenerate)

# ottenere un elenco di chiavi private di metadati create di recente.
# Si noti che questo richiede credenziali di autenticazione valide.
local -a RECENT=( $(ots_recent) )

# verifica lo stato attuale di un segreto, data la chiave privata
ots_state $KEY

# bruciare un segreto, data la chiave privata
ots_burn $KEY
```

### Esempio di utilizzo come CLI

```bash
# Condividere un segreto (da stdin
./ots share
SEGRETO
^D

# Condividere un segreto (via HEREDOC)
./ots share <<-EOF
      Questo è un segreto a più righe tramite HEREDOC.
      Qualcosa di diverso va qui.
EOF

# Ottenere/recuperare un segreto:
./ots ottenere <chiave|url>
./ots recuperare <chiave|url>

### Esempio di utilizzo come CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
