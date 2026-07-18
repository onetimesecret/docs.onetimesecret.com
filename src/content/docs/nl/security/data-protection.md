---
title: Gegevensbescherming
description: Wat Onetime Secret opslaat, hoe lang het wordt bewaard, waar het wordt verwerkt en hoe dit je compliance-verplichtingen ondersteunt.
---

Deze pagina beschrijft hoe Onetime Secret met je gegevens omgaat: wat er wordt
opgeslagen, hoe lang, waar het staat en hoe dat je eigen complianceprogramma
ondersteunt.

## Wat we opslaan, en hoe lang

- **Berichtinhoud** wordt versleuteld en is bedoeld voor eenmalige opvraging.
  Zodra een bericht is bekeken — of zijn verlooptijd bereikt — wordt het
  permanent vernietigd.
- **Verlopen is ingebouwd.** Elk bericht heeft een levensduur (instelbaar
  binnen de grenzen van je abonnement); niets is bedoeld om onbeperkt te
  blijven bestaan.
- **Minimale metadata.** In lijn met ons principe van [Gegevensminimalisatie](/nl/principles/data-minimization)
  streven we ernaar alleen de metadata te bewaren die nodig is om de dienst te
  laten draaien.

## Versleuteling

Berichten worden op elk abonnement **onderweg en in rust versleuteld**. Het
transport wordt beschermd met TLS, en voor aangepaste domeinen regelen we de
uitgifte en verlenging van SSL/TLS-certificaten automatisch.

Voor bijzonder gevoelig materiaal kun je extra verdedigingslagen toevoegen door
een **wachtwoordzin** in te schakelen, informatie te verdelen over meerdere
berichten en de kortst praktische verlooptijd te kiezen — zie
[Beste praktijken voor beveiliging](/nl/security-best-practices).

## Waar je gegevens worden verwerkt (dataresidentie)

Je kunt kiezen in welke regio je gegevens worden verwerkt en opgeslagen —
momenteel de EU, het VK, de VS, Canada en Nieuw-Zeeland. Zo houd je gegevens
dicht bij je gebruikers en binnen een jurisdictie die bij je eisen past. Zie
[Datacenter regio's](/nl/regions) voor details en endpoints.

## Compliance

Onetime Secret is ontworpen om je compliance-inspanningen te ondersteunen; het
vervangt niet je eigen maatregelen, beleid en juridische toetsing.

- **GDPR/AVG en gegevensbescherming.** Regionale dataresidentie, kortlevende
  gegevens en gegevensminimalisatie zijn ontworpen om je te helpen aan
  gegevensbeschermingsverplichtingen te voldoen. In de meeste implementaties
  treed jij op als verwerkingsverantwoordelijke en Onetime Secret als verwerker
  voor de beperkte gegevens die ermee gemoeid zijn.
- **HIPAA.** Zoals beschreven in onze [use cases](/nl/custom-domains/use-cases) kan
  Onetime Secret een veiliger kanaal bieden dan e-mail voor het uitwisselen van
  initiële toegangsgegevens, maar het moet worden gebruikt als tijdelijke
  tussenoplossing, niet als permanent registratiesysteem voor PHI. Combineer
  het met een speciaal compliant systeem voor doorlopende PHI-workflows.
- **Certificeringen, verwerkersovereenkomsten en specifieke kaders.** Voor
  vragen over certificeringen, een verwerkersovereenkomst (DPA) of een
  specifiek regelgevend kader kun je contact opnemen met
  **support@onetimesecret.com**.

Voor organisaties met strikte eisen aan gegevenscontrole houdt [self-hosting](https://github.com/onetimesecret/onetimesecret)
alles binnen je eigen infrastructuur.

## Vragen of hulp nodig?

We staan voor je klaar.

- Algemeen: support@onetimesecret.com
- Beveiligingsproblemen: security@onetimesecret.com ([meldingsbeleid](/nl/security/vulnerability-disclosure))
