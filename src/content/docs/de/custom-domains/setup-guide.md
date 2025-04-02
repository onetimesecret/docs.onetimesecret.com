---
title: Setup Guide
description: Dieser Leitfaden führt Sie durch die Einrichtung einer benutzerdefinierten Domain für Ihr Onetime Secret-Konto, einschließlich der Unterschiede zwischen Subdomains und Apex-Domains und der Auswahl Ihrer bevorzugten Rechenzentrumsregion.
---

# Leitfaden zur Einrichtung einer benutzerdefinierten Domain

## Voraussetzungen

- Ein aktives Onetime Secret-Konto mit aktivierter Funktion für benutzerdefinierte Domains
- Eine Domain, die Ihnen gehört und für die Sie die DNS-Einstellungen verwalten können

## Verständnis der Domaintypen

Bevor Sie Ihre benutzerdefinierte Domain einrichten, sollten Sie den Unterschied zwischen Subdomains und Apex-Domains kennen:

1. **Subdomain**: Eine Unterabteilung Ihrer Hauptdomain (z. B. secrets.ihredomain.com)
2. **Apex-Domain**: Die Root-Domain selbst (z.B. yourdomain.com)

## Wählen Sie Ihre Region

Onetime Secret bietet zwei Rechenzentrumsregionen an: EU und US. Wenn Sie Ihre benutzerdefinierte Domain einrichten, müssen Sie wählen, welche Region Sie für die Speicherung Ihrer Daten bevorzugen. Diese Wahl ist aus mehreren Gründen wichtig:

- **Für Privatpersonen**: Sie können die Region nach Ihren persönlichen Vorlieben auswählen, z. B. nach der Nähe für einen möglicherweise schnelleren Zugriff oder nach den Bedenken hinsichtlich der persönlichen Datensouveränität.
- **Für Unternehmen**: Ihre Wahl kann von Ihren Verpflichtungen in Bezug auf die Datenlokalisierung abhängen, wie z.B. die Einhaltung von GDPR, staatlichen oder provinziellen Richtlinien. Stellen Sie sicher, dass Sie die Region auswählen, die am besten mit Ihren gesetzlichen Anforderungen übereinstimmt.

Berücksichtigen Sie bei dieser Entscheidung Ihre spezifischen Bedürfnisse und Anforderungen. Ausführlichere Informationen über unsere Rechenzentrumsregionen und wie Sie die richtige Region für Ihre Bedürfnisse auswählen, finden Sie in unserem Leitfaden [Rechenzentrumsregionen](/docs/regions).

## Schritt 1: Zugriff auf das Domains Dashboard

1. Melden Sie sich bei Ihrem Onetime Secret Konto an
2. Navigieren Sie zu Dashboard > Benutzerdefinierte Domains
3. Klicken Sie auf "Domain hinzufügen"

::ImageModal{src="/img/docs/custom-domains/3-Custom-domains.png" alt="Custom domains view" width="400" height="400"}
::

## Schritt 2: Geben Sie Ihre Domain ein

1. Geben Sie in den Einstellungen für benutzerdefinierte Domains Ihre gewünschte Domain ein (z.B. secrets.ihredomain.com oder ihredomain.com)
2. Klicken Sie auf "Domain hinzufügen" oder eine entsprechende Schaltfläche, um fortzufahren

## Schritt 3: Konfigurieren Sie die DNS-Einstellungen

Um Ihre Domain zu verbinden, müssen Sie Ihre DNS-Einstellungen aktualisieren. Der Vorgang unterscheidet sich leicht, je nachdem, ob Sie eine Subdomain oder eine Apex-Domain verwenden und welche Rechenzentrumsregion Sie wählen.

### Für Subdomains (empfohlen)

1. Greifen Sie auf das DNS-Verwaltungspanel Ihrer Domain zu (über Ihren Domain-Registrar oder DNS-Provider)
2. Erstellen Sie einen CNAME-Eintrag mit den folgenden Angaben:
- Host: Die von Ihnen gewählte Subdomain (z.B. Geheimnisse)
- Zeigt auf / Wert:
- Für die Region EU: identity.eu.onetime.co
- Für die Region USA: identity.us.onetime.co
3. Entfernen Sie alle vorhandenen A-, AAAA- oder CNAME-Einträge für dieselbe Subdomain

### Für Apex-Domains

1. Greifen Sie auf das DNS-Verwaltungspanel Ihrer Domain zu
2. Erstellen oder ändern Sie einen A-Eintrag mit den folgenden Angaben:
- Host: @ (oder lassen Sie ihn leer, je nach Ihrem DNS-Provider)
- Zeigt auf / Wert:
- Für die EU-Region: 109.105.217.207
- Für die US-Region: 66.51.126.41

Wichtig: Stellen Sie sicher, dass es keine konkurrierenden Einträge für die von Ihnen verwendete Domain gibt.

::ImageModal{src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Benutzerdefinierte Domaineinstellungen" width="400" height="400"}
::

### Weitere Informationen

#### Warum CNAME für Subdomains?

Wir empfehlen die Verwendung von CNAME-Einträgen für Subdomains, weil:

1. Sie sind flexibler und ermöglichen es uns, unsere Server-IP-Adressen zu ändern, ohne dass Sie Ihre DNS-Einstellungen aktualisieren müssen.
2. Sie passen sich automatisch an alle Änderungen an, die wir an unserer Infrastruktur vornehmen.

#### Warum A-Einträge für Apex-Domains?

Apex-Domänen können aufgrund von DNS-Standards keine CNAME-Einträge verwenden. Daher müssen wir A-Einträge verwenden, die einige Einschränkungen haben:

1. Wenn wir unsere IP-Adresse ändern (was selten vorkommt), müssen Sie Ihre DNS-Einstellungen manuell aktualisieren.
2. Sie passen sich nicht automatisch an Änderungen in unserer Infrastruktur an.

## Schritt 4: Domain verifizieren und auf SSL warten

1. Kehren Sie nach der Aktualisierung der DNS-Einstellungen zur Seite für die benutzerdefinierte Onetime Secret Domain zurück
2. Das System wird automatisch versuchen, Ihre Domain zu verifizieren
3. Die Generierung des SSL-Zertifikats beginnt, sobald die Verifizierung erfolgreich war
4. Dieser Vorgang kann einige Minuten in Anspruch nehmen

## Schritt 5: Bestätigen Sie die Einrichtung

Sobald die Einrichtung abgeschlossen ist, sollten Sie die folgenden Informationen sehen:

- Domain Status: Aktiv mit SSL
- Zieladresse: identity.eu.onetime.co oder identity.us.onetime.co (je nach der von Ihnen gewählten Region)
- SSL-Status: Aktiv
- SSL-Verlängerungsdatum: (Wird angezeigt, in der Regel etwa ein Jahr nach der Einrichtung)

## Fehlerbehebung

- Wenn die Verifizierung fehlschlägt, überprüfen Sie Ihre DNS-Einstellungen
- Stellen Sie sicher, dass Sie alle widersprüchlichen Datensätze entfernt haben
- Die DNS-Übertragung kann bis zu 24 Stunden dauern, ist aber in der Regel viel schneller

## Verwendung Ihrer benutzerdefinierten Domain

Sobald Sie aktiv sind, verwenden Ihre geheimen Links Ihre benutzerdefinierte Domain. Zum Beispiel:
`https://secrets-example.onetime.dev/secret/abc123`

## Wir kümmern uns um Sie

Wir kümmern uns um den Rest der technischen Details, damit Sie sich nicht darum kümmern müssen.

- Wir überwachen kontinuierlich den Status Ihrer Domain
- SSL-Zertifikate werden automatisch erneuert, ohne dass Sie etwas unternehmen müssen.

Wenn Sie auf dem Laufenden bleiben möchten, können Sie den Zustand Ihrer Domain ganz einfach überprüfen:

- Schauen Sie einfach auf den Zeitstempel "Last Monitored" in Ihrem Dashboard, um die laufende Konnektivität zu bestätigen

## Fragen oder brauchen Sie Unterstützung?

Wir sind für Sie da. Wenn Sie Fragen haben oder Hilfe benötigen:

- Schicken Sie uns eine E-Mail an support@onetimesecret.com
- Nutzen Sie unser Feedback-Formular unter https://onetimesecret.com/feedback

Unser Team ist bestrebt, Ihnen den bestmöglichen Support für die Einrichtung und Nutzung Ihrer individuellen Domain zu bieten, einschließlich Beratung bei der Auswahl der richtigen Rechenzentrumsregion für Ihre Bedürfnisse.
