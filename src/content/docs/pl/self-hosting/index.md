---
title: Przegląd self-hostingu
description: Kompletny przewodnik po uruchamianiu własnej instancji Onetime Secret
sidebar:
  order: 1
---

Uruchom własną prywatną instancję Onetime Secret z pełną kontrolą nad danymi, bezpieczeństwem i wdrożeniem.

:::caution[Marzec 2026 — Dokumentacja self-hostingu w trakcie zmian]
Jesteśmy w trakcie przejścia między **v0.23** a **v0.24** (gałąź `main`). Część naszej dokumentacji self-hostingu jest nieaktualna i [aktywnie pracujemy nad jej poprawą](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Jeśli chcesz po prostu uruchomić coś działającego**, zalecamy gałąź `rel/0.23`. Wymaga ona jedynie kilku zmiennych środowiskowych i Redis, a my nadal aktywnie wprowadzamy poprawki i drobne aktualizacje.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Dlaczego self-hosting?

Self-hosting Onetime Secret daje Ci:

- **Pełna kontrola nad danymi** - Wszystkie sekrety pozostają w Twojej infrastrukturze i sieci
- **Niestandardowe polityki bezpieczeństwa** - Konfiguruj uwierzytelnianie, opcje prywatności i kontrolę dostępu
- **Zgodność z regulacjami** - Spełniaj wymagania regulacyjne dotyczące przetwarzania danych
- **Niestandardowy branding** - Dostosuj interfejs do potrzeb swojej organizacji

## Opcje szybkiego startu

Wybierz metodę wdrożenia najlepiej pasującą do Twojego środowiska:

### Docker (zalecany)
```bash
# Uruchom Redis i Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

Dostęp pod adresem `http://localhost:3000`.

### Instalacja ręczna
Dla środowisk produkcyjnych wymagających niestandardowych konfiguracji.

Zapoznaj się z naszym przewodnikiem [Instalacja i wdrożenie](./installation), aby uzyskać szczegółowe instrukcje.

## Co zawiera

Twoja instancja self-hosted zawiera:

- **Interfejs webowy** - W pełni funkcjonalny UI do tworzenia i udostępniania sekretów
- **REST API** - Programistyczny dostęp do integracji
- **Obsługa wielu języków** - Dostępna w ponad 12 językach
- **Niestandardowe domeny** - Użyj własnej domeny i brandingu


## Wymagania systemowe

**Zalecane:**
- 2+ rdzenie CPU
- 2GB+ RAM
- 10GB+ przestrzeni dyskowej
- Redis do przechowywania sesji
- Node.js 22+ (do rozwoju)

## Następne kroki

1. **[Pierwsze kroki](./getting-started)** - Przewodnik krok po kroku
2. **[Instalacja i wdrożenie](./installation)** - Szczegółowe opcje wdrożenia
3. **[Dokumentacja konfiguracji](./configuration)** - Kompletna dokumentacja ustawień

---

_Gotowy do rozpoczęcia? Postępuj zgodnie z naszym przewodnikiem [Pierwsze kroki](./getting-started)._
