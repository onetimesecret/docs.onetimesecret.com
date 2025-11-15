---
title: Przewodnik konfiguracji
description: Ten przewodnik przeprowadzi Cię przez proces konfiguracji niestandardowej domeny dla Twojego konta Onetime Secret, w tym różnice między subdomenami a domenami apex oraz wybór preferowanego regionu centrum danych.
---

# Przewodnik konfiguracji niestandardowej domeny

## Wymagania wstępne

- Aktywne konto Onetime Secret z włączoną funkcją niestandardowej domeny
- Domena, którą posiadasz i dla której możesz zarządzać ustawieniami DNS

## Zrozumienie typów domen

Przed skonfigurowaniem niestandardowej domeny ważne jest zrozumienie różnicy między subdomenami a domenami apex:

1. **Subdomena**: Podział Twojej głównej domeny (np. secrets.twojadomеna.com)
2. **Domena apex**: Sama domena główna (np. twojadomena.com)

## Wybierz swój region

Onetime Secret oferuje dwa regiony centrów danych: UE i USA. Podczas konfigurowania niestandardowej domeny będziesz musiał wybrać, który region preferujesz do przechowywania swoich danych. Ten wybór jest ważny z kilku powodów:

- **Dla osób indywidualnych**: Możesz wybrać w oparciu o swoje osobiste preferencje, takie jak bliskość dla potencjalnie szybszego dostępu lub osobiste obawy dotyczące suwerenności danych.
- **Dla firm**: Twój wybór może zależeć od Twoich zobowiązań dotyczących lokalizacji danych, takich jak zgodność z RODO, wytycznymi stanowymi lub prowincjonalnymi. Upewnij się, że wybrałeś region, który najlepiej odpowiada Twoim wymaganiom regulacyjnym.

Rozważ swoje specyficzne potrzeby i wymagania podczas dokonywania tego wyboru. Po bardziej szczegółowe informacje o naszych regionach centrów danych i jak wybrać odpowiedni dla swoich potrzeb, zapoznaj się z naszym przewodnikiem [Regiony centrów danych](/pl/regions).

## Krok 1: Dostęp do panelu domen

1. Zaloguj się do swojego konta Onetime Secret
2. Przejdź do Panel > Niestandardowe domeny
3. Kliknij "Dodaj domenę"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Widok niestandardowych domen" width="400" />

## Krok 2: Wprowadź swoją domenę

1. W ustawieniach niestandardowej domeny wprowadź wybraną domenę (np. secrets.twojadomena.com lub twojadomena.com)
2. Kliknij "Dodaj domenę" lub równoważny przycisk, aby kontynuować

## Krok 3: Skonfiguruj ustawienia DNS

Aby podłączyć swoją domenę, musisz zaktualizować ustawienia DNS. Proces różni się nieznacznie w zależności od tego, czy używasz subdomeny czy domeny apex oraz który region centrum danych wybrałeś.

### Dla subdomen (zalecane)

1. Uzyskaj dostęp do panelu zarządzania DNS swojej domeny (przez rejestratora domeny lub dostawcę DNS)
2. Utwórz rekord CNAME z następującymi szczegółami:
   - Host: Twoja wybrana subdomena (np. secrets)
   - Wskazuje na / Wartość:
     - Dla regionu UE: identity.eu.onetime.co
     - Dla regionu USA: identity.us.onetime.co
3. Usuń wszelkie istniejące rekordy A, AAAA lub CNAME dla tej samej subdomeny

### Dla domen apex

1. Uzyskaj dostęp do panelu zarządzania DNS swojej domeny
2. Utwórz lub zmodyfikuj rekord A z następującymi szczegółami:
   - Host: @ (lub pozostaw puste, w zależności od dostawcy DNS)
   - Wskazuje na / Wartość:
     - Dla regionu UE: 109.105.217.207
     - Dla regionu USA: 66.51.126.41

Ważne: Upewnij się, że nie ma konfliktujących rekordów dla domeny, której używasz.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Ustawienia niestandardowej domeny" width="400" />

### Więcej informacji

#### Dlaczego CNAME dla subdomen?

Zalecamy używanie rekordów CNAME dla subdomen, ponieważ:

1. Są bardziej elastyczne i pozwalają nam zmienić adresy IP naszych serwerów bez konieczności aktualizacji ustawień DNS.
2. Automatycznie dostosowują się do wszelkich zmian, które wprowadzamy w naszej infrastrukturze.

#### Dlaczego rekordy A dla domen apex?

Domeny apex nie mogą używać rekordów CNAME ze względu na standardy DNS. Dlatego musimy używać rekordów A, które mają pewne ograniczenia:

1. Jeśli zmienimy nasz adres IP (co jest rzadkie), będziesz musiał ręcznie zaktualizować swoje ustawienia DNS.
2. Nie dostosowują się automatycznie do zmian w naszej infrastrukturze.

## Krok 4: Weryfikuj domenę i poczekaj na SSL

1. Po zaktualizowaniu ustawień DNS wróć do strony niestandardowej domeny Onetime Secret
2. System automatycznie spróbuje zweryfikować Twoją domenę
3. Generowanie certyfikatu SSL rozpocznie się po pomyślnej weryfikacji
4. Ten proces może zająć kilka minut

## Krok 5: Potwierdź konfigurację

Po zakończeniu konfiguracji powinieneś zobaczyć następujące informacje:

- Status domeny: Aktywna z SSL
- Adres docelowy: identity.eu.onetime.co lub identity.us.onetime.co (w zależności od wybranego regionu)
- Status SSL: Aktywny
- Data odnowienia SSL: (Będzie wyświetlona, zazwyczaj około roku od konfiguracji)

## Rozwiązywanie problemów

- Jeśli weryfikacja się nie powiedzie, sprawdź dokładnie swoje ustawienia DNS
- Upewnij się, że usunąłeś wszelkie konfliktujące rekordy
- Propagacja DNS może zająć do 24 godzin, chociaż zazwyczaj jest znacznie szybsza

## Używanie niestandardowej domeny

Po aktywacji Twoje linki do sekretów będą używać Twojej niestandardowej domeny. Na przykład:
`https://secrets-example.onetime.dev/secret/abc123`

## Mamy Cię pod opieką

Zajmujemy się resztą szczegółów technicznych, abyś nie musiał.

- Nieustannie monitorujemy status Twojej domeny
- Certyfikaty SSL są automatycznie odnawiane bez konieczności jakichkolwiek działań z Twojej strony

Dla tych, którzy lubią być na bieżąco, możesz łatwo sprawdzić stan swojej domeny:

- Po prostu spójrz na znacznik czasu "Ostatnio monitorowane" w swoim panelu, aby potwierdzić ciągłą łączność

## Pytania lub potrzebujesz wsparcia?

Jesteśmy tutaj, aby pomóc. Jeśli masz jakiekolwiek pytania lub potrzebujesz pomocy:

- Wyślij e-mail bezpośrednio na support@onetimesecret.com
- Użyj naszego formularza opinii na https://onetimesecret.com/feedback

Nasz zespół jest zaangażowany w zapewnienie najlepszego możliwego wsparcia dla konfiguracji i użytkowania niestandardowej domeny, w tym wskazówek dotyczących wyboru odpowiedniego regionu centrum danych dla Twoich potrzeb.
