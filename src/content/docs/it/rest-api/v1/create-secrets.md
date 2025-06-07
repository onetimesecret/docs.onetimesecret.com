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
