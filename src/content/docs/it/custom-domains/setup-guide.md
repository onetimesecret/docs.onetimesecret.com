---
title: Guida all'installazione
description: Questa guida vi guiderà attraverso il processo di impostazione di un dominio personalizzato per il vostro account Onetime Secret, comprese le differenze tra i sottodomini e i domini apex, e la scelta della regione del data center preferita.
---

# Guida all'impostazione del dominio personalizzato

## Prerequisiti

- Un account Onetime Secret attivo con funzione di dominio personalizzato abilitata
- Un dominio di cui si è proprietari e per il quale si possono gestire le impostazioni DNS

## Comprendere i tipi di dominio

Prima di impostare il dominio personalizzato, è importante capire la differenza tra sottodomini e domini apex:

1. **Sottodominio**: Una suddivisione del dominio principale (ad esempio, secrets.yourdomain.com).
2. **Dominio apicale**: Il dominio principale stesso (ad esempio, yourdomain.com).

## Scegli la tua regione

Onetime Secret offre due regioni di data center: UE e USA. Quando si configura un dominio personalizzato, è necessario scegliere la regione preferita per l'archiviazione dei dati. Questa scelta è importante per diversi motivi:

- Per gli individui**: Potete scegliere in base alle vostre preferenze personali, come la vicinanza per un accesso potenzialmente più rapido o le preoccupazioni relative alla sovranità dei dati personali.
- Per le aziende**: La scelta può dipendere dagli obblighi di localizzazione dei dati, come la conformità al GDPR, alle linee guida statali o provinciali. Assicuratevi di selezionare la regione che meglio si allinea ai vostri requisiti normativi.

Nel fare questa scelta, tenete conto delle vostre esigenze e dei vostri requisiti specifici. Per informazioni più dettagliate sulle regioni dei nostri data center e su come scegliere quella giusta per le vostre esigenze, consultate la nostra guida [Data Center Regions](regions).

## Passo 1: accedere al cruscotto dei domini

1. Accedere al proprio account Onetime Secret
2. Navigare in Dashboard > Domini personalizzati
3. Fare clic su "Aggiungi dominio".

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Vista dei domini personalizzati" width="400" />

## Passo 2: Inserire il proprio dominio

1. Nelle impostazioni del dominio personalizzato, inserire il dominio desiderato (ad esempio, secrets.yourdomain.com o yourdomain.com).
2. Fare clic su "Aggiungi dominio" o su un pulsante equivalente per procedere.

## Passo 3: Configurare le impostazioni DNS

Per collegare il dominio, è necessario aggiornare le impostazioni DNS. La procedura varia leggermente a seconda che si utilizzi un sottodominio o un dominio apex e della regione del data center scelta.

### Per i sottodomini (consigliato)

1. Accedere al pannello di gestione DNS del proprio dominio (tramite la società di registrazione del dominio o il provider DNS).
2. Create un record CNAME con i seguenti dettagli:
   - Host: Il sottodominio scelto (ad es., secrets)
   - Punta a / Valore:
     - Per la regione UE: identity.eu.onetime.co
     - Per la regione USA: identity.us.onetime.co
3. Rimuovere tutti i record A, AAAA o CNAME esistenti per lo stesso sottodominio.

### Per i domini Apex

1. Accedere al pannello di gestione DNS del proprio dominio
2. Create o modificate un record A con i seguenti dettagli:
   - Host: @ (o lasciare vuoto, a seconda del vostro provider DNS)
   - Punti a / Valore:
     - Per la regione UE: 109.105.217.207
     - Per la regione USA: 66.51.126.41

Importante: assicurarsi che non vi siano record in conflitto per il dominio in uso.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Impostazioni di dominio personalizzate" width="400" />

### Maggiori informazioni

#### Perché CNAME per i sottodomini?

Si consiglia di utilizzare i record CNAME per i sottodomini perché:

1. Sono più flessibili e ci permettono di cambiare gli indirizzi IP dei nostri server senza richiedere l'aggiornamento delle impostazioni DNS.
2. Si adattano automaticamente a qualsiasi modifica apportata alla nostra infrastruttura.

#### Perché i record A di Apex Domains?

I domini Apex non possono utilizzare i record CNAME a causa degli standard DNS. Pertanto, è necessario utilizzare i record A, che presentano alcune limitazioni:

1. Se cambiamo il nostro indirizzo IP (cosa rara), dovrete aggiornare manualmente le impostazioni DNS.
2. Non si adattano automaticamente ai cambiamenti della nostra infrastruttura.

## Passo 4: verificare il dominio e attendere l'SSL

1. Dopo aver aggiornato le impostazioni DNS, tornate alla pagina del dominio personalizzato Onetime Secret.
2. Il sistema tenterà automaticamente di verificare il dominio
3. La generazione del certificato SSL inizierà una volta che la verifica avrà avuto esito positivo.
4. Il processo potrebbe richiedere alcuni minuti per essere completato

## Passo 5: Confermare l'impostazione

Una volta completata l'impostazione, dovrebbero essere visualizzate le seguenti informazioni:

- Stato del dominio: Attivo con SSL
- Indirizzo di destinazione: identity.eu.onetime.co o identity.us.onetime.co (a seconda della regione scelta)
- Stato SSL: Attivo
- Data di rinnovo SSL: (verrà visualizzata, in genere a circa un anno dalla configurazione)

## Risoluzione dei problemi

- Se la verifica non riesce, ricontrollare le impostazioni DNS.
- Assicuratevi di aver rimosso tutti i record in conflitto.
- La propagazione DNS può richiedere fino a 24 ore, anche se di solito è molto più rapida.

## Utilizzo del dominio personalizzato

Una volta attivi, i link segreti utilizzeranno il dominio personalizzato. Ad esempio:
`https://secrets-example.onetime.dev/secret/abc123`

## Ti abbiamo coperto

Noi ci occupiamo del resto dei dettagli tecnici in modo che non dobbiate farlo voi.

- Monitoriamo costantemente lo stato del vostro dominio
- I certificati SSL vengono rinnovati automaticamente senza che sia necessaria alcuna azione da parte vostra

Per coloro che amano tenersi informati, è possibile controllare facilmente lo stato di salute del proprio dominio:

- Basta guardare il timestamp "Last Monitored" nel dashboard per confermare la connettività in corso.

## Domande o bisogno di assistenza?

Siamo qui per aiutarvi. Se avete domande o bisogno di assistenza:

- Inviateci un'e-mail direttamente a support@onetimesecret.com
- Utilizzate il nostro modulo di feedback all'indirizzo https://onetimesecret.com/feedback

Il nostro team si impegna a fornirvi il miglior supporto possibile per la configurazione e l'utilizzo del vostro dominio personalizzato, compresa la guida alla scelta della regione del data center più adatta alle vostre esigenze.
