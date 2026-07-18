---
title: Sikkerhed og tillid
description: Sådan beskytter Onetime Secret dine beskeder — sikkerhedsmodellen, håndteringen af data, regional dataplacering, og hvordan du rapporterer en sårbarhed.
---

Onetime Secret findes for at flytte følsom information fra én person til en anden, uden at den bliver liggende i indbakker, chathistorik eller ticket-systemer. Dette afsnit forklarer, hvordan tjenesten er bygget til at gøre det sikkert, og hvor du finder detaljerne.

## Sikkerhedsmodellen kort fortalt

- **Engangsadgang.** En besked er designet til at blive vist én gang og derefter slettet permanent. Når den er blevet læst (eller er udløbet), er den væk.
- **Kryptering under overførsel og i hvile.** Beskeder krypteres under overførsel og i hvile på alle planer.
- **Beskyttelse med adgangssætning.** Du kan kræve en adgangssætning for at vise en besked — et ekstra lag, som linket alene ikke kan låse op.
- **Indbygget tidsbegrænsning.** Beskeder har en udløbstid; vælg den kortest praktisk mulige levetid for at minimere eksponeringen.
- **Ødelæg før læsning.** Hvis en besked endnu ikke er blevet vist, kan du ødelægge den, så den aldrig kan læses.
- **Dataminimering.** Vi tilstræber kun at indsamle og opbevare det nødvendige — se [Dataminimering](/da/principles/data-minimization).

## Udforsk dette afsnit

- **[Databeskyttelse](/da/security/data-protection)** — hvad vi gemmer, hvor længe, hvor dataene ligger, og hvordan det understøtter dine compliance-behov.
- **[Bedste sikkerhedspraksis](/da/security-best-practices)** — praktisk vejledning i at dele beskeder sikkert, herunder fordelene ved brugerdefinerede domæner.
- **[Sårbarhedsrapportering](/da/security/vulnerability-disclosure)** — sådan rapporterer du et sikkerhedsproblem ansvarligt.

## Relateret

- **[Vores principper](/da/principles)** — Privatliv først, Kommunikation og Dataminimering.
- **[Datacenterregioner](/da/regions)** — vælg, hvor dine data behandles og opbevares.
- **[Selv-hosting](https://github.com/onetimesecret/onetimesecret)** — kør Onetime Secret på din egen infrastruktur for fuld kontrol.

## Rapportering af et sikkerhedsproblem

Hvis du mener, du har fundet en sårbarhed, så kontakt vores sikkerhedsteam på **security@onetimesecret.com**. Se [Sårbarhedsrapportering](/da/security/vulnerability-disclosure) for, hvad du skal inkludere, og hvad du kan forvente.
