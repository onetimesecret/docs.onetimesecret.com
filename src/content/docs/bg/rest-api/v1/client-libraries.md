---
title: Клиентски библиотеки
description: Разгледайте наличните клиентски библиотеки за Onetime Secret API, включително Ruby, Python, Perl, Java, C#, Go и др.
---

## Ruby


[Страница в Github onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
от [Delano](https://delanotes.com/) (актуализирано 2024-06-09)

### Пример за използване

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: "Джаз, джаз и още джаз.",
  получател: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Страница в Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
от [slashpass](https://github.com/slashpass) (добавено 2021-07-08)

### Пример за използване

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # връща връзка като https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Страница в Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
от [Vladislav Stepanov](https://github.com/utter-step/) (добавено 2012-06-26)

### Пример за използване

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u "test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[Net::OneTimeSecret в CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
от [Kyle Dawkins](http://www.shoffle.com/) (добавено 2012-01-06)

### Пример за използване

```perl
#!/usr/bin/env perl

използвайте Net::OneTimeSecret;

# Забележка: заменете ги с вашите, за да работи това!
my $customerId = 'YOUR_EMAIL';
my $testApiKey = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.',
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf("%s\n", $result->{secret_key} );

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf("%s\n", $secret->{value} );
```

---

## Java


[Страница в Github - onetime-java](https://github.com/mpawlowski/onetime-java)
от [Marcin Pawlowski](https://github.com/mpawlowski) (добавено 2014-05-22)

### Пример за използване

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

GenerateResponse generateResponse = ots.generate(
                new GenerateRequest.Builder()
                        .withPassphrase("supersecret")
                        .build());

RetrieveResponse retrieveResponse = ots.retrieve(
                new RetrieveRequest.Builder()
                        .withSecretKey(shareResponse.getSecretKey())
                        .withPassphrase("supersecret")
                        .build());

assertEquals(generateResponse.getValue(), retrieveResponse.getValue());
```

---

## C#


[Страница в Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
от [Vladislav Stepanov](https://github.com/utter-step/) (добавено 2014-05-29)

### Пример за използване

```c`sharp
# Можете да използвате OneTimeSharp във всеки ваш проект, който е съвместим с .NET (4.0+) или Mono (2.10.8+).
using VStepanov.OneTimeSharp;

клас Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Hello, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Go


[Страница в Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
от [Corbalt](https://github.com/corbaltcode/) (добавено 2021-12-10)

### Пример за използване

``` go
import ots "github.com/corbaltcode/go-onetimesecret"

клиент := ots.Client{
  Потребителско име: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("кодовете за стартиране", "passphrase", 0, "")
if err != nil {
  // обработка на грешка
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // обработка на грешка
}

// отпечатва "кодовете за изстрелване"
print(secret)
```

### Пример за използване като CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put "същественото е невидимо за окото
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
същественото е невидимо за окото

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Страница в Github](https://github.com/emdneto/otsgo)
от [Emídio Neto](https://github.com/emdneto) (добавено 2024-06-09)

### Пример за използване

``` go
// Изграждане на нов клиент
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Изпращане на заявка с контекст
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Страница в Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
от [Craig Gumbley](https://www.helloitscraig.co.uk) (актуализирано 2017-04-28)

### Пример за използване

```powershell
# Инсталиране от галерията PowerShell
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Задаване на информация за връзката
Set-OTSAuthorizationToken -Username user@mail.com -APIKey ххххххххххххххххххххххххххххх

# Генериране на нова споделена тайна
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Извличане на тайна
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Преглед на всички налични функции
Get-Command -Module OneTimeSecret | Изберете име
```

---

## Bash


[Страница в Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
от [Eric Engstrom](https://eengstrom.github.io/) (актуализирано 2018-12-19)

### Пример за използване като API за скриптове

```bash
# източник за анонимна употреба (тайните са създадени анонимно)
source ots.bash

# или, източник с конкретни авт. данни
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# проверка на състоянието на сървъра
ots_status

# създаване на тайна и връщане на URL адреса
URL=$(echo "secret" | ots_share)

# споделяне на многоредова тайна чрез HEREDOC.
URL=$(ots_share <<-EOF
      Това е тайна
      ... на няколко реда
EOF
)

# предайте опции за споделяне или генериране.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# извличане на тайните данни
local DATA="$(ots_retrieve "$URL")"

# споделяне/генериране на нова тайна и получаване обратно на частния ключ за метаданни
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# получаване на списък с наскоро създадените частни ключове за метаданни.
# имайте предвид, че това изисква валидни пълномощия за автентикация
local -a RECENT=( $(ots_recent) )

# проверка на текущото състояние на тайна, като се има предвид частният ключ
ots_state $KEY

# изгорете тайна, като вземете частния ключ
ots_burn $KEY
```

### Пример за използване като CLI

```bash
# Споделяне на тайна (от stdin
./ots share
SECRET
^D

# Споделяне на тайна (чрез HEREDOC)
./ots share <<-EOF
      Това е многоредова тайна чрез HEREDOC.
      Тук се поставя нещо друго.
EOF

# Получаване/извличане на тайна:
./ots get <key|url>
./ots retrieve <key|url>

### Пример за използване като CLI

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
