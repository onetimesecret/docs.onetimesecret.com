---
title: Dataskydd
description: Vad Onetime Secret lagrar, hur länge det sparas, var det behandlas och hur detta stödjer dina efterlevnadsskyldigheter.
---

Den här sidan beskriver hur Onetime Secret hanterar din data: vad som lagras, hur länge, var den finns och hur det stödjer ditt eget efterlevnadsarbete.

## Vad vi lagrar och hur länge

- **Hemlighetens innehåll** krypteras och är avsett för en enda hämtning. När en hemlighet har visats — eller nått sin utgångstid — förstörs den permanent.
- **Utgångstiden är inbyggd.** Varje hemlighet har en livslängd (konfigurerbar inom din plans gränser); ingenting är avsett att finnas kvar på obestämd tid.
- **Minimal metadata.** I linje med vår princip om [Dataminimering](/sv/principles/data-minimization) strävar vi efter att endast behålla den metadata som behövs för att driva tjänsten.

## Kryptering

Hemligheter **krypteras under överföring och i vila** i alla planer. Överföringen skyddas med TLS, och för anpassade domäner hanterar vi utfärdande och förnyelse av SSL/TLS-certifikat automatiskt.

För särskilt känsligt material kan du lägga till djupförsvar genom att aktivera en **lösenfras**, dela upp informationen över flera hemligheter och välja den kortaste praktiska utgångstiden — se [Säkerhetsbästa praxis](/sv/security-best-practices).

## Var din data behandlas (datahemvist)

Du kan välja i vilken region din data behandlas och lagras — för närvarande EU, Storbritannien, USA, Kanada och Nya Zeeland. Det låter dig hålla data nära dina användare och inom en jurisdiktion som passar dina krav. Se [Datacenterregioner](/sv/regions) för detaljer och slutpunkter.

## Efterlevnad

Onetime Secret är utformad för att stödja ditt efterlevnadsarbete; tjänsten ersätter inte dina egna kontroller, policyer och juridiska granskningar.

- **GDPR / dataskydd.** Regional datahemvist, kortlivade data och dataminimering är utformade för att hjälpa dig att uppfylla dina dataskyddsskyldigheter. I de flesta driftsättningar agerar du personuppgiftsansvarig, med Onetime Secret som personuppgiftsbiträde för den begränsade data som berörs.
- **HIPAA.** Som våra [användningsfall](/sv/custom-domains/use-cases) nämner kan Onetime Secret erbjuda en säkrare kanal än e-post för att utbyta initiala åtkomstuppgifter, men tjänsten bör användas som en tillfällig lösning snarare än ett permanent arkivsystem för PHI. Kombinera den med ett dedikerat regelefterlevande system för löpande PHI-arbetsflöden.
- **Certifieringar, personuppgiftsbiträdesavtal och specifika ramverk.** För frågor om certifieringar, ett personuppgiftsbiträdesavtal (DPA) eller ett specifikt regelverk, kontakta **support@onetimesecret.com**.

För organisationer med strikta krav på datakontroll håller [självhosting](https://github.com/onetimesecret/onetimesecret) allt inom din egen infrastruktur.

## Frågor eller behöver du support?

Vi finns här för att hjälpa till.

- Allmänt: support@onetimesecret.com
- Säkerhetsproblem: security@onetimesecret.com ([rapporteringspolicy](/sv/security/vulnerability-disclosure))
