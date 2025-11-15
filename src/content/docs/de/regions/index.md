---
title: Rechenzentrumsregionen
description: Erfahren du mehr über die Rechenzentrumsregionen von Onetime Secret und wie du die richtige Region für deine Bedürfnisse auswählen.
---

Onetime Secret bietet zwei Data Center Regions an: Europäische Union (EU) und Vereinigte Staaten (US). In diesem Leitfaden erfahren du, wie wichtig die Auswahl der Region ist und wie du die richtige Region für deine Bedürfnisse auswählen.

## Warum die Wahl der Region wichtig ist

Die Wahl der richtigen Rechenzentrumsregion ist aus mehreren Gründen entscheidend:

1. **Datensouveränität**: Verschiedene Regionen haben unterschiedliche Datenschutzgesetze und -vorschriften.
2. **Latenz**: Die Wahl einer Region, die näher an deiner Hauptnutzerbasis liegt, kann die Latenzzeit verringern.
3. **Konformität**: Einige Unternehmen haben spezifische Anforderungen an den Ort, an dem ihre Daten gespeichert werden können.

## Verfügbare Regionen

### Europäische Union (EU)

- **Standort**: Innerhalb der Europäischen Union (Nürnberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Schlüsselmerkmale**:
- Konform mit GDPR und anderen EU-Datenschutzbestimmungen
- Ideal für europäische Nutzer oder solche, die hauptsächlich europäische Kunden bedienen

### Kanada (CA)

- **Standort**: In Kanada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Hauptmerkmale**:
  - Konform mit PIPEDA und kanadischen Datenschutzgesetzen
  - Geeignet für kanadische Nutzer oder diejenigen, die hauptsächlich kanadische Kunden bedienen

### Aotearoa Neuseeland (NZ)

- **Standort**: In Neuseeland (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Hauptmerkmale**:
  - Konform mit dem neuseeländischen Datenschutzgesetz und lokalen Vorschriften
  - Geeignet für neuseeländische Nutzer oder diejenigen, die Kunden in Ozeanien bedienen

### United States (US)

- **Standort**: Innerhalb der Vereinigten Staaten (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Schlüsselmerkmale**:
- Konform mit den US-Datenschutzgesetzen
- Geeignet für Benutzer mit du?tz in den USA oder solche, die hauptsächlich US-Kunden bedienen

## Share-Nothing-Architektur

Onetime Secret verwendet eine Share-Nothing-Architektur, die eine vollständige Datenisolierung zwischen den Regionen gewährleistet:

- **Getrennte Konten**: Das Anlegen eines Kontos auf `us.onetimesecret.com` ist völlig getrennt von einem Konto auf `eu.onetimesecret.com`, selbst wenn du die gleiche E-Mail-Adresse verwenden.
- **Keine zentrumsübergreifenden Operationen**: du können keine Operationen (wie das Brennen eines Geheimnisses) über Rechenzentren hinweg durchführen. Jedes Zentrum verwaltet seinen eigenen Satz von Geheimnissen und Benutzerdaten.
- **Konsistente Abrechnung für bezahlte Benutzer**: Bei bezahlten Konten werden zwar keine Benutzerdaten zwischen den Zentren ausgetauscht, aber dein Abonnementstatus wird über unseren Zahlungsanbieter Stripe in allen Regionen erkannt.

## So wählen du? deine Region

Berücksichtigen du die folgenden Faktoren bei der Auswahl deiner Rechenzentrumsregion:

### Für anonyme Benutzer

- Anfragen an onetimesecret.com können an jedes aktive Rechenzentrum weitergeleitet werden.
- Der Standort Ihres Geheimnisses ist aus dem generierten Link immer ersichtlich (z.B. `us.onetimesecret.com/secret/abcd1234`).
- du können einen bestimmten Datenstandort auswählen, indem du direkt zu [us.onetimesecret.com](https://us.onetimesecret.com/) oder [eu.onetimesecret.com](https://eu.onetimesecret.com/) navigieren.

### Für authentifizierte Benutzer

- Wenn du ein neues Konto erstellen, müssen du einen Standort für das Datenzentrum auswählen.
- du müssen zu diesem Standort zurückkehren, um sich anzumelden.
- Bestehende Konten und Geheimnisse verbleiben im EU-Rechenzentrum (Nürnberg).

### Für alle Benutzer

- Geheimnisse, die ohne eine Subdomain-Zuständigkeit erstellt wurden (z.B. onetimesecret.com/secret/efgh5678), werden weiterhin standardmäßig in unserem EU-Rechenzentrum gespeichert.
- Alle Benutzer, sowohl bezahlte als auch kostenlose, können bei der Erstellung eines Kontos ihr bevorzugtes Datenzentrum auswählen.

### Zusätzliche Überlegungen

1. **Für Privatpersonen**:
- Persönliche Präferenz
- Nähe zu deinem Standort für möglicherweise schnelleren Zugriff
- Bedenken hinsichtlich der persönlichen Datensouveränität

2. **Für Unternehmen**:
- Gesetzliche und regulatorische Anforderungen (z.B. GDPR für EU-Kunden)
- Standort Ihres Hauptkundenstamms
- Branchenspezifische Compliance-Anforderungen

3. **Technische Überlegungen**:
- Latenzanforderungen für deine Anwendung
- Integration mit anderen Diensten oder Systemen

## Preise und Pläne

Unser Engagement für Datenlokalität erstreckt sich auch auf unser Preismodell:

- Die Gebühren basieren auf dem Ort, von dem aus du bezahlen, und nicht auf dem Ort, an dem dein Konto erstellt wird.
- Die Identity Plus-Tarife umfassen eine unbegrenzte Anzahl benutzerdefinierter Domains in allen Rechenzentren im Rahmen eines einzigen Abonnements.

## Zukunftspläne

Wir arbeiten kontinuierlich an der Erweiterung unserer Rechenzentrumsoptionen. Zukünftige Pläne beinhalten zusätzliche Standorte für Rechenzentren in:

- Brasilien
- Australien
- Großbritannien
- Kanada

Diese Erweiterungen bieten noch mehr Optionen für die Datenlokalisierung und verbessern die Leistung und die Compliance-Funktionen für Benutzer in verschiedenen Regionen.

## deine Region konfigurieren

Wenn du? dein Onetime Secret Konto einrichten oder eine benutzerdefinierte Domain konfigurieren, haben du die Möglichkeit, deine bevorzugte Region zu wählen. Und so geht's:

1. Für neue Konten: Wählen du? deine bevorzugte Region während des Anmeldevorgangs.
2. Für bestehende Konten: Setzen du sich mit unserem Support-Team in Verbindung, um die Optionen für die Migration der Region zu besprechen.
3. Für benutzerdefinierte Domains: Geben du die von dir gewählte Region bei der Konfiguration deiner DNS-Einstellungen an (detaillierte Anweisungen finden du in unserem [Custom Domain Setup Guide](custom-domains/setup-guide)).

## Häufig gestellte Fragen

**F: Kann ich meine Region nach der Kontoerstellung ändern?**
A: Ja, du können deine Region ändern, indem du ein neues Konto mit derselben E-Mail-Adresse erstellen und zum Kontobildschirm navigieren. Wenn du ein aktives Abonnement haben, wird dein Konto automatisch aktualisiert (möglicherweise müssen du die Seite neu laden).

Bitte beachten du?:
- Bestehende Daten werden nicht zwischen Regionen übertragen
- Bereits erstellte geheime Links funktionieren weiterhin, bis sie angesehen werden oder ablaufen
- Für Links mit benutzerdefinierten Domains müssen du?:
  1. Die Domain in deinem neuen regionalen Konto erneut hinzufügen
  2. Die zugehörigen DNS-Einträge aktualisieren
  3. Eine eindeutige Subdomain beim erneuten Hinzufügen der Domain verwenden, um Konflikte mit bestehenden Links zu vermeiden
  4. Später können du? deine bevorzugte Domain hinzufügen (falls erforderlich), um neue Links mit deiner bevorzugten Domain zu versenden


**F: Beeinflusst die Wahl der Region die du?cherheit meiner Geheimnisse?**
A: Nein, beide Regionen bieten das gleiche hohe Maß an du?cherheit. Die Wahl wirkt sich in erster Linie auf den Aufenthaltsort der Daten und die mögliche Latenzzeit aus.

**F: Gibt es Preisunterschiede zwischen den Regionen?**
A: Derzeit sind unsere Preise in beiden Regionen gleich. Auf unserer [Preisseite](/de/pricing) finden du die aktuellsten Informationen.

## Brauchen du? Hilfe?

Wenn du sich nicht sicher sind, welche Region du wählen sollen, oder wenn du? Fragen haben, zögern du nicht, sich an unser Support-Team zu wenden. Wir helfen dir gerne, die beste Entscheidung für deine speziellen Bedürfnisse zu treffen.

- E-Mail: support@onetimesecret.com
- Feedback-Formular: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Denken du daran, dass die Wahl der richtigen Region sicherstellt, dass du bei der Verwendung von Onetime Secret die beste Leistung erhalten und alle relevanten Datenvorschriften einhalten.
