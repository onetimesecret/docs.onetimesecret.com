---
title: Datacenterregioner
description: Lær om Onetime Secrets datacenterregioner, og hvordan du vælger den rigtige til dine behov.
---

Onetime Secret tilbyder fem datacenterregioner: Canada (CA), Den Europæiske Union (EU), Aotearoa New Zealand (NZ), Storbritannien (UK) og USA (US). Denne vejledning hjælper dig med at forstå vigtigheden af regionsvalg, og hvordan du vælger den rigtige til dine behov.

## Hvorfor regionsvalg er vigtigt

Valg af den rigtige datacenterregion er afgørende af flere årsager:

1. **Datasuverænitet**: Forskellige regioner har forskellige databeskyttelseslove og -regulativer.
2. **Latens**: Valg af en region tættere på din primære brugerbase kan reducere latens.
3. **Overholdelse**: Nogle organisationer har specifikke krav til, hvor deres data kan gemmes.

## Tilgængelige regioner

| Region | Placering | URL |
|--------|----------|-----|
| [Canada (CA)](/da/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Den Europæiske Union (EU)](/da/regions/european-union) | Nürnberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa New Zealand (NZ)](/da/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Storbritannien (UK)](/da/regions/united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [USA (US)](/da/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Hver regionsside indeholder oplysninger om det lokale regulatoriske miljø, og hvornår den pågældende region kan være relevant for dit brug.

## Del-ingenting-arkitektur (share-nothing architecture)

Onetime Secret anvender en del-ingenting-arkitektur (share-nothing architecture), der sikrer fuldstændig dataisolation mellem regioner:

- **Separate konti**: Oprettelse af en konto på et hvilket som helst regionalt domæne er helt adskilt fra konti på andre domæner, selvom du bruger den samme e-mailadresse.
- **Ingen operationer på tværs af centre**: Du kan ikke udføre operationer (som at ødelægge en besked) på tværs af datacentre. Hvert center vedligeholder sit eget sæt af beskeder og brugerdata.
- **Konsistent fakturering for betalende brugere**: For betalte konti deles ingen brugerdata mellem centre, men din abonnementsstatus genkendes på tværs af regioner gennem vores betalingsudbyder, Stripe.

## Sådan vælger du din region

Overvej følgende faktorer, når du vælger din datacenterregion:

### Uden en konto

- Anmodninger til onetimesecret.com kan blive dirigeret til et hvilket som helst aktivt datacenter.
- Du kan vælge en specifik region ved at navigere direkte til et regionalt domæne (f.eks. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Det genererede link identificerer altid regionen (f.eks. `us.onetimesecret.com/secret/abcd1234`).

### Med en konto

- Når du opretter en konto, vælger du en datacenterregion. Alle planer — gratis og betalte — har adgang til alle regioner.
- Du logger ind på den samme regionale domæne, hvor du tilmeldte dig (f.eks. hvis du registrerede dig på `eu.onetimesecret.com`, er det der, du logger ind).

### Yderligere overvejelser

1. **For enkeltpersoner**:
   - Personlig præference
   - Nærhed til din placering for potentielt hurtigere adgang
   - Personlige datasuverænitetsproblemer

2. **For virksomheder**:
   - Juridiske og regulatoriske krav
   - Placering af din primære kundebase
   - Branchespecifikke overholdelsesbehov

3. **Tekniske overvejelser**:
   - Latenskrav til din applikation
   - Integration med andre tjenester eller systemer

## Fremtidige planer

Vi arbejder løbende på at udvide vores datacentermuligheder. Fremtidige planer omfatter yderligere datacenterlokationer i:

- Australien
- Brasilien
- Japan
- Mexico
- Norge
- Sydkorea

Disse udvidelser vil give endnu flere muligheder for datalokation, hvilket forbedrer ydeevne og overholdelsesfunktioner for brugere i forskellige regioner.


## Ofte stillede spørgsmål

**Sp: Kan jeg ændre min region, efter jeg har oprettet min konto?**
Sv: Ja. Se [Skift af region](/da/regions/switching-regions) for en trin-for-trin-vejledning, der dækker gratis konti, betalte abonnementer og migrering af brugerdefinerede domæner.

**Sp: Påvirker mit valg af region sikkerheden af mine beskeder?**
Sv: Nej, alle regioner tilbyder samme høje sikkerhedsniveau. Valget påvirker primært dataophold og potentiel latens.

**Sp: Er der prisforskelle mellem regioner?**
Sv: Priserne er specifikke for hver region — du kan betale i din lokale valuta, og Stripe håndterer valutakonvertering automatisk. Identity Plus-planer inkluderer ubegrænsede brugerdefinerede domæner på tværs af alle datacentre under et enkelt abonnement. Tjek vores [prisside](https://onetimesecret.com/pricing) for den mest opdaterede information.

## Brug for hjælp?

Hvis du er usikker på, hvilken region du skal vælge, eller har spørgsmål, så tøv ikke med at kontakte vores supportteam. Vi er her for at hjælpe dig med at træffe den bedste beslutning for dine specifikke behov.

- E-mail: support@onetimesecret.com
- Feedbackformular: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Husk, at valg af den rigtige region sikrer, at du får den bedste ydeevne og overholder alle relevante datareguleringer, mens du bruger Onetime Secret.
