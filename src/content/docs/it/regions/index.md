---
title: Regioni dei centri dati
description: Scopri le regioni dei data center di Onetime Secret e come scegliere quella giusta per le tue esigenze.
---

Onetime Secret offre cinque regioni di data center: Canada (CA), Unione Europea (EU), Aotearoa Nuova Zelanda (NZ), Regno Unito (UK) e Stati Uniti (US). Questa guida vi aiuterà a capire l'importanza della selezione della regione e a scegliere quella giusta per le vostre esigenze.

## Perché la selezione della regione è importante

Scegliere la regione giusta per il data center è fondamentale per diversi motivi:

1. **Sovranità dei dati**: Regioni diverse hanno leggi e regolamenti diversi in materia di protezione dei dati.
2. **Latenza**: La scelta di una regione più vicina alla vostra base di utenti principale può ridurre la latenza.
3. **Conformità**: Alcune organizzazioni hanno requisiti specifici su dove possono essere archiviati i loro dati.

## Regioni disponibili

| Regione | Luogo | URL |
|--------|----------|-----|
| [Canada (CA)](/it/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Unione Europea (EU)](/it/regions/european-union) | Norimberga | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nuova Zelanda (NZ)](/it/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Regno Unito (UK)](/it/regions/united-kingdom) | Londra | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Stati Uniti (US)](/it/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Ogni pagina di regione include dettagli sul contesto normativo locale e su quando quella regione può essere rilevante per il vostro caso d'uso.

## Architettura Share-Nothing

Onetime Secret utilizza un'architettura share-nothing, che garantisce il completo isolamento dei dati tra le regioni:

- **Account separati**: La creazione di un account su qualsiasi dominio regionale è completamente separata dagli account su altri domini, anche se si utilizza lo stesso indirizzo e-mail.
- **Nessuna operazione tra data center**: Non è possibile eseguire operazioni (come la distruzione di un segreto) tra data center diversi. Ogni data center mantiene il proprio insieme di segreti e dati utente.
- **Fatturazione coerente per gli utenti a pagamento**: Per gli account a pagamento, anche se nessun dato utente viene condiviso tra i data center, lo stato del vostro abbonamento è riconosciuto in tutte le regioni tramite il nostro fornitore di pagamenti, Stripe.

## Come scegliere la regione

Considerate i seguenti fattori nella scelta della vostra regione di data center:

### Senza un account

- Le richieste a onetimesecret.com possono essere indirizzate a qualsiasi data center attivo.
- Potete scegliere una regione specifica navigando direttamente verso un dominio regionale (ad es. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Il link generato identifica sempre la regione (ad es. `us.onetimesecret.com/secret/abcd1234`).

### Con un account

- Quando create un account, scegliete una regione di data center. Tutti i piani — gratuiti e a pagamento — hanno accesso a ogni regione.
- Accedete dallo stesso dominio regionale in cui vi siete registrati (ad es. se vi siete registrati su `eu.onetimesecret.com`, è lì che dovete accedere).

### Considerazioni aggiuntive

1. **Per gli individui**:
   - Preferenza personale
   - Vicinanza alla propria posizione per un accesso potenzialmente più rapido
   - Preoccupazioni relative alla sovranità dei dati personali

2. **Per le aziende**:
   - Requisiti legali e normativi
   - Ubicazione della base clienti principale
   - Esigenze di conformità specifiche del settore

3. **Considerazioni tecniche**:
   - Requisiti di latenza per la vostra applicazione
   - Integrazione con altri servizi o sistemi

## Piani futuri

Lavoriamo continuamente per espandere le nostre opzioni di data center. I piani futuri includono ulteriori sedi di data center in:

- Australia
- Brasile
- Giappone
- Messico
- Norvegia
- Corea del Sud

Queste espansioni offriranno ancora più opzioni per la localizzazione dei dati, migliorando le prestazioni e le capacità di conformità per gli utenti nelle diverse regioni.


## Domande frequenti

**D: Posso cambiare la mia regione dopo aver configurato il mio account?**
R: Sì. Consultate [Cambiare regione](/it/regions/switching-regions) per istruzioni passo-passo che coprono gli account gratuiti, gli abbonamenti a pagamento e la migrazione dei domini personalizzati.

**D: La scelta della regione influisce sulla sicurezza dei miei segreti?**
R: No, tutte le regioni offrono lo stesso elevato livello di sicurezza. La scelta influisce principalmente sulla residenza dei dati e sulla latenza potenziale.

**D: Ci sono differenze di prezzo tra le regioni?**
R: I prezzi sono specifici per ciascuna regione — potete pagare nella vostra valuta locale e Stripe gestisce automaticamente la conversione valutaria. I piani Identity Plus includono domini personalizzati illimitati su tutti i data center con un unico abbonamento. Consultate la nostra [pagina dei prezzi](https://onetimesecret.com/pricing) per le informazioni più aggiornate.

## Hai bisogno di aiuto?

Se non siete sicuri di quale regione scegliere o avete delle domande, non esitate a contattare il nostro team di assistenza. Siamo qui per aiutarvi a prendere la decisione migliore per le vostre esigenze specifiche.

- Email: support@onetimesecret.com
- Modulo di feedback: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Ricordate che la scelta della regione giusta vi garantisce le migliori prestazioni e il rispetto delle normative sui dati pertinenti durante l'utilizzo di Onetime Secret.
