---
title: Data Center Regions
description: Erfahren Sie mehr über die Rechenzentrumsregionen von Onetime Secret und wie Sie die richtige Region für Ihre Bedürfnisse auswählen.
---


Onetime Secret bietet zwei Data Center Regions an: Europäische Union (EU) und Vereinigte Staaten (US). In diesem Leitfaden erfahren Sie, wie wichtig die Auswahl der Region ist und wie Sie die richtige Region für Ihre Bedürfnisse auswählen.

## Warum die Wahl der Region wichtig ist

Die Wahl der richtigen Rechenzentrumsregion ist aus mehreren Gründen entscheidend:

1. **Datensouveränität**: Verschiedene Regionen haben unterschiedliche Datenschutzgesetze und -vorschriften.
2. **Latenz**: Die Wahl einer Region, die näher an Ihrer Hauptnutzerbasis liegt, kann die Latenzzeit verringern.
3. **Konformität**: Einige Unternehmen haben spezifische Anforderungen an den Ort, an dem ihre Daten gespeichert werden können.

## Verfügbare Regionen

### Europäische Union (EU)

- **Standort**: Innerhalb der Europäischen Union (Nürnberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Schlüsselmerkmale**:
- Konform mit GDPR und anderen EU-Datenschutzbestimmungen
- Ideal für europäische Nutzer oder solche, die hauptsächlich europäische Kunden bedienen

### United States (US)

- **Standort**: Innerhalb der Vereinigten Staaten (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Schlüsselmerkmale**:
- Konform mit den US-Datenschutzgesetzen
- Geeignet für Benutzer mit Sitz in den USA oder solche, die hauptsächlich US-Kunden bedienen

## Share-Nothing-Architektur

Onetime Secret verwendet eine Share-Nothing-Architektur, die eine vollständige Datenisolierung zwischen den Regionen gewährleistet:

- **Getrennte Konten**: Das Anlegen eines Kontos auf `us.onetimesecret.com` ist völlig getrennt von einem Konto auf `eu.onetimesecret.com`, selbst wenn Sie die gleiche E-Mail-Adresse verwenden.
- **Keine zentrumsübergreifenden Operationen**: Sie können keine Operationen (wie das Brennen eines Geheimnisses) über Rechenzentren hinweg durchführen. Jedes Zentrum verwaltet seinen eigenen Satz von Geheimnissen und Benutzerdaten.
- **Konsistente Abrechnung für bezahlte Benutzer**: Bei bezahlten Konten werden zwar keine Benutzerdaten zwischen den Zentren ausgetauscht, aber Ihr Abonnementstatus wird über unseren Zahlungsanbieter Stripe in allen Regionen erkannt.

## So wählen Sie Ihre Region

Berücksichtigen Sie die folgenden Faktoren bei der Auswahl Ihrer Rechenzentrumsregion:

### Für anonyme Benutzer

- Anfragen an onetimesecret.com können an jedes aktive Rechenzentrum weitergeleitet werden.
- Der Standort Ihres Geheimnisses ist aus dem generierten Link immer ersichtlich (z.B. `us.onetimesecret.com/secret/abcd1234`).
- Sie können einen bestimmten Datenstandort auswählen, indem Sie direkt zu [us.onetimesecret.com](https://us.onetimesecret.com/) oder [eu.onetimesecret.com](https://eu.onetimesecret.com/) navigieren.

### Für authentifizierte Benutzer

- Wenn Sie ein neues Konto erstellen, müssen Sie einen Standort für das Datenzentrum auswählen.
- Sie müssen zu diesem Standort zurückkehren, um sich anzumelden.
- Bestehende Konten und Geheimnisse verbleiben im EU-Rechenzentrum (Nürnberg).

### Für alle Benutzer

- Geheimnisse, die ohne eine Subdomain-Zuständigkeit erstellt wurden (z.B. onetimesecret.com/secret/efgh5678), werden weiterhin standardmäßig in unserem EU-Rechenzentrum gespeichert.
- Alle Benutzer, sowohl bezahlte als auch kostenlose, können bei der Erstellung eines Kontos ihr bevorzugtes Datenzentrum auswählen.

### Zusätzliche Überlegungen

1. **Für Privatpersonen**:
- Persönliche Präferenz
- Nähe zu Ihrem Standort für möglicherweise schnelleren Zugriff
- Bedenken hinsichtlich der persönlichen Datensouveränität

2. **Für Unternehmen**:
- Gesetzliche und regulatorische Anforderungen (z.B. GDPR für EU-Kunden)
- Standort Ihres Hauptkundenstamms
- Branchenspezifische Compliance-Anforderungen

3. **Technische Überlegungen**:
- Latenzanforderungen für Ihre Anwendung
- Integration mit anderen Diensten oder Systemen

## Preise und Pläne

Unser Engagement für Datenlokalität erstreckt sich auch auf unser Preismodell:

- Die Gebühren basieren auf dem Ort, von dem aus Sie bezahlen, und nicht auf dem Ort, an dem Ihr Konto erstellt wird.
- Die Identity Plus-Tarife umfassen eine unbegrenzte Anzahl benutzerdefinierter Domains in allen Rechenzentren im Rahmen eines einzigen Abonnements.

## Zukunftspläne

Wir arbeiten kontinuierlich an der Erweiterung unserer Rechenzentrumsoptionen. Zukünftige Pläne beinhalten zusätzliche Standorte für Rechenzentren in:

- Brasilien
- Australien
- Großbritannien
- Kanada

Diese Erweiterungen bieten noch mehr Optionen für die Datenlokalisierung und verbessern die Leistung und die Compliance-Funktionen für Benutzer in verschiedenen Regionen.

##

Wenn Sie Ihr Onetime Secret Konto einrichten oder eine benutzerdefinierte Domain konfigurieren, haben Sie die Möglichkeit, Ihre bevorzugte Region zu wählen. Und so geht's:

1. Für neue Konten: Wählen Sie Ihre bevorzugte Region während des Anmeldevorgangs.
2. Für bestehende Konten: Setzen Sie sich mit unserem Support-Team in Verbindung, um die Optionen für die Migration der Region zu besprechen.
3. Für benutzerdefinierte Domains: Geben Sie die von Ihnen gewählte Region bei der Konfiguration Ihrer DNS-Einstellungen an (detaillierte Anweisungen finden Sie in unserem [Custom Domain Setup Guide](/docs/custom-domains/setup-guide)).

## Häufig gestellte Fragen

**Q: Kann ich meine Region nach der Einrichtung meines Kontos ändern?**
A: Wenden Sie sich an unser Support-Team, um die Optionen für die Migration der Region zu besprechen. Beachten Sie, dass die Migration mit einer gewissen Ausfallzeit und Datenübertragung verbunden sein kann.

**Q: Beeinflusst die Wahl der Region die Sicherheit meiner Geheimnisse?**
A: Nein, beide Regionen bieten das gleiche hohe Maß an Sicherheit. Die Wahl wirkt sich in erster Linie auf den Aufenthaltsort der Daten und die mögliche Latenzzeit aus.

**Q: Gibt es Preisunterschiede zwischen den Regionen?**
A: Derzeit sind unsere Preise in beiden Regionen gleich. Auf unserer [Preisseite](/Preise) finden Sie die aktuellsten Informationen.

## Brauchen Sie Hilfe?

Wenn Sie sich nicht sicher sind, welche Region Sie wählen sollen, oder wenn Sie Fragen haben, zögern Sie nicht, sich an unser Support-Team zu wenden. Wir helfen Ihnen gerne, die beste Entscheidung für Ihre speziellen Bedürfnisse zu treffen.

- E-Mail: support@onetimesecret.com
- Feedback-Formular: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Denken Sie daran, dass die Wahl der richtigen Region sicherstellt, dass Sie bei der Verwendung von Onetime Secret die beste Leistung erhalten und alle relevanten Datenvorschriften einhalten.
