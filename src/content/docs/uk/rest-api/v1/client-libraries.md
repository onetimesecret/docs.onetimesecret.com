---
title: Клієнтські бібліотеки
description: Вивчіть клієнтські бібліотеки, доступні для Onetime Secret API, включаючи Ruby, Python, Perl, Java, C#, Go та інші.
---

## Рубі.


[Github-сторінка onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
автором [Delano](https://delanotes.com/) (оновлено 2024-06-09)

### Приклад використання

```ruby``
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: 'Джаз, джаз і ще раз джаз',
  recipient: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
підставляє ret['secret_key']
```

---

## Python


[сторінка Github - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
за [slashpass](https://github.com/slashpass) (додано 2021-07-08)

### Приклад використання

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # повернути посилання на зразок https://onetimesecret.com/secret/xxxxxxxxxxx
```

[Сторінка на Github - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
[Владислав Степанов](https://github.com/utter-step/) (додано 2012-06-26)

### Приклад використання

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


[Net::OneTimeSecret на CPAN](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
[Кайл Докінз](http://www.shoffle.com/) (додано 2012-01-06)

### Приклад використання

```perl``.
#!/usr/bin/env perl

використовувати Net::OneTimeSecret;

# Примітка: замініть ці дані на ваші, щоб це працювало!
my $customerId = 'YOUR_EMAIL';
my $testApiKey = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Джаз, джаз і ще раз джаз,
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );
```

---

## Java


[Сторінка на Github - onetime-java](https://github.com/mpawlowski/onetime-java)
[Марцін Павловський](https://github.com/mpawlowski) (додано 2014-05-22)

### Приклад використання

```java
OneTimeSecret ots = new OneTimeSecretRestImpl(
    "https://path/to/ots/instance",
    "ots-username",
    "ots-apikey");

Згенерувати відповідь generateResponse = ots.generate(
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


[Сторінка на Github - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
[Владислав Степанов](https://github.com/utter-step/) (додано 2014-05-29)

### Приклад використання

```csharp
# Ви можете використовувати OneTimeSharp у будь-якому вашому проекті, сумісному з .NET (4.0+) або Mono (2.10.8+).
використовуючи VStepanov.OneTimeSharp;

class Test
{
    static void Main(string[] args)
    {
        var ots = new OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY");

        var generated = ots.GenerateSecret();

        Console.WriteLine(generated.Value); // LR*?us*A(UT*)

        Console.WriteLine(generated.SecretKey); // ikzx3m77j5by8411cg5lk5fvfylvl0i
        Console.WriteLine(ots.GetSecretLink(generated)); // https://onetimesecret.com/secret/ikzx3m77j5by8411cg5lk5fvfylvl0i

        var shared = ots.ShareSecret("Привіт, OTS!");

        Console.WriteLine(shared.MetadataKey); // kd6rgsucl98qbgu9eavjq4k5sdxsom0
        Console.WriteLine(ots.GetMetadataLink(shared)); // https://onetimesecret.com/private/kd6rgsucl98qbgu9eavjq4k5sdxsom0
    }
}
```

---

## Іди.


[Сторінка на Github - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
[Corbalt](https://github.com/corbaltcode/) (додано 2021-12-10)

### Приклад використання

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Ім'я користувача: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // обробити помилку
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // обробити помилку
}

// виводить "коди запуску"
print(secret)
```

### Приклад використання як CLI

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'те, що є важливим, невидиме для ока'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
те, що є важливим, невидиме для ока

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Вперед (ліб)


[Сторінка на Github](https://github.com/emdneto/otsgo)
[Emídio Neto](https://github.com/emdneto) (додано 2024-06-09)

### Приклад використання

Давай.
// Створити нового клієнта
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Надіслати запит з контекстом
ctx := context.Background()
відповідь, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Сторінка на Github - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
від [Craig Gumbley](https://www.helloitscraig.co.uk) (оновлено 2017-04-28)

### Приклад використання

``powershell
# Встановлення з галереї PowerShell
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Встановити інформацію про з'єднання
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Створіть новий спільний секрет
New-OTSSharedSecret -Секрет "Дуже секретний" -Парольна фраза 1234 -Одержувач user@mail.com

# Отримати секретний ключ
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Password 1234

# Переглянути всі доступні функції
Get-Command -Module OneTimeSecret | Select Name
```

---

## Баш!


[Сторінка на Github - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
автор [Eric Engstrom](https://eengstrom.github.io/) (оновлено 2018-12-19)

### Приклад використання як API для написання сценаріїв

```bash
# джерело для анонімного використання (секрети створюються анонімно)
джерело ots.bash

# або, джерело з певними обліковими даними
APIUSER="ІМ'Я КОРИСТУВАЧА"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# перевірити статус сервера
ots_status

# створюємо секрет і повертаємо URL-адресу
URL=$(echo "secret" | ots_share)

# поділитися багаторядковим секретом через HEREDOC.
URL=$(ots_share <<-EOF
      Це секрет
      ... на декілька рядків
EOF
)

# передайте опції для обміну або генерації.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# отримуємо секретні дані
local DATA="$(ots_retrieve "$URL")"

# ділимося/генеруємо новий секрет і повертаємо приватний ключ метаданих
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# отримати список нещодавно створених приватних ключів метаданих.
# зауважте, що для цього потрібні дійсні облікові дані для автентифікації
local -a RECENT=( $(ots_recent) )

# перевірка поточного стану секрету, враховуючи приватний ключ
ots_state $KEY

# записати секрет, враховуючи приватний ключ
ots_burn $KEY
```

### Приклад використання як CLI

```bash
# Поділіться секретом (з stdin
./ots share
SECRET
^D

# Поділися секретом (через HEREDOC)
./ots share <<-EOF
      Це багаторядковий секрет через HEREDOC.
      Тут має бути щось інше.
EOF

# Отримати/відновити секрет:
./ots get <key|url>.
./ots retrieve <key|url>.

### Приклад використання як CLI

``bash``
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
