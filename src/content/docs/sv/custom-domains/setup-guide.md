---
title: Installationsguide
description: Denna guide leder dig genom processen att konfigurera en anpassad domän för ditt Onetime Secret-konto, inklusive skillnaderna mellan subdomäner och apex-domäner, och att välja din föredragna datacenterregion.
---

# Guide för konfiguration av anpassad domän

## Förutsättningar

- Ett aktivt Onetime Secret-konto med funktion för anpassad domän aktiverad
- En domän du äger och kan hantera DNS-inställningar för

## Förstå domäntyper

Innan du konfigurerar din anpassade domän är det viktigt att förstå skillnaden mellan subdomäner och apex-domäner:

1. **Subdomän**: En underavdelning av din huvuddomän (t.ex. secrets.dindomän.com)
2. **Apex-domän**: Själva rotdomänen (t.ex. dindomän.com)

## Välj din region

Onetime Secret erbjuder två datacenterregioner: EU och USA. När du konfigurerar din anpassade domän måste du välja vilken region du föredrar för att lagra din data. Detta val är viktigt av flera skäl:

- **För privatpersoner**: Du kan välja baserat på din personliga preferens, såsom närhet för potentiellt snabbare åtkomst eller personliga datakontrollproblem.
- **För företag**: Ditt val kan bero på dina datalokaliserings skyldigheter, såsom efterlevnad av GDPR, statliga eller provinsiella riktlinjer. Säkerställ att du väljer den region som bäst överensstämmer med dina regulatoriska krav.

Överväg dina specifika behov och krav när du gör detta val. För mer detaljerad information om våra datacenterregioner och hur du väljer rätt för dina behov, vänligen se vår guide för [datacenterregioner](/sv/regions).

## Steg 1: Åtkomst till domänkontrollpanelen

1. Logga in på ditt Onetime Secret-konto
2. Navigera till Kontrollpanel > Anpassade domäner
3. Klicka på "Lägg till domän"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Vy för anpassade domäner" width="400" />

## Steg 2: Ange din domän

1. I inställningarna för anpassad domän, ange din önskade domän (t.ex. secrets.dindomän.com eller dindomän.com)
2. Klicka på "Lägg till domän" eller motsvarande knapp för att fortsätta

## Steg 3: Konfigurera DNS-inställningar

För att ansluta din domän behöver du uppdatera dina DNS-inställningar. Processen skiljer sig något beroende på om du använder en subdomän eller en apex-domän, och vilken datacenterregion du väljer.

### För subdomäner (rekommenderas)

1. Få åtkomst till din domäns DNS-hanteringspanel (genom din domänregistrator eller DNS-leverantör)
2. Skapa en CNAME-post med följande detaljer:
   - Värd: Din valda subdomän (t.ex. secrets)
   - Pekar på / Värde:
     - För EU-region: identity.eu.onetime.co
     - För USA-region: identity.us.onetime.co
3. Ta bort eventuella befintliga A-, AAAA- eller CNAME-poster för samma subdomän

### För apex-domäner

1. Få åtkomst till din domäns DNS-hanteringspanel
2. Skapa eller modifiera en A-post med följande detaljer:
   - Värd: @ (eller lämna tomt, beroende på din DNS-leverantör)
   - Pekar på / Värde:
     - För EU-region: 109.105.217.207
     - För USA-region: 66.51.126.41

Viktigt: Säkerställ att det inte finns några konfliktande poster för domänen du använder.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Inställningar för anpassad domän" width="400" />

### Mer information

#### Varför CNAME för subdomäner?

Vi rekommenderar att använda CNAME-poster för subdomäner eftersom:

1. De är mer flexibla och tillåter oss att ändra våra server-IP-adresser utan att du behöver uppdatera dina DNS-inställningar.
2. De anpassar sig automatiskt till eventuella ändringar vi gör i vår infrastruktur.

#### Varför A-poster för apex-domäner?

Apex-domäner kan inte använda CNAME-poster på grund av DNS-standarder. Därför måste vi använda A-poster, som har vissa begränsningar:

1. Om vi ändrar vår IP-adress (vilket är sällsynt), måste du uppdatera dina DNS-inställningar manuellt.
2. De anpassar sig inte automatiskt till ändringar i vår infrastruktur.

## Steg 4: Verifiera domän och vänta på SSL

1. Efter att ha uppdaterat DNS-inställningar, återvänd till Onetime Secrets sida för anpassad domän
2. Systemet kommer automatiskt att försöka verifiera din domän
3. SSL-certifikatgenerering kommer att börja när verifiering lyckas
4. Denna process kan ta några minuter att slutföra

## Steg 5: Bekräfta konfiguration

När konfigurationen är klar bör du se följande information:

- Domänstatus: Aktiv med SSL
- Måladress: identity.eu.onetime.co eller identity.us.onetime.co (beroende på din valda region)
- SSL-status: Aktiv
- SSL-förnyelsedatum: (Kommer att visas, vanligtvis cirka ett år från konfiguration)

## Felsökning

- Om verifieringen misslyckas, dubbelkolla dina DNS-inställningar
- Säkerställ att du har tagit bort eventuella konfliktande poster
- DNS-spridning kan ta upp till 24 timmar, även om det vanligtvis är mycket snabbare

## Använda din anpassade domän

När den är aktiv kommer dina hemliga länkar att använda din anpassade domän. Till exempel:
`https://secrets-example.onetime.dev/secret/abc123`

## Vi har dig täckt

Vi hanterar resten av de tekniska detaljerna så att du inte behöver göra det.

- Vi övervakar kontinuerligt din domäns status
- SSL-certifikat förnyas automatiskt utan någon åtgärd som krävs från din sida

För dem som vill hålla sig informerade kan du enkelt kontrollera hälsan på din domän:

- Titta helt enkelt på tidsstämpeln "Senast övervakad" i din kontrollpanel för att bekräfta pågående anslutning

## Frågor eller behöver support?

Vi är här för att hjälpa. Om du har några frågor eller behöver hjälp:

- Mejla oss direkt på support@onetimesecret.com
- Använd vårt feedbackformulär på https://onetimesecret.com/feedback

Vårt team är engagerat i att ge dig bästa möjliga support för din anpassade domänkonfiguration och användning, inklusive vägledning om att välja rätt datacenterregion för dina behov.
