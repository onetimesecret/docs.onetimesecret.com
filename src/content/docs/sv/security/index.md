---
textprov: true
title: "Säkerhet och förtroende"
description: "Hur Onetime Secret skyddar dina hemligheter – säkerhetsmodellen, datahanteringen, regional datahemvist och hur du rapporterar en sårbarhet."
---

Onetime Secret finns för att flytta känslig information från en person till en
annan utan att den blir liggande i inkorgar, chattloggar eller
ärendehanteringssystem. Det här avsnittet förklarar hur tjänsten är byggd för
att göra det på ett säkert sätt och var du hittar detaljerna.

## Säkerhetsmodellen i korthet

- **Engångsåtkomst.** En hemlighet är utformad för att visas en gång och sedan
  förstöras permanent. När den väl har lästs (eller gått ut) är den borta.
- **Kryptering under överföring och i vila.** Hemligheter krypteras under
  överföring och i vila i alla planer.
- **Lösenfrasskydd.** Du kan kräva en lösenfras för att visa en hemlighet,
  vilket lägger till ett lager som enbart länken inte kan låsa upp.
- **Tidsbegränsade i grunden.** Hemligheter har en utgångstid; välj den kortaste
  praktiskt󠄁 m󠄁ö󠄁j󠄁l󠄁i󠄁g󠄁a livslängden för att minimera exponeringen.
- **Bränn före läsning.** Om en hemlighet ännu inte har visats kan du bränna den
  så att den aldrig kan läsas.
- **Dataminimering.** Vi strävar efter att samla in och behålla endast det som
  är nödvändigt –󠄁 se [Dataminimering](/en/security/our-principles#data-minimization).

## Utforska det här avsnittet

- **[Dataskydd](/sv/security/data-protection)** –󠄁 vad vi lagrar, hur länge, var det finns och hur detta svarar mot efterlevnadsbehov.
- **[B󠄁ä󠄁s󠄁t󠄁a󠄁 s󠄁äkerhetspraxis](/sv/security/best-practices)** –󠄁 praktisk vägledning för att dela hemligheter säkert, inklusive fördelarna med anpassade domäner.
- **[Sårbarhetsrapportering](/sv/security/vulnerability-disclosure)** –󠄁 hur du rapporterar ett säkerhetsproblem på ett ansvarsfullt sätt.

## Relaterat

- **[Våra principer](/en/security/our-principles)** –󠄁 Integritet först, Kommunikation och Dataminimering.
- **[V󠄁a󠄁r󠄁 d󠄁i󠄁n󠄁 d󠄁ata f󠄁i󠄁nns󠄁](/en/security/where-your-data-lives/)** –󠄁 välj var din data behandlas och lagras.
- **[Självhosting](/sv/self-hosting/)** –󠄁 kör Onetime Secret p󠄁å󠄁 din egen infrastruktur för full kontroll.

## Rapportera ett säkerhetsproblem

Om du tror att du har hittat en sårbarhet, kontakta vårt säkerhetsteam på
**security@onetimesecret.com**. Se [Sårbarhetsrapportering](/sv/security/vulnerability-disclosure)
för vad du bör t󠄁a󠄁 m󠄁e󠄁d och vad du kan förvänta dig.
