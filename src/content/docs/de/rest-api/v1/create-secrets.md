---
title: Geheimnisse schaffen
description: Lernen Sie, wie Sie mit der Onetime Secret REST API Geheimnisse erstellen und abrufen können, wobei sowohl die authentifizierte als auch die anonyme Nutzung unterstützt wird.
---

_Aktualisiert 2025-04-02_

<!-- ::callout{icon="i-heroicons-globe-alt"} -->
**Auswahl von Datenort und Region**
- Wählen Sie zwischen US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Kanada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), oder Neuseeland ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) Rechenzentren
- Berücksichtigen Sie Faktoren wie Datenhoheit, Latenzzeit und Compliance-Anforderungen
- **HINWEIS:** Standardmäßig bleibt `onetimesecret.com` in Betrieb und leitet zu einem aktiven Rechenzentrum weiter. Es wird empfohlen, eine bestimmte Lokalität zu verwenden, da diese Funktion in Zukunft möglicherweise veraltet sein wird.
::


## Erstellen Sie ein Geheimnis

'POST https://REGION.onetimesecret.com/api/v1/share'

Verwenden Sie diesen Endpunkt, um einen geheimen Wert zu speichern und einen Link zur einmaligen Verwendung zu erstellen.


### Authentifizierte Anfrage

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anonyme Anfrage

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Abfrage-Parameter

- **secret**: der geheime Wert, der verschlüsselt wird, bevor er gespeichert wird. Es gibt eine maximale Länge, die von Ihrem Plan abhängt und erzwungen wird (1k-10k).
- **Passphrase**: eine Zeichenfolge, die der Empfänger kennen muss, um das Geheimnis einzusehen. Dieser Wert wird auch zur Verschlüsselung des Geheimnisses verwendet und wird vor der Speicherung verschlüsselt, so dass wir diesen Wert nur bei der Übertragung haben.
- **ttl**: die maximale Zeitspanne in Sekunden, die das Geheimnis überleben soll (d.h. time-to-live). Nach Ablauf dieser Zeit wird das Geheimnis gelöscht und kann nicht mehr wiederhergestellt werden.
- **Empfänger**: eine E-Mail-Adresse. Wir senden eine freundliche E-Mail, die den Link zum Geheimnis enthält (NICHT das Geheimnis selbst).
- **share_domain**: die benutzerdefinierte Domain, die bei der Erstellung des Geheimlinks verwendet werden soll. Wenn nichts angegeben wird, wird die Standarddomäne verwendet (z.B. eu.onetimesecret.com).

### Attribute

- **custid**: der Benutzername des Kontos, das das Geheimnis erstellt hat. Dieser Wert ist `anon` für anonyme Anfragen.
- **metadata\_key**: der eindeutige Schlüssel für die Metadaten. Geben Sie diesen NICHT weiter.
- **secret\_key**: der eindeutige Schlüssel für das Geheimnis, das Sie erstellen. Diesen Schlüssel können Sie weitergeben.
- **ttl**: Die angegebene Time-to-Live (in Sekunden) (d.h. nicht die verbleibende Zeit)
- **metadata\_ttl**: Die verbleibende Zeit (in Sekunden), die die Metadaten noch zu leben haben.
- **secret\_ttl**: Die verbleibende Zeit (in Sekunden), die das Geheimnis noch zu leben hat.
- **recipient**: Wenn ein Empfänger angegeben wurde, ist dies eine verschleierte Version der E-Mail-Adresse.
- **erstellt**: Zeitpunkt der Erstellung des Geheimnisses in Unix-Zeit (UTC)
- **updated**: dito, aber der Zeitpunkt der letzten Aktualisierung.
- **Passphrase erforderlich**: Wenn bei der Erstellung des Geheimnisses eine Passphrase angegeben wurde, ist dieser Wert true. Andernfalls natürlich false.
- **share_domain** : die benutzerdefinierte Domäne, die bei der Erstellung des Geheimlinks verwendet werden soll. Andernfalls "".


### Beispiel Antwort:

```json
{
"custid": ‚USERNAME‘,
"metadata_key": ‚qjpjroeit8wra0ojeyhcw5pjsgwtuq7‘,
"secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
"ttl": ‚3600‘,
"share_domain": "",
"updated":"1324174006",
"created":"1324174006"
}
```

## Erzeugen eines Geheimnisses

`POST https://REGION.onetimesecret.com/api/v1/generate`

Erzeugen Sie ein kurzes, eindeutiges Geheimnis. Dies ist nützlich für temporäre Passwörter, Onetime-Pads, Salts usw.

### Authentifizierte Anfrage

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anonyme Anfrage

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
"custid": ‚USERNAME‘,
"value":"3Rg8R2sfD3?a",
"metadata_key": ‚2b6bjmudhmtiqjn2qmdaqjkqxp323gi‘,
"secret_key": ‚pgcdv7org3vtdurif809sygnt0mstw6‘,
"ttl": ‚3600‘,
"share_domain": "",
"updated":"1324174095",
"created":"1324174095"
}
```

### Attribute

Wie bei "Share A Secret" oben, mit dem Zusatz des Feldes `value`.
