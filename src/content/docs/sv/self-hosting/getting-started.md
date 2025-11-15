---
title: Komma igång
description: Snabb installationsguide för att få din självhostade Onetime Secret-instans igång
sidebar:
  order: 2
---

Denna guide hjälper dig att komma igång med en självhostad Onetime Secret-instans på några minuter.

## Förutsättningar

- **1GB+ RAM** för optimal prestanda
- **Redis-lagringsnotering**: Beroende på din Redis-konfiguration kan hemligheter lagras helt i minnet utan att någonsin skrivas till disk för förbättrad säkerhet

## Metod 1: Docker (rekommenderas)

Det snabbaste sättet att komma igång använder Docker med minimal konfiguration.

### 1. Starta Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Generera hemlig nyckel

```bash
# Generera och lagra en beständig hemlig nyckel
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Secret key saved to .ots_secret (keep this file secure!)"
```

### 3. Kör Onetime Secret

```bash
# Kör containern med den hemliga nyckeln
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Få åtkomst till din instans

Öppna din webbläsare till:
- **Webbgränssnitt**: http://localhost:3000
- **API-slutpunkt**: http://localhost:3000/api/v2/status

## Metod 2: Manuell installation

För dem som föredrar manuell installation behöver du:

- **Ruby 3.2+** (kanske inte tillgängligt i standard systempaket)
- **Redis 5+** eller **Valkey** (Redis-alternativ)
- **Node.js 22+** och **pnpm** (krävs endast för utveckling och byggande av frontend-tillgångar)

Du behöver bygga frontend-tillgångarna med `pnpm install && pnpm run build:local` innan du kör applikationen.

Se [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) för kompletta detaljer om manuell installation.

## Verifiering

1. Navigera till http://localhost:3000
2. Skapa en testhemlighet för att verifiera att allt fungerar
3. Kontrollera API-status på http://localhost:3000/api/v2/status

## Administratörsinställning

För att skapa en administratörsanvändare, lägg till e-postadresser i `:colonels:`-sektionen i din konfigurationsfil, registrera dig sedan med en av dessa e-postadresser för att automatiskt få administratörsåtkomst.

**Notera**: Administratörsområdet har för närvarande begränsad funktionalitet - det är readonly konfigurationsvisning utan användarhantering. Fler funktioner planeras för framtida versioner.

## Nästa steg

Nu när din instans körs:

1. **[Konfigurera din distribution](./installation)** för produktionsanvändning
2. **[Granska konfigurationsalternativ](./configuration)** för anpassning

## Få hjälp

- **Dokumentation**: Bläddra i vår [konfigurationsreferens](./configuration)
- **Community**: Delta i diskussioner på [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Problem**: Rapportera buggar på vår [ärendespårare](https://github.com/onetimesecret/onetimesecret/issues)
