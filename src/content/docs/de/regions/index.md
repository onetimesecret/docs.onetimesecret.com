---
title: Rechenzentrumsregionen
description: Erfahren Sie mehr über die Rechenzentrumsregionen von Onetime Secret und wie Sie die richtige Region für Ihre Bedürfnisse auswählen.
---

Onetime Secret bietet fünf Rechenzentrumsregionen an: Kanada (CA), Europäische Union (EU), Aotearoa Neuseeland (NZ), Vereinigtes Königreich (UK) und Vereinigte Staaten (US). Dieser Leitfaden hilft Ihnen zu verstehen, warum die Wahl der Region wichtig ist und wie Sie die richtige für Ihre Bedürfnisse auswählen.

## Warum die Wahl der Region wichtig ist

Die Wahl der richtigen Rechenzentrumsregion ist aus mehreren Gründen entscheidend:

1. **Datensouveränität**: Verschiedene Regionen haben unterschiedliche Datenschutzgesetze und -vorschriften.
2. **Latenz**: Die Wahl einer Region, die näher an Ihrer Hauptnutzerbasis liegt, kann die Latenzzeit verringern.
3. **Konformität**: Einige Unternehmen haben spezifische Anforderungen an den Ort, an dem ihre Daten gespeichert werden können.

## Verfügbare Regionen

| Region | Standort | URL |
|--------|----------|-----|
| [Kanada (CA)](/de/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Europäische Union (EU)](/de/regions/european-union) | Nürnberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Neuseeland (NZ)](/de/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Vereinigtes Königreich (UK)](/de/regions/united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Vereinigte Staaten (US)](/de/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Jede Regionsseite enthält Details zum lokalen regulatorischen Umfeld und dazu, wann diese Region für Ihren Anwendungsfall relevant sein könnte.

## Share-Nothing-Architektur

Onetime Secret verwendet eine Share-Nothing-Architektur, die eine vollständige Datenisolierung zwischen den Regionen gewährleistet:

- **Getrennte Konten**: Das Anlegen eines Kontos auf einer beliebigen regionalen Domain ist völlig unabhängig von Konten auf anderen Domains — selbst wenn Sie dieselbe E-Mail-Adresse verwenden.
- **Keine zentrumsübergreifenden Operationen**: Sie können keine Operationen (wie das Zerstören eines Geheimnisses) über Rechenzentren hinweg durchführen. Jedes Zentrum verwaltet seinen eigenen Satz von Geheimnissen und Benutzerdaten.
- **Konsistente Abrechnung für zahlende Nutzer**: Bei kostenpflichtigen Konten werden zwar keine Nutzerdaten zwischen den Zentren geteilt, doch Ihr Abonnementstatus wird über unseren Zahlungsanbieter Stripe regionsübergreifend erkannt.

## So wählen Sie Ihre Region

Berücksichtigen Sie die folgenden Faktoren bei der Auswahl Ihrer Rechenzentrumsregion:

### Ohne Konto

- Anfragen an onetimesecret.com können an ein beliebiges aktives Rechenzentrum weitergeleitet werden.
- Sie können eine bestimmte Region auswählen, indem Sie direkt zu einer regionalen Domain navigieren (z. B. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Der generierte Link identifiziert die Region immer eindeutig (z. B. `us.onetimesecret.com/secret/abcd1234`).

### Mit Konto

- Wenn Sie ein Konto erstellen, wählen Sie eine Rechenzentrumsregion. Alle Tarife — kostenlos und kostenpflichtig — haben Zugriff auf jede Region.
- Sie melden sich an derselben regionalen Domain an, bei der Sie sich registriert haben (z. B. wenn Sie sich bei `eu.onetimesecret.com` registriert haben, melden Sie sich auch dort an).

### Zusätzliche Überlegungen

1. **Für Privatpersonen**:
   - Persönliche Präferenz
   - Nähe zu Ihrem Standort für möglicherweise schnelleren Zugriff
   - Bedenken hinsichtlich der persönlichen Datensouveränität

2. **Für Unternehmen**:
   - Gesetzliche und regulatorische Anforderungen
   - Standort Ihres Hauptkundenstamms
   - Branchenspezifische Compliance-Anforderungen

3. **Technische Überlegungen**:
   - Latenzanforderungen für Ihre Anwendung
   - Integration mit anderen Diensten oder Systemen

## Zukunftspläne

Wir arbeiten kontinuierlich an der Erweiterung unserer Rechenzentrumsoptionen. Zukünftige Pläne beinhalten zusätzliche Rechenzentrumsstandorte in:

- Australien
- Brasilien
- Japan
- Mexiko
- Norwegen
- Südkorea

Diese Erweiterungen bieten noch mehr Optionen für die Datenlokalität und verbessern die Leistung und die Compliance-Funktionen für Nutzer in verschiedenen Regionen.


## Häufig gestellte Fragen

**F: Kann ich meine Region nach der Kontoerstellung ändern?**
A: Ja. Eine Schritt-für-Schritt-Anleitung für kostenlose Konten, kostenpflichtige Abonnements und die Migration benutzerdefinierter Domains finden Sie unter [Region wechseln](/de/regions/switching-regions).

**F: Beeinflusst die Wahl der Region die Sicherheit meiner Geheimnisse?**
A: Nein, alle Regionen bieten das gleiche hohe Sicherheitsniveau. Die Wahl wirkt sich in erster Linie auf den Ort der Datenspeicherung und die mögliche Latenzzeit aus.

**F: Gibt es Preisunterschiede zwischen den Regionen?**
A: Die Preise sind je nach Region unterschiedlich — Sie können in Ihrer lokalen Währung bezahlen, und Stripe übernimmt die Währungsumrechnung automatisch. Identity Plus-Tarife beinhalten unbegrenzt viele benutzerdefinierte Domains über alle Rechenzentren hinweg im Rahmen eines einzigen Abonnements. Die aktuellsten Informationen finden Sie auf unserer [Preisseite](https://onetimesecret.com/pricing).

## Brauchen Sie Hilfe?

Wenn Sie sich nicht sicher sind, welche Region Sie wählen sollen, oder wenn Sie Fragen haben, zögern Sie nicht, sich an unser Support-Team zu wenden. Wir helfen Ihnen gerne, die beste Entscheidung für Ihre speziellen Bedürfnisse zu treffen.

- E-Mail: support@onetimesecret.com
- Feedback-Formular: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Denken Sie daran, dass die Wahl der richtigen Region sicherstellt, dass Sie bei der Verwendung von Onetime Secret die beste Leistung erhalten und alle relevanten Datenvorschriften einhalten.
