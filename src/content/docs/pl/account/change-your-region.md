---
title: Zmiana regionu
---

Onetime Secret wykorzystuje [architekturę bez współdzielenia](/pl/regions) we wszystkich pięciu regionach (CA, EU, NZ, UK, US). Każdy region działa jako całkowicie odrębny system z własną bazą danych, kontami i sekretami. W żadnych okolicznościach nie przenosimy danych między regionami.

Oznacza to, że zmiana regionu jest mniej „migracją”, a bardziej założeniem nowego konta od podstaw w preferowanym regionie. Dobra wiadomość: zajmuje to około dwóch minut, a Twoja subskrypcja przenosi się automatycznie.

## Konta darmowe

Przejdź bezpośrednio do preferowanego regionu (pełną listę znajdziesz w sekcji [Dostępne regiony](/pl/regions#dostępne-regiony)) i utwórz nowe konto, używając tego samego adresu e-mail. To wszystko — Twoje nowe konto jest gotowe do natychmiastowego użycia.

## Konta płatne (Identity Plus)

Proces jest taki sam jak w przypadku kont darmowych, z jednym dodatkowym krokiem:

1. Przejdź na URL preferowanego regionu (zobacz [Dostępne regiony](/pl/regions#dostępne-regiony))
2. Utwórz konto, używając tego samego adresu e-mail powiązanego z Twoją subskrypcją
3. Zaloguj się i przejdź do strony konta
4. Status Twojej subskrypcji zostanie rozpoznany automatycznie za pośrednictwem Stripe

Może być konieczne jednokrotne odświeżenie strony, aby subskrypcja się zsynchronizowała. Działa to dlatego, że utrzymujemy dane oddzielone między regionami, podczas gdy Twoja relacja rozliczeniowa jest zarządzana przez Stripe, który rozpoznaje Twój adres e-mail we wszystkich regionach.

## Co dzieje się z Twoim starym kontem

Twoje konto w poprzednim regionie pozostaje w pełni funkcjonalne:

- Wszelkie istniejące linki do sekretów nadal działają, dopóki nie zostaną wyświetlone lub wygasną
- Twoje konto pozostaje aktywne na wypadek, gdybyś musiał do czegoś wrócić
- Nie jest wymagane żadne działanie na starym koncie, chyba że chcesz je zamknąć

## Migracja domeny niestandardowej

Jeśli masz skonfigurowaną domenę niestandardową w bieżącym regionie, proces wymaga nieco więcej planowania. Ponieważ Twoje istniejące linki do sekretów wykorzystują rekordy DNS domeny niestandardowej, nie możesz po prostu przekierować domeny do nowego regionu bez zerwania linków, które nie zostały jeszcze wyświetlone.

### Krok po kroku

1. **Dodaj tymczasową subdomenę** do konta w nowym regionie. Na przykład, jeśli Twoja obecna domena to `secrets.example.com`, dodaj coś w rodzaju `secrets-new.example.com` lub `secrets-us.example.com`.

2. **Utwórz rekord CNAME** dla tymczasowej subdomeny, wskazujący na odpowiedni regionalny punkt końcowy identity (np. `identity.us.onetime.co` dla regionu US). Szczegóły konfiguracji DNS znajdziesz w [Przewodniku konfiguracji domeny niestandardowej](/pl/custom-domains/setup-guide).

3. **Zacznij od razu korzystać z tymczasowej subdomeny** przy tworzeniu nowych sekretów.

4. **Po 30 dniach** wszystkie sekrety utworzone w starej domenie wygasną. Możesz wtedy:
   - Usunąć domenę niestandardową z konta w starym regionie
   - Dodać preferowaną subdomenę (np. `secrets.example.com`) do konta w nowym regionie
   - Zaktualizować rekord CNAME, aby wskazywał na punkt końcowy nowego regionu
   - Zweryfikować domenę w panelu konta

5. **Usuń** tymczasową subdomenę, gdy preferowana domena będzie już aktywna i zweryfikowana.

### Dlaczego 30 dni?

Maksymalny czas życia (TTL) sekretu wynosi 30 dni. Odczekanie tego okresu gwarantuje, że wszystkie sekrety utworzone w ramach konfiguracji DNS starego regionu zostały już wyświetlone lub wygasły, dzięki czemu aktualizacja rekordu CNAME nie zerwie żadnych oczekujących linków.

Jeśli wiesz, że wszystkie Twoje istniejące sekrety mają krótszy TTL lub zostały już wyświetlone, możesz dokonać zmiany wcześniej.

## Konta bez domen niestandardowych

Jeśli nie korzystasz z domeny niestandardowej, zmiana następuje natychmiast. Twoje stare linki (wykorzystujące regionalne adresy URL onetimesecret.com, np. `eu.onetimesecret.com/secret/abcd1234`) będą nadal działać poprawnie, niezależnie od tego, w którym regionie znajduje się Twoje aktywne konto.

## Wiele regionów

Możesz jednocześnie utrzymywać konta w wielu regionach. Wszystkie konta korzystające z tego samego adresu e-mail współdzielą ten sam status subskrypcji. Może to być przydatne, jeśli obsługujesz użytkowników w różnych obszarach geograficznych i chcesz zminimalizować opóźnienie lub spełnić wymagania dotyczące rezydencji danych.

## Instancje dedykowane

Klienci korzystający z instancji dedykowanych powinni skontaktować się z nami pod adresem [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) w sprawie zmiany regionu, ponieważ infrastruktura dedykowana wymaga ręcznej rekonfiguracji. Możesz też skontaktować się z nami poprzez [stronę opinii](https://onetimesecret.com/feedback).
