---
title: Creare segreti
description: Imparare a creare e recuperare i segreti utilizzando l'API REST di Onetime Secret, con supporto per l'uso sia autenticato che anonimo.
---

Aggiornato al 2025-04-02

:::nota
**Selezione della località e della regione dei dati**
- Scegliere tra i centri dati degli Stati Uniti ([`us.onetimesecret.com`](https://us.onetimesecret.com/)) o dell'UE ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)).
- Considerare fattori come la sovranità dei dati, la latenza e i requisiti di conformità.
- **NOTA:** L'indirizzo predefinito `onetimesecret.com` rimane operativo e instrada verso un centro dati attivo; si raccomanda di utilizzare una località specifica poiché questa funzionalità potrebbe essere deprecata in futuro.
:::


## Creare un segreto

`POST https://REGION.onetimesecret.com/api/v1/share`

Utilizzare questo endpoint per memorizzare un valore segreto e creare un collegamento una tantum.


### Richiesta autenticata

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMERO_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Richiesta anonima

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Parametri della query

- **secret**: il valore segreto che viene crittografato prima di essere memorizzato. In base al piano, viene applicata una lunghezza massima (1k-10k).
- **passphrase**: una stringa che il destinatario deve conoscere per visualizzare il segreto. Questo valore è usato anche per criptare il segreto e viene crittografato prima di essere memorizzato, in modo da avere questo valore solo in transito.
- **ttl**: il tempo massimo, in secondi, in cui il segreto deve sopravvivere (cioè il time-to-live). Una volta scaduto questo tempo, il segreto verrà cancellato e non sarà più recuperabile.
- **destinatario**: un indirizzo e-mail. Verrà inviata un'e-mail amichevole contenente il link al segreto (NON il segreto stesso).
- **dominio_di_condivisione**: il dominio personalizzato da utilizzare per generare il link segreto. Se non viene fornito, viene utilizzato il dominio predefinito (ad esempio, eu.onetimesecret.com).

### Attributi

- **custid**: il nome utente dell'account che ha creato il segreto. Questo valore sarà `anon` per le richieste anonime.
- **metadata\_key**: la chiave unica per i metadati. NON condividerla.
- **secret\_key**: la chiave univoca per il segreto creato. È una chiave che si può condividere.
- **ttl**: Il time-to-live (in secondi) che è stato specificato (cioè non il tempo rimanente).
- **metadati_ttl**: Il tempo rimanente (in secondi) di vita dei metadati.
- **secret_ttl**: Il tempo rimanente (in secondi) di vita del segreto.
- **recipient**: se è stato specificato un destinatario, questa è una versione offuscata dell'indirizzo e-mail.
- **created**: Ora di creazione del segreto in tempo unix (UTC).
- **updated**: idem, ma l'ora dell'ultimo aggiornamento.
- **passphrase\_required**: Se è stata fornita una passphrase quando è stato creato il segreto, questo sarà vero. Altrimenti falso, ovviamente.
- **share_domain** : il dominio personalizzato da usare quando si genera il link al segreto. Altrimenti "".


### Esempio di risposta:

``json
{
  "custid": "USERNAME",
  "metadata_key": "qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl": "3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Generare un segreto

`POST https://REGION.onetimesecret.com/api/v1/generate`

Genera un segreto breve e unico. È utile per le password temporanee, i pad Onetime, i sali, ecc.

### Richiesta autenticata

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Richiesta anonima

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


``json
{
  "custid": "USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key": "2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key": "pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl": "3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Attributi

Come "Condividi un segreto", con l'aggiunta del campo "valore".


###FILEID:c8c3a392##FILENAME:rest-api-v1-client-libraries.txt###

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
