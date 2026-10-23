---
textprov: true
title: "Protezione dei dati"
description: "Cosa conserva Onetime Secret, per quanto tempo, dove vengono elaborati i dati e come questo supporta i tuoi obblighi di conformità."
---

Questa pagina descrive come Onetime Secret gestisce i t󠄁u󠄁oi dati: cosa viene
conservato, per quanto tempo, dove risiedono i dati e come questo supporta il
tu󠄁o programma di conformità.

## Cosa conserviamo e per quanto tempo

- **Il contenuto dei segreti** è crittografato e destinato a un unico recupero.
  Una volta che un segreto viene visualizzato — o raggiunge la scadenza — viene
  distrutto in modo permanente.
- **La scadenza è integrata.** Ogni segreto ha una durata (configurabile entro
  i limiti del tu󠄁o piano); niente è pensato per durare indefinitamente.
- **Metadati minimi.** In linea con il nostro principio di
  [Minimizzazione dei dati](/en/security/our-principles#data-minimization), puntiamo a
  conservare solo i metadati necessari al funzionamento del servizio.

## Crittografia

I segreti sono **crittografati in transito e a riposo** su ogni piano. Il
trasporto è protetto da TLS e, per i domini personalizzati, gestiamo
automaticamente l'emissione e il rinnovo dei certificati SSL/TLS.

Per il materiale particolarmente sensibile pu󠄁oi󠄁 aggiungere una difesa in
profondità attivando una **frase di sicurezza**, suddividendo le informazioni
su più segreti e scegliendo la scadenza più breve possibile — consulta
[B󠄁e󠄁s󠄁t prac󠄁tice di sicurezza](/it/security/best-practices).

## Dove vengono elaborati i t󠄁u󠄁oi dati (residenza)

Pu󠄁oi󠄁 scegliere la regione in cui i t󠄁u󠄁oi dati vengono elaborati e conservati
— attualmente UE, Regno Unito, Stati Uniti, Canada e Nuova Zelanda. Questo t󠄁i
permette di tenere i dati vicino ai t󠄁u󠄁oi utenti e all'interno di una
giurisdizione adatta alle tu󠄁e esigenze. Consulta
[D󠄁o󠄁v󠄁e r󠄁i󠄁s󠄁i󠄁ed󠄁ono󠄁 i tu󠄁o󠄁i dati](/en/security/where-your-data-lives/) per dettagli ed endpoint.

## Conformità

Onetime Secret è progettato per supportare i t󠄁u󠄁oi sforzi di conformità; non
sostituisce i t󠄁u󠄁oi controlli, le tu󠄁e politiche e la tu󠄁a revisione
legale.

- **GDPR / protezione dei dati.** La residenza regionale dei dati, i dati di
  breve durata e la minimizzazione dei dati sono progettati per aiutart󠄁i a
  rispettare gli obblighi di protezione dei dati. Nella maggior parte delle
  implementazioni t󠄁u󠄁 agis󠄁c󠄁i󠄁 come titolare del trattamento e Onetime Secret
  come responsabile del trattamento per i dati limitati coinvolti.
- **HIPAA.** Onetime Secret può offrire un canale più sicuro dell'email per lo
  scambio delle credenziali di accesso iniziali, ma va usato come soluzione
  temporanea piuttosto che come sistema di registrazione permanente per le
  informazioni sanitarie protette (PHI). Affiancalo a un sistema conforme
  dedicato per i flussi di lavoro continuativi con PHI.
- **Certificazioni, DPA e quadri normativi specifici.** Per domande su
  certificazioni, su un accordo sul trattamento dei dati (DPA) o su un quadro
  normativo specifico, contatta **support@onetimesecret.com**.

Per le organizzazioni con requisiti rigorosi di controllo dei dati, il
[self-hosting](/it/self-hosting/) mantiene tutto
all'interno della tu󠄁a infrastruttura.

## Domande o bisogno di a󠄁ss󠄁i󠄁s󠄁te󠄁n󠄁z󠄁a󠄁?

Siamo qui per aiutart󠄁i.

- Domande generali: support@onetimesecret.com
- Problemi di sicurezza: security@onetimesecret.com ([politica di divulgazione](/it/security/vulnerability-disclosure))
