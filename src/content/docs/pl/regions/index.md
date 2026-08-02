---
title: Regiony centrów danych
description: Poznaj regiony centrów danych Onetime Secret i dowiedz się, jak wybrać odpowiedni dla swoich potrzeb.
---

Onetime Secret oferuje pięć regionów centrów danych: Kanadę (CA), Unię Europejską (EU), Aotearoa Nową Zelandię (NZ), Wielką Brytanię (UK) i Stany Zjednoczone (US). Ten przewodnik pomoże Ci zrozumieć znaczenie wyboru regionu oraz to, jak wybrać odpowiedni dla swoich potrzeb.

## Dlaczego wybór regionu ma znaczenie

Wybór odpowiedniego regionu centrum danych jest kluczowy z kilku powodów:

1. **Suwerenność danych**: Różne regiony mają różne przepisy i regulacje dotyczące ochrony danych.
2. **Opóźnienie**: Wybór regionu bliższego Twojej głównej bazie użytkowników może zmniejszyć opóźnienie.
3. **Zgodność**: Niektóre organizacje mają szczególne wymagania dotyczące miejsca przechowywania ich danych.

## Dostępne regiony

| Region | Lokalizacja | URL |
|--------|-------------|-----|
| [Kanada (CA)](/pl/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Unia Europejska (EU)](/pl/regions/european-union) | Norymberga | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nowa Zelandia (NZ)](/pl/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Wielka Brytania (UK)](/pl/regions/united-kingdom) | Londyn | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Stany Zjednoczone (US)](/pl/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Każda strona regionu zawiera szczegóły dotyczące lokalnego środowiska regulacyjnego oraz informacje o tym, kiedy dany region może być odpowiedni dla Twojego przypadku użycia.

## Architektura bez współdzielenia

Onetime Secret wykorzystuje architekturę bez współdzielenia, zapewniającą całkowitą izolację danych między regionami:

- **Oddzielne konta**: Utworzenie konta na dowolnej domenie regionalnej jest całkowicie oddzielone od kont w innych domenach, nawet jeśli używasz tego samego adresu e-mail.
- **Brak operacji między centrami**: Nie możesz wykonywać operacji (takich jak zniszczenie sekretu) między centrami danych. Każde centrum utrzymuje własny zestaw sekretów i danych użytkowników.
- **Spójne rozliczenia dla płacących użytkowników**: W przypadku płatnych kont, podczas gdy żadne dane użytkownika nie są współdzielone między centrami, Twój status subskrypcji jest rozpoznawany w regionach za pośrednictwem naszego dostawcy płatności, Stripe.

## Jak wybrać swój region

Rozważ następujące czynniki przy wyborze regionu centrum danych:

### Bez konta

- Żądania do onetimesecret.com mogą być kierowane do dowolnego aktywnego centrum danych.
- Możesz wybrać konkretny region, przechodząc bezpośrednio do domeny regionalnej (np. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Wygenerowany link zawsze identyfikuje region (np. `us.onetimesecret.com/secret/abcd1234`).

### Z kontem

- Podczas tworzenia konta wybierasz region centrum danych. Wszystkie plany — darmowe i płatne — mają dostęp do każdego regionu.
- Logujesz się w tej samej domenie regionalnej, w której się zarejestrowałeś (np. jeśli zarejestrowałeś się na `eu.onetimesecret.com`, tam właśnie się logujesz).

### Dodatkowe uwagi

1. **Dla osób indywidualnych**:
   - Osobiste preferencje
   - Bliskość Twojej lokalizacji dla potencjalnie szybszego dostępu
   - Osobiste obawy dotyczące suwerenności danych

2. **Dla firm**:
   - Wymagania prawne i regulacyjne
   - Lokalizacja Twojej głównej bazy klientów
   - Potrzeby zgodności specyficzne dla branży

3. **Uwagi techniczne**:
   - Wymagania dotyczące opóźnień dla Twojej aplikacji
   - Integracja z innymi usługami lub systemami

## Plany na przyszłość

Nieustannie pracujemy nad rozszerzeniem naszych opcji centrów danych. Przyszłe plany obejmują dodatkowe lokalizacje centrów danych w:

- Australii
- Brazylii
- Japonii
- Meksyku
- Norwegii
- Korei Południowej

Te rozszerzenia zapewnią jeszcze więcej opcji lokalizacji danych, poprawiając wydajność i możliwości zgodności dla użytkowników w różnych regionach.


## Często zadawane pytania

**P: Czy mogę zmienić swój region po skonfigurowaniu konta?**
O: Tak. Zobacz [Zmiana regionu](/pl/regions/switching-regions), gdzie znajdziesz instrukcje krok po kroku dotyczące kont darmowych, płatnych subskrypcji oraz migracji domeny niestandardowej.

**P: Czy wybór regionu wpływa na bezpieczeństwo moich sekretów?**
O: Nie, wszystkie regiony oferują ten sam wysoki poziom bezpieczeństwa. Wybór wpływa głównie na rezydencję danych i potencjalne opóźnienie.

**P: Czy są różnice w cenach między regionami?**
O: Ceny są ustalane indywidualnie dla każdego regionu — możesz płacić w swojej lokalnej walucie, a Stripe automatycznie obsługuje przeliczanie walut. Plany Identity Plus obejmują nieograniczoną liczbę niestandardowych domen we wszystkich centrach danych w ramach jednej subskrypcji. Sprawdź naszą [stronę cennika](https://onetimesecret.com/pricing), aby uzyskać najbardziej aktualne informacje.

## Potrzebujesz pomocy?

Jeśli nie jesteś pewien, który region wybrać, lub masz jakiekolwiek pytania, nie wahaj się skontaktować z naszym zespołem wsparcia. Jesteśmy tutaj, aby pomóc Ci podjąć najlepszą decyzję dla Twoich konkretnych potrzeb.

- E-mail: support@onetimesecret.com
- Formularz opinii: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Pamiętaj, że wybór odpowiedniego regionu zapewnia najlepszą wydajność i zgodność z odpowiednimi przepisami dotyczącymi danych podczas korzystania z Onetime Secret.
