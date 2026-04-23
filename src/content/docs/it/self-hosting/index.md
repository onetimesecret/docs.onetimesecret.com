---
title: Panoramica del self-hosting
description: Guida completa per eseguire la vostra istanza di Onetime Secret
sidebar:
  order: 1
---

Eseguite la vostra istanza privata di Onetime Secret con il pieno controllo sui vostri dati, la sicurezza e il deployment.

## Perché il self-hosting?

Il self-hosting di Onetime Secret vi offre:

- **Controllo completo sui dati** - Tutti i segreti rimangono sulla vostra infrastruttura e rete
- **Policy di sicurezza personalizzate** - Configurate l'autenticazione, le opzioni di privacy e i controlli di accesso
- **Conformità** - Soddisfate i requisiti normativi per la gestione dei dati
- **Branding personalizzato** - Personalizzate l'interfaccia per la vostra organizzazione

## Opzioni di avvio rapido

Scegliete il metodo di deployment più adatto al vostro ambiente:

### Docker (Consigliato)
```bash
# Avviate Redis e Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.24.7
```

Accessibile all'indirizzo `http://localhost:3000`.

### Installazione manuale
Per ambienti di produzione che richiedono configurazioni personalizzate.

Consultate la nostra guida [Installazione e deployment](./installation) per i passaggi dettagliati.

## Cosa è incluso

La vostra istanza self-hosted include:

- **Interfaccia web** - UI completa per creare e condividere segreti
- **REST API** - Accesso programmatico per le integrazioni
- **Supporto multilingua** - Disponibile in oltre 12 lingue
- **Domini personalizzati** - Utilizzate il vostro dominio e branding

## Requisiti di sistema

**Consigliati:**
- 2+ core CPU
- 2GB+ RAM
- 10GB+ spazio su disco
- Redis per l'archiviazione delle sessioni
- Node.js 22+ (per lo sviluppo)

## Prossimi passi

1. **[Per iniziare](./getting-started)** - Guida passo passo alla configurazione
2. **[Installazione e deployment](./installation)** - Opzioni di deployment dettagliate
3. **[Riferimento configurazione](./configuration)** - Documentazione completa delle impostazioni

---

_Pronti per iniziare? Seguite la nostra guida [Per iniziare](./getting-started)._
