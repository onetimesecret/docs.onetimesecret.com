---
title: Bewährte Sicherheitspraktiken
description: Erhöhen Sie die Sicherheit beim Austausch von Geheimnissen mit diesen Best Practices, die speziell für Onetime Secret gelten, einschließlich der Sicherheitsvorteile von Custom Domains.
---

# Bewährte Sicherheitspraktiken für Onetime Secret

Onetime Secret wurde zwar mit Blick auf die Sicherheit entwickelt, aber wenn Sie die folgenden bewährten Praktiken befolgen, können Sie den Schutz Ihrer vertraulichen Daten noch weiter verbessern, insbesondere wenn Sie Funktionen wie die benutzerdefinierten Domänen verwenden.

## Best Practices für die gemeinsame Nutzung von Geheimnissen

1. **Angemessene Verfallszeiten festlegen**: Wählen Sie die kürzeste praktische Ablaufzeit für Ihre Geheimnisse. Dadurch wird das Zeitfenster für unbefugten Zugriff minimiert.

2. **Verwenden Sie einen Passphrasenschutz**: Verwenden Sie für hochsensible Informationen die Passphrasen-Schutzfunktion. Dadurch wird eine zusätzliche Sicherheitsebene geschaffen, da der Empfänger eine Passphrase eingeben muss, um das Geheimnis zu sehen.

3. **Teilen Sie sensible Informationen auf**: Wenn Sie mit hochsensiblen Daten zu tun haben, sollten Sie diese auf mehrere Geheimnisse aufteilen. Auf diese Weise bleibt der gesamte Informationsbestand geschützt, wenn ein Geheimnis kompromittiert wird.

4. **Nutzen Sie sichere Kanäle für den Austausch von Metadaten**: Während Onetime Secret den Inhalt Ihres Geheimnisses schützt, sollten Sie darauf achten, wie Sie den Link und die zugehörigen Metadaten (wie Passphrasen) weitergeben. Verwenden Sie für diese Kommunikation sichere, verschlüsselte Kanäle.

5. **Empfänger überprüfen**: Stellen Sie sicher, dass Sie die Geheimnisse mit dem vorgesehenen Empfänger teilen. Überprüfen Sie E-Mail-Adressen oder Benutzernamen vor dem Versenden doppelt.

6. **Benutzer schulen**: Wenn Sie Onetime Secret in Ihrem Unternehmen verwenden, sollten Sie Ihr Team über die korrekte Verwendung und die Sicherheitspraktiken bei der Weitergabe von Geheimnissen aufklären.

## Sicherheitsvorteile von benutzerdefinierten Domänen

Die Verwendung von benutzerdefinierten Domänen mit Onetime Secret bietet mehrere Sicherheitsvorteile:

1. **Verbesserter Phishing-Schutz**: Mit einer benutzerdefinierten Domäne gewöhnen sich Ihre Benutzer an eine bestimmte URL für die Freigabe von Geheimnissen. Dadurch lassen sich potenzielle Phishing-Versuche, die möglicherweise ähnlich aussehende Domains verwenden, leichter erkennen.

2. **Erhöhtes Vertrauen und Legitimität**: Wenn die Empfänger eine vertraute Domäne sehen, ist es wahrscheinlicher, dass sie der Quelle des Geheimnisses vertrauen. Dies ist besonders wichtig für Unternehmen, die sensible Informationen mit Kunden oder Partnern austauschen.

3. **Nahtlose Integration in die bestehende Sicherheitsinfrastruktur**: Eine benutzerdefinierte Domain lässt sich leichter in Ihre bestehenden Sicherheitstools und Überwachungssysteme integrieren und bietet einen umfassenderen Überblick über die Aktivitäten Ihres Unternehmens beim Austausch von Geheimnissen.

4. **Compliance und Auditing**: Für Unternehmen in regulierten Branchen kann die Verwendung einer benutzerdefinierten Domain zur Einhaltung von Vorschriften beitragen, da die Aktivitäten zum Austausch von Geheimnissen unter der direkten Kontrolle Ihres Unternehmens bleiben und die Audit-Prozesse einfacher werden.

Onetime Secret kümmert sich um die technischen Aspekte der Sicherung Ihrer benutzerdefinierten Domain, einschließlich der SSL/TLS-Konfiguration und der Überwachung der Domain-Aktivitäten, so dass Sie sich auf diese strategischen Sicherheitsvorteile konzentrieren können.

## Sicherheit der API-Nutzung

Wenn Sie die Onetime Secret API verwenden:

1. **Sichere API-Schlüssel**: Bewahren Sie API-Schlüssel sicher auf und geben Sie sie niemals in clientseitigem Code oder öffentlichen Repositories preis.

2. **Rotieren Sie API-Schlüssel**: Wechseln Sie Ihre API-Schlüssel regelmäßig, insbesondere wenn Sie den Verdacht haben, dass sie kompromittiert wurden.

3. **Beschränken Sie den API-Zugriff**: Wenden Sie bei der Einrichtung des API-Zugriffs das Prinzip der geringsten Privilegien an. Gewähren Sie nur die Berechtigungen, die für den jeweiligen Anwendungsfall erforderlich sind.

## Erweiterte Sicherheit für selbst gehostete Systeme

Dieser Abschnitt behandelt erweiterte Sicherheitsüberlegungen für Unternehmen, die ihre eigene Instanz von Onetime Secret betreiben. Sie finden das Open-Source-Projekt auf [GitHub](https://github.com/onetimesecret/onetimesecret) und die offiziellen Docker-Images auf [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

Die folgenden Empfehlungen können Sie auf der Ebene Ihrer Infrastruktur umsetzen, wenn Sie Onetime Secret selbst hosten:

1. **Verwenden Sie kurzlebige Umgebungen**: Erstellen und zerstören Sie nach Möglichkeit Umgebungen für jede Sitzung zur gemeinsamen Nutzung von Geheimnissen. Dies kann besonders bei hochsensiblen Vorgängen nützlich sein. Unser [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) Docker-Image ist für ephemere Anwendungsfälle konzipiert.

2. **Implementieren Sie zeitbasierte Beschränkungen**: Wenn Ihr Anwendungsfall es zulässt, sollten Sie zeitliche Beschränkungen für den Zugriff auf Geheimnisse einführen, z.B. nur während der Geschäftszeiten.

3. **Geo-Fencing**: Bei hochsensiblen Vorgängen sollten Sie die Implementierung von Geo-Fencing in Betracht ziehen, um den Zugriff auf Geheimnisse von bestimmten geografischen Standorten aus zu beschränken.

4. **Prüfungsprotokolle**: Führen Sie detaillierte Prüfprotokolle über die Erstellung von Geheimnissen und Zugriffsversuche. Dies kann für die Reaktion auf Zwischenfälle und die Einhaltung von Vorschriften entscheidend sein.

5. **Verschlüsselung im Ruhezustand**: Obwohl Onetime Secret die Verschlüsselung übernimmt, sollten Sie bei hochsensiblen Daten in Erwägung ziehen, den Inhalt vor der Erstellung des Geheimnisses zu verschlüsseln, um einen zusätzlichen Schutz zu bieten.


## Incident Response

In diesem Abschnitt finden Sie allgemeine Sicherheitsempfehlungen, die für Ihr Unternehmen hilfreich sein können. Bei diesen Empfehlungen handelt es sich nicht um spezifische Funktionen unseres Dienstes.

1. **Haben Sie einen Plan**: Entwickeln Sie einen Plan zur Reaktion auf Vorfälle, der speziell auf Ihre Prozesse zur gemeinsamen Nutzung von Geheimnissen zugeschnitten ist. Dieser sollte Schritte für den Entzug des Zugriffs, die Benachrichtigung der betroffenen Parteien und die Minderung des möglichen Schadens enthalten.

2. **Schnelles Handeln**: Wenn Sie den Verdacht haben, dass ein Geheimnis kompromittiert wurde, verwenden Sie sofort die Brennfunktion von Onetime Secret, wenn das Geheimnis noch nicht eingesehen wurde. Wenn es bereits eingesehen wurde, ergreifen Sie geeignete Maßnahmen, um den Schaden zu begrenzen.

3. **Regelmäßige Sicherheitsüberprüfungen**: Überprüfen Sie in regelmäßigen Abständen Ihre Praktiken zur Weitergabe von Geheimnissen und passen Sie Ihre Sicherheitsmaßnahmen bei Bedarf an.

---

Wenn Sie diese bewährten Verfahren befolgen, können Sie die Sicherheit Ihrer Aktivitäten zum Austausch von Geheimnissen auf Onetime Secret erheblich verbessern. Denken Sie daran, dass Sicherheit ein fortlaufender Prozess ist und dass Wachsamkeit der Schlüssel zum Schutz Ihrer vertraulichen Informationen ist.

Wenn Sie Sicherheitsbedenken haben oder potenzielle Schwachstellen melden möchten, wenden Sie sich bitte umgehend an unser Sicherheitsteam unter security@onetimesecret.com.
