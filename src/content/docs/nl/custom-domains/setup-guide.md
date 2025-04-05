---
title: Installatiegids
description: Deze handleiding leidt u door het proces van het instellen van een aangepast domein voor uw Onetime Secret account, inclusief de verschillen tussen subdomeinen en apex domeinen, en het kiezen van uw gewenste datacenter regio.
---

# Handleiding voor aangepaste domeininstellingen

## Vereisten

- Een actief Onetime Secret account met aangepaste domeinfunctie ingeschakeld
- Een domein waarvan u de eigenaar bent en waarvoor u DNS-instellingen kunt beheren

## Domein Types begrijpen

Voordat je je aangepaste domein instelt, is het belangrijk om het verschil tussen subdomeinen en apex-domeinen te begrijpen:

1. **Subdomein**: Een onderverdeling van uw hoofddomein (bijv. secrets.uwdomein.com)
2. **Apex-domein**: Het hoofddomein zelf (bijv. uwdomein.nl)

## Kies uw regio

Onetime Secret biedt twee datacenterregio's: EU en VS. Bij het instellen van je eigen domein, moet je kiezen welke regio je verkiest voor het opslaan van je gegevens. Deze keuze is om verschillende redenen belangrijk:

- **Voor particulieren**: U kunt kiezen op basis van uw persoonlijke voorkeur, zoals nabijheid voor mogelijk snellere toegang of zorgen over de soevereiniteit van persoonlijke gegevens.
- Voor bedrijven**: Uw keuze kan afhangen van uw verplichtingen met betrekking tot datalocatie, zoals naleving van GDPR-, staats- of provinciale richtlijnen. Zorg ervoor dat u de regio selecteert die het beste overeenkomt met uw wettelijke vereisten.

Houd bij het maken van deze keuze rekening met uw specifieke wensen en eisen. Voor meer gedetailleerde informatie over onze datacenterregio's en hoe u de juiste regio voor uw behoeften kunt kiezen, raadpleegt u onze gids [Datacenterregio's](/docs/regio's).

## Stap 1: Toegang tot Domein-dashboard

1. Log in op uw Onetime Secret account
2. Navigeer naar Dashboard > Aangepaste domeinen
3. Klik op "Domein toevoegen

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Weergave aangepaste domeinen" width="400" />

## Stap 2: Voer uw domein in

1. Voer in de aangepaste domeininstellingen het gewenste domein in (bijv. secrets.yourdomain.com of yourdomain.com)
2. Klik op "Domein toevoegen" of een vergelijkbare knop om verder te gaan

## Stap 3: DNS-instellingen configureren

Om uw domein te verbinden, moet u uw DNS-instellingen bijwerken. Het proces verschilt enigszins, afhankelijk van of u een subdomein of een apex-domein gebruikt en welke datacenterregio u kiest.

### Voor subdomeinen (aanbevolen)

1. Ga naar het DNS-beheerpaneel van uw domein (via uw domeinregistrar of DNS-provider)
2. Maak een CNAME-record aan met de volgende gegevens:
   - Host: Uw gekozen subdomein (bijv. geheimen)
   - Wijst naar / Waarde:
     - Voor EU-regio: identity.eu.onetime.co
     - Voor VS-regio: identity.us.onetime.co
3. Verwijder alle bestaande A, AAAA of CNAME records voor hetzelfde subdomein.

### Voor Apex-domeinen

1. Ga naar het DNS-beheerpaneel van uw domein
2. Maak of wijzig een A-record met de volgende gegevens:
   - Host: @ (of laat leeg, afhankelijk van uw DNS-provider)
   - Wijst naar / Waarde:
     - Voor EU-regio: 109.105.217.207
     - Voor VS-regio: 66.51.126.41

Belangrijk: zorg ervoor dat er geen conflicterende records zijn voor het domein dat je gebruikt.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Aangepaste domeininstellingen" width="400" />

### Meer info

#### Waarom CNAME voor subdomeinen?

We raden het gebruik van CNAME-records voor subdomeinen aan omdat:

1. Ze zijn flexibeler en stellen ons in staat om onze IP-serveradressen te wijzigen zonder dat jij je DNS-instellingen hoeft bij te werken.
2. Ze passen zich automatisch aan aan alle wijzigingen die we in onze infrastructuur aanbrengen.

#### Waarom A-records voor Apex-domeinen?

Apex-domeinen kunnen geen CNAME-records gebruiken vanwege DNS-standaarden. Daarom moeten we A-records gebruiken, die enkele beperkingen hebben:

1. Als we ons IP-adres veranderen (wat zelden voorkomt), moet je je DNS-instellingen handmatig bijwerken.
2. Ze passen zich niet automatisch aan aan veranderingen in onze infrastructuur.

## Stap 4: Domein verifiëren en wachten op SSL

1. Ga na het bijwerken van de DNS-instellingen terug naar de pagina Onetime Secret aangepast domein
2. Het systeem zal automatisch proberen uw domein te verifiëren
3. SSL-certificaat zal beginnen zodra de verificatie succesvol is
4. Dit proces kan enkele minuten duren

## Stap 5: Setup bevestigen

Zodra de installatie is voltooid, zou je de volgende informatie moeten zien:

- Domeinstatus: Actief met SSL
- Doeladres: identity.eu.onetime.co of identity.us.onetime.co (afhankelijk van de door u gekozen regio)
- SSL Status: Actief
- SSL Vernieuwingsdatum: (wordt weergegeven, meestal ongeveer een jaar na installatie)

## Problemen oplossen

- Als verificatie mislukt, controleer dan je DNS-instellingen dubbel
- Zorg ervoor dat u alle conflicterende records hebt verwijderd
- DNS-propagatie kan tot 24 uur duren, maar is meestal veel sneller

## Uw aangepaste domein gebruiken

Zodra ze actief zijn, zullen je geheime links je aangepaste domein gebruiken. Bijvoorbeeld:
`https://secrets-example.onetime.dev/secret/abc123`

## We've Got You Covered

Wij zorgen voor de rest van de technische details zodat jij dat niet hoeft te doen.

- Wij bewaken continu de status van uw domein
- SSL-certificaten worden automatisch verlengd zonder dat u daar iets voor hoeft te doen

Voor degenen die graag op de hoogte blijven, kun je eenvoudig de gezondheid van je domein controleren:

- Kijk gewoon naar de "Last Monitored" tijdstempel in je dashboard om de lopende connectiviteit te bevestigen.

## Vragen of ondersteuning nodig?

We zijn er om je te helpen. Als je vragen hebt of hulp nodig hebt:

- Stuur een e-mail naar support@onetimesecret.com
- Gebruik ons feedbackformulier op https://onetimesecret.com/feedback

Ons team doet er alles aan om u de best mogelijke ondersteuning te bieden voor het instellen en gebruiken van uw aangepaste domein, inclusief begeleiding bij het kiezen van de juiste datacenterregio voor uw behoeften.
