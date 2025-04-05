---
title: Datacenter regio's
description: Lees meer over de datacenterregio's van Onetime Secret en hoe u de juiste regio voor uw behoeften kunt kiezen.
---


Onetime Secret biedt twee datacenterregio's: Europese Unie (EU) en Verenigde Staten (VS). Deze gids helpt u het belang van regioselectie te begrijpen en hoe u de juiste regio kiest voor uw behoeften.

## Waarom regioselectie belangrijk is

Het kiezen van de juiste datacenterregio is om verschillende redenen cruciaal:

1. **Gegevenssoevereiniteit**: Verschillende regio's hebben verschillende wetten en regels voor gegevensbescherming.
2. **Latency**: Door een regio te kiezen die dichter bij uw primaire gebruikers ligt, kunt u de latentie verlagen.
3. **Conformiteit**: Sommige organisaties hebben specifieke vereisten over waar hun gegevens kunnen worden opgeslagen.

## Beschikbare regio's

### Europese Unie (EU)

- **Locatie**: Binnen de Europese Unie (Neurenberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Keigenschappen**:
  - Voldoet aan GDPR en andere EU-voorschriften voor gegevensbescherming
  - Ideaal voor Europese gebruikers of gebruikers die voornamelijk Europese klanten bedienen

### Canada (CA)

- **Locatie**: In Canada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Belangrijkste kenmerken**:
  - Voldoet aan PIPEDA en Canadese wetgeving voor gegevensbescherming
  - Geschikt voor Canadese gebruikers of degenen die voornamelijk Canadese klanten bedienen

### Aotearoa Nieuw-Zeeland (NZ)

- **Locatie**: In Nieuw-Zeeland (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Belangrijkste kenmerken**:
  - Voldoet aan de Nieuw-Zeelandse Privacy Act en lokale regelgeving
  - Geschikt voor Nieuw-Zeelandse gebruikers of degenen die klanten in Oceanië bedienen

### Verenigde Staten (US)

- **Locatie**: Binnen de Verenigde Staten (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Belangrijkste kenmerken**:
  - Voldoet aan de Amerikaanse wetgeving inzake gegevensbescherming
  - Geschikt voor gebruikers die in de VS zijn gevestigd of voornamelijk Amerikaanse klanten bedienen

## Deel-niets-architectuur

Onetime Secret maakt gebruik van een 'share-nothing' architectuur, waardoor volledige data-isolatie tussen regio's wordt gegarandeerd:

- **Separate Accounts**: Het aanmaken van een account op `us.onetimesecret.com` is volledig gescheiden van een account op `eu.onetimesecret.com`, zelfs als u hetzelfde e-mailadres gebruikt.
- **Geen centrumoverschrijdende bewerkingen**: U kunt geen bewerkingen uitvoeren (zoals het verbranden van een geheim) tussen datacenters. Elk centrum onderhoudt zijn eigen set geheimen en gebruikersgegevens.
- **Consistente facturering voor betaalde gebruikers**: Voor betaalde accounts worden geen gebruikersgegevens tussen centra gedeeld, maar wordt uw abonnementsstatus in alle regio's herkend via onze betalingsprovider Stripe.

## Hoe kies ik mijn regio

Neem de volgende factoren in overweging bij het kiezen van de regio voor uw datacenter:

### Voor anonieme gebruikers

- Verzoeken naar onetimesecret.com kunnen worden doorgestuurd naar elk actief datacenter.
- De locatie van je geheim is altijd duidelijk via de gegenereerde link (bijv. `us.onetimesecret.com/secret/abcd1234`).
- Je kunt een specifieke datalocatie kiezen door direct naar [us.onetimesecret.com](https://us.onetimesecret.com/) of [eu.onetimesecret.com](https://eu.onetimesecret.com/) te navigeren.

### Voor geauthenticeerde gebruikers

- Bij het aanmaken van een nieuwe account moet je een locatie voor het datacenter kiezen.
- Je moet terugkeren naar dezelfde locatie om in te loggen.
- Bestaande accounts en geheimen blijven in het EU-datacenter (Neurenberg).

### Voor alle gebruikers

- Geheimen die zijn aangemaakt zonder subdomeinjurisdictie (bijv. onetimesecret.com/secret/efgh5678) blijven standaard in ons EU-datacenter.
- Alle gebruikers, zowel betaalde als gratis, kunnen hun voorkeursdatacenter kiezen wanneer ze een account aanmaken.

### Extra overwegingen

1. **Voor individuen**:
   - Persoonlijke voorkeur
   - Nabijheid van uw locatie voor mogelijk snellere toegang
   - Bezorgdheid over de soevereiniteit van persoonlijke gegevens

2. **Voor bedrijven**:
   - Wettelijke en regelgevende vereisten (bijv. GDPR voor EU-klanten)
   - Locatie van uw primaire klantenbestand
   - Branchespecifieke nalevingsbehoeften

3. **Technische overwegingen**:
   - Latency-vereisten voor uw toepassing
   - Integratie met andere services of systemen

## Prijzen en plannen

Onze toewijding aan datalokalisatie strekt zich uit tot ons prijsmodel:

- De kosten zijn gebaseerd op waar u vandaan betaalt, niet op waar uw account is aangemaakt.
- Identity Plus-plannen omvatten onbeperkte aangepaste domeinen in alle datacenters onder één abonnement.

## Toekomstplannen

We werken voortdurend aan de uitbreiding van onze datacenteropties. Toekomstige plannen omvatten extra datacenterlocaties in:

- Brazilië
- Spanje
- VERENIGD KONINKRIJK

Deze uitbreidingen bieden nog meer opties voor datalokalisatie, waardoor de prestaties en compliancemogelijkheden voor gebruikers in verschillende regio's worden verbeterd.

## Uw regio instellen

Bij het instellen van je Onetime Secret account of het configureren van een aangepast domein, heb je de mogelijkheid om de regio van je voorkeur te kiezen. Hier lees je hoe:

1. Voor nieuwe accounts: Selecteer je voorkeursregio tijdens het aanmeldingsproces.
2. Voor bestaande accounts: Neem contact op met ons ondersteuningsteam om de opties voor regiomigratie te bespreken.
3. Voor aangepaste domeinen: Geef de door u gekozen regio op bij het configureren van uw DNS-instellingen (raadpleeg onze [Handleiding voor aangepaste domeininstellingen](/docs/custom-domains/setup-guide) voor gedetailleerde instructies).

## Veelgestelde vragen

**V: Kan ik mijn regio wijzigen na het instellen van mijn account?**

A: Ja, u kunt uw regio wijzigen door een nieuw account aan te maken met hetzelfde e-mailadres en naar het accountscherm te navigeren. Als u een actief abonnement heeft, wordt uw account automatisch bijgewerkt (mogelijk moet u de pagina vernieuwen).

Let op:
- Bestaande gegevens worden niet overgedragen tussen regio's
- Eerder gemaakte geheime links blijven werken totdat ze worden bekeken of verlopen
- Voor links met aangepaste domeinen moet u:
  1. Het domein opnieuw toevoegen aan uw nieuwe regionale account
  2. De bijbehorende DNS-records bijwerken
  3. Een uniek subdomein gebruiken bij het opnieuw toevoegen van het domein om conflicten met bestaande links te voorkomen
  4. Later kunt u uw voorkeurdomein toevoegen (indien nodig) om nieuwe links met uw voorkeurdomein te versturen

**V: Heeft de keuze van mijn regio invloed op de veiligheid van mijn geheimen?
A: Nee, beide regio's bieden hetzelfde hoge beveiligingsniveau. De keuze heeft vooral invloed op het verblijf van gegevens en de potentiële latentie.

**V: Zijn er prijsverschillen tussen regio's?
A: Momenteel zijn onze prijzen consistent in beide regio's. Bekijk onze [prijspagina](https://onetimesecret.com/pricing) voor de meest actuele informatie.

## Hulp nodig?

Als je niet zeker weet welke regio je moet kiezen of als je vragen hebt, aarzel dan niet om contact op te nemen met ons supportteam. We zijn er om je te helpen de beste beslissing te nemen voor jouw specifieke behoeften.

- E-mail: support@onetimesecret.com
- Feedbackformulier: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Vergeet niet dat het kiezen van de juiste regio ervoor zorgt dat je de beste prestaties krijgt en voldoet aan alle relevante gegevensvoorschriften bij het gebruik van Onetime Secret.
