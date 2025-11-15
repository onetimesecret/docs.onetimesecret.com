---
title: Gizli Mesaj Oluşturma
description: Hem kimliği doğrulanmış hem de anonim kullanım desteğiyle Onetime Secret REST API kullanarak gizli mesaj oluşturmayı ve almayı öğrenin.
---

_Güncelleme 2025-04-02_

:::note
**Veri Yerelliği ve Bölge Seçimi**
- ABD ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), AB ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Kanada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)) veya Yeni Zelanda ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) veri merkezleri arasından seçim yapın
- Veri egemenliği, gecikme ve uyumluluk gereksinimleri gibi faktörleri göz önünde bulundurun
- **NOT:** Varsayılan `onetimesecret.com` çalışmaya devam eder ve aktif bir veri merkezine yönlendirir, belirli bir yerellik kullanılması önerilir çünkü bu işlevsellik gelecekte kullanımdan kaldırılabilir.
:::


## Gizli Mesaj Oluştur

`POST https://REGION.onetimesecret.com/api/v1/share`

Gizli bir değer saklamak ve tek kullanımlık bir bağlantı oluşturmak için bu uç noktayı kullanın.


### Kimliği Doğrulanmış İstek

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anonim İstek

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Sorgu Parametreleri

- **secret**: saklanmadan önce şifrelenen gizli değer. Planınıza göre zorunlu kılınan bir maksimum uzunluk vardır (1k-10k).
- **passphrase**: alıcının gizli mesajı görüntülemek için bilmesi gereken bir dize. Bu değer aynı zamanda gizli mesajı şifrelemek için kullanılır ve saklanmadan önce bcrypt ile şifrelenir, bu nedenle bu değere yalnızca aktarım sırasında sahibiz.
- **ttl**: gizli mesajın hayatta kalması gereken maksimum süre (saniye cinsinden) (yani yaşam süresi). Bu süre sona erdiğinde, gizli mesaj silinecek ve kurtarılamaz olacaktır.
- **recipient**: bir e-posta adresi. Gizli mesaj bağlantısını (gizli mesajın kendisini DEĞİL) içeren dostça bir e-posta göndereceğiz.
- **share_domain**: gizli mesaj bağlantısını oluştururken kullanılacak özel alan adı. Sağlanmazsa, varsayılan alan adı kullanılır (örneğin eu.onetimesecret.com).

### Öznitelikler

- **custid**: gizli mesajı oluşturan hesabın kullanıcı adı. Anonim istekler için bu değer `anon` olacaktır.
- **metadata\_key**: meta veriler için benzersiz anahtar. Bunu PAYLAŞMAYIN.
- **secret\_key**: oluşturduğunuz gizli mesaj için benzersiz anahtar. Paylaşabileceğiniz anahtar budur.
- **ttl**: Belirtilen yaşam süresi (saniye cinsinden) (yani kalan süre değil)
- **metadata\_ttl**: Meta verilerin yaşaması için kalan süre (saniye cinsinden).
- **secret\_ttl**: Gizli mesajın yaşaması için kalan süre (saniye cinsinden).
- **recipient**: bir alıcı belirtildiyse, bu e-posta adresinin gizlenmiş bir sürümüdür.
- **created**: Gizli mesajın unix zamanında (UTC) oluşturulma zamanı
- **updated**: aynı şekilde, ancak en son güncellendiği zaman.
- **passphrase\_required**: Gizli mesaj oluşturulurken bir güvenlik ifadesi sağlandıysa, bu true olacaktır. Aksi takdirde açıkça false.
- **share_domain**: gizli mesaj bağlantısını oluştururken kullanılacak özel alan adı. Aksi takdirde "".


### Örnek Yanıt:

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

## Gizli Mesaj Oluştur

`POST https://REGION.onetimesecret.com/api/v1/generate`

Kısa, benzersiz bir gizli mesaj oluşturun. Bu, geçici parolalar, tek kullanımlık defterler, tuzlar vb. için kullanışlıdır.

### Kimliği Doğrulanmış İstek

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anonim İstek

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

### Öznitelikler

Yukarıdaki "Gizli Mesaj Paylaş" ile aynı, `value` alanının eklenmesiyle.
