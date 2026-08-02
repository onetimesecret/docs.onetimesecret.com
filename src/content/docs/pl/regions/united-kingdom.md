---
title: Wielka Brytania (UK)
description: Region centrum danych Onetime Secret w Wielkiej Brytanii, zlokalizowany w Londynie.
---

## Infrastruktura

- **Lokalizacja**: Londyn, Wielka Brytania
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Dostawca hostingu**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlandia)
- **CNAME domeny niestandardowej**: `identity.ingress.onetime.co` (anycast)

## DNS domeny niestandardowej

Aby skierować domenę niestandardową do tego regionu, utwórz rekord CNAME:

| Typ rekordu | Host                  | Wartość                       |
| ----------- | --------------------- | ------------------------------ |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Zwróć uwagę, że region UK wykorzystuje anycastowy rekord CNAME zamiast subdomeny przypisanej do konkretnego regionu.

Pełne instrukcje znajdziesz w [Przewodniku konfiguracji domeny niestandardowej](/pl/custom-domains/setup-guide).

## Środowisko regulacyjne

Ramy ochrony danych w Wielkiej Brytanii reguluje **Brytyjskie Ogólne rozporządzenie o ochronie danych (UK GDPR)** oraz **Ustawa o ochronie danych z 2018 roku (Data Protection Act 2018)**. Po brexicie Wielka Brytania utrzymuje własny system ochrony danych, ściśle dostosowany do unijnego RODO.

### O dostawcy hostingu

Ten region jest hostowany przez <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, europejskiego dostawcę infrastruktury chmurowej założonego w 2011 roku, z siedzibą w Helsinkach w Finlandii. Jako suwerenny europejski dostawca, wszystkie dane związane z kontem są przechowywane wyłącznie w Finlandii, zgodnie z fińskimi i unijnymi przepisami o ochronie danych. UpCloud prowadzi centra danych w wielu europejskich lokalizacjach, w tym w Londynie, gdzie hostowany jest ten region.

### Kluczowe aspekty regulacyjne

- Biuro Komisarza ds. Informacji (Information Commissioner's Office, ICO) pełni funkcję niezależnego organu nadzorczego
- Brytyjskie UK GDPR zachowuje podstawowe zasady i prawa unijnego RODO, w tym prawa osób, których dane dotyczą, oraz wymogi dotyczące podstawy prawnej przetwarzania
- Wielka Brytania posiada decyzję Komisji Europejskiej stwierdzającą odpowiedni poziom ochrony danych, co umożliwia swobodny przepływ danych z UE/EOG
- Ustawa o ochronie danych z 2018 roku uzupełnia UK GDPR o przepisy dotyczące brytyjskich organów ścigania i służb wywiadowczych

## Kiedy warto rozważyć ten region

- Twoja organizacja lub użytkownicy znajdują się głównie w Wielkiej Brytanii
- Musisz przestrzegać UK GDPR oraz Ustawy o ochronie danych z 2018 roku
- Chcesz, aby dane były przechowywane w granicach Wielkiej Brytanii
- Obsługujesz klientów wymagających przetwarzania danych w Wielkiej Brytanii
