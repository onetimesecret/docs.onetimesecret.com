---
title: Datacenterregioner
description: Lär dig om Onetime Secrets datacenterregioner och hur du väljer rätt för dina behov.
---

Onetime Secret erbjuder fem datacenterregioner: Kanada (CA), Europeiska unionen (EU), Aotearoa Nya Zeeland (NZ), Storbritannien (UK) och USA (US). Den här guiden hjälper dig att förstå varför regionval är viktigt och hur du väljer rätt region för dina behov.

## Varför regionval är viktigt

Att välja rätt datacenterregion är avgörande av flera skäl:

1. **Datasuveränitet**: Olika regioner har olika lagar och regler för dataskydd.
2. **Latens**: Att välja en region närmare din primära användarbas kan minska latensen.
3. **Efterlevnad**: Vissa organisationer har specifika krav på var deras data får lagras.

## Tillgängliga regioner

| Region | Plats | URL |
|--------|----------|-----|
| [Kanada (CA)](/sv/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Europeiska unionen (EU)](/sv/regions/european-union) | Nürnberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nya Zeeland (NZ)](/sv/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Storbritannien (UK)](/sv/regions/united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [USA (US)](/sv/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Varje regionsida innehåller information om den lokala regulatoriska miljön och när regionen kan vara relevant för ditt användningsfall.

## Dela-ingenting-arkitektur

Onetime Secret använder en dela-ingenting-arkitektur som säkerställer fullständig dataisolering mellan regioner:

- **Separata konton**: Att skapa ett konto på en regional domän är helt separat från konton på andra domäner, även om du använder samma e-postadress.
- **Inga åtgärder mellan datacenter**: Du kan inte utföra åtgärder (som att bränna en hemlighet) mellan datacenter. Varje center upprätthåller sin egen uppsättning hemligheter och användardata.
- **Konsekvent fakturering för betalande användare**: För betalkonton delas ingen användardata mellan center, men din prenumerationsstatus känns igen mellan regioner genom vår betalningsleverantör, Stripe.

## Hur du väljer din region

Tänk på följande faktorer när du väljer din datacenterregion:

### Utan konto

- Förfrågningar till onetimesecret.com kan dirigeras till vilket aktivt datacenter som helst.
- Du kan välja en specifik region genom att navigera direkt till en regional domän (t.ex. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Den genererade länken identifierar alltid regionen (t.ex. `us.onetimesecret.com/secret/abcd1234`).

### Med konto

- När du skapar ett konto väljer du en datacenterregion. Alla planer — gratis och betalda — har tillgång till alla regioner.
- Du loggar in på samma regionala domän som du registrerade dig på (t.ex. om du registrerade dig på `eu.onetimesecret.com`, är det där du loggar in).

### Ytterligare överväganden

1. **För privatpersoner**:
   - Personlig preferens
   - Närhet till din plats för potentiellt snabbare åtkomst
   - Personliga funderingar kring datasuveränitet

2. **För företag**:
   - Juridiska och regulatoriska krav
   - Plats för din primära kundbas
   - Branschspecifika efterlevnadsbehov

3. **Tekniska överväganden**:
   - Latenskrav för din applikation
   - Integration med andra tjänster eller system

## Vanliga frågor

**F: Kan jag byta region efter att jag konfigurerat mitt konto?**
S: Ja. Se [Byte av region](/sv/regions/switching-regions) för steg-för-steg-instruktioner som täcker gratiskonton, betalda prenumerationer och migrering av anpassad domän.

**F: Påverkar mitt regionval säkerheten för mina hemligheter?**
S: Nej, alla regioner erbjuder samma höga säkerhetsnivå. Valet påverkar främst dataresidens och eventuell latens.

**F: Finns det prisskillnader mellan regioner?**
S: Priserna är specifika för varje region — du kan betala i din lokala valuta och Stripe hanterar valutaväxlingen automatiskt. Identity Plus-planer inkluderar obegränsat antal anpassade domäner över alla datacenter under en enda prenumeration. Kolla vår [prissida](https://onetimesecret.com/pricing) för den mest aktuella informationen.

## Behöver du hjälp?

Om du är osäker på vilken region du ska välja eller har några frågor, tveka inte att kontakta vårt supportteam. Vi finns här för att hjälpa dig fatta bästa möjliga beslut för dina specifika behov.

- E-post: support@onetimesecret.com
- Feedbackformulär: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Kom ihåg att rätt regionval säkerställer bästa prestanda och efterlevnad av relevanta dataregler när du använder Onetime Secret.
