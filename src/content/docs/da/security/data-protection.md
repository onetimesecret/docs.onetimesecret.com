---
title: Databeskyttelse
description: Hvad Onetime Secret gemmer, hvor længe det opbevares, hvor det behandles, og hvordan det understøtter dine compliance-forpligtelser.
---

Denne side beskriver, hvordan Onetime Secret håndterer dine data: hvad der gemmes, hvor længe, hvor dataene ligger, og hvordan det understøtter dit eget compliance-program.

## Hvad vi gemmer, og hvor længe

- **Beskedindholdet** er krypteret og beregnet til én enkelt visning. Når en besked er blevet vist — eller er udløbet — slettes den permanent.
- **Udløb er indbygget.** Hver besked har en levetid (som kan konfigureres inden for din plans grænser); intet er beregnet til at bestå på ubestemt tid.
- **Minimale metadata.** I tråd med vores princip om [Dataminimering](/da/principles/data-minimization) tilstræber vi kun at beholde de metadata, der er nødvendige for at drive tjenesten.

## Kryptering

Beskeder **krypteres under overførsel og i hvile** på alle planer. Transporten er beskyttet med TLS, og for brugerdefinerede domæner håndterer vi automatisk udstedelse og fornyelse af SSL/TLS-certifikater.

For særligt følsomt materiale kan du tilføje forsvar i dybden ved at aktivere en **adgangssætning**, opdele informationen på tværs af flere beskeder og vælge den kortest mulige udløbstid — se [Bedste sikkerhedspraksis](/da/security-best-practices).

## Hvor dine data behandles (dataplacering)

Du kan vælge den region, hvor dine data behandles og opbevares — i øjeblikket EU, Storbritannien, USA, Canada og New Zealand. Det lader dig holde data tæt på dine brugere og inden for en jurisdiktion, der passer til dine krav. Se [Datacenterregioner](/da/regions) for detaljer og endepunkter.

## Compliance

Onetime Secret er designet til at understøtte dit compliance-arbejde; tjenesten erstatter ikke dine egne kontroller, politikker og juridiske vurderinger.

- **GDPR / databeskyttelse.** Regional dataplacering, kortlivede data og dataminimering er designet til at hjælpe dig med at opfylde dine databeskyttelsesforpligtelser. I de fleste opsætninger fungerer du som dataansvarlig og Onetime Secret som databehandler for de begrænsede data, der er involveret.
- **HIPAA.** Som nævnt i vores [anvendelsestilfælde](/da/custom-domains/use-cases) kan Onetime Secret være en mere sikker kanal end e-mail til udveksling af indledende legitimationsoplysninger, men tjenesten bør bruges som en midlertidig løsning snarere end et permanent registreringssystem for beskyttede sundhedsoplysninger (PHI). Kombinér den med et dedikeret, compliant system til løbende PHI-arbejdsgange.
- **Certificeringer, databehandleraftaler og specifikke rammeværk.** Ved spørgsmål om certificeringer, en databehandleraftale (DPA) eller et specifikt regulatorisk rammeværk kan du kontakte **support@onetimesecret.com**.

For organisationer med strenge krav til datakontrol holder [selv-hosting](https://github.com/onetimesecret/onetimesecret) alt inden for egen infrastruktur.

## Spørgsmål eller brug for support?

Vi er her for at hjælpe.

- Generelt: support@onetimesecret.com
- Sikkerhedsproblemer: security@onetimesecret.com ([politik for sårbarhedsrapportering](/da/security/vulnerability-disclosure))
