---
title: Datenschutz
description: Was Onetime Secret speichert, wie lange es aufbewahrt wird, wo es verarbeitet wird und wie das deine Compliance-Pflichten unterstützt.
---

Diese Seite beschreibt, wie Onetime Secret mit deinen Daten umgeht: was
gespeichert wird, wie lange, wo die Daten liegen und wie das dein eigenes
Compliance-Programm unterstützt.

## Was wir speichern und wie lange

- **Geheimnisinhalte** werden verschlüsselt und sind für einen einzigen Abruf
  bestimmt. Sobald ein Geheimnis angesehen wird — oder sein Ablaufdatum
  erreicht — wird es dauerhaft gelöscht.
- **Ablauf ist eingebaut.** Jedes Geheimnis hat eine Lebensdauer (konfigurierbar
  innerhalb der Grenzen deines Tarifs); nichts ist darauf ausgelegt, unbegrenzt
  zu bestehen.
- **Minimale Metadaten.** Im Einklang mit unserem Grundsatz der [Datenminimierung](/de/principles/data-minimization)
  wollen wir nur die Metadaten aufbewahren, die für den Betrieb des Dienstes
  nötig sind.

## Verschlüsselung

Geheimnisse werden in jedem Tarif **bei der Übertragung und im Ruhezustand
verschlüsselt**. Die Übertragung ist mit TLS geschützt, und für
benutzerdefinierte Domains übernehmen wir die Ausstellung und Erneuerung der
SSL/TLS-Zertifikate automatisch.

Für besonders sensibles Material kannst du den Schutz mehrschichtig aufbauen:
mit einer **Passphrase**, dem Aufteilen von Informationen auf mehrere
Geheimnisse und der kürzesten praktikablen Ablaufzeit — siehe
[Bewährte Sicherheitspraktiken](/de/security-best-practices).

## Wo deine Daten verarbeitet werden (Datenresidenz)

Du kannst die Region wählen, in der deine Daten verarbeitet und gespeichert
werden — derzeit EU, UK, US, CA und NZ. So bleiben die Daten nah bei deinen
Nutzern und in einer Rechtsordnung, die zu deinen Anforderungen passt. Details
und Endpunkte findest du unter [Rechenzentrumsregionen](/de/regions).

## Compliance

Onetime Secret ist darauf ausgelegt, deine Compliance-Bemühungen zu
unterstützen; es ersetzt nicht deine eigenen Kontrollen, Richtlinien und
juristische Prüfung.

- **DSGVO / Datenschutz.** Regionale Datenresidenz, kurzlebige Daten und
  Datenminimierung sollen dir helfen, Datenschutzpflichten zu erfüllen.
  In den meisten Einsatzszenarien agierst du als Verantwortlicher und Onetime
  Secret als Auftragsverarbeiter für die wenigen betroffenen Daten.
- **HIPAA.** Wie in unseren [Anwendungsfällen](/de/custom-domains/use-cases)
  beschrieben, kann Onetime Secret ein sichererer Kanal als E-Mail sein, um
  erste Zugangsdaten auszutauschen. Es sollte aber als Übergangslösung dienen,
  nicht als dauerhafter Speicherort für PHI. Kombiniere es für laufende
  PHI-Workflows mit einem dedizierten, konformen System.
- **Zertifizierungen, AVV und spezifische Rahmenwerke.** Bei Fragen zu
  Zertifizierungen, einem Auftragsverarbeitungsvertrag (AVV) oder einem
  bestimmten regulatorischen Rahmenwerk wende dich an
  **support@onetimesecret.com**.

Für Organisationen mit strengen Anforderungen an die Datenkontrolle bleibt beim [Self-Hosting](https://github.com/onetimesecret/onetimesecret)
alles innerhalb der eigenen Infrastruktur.

## Fragen oder Hilfe benötigt?

Wir sind für dich da.

- Allgemein: support@onetimesecret.com
- Sicherheitsprobleme: security@onetimesecret.com ([Offenlegungsrichtlinie](/de/security/vulnerability-disclosure))
