---
title: Opsætningsvejledning
description: Denne vejledning vil guide dig gennem processen med at opsætte et brugerdefineret domæne til din Onetime Secret-konto, herunder forskellene mellem underdomæner og apex-domæner og valg af din foretrukne datacenterregion.
---

# Brugerdefineret domæneopsætningsvejledning

## Forudsætninger

- En aktiv Onetime Secret-konto med brugerdefineret domænefunktion aktiveret
- Et domæne, du ejer og kan administrere DNS-indstillinger for

## Forståelse af domænetyper

Før du opsætter dit brugerdefinerede domæne, er det vigtigt at forstå forskellen mellem underdomæner og apex-domæner:

1. **Underdomæne**: En underafdeling af dit hoveddomæne (f.eks. secrets.ditdomæne.dk)
2. **Apex-domæne**: Selve roddomænet (f.eks. ditdomæne.dk)

## Vælg din region

Onetime Secret tilbyder to datacenterregioner: EU og US. Når du opsætter dit brugerdefinerede domæne, skal du vælge, hvilken region du foretrækker til lagring af dine data. Dette valg er vigtigt af flere årsager:

- **For enkeltpersoner**: Du kan vælge baseret på din personlige præference, såsom nærhed for potentielt hurtigere adgang eller personlige datasuverænitetsproblemer.
- **For virksomheder**: Dit valg kan afhænge af dine datalokationsforpligtelser, såsom overholdelse af GDPR, stats- eller provinsretningslinjer. Sørg for at vælge den region, der bedst stemmer overens med dine regulatoriske krav.

Overvej dine specifikke behov og krav, når du træffer dette valg. For mere detaljeret information om vores datacenterregioner og hvordan du vælger den rigtige til dine behov, se venligst vores [Datacenterregioner](/da/regions)-vejledning.

## Trin 1: Få adgang til domæneoversigt

1. Log ind på din Onetime Secret-konto
2. Naviger til Oversigt > Brugerdefinerede domæner
3. Klik på "Tilføj domæne"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Custom domains view" width="400" />

## Trin 2: Indtast dit domæne

1. I det brugerdefinerede domæneindstillinger skal du indtaste dit ønskede domæne (f.eks. secrets.ditdomæne.dk eller ditdomæne.dk)
2. Klik på "Tilføj domæne" eller tilsvarende knap for at fortsætte

## Trin 3: Konfigurer DNS-indstillinger

For at forbinde dit domæne skal du opdatere dine DNS-indstillinger. Processen varierer lidt afhængigt af, om du bruger et underdomæne eller et apex-domæne, og hvilken datacenterregion du vælger.

### For underdomæner (anbefalet)

1. Få adgang til dit domænes DNS-administrationspanel (gennem din domæneregistrator eller DNS-udbyder)
2. Opret en CNAME-post med følgende detaljer:
   - Vært: Dit valgte underdomæne (f.eks. secrets)
   - Peger på / Værdi:
     - For EU-region: identity.eu.onetime.co
     - For US-region: identity.us.onetime.co
3. Fjern eventuelle eksisterende A-, AAAA- eller CNAME-poster for samme underdomæne

### For apex-domæner

1. Få adgang til dit domænes DNS-administrationspanel
2. Opret eller modificer en A-post med følgende detaljer:
   - Vært: @ (eller lad være blank, afhængigt af din DNS-udbyder)
   - Peger på / Værdi:
     - For EU-region: 109.105.217.207
     - For US-region: 66.51.126.41

Vigtigt: Sørg for, at der ikke er nogen modstridende poster for det domæne, du bruger.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Custom domain settings" width="400" />

### Mere information

#### Hvorfor CNAME til underdomæner?

Vi anbefaler at bruge CNAME-poster til underdomæner, fordi:

1. De er mere fleksible og giver os mulighed for at ændre vores server-IP-adresser uden at kræve, at du opdaterer dine DNS-indstillinger.
2. De tilpasser sig automatisk til eventuelle ændringer, vi foretager i vores infrastruktur.

#### Hvorfor A-poster til apex-domæner?

Apex-domæner kan ikke bruge CNAME-poster på grund af DNS-standarder. Derfor skal vi bruge A-poster, som har nogle begrænsninger:

1. Hvis vi ændrer vores IP-adresse (hvilket er sjældent), skal du opdatere dine DNS-indstillinger manuelt.
2. De tilpasser sig ikke automatisk til ændringer i vores infrastruktur.

## Trin 4: Verificer domæne og vent på SSL

1. Efter opdatering af DNS-indstillinger skal du vende tilbage til Onetime Secret brugerdefineret domæneside
2. Systemet vil automatisk forsøge at verificere dit domæne
3. SSL-certifikatgenerering vil begynde, når verifikationen er vellykket
4. Denne proces kan tage nogle minutter at fuldføre

## Trin 5: Bekræft opsætning

Når opsætningen er fuldført, bør du se følgende information:

- Domænestatus: Aktiv med SSL
- Måladresse: identity.eu.onetime.co eller identity.us.onetime.co (afhængigt af din valgte region)
- SSL-status: Aktiv
- SSL-fornyelsesdato: (Vil blive vist, typisk omkring et år fra opsætning)

## Fejlfinding

- Hvis verifikation fejler, skal du dobbelttjekke dine DNS-indstillinger
- Sørg for, at du har fjernet eventuelle modstridende poster
- DNS-udbredelse kan tage op til 24 timer, selvom det normalt er meget hurtigere

## Brug af dit brugerdefinerede domæne

Når det er aktivt, vil dine hemmelige links bruge dit brugerdefinerede domæne. For eksempel:
`https://secrets-example.onetime.dev/secret/abc123`

## Vi har dig dækket

Vi håndterer resten af de tekniske detaljer, så du ikke behøver at gøre det.

- Vi overvåger løbende dit domænes status
- SSL-certifikater fornyes automatisk uden nogen handling fra din side

For dem, der gerne vil holde sig informeret, kan du nemt tjekke dit domænes sundhed:

- Se blot på "Sidst overvåget"-tidsstemplet i dit dashboard for at bekræfte løbende forbindelse

## Spørgsmål eller brug for support?

Vi er her for at hjælpe. Hvis du har spørgsmål eller brug for hjælp:

- Send os en e-mail direkte på support@onetimesecret.com
- Brug vores feedbackformular på https://onetimesecret.com/feedback

Vores team er engageret i at give dig den bedst mulige support til din brugerdefinerede domæneopsætning og -brug, herunder vejledning om valg af den rigtige datacenterregion til dine behov.
