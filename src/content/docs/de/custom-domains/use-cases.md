---
title: Anwendungsfälle
description: Häufige Szenarien, in denen benutzerdefinierte Domänen die Sicherheit beim Austausch sensibler Informationen erhöhen.
---

## Anwendungsfälle für benutzerdefinierte Domains

Geheime Links mit benutzerdefinierten Domains bieten ein hohes Maß an Sicherheit für den Austausch sensibler Daten bei gleichzeitiger Wahrung der Markenkonsistenz und -kontinuität. Hier sind einige Beispiele, wie unsere Kunden unseren Service nutzen.

### 1. Onboarding oder Rechnungsstellung an Kunden

Wenn Sie sensible Daten von einem Kunden anfordern, z. B. Finanzdaten oder Kreditkarteninformationen, bitten Sie ihn, diese über einen geheimen Link unter secrets.example.com mitzuteilen. Auf diese Weise wird sichergestellt, dass die Informationen sicher weitergegeben werden und nur für den vorgesehenen Empfänger zugänglich sind.

**Vorteil**: Durch die Verwendung einer benutzerdefinierten Domain können Sie Ihre Markenidentität verstärken und Vertrauen bei Ihren Kunden aufbauen. Der Kunde wird die Domain erkennen und sich sicherer fühlen, wenn er sensible Informationen weitergibt.

### 2. DevOps-Anmeldeinformationen

Wenn Sie Einsätze in mehreren Umgebungen und Teams verwalten, sollten Sie temporäre Zugangsdaten über secure.example.com freigeben. Entwicklungsteams können auf sichere Weise Datenbankpasswörter, API-Token und Konfigurationsdateien austauschen, die nach der ersten Verwendung automatisch ablaufen. So wird verhindert, dass diese sensiblen Details in Code-Repositories, Chat-Protokollen oder E-Mail-Threads offengelegt werden.

**Nutzen**: Durch die Integration Ihrer benutzerdefinierten Domain in automatisierte CI/CD-Pipelines können Sie bewährte Sicherheitspraktiken beibehalten und gleichzeitig die Verwaltung von Anmeldeinformationen nahtlos in Ihren Entwicklungsworkflow integrieren. Entwickler können sich darauf verlassen, dass die Anmeldeinformationen aus einer autorisierten Quelle stammen, und die automatische Rotation stellt sicher, dass offengelegte Anmeldeinformationen nicht wiederverwendet werden können.

### 3. Onboarding von Mitarbeitern

Wenn Sie neue Teammitglieder an Bord holen, vereinfachen Sie deren Zugang am ersten Tag, indem Sie ihnen temporäre Anmeldedaten über access.example.com schicken. HR- und IT-Teams können individuelle Begrüßungspakete mit anfänglichen Passwörtern, VPN-Konfigurationen und Links zu sensiblen Dokumenten vorbereiten, die nach dem Zugriff ablaufen. So wird sichergestellt, dass die Zugangsdaten nicht in E-Mail-Postfächern verweilen oder versehentlich weitergeleitet werden.

**Vorteil**: Indem Sie Ihre eigene Domain für die Verteilung von Zugangsdaten verwenden, schaffen Sie ein professionelles Onboarding-Erlebnis und etablieren gleichzeitig gesunde Sicherheitspraktiken. Neue Mitarbeiter können vertrauensvoll auf Ressourcen zugreifen, da sie wissen, dass diese von einer vertrauenswürdigen Unternehmensquelle stammen.

### 4. Private HR-Kommunikation

Wenn Sie mit sensiblen Mitarbeiterinformationen wie Gehaltsangaben, Steueridentifikationsnummern oder Anmeldecodes für Sozialleistungen umgehen, können Sie vertrauliche Daten über hrinfo.example.com weitergeben. HR-Teams können zeitkritische Links mit persönlichen Informationen als sicheren Text an einzelne Mitarbeiter senden und so sicherstellen, dass sensible Details nach dem Zugriff verfallen und unter Einhaltung der Datenschutzbestimmungen geschützt bleiben.

**Vorteil**: Indem Sie die Markendomain Ihres Unternehmens für vertrauliche HR-Kommunikation nutzen, wahren Sie professionelle Standards und erfüllen gleichzeitig die Compliance-Anforderungen für den Umgang mit personenbezogenen Daten. Die Mitarbeiter können über einen vertrauenswürdigen Kanal, der Ihr Engagement für den Datenschutz unterstreicht, sicher auf ihre vertraulichen Informationen zugreifen.

### 5. Zugang für temporäres Personal
Wenn Sie wechselndes klinisches Personal, Assistenzärzte oder Aushilfspersonal verwalten, können Sie die ersten Anmeldedaten sicher über tempaccess.example.com übermitteln. Verwaltungsteams können zeitkritische Links mit Systembenutzernamen und temporären Passwörtern erstellen, bei denen die sichere Nachricht mit diesen Anmeldedaten nach der ersten Ansicht abläuft.

Hinweis: Achten Sie bei der Implementierung dieser Lösung darauf, dass Ihr gesamtes Sicherheitskonzept den einschlägigen Vorschriften im Gesundheitswesen wie HIPAA oder GDPR entspricht. OneTimeSecret sollte nur für die sichere Übermittlung der ersten Zugangsdaten verwendet werden, während die tatsächliche Dauer des Systemzugangs und die Berechtigungen über die Zugangskontrollsysteme Ihres Unternehmens verwaltet werden sollten. Der Dienst bietet zwar mehr Sicherheit als E-Mail für den Austausch sensibler Informationen wie PHI, sollte aber nur als Notlösung und nicht als dauerhafte Lösung für solche Daten verwendet werden. Ziehen Sie die Implementierung spezieller HIPAA-konformer sicherer Nachrichtensysteme für die regelmäßige PHI-Kommunikation in Betracht.

## Zusammenfassung

Die Möglichkeit, sichere, zeitgebundene Links über Ihre eigene Domain zu erstellen, bietet zusätzliche Sicherheit, ohne die Effizienz zu beeinträchtigen. Jeder Anwendungsfall zeigt, wie benutzerdefinierte Domains sowohl die Sicherheitslage als auch die professionelle Präsenz verbessern.
