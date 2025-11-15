---
title: Installation & implementering
description: Omfattende vejledning til produktionsimplementering af Onetime Secret
sidebar:
  order: 3
---

Denne vejledning dækker implementeringsmuligheder for selv-hostede Onetime Secret-instanser.

**Note:** For detaljerede tekniske instruktioner, konfigurationseksempler og kommandolinje-kommandoer, se venligst den [engelske version af denne side](/en/self-hosting/installation), da den indeholder omfattende kodeeksempler og tekniske detaljer, der bedst formidles på engelsk.

## Implementeringsmuligheder

### Docker-implementering

Docker giver den mest pålidelige og bærbare implementeringsmetode.

Se den engelske dokumentation for:
- Docker Compose-opsætning
- Miljøkonfiguration
- Volumestyring

### Manuel installation

For miljøer, der kræver brugerdefinerede konfigurationer eller eksisterende infrastruktur.

Se den engelske dokumentation for:
- Systemafhængigheder (Ubuntu, CentOS/RHEL)
- Applikationsopsætning
- Ruby og Node.js-installation

## Reverse Proxy-konfiguration

Konfigurationseksempler er tilgængelige for:
- Nginx
- Caddy
- Apache

Se den [engelske dokumentation](/en/self-hosting/installation) for komplette konfigurationsfiler.

## SSL/TLS-konfiguration

Instruktioner til:
- Let's Encrypt (Certbot)
- Brugerdefinerede SSL-certifikater

## Redis-konfiguration

Vælg mellem:
- **Kun hukommelse**: Beskeder gemmes aldrig på disk (maksimal sikkerhed)
- **Disk-persistens**: Aktiverer sikkerhedskopier, men skriver beskeder til disk

Se den engelske dokumentation for komplette konfigurationseksempler.

## Næste trin

Efter vellykket implementering:

1. **[Konfigurer din instans](./configuration)** med brugerdefinerede indstillinger
2. **Opsæt overvågning og alerting** til produktionsoperationer
3. **Gennemgå sikkerhedsindstillinger** og aktiver yderligere beskyttelse
4. **Konfigurer sikkerhedskopieringsautomation** og test gendannelsesprocedurer
5. **Opsæt brugerdefinerede domæner** til din organisation

Din Onetime Secret-instans er nu klar til produktionsbrug!
