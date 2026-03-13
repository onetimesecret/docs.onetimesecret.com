---
title: Overzicht selfhosting
description: Volledige gids voor het draaien van je eigen Onetime Secret-instantie
sidebar:
  order: 1
---

Draai je eigen privé-instantie van Onetime Secret met volledige controle over je gegevens, beveiliging en implementatie.

:::caution[Maart 2026 — Selfhosting-documentatie in transitie]
We zitten midden in de overgang tussen **v0.23** en **v0.24** (de `main`-branch). Een deel van onze selfhosting-documentatie is verouderd en we zijn [actief bezig dit te verbeteren](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Als je gewoon iets draaiend wilt krijgen**, raden we de `rel/0.23`-branch aan. Deze heeft slechts een paar omgevingsvariabelen en Redis nodig, en we pushen er nog steeds actief fixes en kleine updates naartoe.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Waarom selfhosten?

Selfhosting van Onetime Secret geeft je:

- **Volledige controle over je gegevens** - Alle geheimen blijven op je eigen infrastructuur en netwerk
- **Aangepast beveiligingsbeleid** - Configureer authenticatie, privacyopties en toegangscontroles
- **Compliance** - Voldoe aan regelgeving voor gegevensverwerking
- **Aangepaste huisstijl** - Pas de interface aan voor je organisatie

## Snelstart-opties

Kies de implementatiemethode die het beste past bij je omgeving:

### Docker (aanbevolen)
```bash
# Start Redis en Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Toegankelijk op `http://localhost:3000`.

### Handmatige installatie
Voor productieomgevingen die aangepaste configuraties vereisen.

Zie onze gids [Installatie en implementatie](./installation) voor gedetailleerde stappen.

## Wat zit erin

Je selfhosted instantie bevat:

- **Webinterface** - Volledige UI voor het aanmaken en delen van geheimen
- **REST API** - Programmatische toegang voor integraties
- **Meertalige ondersteuning** - Beschikbaar in meer dan 12 talen
- **Aangepaste domeinen** - Gebruik je eigen domein en huisstijl


## Systeemvereisten

**Aanbevolen:**
- 2+ CPU-cores
- 2GB+ RAM
- 10GB+ schijfruimte
- Redis voor sessieopslag
- Node.js 22+ (voor ontwikkeling)

## Volgende stappen

1. **[Aan de slag](./getting-started)** - Stapsgewijze installatiegids
2. **[Installatie en implementatie](./installation)** - Gedetailleerde implementatieopties
3. **[Configuratiereferentie](./configuration)** - Volledige documentatie van instellingen

---

_Klaar om te beginnen? Volg onze gids [Aan de slag](./getting-started)._
