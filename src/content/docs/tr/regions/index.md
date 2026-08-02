---
title: Veri Merkezi Bölgeleri
description: Onetime Secret'in veri merkezi bölgeleri hakkında bilgi edinin ve ihtiyaçlarınıza uygun olanı nasıl seçeceğinizi öğrenin.
---

Onetime Secret beş veri merkezi bölgesi sunar: Kanada (CA), Avrupa Birliği (EU), Aotearoa Yeni Zelanda (NZ), Birleşik Krallık (UK) ve Amerika Birleşik Devletleri (US). Bu kılavuz, bölge seçiminin önemini anlamanıza ve ihtiyaçlarınıza uygun olanı seçmenize yardımcı olacaktır.

## Bölge Seçimi Neden Önemli

Doğru veri merkezi bölgesini seçmek birkaç nedenden dolayı kritik öneme sahiptir:

1. **Veri Egemenliği**: Farklı bölgelerin farklı veri koruma yasaları ve düzenlemeleri vardır.
2. **Gecikme**: Birincil kullanıcı tabanınıza daha yakın bir bölge seçmek gecikmeyi azaltabilir.
3. **Uyumluluk**: Bazı kuruluşların verilerinin nerede saklanabileceği konusunda özel gereksinimleri vardır.

## Mevcut Bölgeler

| Bölge | Konum | URL |
|--------|----------|-----|
| [Kanada (CA)](/tr/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Avrupa Birliği (EU)](/tr/regions/european-union) | Nürnberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Yeni Zelanda (NZ)](/tr/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Birleşik Krallık (UK)](/tr/regions/united-kingdom) | Londra | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [Amerika Birleşik Devletleri (US)](/tr/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Her bölge sayfası, yerel düzenleyici ortama ilişkin ayrıntıları ve o bölgenin kullanım senaryonuz için ne zaman uygun olabileceğini içerir.

## Paylaşımsız Mimari

Onetime Secret, bölgeler arasında tam veri izolasyonu sağlayan paylaşımsız bir mimari kullanır:

- **Ayrı Hesaplar**: Herhangi bir bölgesel alan adında hesap oluşturmak, aynı e-posta adresini kullansanız bile diğer alan adlarındaki hesaplardan tamamen ayrıdır.
- **Merkez Arası İşlem Yok**: Veri merkezleri arasında işlem gerçekleştiremezsiniz (gizli mesaj yakma gibi). Her merkez kendi gizli mesaj ve kullanıcı verilerini korur.
- **Ücretli Kullanıcılar için Tutarlı Faturalandırma**: Ücretli hesaplar için, merkezler arasında kullanıcı verisi paylaşılmasa da, abonelik durumunuz ödeme sağlayıcımız Stripe aracılığıyla bölgeler arasında tanınır.

## Bölgenizi Nasıl Seçersiniz

Veri merkezi bölgenizi seçerken aşağıdaki faktörleri göz önünde bulundurun:

### Hesabınız Yoksa

- onetimesecret.com'a yapılan istekler herhangi bir aktif veri merkezine yönlendirilebilir.
- Doğrudan bir bölgesel alan adına giderek (örneğin, [ca.onetimesecret.com](https://ca.onetimesecret.com/)) belirli bir bölge seçebilirsiniz.
- Oluşturulan bağlantı her zaman bölgeyi belirtir (örneğin, `us.onetimesecret.com/secret/abcd1234`).

### Hesabınız Varsa

- Bir hesap oluşturduğunuzda bir veri merkezi bölgesi seçersiniz. Tüm planlar — ücretsiz ve ücretli — her bölgeye erişebilir.
- Kayıt olduğunuz aynı bölgesel alan adından giriş yaparsınız (örneğin, `eu.onetimesecret.com` adresinde kayıt olduysanız, giriş de oradan yapılır).

### Ek Hususlar

1. **Bireyler İçin**:
   - Kişisel tercih
   - Potansiyel olarak daha hızlı erişim için konumunuza yakınlık
   - Kişisel veri egemenliği endişeleri

2. **İşletmeler İçin**:
   - Yasal ve düzenleyici gereksinimler
   - Birincil müşteri tabanınızın konumu
   - Sektöre özgü uyumluluk ihtiyaçları

3. **Teknik Hususlar**:
   - Uygulamanız için gecikme gereksinimleri
   - Diğer hizmetler veya sistemlerle entegrasyon

## Gelecek Planlar

Veri merkezi seçeneklerimizi genişletmek için sürekli çalışıyoruz. Gelecek planlarımız aşağıdaki konumlarda ek veri merkezleri içeriyor:

- Avustralya
- Brezilya
- Japonya
- Meksika
- Norveç
- Güney Kore

Bu genişlemeler, farklı bölgelerdeki kullanıcılar için performansı ve uyumluluk yeteneklerini artırarak veri yerleşimi için daha fazla seçenek sağlayacaktır.


## Sıkça Sorulan Sorular

**S: Hesabımı kurduktan sonra bölgemi değiştirebilir miyim?**
C: Evet. Ücretsiz hesapları, ücretli abonelikleri ve özel alan adı taşıma sürecini kapsayan adım adım talimatlar için [Bölgenizi Değiştirme](/tr/regions/switching-regions) sayfasına bakın.

**S: Bölge seçimim gizli mesajlarımın güvenliğini etkiler mi?**
C: Hayır, tüm bölgeler aynı yüksek güvenlik düzeyini sunar. Seçim öncelikle veri yerleşimini ve olası gecikmeyi etkiler.

**S: Bölgeler arasında fiyat farkları var mı?**
C: Fiyatlandırma her bölgeye özeldir — yerel para biriminizle ödeme yapabilirsiniz ve Stripe döviz dönüşümünü otomatik olarak gerçekleştirir. Identity Plus planları, tek bir abonelik altında tüm veri merkezlerinde sınırsız özel alan adı içerir. En güncel bilgiler için [fiyatlandırma sayfamıza](https://onetimesecret.com/pricing) bakın.

## Yardıma İhtiyacınız Var mı?

Hangi bölgeyi seçeceğinizden emin değilseniz veya sorularınız varsa, destek ekibimizle iletişime geçmekten çekinmeyin. Özel ihtiyaçlarınız için en iyi kararı vermenize yardımcı olmak için buradayız.

- E-posta: support@onetimesecret.com
- Geri bildirim formu: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Unutmayın, doğru bölgeyi seçmek, Onetime Secret kullanırken en iyi performansı elde etmenizi ve ilgili tüm veri düzenlemelerine uymanızı sağlar.
