---
title: Protezione dei dati
description: Cosa conserva Onetime Secret, per quanto tempo, dove vengono elaborati i dati e come questo supporta i vostri obblighi di conformità.
---

Questa pagina descrive come Onetime Secret gestisce i vostri dati: cosa viene
conservato, per quanto tempo, dove risiedono i dati e come questo supporta il
vostro programma di conformità.

## Cosa conserviamo e per quanto tempo

- **Il contenuto dei segreti** è crittografato e destinato a un unico recupero.
  Una volta che un segreto viene visualizzato — o raggiunge la scadenza — viene
  distrutto in modo permanente.
- **La scadenza è integrata.** Ogni segreto ha una durata (configurabile entro
  i limiti del vostro piano); niente è pensato per durare indefinitamente.
- **Metadati minimi.** In linea con il nostro principio di
  [Minimizzazione dei dati](/it/principles/data-minimization), puntiamo a
  conservare solo i metadati necessari al funzionamento del servizio.

## Crittografia

I segreti sono **crittografati in transito e a riposo** su ogni piano. Il
trasporto è protetto da TLS e, per i domini personalizzati, gestiamo
automaticamente l'emissione e il rinnovo dei certificati SSL/TLS.

Per il materiale particolarmente sensibile potete aggiungere una difesa in
profondità attivando una **frase di sicurezza**, suddividendo le informazioni
su più segreti e scegliendo la scadenza più breve possibile — consultate
[Migliori pratiche di sicurezza](/it/security-best-practices).

## Dove vengono elaborati i vostri dati (residenza)

Potete scegliere la regione in cui i vostri dati vengono elaborati e conservati
— attualmente UE, Regno Unito, Stati Uniti, Canada e Nuova Zelanda. Questo vi
permette di tenere i dati vicino ai vostri utenti e all'interno di una
giurisdizione adatta alle vostre esigenze. Consultate
[Regioni dei centri dati](/it/regions) per dettagli ed endpoint.

## Conformità

Onetime Secret è progettato per supportare i vostri sforzi di conformità; non
sostituisce i vostri controlli, le vostre politiche e la vostra revisione
legale.

- **GDPR / protezione dei dati.** La residenza regionale dei dati, i dati di
  breve durata e la minimizzazione dei dati sono progettati per aiutarvi a
  rispettare gli obblighi di protezione dei dati. Nella maggior parte delle
  implementazioni voi agite come titolare del trattamento e Onetime Secret
  come responsabile del trattamento per i dati limitati coinvolti.
- **HIPAA.** Come indicato nei nostri [casi d'uso](/it/custom-domains/use-cases),
  Onetime Secret può offrire un canale più sicuro dell'email per lo scambio
  delle credenziali di accesso iniziali, ma va usato come soluzione temporanea
  piuttosto che come sistema di registrazione permanente per le informazioni
  sanitarie protette (PHI). Affiancatelo a un sistema conforme dedicato per i
  flussi di lavoro continuativi con PHI.
- **Certificazioni, DPA e quadri normativi specifici.** Per domande su
  certificazioni, su un accordo sul trattamento dei dati (DPA) o su un quadro
  normativo specifico, contattate **support@onetimesecret.com**.

Per le organizzazioni con requisiti rigorosi di controllo dei dati, il
[self-hosting](https://github.com/onetimesecret/onetimesecret) mantiene tutto
all'interno della vostra infrastruttura.

## Domande o bisogno di supporto?

Siamo qui per aiutarvi.

- Domande generali: support@onetimesecret.com
- Problemi di sicurezza: security@onetimesecret.com ([politica di divulgazione](/it/security/vulnerability-disclosure))
