---
title: Tworzenie sekretów
description: Dowiedz się, jak tworzyć i pobierać sekrety używając REST API Onetime Secret, z obsługą zarówno uwierzytelnionego, jak i anonimowego użytkowania.
---

_Zaktualizowano 2025-04-02_

:::note
**Lokalizacja danych i wybór regionu**
- Wybierz między centrami danych USA ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), UE ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Kanada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)) lub Nowa Zelandia ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/))
- Rozważ czynniki takie jak suwerenność danych, opóźnienie i wymagania zgodności
- **UWAGA:** Domyślny `onetimesecret.com` pozostaje operacyjny i kieruje do aktywnego centrum danych, zalecane jest używanie określonej lokalizacji, ponieważ ta funkcjonalność może zostać wycofana w przyszłości.
:::


## Utwórz sekret

`POST https://REGION.onetimesecret.com/api/v1/share`

Użyj tego endpointu, aby przechować wartość sekretu i utworzyć link jednorazowego użytku.


### Żądanie uwierzytelnione

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Żądanie anonimowe

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Parametry zapytania

- **secret**: wartość sekretu, która jest zaszyfrowana przed przechowaniem. Istnieje maksymalna długość oparta na Twoim planie, która jest egzekwowana (1k-10k).
- **passphrase**: ciąg znaków, który odbiorca musi znać, aby wyświetlić sekret. Ta wartość jest również używana do szyfrowania sekretu i jest bcryptowana przed przechowaniem, więc mamy tę wartość tylko podczas przesyłania.
- **ttl**: maksymalna ilość czasu, w sekundach, przez którą sekret powinien przetrwać (tj. czas życia). Po upływie tego czasu sekret zostanie usunięty i nie będzie możliwy do odzyskania.
- **recipient**: adres e-mail. Wyślemy przyjazny e-mail zawierający link do sekretu (NIE sam sekret).
- **share_domain**: niestandardowa domena do użycia podczas generowania linku do sekretu. Jeśli nie podano, używana jest domyślna domena (np. eu.onetimesecret.com).

### Atrybuty

- **custid**: nazwa użytkownika konta, które utworzyło sekret. Ta wartość będzie `anon` dla żądań anonimowych.
- **metadata\_key**: unikalny klucz dla metadanych. NIE udostępniaj tego.
- **secret\_key**: unikalny klucz dla tworzonego sekretu. To jest klucz, którym możesz się podzielić.
- **ttl**: Określony czas życia (w sekundach) (tj. nie pozostały czas)
- **metadata\_ttl**: Pozostały czas (w sekundach), który metadane mają do życia.
- **secret\_ttl**: Pozostały czas (w sekundach), który sekret ma do życia.
- **recipient**: jeśli odbiorca został określony, jest to zaciemniona wersja adresu e-mail.
- **created**: Czas utworzenia sekretu w czasie unix (UTC)
- **updated**: to samo, ale czas ostatniej aktualizacji.
- **passphrase\_required**: Jeśli fraza dostępowa została podana podczas tworzenia sekretu, będzie to prawda. W przeciwnym razie fałsz, oczywiście.
- **share_domain**: niestandardowa domena do użycia podczas generowania linku do sekretu. W przeciwnym razie "".


### Przykładowa odpowiedź:

```json
{
  "custid":"USERNAME",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Wygeneruj sekret

`POST https://REGION.onetimesecret.com/api/v1/generate`

Wygeneruj krótki, unikalny sekret. Jest to przydatne dla tymczasowych haseł, jednorazowych notatników, soli itp.

### Żądanie uwierzytelnione

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Żądanie anonimowe

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
  "custid":"USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key":"2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key":"pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Atrybuty

To samo co "Udostępnij sekret" powyżej, z dodatkiem pola `value`.
