---
title: Geheimnisse bergen
description: Lernen du, wie du mit der Onetime Secret REST API Geheimnisse abrufen können, wobei sowohl der authentifizierte als auch der anonyme Zugriff unterstützt wird.
---

_Aktualisiert 2025-04-02_

<!-- ::callout{icon="i-heroicons-globe-alt"} -->
**Auswahl von Datenort und Region**
- Wählen du zwischen US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)) oder EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) Rechenzentren
- Berücksichtigen du? Faktoren wie Datenhoheit, Latenzzeit und Compliance-Anforderungen
- **HINWEIS:** Standardmäßig bleibt `onetimesecret.com` in Betrieb und leitet zu einem aktiven Rechenzentrum weiter. Es wird empfohlen, eine bestimmte Lokalität zu verwenden, da diese Funktion in Zukunft möglicherweise veraltet sein wird.
::

## Abrufen eines Geheimnisses

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Authentifizierte Anfrage

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anonyme Anfrage

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Abfrage-Parameter

- **SECRET_KEY**: der eindeutige Schlüssel für dieses Geheimnis.
- **Passphrase** (falls erforderlich): die Passphrase ist nur erforderlich, wenn das Geheimnis mit einer Passphrase erstellt wurde.

### Attribute

- **secret_key**: der eindeutige Schlüssel für das von dir erstellte Geheimnis. Dies ist der Schlüssel, den du weitergeben können.
- **Wert**: Das eigentliche Geheimnis. Es sollte sich von selbst verstehen, dass dieser Wert nur einmal verfügbar ist.

## Abrufen von Metadaten

POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY".

Jedes Geheimnis hat auch zugehörige Metadaten. Die Metadaten sind für den Ersteller des Geheimnisses bestimmt (d.h. nicht für den Empfänger) und sollten im Allgemeinen geheim gehalten werden. du können den Schlüssel für die Metadaten verwenden, um grundlegende Informationen über das Geheimnis selbst abzurufen (z.B. ob oder wann es eingesehen wurde), da der Schlüssel für die Metadaten ein anderer ist als der Schlüssel für das Geheimnis.

### Authentifizierte Anfrage

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Abfrage-Parameter

- **METADATA_KEY**: der eindeutige Schlüssel für diese Metadaten.

### Attribute

- **custid**: der Benutzername des Kontos, das das Geheimnis erstellt hat. Dieser Wert ist `anon` für anonyme Anfragen.
- **metadata\_key**: der eindeutige Schlüssel für die Metadaten. Geben du diesen NICHT weiter.
- **secret\_key**: der eindeutige Schlüssel für das Geheimnis, das du erstellt haben. Diesen Schlüssel können du weitergeben.
- **ttl**: Die angegebene Time-to-Live (d.h. nicht die verbleibende Zeit)
- **metadata\_ttl**: Die verbleibende Zeit (in Sekunden), die die Metadaten noch zu leben haben.
- **secret\_ttl**: Die verbleibende Zeit (in Sekunden), die das Geheimnis noch zu leben hat.
- **recipient**: Wenn ein Empfänger angegeben wurde, ist dies eine verschleierte Version der E-Mail-Adresse.
- **erstellt**: Zeitpunkt der Erstellung der Metadaten in Unix-Zeit (UTC)
- **updated**: dito, aber der Zeitpunkt der letzten Aktualisierung.
- **received**: Zeitpunkt, zu dem das Geheimnis empfangen wurde.
- **Passphrase erforderlich**: Wenn bei der Erstellung des Geheimnisses eine Passphrase angegeben wurde, ist dieser Wert true. Andernfalls natürlich false.


## Ein Geheimnis brennen

POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn".

Brennen eines Geheimnisses, das noch nicht gelesen wurde.

### Authentifizierte Anfrage

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Abfrage Params

- Keine

### Attribute

- Wie die Metadaten-Attribute mit dem Status "verbrannt".

## Aktuelle Metadaten abrufen

**GET https://onetimesecret.com/api/v1/private/recent**

Ruft eine Liste der letzten Metadaten ab.

### Authentifizierte Anfrage

``bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Abfrage-Parameter

- Keine

### Attribute

- Wie die Metadaten-Attribute, allerdings als Liste und der Wert des geheimen Schlüssels ist immer Null.

::: Warnung Authentifizierung erforderlich
Hinweis: Metadaten und Verwaltungsoperationen (Metadaten abrufen, Geheimnis brennen, aktuelle Metadaten) sind nur für authentifizierte Benutzer verfügbar.
:::
