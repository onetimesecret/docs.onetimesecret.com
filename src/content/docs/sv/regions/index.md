---
title: Datacenterregioner
description: Lär dig om Onetime Secrets datacenterregioner och hur du väljer rätt för dina behov.
---

Onetime Secret erbjuder fyra datacenterregioner: Europeiska unionen (EU), USA (US), Kanada (CA) och Aotearoa Nya Zeeland (NZ). Denna guide hjälper dig förstå vikten av regionval och hur du väljer rätt för dina behov.

## Varför regionval är viktigt

Att välja rätt datacenterregion är avgörande av flera skäl:

1. **Datasuveränitet**: Olika regioner har olika dataskyddslagar och regler.
2. **Latens**: Att välja en region närmare din primära användarbas kan minska latensen.
3. **Efterlevnad**: Vissa organisationer har specifika krav om var deras data kan lagras.

## Tillgängliga regioner

### Europeiska unionen (EU)

- **Plats**: Europeiska unionen (Nürnberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Nyckelfunktioner**:
  - Efterlever GDPR och andra EU-dataskyddsregler
  - Idealisk för europeiska användare eller de som främst betjänar europeiska kunder

### Kanada (CA)

- **Plats**: Kanada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Nyckelfunktioner**:
  - Efterlever PIPEDA och kanadensiska dataskyddslagar
  - Lämplig för kanadensiska användare eller de som främst betjänar kanadensiska kunder

### Aotearoa Nya Zeeland (NZ)

- **Plats**: Aotearoa Nya Zeeland (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Nyckelfunktioner**:
  - Efterlever Nya Zeelands integritetslag och lokala regler
  - Lämplig för användare i Nya Zeeland eller de som betjänar kunder i Oceanien

### USA (US)

- **Plats**: USA (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Nyckelfunktioner**:
  - Efterlever USA:s dataskyddslagar
  - Lämplig för USA-baserade användare eller de som främst betjänar amerikanska kunder

## Dela-ingenting-arkitektur

Onetime Secret använder en dela-ingenting-arkitektur, vilket säkerställer fullständig dataisolering mellan regioner:

- **Separata konton**: Att skapa ett konto på en regional domän är helt separat från konton på andra domäner, även om du använder samma e-postadress.
- **Inga cross-center-operationer**: Du kan inte utföra operationer (som att bränna en hemlighet) över datacenter. Varje center upprätthåller sin egen uppsättning hemligheter och användardata.
- **Konsekvent fakturering för betalande användare**: För betalda konton, medan ingen användardata delas mellan center, är din prenumerationsstatus igenkänd över regioner genom vår betalningsleverantör, Stripe.

## Hur man väljer din region

Överväg följande faktorer när du väljer din datacenterregion:

### För anonyma användare

- Förfrågningar till onetimesecret.com kan dirigeras till vilket aktivt datacenter som helst.
- Platsen för din hemlighet är alltid tydlig från den genererade länken (t.ex. `us.onetimesecret.com/secret/abcd1234`).
- Du kan välja en specifik datalokalisering genom att navigera direkt till en regional domän (t.ex. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### För autentiserade användare

- När du skapar ett nytt konto måste du välja en datacenterplats.
- Du måste återvända till samma plats för att logga in.
- Befintliga konton och hemligheter förblir i sitt ursprungliga datacenter.

### För alla användare

- Hemligheter skapade utan en subdomänjurisdiktion (t.ex. onetimesecret.com/secret/efgh5678) kommer fortsätta att standardiseras till vårt EU-datacenter.
- Alla användare, både betalda och gratis, kan välja sitt föredragna datacenter när de skapar ett konto.

### Ytterligare överväganden

1. **För privatpersoner**:
   - Personlig preferens
   - Närhet till din plats för potentiellt snabbare åtkomst
   - Personliga datakontrollproblem

2. **För företag**:
   - Juridiska och regulatoriska krav
   - Plats för din primära kundbas
   - Branschspecifika efterlevnadsbehov

3. **Tekniska överväganden**:
   - Latenskrav för din applikation
   - Integration med andra tjänster eller system

## Priser och planer

Vårt engagemang för datalokalisering sträcker sig till vår prismodell:

- Avgifter baseras på var du betalar från, inte var ditt konto skapas.
- Identity Plus-planer inkluderar obegränsade anpassade domäner över alla datacenter under en enda prenumeration.

## Framtida planer

Vi arbetar kontinuerligt med att utöka våra datacentersalternativ. Framtida planer inkluderar ytterligare datacenterplatser i:

- Brasilien
- Spanien
- Storbritannien

Dessa expansioner kommer att ge ännu fler alternativ för datalokalisering, vilket förbättrar prestanda och efterlevnadsförmåga för användare i olika regioner.

## Konfigurera din region

När du konfigurerar ditt Onetime Secret-konto eller konfigurerar en anpassad domän kommer du att ha möjlighet att välja din föredragna region. Så här gör du:

1. För nya konton: Välj din föredragna region under registreringsprocessen.
2. För befintliga konton: Kontakta vårt supportteam för att diskutera regionmigreringsalternativ.
3. För anpassade domäner: Ange din valda region när du konfigurerar dina DNS-inställningar (se vår [Guide för konfiguration av anpassad domän](/sv/custom-domains/setup-guide) för detaljerade instruktioner).

## Vanliga frågor

**F: Kan jag ändra min region efter att ha konfigurerat mitt konto?**
S: Ja, du kan ändra din region genom att skapa ett nytt konto med samma e-postadress och navigera till kontoskärmen. Om du har en aktiv prenumeration uppdateras ditt konto automatiskt (du kan behöva uppdatera sidan).

Observera:
- Befintlig data överförs inte mellan regioner
- Eventuella hemliga länkar du har skapat kommer fortsätta att fungera tills de visas eller går ut
- För länkar med anpassade domäner måste du:
  1. Återlägga till domänen till ditt nya regionkonto
  2. Uppdatera de associerade DNS-posterna
  3. Använda en unik subdomän när du återlägger till domänen för att undvika konflikter med befintliga länkar
  4. Senare kan du lägga till din föredragna domän (om nödvändigt) så att du kan börja skicka nya länkar med din föredragna domän

**F: Påverkar mitt val av region säkerheten för mina hemligheter?**
S: Nej, alla regioner erbjuder samma höga säkerhetsnivå. Valet påverkar främst dataresidensen och potentiell latens.

**F: Finns det prisskillnader mellan regioner?**
S: För närvarande är våra priser konsekventa över alla regioner. Kolla vår [prissida](https://onetimesecret.com/pricing) för den mest uppdaterade informationen.

## Behöver hjälp?

Om du är osäker på vilken region du ska välja eller har några frågor, tveka inte att kontakta vårt supportteam. Vi är här för att hjälpa dig fatta det bästa beslutet för dina specifika behov.

- E-post: support@onetimesecret.com
- Feedbackformulär: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Kom ihåg att välja rätt region säkerställer att du får bästa prestanda och efterlever relevanta dataregler när du använder Onetime Secret.
