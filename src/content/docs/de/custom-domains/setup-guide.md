---
title: Setup Guide
description: Dieser Leitfaden führt du durch die Einrichtung einer benutzerdefinierten Domain für dein Onetime Secret-Konto, einschließlich der Unterschiede zwischen Subdomains und Apex-Domains und der Auswahl deiner bevorzugten Rechenzentrumsregion.
---

# Leitfaden zur Einrichtung einer benutzerdefinierten Domain

## Voraussetzungen

- Ein aktives Onetime Secret-Konto mit aktivierter Funktion für benutzerdefinierte Domains
- Eine Domain, die dir gehört und für die du die DNS-Einstellungen verwalten können

## Verständnis der Domaintypen

Bevor du? deine benutzerdefinierte Domain einrichten, sollten du den Unterschied zwischen Subdomains und Apex-Domains kennen:

1. **Subdomain**: Eine Unterabteilung deiner Hauptdomain (z. B. secrets.ihredomain.com)
2. **Apex-Domain**: Die Root-Domain selbst (z.B. yourdomain.com)

## Wählen du? deine Region

Onetime Secret bietet zwei Rechenzentrumsregionen an: EU und US. Wenn du? deine benutzerdefinierte Domain einrichten, müssen du wählen, welche Region du für die Speicherung deiner Daten bevorzugen. Diese Wahl ist aus mehreren Gründen wichtig:

- **Für Privatpersonen**: du können die Region nach deinen persönlichen Vorlieben auswählen, z. B. nach der Nähe für einen möglicherweise schnelleren Zugriff oder nach den Bedenken hinsichtlich der persönlichen Datensouveränität.
- **Für Unternehmen**: deine Wahl kann von deinen Verpflichtungen in Bezug auf die Datenlokalisierung abhängen, wie z.B. die Einhaltung von GDPR, staatlichen oder provinziellen Richtlinien. Stellen du sicher, dass du die Region auswählen, die am besten mit deinen gesetzlichen Anforderungen übereinstimmt.

Berücksichtigen du bei dieser Entscheidung deine spezifischen Bedürfnisse und Anforderungen. Ausführlichere Informationen über unsere Rechenzentrumsregionen und wie du die richtige Region für deine Bedürfnisse auswählen, finden du in unserem Leitfaden [Rechenzentrumsregionen](regions).

## Schritt 1: Zugriff auf das Domains Dashboard

1. Melden du sich bei deinem Onetime Secret Konto an
2. Navigieren du zu Dashboard > Benutzerdefinierte Domains
3. Klicken du auf "Domain hinzufügen"


<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Custom domains view" width="400" />


## Schritt 2: Geben du? deine Domain ein

1. Geben du in den Einstellungen für benutzerdefinierte Domains deine gewünschte Domain ein (z.B. secrets.ihredomain.com oder ihredomain.com)
2. Klicken du auf "Domain hinzufügen" oder eine entsprechende Schaltfläche, um fortzufahren

## Schritt 3: Konfigurieren du die DNS-Einstellungen

Um deine Domain zu verbinden, müssen du? deine DNS-Einstellungen aktualisieren. Der Vorgang unterscheidet sich leicht, je nachdem, ob du eine Subdomain oder eine Apex-Domain verwenden und welche Rechenzentrumsregion du wählen.

### Für Subdomains (empfohlen)

1. Greifen du auf das DNS-Verwaltungspanel deiner Domain zu (über deinen Domain-Registrar oder DNS-Provider)
2. Erstellen du einen CNAME-Eintrag mit den folgenden Angaben:
- Host: Die von dir gewählte Subdomain (z.B. Geheimnisse)
- Zeigt auf / Wert:
- Für die Region EU: identity.eu.onetime.co
- Für die Region USA: identity.us.onetime.co
3. Entfernen du alle vorhandenen A-, AAAA- oder CNAME-Einträge für dieselbe Subdomain

### Für Apex-Domains

1. Greifen du auf das DNS-Verwaltungspanel deiner Domain zu
2. Erstellen oder ändern du einen A-Eintrag mit den folgenden Angaben:
- Host: @ (oder lassen du ihn leer, je nach deinem DNS-Provider)
- Zeigt auf / Wert:
- Für die EU-Region: 109.105.217.207
- Für die US-Region: 66.51.126.41

Wichtig: Stellen du sicher, dass es keine konkurrierenden Einträge für die von dir verwendete Domain gibt.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Custom domain settings" width="400" />

### Weitere Informationen

#### Warum CNAME für Subdomains?

Wir empfehlen die Verwendung von CNAME-Einträgen für Subdomains, weil:

1. du sind flexibler und ermöglichen es uns, unsere Server-IP-Adressen zu ändern, ohne dass du? deine DNS-Einstellungen aktualisieren müssen.
2. du passen sich automatisch an alle Änderungen an, die wir an unserer Infrastruktur vornehmen.

#### Warum A-Einträge für Apex-Domains?

Apex-Domänen können aufgrund von DNS-Standards keine CNAME-Einträge verwenden. Daher müssen wir A-Einträge verwenden, die einige Einschränkungen haben:

1. Wenn wir unsere IP-Adresse ändern (was selten vorkommt), müssen du? deine DNS-Einstellungen manuell aktualisieren.
2. du passen sich nicht automatisch an Änderungen in unserer Infrastruktur an.

## Schritt 4: Domain verifizieren und auf SSL warten

1. Kehren du nach der Aktualisierung der DNS-Einstellungen zur Seite für die benutzerdefinierte Onetime Secret Domain zurück
2. Das System wird automatisch versuchen, deine Domain zu verifizieren
3. Die Generierung des SSL-Zertifikats beginnt, sobald die Verifizierung erfolgreich war
4. Dieser Vorgang kann einige Minuten in Anspruch nehmen

## Schritt 5: Bestätigen du die Einrichtung

Sobald die Einrichtung abgeschlossen ist, sollten du die folgenden Informationen sehen:

- Domain Status: Aktiv mit SSL
- Zieladresse: identity.eu.onetime.co oder identity.us.onetime.co (je nach der von dir gewählten Region)
- SSL-Status: Aktiv
- SSL-Verlängerungsdatum: (Wird angezeigt, in der Regel etwa ein Jahr nach der Einrichtung)

## Fehlerbehebung

- Wenn die Verifizierung fehlschlägt, überprüfen du? deine DNS-Einstellungen
- Stellen du sicher, dass du alle widersprüchlichen Datensätze entfernt haben
- Die DNS-Übertragung kann bis zu 24 Stunden dauern, ist aber in der Regel viel schneller

## Verwendung deiner benutzerdefinierten Domain

Sobald du aktiv sind, verwenden deine geheimen Links deine benutzerdefinierte Domain. Zum Beispiel:
`https://secrets-example.onetime.dev/secret/abc123`

## Wir kümmern uns um du

Wir kümmern uns um den Rest der technischen Details, damit du sich nicht darum kümmern müssen.

- Wir überwachen kontinuierlich den Status deiner Domain
- SSL-Zertifikate werden automatisch erneuert, ohne dass du etwas unternehmen müssen.

Wenn du auf dem Laufenden bleiben möchten, können du den Zustand deiner Domain ganz einfach überprüfen:

- Schauen du einfach auf den Zeitstempel "Last Monitored" in deinem Dashboard, um die laufende Konnektivität zu bestätigen

## Fragen oder brauchen du? Unterstützung?

Wir sind für du da. Wenn du? Fragen haben oder Hilfe benötigen:

- Schicken du uns eine E-Mail an support@onetimesecret.com
- Nutzen du unser Feedback-Formular unter https://onetimesecret.com/feedback

Unser Team ist bestrebt, dir den bestmöglichen Support für die Einrichtung und Nutzung deiner individuellen Domain zu bieten, einschließlich Beratung bei der Auswahl der richtigen Rechenzentrumsregion für deine Bedürfnisse.
