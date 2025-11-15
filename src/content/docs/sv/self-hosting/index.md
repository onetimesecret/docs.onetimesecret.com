---
title: Översikt över självhosting
description: Komplett guide för att köra din egen Onetime Secret-instans
sidebar:
  order: 1
---

Kör din egen privata instans av Onetime Secret med full kontroll över din data, säkerhet och distribution.

## Varför självhosta?

Självhosting av Onetime Secret ger dig:

- **Fullständig datakontroll** - Alla hemligheter förblir på din infrastruktur och nätverk
- **Anpassade säkerhetspolicyer** - Konfigurera autentisering, integritetsalternativ och åtkomstkontroller
- **Efterlevnad** - Möt regulatoriska krav för datahantering
- **Anpassad varumärkning** - Anpassa gränssnittet för din organisation

## Snabbstartsalternativ

Välj den distributionsmetod som bäst passar din miljö:

### Docker (rekommenderas)
```bash
# Starta Redis och Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Åtkomst på `http://localhost:3000`.

### Manuell installation
För produktionsmiljöer som kräver anpassade konfigurationer.

Se vår guide för [Installation & distribution](./self-hosting/installation) för detaljerade steg.

## Vad ingår

Din självhostade instans inkluderar:

- **Webbgränssnitt** - Fullfjädrat UI för att skapa och dela hemligheter
- **REST API** - Programmatisk åtkomst för integrationer
- **Flerspråksstöd** - Tillgänglig på 12+ språk
- **Anpassade domäner** - Använd din egen domän och varumärkning

## Systemkrav

**Rekommenderat:**
- 2+ CPU-kärnor
- 2GB+ RAM
- 10GB+ diskutrymme
- Redis för sessionslagring
- Node.js 22+ (för utveckling)

## Nästa steg

1. **[Komma igång](./self-hosting/getting-started)** - Steg-för-steg-installationsguide
2. **[Installation & distribution](./self-hosting/installation)** - Detaljerade distributionsalternativ
3. **[Konfigurationsreferens](./self-hosting/configuration)** - Komplett inställningsdokumentation

---

_Redo att börja? Följ vår guide för [Komma igång](./self-hosting/getting-started)._
