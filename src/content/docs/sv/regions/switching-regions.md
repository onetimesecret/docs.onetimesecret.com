---
title: Byte av region
---

Onetime Secret använder en [dela-ingenting-arkitektur](/sv/regions) i alla fem regioner (CA, EU, NZ, UK, US). Varje region fungerar som ett helt separat system med egen databas, egna konton och egna hemligheter. Vi överför aldrig data mellan regioner.

Det innebär att ett regionbyte är mindre av en "migrering" och mer av en nystart i din önskade region. Den goda nyheten: det tar ungefär två minuter, och din prenumeration följer automatiskt med.

## Gratiskonton

Navigera direkt till din önskade region (se [Tillgängliga regioner](/sv/regions#tillgängliga-regioner) för hela listan) och skapa ett nytt konto med samma e-postadress. Det är allt — ditt nya konto är klart att använda direkt.

## Betalkonton (Identity Plus)

Processen är densamma som för gratiskonton, med ett extra steg:

1. Gå till URL:en för din önskade region (se [Tillgängliga regioner](/sv/regions#tillgängliga-regioner))
2. Skapa ett konto med samma e-postadress som är kopplad till din prenumeration
3. Logga in och navigera till din kontosida
4. Din prenumerationsstatus känns igen automatiskt via Stripe

Du kan behöva uppdatera sidan en gång för att prenumerationen ska synkroniseras. Det här fungerar eftersom vi håller data separerad mellan regioner, medan din faktureringsrelation hanteras via Stripe, som känner igen din e-postadress mellan regioner.

## Vad händer med ditt gamla konto

Ditt tidigare regionkonto förblir helt fungerande:

- Befintliga hemliga länkar fortsätter att fungera tills de visas eller går ut
- Ditt konto förblir aktivt om du skulle behöva referera till något
- Ingen åtgärd krävs på det gamla kontot om du inte vill stänga det

## Migrering av anpassad domän

Om du har en anpassad domän konfigurerad i din nuvarande region krävs lite mer planering. Eftersom dina befintliga hemliga länkar använder din anpassade domäns DNS-poster kan du inte bara peka om domänen mot den nya regionen utan att riskera att bryta länkar som ännu inte har visats.

### Steg för steg

1. **Lägg till en tillfällig subdomän** i ditt nya regionkonto. Om din nuvarande domän till exempel är `secrets.example.com`, kan du lägga till något i stil med `secrets-new.example.com` eller `secrets-us.example.com`.

2. **Skapa en CNAME-post** för den tillfälliga subdomänen som pekar mot rätt regional identity-slutpunkt (t.ex. `identity.us.onetime.co` för US-regionen). Se [Guide för konfiguration av anpassad domän](/sv/custom-domains/setup-guide) för DNS-konfigurationsdetaljer.

3. **Börja använda den tillfälliga subdomänen** för nya hemligheter direkt.

4. **Efter 30 dagar** har alla hemligheter som skapats på den gamla domänen gått ut. Då kan du:
   - Ta bort den anpassade domänen från ditt gamla regionkonto
   - Lägga till din önskade subdomän (t.ex. `secrets.example.com`) i ditt nya regionkonto
   - Uppdatera CNAME-posten så att den pekar mot den nya regionens slutpunkt
   - Verifiera domänen i din kontopanel

5. **Städa upp** den tillfälliga subdomänen när din önskade domän är aktiv och verifierad.

### Varför 30 dagar?

Den maximala livslängden (TTL) för en hemlighet är 30 dagar. Genom att vänta den här perioden säkerställer du att alla hemligheter som skapades under den gamla regionens DNS-konfiguration antingen har visats eller gått ut, så att uppdateringen av CNAME-posten inte bryter några kvarvarande länkar.

Om du vet att alla dina befintliga hemligheter har kortare TTL:er eller redan har visats kan du göra bytet tidigare.

## Konton utan anpassad domän

Om du inte använder en anpassad domän sker bytet omedelbart. Dina gamla länkar (som använder de regionala onetimesecret.com-webbadresserna, t.ex. `eu.onetimesecret.com/secret/abcd1234`) fortsätter att fungera korrekt oavsett vilken region ditt aktiva konto finns i.

## Flera regioner

Du kan ha konton i flera regioner samtidigt. Alla konton som använder samma e-postadress delar samma prenumerationsstatus. Det kan vara användbart om du betjänar användare i olika geografiska områden och vill minimera latens eller uppfylla krav på dataresidens.

## Dedikerade instanser

Kunder med dedikerade instanser bör kontakta oss på [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) för regionbyten, eftersom dedikerad infrastruktur kräver manuell omkonfigurering. Du kan även nå oss via [feedbacksidan](https://onetimesecret.com/feedback).
