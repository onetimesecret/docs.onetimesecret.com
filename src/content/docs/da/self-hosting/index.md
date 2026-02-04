---
title: Selv-hosting oversigt
description: Komplet vejledning til at køre din egen Onetime Secret-instans
sidebar:
  order: 1
---

Kør din egen private instans af Onetime Secret med fuld kontrol over dine data, sikkerhed og implementering.

## Hvorfor selv-hoste?

Selv-hosting af Onetime Secret giver dig:

- **Komplet datakontrol** - Alle beskeder forbliver på din infrastruktur og netværk
- **Brugerdefinerede sikkerhedspolitikker** - Konfigurer godkendelse, privatlivsindstillinger og adgangskontrol
- **Overholdelse** - Opfyld regulatoriske krav til datahåndtering
- **Brugerdefineret branding** - Tilpas grænsefladen til din organisation

## Hurtig start muligheder

Vælg den implementeringsmetode, der passer bedst til dit miljø:

### Docker (anbefalet)
```bash
# Start Redis og Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Få adgang på `http://localhost:3000`.

### Manuel installation
Til produktionsmiljøer, der kræver brugerdefinerede konfigurationer.

Se vores [Installation & implementering](./self-hosting/installation)-vejledning for detaljerede trin.

## Hvad er inkluderet

Din selv-hostede instans inkluderer:

- **Webgrænseflade** - Fuld funktionel UI til oprettelse og deling af beskeder
- **REST API** - Programmatisk adgang til integrationer
- **Multi-sprog support** - Tilgængelig på 12+ sprog
- **Brugerdefinerede domæner** - Brug dit eget domæne og branding

## Systemkrav

**Anbefalet:**
- 2+ CPU-kerner
- 2GB+ RAM
- 10GB+ diskplads
- Redis til sessionslagring
- Node.js 22+ (til udvikling)

## Næste trin

1. **[Kom i gang](./getting-started)** - Trinvis opsætningsvejledning
2. **[Installation & implementering](./installation)** - Detaljerede implementeringsmuligheder
3. **[Konfigurationsreference](./configuration)** - Komplet indstillingsdokumentation

---

_Klar til at komme i gang? Følg vores [Kom i gang](./getting-started)-vejledning._
