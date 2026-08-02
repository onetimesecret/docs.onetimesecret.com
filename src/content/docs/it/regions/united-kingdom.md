---
title: Regno Unito (UK)
description: La regione del data center del Regno Unito di Onetime Secret, situata a Londra.
---

## Infrastruttura

- **Luogo**: Londra, Regno Unito
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Fornitore di hosting**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlandia)
- **CNAME dominio personalizzato**: `identity.ingress.onetime.co` (anycast)

## DNS del dominio personalizzato

Per puntare un dominio personalizzato a questa regione, create un record CNAME:

| Tipo di record | Host                  | Valore                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Da notare che la regione UK utilizza un CNAME anycast anziché un sottodominio specifico per la regione.

Consultate la [Guida all'impostazione del dominio personalizzato](/it/custom-domains/setup-guide) per le istruzioni complete.

## Quadro normativo

Il quadro di protezione dei dati del Regno Unito è disciplinato dal **UK General Data Protection Regulation (UK GDPR)** e dal **Data Protection Act 2018**. Dopo la Brexit, il Regno Unito mantiene un proprio regime di protezione dei dati strettamente allineato al GDPR dell'UE.

### Informazioni sul fornitore di hosting

Questa regione è ospitata da <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, un fornitore europeo di infrastrutture cloud fondato nel 2011 e con sede a Helsinki, Finlandia. In quanto fornitore europeo sovrano, tutti i dati relativi agli account sono archiviati esclusivamente in Finlandia, secondo le normative finlandesi ed europee sulla protezione dei dati. UpCloud gestisce data center in diverse località europee, tra cui Londra, dove è ospitata questa regione.

### Aspetti normativi chiave

- L'Information Commissioner's Office (ICO) funge da autorità di controllo indipendente
- L'UK GDPR mantiene i principi fondamentali e i diritti del GDPR dell'UE, compresi i diritti degli interessati e i requisiti di base giuridica
- Il Regno Unito dispone di una decisione di adeguatezza da parte della Commissione Europea, che consente il libero flusso dei dati dall'UE/SEE
- Il Data Protection Act 2018 integra l'UK GDPR con disposizioni specifiche per le forze dell'ordine e i servizi di intelligence del Regno Unito

## Quando considerare questa regione

- La vostra organizzazione o i vostri utenti si trovano principalmente nel Regno Unito
- Dovete rispettare l'UK GDPR e il Data Protection Act 2018
- Volete la residenza dei dati all'interno del Regno Unito
- Servite clienti che richiedono un trattamento dei dati basato nel Regno Unito
