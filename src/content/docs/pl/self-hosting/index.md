---
title: Przegląd własnego hostingu
description: Kompletny przewodnik po uruchamianiu własnej instancji Onetime Secret
sidebar:
  order: 1
---

Uruchom własną prywatną instancję Onetime Secret z pełną kontrolą nad danymi, bezpieczeństwem i wdrożeniem.

## Dlaczego własny hosting?

Własny hosting Onetime Secret zapewnia:

- **Pełną kontrolę nad danymi** - Wszystkie sekrety pozostają w Twojej infrastrukturze i sieci
- **Niestandardowe polityki bezpieczeństwa** - Konfiguruj uwierzytelnianie, opcje prywatności i kontrolę dostępu
- **Zgodność** - Spełniaj wymogi regulacyjne dotyczące obsługi danych
- **Niestandardowy branding** - Dostosuj interfejs dla swojej organizacji

## Opcje szybkiego startu

Wybierz metodę wdrożenia, która najlepiej pasuje do Twojego środowiska:

### Docker (zalecane)
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

Zobacz nasz przewodnik [Instalacja i wdrożenie](/pl/self-hosting/installation) dla szczegółowych kroków.

## Co jest zawarte

Twoja instancja własnego hostingu obejmuje:

- **Interfejs webowy** - W pełni funkcjonalny interfejs użytkownika do tworzenia i udostępniania sekretów
- **REST API** - Programowy dostęp dla integracji
- **Wsparcie wielu języków** - Dostępne w ponad 12 językach
- **Domeny niestandardowe** - Używaj własnej domeny i brandingu


## Wymagania systemowe

**Zalecane:**
- 2+ rdzenie CPU
- 2GB+ RAM
- 10GB+ miejsca na dysku
- Redis dla przechowywania sesji
- Node.js 22+ (dla rozwoju)

## Następne kroki

1. **[Pierwsze kroki](/pl/self-hosting/getting-started)** - Przewodnik krok po kroku
2. **[Instalacja i wdrożenie](/pl/self-hosting/installation)** - Szczegółowe opcje wdrożenia
3. **[Dokumentacja konfiguracji](/pl/self-hosting/configuration)** - Kompletna dokumentacja ustawień

---

_Gotowy, aby zacząć? Postępuj zgodnie z naszym przewodnikiem [Pierwsze kroki](/pl/self-hosting/getting-started)._
