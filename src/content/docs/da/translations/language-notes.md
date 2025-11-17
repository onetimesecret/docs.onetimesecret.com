---
title: Dansk oversættelse
description: Kritiske regler for dansk oversættelse
---

# Dansk

## Grundlæggende terminologi

### Secret → Besked
- **Valg:** besked (ikke "hemmelighed")
- **Begrundelse:** "Hemmelighed" (secrets) har konnotationer af personlige eller skjulte oplysninger i daglig dansk, hvilket ikke passer med den tilsigtede betydning
- **Kontekst:** Funktionel, teknisk betydning fremfor personlig/følelsesmæssig
- **Eksempler:**
  - ✓ "Du har 3 nye beskeder" (neutral, teknisk)
  - ✗ "Du har 3 nye hemmeligheder" (for personligt/intimt)

### Password vs. Passphrase
**KRITISK FORSKEL:** Disse termer må aldrig forveksles.

- **Password (adgangskode):** Kontoautentifikation
  - Bruges til: At logge ind på Onetime Secret-kontoen
  - Eksempler: "Indtast din adgangskode", "Glemt adgangskode?"

- **Passphrase (adgangssætning):** Hemmelighedsbeskyttelse
  - Bruges til: At beskytte individuelle hemmeligheder med et ekstra sikkerhedslag
  - Eksempler: "Beskyt med en adgangssætning", "Indtast adgangssætningen for at se denne hemmelighed"

- **Hvorfor det er vigtigt:** Brugerne skal klart forstå forskellen mellem deres kontooplysninger og valgfri hemmelighedsbeskyttelse

### Burn → Destruer
- **Valg:** destruere / slette permanent
- **Betydning:** Slet permanent før visning
- **Eksempler:**
  - ✓ "Destruer denne besked" (knaphandling)
  - ✓ "Besked destrueret" (tidligere status)

## Stemme og tone

### Aktiv vs. passiv stemme

**Handlinger (knapper, links):**
Brug aktiv, imperativ stemme til brugerhandlinger:
- ✓ "Opret besked" (imperativ)
- ✓ "Kopier til udklipsholder" (imperativ)
- ✓ "Slet konto" (imperativ)
- ✗ "Opretter besked" (nutid - brug til status i stedet)

**Status (notifikationer, beskrivelser):**
Brug passiv eller deklarativ stemme til informativ tekst:
- ✓ "Besked oprettet" (passiv)
- ✓ "Kopieret til udklipsholder" (passiv)
- ✓ "Konto slettet" (passiv)
- ✗ "Opret besked" (imperativ - forvirrende i statuskontekst)

### Formalitetsniveau
- **Valg:** Informel "du"-form
- **Begrundelse:** Skaber en tilgængelig, moderne tone passende for tech-produkter
- **Dansk konvention:** Moderne software bruger typisk "du" fremfor formelt "De"

**Eksempler:**
- ✓ "Indtast din adgangskode" (du-form)
- ✓ "Opret din første besked" (du-form)

## Skrivningsstil

### Klarhed og kortfattethed
- Brug klart, direkte sprog der respekterer brugernes tid
- Undgå jargon medmindre teknisk nødvendigt
- Skriv for brugere med varierende tekniske baggrunde

**Eksempler:**
- ✓ "Kopier link" (kortfattet, klart)
- ✗ "Klik her for at kopiere linket til din udklipsholder!" (omstændigt)

### Sammensatte ord
- **Engelske låneord:** Brug bindestreg ved sammensætning
- **Native sammensætninger:** Sammenskrivning uden bindestreg

**Eksempler:**
- ✓ "besked-apps" (bindestreg med engelsk låneord)
- ✗ "besked apps" (separate ord - forkert)
- ✓ "API-nøgle" (bindestreg med akronym)
- ✗ "API nøgle" (separate ord - forkert)

## Kritiske oversættelsesregler

| Regel | Korrekt | Forkert | Eksempel |
|-------|---------|---------|----------|
| "Secret" → "Besked" (ikke "Hemmelighed") | besked | hemmelighed | ✓ Du har 3 nye beskeder; ✗ Du har 3 nye hemmeligheder |
| Password vs. Passphrase | adgangskode (login), adgangssætning (secret) | Blandet brug | ✓ Indtast din adgangskode (login); ✗ Indtast din adgangssætning (login) |
| Knapper: Imperativ | Opret, Del, Gem | Substantivformer | ✓ Opret besked (knap); ✗ Oprettelse af besked (knap) |
| Status: Passiv form | Oprettet, Gemt | Imperativ i status | ✓ Besked oprettet (status); ✗ Opret besked (status) |
| Sammensatte ord med engelske låneord | besked-apps, API-nøgle | besked apps, API nøgle | ✓ besked-apps (med bindestreg); ✗ besked apps (separate ord) |

## Tal og formater

### Datoer
- Format: DD-MM-ÅÅÅÅ eller DD/MM-ÅÅÅÅ
- Eksempel: "17-11-2025" eller "17/11-2025"

### Tid
- 24-timers format er standard i Danmark
- Eksempel: "14:30" (ikke "2:30 PM")

### Tal
- Decimalseparator: komma (,)
- Tusindtalsseparator: punkt (.) eller mellemrum
- Eksempel: "1.234,56" eller "1 234,56"

### Valuta
- Symbol: kr. (kroner)
- Position: Efter beløb med mellemrum
- Eksempel: "199,95 kr."

## Tekniske termer

### Behold på engelsk
- API
- URL
- DNS
- SSL/TLS
- HTTP/HTTPS
- JSON
- YAML
- OAuth

### Oversæt til dansk
- Dashboard → Kontrolpanel
- Settings → Indstillinger
- Clipboard → Udklipsholder
- Account → Konto
- Password → Adgangskode
- Secret → Besked

## Almindelige fejl at undgå

1. **Forveksling af adgangskode og adgangssætning**
   - ✗ "Indtast adgangssætningen for at logge ind" (burde være "adgangskode")
   - ✗ "Beskyt med en adgangskode" når det gælder beskeder (burde være "adgangssætning")

2. **Blanding af stemmer i UI**
   - ✗ Brug af "Opretter..." på en knap (burde være "Opret")
   - ✗ Brug af "Slet" i en statusmeddelelse (burde være "Slettet")

3. **Brug af "hemmelighed" i stedet for "besked"**
   - ✗ "Opret en ny hemmelighed" (for personligt)
   - ✓ "Opret en ny besked" (funktionelt, klart)

4. **Inkonsistent terminologi**
   - Vælg én term og hold dig til den
   - Eksempel: "destruere" vs "slette" - vælg én

## Tilgængelighedsovervejelser

### Skærmlæsere
- Brug beskrivende etiketter til navigation
- Eksempel: "Hovednavigation" ikke kun "Hoved"

### Klarhed
- Skriv i klart sprog
- Definer tekniske termer ved første brug
- Brug konsistent terminologi

## Kulturelle og sproglige noter

### Danske sprogkonventioner
- Moderne dansk bruger "du" i tech-kontekster
- Sammensatte ord er almindelige i dansk
- Engelske låneord er accepterede i tech-terminologi
- Brug bindestreg ved sammensætning med engelske ord

### Registervalg
- Professionelt men tilgængeligt
- Undgå overdreven formalitet
- Vær direkte og hjælpsom

## Reference

For omfattende indsigter på tværs af alle sprog, se:
- [Sprogspecifikke oversættelsesindsigter](/docs/localization/reference/language-specific-notes.md)
