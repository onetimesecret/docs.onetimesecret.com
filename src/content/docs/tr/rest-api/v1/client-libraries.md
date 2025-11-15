---
title: İstemci Kütüphaneleri
description: Ruby, Python, Perl, Java, C#, Go ve daha fazlası dahil olmak üzere Onetime Secret API için mevcut istemci kütüphanelerini keşfedin.
---

## Ruby


[Github sayfası onetime-ruby](https://github.com/onetimesecret/onetime-ruby)
[Delano](https://delanotes.com/) tarafından (güncelleme 2024-06-09)

### Kullanım Örneği

```ruby
require 'onetime/api'

api = Onetime::API.new('YOUR_EMAIL', 'YOUR_OTS_APIKEY')
options = {
  secret: 'Jazz, jazz and more jazz.',
  recipient: 'example@onetimesecret.com',
  ttl: 7200
}

ret = api.post('/share', options)
puts ret['secret_key']
```

---

## Python


[Github sayfası - onetimesecret-cli](https://github.com/slashpass/onetimesecret-cli)
[slashpass](https://github.com/slashpass) tarafından (eklendi 2021-07-08)

### Kullanım Örneği

```python
from onetimesecret import OneTimeSecretCli

cli = OneTimeSecretCli(ONETIMESECRET_USER, ONETIMESECRET_KEY)
cli.create_link("secret") # https://onetimesecret.com/secret/xxxxxxxxxxx gibi bir bağlantı döndürür
```

[Github sayfası - py\_onetimesecret](https://github.com/utter-step/py_onetimesecret)
[Vladislav Stepanov](https://github.com/utter-step/) tarafından (eklendi 2012-06-26)

### Kullanım Örneği

```python
from onetimesecret import OneTimeSecret

o = OneTimeSecret("YOUR_EMAIL", "YOUR_OTS_APIKEY")
secret = o.share(u"test")

print o.retrieve_secret(secret["secret_key"])
# {u'secret_key': u'dtr7ixukiolpx1i4i87kahmhyoy2q65',
# u'value': u'test'}
```

---

## Perl


[CPAN'da Net::OneTimeSecret](http://search.cpan.org/~kyled/Net-OneTimeSecret/lib/Net/OneTimeSecret.pm)
[Kyle Dawkins](http://www.shoffle.com/) tarafından (eklendi 2012-01-06)

### Kullanım Örneği

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret;

# Not: bunun çalışması için bunları kendinizinkilerle değiştirin!
my $customerId  = 'YOUR_EMAIL';
my $testApiKey  = 'YOUR_OTS_APIKEY';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.',
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


[Github sayfası - onetime-java](https://github.com/mpawlowski/onetime-java)
[Marcin Pawlowski](https://github.com/mpawlowski) tarafından (eklendi 2014-05-22)

### Kullanım Örneği

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


[Github sayfası - OneTimeSharp](https://github.com/utter-step/OneTimeSharp)
[Vladislav Stepanov](https://github.com/utter-step/) tarafından (eklendi 2014-05-29)

### Kullanım Örneği

```csharp
# OneTimeSharp'ı .NET (4.0+) veya Mono (2.10.8+) ile uyumlu projelerinizde kullanabilirsiniz.
using VStepanov.OneTimeSharp;

class Test
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


[Github sayfası - onetimesecret](https://github.com/corbaltcode/go-onetimesecret)
[Corbalt](https://github.com/corbaltcode/) tarafından (eklendi 2021-12-10)

### Kullanım Örneği

```go
import ots "github.com/corbaltcode/go-onetimesecret"

client := ots.Client{
  Username: "user@example.com",
  Key: "my api key",
}

metadata, err := client.Put("the launch codes", "passphrase", 0, "")
if err != nil {
  // hatayı işle
}

secret, err := client.Get(metadata.SecretKey, "passphrase")
if err != nil {
  // hatayı işle
}

// "the launch codes" yazdırır
print(secret)
```

### CLI Olarak Kullanım Örneği

```bash
$ go install github.com/corbaltcode/go-onetimesecret/cmd/ots@latest

$ ots put 'what is essential is invisible to the eye'
hdjk6p0ozf61o7n6pbaxy4in8zuq7sm ifipvdpeo8oy6r8ryjbu8y7rhm9kty9

$ ots get hdjk6p0ozf61o7n6pbaxy4in8zuq7sm
what is essential is invisible to the eye

$ ots gen
rVjbS$twCJkS 4nwhy7v4fnabayqc5auv4ogh0nfr20 flsdlaun6hwczqu9utmc0vts5xj9xu1

$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```

---


## Go (lib)


[Github sayfası](https://github.com/emdneto/otsgo)
[Emídio Neto](https://github.com/emdneto) tarafından (eklendi 2024-06-09)

### Kullanım Örneği

```go
// Yeni bir istemci oluştur
client := ots.NewClient(
      WithUsername("otsuser@domain.com"),
      WithApiKey("xxxxxxxx"),
)

// Context ile istek gönder
ctx := context.Background()
response, err := client.GetStatus(ctx)
if err != nil {
      panic(err)
}

fmt.Println(response.Status)
```

---

## PowerShell


[Github sayfası - OneTimeSecret](https://github.com/chelnak/OneTimeSecret)
[Craig Gumbley](https://www.helloitscraig.co.uk) tarafından (güncelleme 2017-04-28)

### Kullanım Örneği

```powershell
# PowerShell galerisinden yükle
Install-Module -Name OneTimeSecret -Scope CurrentUser

# Bağlantı bilgilerini ayarla
Set-OTSAuthorizationToken -Username user@mail.com -APIKey xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Yeni bir paylaşılan gizli mesaj oluştur
New-OTSSharedSecret -Secret "Very Secret" -Passphrase 1234 -Recipient user@mail.com

# Bir gizli mesaj al
Get-OTSSecret -SecretKey qqevnp70b4uoiax4knzhwlhros6ne7x -Passphrase 1234

# Mevcut tüm fonksiyonları görüntüle
Get-Command -Module OneTimeSecret | Select Name
```

---

## Bash


[Github sayfası - OneTimeSecret-bash](https://github.com/eengstrom/onetimesecret-bash)
[Eric Engstrom](https://eengstrom.github.io/) tarafından (güncelleme 2018-12-19)

### Betik API Olarak Kullanım Örneği

```bash
# anonim kullanım için kaynak (anonim oluşturulan gizli mesajlar)
source ots.bash

# veya, belirli kimlik doğrulama kimlik bilgileriyle kaynak
APIUSER="USERNAME"
APIKEY="APIKEY"
source ots.bash -u $APIUSER -k $APIKEY

# sunucu durumunu kontrol et
ots_status

# bir gizli mesaj oluştur ve URL'yi geri al
URL=$(echo "secret" | ots_share)

# HEREDOC aracılığıyla çok satırlı bir gizli mesaj paylaş.
URL=$(ots_share <<-EOF
      This is a Secret
      ... on multiple lines
EOF
)

# paylaş veya oluştur'a seçenekler geçir.
URL=$(ots_share ttl=600 \
                  passphrase="shared-secret" \
                  recipient="someone@somewhere.com" <<< "SECRET")

# gizli mesaj verilerini getir
local DATA="$(ots_retrieve "$URL")"

# yeni bir gizli mesaj paylaş/oluştur ve özel meta veri anahtarını geri al
local KEY=$(ots_metashare <<< "SECRET")
local KEY=$(ots_metagenerate)

# yakın zamanda oluşturulan özel meta veri anahtarlarının bir listesini al.
# bunun geçerli kimlik doğrulama kimlik bilgileri gerektirdiğini unutmayın
local -a RECENT=( $(ots_recent) )

# özel anahtarı verilen bir gizli mesajın mevcut durumunu kontrol et
ots_state $KEY

# özel anahtarı verilen bir gizli mesajı yak
ots_burn $KEY
```

### CLI Olarak Kullanım Örneği

```bash
# Bir gizli mesaj paylaş (stdin'den)
./ots share
SECRET
^D

# Bir gizli mesaj paylaş (HEREDOC aracılığıyla)
./ots share <<-EOF
      This is a multi-line secret via HEREDOC.
      Something else goes here.
EOF

# Bir gizli mesaj al/al:
./ots get <key|url>
./ots retrieve <key|url>

### CLI Olarak Kullanım Örneği

```bash
$ ots burn flsdlaun6hwczqu9utmc0vts5xj9xu1
flsdlaun6hwczqu9utmc0vts5xj9xu1
```
