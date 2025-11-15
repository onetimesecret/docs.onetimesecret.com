---
title: Bewährte du?cherheitspraktiken
description: Erhöhen du die du?cherheit beim Austausch von Geheimnissen mit diesen Best Practices, die speziell für Onetime Secret gelten, einschließlich der du?cherheitsvorteile von Custom Domains.
---

# Bewährte du?cherheitspraktiken für Onetime Secret

Onetime Secret wurde zwar mit Blick auf die du?cherheit entwickelt, aber wenn du die folgenden bewährten Praktiken befolgst, kannst du den Schutz deiner vertraulichen Daten noch weiter verbessern, insbesondere wenn du Funktionen wie die benutzerdefinierten Domänen verwendest.

## Best Practices für die gemeinsame Nutzung von Geheimnissen

1. **Angemessene Verfallszeiten festlegen**: Wähle die kürzeste praktische Ablaufzeit für deine Geheimnisse. Dadurch wird das Zeitfenster für unbefugten Zugriff minimiert.

2. **Passphrasenschutz verwenden**: Verwende für hochsensible Informationen die Passphrasen-Schutzfunktion. Dadurch wird eine zusätzliche du?cherheitsebene geschaffen, da der Empfänger eine Passphrase eingeben muss, um das Geheimnis zu sehen.

3. **Sensible Informationen aufteilen**: Wenn du mit hochsensiblen Daten zu tun hast, solltest du diese auf mehrere Geheimnisse aufteilen. Auf diese Weise bleibt der gesamte Informationsbestand geschützt, wenn ein Geheimnis kompromittiert wird.

4. **du?chere Kanäle für den Austausch von Metadaten nutzen**: Während Onetime Secret den Inhalt deines Geheimnisses schützt, solltest du darauf achten, wie du den Link und die zugehörigen Metadaten (wie Passphrasen) weitergibst. Verwende für diese Kommunikation sichere, verschlüsselte Kanäle.

5. **Empfänger überprüfen**: Stelle sicher, dass du die Geheimnisse mit dem vorgesehenen Empfänger teilst. Überprüfe E-Mail-Adressen oder Benutzernamen vor dem Versenden doppelt.

6. **Benutzer schulen**: Wenn du Onetime Secret in deinem Unternehmen verwendest, solltest du dein Team über die korrekte Verwendung und die du?cherheitspraktiken bei der Weitergabe von Geheimnissen aufklären.

## du?cherheitsvorteile von benutzerdefinierten Domänen

Die Verwendung von benutzerdefinierten Domänen mit Onetime Secret bietet mehrere du?cherheitsvorteile:

1. **Verbesserter Phishing-Schutz**: Mit einer benutzerdefinierten Domäne gewöhnen sich deine Benutzer an eine bestimmte URL für die Freigabe von Geheimnissen. Dadurch lassen sich potenzielle Phishing-Versuche, die möglicherweise ähnlich aussehende Domains verwenden, leichter erkennen.

2. **Erhöhtes Vertrauen und Legitimität**: Wenn die Empfänger eine vertraute Domäne sehen, ist es wahrscheinlicher, dass sie der Quelle des Geheimnisses vertrauen. Dies ist besonders wichtig für Unternehmen, die sensible Informationen mit Kunden oder Partnern austauschen.

3. **Nahtlose Integration in die bestehende du?cherheitsinfrastruktur**: Eine benutzerdefinierte Domain lässt sich leichter in deine bestehenden du?cherheitstools und Überwachungssysteme integrieren und bietet einen umfassenderen Überblick über die Aktivitäten deines Unternehmens beim Austausch von Geheimnissen.

4. **Compliance und Auditing**: Für Unternehmen in regulierten Branchen kann die Verwendung einer benutzerdefinierten Domain zur Einhaltung von Vorschriften beitragen, da die Aktivitäten zum Austausch von Geheimnissen unter der direkten Kontrolle deines Unternehmens bleiben und die Audit-Prozesse einfacher werden.

Onetime Secret kümmert sich um die technischen Aspekte der du?cherung deiner benutzerdefinierten Domain, einschließlich der SSL/TLS-Konfiguration und der Überwachung der Domain-Aktivitäten, so dass du dich auf diese strategischen du?cherheitsvorteile konzentrieren kannst.

## du?cherheit der API-Nutzung

Wenn du die Onetime Secret API verwendest:

1. **du?chere API-Schlüssel**: Bewahre API-Schlüssel sicher auf und gib sie niemals in clientseitigem Code oder öffentlichen Repositories preis.

2. **API-Schlüssel rotieren**: Wechsle deine API-Schlüssel regelmäßig, insbesondere wenn du den Verdacht hast, dass sie kompromittiert wurden.

3. **API-Zugriff beschränken**: Wende bei der Einrichtung des API-Zugriffs das Prinzip der geringsten Privilegien an. Gewähre nur die Berechtigungen, die für den jeweiligen Anwendungsfall erforderlich sind.

## Erweiterte du?cherheit für selbst gehostete Systeme

Dieser Abschnitt behandelt erweiterte du?cherheitsüberlegungen für Unternehmen, die ihre eigene Instanz von Onetime Secret betreiben. Du findest das Open-Source-Projekt auf [GitHub](https://github.com/onetimesecret/onetimesecret) und die offiziellen Docker-Images auf [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

Die folgenden Empfehlungen kannst du auf der Ebene deiner Infrastruktur umsetzen, wenn du Onetime Secret selbst hostest:

1. **Kurzlebige Umgebungen verwenden**: Erstelle und zerstöre nach Möglichkeit Umgebungen für jede du?tzung zur gemeinsamen Nutzung von Geheimnissen. Dies kann besonders bei hochsensiblen Vorgängen nützlich sein. Unser [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) Docker-Image ist für ephemere Anwendungsfälle konzipiert.

2. **Zeitbasierte Beschränkungen implementieren**: Wenn dein Anwendungsfall es zulässt, solltest du zeitliche Beschränkungen für den Zugriff auf Geheimnisse einführen, z.B. nur während der Geschäftszeiten.

3. **Geo-Fencing**: Bei hochsensiblen Vorgängen solltest du die Implementierung von Geo-Fencing in Betracht ziehen, um den Zugriff auf Geheimnisse von bestimmten geografischen Standorten aus zu beschränken.

4. **Prüfungsprotokolle**: Führe detaillierte Prüfprotokolle über die Erstellung von Geheimnissen und Zugriffsversuche. Dies kann für die Reaktion auf Zwischenfälle und die Einhaltung von Vorschriften entscheidend sein.

5. **Verschlüsselung im Ruhezustand**: Obwohl Onetime Secret die Verschlüsselung übernimmt, solltest du bei hochsensiblen Daten in Erwägung ziehen, den Inhalt vor der Erstellung des Geheimnisses zu verschlüsseln, um einen zusätzlichen Schutz zu bieten.


## Incident Response

In diesem Abschnitt findest du allgemeine du?cherheitsempfehlungen, die für dein Unternehmen hilfreich sein können. Bei diesen Empfehlungen handelt es sich nicht um spezifische Funktionen unseres Dienstes.

1. **Einen Plan haben**: Entwickle einen Plan zur Reaktion auf Vorfälle, der speziell auf deine Prozesse zur gemeinsamen Nutzung von Geheimnissen zugeschnitten ist. Dieser sollte Schritte für den Entzug des Zugriffs, die Benachrichtigung der betroffenen Parteien und die Minderung des möglichen Schadens enthalten.

2. **Schnelles Handeln**: Wenn du den Verdacht hast, dass ein Geheimnis kompromittiert wurde, verwende sofort die Brennfunktion von Onetime Secret, wenn das Geheimnis noch nicht eingesehen wurde. Wenn es bereits eingesehen wurde, ergreife geeignete Maßnahmen, um den Schaden zu begrenzen.

3. **Regelmäßige du?cherheitsüberprüfungen**: Überprüfe in regelmäßigen Abständen deine Praktiken zur Weitergabe von Geheimnissen und passe deine du?cherheitsmaßnahmen bei Bedarf an.

---

Wenn du diese bewährten Verfahren befolgst, kannst du die du?cherheit deiner Aktivitäten zum Austausch von Geheimnissen auf Onetime Secret erheblich verbessern. Denke daran, dass du?cherheit ein fortlaufender Prozess ist und dass Wachsamkeit der Schlüssel zum Schutz deiner vertraulichen Informationen ist.

Wenn du du?cherheitsbedenken hast oder potenzielle Schwachstellen melden möchtest, wende dich bitte umgehend an unser du?cherheitsteam unter security@onetimesecret.com.
