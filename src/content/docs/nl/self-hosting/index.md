---
title: Overzicht Self-Hosting
description: Complete handleiding voor het draaien van je eigen Onetime Secret-instantie
sidebar:
  order: 1
---

Draai je eigen privé-instantie van Onetime Secret met volledige controle over je gegevens, beveiliging en deployment.

## Waarom Self-Hosting?

Self-hosting van Onetime Secret geeft je:

- **Volledige controle over je gegevens** - Alle secrets blijven op je eigen infrastructuur en netwerk
- **Eigen beveiligingsbeleid** - Configureer authenticatie, privacyopties en toegangscontrole
- **Compliance** - Voldoe aan regelgeving voor gegevensverwerking
- **Eigen branding** - Pas de interface aan voor je organisatie

## Snelstart-opties

Kies de deployment-methode die het beste bij je omgeving past:

### Docker (Aanbevolen)
```bash
# Start Redis en Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.24.7
```

Toegankelijk op `http://localhost:3000`.

### Handmatige installatie
Voor productieomgevingen die aangepaste configuraties vereisen.

Bekijk onze handleiding [Installatie & Deployment](./installation) voor gedetailleerde stappen.

## Wat zit erbij

Je self-hosted instantie bevat:

- **Webinterface** - Volledige UI voor het aanmaken en delen van secrets
- **REST API** - Programmatische toegang voor integraties
- **Meertalige ondersteuning** - Beschikbaar in meer dan 12 talen
- **Eigen domeinen** - Gebruik je eigen domein en branding


## Systeemvereisten

**Aanbevolen:**
- 2+ CPU-cores
- 2GB+ RAM
- 10GB+ schijfruimte
- Redis voor sessieopslag
- Node.js 22+ (voor ontwikkeling)

## Volgende stappen

1. **[Aan de slag](./getting-started)** - Stapsgewijze installatiehandleiding
2. **[Installatie & Deployment](./installation)** - Gedetailleerde deployment-opties
3. **[Configuratiereferentie](./configuration)** - Volledige documentatie van instellingen

---

_Klaar om te beginnen? Volg onze handleiding [Aan de slag](./getting-started)._
