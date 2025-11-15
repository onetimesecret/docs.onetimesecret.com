---
title: Pobieranie sekretów
description: Dowiedz się, jak pobierać sekrety używając REST API Onetime Secret, z obsługą zarówno uwierzytelnionego, jak i anonimowego dostępu.
---

_Zaktualizowano 2025-04-02_

:::note
**Lokalizacja danych i wybór regionu**
- Wybierz [region](/pl/regions/) (np. [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) centra danych
- Rozważ czynniki takie jak suwerenność danych, opóźnienie i wymagania zgodności
- **UWAGA:** Domyślny `onetimesecret.com` pozostaje operacyjny i kieruje do aktywnego centrum danych, zalecane jest używanie określonej lokalizacji, ponieważ ta funkcjonalność może zostać wycofana w przyszłości.
:::

## Pobierz sekret

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Żądanie uwierzytelnione

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Żądanie anonimowe

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Parametry zapytania

- **SECRET_KEY**: unikalny klucz dla tego sekretu.
- **passphrase** (jeśli wymagana): fraza dostępowa jest wymagana tylko wtedy, gdy sekret został utworzony z nią.

### Atrybuty

- **secret_key**: unikalny klucz dla tworzonego sekretu. To jest klucz, którym możesz się podzielić.
- **value**: Rzeczywisty sekret. Nie trzeba dodawać, że będzie to dostępne tylko raz.

## Pobierz metadane

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Każdy sekret ma również powiązane metadane. Metadane są przeznaczone do użytku przez twórcę sekretu (tj. nie odbiorcę) i generalnie powinny być utrzymywane w prywatności. Możesz bezpiecznie używać klucza metadanych do pobierania podstawowych informacji o samym sekrecie (np. czy lub kiedy został wyświetlony), ponieważ klucz metadanych jest inny niż klucz sekretu.

### Żądanie uwierzytelnione

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Parametry zapytania

- **METADATA_KEY**: unikalny klucz dla tych metadanych.

### Atrybuty

- **custid**: nazwa użytkownika konta, które utworzyło sekret. Ta wartość będzie `anon` dla żądań anonimowych.
- **metadata\_key**: unikalny klucz dla metadanych. NIE udostępniaj tego.
- **secret\_key**: unikalny klucz dla utworzonego sekretu. To jest klucz, którym możesz się podzielić.
- **ttl**: Określony czas życia (tj. nie pozostały czas)
- **metadata\_ttl**: Pozostały czas (w sekundach), który metadane mają do życia.
- **secret\_ttl**: Pozostały czas (w sekundach), który sekret ma do życia.
- **recipient**: jeśli odbiorca został określony, jest to zaciemniona wersja adresu e-mail.
- **created**: Czas utworzenia metadanych w czasie unix (UTC)
- **updated**: to samo, ale czas ostatniej aktualizacji.
- **received**: Czas otrzymania sekretu.
- **passphrase\_required**: Jeśli fraza dostępowa została podana podczas tworzenia sekretu, będzie to prawda. W przeciwnym razie fałsz, oczywiście.


## Zniszcz sekret

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Zniszcz sekret, który nie został jeszcze odczytany.

### Żądanie uwierzytelnione

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Parametry zapytania

- Brak

### Atrybuty

- To samo co atrybuty metadanych ze statusem zniszczony.

## Pobierz ostatnie metadane

**GET https://onetimesecret.com/api/v1/private/recent**

Pobierz listę ostatnich metadanych.

### Żądanie uwierzytelnione

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Parametry zapytania

- Brak

### Atrybuty

- To samo co atrybuty metadanych, chociaż jako lista, a wartość klucza sekretu będzie zawsze null.

::: warning Wymagane uwierzytelnienie
Uwaga: Metadane i operacje zarządzania (pobierz metadane, zniszcz sekret, ostatnie metadane) są dostępne tylko dla uwierzytelnionych użytkowników.
:::
