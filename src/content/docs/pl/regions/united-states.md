---
title: Stany Zjednoczone (US)
description: Region centrum danych Onetime Secret w Stanach Zjednoczonych, zlokalizowany w Hillsboro w stanie Oregon.
---

## Infrastruktura

- **Lokalizacja**: Hillsboro, Oregon, Stany Zjednoczone
- **URL**: [us.onetimesecret.com](https://us.onetimesecret.com)
- **Dostawca hostingu**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **CNAME domeny niestandardowej**: `identity.us.onetime.co`

## DNS domeny niestandardowej

Aby skierować domenę niestandardową do tego regionu, utwórz rekord CNAME:

| Typ rekordu | Host                  | Wartość                  |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.us.onetime.co` |

Pełne instrukcje znajdziesz w [Przewodniku konfiguracji domeny niestandardowej](/pl/custom-domains/setup-guide).

## Środowisko regulacyjne

Stany Zjednoczone nie posiadają jednej, kompleksowej federalnej ustawy o ochronie danych. Zamiast tego ochrona danych jest regulowana za pomocą kombinacji przepisów federalnych i stanowych, które dotyczą konkretnych sektorów lub rodzajów danych.

### O dostawcy hostingu

Ten region jest hostowany przez <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, niemieckiego dostawcę hostingu z siedzibą w Gunzenhausen, działającego w ramach jurysdykcji UE. Nawet w przypadku swoich centrów danych w USA, Hetzner zachowuje podejście zorientowane na prywatność, zakorzenione w niemieckich i unijnych standardach ochrony danych. Dane osobowe klientów indywidualnych nie są ujawniane w publicznych rekordach WHOIS.

### Kluczowe aspekty regulacyjne

- Przepisy federalne, takie jak HIPAA (dane medyczne), GLBA (dane finansowe) i COPPA (dane dzieci), mają zastosowanie do konkretnych sektorów
- Przepisy stanowe dotyczące prywatności zyskują na znaczeniu, w szczególności **Kalifornijska Ustawa o Ochronie Prywatności Konsumentów (California Consumer Privacy Act, CCPA)** oraz jej nowelizacja, **Kalifornijska Ustawa o Prawach do Prywatności (California Privacy Rights Act, CPRA)**
- Inne stany, w tym Wirginia, Kolorado, Connecticut i Utah, uchwaliły kompleksowe przepisy dotyczące prywatności
- Oregon, gdzie znajduje się to centrum danych, uchwalił **Ustawę o Ochronie Prywatności Konsumentów Oregonu (Oregon Consumer Privacy Act)**, obowiązującą od lipca 2024 roku

## Kiedy warto rozważyć ten region

- Twoja organizacja lub użytkownicy znajdują się głównie w Stanach Zjednoczonych
- Musisz przestrzegać amerykańskich federalnych lub stanowych przepisów o ochronie danych
- Chcesz, aby dane były przechowywane w granicach Stanów Zjednoczonych
- Obsługujesz klientów w Ameryce Północnej i potrzebujesz dostępu o niskim opóźnieniu z zachodniej części USA
