---
title: Migliori pratiche di sicurezza
description: Migliorate la sicurezza della condivisione dei segreti con queste best practice specifiche per Onetime Secret, compresi i vantaggi della sicurezza dei domini personalizzati.
---

# Migliori pratiche di sicurezza per Onetime Secret

Sebbene Onetime Secret sia stato progettato con un occhio di riguardo alla sicurezza, seguire queste best practice può migliorare ulteriormente la protezione delle informazioni sensibili, soprattutto quando si utilizzano funzioni come i domini personalizzati.

## Migliori pratiche per la condivisione dei segreti

1. **Impostare tempi di scadenza adeguati**: Scegliete il tempo di scadenza più breve possibile per i vostri segreti. In questo modo si riduce al minimo la possibilità di accesso non autorizzato.

2. **Utilizzare la protezione della passphrase**: Per le informazioni altamente sensibili, utilizzate la funzione di protezione con passphrase. Questa funzione aggiunge un ulteriore livello di sicurezza, richiedendo al destinatario di inserire una passphrase per visualizzare il segreto.

3. **Compartimentare le informazioni sensibili**: Quando si ha a che fare con dati altamente sensibili, si consiglia di suddividerli in più segreti. In questo modo, se un segreto viene compromesso, l'intero insieme di informazioni rimane protetto.

4. **Utilizzare canali sicuri per la condivisione dei metadati**: Mentre Onetime Secret protegge il contenuto del vostro segreto, fate attenzione a come condividete il link e tutti i metadati associati (come le passphrase). Utilizzate canali sicuri e criptati per questa comunicazione.

5. **Verifica del destinatario**: Assicuratevi di condividere i segreti con il destinatario previsto. Controllate due volte gli indirizzi e-mail o i nomi utente prima di inviarli.

6. **Educare gli utenti**: Se si utilizza Onetime Secret all'interno di un'organizzazione, è necessario educare il team all'uso corretto e alle pratiche di sicurezza specifiche per la condivisione dei segreti.

## Vantaggi per la sicurezza dei domini personalizzati

L'utilizzo di domini personalizzati con Onetime Secret offre diversi vantaggi in termini di sicurezza:

1. **Protezione dal phishing migliorata**: Con un dominio personalizzato, gli utenti si abituano a un URL specifico per la condivisione dei segreti. In questo modo è più facile identificare potenziali tentativi di phishing che potrebbero utilizzare domini dall'aspetto simile.

2. **Miglioramento della fiducia e della legittimità**: Quando i destinatari vedono un dominio familiare, è più probabile che si fidino della fonte del segreto. Ciò è particolarmente importante per le aziende che condividono informazioni sensibili con clienti o partner.

3. **Integrazione perfetta con l'infrastruttura di sicurezza esistente**: Un dominio personalizzato può essere integrato più facilmente con gli strumenti di sicurezza e i sistemi di monitoraggio esistenti, fornendo una visione più completa delle attività di condivisione dei segreti dell'organizzazione.

4. **Conformità e audit**: Per le organizzazioni che operano in settori regolamentati, l'uso di un dominio personalizzato può aiutare a mantenere la conformità, mantenendo le attività di condivisione dei segreti sotto il controllo diretto dell'organizzazione e rendendo più semplici i processi di audit.

Onetime Secret gestisce gli aspetti tecnici della protezione del vostro dominio personalizzato, compresa la configurazione SSL/TLS e il monitoraggio delle attività del dominio, consentendovi di concentrarvi su questi vantaggi strategici per la sicurezza.

## Sicurezza dell'uso dell'API

Se si utilizza l'API Onetime Secret:

1. **Chiavi API sicure**: Conservare le chiavi API in modo sicuro e non esporle mai nel codice lato client o in repository pubblici.

2. **Rotazione delle chiavi API**: Ruotare regolarmente le chiavi API, soprattutto se si sospetta che siano state compromesse.

3. **Limitare l'accesso all'API**: Usare il principio del minimo privilegio quando si imposta l'accesso all'API. Concedete solo le autorizzazioni necessarie per ogni caso d'uso specifico.

## Sicurezza avanzata in self-hosting

Questa sezione tratta le considerazioni avanzate sulla sicurezza per le organizzazioni che gestiscono la propria istanza di Onetime Secret. Il progetto open source è disponibile su [GitHub](https://github.com/onetimesecret/onetimesecret) e le immagini Docker ufficiali su [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

Le raccomandazioni riportate di seguito possono essere implementate a livello di infrastruttura quando si ospita Onetime Secret in modo autonomo:

1. **Utilizzare ambienti effimeri**: Quando è possibile, creare e distruggere ambienti per ogni sessione di condivisione dei segreti. Questo può essere particolarmente utile per le operazioni altamente sensibili. La nostra immagine [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) Docker è stata progettata per casi d'uso effimeri.

2. **Implement Time-Based Restrictions**: Se il vostro caso d'uso lo consente, prendete in considerazione l'implementazione di restrizioni temporali per l'accesso ai segreti, ad esempio solo durante l'orario di lavoro.

3. **Geo-Fencing**: Per le operazioni altamente sensibili, considerate l'implementazione del geo-fencing per limitare l'accesso ai segreti da posizioni geografiche specifiche.

4. **Tracce di audit**: Mantenere tracce di audit dettagliate della creazione di segreti e dei tentativi di accesso. Questo può essere fondamentale per la risposta agli incidenti e per i requisiti di conformità.

5. **Cifratura a riposo**: Sebbene Onetime Secret gestisca la crittografia, per i dati altamente sensibili si consiglia di crittografare il contenuto prima di creare il segreto per ottenere un ulteriore livello di protezione.


## Risposta all'incidente

Questa sezione illustra le raccomandazioni generali sulla sicurezza che possono essere utili per la vostra organizzazione. Queste raccomandazioni non sono caratteristiche specifiche del nostro servizio.

1. **Avere un piano**: Sviluppate un piano di risposta agli incidenti specifico per i vostri processi di condivisione dei segreti. Questo dovrebbe includere le fasi di revoca dell'accesso, di notifica alle parti interessate e di mitigazione dei danni potenziali.

2. **Azione rapida**: Se si sospetta che un segreto sia stato compromesso, utilizzare immediatamente la funzione di masterizzazione di Onetime Secret se il segreto non è ancora stato visualizzato. Se è stato visualizzato, adottare le misure appropriate per ridurre i danni potenziali.

3. **Riprese di sicurezza periodiche**: Rivedete periodicamente le vostre pratiche di condivisione dei segreti e modificate le misure di sicurezza se necessario.

---

Seguendo queste best practice, è possibile migliorare notevolmente la sicurezza delle attività di condivisione dei segreti su Onetime Secret. Ricordate che la sicurezza è un processo continuo e che rimanere vigili è fondamentale per proteggere le vostre informazioni sensibili.

Per qualsiasi problema di sicurezza o per segnalare potenziali vulnerabilità, contattare immediatamente il nostro team di sicurezza all'indirizzo security@onetimesecret.com.
