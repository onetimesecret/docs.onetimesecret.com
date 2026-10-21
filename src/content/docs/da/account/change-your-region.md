---
title: Skift af region
---

Onetime Secret bruger en [del-ingenting-arkitektur (share-nothing architecture)](/da/regions) på tværs af alle fem regioner (CA, EU, NZ, UK, US). Hver region fungerer som et helt separat system med sin egen database, egne konti og egne beskeder. Vi overfører under ingen omstændigheder data mellem regioner.

Det betyder, at skift af region er mindre en "migrering" og mere en frisk opsætning i din foretrukne region. Den gode nyhed: Det tager omkring to minutter, og dit abonnement følger automatisk med.

## Gratis konti

Naviger direkte til din foretrukne region (se [Tilgængelige regioner](/da/regions#tilgængelige-regioner) for den fulde liste), og opret en ny konto med den samme e-mailadresse. Det er alt — din nye konto er klar til brug med det samme.

## Betalte konti (Identity Plus)

Processen er den samme som for gratis konti, med ét ekstra trin:

1. Gå til URL'en for din foretrukne region (se [Tilgængelige regioner](/da/regions#tilgængelige-regioner))
2. Opret en konto med den samme e-mailadresse, som er tilknyttet dit abonnement
3. Log ind, og gå til din kontoside
4. Din abonnementsstatus genkendes automatisk via Stripe

Du skal muligvis genindlæse siden én gang, for at abonnementet synkroniseres. Dette fungerer, fordi vi holder data adskilt mellem regioner, mens dit faktureringsforhold administreres gennem Stripe, som genkender din e-mailadresse på tværs af regioner.

## Hvad der sker med din gamle konto

Din tidligere regionskonto forbliver fuldt funktionsdygtig:

- Eventuelle eksisterende hemmelige links fortsætter med at fungere, indtil de bliver set eller udløber
- Din konto forbliver aktiv, hvis du senere skulle få brug for at slå noget op
- Der kræves ingen handling på den gamle konto, medmindre du ønsker at lukke den

## Migrering af brugerdefineret domæne

Hvis du har et brugerdefineret domæne konfigureret på din nuværende region, kræver processen lidt mere planlægning. Fordi dine eksisterende hemmelige links bruger dit brugerdefinerede domænes DNS-poster, kan du ikke bare pege domænet mod den nye region uden at ødelægge links, der endnu ikke er blevet set.

### Trin for trin

1. **Tilføj et midlertidigt underdomæne** til din nye regionskonto. Hvis dit nuværende domæne f.eks. er `secrets.example.com`, kan du tilføje noget i stil med `secrets-new.example.com` eller `secrets-us.example.com`.

2. **Opret en CNAME-post** for det midlertidige underdomæne, der peger mod det relevante regionale identity-endpoint (f.eks. `identity.us.onetime.co` for US-regionen). Se [opsætningsvejledningen til brugerdefinerede domæner](/da/custom-domains/setup-guide) for detaljer om DNS-konfiguration.

3. **Begynd at bruge det midlertidige underdomæne** til nye beskeder med det samme.

4. **Efter 30 dage** vil alle beskeder, der er oprettet på det gamle domæne, være udløbet. Du kan derefter:
   - Fjerne det brugerdefinerede domæne fra din gamle regionskonto
   - Tilføje dit foretrukne underdomæne (f.eks. `secrets.example.com`) til din nye regionskonto
   - Opdatere CNAME-posten, så den peger mod den nye regions endpoint
   - Bekræfte domænet i dit kontodashboard

5. **Ryd op** i det midlertidige underdomæne, når dit foretrukne domæne er aktivt og bekræftet.

### Hvorfor 30 dage?

Den maksimale levetid (TTL) for en besked er 30 dage. Ved at vente denne periode sikrer du, at alle beskeder oprettet under den gamle regions DNS-konfiguration enten er blevet set eller er udløbet, så en opdatering af CNAME-posten ikke ødelægger nogen udestående links.

Hvis du ved, at alle dine eksisterende beskeder har kortere TTL'er eller allerede er blevet set, kan du skifte hurtigere.

## Konti uden brugerdefinerede domæner

Hvis du ikke bruger et brugerdefineret domæne, sker skiftet med det samme. Dine gamle links (der bruger de regionale onetimesecret.com-URL'er, som f.eks. `eu.onetimesecret.com/secret/abcd1234`) fortsætter med at fungere korrekt, uanset hvilken region din aktive konto befinder sig i.

## Flere regioner

Du kan have konti i flere regioner samtidig. Alle konti, der bruger den samme e-mailadresse, deler samme abonnementsstatus. Dette kan være nyttigt, hvis du betjener brugere i forskellige geografiske områder og ønsker at minimere latens eller opfylde krav om dataresidens.

## Dedikerede instanser

Kunder på dedikerede instanser bør kontakte os på [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) angående regionsskift, da dedikeret infrastruktur kræver manuel omkonfiguration. Du kan også kontakte os via [feedbacksiden](https://onetimesecret.com/feedback).
