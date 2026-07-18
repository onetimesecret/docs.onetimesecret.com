---
title: Ochrona danych
description: Co przechowuje Onetime Secret, jak długo, gdzie dane są przetwarzane i jak wspiera to Twoje obowiązki w zakresie zgodności.
---

Ta strona opisuje, jak Onetime Secret obchodzi się z Twoimi danymi: co jest przechowywane, jak długo, gdzie znajdują się dane i jak wspiera to Twój własny program zgodności.

## Co przechowujemy i jak długo

- **Treść sekretu** jest zaszyfrowana i przeznaczona do jednorazowego odczytu. Gdy sekret zostanie wyświetlony — lub osiągnie termin wygaśnięcia — jest trwale niszczony.
- **Wygasanie jest wbudowane.** Każdy sekret ma określony czas życia (konfigurowalny w granicach Twojego planu); nic nie jest przeznaczone do przechowywania bezterminowo.
- **Minimum metadanych.** Zgodnie z naszą zasadą [Minimalizacja danych](/pl/principles/data-minimization) staramy się przechowywać wyłącznie metadane potrzebne do działania usługi.

## Szyfrowanie

Sekrety są **szyfrowane podczas przesyłania i przechowywania** w każdym planie. Transmisja jest chroniona protokołem TLS, a w przypadku domen niestandardowych automatycznie zarządzamy wydawaniem i odnawianiem certyfikatów SSL/TLS.

W przypadku szczególnie wrażliwych materiałów możesz zastosować ochronę warstwową: włączyć **frazę dostępową**, podzielić informacje na kilka sekretów i wybrać najkrótszy praktyczny czas wygaśnięcia — zobacz [Najlepsze praktyki bezpieczeństwa](/pl/security-best-practices).

## Gdzie przetwarzane są Twoje dane (rezydencja)

Możesz wybrać region, w którym Twoje dane są przetwarzane i przechowywane — obecnie są to UE, Wielka Brytania, USA, Kanada i Nowa Zelandia. Dzięki temu dane pozostają blisko Twoich użytkowników i w jurysdykcji odpowiadającej Twoim wymaganiom. Szczegóły i punkty końcowe znajdziesz na stronie [Regiony centrów danych](/pl/regions).

## Zgodność

Onetime Secret został zaprojektowany tak, aby wspierać Twoje działania na rzecz zgodności; nie zastępuje jednak Twoich własnych mechanizmów kontroli, polityk ani analizy prawnej.

- **RODO / ochrona danych.** Regionalna rezydencja danych, krótki czas życia danych i minimalizacja danych mają pomóc Ci w spełnieniu obowiązków w zakresie ochrony danych. W większości wdrożeń to Ty występujesz jako administrator danych, a Onetime Secret jako podmiot przetwarzający w odniesieniu do ograniczonego zakresu danych.
- **HIPAA.** Jak wspomniano w naszych [przypadkach użycia](/pl/custom-domains/use-cases), Onetime Secret może zapewnić bezpieczniejszy niż e-mail kanał wymiany początkowych danych dostępowych, ale powinien służyć jako rozwiązanie doraźne, a nie stały rejestr danych PHI. W przypadku ciągłej pracy z danymi PHI połącz go z dedykowanym systemem spełniającym wymogi zgodności.
- **Certyfikaty, umowy powierzenia i konkretne regulacje.** W sprawach dotyczących certyfikatów, umowy powierzenia przetwarzania danych (DPA) lub konkretnych ram regulacyjnych napisz na adres **support@onetimesecret.com**.

Organizacjom o rygorystycznych wymaganiach dotyczących kontroli danych [self-hosting](https://github.com/onetimesecret/onetimesecret) pozwala zatrzymać wszystko we własnej infrastrukturze.

## Masz pytania lub potrzebujesz pomocy?

Chętnie pomożemy.

- Sprawy ogólne: support@onetimesecret.com
- Problemy z bezpieczeństwem: security@onetimesecret.com ([polityka zgłaszania podatności](/pl/security/vulnerability-disclosure))
