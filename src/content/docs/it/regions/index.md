---
title: Regioni dei centri dati
description: Scopri le regioni dei data center di Onetime Secret e come scegliere quella giusta per le tue esigenze.
---

Onetime Secret offre quattro regioni di data center: Unione Europea (UE), Stati Uniti (USA), Canada (CA) e Nuova Zelanda (NZ). Questa guida vi aiuterà a capire l'importanza della selezione della regione e a scegliere quella giusta per le vostre esigenze.

## Perché la selezione della regione è importante

La scelta della giusta regione per i data center è fondamentale per diversi motivi:

1. **Sovranità dei dati**: Regioni diverse hanno leggi e regolamenti diversi in materia di protezione dei dati.
2. **Latenza**: La scelta di una regione più vicina alla vostra base di utenti principali può ridurre la latenza.
3. **Conformità**: Alcune organizzazioni hanno requisiti specifici per quanto riguarda l'archiviazione dei dati.

## Regioni disponibili

### Unione Europea (UE)

- **Luogo**: Unione Europea (Norimberga)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Caratteristiche principali**:
  - Conforme al GDPR e ad altre normative UE sulla protezione dei dati.
  - Ideale per gli utenti europei o per coloro che servono principalmente clienti europei

### Canada (CA)

- **Luogo**: Canada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Caratteristiche principali**:
  - Conforme al PIPEDA e alle leggi canadesi sulla protezione dei dati.
  - Adatto agli utenti canadesi o a coloro che servono principalmente clienti canadesi

### Aotearoa Nuova Zelanda (NZ)

- **Luogo**: Aotearoa Nuova Zelanda (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Caratteristiche principali**:
  - Conforme alla legge sulla privacy della Nuova Zelanda e alle normative locali.
  - Adatto agli utenti neozelandesi o a quelli che servono i clienti dell'Oceania

### Stati Uniti (US)

- **Luogo**: Stati Uniti (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Caratteristiche principali**:
  - Conforme alle leggi statunitensi sulla protezione dei dati
  - Adatto agli utenti con sede negli Stati Uniti o che servono principalmente clienti statunitensi

## Architettura Share-Nothing

Onetime Secret utilizza un'architettura share-nothing, che garantisce il completo isolamento dei dati tra le regioni:

- **Account separati**: La creazione di un account su qualsiasi dominio regionale è completamente separata dagli account su altri domini, anche se si utilizza lo stesso indirizzo e-mail.
- **Nessuna operazione tra centri dati**: Non è possibile eseguire operazioni (come la masterizzazione di un segreto) tra i vari data center. Ogni centro mantiene il proprio set di segreti e dati utente.
- Fatturazione coerente per gli utenti a pagamento**: Per gli account a pagamento, mentre i dati dell'utente non vengono condivisi tra i centri, lo stato dell'abbonamento viene riconosciuto in tutte le regioni attraverso il nostro fornitore di pagamenti, Stripe.

## Come scegliere la regione

Nella scelta dell'area del data center, considerate i seguenti fattori:

### Per gli utenti anonimi

- Le richieste a onetimesecret.com possono essere indirizzate a qualsiasi centro dati attivo.
- La posizione del vostro segreto è sempre chiara dal link generato (ad esempio, `us.onetimesecret.com/secret/abcd1234`).
- È possibile scegliere una località specifica per i dati navigando direttamente verso qualsiasi dominio regionale (ad esempio, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### Per gli utenti autenticati

- Quando si crea un nuovo account, è necessario scegliere la posizione del centro dati.
- Sarà necessario tornare alla stessa posizione per effettuare l'accesso.
- Gli account e i segreti esistenti rimangono nel data center di origine.

### Per tutti gli utenti

- I segreti creati senza la giurisdizione di un sottodominio (ad esempio, onetimesecret.com/secret/efgh5678) continueranno a essere impostati sul nostro centro dati UE.
- Tutti gli utenti, sia a pagamento che gratuiti, possono scegliere il centro dati preferito al momento della creazione dell'account.

### Considerazioni aggiuntive

1. **Per gli individui**:
   - Preferenza personale
   - Vicinanza alla propria posizione per un accesso potenzialmente più rapido
   - Problemi di sovranità dei dati personali

2. **Per le aziende**:
   - Requisiti legali e normativi
   - Ubicazione della base clienti principale
   - Esigenze di conformità specifiche del settore

3. **Considerazioni tecniche**:
   - Requisiti di latenza per l'applicazione
   - Integrazione con altri servizi o sistemi

## Prezzi e piani

Il nostro impegno per la localizzazione dei dati si estende al nostro modello di prezzi:

- I costi si basano sul luogo di pagamento, non sul luogo di creazione dell'account.
- I piani Identity Plus includono domini personalizzati illimitati in tutti i data center con un unico abbonamento.

## Piani futuri

Lavoriamo continuamente per espandere le nostre opzioni di data center. I piani futuri includono ulteriori sedi di data center in:

- Brasile
- Spagna
- REGNO UNITO

Queste espansioni offriranno ancora più opzioni per la localizzazione dei dati, migliorando le prestazioni e le capacità di conformità per gli utenti di diverse regioni.

## Impostazione della regione

Quando si configura l'account Onetime Secret o si configura un dominio personalizzato, è possibile scegliere la regione preferita. Ecco come fare:

1. Per i nuovi account: Selezionare la regione preferita durante il processo di registrazione.
2. Per gli account esistenti: Contattare il nostro team di assistenza per discutere le opzioni di migrazione della regione.
3. Per i domini personalizzati: Specificare la regione prescelta durante la configurazione delle impostazioni DNS (consultare la nostra [Guida all'impostazione dei domini personalizzati] (/docs/custom-domains/setup-guide) per istruzioni dettagliate).

## Domande frequenti

**D: Posso cambiare la mia regione dopo aver creato il mio account?
R: Sì, è possibile cambiare la regione creando un nuovo account con lo stesso indirizzo e-mail e accedendo alla schermata dell'account. Se si ha un abbonamento attivo, l'account verrà aggiornato automaticamente (potrebbe essere necessario aggiornare la pagina).

Attenzione:
- I dati esistenti non vengono trasferiti tra le regioni
- I link segreti creati continueranno a funzionare finché non verranno visualizzati o scadranno.
- Per i link con domini personalizzati, è necessario:
  1. Aggiungere di nuovo il dominio all'account della nuova regione.
  2. Aggiornare i record DNS associati
  3. Quando si aggiunge nuovamente il dominio, utilizzare un sottodominio unico per evitare conflitti con i collegamenti esistenti.
  4. In seguito, potrete aggiungere il vostro dominio preferito (se necessario), in modo da poter iniziare a inviare nuovi link con il vostro dominio preferito.

**D: La scelta della regione influisce sulla sicurezza dei miei segreti?
R: No, tutte le regioni offrono lo stesso elevato livello di sicurezza. La scelta influisce principalmente sulla residenza dei dati e sulla latenza potenziale.

**D: Ci sono differenze di prezzo tra le varie regioni?
R: Attualmente, i nostri prezzi sono coerenti in tutte le regioni. Per informazioni più aggiornate, consultare la nostra [pagina dei prezzi] (https://onetimesecret.com/pricing).

## Hai bisogno di aiuto?

Se non siete sicuri di quale regione scegliere o avete delle domande, non esitate a contattare il nostro team di assistenza. Siamo qui per aiutarvi a prendere la decisione migliore per le vostre esigenze specifiche.

- Email: support@onetimesecret.com
- Modulo di feedback: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Ricordate che la scelta della regione giusta vi garantisce le migliori prestazioni e il rispetto delle normative sui dati durante l'utilizzo di Onetime Secret.
