---
title: Przypadki użycia
description: Typowe scenariusze, w których niestandardowe domeny zwiększają bezpieczeństwo udostępniania poufnych informacji.
---

## Przypadki użycia niestandardowych domen

Linki do sekretów z niestandardowymi domenami zapewniają wysoki stopień bezpieczeństwa udostępniania poufnych danych przy jednoczesnym zachowaniu spójności i ciągłości marki. Oto kilka sposobów, w jakie nasi klienci używają naszej usługi.

### 1. Onboarding lub fakturowanie klientów

Podczas żądania poufnych informacji od klienta, takich jak szczegóły finansowe lub informacje o karcie kredytowej, poproś go, aby udostępnił je tworząc link do sekretu na secrets.example.com. To zapewnia, że informacje są udostępniane bezpiecznie i są dostępne tylko dla zamierzonego odbiorcy.

**Korzyść**: Używając niestandardowej domeny, możesz wzmocnić tożsamość swojej marki i zbudować zaufanie z klientami. Klient rozpozna domenę i będzie czuł się pewniej udostępniając poufne informacje.

### 2. Dane uwierzytelniające DevOps

Podczas zarządzania wdrożeniami w wielu środowiskach i zespołach udostępniaj tymczasowe dane dostępu przez secure.example.com. Zespoły deweloperskie mogą bezpiecznie wymieniać hasła do baz danych, tokeny API i pliki konfiguracyjne, które automatycznie wygasają po pierwszym użyciu, zapobiegając ujawnieniu tych poufnych szczegółów w repozytoriach kodu, logach czatu lub wątkach e-mail.

**Korzyść**: Integrując niestandardową domenę z zautomatyzowanymi potokami CI/CD, utrzymujesz najlepsze praktyki bezpieczeństwa, jednocześnie zachowując płynne zarządzanie danymi uwierzytelniającymi w przepływie pracy deweloperskiej. Deweloperzy mogą ufać, że dane uwierzytelniające pochodzą z autoryzowanego źródła, a automatyczna rotacja zapewnia, że ujawnione dane nie mogą być ponownie użyte.

### 3. Onboarding pracowników

Podczas wprowadzania nowych członków zespołu usprawnij ich dostęp pierwszego dnia, wysyłając tymczasowe dane logowania przez access.example.com. Zespoły HR i IT mogą przygotować zindywidualizowane pakiety powitalne zawierające początkowe hasła, konfiguracje VPN i linki do poufnej dokumentacji, które wygasają po dostępie, zapewniając, że dane uwierzytelniające nie pozostają w skrzynkach e-mail ani nie są przypadkowo przekazywane.

**Korzyść**: Używając brandowanej domeny do dystrybucji danych uwierzytelniających, tworzysz profesjonalne doświadczenie onboardingowe, jednocześnie ustanawiając zdrowe praktyki bezpieczeństwa. Nowi pracownicy mogą pewnie uzyskiwać dostęp do zasobów wiedząc, że pochodzą z zaufanego źródła firmowego.

### 4. Prywatna komunikacja HR

Podczas obsługi poufnych informacji pracowniczych, takich jak szczegóły wynagrodzenia, numery identyfikacji podatkowej lub kody rejestracji świadczeń, udostępniaj poufne dane przez hrinfo.example.com. Zespoły HR mogą wysyłać czasowo ograniczone linki do poszczególnych pracowników zawierające ich informacje osobiste jako bezpieczny tekst, zapewniając, że poufne szczegóły wygasają po dostępie i pozostają chronione zgodnie z przepisami o ochronie danych.

**Korzyść**: Wykorzystując brandowaną domenę firmy do poufnej komunikacji HR, utrzymujesz profesjonalne standardy, jednocześnie spełniając wymagania zgodności dotyczące obsługi danych osobowych. Pracownicy mogą bezpiecznie uzyskiwać dostęp do swoich poufnych informacji przez zaufany kanał, który wzmacnia Twoje zaangażowanie w ochronę danych.

### 5. Dostęp tymczasowego personelu
Podczas zarządzania rotującym personelem klinicznym, rezydentami lub tymczasowymi pracownikami bezpiecznie komunikuj początkowe dane logowania przez tempaccess.example.com. Zespoły administracyjne mogą tworzyć czasowo ograniczone linki zawierające nazwy użytkowników systemowych i tymczasowe hasła, gdzie bezpieczna wiadomość zawierająca te dane uwierzytelniające wygasa po pierwszym wyświetleniu.

Uwaga: Podczas wdrażania tego rozwiązania upewnij się, że kompletny stos bezpieczeństwa utrzymuje zgodność z odpowiednimi przepisami opieki zdrowotnej, takimi jak HIPAA lub RODO. OneTimeSecret powinien być używany tylko do bezpiecznej komunikacji początkowych danych dostępu, podczas gdy rzeczywiste czasy trwania dostępu do systemu i uprawnienia powinny być zarządzane przez systemy kontroli dostępu Twojej organizacji. Chociaż usługa zapewnia większe bezpieczeństwo niż e-mail dla udostępniania poufnych informacji, takich jak PHI, powinna być używana jako środek tymczasowy, a nie stałe rozwiązanie dla takich danych - rozważ wdrożenie dedykowanych systemów bezpiecznego przesyłania wiadomości zgodnych z HIPAA do regularnej komunikacji PHI.

## Podsumowanie

Możliwość generowania bezpiecznych, czasowo ograniczonych linków przez Twoją brandowaną domenę zapewnia dodatkowe bezpieczeństwo bez kompromisów w wydajności. Każdy przypadek użycia pokazuje, jak niestandardowe domeny zwiększają zarówno postawę bezpieczeństwa, jak i profesjonalną obecność.
