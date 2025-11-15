---
title: Miljøvariabler
description: Reference for Onetime Secret miljøvariabler
sidebar:
  order: 5
---

Denne side indeholder referencer til miljøvariabler til konfiguration af Onetime Secret.

**Note:** For den komplette liste over miljøvariabler med beskrivelser og eksempler, se venligst den [engelske version af denne side](/en/self-hosting/environment-variables) eller [konfigurationsreferenceanden](/en/self-hosting/configuration).

## Vigtige miljøvariabler

### Kernekonfiguration
- `SECRET` - Hemmelig nøgle til kryptering (påkrævet)
- `REDIS_URL` - Redis-forbindelses-URL
- `HOST` - Værts-URL til applikationen
- `SSL` - Aktivér/deaktivér SSL
- `RACK_ENV` - Miljø (production, development)

### Funktionskontrol
- `UI_ENABLED` - Aktivér/deaktivér webgrænseflade
- `API_ENABLED` - Aktivér/deaktivér API
- `HEADER_ENABLED` - Vis/skjul header
- `FOOTER_LINKS` - Aktivér footerlinks

### Beskedindstillinger
- `DEFAULT_TTL` - Standard time-to-live
- `PASSPHRASE_REQUIRED` - Kræv adgangssætninger
- `PASSPHRASE_MIN_LENGTH` - Minimum adgangssætningslængde

For komplette detaljer og yderligere variabler, se den [engelske dokumentation](/en/self-hosting/environment-variables).
