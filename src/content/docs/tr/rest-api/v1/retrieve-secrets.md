---
title: Gizli Mesaj Alma
description: Hem kimliği doğrulanmış hem de anonim erişim desteğiyle Onetime Secret REST API kullanarak gizli mesaj almayı öğrenin.
---

_Güncelleme 2025-04-02_

:::note
**Veri Yerelliği ve Bölge Seçimi**
- Bir [bölge](/tr/regions/) seçin (örneğin [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) veri merkezleri
- Veri egemenliği, gecikme ve uyumluluk gereksinimleri gibi faktörleri göz önünde bulundurun
- **NOT:** Varsayılan `onetimesecret.com` çalışmaya devam eder ve aktif bir veri merkezine yönlendirir, belirli bir yerellik kullanılması önerilir çünkü bu işlevsellik gelecekte kullanımdan kaldırılabilir.
:::

## Gizli Mesajı Al

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Kimliği Doğrulanmış İstek

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anonim İstek

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Sorgu Parametreleri

- **SECRET_KEY**: bu gizli mesaj için benzersiz anahtar.
- **passphrase** (gerekirse): güvenlik ifadesi yalnızca gizli mesaj bir taneyle oluşturulduysa gereklidir.

### Öznitelikler

- **secret_key**: oluşturduğunuz gizli mesaj için benzersiz anahtar. Paylaşabileceğiniz anahtar budur.
- **value**: Gerçek gizli mesaj. Söylemeye gerek yok ama bu yalnızca bir kez kullanılabilir olacaktır.

## Meta Verileri Al

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Her gizli mesajın ayrıca ilişkili meta verileri vardır. Meta veriler, gizli mesajın oluşturucusu (yani alıcı değil) tarafından kullanılmak üzere tasarlanmıştır ve genellikle gizli tutulmalıdır. Meta veri anahtarı gizli mesaj anahtarından farklı olduğundan, gizli mesajın kendisi hakkında temel bilgileri (örneğin, görüntülenip görüntülenmediği veya ne zaman görüntülendiği) almak için meta veri anahtarını güvenle kullanabilirsiniz.

### Kimliği Doğrulanmış İstek

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Sorgu Parametreleri

- **METADATA_KEY**: bu meta veriler için benzersiz anahtar.

### Öznitelikler

- **custid**: gizli mesajı oluşturan hesabın kullanıcı adı. Anonim istekler için bu değer `anon` olacaktır.
- **metadata\_key**: meta veriler için benzersiz anahtar. Bunu PAYLAŞMAYIN.
- **secret\_key**: oluşturduğunuz gizli mesaj için benzersiz anahtar. Paylaşabileceğiniz anahtar budur.
- **ttl**: Belirtilen yaşam süresi (yani kalan süre değil)
- **metadata\_ttl**: Meta verilerin yaşaması için kalan süre (saniye cinsinden).
- **secret\_ttl**: Gizli mesajın yaşaması için kalan süre (saniye cinsinden).
- **recipient**: bir alıcı belirtildiyse, bu e-posta adresinin gizlenmiş bir sürümüdür.
- **created**: Meta verilerin unix zamanında (UTC) oluşturulma zamanı
- **updated**: aynı şekilde, ancak en son güncellendiği zaman.
- **received**: Gizli mesajın alındığı zaman.
- **passphrase\_required**: Gizli mesaj oluşturulurken bir güvenlik ifadesi sağlandıysa, bu true olacaktır. Aksi takdirde açıkça false.


## Gizli Mesajı Yak

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Henüz okunmamış bir gizli mesajı yakın.

### Kimliği Doğrulanmış İstek

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Sorgu Parametreleri

- Yok

### Öznitelikler

- Yakılmış durumundaki meta veri öznitelikleriyle aynı.

## Son Meta Verileri Al

**GET https://onetimesecret.com/api/v1/private/recent**

Son meta verilerin bir listesini alın.

### Kimliği Doğrulanmış İstek

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Sorgu Parametreleri

- Yok

### Öznitelikler

- Meta veri öznitelikleriyle aynı, ancak bir liste olarak ve gizli mesaj anahtar değeri her zaman null olacaktır.

::: warning Kimlik Doğrulama Gerekli
Not: Meta veri ve yönetim işlemleri (meta veri alma, gizli mesaj yakma, son meta veriler) yalnızca kimliği doğrulanmış kullanıcılar için kullanılabilir.
:::
