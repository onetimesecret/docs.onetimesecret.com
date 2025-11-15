---
title: Kom i gang
description: Hurtig opsætningsvejledning til at få din selv-hostede Onetime Secret-instans kørende
sidebar:
  order: 2
---

Denne vejledning vil få dig op at køre med en selv-hostet Onetime Secret-instans på få minutter.

## Forudsætninger

- **1GB+ RAM** til optimal ydeevne
- **Redis-lagringsnotat**: Afhængigt af din Redis-konfiguration kan beskeder gemmes helt i hukommelsen uden nogensinde at blive skrevet til disk for forbedret sikkerhed

## Metode 1: Docker (anbefalet)

Den hurtigste måde at komme i gang på bruger Docker med minimal konfiguration.

### 1. Start Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Generer hemmelig nøgle

```bash
# Generer og gem en vedvarende hemmelig nøgle
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Secret key saved to .ots_secret (keep this file secure!)"
```

### 3. Kør Onetime Secret

```bash
# Kør containeren ved hjælp af den hemmelige nøgle
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Få adgang til din instans

Åbn din browser til:
- **Webgrænseflade**: http://localhost:3000
- **API-endpoint**: http://localhost:3000/api/v2/status

## Metode 2: Manuel installation

For dem, der foretrækker manuel opsætning, skal du bruge:

- **Ruby 3.2+** (kan muligvis ikke være tilgængelig i standard systempakker)
- **Redis 5+** eller **Valkey** (Redis-alternativ)
- **Node.js 22+** og **pnpm** (kun påkrævet til udvikling og opbygning af frontend-aktiver)

Du skal bygge frontend-aktiverne med `pnpm install && pnpm run build:local` før du kører applikationen.

Se [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) for komplette manuelle installationsdetaljer.

## Verificering

1. Naviger til http://localhost:3000
2. Opret en testbesked for at verificere, at alt fungerer
3. Tjek API-status på http://localhost:3000/api/v2/status

## Admin-opsætning

For at oprette en admin-bruger skal du tilføje e-mailadresser til `:colonels:`-sektionen i din konfigurationsfil og derefter tilmelde dig med en af disse e-mails for automatisk at få admin-adgang.

**Bemærk**: Admin-området har i øjeblikket begrænset funktionalitet - det er skrivebeskyttet konfigurationsvisning uden brugerstyring. Flere funktioner er planlagt til fremtidige udgivelser.

## Næste trin

Nu hvor din instans kører:

1. **[Konfigurer din implementering](./installation)** til produktionsbrug
2. **[Gennemgå konfigurationsmuligheder](./configuration)** til tilpasning

## Få hjælp

- **Dokumentation**: Gennemse vores [konfigurationsreference](./configuration)
- **Community**: Deltag i diskussioner på [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Problemer**: Rapporter fejl på vores [issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
