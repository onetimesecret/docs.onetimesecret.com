---
title: Panoramica del Self-Hosting
description: Guida completa per gestire la tua istanza di Onetime Secret
sidebar:
  order: 1
---

Gestisci la tua istanza privata di Onetime Secret con il pieno controllo su dati, sicurezza e distribuzione.

:::caution[Marzo 2026 — Documentazione sul self-hosting in transizione]
Siamo nel mezzo della transizione tra **v0.23** e **v0.24** (il branch `main`). Parte della nostra documentazione sul self-hosting non è aggiornata e stiamo [lavorando attivamente per migliorarla](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Se vuoi semplicemente far funzionare qualcosa**, ti consigliamo il branch `rel/0.23`. Richiede solo un paio di variabili d'ambiente e Redis, e continuiamo a pubblicare correzioni e piccoli aggiornamenti.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Perché il self-hosting?

Il self-hosting di Onetime Secret ti offre:

- **Controllo completo dei dati** - Tutti i segreti restano sulla tua infrastruttura e rete
- **Policy di sicurezza personalizzate** - Configura autenticazione, opzioni di privacy e controlli di accesso
- **Conformità** - Soddisfa i requisiti normativi per la gestione dei dati
- **Branding personalizzato** - Personalizza l'interfaccia per la tua organizzazione

## Opzioni di avvio rapido

Scegli il metodo di distribuzione più adatto al tuo ambiente:

### Docker (consigliato)
```bash
# Avvia Redis e Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Accedi su `http://localhost:3000`.

### Installazione manuale
Per ambienti di produzione che richiedono configurazioni personalizzate.

Consulta la nostra guida [Installazione e distribuzione](./installation) per i passaggi dettagliati.

## Cosa include

La tua istanza self-hosted include:

- **Interfaccia web** - UI completa per creare e condividere segreti
- **REST API** - Accesso programmatico per le integrazioni
- **Supporto multilingua** - Disponibile in oltre 12 lingue
- **Domini personalizzati** - Usa il tuo dominio e branding

## Requisiti di sistema

**Consigliati:**
- 2+ core CPU
- 2GB+ RAM
- 10GB+ spazio su disco
- Redis per la memorizzazione delle sessioni
- Node.js 22+ (per lo sviluppo)

## Passi successivi

1. **[Per iniziare](./getting-started)** - Guida alla configurazione passo dopo passo
2. **[Installazione e distribuzione](./installation)** - Opzioni di distribuzione dettagliate
3. **[Riferimento configurazione](./configuration)** - Documentazione completa delle impostazioni

---

_Pronto per iniziare? Segui la nostra guida [Per iniziare](./getting-started)._
