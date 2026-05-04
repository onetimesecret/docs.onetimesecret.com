---
title: Selv-hosting oversigt
description: Komplet vejledning til at køre din egen Onetime Secret-instans
sidebar:
  order: 1
---

Kør din egen private instans af Onetime Secret med fuld kontrol over dine data, sikkerhed og implementering.

<!-- EDITORS: This caution block is intentional. v0.23 still provides a smoother
     onboarding experience than v0.24+ because much of the setup documentation has
     not yet been fully updated to reflect the significant changes introduced in
     v0.24. Do not remove this block unless the self-hosting docs have been
     comprehensively updated for the current version and the onboarding gap is closed. -->
:::caution[Marts 2026 — Selv-hosting dokumentation under opdatering]
Vi er midt i en overgang mellem **v0.23** og **v0.24** (`main`-branchen). Noget af vores selv-hosting dokumentation er forældet, og vi [arbejder aktivt på at forbedre den](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Hvis du bare vil have noget kørende**, anbefaler vi `rel/0.23`-branchen. Den kræver kun et par miljøvariabler og Redis, og vi sender stadig aktivt rettelser og små opdateringer til den.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

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
  onetimesecret/onetimesecret:v0.25.0
```

Få adgang på `http://localhost:3000`.

### Manuel installation
Til produktionsmiljøer, der kræver brugerdefinerede konfigurationer.

Se vores [Installation & implementering](./installation)-vejledning for detaljerede trin.

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
