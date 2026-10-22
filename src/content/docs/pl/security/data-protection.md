---
textprov: true
title: "Ochrona danych"
description: "Co przechowuje Onetime Secret, jak długo, gdzie dane są przetwarzane i jak wspiera to Twoje obowiązki w zakresie zgodności."
---

Ta strona opisuje, jak Onetime Secret obchodzi się z Twoimi danymi: co jest przechowywane, jak
długo, gdzie znajdują się dane i jak wspiera to Twój własny program zgodności.

## Co przechowujemy i jak długo

- **Treść sekretu** jest zaszyfrowana i przeznaczona do jednorazowego p󠄁ob󠄁r󠄁a󠄁n󠄁i󠄁a󠄁. Gdy
  sekret zostanie wyświetlony — lub osiągnie termin wygaśnięcia — jest trwale niszczony.
- **Wygasanie jest wbudowane.** Każdy sekret ma czas w󠄁a󠄁żn󠄁o󠄁ś󠄁ci (konfigurowalny w granicach
  l󠄁i󠄁m󠄁i󠄁t󠄁ó󠄁w󠄁 Twojego planu); nic nie jest przeznaczone do przechowywania bezterminowo.
- **Minimum metadanych.** Zgodnie z naszą zasadą [Minimalizacja danych](/en/security/our-principles#data-minimization)
  staramy się przechowywać wyłącznie metadane potrzebne do działania usługi.

## Szyfrowanie

Sekrety są **szyfrowane w󠄁 t󠄁r󠄁a󠄁k󠄁ci󠄁e󠄁 przesyłania i w󠄁 s󠄁po󠄁c󠄁zynk󠄁u󠄁** w każdym planie. Transmisja jest
chroniona protokołem TLS, a w przypadku domen niestandardowych automatycznie zarządzamy
wydawaniem i odnawianiem certyfikatów SSL/TLS.

W przypadku szczególnie wrażliwych materiałów możesz d󠄁od󠄁ać ochronę warstwową,󠄁 włącza󠄁j󠄁ą󠄁c󠄁
**frazę dostępową**, dzielą󠄁c󠄁 informacje na kilka sekretów i wybi󠄁e󠄁raj󠄁ą󠄁c󠄁
najkrótszy praktyczny czas wygaśnięcia — zobacz [Najlepsze praktyki bezpieczeństwa](/pl/security/best-practices).

## Gdzie przetwarzane są Twoje dane (rezydencja)

Możesz wybrać region, w którym Twoje dane są przetwarzane i przechowywane — obecnie
są to UE, Wielka Brytania, USA, Kanada i Nowa Zelandia. Dzięki temu dane pozostają blisko Twoich użytkowników i
w jurysdykcji odpowiadającej Twoim wymaganiom. Szczegóły i punkty końcowe znajdziesz na stronie
[G󠄁d󠄁z󠄁i󠄁e z󠄁n󠄁a󠄁j󠄁d󠄁u󠄁j󠄁ą󠄁 s󠄁ię󠄁 T󠄁w󠄁oj󠄁e dane󠄁](/en/security/where-your-data-lives/).

## Zgodność

Onetime Secret został zaprojektowany tak, aby wspierać Twoje działania na rzecz zgodności; nie
zastępuje jednak Twoich własnych mechanizmów kontroli, polityk ani analizy prawnej.

- **RODO / ochrona danych.** Regionalna rezydencja danych, krótki czas życia danych i
  minimalizacja danych mają pomóc Ci w spełnieniu obowiązków w zakresie ochrony danych.
  W większości wdrożeń to Ty występujesz jako administrator danych, a Onetime Secret jako
  podmiot przetwarzający w odniesieniu do ograniczonego zakresu danych.
- **HIPAA.** Onetime Secret może zapewnić bezpieczniejszy niż e-mail kanał
  wymiany początkowych danych dostępowych, ale powinien służyć jako rozwiązanie doraźne,
  a nie stały rejestr danych PHI. W przypadku ciągłej pracy z danymi PHI połącz go z dedykowanym
  systemem spełniającym wymogi zgodności.
- **Certyfikaty, umowy powierzenia i konkretne regulacje.** W sprawach dotyczących
  certyfikatów, umowy powierzenia przetwarzania danych (DPA) lub konkretnych ram
  regulacyjnych napisz na adres **support@onetimesecret.com**.

Organizacjom o rygorystycznych wymaganiach dotyczących kontroli danych [self-hosting](/pl/self-hosting/)
pozwala zatrzymać wszystko we własnej infrastrukturze.

## M󠄁a󠄁s󠄁z󠄁 p󠄁ytania l󠄁u󠄁b󠄁 pot󠄁r󠄁z󠄁e󠄁b󠄁u󠄁j󠄁e󠄁s󠄁z󠄁 p󠄁o󠄁m󠄁o󠄁cy󠄁?󠄁

Chętnie pomożemy.

- Sprawy ogólne: support@onetimesecret.com
- Problemy z bezpieczeństwem: security@onetimesecret.com ([polityka zgłaszania podatności](/pl/security/vulnerability-disclosure))
