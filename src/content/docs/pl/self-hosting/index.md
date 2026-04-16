---
title: Przegląd self-hostingu
description: Kompletny przewodnik po uruchomieniu własnej instancji Onetime Secret
sidebar:
  order: 1
---

Uruchom własną prywatną instancję Onetime Secret z pełną kontrolą nad danymi, bezpieczeństwem i wdrożeniem.

:::caution[Marzec 2026 — Dokumentacja self-hostingu w trakcie aktualizacji]
Jesteśmy w trakcie przejścia między **v0.23** a **v0.24** (gałąź `main`). Część naszej dokumentacji self-hostingu jest nieaktualna i [aktywnie pracujemy nad jej ulepszeniem](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Jeśli chcesz po prostu uruchomić działającą instancję**, zalecamy gałąź `rel/0.23`. Wymaga ona jedynie kilku zmiennych środowiskowych i Redisa, a my nadal aktywnie publikujemy poprawki i drobne aktualizacje.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Dlaczego self-hosting?

Self-hosting Onetime Secret daje Ci:

- **Pełną kontrolę nad danymi** - Wszystkie sekrety pozostają w Twojej infrastrukturze i sieci
- **Własne polityki bezpieczeństwa** - Konfiguruj uwierzytelnianie, opcje prywatności i kontrolę dostępu
- **Zgodność z przepisami** - Spełniaj wymagania regulacyjne dotyczące przetwarzania danych
- **Własny branding** - Dostosuj interfejs do potrzeb swojej organizacji

## Opcje szybkiego startu

Wybierz metodę wdrożenia najlepiej dopasowaną do Twojego środowiska:

### Docker (Zalecany)
```bash
# Uruchom Redis i Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.24.7
```

Dostęp pod adresem `http://localhost:3000`.

### Instalacja ręczna
Dla środowisk produkcyjnych wymagających niestandardowych konfiguracji.

Zapoznaj się z naszym przewodnikiem [Instalacja i wdrożenie](./installation), aby poznać szczegółowe kroki.

## Co zawiera instancja

Twoja własna instancja obejmuje:

- **Interfejs webowy** - W pełni funkcjonalny UI do tworzenia i udostępniania sekretów
- **REST API** - Programowy dostęp do integracji
- **Wsparcie wielojęzyczne** - Dostępne w ponad 12 językach
- **Własne domeny** - Używaj własnej domeny i brandingu

## Wymagania systemowe

**Zalecane:**
- 2+ rdzenie procesora
- 2 GB+ pamięci RAM
- 10 GB+ przestrzeni dyskowej
- Redis do przechowywania sesji
- Node.js 22+ (do celów deweloperskich)

## Następne kroki

1. **[Pierwsze kroki](./getting-started)** - Przewodnik konfiguracji krok po kroku
2. **[Instalacja i wdrożenie](./installation)** - Szczegółowe opcje wdrożenia
3. **[Dokumentacja konfiguracji](./configuration)** - Pełna dokumentacja ustawień

---

_Gotowy, aby zacząć? Skorzystaj z naszego przewodnika [Pierwsze kroki](./getting-started)._
