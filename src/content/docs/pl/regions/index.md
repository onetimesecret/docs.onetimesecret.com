---
title: Regiony centrów danych
description: Poznaj regiony centrów danych Onetime Secret i dowiedz się, jak wybrać odpowiedni dla swoich potrzeb.
---

Onetime Secret oferuje cztery regiony centrów danych: Unia Europejska (EU), Stany Zjednoczone (US), Kanada (CA) i Aotearoa Nowa Zelandia (NZ). Ten przewodnik pomoże zrozumieć znaczenie wyboru regionu i jak wybrać odpowiedni dla swoich potrzeb.

## Dlaczego wybór regionu ma znaczenie

Wybór odpowiedniego regionu centrum danych jest kluczowy z kilku powodów:

1. **Suwerenność danych**: Różne regiony mają różne przepisy i regulacje dotyczące ochrony danych.
2. **Opóźnienie**: Wybór regionu bliższego Twojej głównej bazie użytkowników może zmniejszyć opóźnienie.
3. **Zgodność**: Niektóre organizacje mają szczególne wymagania dotyczące miejsca przechowywania ich danych.

## Dostępne regiony

### Unia Europejska (EU)

- **Lokalizacja**: Unia Europejska (Norymberga)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Kluczowe cechy**:
  - Zgodność z RODO i innymi przepisami UE dotyczącymi ochrony danych
  - Idealne dla użytkowników europejskich lub obsługujących głównie europejskich klientów

### Kanada (CA)

- **Lokalizacja**: Kanada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Kluczowe cechy**:
  - Zgodność z PIPEDA i kanadyjskimi przepisami dotyczącymi ochrony danych
  - Odpowiednie dla użytkowników kanadyjskich lub obsługujących głównie kanadyjskich klientów

### Aotearoa Nowa Zelandia (NZ)

- **Lokalizacja**: Aotearoa Nowa Zelandia (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Kluczowe cechy**:
  - Zgodność z ustawą o prywatności Nowej Zelandii i lokalnymi przepisami
  - Odpowiednie dla użytkowników z Nowej Zelandii lub obsługujących klientów z Oceanii

### Stany Zjednoczone (US)

- **Lokalizacja**: Stany Zjednoczone (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Kluczowe cechy**:
  - Zgodność z przepisami USA dotyczącymi ochrony danych
  - Odpowiednie dla użytkowników z USA lub obsługujących głównie klientów z USA

## Architektura bez współdzielenia

Onetime Secret wykorzystuje architekturę bez współdzielenia, zapewniającą całkowitą izolację danych między regionami:

- **Oddzielne konta**: Utworzenie konta na dowolnej domenie regionalnej jest całkowicie oddzielone od kont w innych domenach, nawet jeśli używasz tego samego adresu e-mail.
- **Brak operacji między centrami**: Nie możesz wykonywać operacji (takich jak zniszczenie sekretu) między centrami danych. Każde centrum utrzymuje własny zestaw sekretów i danych użytkowników.
- **Spójne rozliczenia dla płacących użytkowników**: W przypadku płatnych kont, podczas gdy żadne dane użytkownika nie są współdzielone między centrami, Twój status subskrypcji jest rozpoznawany w regionach za pośrednictwem naszego dostawcy płatności, Stripe.

## Jak wybrać swój region

Rozważ następujące czynniki przy wyborze regionu centrum danych:

### Dla użytkowników anonimowych

- Żądania do onetimesecret.com mogą być kierowane do dowolnego aktywnego centrum danych.
- Lokalizacja Twojego sekretu jest zawsze jasna z wygenerowanego linku (np. `us.onetimesecret.com/secret/abcd1234`).
- Możesz wybrać konkretną lokalizację danych, przechodząc bezpośrednio do dowolnej domeny regionalnej (np. [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### Dla uwierzytelnionych użytkowników

- Podczas tworzenia nowego konta musisz wybrać lokalizację centrum danych.
- Będziesz musiał wrócić do tej samej lokalizacji, aby się zalogować.
- Istniejące konta i sekrety pozostają w swoim pierwotnym centrum danych.

### Dla wszystkich użytkowników

- Sekrety utworzone bez subdomeny jurysdykcji (np. onetimesecret.com/secret/efgh5678) będą nadal domyślnie kierowane do naszego centrum danych w UE.
- Wszyscy użytkownicy, zarówno płacący, jak i darmowi, mogą wybrać preferowane centrum danych podczas tworzenia konta.

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

## Cennik i plany

Nasze zobowiązanie do lokalizacji danych rozciąga się na nasz model cenowy:

- Opłaty są oparte na tym, skąd płacisz, a nie na tym, gdzie utworzono Twoje konto.
- Plany Identity Plus obejmują nieograniczone niestandardowe domeny we wszystkich centrach danych w ramach jednej subskrypcji.

## Plany na przyszłość

Nieustannie pracujemy nad rozszerzeniem naszych opcji centrów danych. Przyszłe plany obejmują dodatkowe lokalizacje centrów danych w:

- Brazylii
- Hiszpanii
- Wielkiej Brytanii

Te rozszerzenia zapewnią jeszcze więcej opcji lokalizacji danych, poprawiając wydajność i możliwości zgodności dla użytkowników w różnych regionach.

## Konfiguracja regionu

Podczas konfigurowania konta Onetime Secret lub konfigurowania niestandardowej domeny będziesz mieć możliwość wyboru preferowanego regionu. Oto jak:

1. Dla nowych kont: Wybierz preferowany region podczas procesu rejestracji.
2. Dla istniejących kont: Skontaktuj się z naszym zespołem wsparcia, aby omówić opcje migracji regionu.
3. Dla niestandardowych domen: Określ wybrany region podczas konfigurowania ustawień DNS (zapoznaj się z naszym [Przewodnikiem konfiguracji niestandardowej domeny](/docs/custom-domains/setup-guide) po szczegółowe instrukcje).

## Często zadawane pytania

**P: Czy mogę zmienić swój region po skonfigurowaniu konta?**
O: Tak, możesz zmienić swój region, tworząc nowe konto z tym samym adresem e-mail i przechodząc do ekranu konta. Jeśli masz aktywną subskrypcję, Twoje konto zaktualizuje się automatycznie (może być konieczne odświeżenie strony).

Należy pamiętać:
- Istniejące dane nie są przenoszone między regionami
- Wszelkie utworzone linki do sekretów będą nadal działać, dopóki nie zostaną wyświetlone lub wygasną
- Dla linków z niestandardowymi domenami będziesz musiał:
  1. Ponownie dodać domenę do konta w nowym regionie
  2. Zaktualizować powiązane rekordy DNS
  3. Użyć unikalnej subdomeny podczas ponownego dodawania domeny, aby uniknąć konfliktów z istniejącymi linkami
  4. Później możesz dodać preferowaną domenę (jeśli to konieczne), aby móc rozpocząć wysyłanie nowych linków z preferowaną domeną

**P: Czy mój wybór regionu wpływa na bezpieczeństwo moich sekretów?**
O: Nie, wszystkie regiony oferują ten sam wysoki poziom bezpieczeństwa. Wybór wpływa głównie na rezydencję danych i potencjalne opóźnienie.

**P: Czy są różnice w cenach między regionami?**
O: Obecnie nasze ceny są spójne we wszystkich regionach. Sprawdź naszą [stronę cennika](https://onetimesecret.com/pricing) po najnowsze informacje.

## Potrzebujesz pomocy?

Jeśli nie jesteś pewien, który region wybrać, lub masz jakiekolwiek pytania, nie wahaj się skontaktować z naszym zespołem wsparcia. Jesteśmy tutaj, aby pomóc Ci podjąć najlepszą decyzję dla Twoich konkretnych potrzeb.

- E-mail: support@onetimesecret.com
- Formularz opinii: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Pamiętaj, że wybór odpowiedniego regionu zapewnia najlepszą wydajność i zgodność z odpowiednimi przepisami dotyczącymi danych podczas korzystania z Onetime Secret.
