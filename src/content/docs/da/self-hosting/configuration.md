---
title: Konfigurationsreference
description: Komplet reference for alle Onetime Secret-konfigurationsmuligheder
sidebar:
  order: 4
---

Denne omfattende vejledning dækker alle konfigurationsmuligheder for selv-hostede Onetime Secret-instanser.

**Note:** For detaljerede konfigurationseksempler, YAML-syntax og miljøvariabelreference, se venligst den [engelske version af denne side](/en/self-hosting/configuration), da den indeholder komplette konfigurationseksempler og tekniske detaljer.

## Konfigurationsfiler

Onetime Secret bruger flere konfigurationsfiler:

- **`.env`** - Miljøvariabler til almindelige indstillinger
- **`config/config.yaml`** - Hovedapplikationskonfiguration med ERB-skabeloner

## Nøglekonfigurationssektioner

Vigtige områder at tilpasse:

- **Site-indstillinger**: Host, SSL, hemmelig nøgle
- **UI-konfiguration**: Header, footer, branding
- **API-indstillinger**: Aktivér/deaktivér API-adgang
- **Beskedindstillinger**: Standard-TTL, adgangssætningsmuligheder
- **Sikkerhedsindstillinger**: Rate limiting, sessioner
- **E-mailkonfiguration**: SMTP-indstillinger

Se den [komplette konfigurationsfil](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml) på GitHub.

## Kom i gang

1. Kopier eksemplet: `cp etc/config.example.yaml config/config.yaml`
2. Rediger værdier efter behov for din implementering
3. De fleste almindelige indstillinger kan tilsidesættes med miljøvariabler

For detaljerede konfigurationseksempler og forklaringer, se den [engelske dokumentation](/en/self-hosting/configuration).
