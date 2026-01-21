---
title: Dansk oversættelse
description: Kritiske regler og retningslinjer for dansk oversættelse af Onetime Secret
---

# Sprognoter for dansk

Dette dokument indeholder sprog-specifikke oversættelsesregler og retningslinjer for den danske version af Onetime Secret.

## Kritiske oversættelsesregler

| Regel | Korrekt | Forkert | Eksempel |
|-------|---------|---------|----------|
| "Secret" → "Besked" (ikke "Hemmelighed") | besked | hemmelighed | ✓ Du har 3 nye beskeder; ✗ Du har 3 nye hemmeligheder |
| Password vs. Passphrase | adgangskode (login), adgangssætning (secret) | Blandet brug | ✓ Indtast din adgangskode (login); ✗ Indtast din adgangssætning (login) |
| Knapper: Imperativ | Opret, Del, Gem | Substantivformer | ✓ Opret besked (knap); ✗ Oprettelse af besked (knap) |
| Status: Passiv form | Oprettet, Gemt | Imperativ i status | ✓ Besked oprettet (status); ✗ Opret besked (status) |
| Sammensatte ord med engelske låneord | besked-apps, API-nøgle | besked apps, API nøgle | ✓ besked-apps (bindestreg); ✗ besked apps (adskilte ord) |

---

## Oversættelsesretningslinjer

### 1. Konsistens

- Brug samme oversættelse for et begreb gennem hele applikationen
- Overhold standardiseret terminologi fra ordlisten
- Vigtige distinktioner:
  - `adgangskode` for konto-passwords
  - `adgangssætning` for beskedbeskyttelse
  - `besked` som kernekoncept (ikke "hemmelighed")

### 2. Kontekstbevidsthed

- Overvej hvordan begrebet bruges i applikationen
- Tag hensyn til omgivende UI-elementer og brugerflow
- Sørg for at oversættelser giver mening i deres specifikke kontekst

### 3. Kulturel tilpasning

- Tilpas termer til lokale konventioner når det er nødvendigt
- Brug standarddansk der fungerer på tværs af regioner
- Brug standard tekniske termer velkendte for dansktalende brugere

### 4. Teknisk nøjagtighed

- Sikkerhedsrelaterede termer skal oversættes nøjagtigt
- Prioritér præcision frem for lokalisering for teknisk terminologi
- Brug etableret dansk teknisk vokabular

### 5. Stemme og tone

#### Imperativ (for handlinger)
Brug imperativ for knapper, links og brugerhandlinger:
- `Opret besked` (Create secret)
- `Kopier til udklipsholder` (Copy to clipboard)
- `Opret konto` (Create account)
- `Gem` (Save)
- `Del` (Share)

#### Passiv/deklarativ (for information)
Brug passiv eller datidsformer for informationstekst, statusmeddelelser og beskrivelser:
- `Besked oprettet` (Secret created - status)
- `Din sikre besked vises nedenfor.` (Your secure message is shown below.)
- `Beskeden blev ødelagt manuelt...` (The secret was manually destroyed...)
- `Gemt` (Saved - statusmeddelelse)

### 6. Direkte tiltale

- Brug uformel tiltale konsekvent når du henvender dig til brugere
- Eksempler:
  - `Indtast din adgangskode` (Enter your password)
  - `Din sikre besked` (Your secure message)
- Dansk flyder naturligt med direkte tiltale i de fleste kontekster

### 7. Klarhed og naturlig sprogbrug

- Prioritér naturlige danske udtryk frem for ordret oversættelse
- Brug standardfraser velkendte for dansktalende
- Undgå ordret oversættelser der lyder akavet på dansk

### 8. Fuldstændighed

- Sørg for at alle brugervendte strenge er oversat
- Undgå at efterlade engelsk tekst i grænsefladen
- Oversæt hjælpetekst, beskrivelser og metadata

### 9. Sammensatte ord med engelske låneord

Når du danner sammensatte ord med engelske låneord, brug bindestreger:
- ✓ `besked-apps` (med bindestreg)
- ✗ `besked apps` (adskilte ord)
- ✓ `API-nøgle` (med bindestreg)
- ✗ `API nøgle` (adskilte ord)

---

## Almindelige oversættelsesmønstre

### Brugerinstruktioner
Brug imperativformer:
- `Indtast din adgangskode` (Enter your password)
- `Kopier til udklipsholder` (Copy to clipboard)
- `Indtast adgangssætningen her` (Enter the passphrase here)

### Statusbeskrivelser
Brug passiv eller datidsformer:
- `Kopieret til udklipsholder` (Copied to clipboard)
- `Besked oprettet` (Secret created)
- `Gemt` (Saved)
- `Oprettet` (Created)

### Hjælpetekst og beskrivelser
Brug deklarative sætninger:
- `Du ser det sikre indhold` (You are viewing the secure content)
- `Dette indhold vises kun én gang` (This content is shown only once)

### Fejlmeddelelser
Brug klart, direkte sprog:
- `Forkert adgangssætning` (Incorrect passphrase)
- `Der opstod en fejl` (An error occurred)

---

## Særlige overvejelser

### Begrebet "Secret" - Kritisk regel

**BRUG ALTID "besked" (meddelelse), BRUG ALDRIG "hemmelighed"**

Det danske ord "hemmelighed" har upassende konnotationer:
- Personlige eller private hemmeligheder (sladder, skjult information)
- Barnlig eller triviel brug
- Betydninger der lyder uprofessionelle i en forretningsmæssig kontekst

Feedback fra indfødte talere bekræfter at "hemmelighed" fremkalder associationer med personlige hemmeligheder snarere end forretningssikkerhed.

Eksempler:
- ✓ `Du har 3 nye beskeder` (You have 3 new messages)
- ✗ `Du har 3 nye hemmeligheder` (You have 3 new secrets)
- ✓ `Opret en besked` (Create a secret)
- ✗ `Opret en hemmelighed` (Create a secret)

### Password vs. Passphrase
**Kritisk distinktion der skal opretholdes:**
- **`adgangskode`** - KUN for brugerkonto-login
- **`adgangssætning`** - for beskyttelse af individuelle beskeder

Denne distinktion skal opretholdes gennem hele applikationen for at undgå forvirring.

Eksempler:
- ✓ `Indtast din adgangskode` (Enter your password - konto-login)
- ✗ `Indtast din adgangssætning` (Enter your passphrase - konto-login)
- ✓ `Beskyt med adgangssætning` (Protect with passphrase - beskedbeskyttelse)
- ✗ `Beskyt med adgangskode` (Protect with password - beskedbeskyttelse)

### Begrebet "Burn"
Oversættes konsekvent som **`ødelæg`** (verbum) / **`ødelagt`** (datid):
- Formidler den permanente, irreversible karakter af sletning
- Eksempler:
  - `Ødelæg denne besked` (Burn this secret - knap)
  - `Beskeden er ødelagt` (The secret is burned - status)

### UI-element konventioner
- Følg platformkonventioner for målsproget
- Brug standard dansk terminologi for almindelige UI-elementer
- Oprethold konsistens med andre danske applikationer

### Tekniske sikkerhedstermer
- Prioritér nøjagtighed frem for uformel lokalisering
- Brug etableret dansk teknisk vokabular
- Eksempler:
  - `krypteret` (encrypted)
  - `krypter` (to encrypt)
  - `bekræftelse` (verification)
  - `godkendelse` (authentication)

---

## Begrundelse for dansk-specifikke tilpasninger

Den danske oversættelse kræver særlig opmærksomhed på:

1. **"Besked" i stedet for "Hemmelighed"**: Ordet "hemmelighed" har barnlige/personlige konnotationer i daglig dansk der underminerer den professionelle/sikkerhedsmæssige kontekst. Brug af "besked" opretholder en forretningspassende tone.

2. **Klar Password/Passphrase distinktion**: Brug af "adgangskode" for konto-login og "adgangssætning" for beskedbeskyttelse sikrer at brugere forstår de forskellige sikkerhedskontekster.

3. **Imperativ for handlinger, passiv for status**: Danske UI-konventioner foretrækker stærkt imperativformer for knapper og passiv/datidsformer for statusmeddelelser.

4. **Bindestreger i sammensatte ord**: Når danske ord kombineres med engelske låneord, er bindestreger nødvendige for korrekt dansk retskrivning.

---

## Opsummering af oversættelsesprincipperne

Den danske oversættelse opretholder:

1. **Terminologisk konsistens** - Standardiserede nøgletermer gennem hele applikationen
2. **Passende stemme** - Imperativ for handlinger, passiv/datid for information
3. **Naturlig sprogbrug** - Standard danske udtryk og sætningsstrukturer
4. **Konsistent tiltale** - Direkte tiltale når der henvendes til brugere
5. **Fuld dækning** - Alle brugervendte strenge oversat
6. **Teknisk nøjagtighed** - Præcis terminologi for sikkerhedskoncepter
7. **Klare distinktioner** - Især:
   - Konto-passwords (`adgangskode`) og besked-adgangssætninger (`adgangssætning`)
   - Brug af `besked` (meddelelse) i stedet for `hemmelighed` (hemmelighed)
   - Handlingsverber (imperativ) og statusmeddelelser (passiv/datid)
8. **Korrekt retskrivning** - Sammensatte ord med bindestreger ved engelske låneord
