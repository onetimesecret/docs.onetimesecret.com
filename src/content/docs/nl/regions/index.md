---
title: Datacenter regio's
description: Lees meer over de datacenterregio's van Onetime Secret en hoe je de juiste regio voor jouw behoeften kiest.
---

Onetime Secret biedt vijf datacenterregio's: Canada (CA), Europese Unie (EU), Aotearoa Nieuw-Zeeland (NZ), Verenigd Koninkrijk (UK) en Verenigde Staten (US). Deze gids helpt je het belang van regioselectie te begrijpen en hoe je de juiste regio voor jouw behoeften kiest.

## Waarom regioselectie belangrijk is

Het kiezen van de juiste datacenterregio is om verschillende redenen cruciaal:

1. **Gegevenssoevereiniteit**: Verschillende regio's hebben verschillende wetten en regels voor gegevensbescherming.
2. **Latency**: Door een regio te kiezen die dichter bij je primaire gebruikers ligt, verlaag je de latency.
3. **Conformiteit**: Sommige organisaties hebben specifieke vereisten over waar hun gegevens opgeslagen mogen worden.

## Beschikbare regio's

| Regio | Locatie | URL |
|--------|----------|-----|
| [Canada (CA)](/nl/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Europese Unie (EU)](/nl/regions/european-union) | Neurenberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nieuw-Zeeland (NZ)](/nl/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Verenigd Koninkrijk (UK)](/nl/regions/united-kingdom) | Londen | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Verenigde Staten (US)](/nl/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Elke regiopagina bevat details over de lokale wet- en regelgeving en wanneer die regio relevant kan zijn voor jouw gebruikssituatie.

## Deel-niets-architectuur

Onetime Secret maakt gebruik van een share-nothing-architectuur, die volledige data-isolatie tussen regio's garandeert:

- **Aparte accounts**: Het aanmaken van een account op om het even welk regionaal domein staat volledig los van accounts op andere domeinen, zelfs als je hetzelfde e-mailadres gebruikt.
- **Geen centrumoverschrijdende bewerkingen**: Je kunt geen bewerkingen (zoals het verbranden van een geheim) uitvoeren tussen datacenters. Elk centrum beheert zijn eigen set geheimen en gebruikersgegevens.
- **Consistente facturering voor betaalde gebruikers**: Voor betaalde accounts worden er geen gebruikersgegevens gedeeld tussen centra, maar wordt je abonnementsstatus via onze betalingsprovider Stripe wel regio-overstijgend herkend.

## Hoe kies je jouw regio

Houd rekening met de volgende factoren bij het kiezen van je datacenterregio:

### Zonder account

- Aanvragen naar onetimesecret.com kunnen naar elk actief datacenter worden doorgestuurd.
- Je kunt een specifieke regio kiezen door direct naar een regionaal domein te navigeren (bijv. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- De gegenereerde link toont altijd de regio (bijv. `us.onetimesecret.com/secret/abcd1234`).

### Met account

- Wanneer je een account aanmaakt, kies je een datacenterregio. Alle abonnementen — gratis en betaald — hebben toegang tot elke regio.
- Je logt in op hetzelfde regionale domein waar je je hebt geregistreerd (bijv. als je je hebt aangemeld bij `eu.onetimesecret.com`, log je daar ook in).

### Overige overwegingen

1. **Voor individuen**:
   - Persoonlijke voorkeur
   - Nabijheid tot je locatie voor mogelijk snellere toegang
   - Zorgen over persoonlijke gegevenssoevereiniteit

2. **Voor bedrijven**:
   - Wettelijke en regelgevende vereisten
   - Locatie van je belangrijkste klantenbestand
   - Branchespecifieke complianceverplichtingen

3. **Technische overwegingen**:
   - Latency-vereisten van je applicatie
   - Integratie met andere diensten of systemen

## Toekomstplannen

We werken voortdurend aan de uitbreiding van onze datacenteropties. Toekomstige plannen omvatten extra datacenterlocaties in:

- Australië
- Brazilië
- Japan
- Mexico
- Noorwegen
- Zuid-Korea

Deze uitbreidingen bieden nog meer opties voor datalokalisatie, en verbeteren de prestaties en compliancemogelijkheden voor gebruikers in verschillende regio's.


## Veelgestelde vragen

**V: Kan ik mijn regio wijzigen nadat ik mijn account heb ingesteld?**
A: Ja. Bekijk [Je regio wijzigen](/nl/regions/switching-regions) voor stapsgewijze instructies over gratis accounts, betaalde abonnementen en het migreren van aangepaste domeinen.

**V: Heeft mijn regiokeuze invloed op de beveiliging van mijn geheimen?**
A: Nee, alle regio's bieden hetzelfde hoge beveiligingsniveau. De keuze heeft vooral invloed op waar je gegevens zich bevinden en de mogelijke latency.

**V: Zijn er prijsverschillen tussen regio's?**
A: De prijzen zijn per regio specifiek — je betaalt in je lokale valuta en Stripe verzorgt automatisch de valutaomrekening. Identity Plus-abonnementen omvatten onbeperkte aangepaste domeinen in alle datacenters onder één abonnement. Bekijk onze [prijspagina](https://onetimesecret.com/pricing) voor de meest actuele informatie.

## Hulp nodig?

Als je niet zeker weet welke regio je moet kiezen of als je vragen hebt, aarzel dan niet om contact op te nemen met ons supportteam. We helpen je graag de beste beslissing te nemen voor jouw specifieke situatie.

- E-mail: support@onetimesecret.com
- Feedbackformulier: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Denk eraan: door de juiste regio te kiezen, krijg je de beste prestaties en voldoe je aan de relevante gegevensregelgeving bij het gebruik van Onetime Secret.
