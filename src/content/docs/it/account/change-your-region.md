---
title: Cambiare regione
---

Onetime Secret utilizza un'[architettura share-nothing](/it/regions) in tutte le cinque regioni (CA, EU, NZ, UK, US). Ogni regione opera come un sistema completamente separato, con il proprio database, i propri account e i propri segreti. Non trasferiamo mai dati tra le regioni, in nessuna circostanza.

Questo significa che cambiare regione è meno una "migrazione" e più una nuova configurazione nella regione preferita. La buona notizia: richiede circa due minuti e il vostro abbonamento viene riportato automaticamente.

## Account gratuiti

Andate direttamente alla regione preferita (vedete [Regioni disponibili](/it/regions#regioni-disponibili) per l'elenco completo) e create un nuovo account con lo stesso indirizzo e-mail. Tutto qui — il vostro nuovo account è pronto all'uso immediatamente.

## Account a pagamento (Identity Plus)

Il processo è lo stesso degli account gratuiti, con un passaggio in più:

1. Andate all'URL della regione preferita (vedete [Regioni disponibili](/it/regions#regioni-disponibili))
2. Create un account utilizzando lo stesso indirizzo e-mail associato al vostro abbonamento
3. Accedete e andate alla pagina del vostro account
4. Lo stato del vostro abbonamento verrà riconosciuto automaticamente tramite Stripe

Potrebbe essere necessario aggiornare la pagina una volta per sincronizzare l'abbonamento. Questo funziona perché manteniamo i dati separati tra le regioni, mentre il vostro rapporto di fatturazione è gestito tramite Stripe, che riconosce il vostro indirizzo e-mail in tutte le regioni.

## Cosa succede al vostro vecchio account

Il vostro account nella regione precedente rimane pienamente funzionante:

- I link ai segreti esistenti continuano a funzionare finché non vengono visualizzati o scadono
- Il vostro account resta attivo, nel caso dobbiate consultare qualcosa
- Non è richiesta alcuna azione sul vecchio account, a meno che non vogliate chiuderlo

## Migrazione del dominio personalizzato

Se avete un dominio personalizzato configurato nella vostra regione attuale, il processo richiede un po' più di pianificazione. Poiché i vostri link ai segreti esistenti utilizzano i record DNS del vostro dominio personalizzato, non potete semplicemente puntare il dominio alla nuova regione senza interrompere i link non ancora visualizzati.

### Passo dopo passo

1. **Aggiungete un sottodominio temporaneo** al vostro nuovo account regionale. Ad esempio, se il vostro dominio attuale è `secrets.example.com`, aggiungete qualcosa come `secrets-new.example.com` o `secrets-us.example.com`.

2. **Create un record CNAME** per il sottodominio temporaneo, puntandolo all'endpoint di identità regionale appropriato (ad es. `identity.us.onetime.co` per la regione US). Consultate la [Guida all'impostazione del dominio personalizzato](/it/custom-domains/setup-guide) per i dettagli sulla configurazione DNS.

3. **Iniziate a usare subito il sottodominio temporaneo** per i nuovi segreti.

4. **Dopo 30 giorni**, tutti i segreti creati sul vecchio dominio saranno scaduti. A quel punto potete:
   - Rimuovere il dominio personalizzato dal vostro vecchio account regionale
   - Aggiungere il vostro sottodominio preferito (ad es. `secrets.example.com`) al vostro nuovo account regionale
   - Aggiornare il record CNAME per puntare all'endpoint della nuova regione
   - Verificare il dominio nella dashboard del vostro account

5. **Ripulite** il sottodominio temporaneo una volta che il vostro dominio preferito è attivo e verificato.

### Perché 30 giorni?

Il tempo di vita massimo (TTL) di un segreto è di 30 giorni. Attendere questo periodo garantisce che tutti i segreti creati con la vecchia configurazione DNS della regione siano stati visualizzati o siano scaduti, in modo che l'aggiornamento del record CNAME non interrompa alcun link ancora attivo.

Se sapete che tutti i vostri segreti esistenti hanno TTL più brevi o sono già stati visualizzati, potete effettuare il passaggio prima.

## Account senza domini personalizzati

Se non utilizzate un dominio personalizzato, il passaggio è immediato. I vostri vecchi link (che utilizzano gli URL regionali di onetimesecret.com come `eu.onetimesecret.com/secret/abcd1234`) continueranno a funzionare correttamente, indipendentemente dalla regione in cui si trova il vostro account attivo.

## Più regioni

Potete mantenere account in più regioni contemporaneamente. Tutti gli account che utilizzano lo stesso indirizzo e-mail condividono lo stesso stato di abbonamento. Questo può essere utile se servite utenti in aree geografiche diverse e volete ridurre al minimo la latenza o soddisfare requisiti di residenza dei dati.

## Istanze dedicate

I clienti con istanze dedicate devono contattarci all'indirizzo [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) per le modifiche di regione, poiché l'infrastruttura dedicata richiede una riconfigurazione manuale. Potete anche contattarci tramite la [pagina di feedback](https://onetimesecret.com/feedback).
