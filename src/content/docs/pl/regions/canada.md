---
title: Kanada (CA)
description: Region centrum danych Onetime Secret w Kanadzie, zlokalizowany w Toronto.
---

## Infrastruktura

- **Lokalizacja**: Toronto, Kanada
- **URL**: [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Dostawca hostingu**: <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **CNAME domeny niestandardowej**: `identity.ca.onetime.co`

:::note
Jesteśmy kanadyjską firmą i aktywnie poszukujemy odpowiedniego dostawcy hostingu będącego własnością kanadyjską dla tego regionu. Jeśli masz sugestie, chętnie je poznamy — napisz do nas poprzez nasz [formularz opinii](https://onetimesecret.com/feedback).
:::

## DNS domeny niestandardowej

Aby skierować domenę niestandardową do tego regionu, utwórz rekord CNAME:

| Typ rekordu | Host                  | Wartość                  |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.ca.onetime.co` |

Pełne instrukcje znajdziesz w [Przewodniku konfiguracji domeny niestandardowej](/pl/custom-domains/setup-guide).

## Środowisko regulacyjne

Kanadyjskie federalne prawo dotyczące ochrony prywatności, **Ustawa o ochronie danych osobowych i dokumentach elektronicznych (Personal Information Protection and Electronic Documents Act, PIPEDA)**, reguluje zbieranie, wykorzystywanie i ujawnianie danych osobowych w toku działalności komercyjnej. Kilka prowincji posiada również własne przepisy dotyczące prywatności, które mogą mieć zastosowanie.

### O dostawcy hostingu

Ten region jest hostowany przez <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>, dostawcę usług chmurowych z siedzibą w Broomfield w stanie Kolorado w USA, obsługującego miliony deweloperów na całym świecie. DigitalOcean przestrzega RODO w odniesieniu do klientów europejskich, wspiera przenoszalność danych i publikuje raporty przejrzystości opisujące szczegółowo wnioski rządowe o udostępnienie danych. Firma stosuje solidne mechanizmy bezpieczeństwa i publikuje raporty z audytów.

### Kluczowe aspekty regulacyjne

- PIPEDA wymaga świadomej zgody na zbieranie i wykorzystywanie danych
- Nadzór nad przestrzeganiem przepisów sprawuje Biuro Komisarza ds. Ochrony Prywatności Kanady (Office of the Privacy Commissioner of Canada)
- Kanada posiada decyzję Komisji Europejskiej stwierdzającą odpowiedni poziom ochrony danych, co ułatwia transfer danych do UE
- Przepisy prowincjonalne (np. albertańska ustawa PIPA, quebecka Ustawa 25) mogą nakładać dodatkowe wymagania

## Kiedy warto rozważyć ten region

- Twoja organizacja lub użytkownicy znajdują się głównie w Kanadzie
- Musisz przestrzegać PIPEDA lub prowincjonalnych przepisów o ochronie prywatności
- Chcesz, aby dane były przechowywane w granicach Kanady
- Obsługujesz klientów w Ameryce Północnej i szukasz geograficznie centralnej opcji
