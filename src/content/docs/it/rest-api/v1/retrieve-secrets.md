---
title: Recuperare i segreti
description: Imparare a recuperare i segreti utilizzando l'API REST di Onetime Secret, con supporto per l'accesso autenticato e anonimo.
---

Aggiornato al 2025-04-02

:::nota
**Località dei dati e selezione della regione**
- Scegliere una [regione]({getRelativeLocaleUrl(Astro.currentLocale ?? 'en', 'regions')}) (ad esempio [us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) data center
- Considerare fattori come la sovranità dei dati, la latenza e i requisiti di conformità.
- **NOTA:** Il sito `onetimesecret.com` predefinito rimane operativo e instrada verso un centro dati attivo; si raccomanda di utilizzare una località specifica, poiché questa funzionalità potrebbe essere deprecata in futuro.
:::

## Recuperare un segreto

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Richiesta autenticata

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Richiesta anonima

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Parametri della query

- **SECRET_KEY**: la chiave univoca per questo segreto.
- **passphrase** (frase di sicurezza, se richiesta): la frase di sicurezza è necessaria solo se il segreto è stato creato con una frase di sicurezza.

### Attributi

- **chiave_segreta**: la chiave unica per il segreto creato. È una chiave che si può condividere.
- **valore**: Il segreto vero e proprio. Dovrebbe essere superfluo dirlo, ma sarà disponibile solo una volta.

## Recupera i metadati

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Ogni segreto ha anche dei metadati associati. I metadati sono destinati a essere utilizzati dal creatore del segreto (cioè non dal destinatario) e in genere devono essere mantenuti privati. Si può tranquillamente usare la chiave dei metadati per recuperare informazioni di base sul segreto stesso (ad esempio, se o quando è stato visualizzato), poiché la chiave dei metadati è diversa dalla chiave del segreto.

### Richiesta autenticata

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Parametri della query

- **METADATA_KEY**: la chiave univoca per questi metadati.

### Attributi

- **custid**: il nome utente dell'account che ha creato il segreto. Questo valore sarà `anon` per le richieste anonime.
- **metadata\_key**: la chiave unica per i metadati. NON condividerla.
- **secret\_key**: la chiave univoca per il segreto creato. È una chiave che si può condividere.
- **ttl**: Il tempo di vita specificato (cioè non il tempo rimanente).
- **metadata\ttl**: Il tempo rimanente (in secondi) di vita dei metadati.
- **secret_ttl**: Il tempo rimanente (in secondi) di vita del segreto.
- **recipient**: se è stato specificato un destinatario, questa è una versione offuscata dell'indirizzo e-mail.
- **created**: Ora di creazione dei metadati in tempo unix (UTC).
- **updated**: idem, ma l'ora dell'ultimo aggiornamento.
- **ricevuto**: Ora in cui è stato ricevuto il segreto.
- **passphrase\_required**: Se è stata fornita una frase di sicurezza quando è stato creato il segreto, questo sarà vero. Altrimenti false, ovviamente.


## Brucia un segreto

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Bruciare un segreto che non è ancora stato letto.

### Richiesta autenticata

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Parametri della query

- Nessuno

### Attributi

- Come gli attributi dei metadati con uno stato di bruciato.

## Recuperare i metadati recenti

**GLI INDIRIZZI https://onetimesecret.com/api/v1/private/recent**

Recupera un elenco di metadati recenti.

### Richiesta autenticata

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Parametri della query

- Nessuno

### Attributi

- Come gli attributi dei metadati, ma come elenco e il valore della chiave segreta sarà sempre nullo.

::: avviso Autenticazione richiesta
Nota: le operazioni sui metadati e sulla gestione (recupero dei metadati, burn secret, metadati recenti) sono disponibili solo per gli utenti autenticati.
:::
