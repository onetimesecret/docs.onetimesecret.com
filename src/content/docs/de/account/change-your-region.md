---
title: Region wechseln
---

Onetime Secret verwendet eine [Share-Nothing-Architektur](/de/regions) für alle fünf Regionen (CA, EU, NZ, UK, US). Jede Region arbeitet als vollständig eigenständiges System mit eigener Datenbank, eigenen Konten und eigenen Geheimnissen. Wir übertragen unter keinen Umständen Daten zwischen den Regionen.

Das bedeutet, dass ein Regionswechsel weniger eine „Migration" ist als vielmehr eine Neueinrichtung in Ihrer bevorzugten Region. Die gute Nachricht: Es dauert nur etwa zwei Minuten, und Ihr Abonnement wird automatisch übernommen.

## Kostenlose Konten

Navigieren Sie direkt zu Ihrer bevorzugten Region (die vollständige Liste finden Sie unter [Verfügbare Regionen](/de/regions#verfügbare-regionen)) und erstellen Sie ein neues Konto mit derselben E-Mail-Adresse. Das war's schon — Ihr neues Konto ist sofort einsatzbereit.

## Kostenpflichtige Konten (Identity Plus)

Der Vorgang ist derselbe wie bei kostenlosen Konten, mit einem zusätzlichen Schritt:

1. Rufen Sie die URL Ihrer bevorzugten Region auf (siehe [Verfügbare Regionen](/de/regions#verfügbare-regionen))
2. Erstellen Sie ein Konto mit derselben E-Mail-Adresse, die mit Ihrem Abonnement verknüpft ist
3. Melden Sie sich an und navigieren Sie zu Ihrer Kontoseite
4. Ihr Abonnementstatus wird automatisch über Stripe erkannt

Möglicherweise müssen Sie die Seite einmal neu laden, damit sich das Abonnement synchronisiert. Das funktioniert, weil wir die Daten zwischen den Regionen getrennt halten, während Ihre Abrechnungsbeziehung über Stripe verwaltet wird, das Ihre E-Mail-Adresse regionsübergreifend erkennt.

## Was mit Ihrem alten Konto passiert

Ihr Konto in der bisherigen Region bleibt vollständig funktionsfähig:

- Bestehende geheime Links funktionieren weiterhin, bis sie angesehen werden oder ablaufen
- Ihr Konto bleibt aktiv, falls Sie später noch etwas nachschlagen müssen
- Es sind keine weiteren Schritte für das alte Konto erforderlich, es sei denn, Sie möchten es schließen

## Migration benutzerdefinierter Domains

Wenn Sie in Ihrer aktuellen Region eine benutzerdefinierte Domain konfiguriert haben, erfordert der Vorgang etwas mehr Planung. Da Ihre bestehenden geheimen Links die DNS-Einträge Ihrer benutzerdefinierten Domain verwenden, können Sie die Domain nicht einfach auf die neue Region umstellen, ohne Links unbrauchbar zu machen, die noch nicht angesehen wurden.

### Schritt für Schritt

1. **Fügen Sie eine temporäre Subdomain** zu Ihrem neuen regionalen Konto hinzu. Wenn Ihre aktuelle Domain beispielsweise `secrets.example.com` lautet, fügen Sie etwas wie `secrets-new.example.com` oder `secrets-us.example.com` hinzu.

2. **Erstellen Sie einen CNAME-Eintrag** für die temporäre Subdomain, der auf den passenden regionalen Identity-Endpunkt zeigt (z. B. `identity.us.onetime.co` für die US-Region). Details zur DNS-Konfiguration finden Sie im [Leitfaden zur Einrichtung benutzerdefinierter Domains](/de/custom-domains/setup-guide).

3. **Verwenden Sie die temporäre Subdomain** ab sofort für neue Geheimnisse.

4. **Nach 30 Tagen** sind alle auf der alten Domain erstellten Geheimnisse abgelaufen. Anschließend können Sie:
   - die benutzerdefinierte Domain aus Ihrem alten regionalen Konto entfernen
   - Ihre bevorzugte Subdomain (z. B. `secrets.example.com`) zu Ihrem neuen regionalen Konto hinzufügen
   - den CNAME-Eintrag so aktualisieren, dass er auf den Endpunkt der neuen Region zeigt
   - die Domain in Ihrem Konto-Dashboard verifizieren

5. **Räumen Sie auf**, sobald Ihre bevorzugte Domain aktiv und verifiziert ist, indem Sie die temporäre Subdomain entfernen.

### Warum 30 Tage?

Die maximale Lebensdauer (TTL) eines Geheimnisses beträgt 30 Tage. Wenn Sie diesen Zeitraum abwarten, stellen Sie sicher, dass alle unter der alten DNS-Konfiguration der Region erstellten Geheimnisse entweder angesehen wurden oder abgelaufen sind, sodass die Aktualisierung des CNAME-Eintrags keine noch offenen Links beeinträchtigt.

Wenn Sie wissen, dass alle Ihre bestehenden Geheimnisse kürzere TTLs haben oder bereits angesehen wurden, können Sie den Wechsel früher vornehmen.

## Konten ohne benutzerdefinierte Domain

Wenn Sie keine benutzerdefinierte Domain verwenden, erfolgt der Wechsel sofort. Ihre alten Links (die die regionalen onetimesecret.com-URLs verwenden, z. B. `eu.onetimesecret.com/secret/abcd1234`) funktionieren weiterhin korrekt, unabhängig davon, in welcher Region sich Ihr aktives Konto befindet.

## Mehrere Regionen

Sie können gleichzeitig Konten in mehreren Regionen unterhalten. Alle Konten, die dieselbe E-Mail-Adresse verwenden, teilen sich denselben Abonnementstatus. Das kann nützlich sein, wenn Sie Nutzer in unterschiedlichen geografischen Gebieten bedienen und die Latenz minimieren oder Anforderungen an die Datenspeicherung erfüllen möchten.

## Dedizierte Instanzen

Kunden mit dedizierten Instanzen sollten uns für Regionswechsel unter [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) kontaktieren, da dedizierte Infrastruktur eine manuelle Neukonfiguration erfordert. Sie erreichen uns auch über die [Feedback-Seite](https://onetimesecret.com/feedback).
