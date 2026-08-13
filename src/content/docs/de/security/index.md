---
title: Sicherheit & Vertrauen
description: Wie Onetime Secret deine Geheimnisse schützt — das Sicherheitsmodell, der Umgang mit Daten, regionale Datenresidenz und wie du eine Sicherheitslücke meldest.
---

Onetime Secret existiert, um sensible Informationen von einer Person zur anderen
zu übertragen, ohne dass sie in Posteingängen, Chat-Verläufen oder Ticketsystemen
liegen bleiben. Dieser Abschnitt erklärt, wie der Dienst gebaut ist, um das
sicher zu tun, und wo du die Details findest.

## Das Sicherheitsmodell in Kürze

- **Einmaliger Zugriff.** Ein Geheimnis ist darauf ausgelegt, einmal angesehen
  und dann dauerhaft gelöscht zu werden. Sobald es gelesen wurde (oder abgelaufen
  ist), ist es weg.
- **Verschlüsselung bei der Übertragung und im Ruhezustand.** Geheimnisse werden
  in allen Tarifen bei der Übertragung und im Ruhezustand verschlüsselt.
- **Schutz durch Passphrase.** Du kannst festlegen, dass zum Ansehen eines
  Geheimnisses eine Passphrase erforderlich ist — eine zusätzliche Schutzebene,
  die der Link allein nicht öffnen kann.
- **Von Haus aus zeitlich begrenzt.** Jedes Geheimnis hat ein Ablaufdatum; wähle
  die kürzeste praktikable Lebensdauer, um das Risiko zu minimieren.
- **Zerstören vor dem Lesen.** Solange ein Geheimnis noch nicht angesehen wurde,
  kannst du es zerstören — dann kann es nie gelesen werden.
- **Datenminimierung.** Wir wollen nur erheben und aufbewahren, was nötig ist —
  siehe [Datenminimierung](/en/security/our-principles#data-minimization).

## Inhalte dieses Abschnitts

- **[Datenschutz](/de/security/data-protection)** — was wir speichern, wie lange, wo die Daten liegen und wie das zu deinen Compliance-Anforderungen passt.
- **[Bewährte Sicherheitspraktiken](/de/security/best-practices)** — praktische Hinweise zum sicheren Teilen von Geheimnissen, einschließlich der Vorteile benutzerdefinierter Domains.
- **[Meldung von Sicherheitslücken](/de/security/vulnerability-disclosure)** — wie du ein Sicherheitsproblem verantwortungsvoll meldest.

## Verwandte Themen

- **[Unsere Grundsätze](/en/security/our-principles)** — Datenschutz zuerst, Kommunikation und Datenminimierung.
- **[Rechenzentrumsregionen](/en/security/where-your-data-lives)** — wähle, wo deine Daten verarbeitet und gespeichert werden.
- **[Self-Hosting](https://github.com/onetimesecret/onetimesecret)** — betreibe Onetime Secret auf deiner eigenen Infrastruktur für volle Kontrolle.

## Ein Sicherheitsproblem melden

Wenn du glaubst, eine Sicherheitslücke gefunden zu haben, kontaktiere unser
Sicherheitsteam unter **security@onetimesecret.com**. Unter [Meldung von Sicherheitslücken](/de/security/vulnerability-disclosure)
erfährst du, was dein Bericht enthalten sollte und was dich erwartet.
