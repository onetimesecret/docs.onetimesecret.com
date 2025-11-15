---
title: Datacentre regioner
description: Lær om Onetime Secrets datacenterregioner, og hvordan du vælger den rigtige til dine behov.
---

Onetime Secret tilbyder fire datacenterregioner: Den Europæiske Union (EU), USA (US), Canada (CA) og Aotearoa New Zealand (NZ). Denne vejledning hjælper dig med at forstå vigtigheden af regionsvalg, og hvordan du vælger den rigtige til dine behov.

## Hvorfor regionsvalg er vigtigt

Valg af den rigtige datacenterregion er afgørende af flere årsager:

1. **Datasuverænitet**: Forskellige regioner har forskellige databeskyttelseslove og -regulativer.
2. **Latens**: Valg af en region tættere på din primære brugerbase kan reducere latens.
3. **Overholdelse**: Nogle organisationer har specifikke krav til, hvor deres data kan gemmes.

## Tilgængelige regioner

### Den Europæiske Union (EU)

- **Placering**: Den Europæiske Union (Nürnberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Nøglefunktioner**:
  - Overholder GDPR og andre EU-databeskyttelsesregler
  - Ideel til europæiske brugere eller dem, der primært betjener europæiske kunder

### Canada (CA)

- **Placering**: Canada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Nøglefunktioner**:
  - Overholder PIPEDA og canadiske databeskyttelseslove
  - Velegnet til canadiske brugere eller dem, der primært betjener canadiske kunder

### Aotearoa New Zealand (NZ)

- **Placering**: Aotearoa New Zealand (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Nøglefunktioner**:
  - Overholder New Zealand Privacy Act og lokale regulativer
  - Velegnet til New Zealand-brugere eller dem, der betjener Oceanien-kunder

### USA (US)

- **Placering**: USA (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Nøglefunktioner**:
  - Overholder amerikanske databeskyttelseslove
  - Velegnet til USA-baserede brugere eller dem, der primært betjener amerikanske kunder

## Del-ingenting-arkitektur (share-nothing architecture)

Onetime Secret anvender en del-ingenting-arkitektur (share-nothing architecture), der sikrer fuldstændig dataisolation mellem regioner:

- **Separate konti**: Oprettelse af en konto på et hvilket som helst regionalt domæne er helt adskilt fra konti på andre domæner, selvom du bruger den samme e-mailadresse.
- **Ingen tværgående operationer**: Du kan ikke udføre operationer (som at ødelægge en besked) på tværs af datacentre. Hvert center vedligeholder sit eget sæt af beskeder og brugerdata.
- **Konsistent fakturering for betalende brugere**: For betalte konti deles ingen brugerdata mellem centre, men din abonnementsstatus genkendes på tværs af regioner gennem vores betalingsudbyder, Stripe.

## Sådan vælger du din region

Overvej følgende faktorer, når du vælger din datacenterregion:

### For anonyme brugere

- Anmodninger til onetimesecret.com kan blive dirigeret til et hvilket som helst aktivt datacenter.
- Placeringen af din besked er altid klar fra det genererede link (f.eks. `us.onetimesecret.com/secret/abcd1234`).
- Du kan vælge en specifik datalokation ved at navigere direkte til et hvilket som helst regionalt domæne (f.eks. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### For godkendte brugere

- Når du opretter en ny konto, skal du vælge en datacenterlokation.
- Du skal vende tilbage til samme lokation for at logge ind.
- Eksisterende konti og beskeder forbliver i deres oprindelige datacenter.

### For alle brugere

- Beskeder oprettet uden et underdomænejurisdiktion (f.eks. onetimesecret.com/secret/efgh5678) vil fortsætte med at være standard til vores EU-datacenter.
- Alle brugere, både betalte og gratis, kan vælge deres foretrukne datacenter, når de opretter en konto.

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

## Priser og planer

Vores forpligtelse til datalokation strækker sig til vores prismodel:

- Gebyrer er baseret på, hvor du betaler fra, ikke hvor din konto er oprettet.
- Identity Plus-planer inkluderer ubegrænsede brugerdefinerede domæner på tværs af alle datacentre under et enkelt abonnement.

## Fremtidige planer

Vi arbejder løbende på at udvide vores datacentermuligheder. Fremtidige planer omfatter yderligere datacenterlokationer i:

- Brasilien
- Spanien
- UK

Disse udvidelser vil give endnu flere muligheder for datalokation, hvilket forbedrer ydeevne og overholdelsesfunktioner for brugere i forskellige regioner.

## Opsætning af din region

Når du opsætter din Onetime Secret-konto eller konfigurerer et brugerdefineret domæne, har du mulighed for at vælge din foretrukne region. Sådan gør du:

1. For nye konti: Vælg din foretrukne region under tilmeldingsprocessen.
2. For eksisterende konti: Kontakt vores supportteam for at diskutere muligheder for regionsmigrering.
3. For brugerdefinerede domæner: Angiv din valgte region, når du konfigurerer dine DNS-indstillinger (se vores [Brugerdefineret domæneopsætningsvejledning](/docs/custom-domains/setup-guide) for detaljerede instruktioner).

## Ofte stillede spørgsmål

**Sp: Kan jeg ændre min region efter opsætning af min konto?**
Sv: Ja, du kan ændre din region ved at oprette en ny konto med den samme e-mailadresse og navigere til kontoskærmen. Hvis du har et aktivt abonnement, vil din konto opdatere automatisk (du skal muligvis opdatere siden).

Bemærk venligst:
- Eksisterende data overføres ikke mellem regioner
- Eventuelle hemmelige links, du har oprettet, vil fortsætte med at fungere, indtil de ses eller udløber
- For links med brugerdefinerede domæner skal du:
  1. Tilføje domænet til din nye regionskonto igen
  2. Opdatere de tilknyttede DNS-poster
  3. Bruge et unikt underdomæne, når du tilføjer domænet igen for at undgå konflikter med eksisterende links
  4. Senere kan du tilføje dit foretrukne domæne (hvis nødvendigt), så du kan begynde at sende nye links med dit foretrukne domæne

**Sp: Påvirker mit valg af region sikkerheden af mine beskeder?**
Sv: Nej, alle regioner tilbyder samme høje sikkerhedsniveau. Valget påvirker primært dataophold og potentiel latens.

**Sp: Er der prisforskelle mellem regioner?**
Sv: I øjeblikket er vores priser konsistente på tværs af alle regioner. Tjek vores [prisside](https://onetimesecret.com/pricing) for den mest opdaterede information.

## Brug for hjælp?

Hvis du er usikker på, hvilken region du skal vælge, eller har spørgsmål, så tøv ikke med at kontakte vores supportteam. Vi er her for at hjælpe dig med at træffe den bedste beslutning for dine specifikke behov.

- E-mail: support@onetimesecret.com
- Feedbackformular: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Husk, at valg af den rigtige region sikrer, at du får den bedste ydeevne og overholder alle relevante datareguleringer, mens du bruger Onetime Secret.
