---
title: Pierwsze kroki
description: Szybki przewodnik konfiguracji, aby uruchomić własną instancję Onetime Secret
sidebar:
  order: 2
---

Ten przewodnik pomoże Ci uruchomić własną instancję Onetime Secret w kilka minut.

## Wymagania wstępne

- **1GB+ RAM** dla optymalnej wydajności
- **Uwaga o przechowywaniu Redis**: W zależności od konfiguracji Redis, sekrety mogą być przechowywane całkowicie w pamięci bez zapisywania na dysk dla zwiększonego bezpieczeństwa

## Metoda 1: Docker (zalecane)

Najszybszy sposób na rozpoczęcie używa Docker z minimalną konfiguracją.

### 1. Uruchom Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Wygeneruj klucz tajny

```bash
# Wygeneruj i zapisz trwały klucz tajny
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Klucz tajny zapisany w .ots_secret (zachowaj ten plik w bezpiecznym miejscu!)"
```

### 3. Uruchom Onetime Secret

```bash
# Uruchom kontener używając klucza tajnego
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Uzyskaj dostęp do swojej instancji

Otwórz przeglądarkę pod adresem:
- **Interfejs webowy**: http://localhost:3000
- **Punkt końcowy API**: http://localhost:3000/api/v2/status

## Metoda 2: Instalacja ręczna

Dla tych, którzy preferują ręczną konfigurację, potrzebne będą:

- **Ruby 3.2+** (może nie być dostępny w domyślnych pakietach systemowych)
- **Redis 5+** lub **Valkey** (alternatywa Redis)
- **Node.js 22+** i **pnpm** (wymagane tylko do rozwoju i budowania zasobów frontend)

Będziesz musiał zbudować zasoby frontend za pomocą `pnpm install && pnpm run build:local` przed uruchomieniem aplikacji.

Zobacz [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) dla szczegółowych instrukcji instalacji ręcznej.

## Weryfikacja

1. Przejdź do http://localhost:3000
2. Utwórz testowy sekret, aby zweryfikować, że wszystko działa
3. Sprawdź status API pod adresem http://localhost:3000/api/v2/status

## Konfiguracja administratora

Aby utworzyć użytkownika administratora, dodaj adresy e-mail do sekcji `:colonels:` w pliku konfiguracyjnym, a następnie zarejestruj się jednym z tych adresów e-mail, aby automatycznie uzyskać dostęp administratora.

**Uwaga**: Obszar administratora ma obecnie ograniczoną funkcjonalność - jest to tylko przeglądanie konfiguracji w trybie readonly bez zarządzania użytkownikami. Więcej funkcji jest planowanych w przyszłych wydaniach.

## Następne kroki

Teraz, gdy Twoja instancja działa:

1. **[Skonfiguruj wdrożenie](/pl/self-hosting/installation)** do użytku produkcyjnego
2. **[Przejrzyj opcje konfiguracji](/pl/self-hosting/configuration)** dla dostosowania

## Uzyskiwanie pomocy

- **Dokumentacja**: Przeglądaj naszą [dokumentację konfiguracji](/pl/self-hosting/configuration)
- **Społeczność**: Dołącz do dyskusji na [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Problemy**: Zgłaszaj błędy w naszym [systemie śledzenia problemów](https://github.com/onetimesecret/onetimesecret/issues)
