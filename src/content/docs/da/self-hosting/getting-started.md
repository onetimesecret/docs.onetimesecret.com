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
  onetimesecret/onetimesecret:v0.26.4
```

### 4. Få adgang til din instans

Åbn din browser til:
- **Webgrænseflade**: http://localhost:3000
- **API-endpoint**: http://localhost:3000/api/v2/status

## Metode 2: Manuel installation

For dem, der foretrækker manuel opsætning, skal du bruge:

- **Ruby 3.4+** (ikke tilgængelig i standard systempakker — brug [rbenv](https://github.com/rbenv/rbenv) eller [mise](https://mise.jdx.dev/) til installation)
- **Redis 7+** eller **Valkey** (Redis-alternativ)
- **Node.js 22+** og **pnpm** (kun påkrævet til udvikling og opbygning af frontend-aktiver)

Efter at have klonet repositoriet, kør initialiseringsscriptet og byg frontend-aktiverne:

```bash
bin/setup --init
cp .env.example .env
pnpm install && pnpm run build:local
```

For at starte applikationen:

```bash
source .env.sh  # eksporterer .env-variabler til den aktuelle shell
bundle exec puma -C etc/puma.rb
```

Eller ved hjælp af Procfile-runneren:

```bash
source .env.sh  # eksporterer .env-variabler til den aktuelle shell
bundle exec foreman start -f Procfile.production
```

Se [README](https://github.com/onetimesecret/onetimesecret#readme) for komplette manuelle installationsdetaljer.

## Verificering

1. Naviger til http://localhost:3000
2. Opret en testbesked for at verificere, at alt fungerer
3. Tjek API-status på http://localhost:3000/api/v2/status

## Admin-opsætning

Når Valkey/Redis kører, og din `.env` er indlæst i shellen (`set -a; source .env; set +a`), kan du oprette en admin-konto direkte:

```bash
bundle exec bin/ots customers create admin@example.com --role colonel
```

Dette opretter en verificeret konto og udskriver en engangsgenereret adgangskode — gem den — medmindre du angiver `--password`. Det virker i både simpel og fuld godkendelsestilstand. For at forfremme en konto, der allerede findes:

```bash
bundle exec bin/ots customers role promote admin@example.com
```

**Bemærk**: Admin-området har i øjeblikket begrænset funktionalitet - det er skrivebeskyttet konfigurationsvisning uden brugerstyring. Flere funktioner er planlagt til fremtidige udgivelser.

## Næste trin

Nu hvor din instans kører:

1. **[Konfigurer din implementering](./installation)** til produktionsbrug
2. **[Gennemgå konfigurationsmuligheder](./configuration)** til tilpasning

## Få hjælp

- **Dokumentation**: Gennemse vores [konfigurationsreference](./configuration)
- **Community**: Deltag i diskussioner på [GitHub](https://github.com/onetimesecret/onetimesecret)
- **Problemer**: Rapporter fejl på vores [issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
