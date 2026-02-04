---
title: Veri Merkezi Bölgeleri
description: Onetime Secret'ın veri merkezi bölgeleri hakkında bilgi edinin ve ihtiyaçlarınıza uygun olanı nasıl seçeceğinizi öğrenin.
---

Onetime Secret dört veri merkezi bölgesi sunar: Avrupa Birliği (EU), Amerika Birleşik Devletleri (US), Kanada (CA) ve Aotearoa Yeni Zelanda (NZ). Bu kılavuz, bölge seçiminin önemini anlamanıza ve ihtiyaçlarınıza uygun olanı seçmenize yardımcı olacaktır.

## Bölge Seçimi Neden Önemli

Doğru veri merkezi bölgesini seçmek birkaç nedenden dolayı kritik öneme sahiptir:

1. **Veri Egemenliği**: Farklı bölgelerin farklı veri koruma yasaları ve düzenlemeleri vardır.
2. **Gecikme**: Birincil kullanıcı tabanınıza daha yakın bir bölge seçmek gecikmeyi azaltabilir.
3. **Uyumluluk**: Bazı kuruluşların verilerinin nerede saklanabileceği konusunda özel gereksinimleri vardır.

## Mevcut Bölgeler

### Avrupa Birliği (EU)

- **Konum**: Avrupa Birliği (Nürnberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Temel Özellikler**:
  - GDPR ve diğer AB veri koruma düzenlemelerine uyumlu
  - Avrupa kullanıcıları veya öncelikli olarak Avrupa müşterilerine hizmet verenler için ideal

### Kanada (CA)

- **Konum**: Kanada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Temel Özellikler**:
  - PIPEDA ve Kanada veri koruma yasalarına uyumlu
  - Kanada kullanıcıları veya öncelikli olarak Kanada müşterilerine hizmet verenler için uygun

### Aotearoa Yeni Zelanda (NZ)

- **Konum**: Aotearoa Yeni Zelanda (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Temel Özellikler**:
  - Yeni Zelanda Gizlilik Yasası ve yerel düzenlemelere uyumlu
  - Yeni Zelanda kullanıcıları veya Okyanusya müşterilerine hizmet verenler için uygun

### Amerika Birleşik Devletleri (US)

- **Konum**: Amerika Birleşik Devletleri (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Temel Özellikler**:
  - ABD veri koruma yasalarına uyumlu
  - ABD merkezli kullanıcılar veya öncelikli olarak ABD müşterilerine hizmet verenler için uygun

## Paylaşımsız Mimari

Onetime Secret, bölgeler arasında tam veri izolasyonu sağlayan paylaşımsız bir mimari kullanır:

- **Ayrı Hesaplar**: Herhangi bir bölgesel alan adında hesap oluşturmak, aynı e-posta adresini kullansanız bile diğer alan adlarındaki hesaplardan tamamen ayrıdır.
- **Merkez Arası İşlem Yok**: Veri merkezleri arasında işlem gerçekleştiremezsiniz (gizli mesaj yakma gibi). Her merkez kendi gizli mesaj ve kullanıcı verilerini korur.
- **Ücretli Kullanıcılar için Tutarlı Faturalandırma**: Ücretli hesaplar için, merkezler arasında kullanıcı verisi paylaşılmasa da, abonelik durumunuz ödeme sağlayıcımız Stripe aracılığıyla bölgeler arasında tanınır.

## Bölgenizi Nasıl Seçersiniz

Veri merkezi bölgenizi seçerken aşağıdaki faktörleri göz önünde bulundurun:

### Anonim Kullanıcılar İçin

- onetimesecret.com'a yapılan istekler herhangi bir aktif veri merkezine yönlendirilebilir.
- Gizli mesajınızın konumu, oluşturulan bağlantıdan her zaman açıktır (örneğin, `us.onetimesecret.com/secret/abcd1234`).
- Herhangi bir bölgesel alan adına doğrudan giderek (örneğin, [ca.onetimesecret.com](https://ca.onetimesecret.com/)) belirli bir veri yerini seçebilirsiniz.

### Kimliği Doğrulanmış Kullanıcılar İçin

- Yeni bir hesap oluştururken bir veri merkezi konumu seçmelisiniz.
- Giriş yapmak için aynı konuma dönmeniz gerekir.
- Mevcut hesaplar ve gizli mesajlar orijinal veri merkezlerinde kalır.

### Tüm Kullanıcılar İçin

- Alt alan yargı yetkisi olmadan oluşturulan gizli mesajlar (örneğin, onetimesecret.com/secret/efgh5678) varsayılan olarak AB veri merkezimize yönlendirilmeye devam edecektir.
- Hem ücretli hem de ücretsiz tüm kullanıcılar, hesap oluştururken tercih ettikleri veri merkezini seçebilir.

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

## Fiyatlandırma ve Planlar

Veri yerleşimine olan taahhüdümüz fiyatlandırma modelimize kadar uzanır:

- Ücretler, hesabınızın oluşturulduğu yere değil, ödeme yaptığınız yere göre belirlenir.
- Identity Plus planları, tek bir abonelik altında tüm veri merkezlerinde sınırsız özel alan adı içerir.

## Gelecek Planlar

Veri merkezi seçeneklerimizi genişletmek için sürekli çalışıyoruz. Gelecek planlarımız şunları içerir:

- Brezilya
- İspanya
- Birleşik Krallık

Bu genişlemeler, farklı bölgelerdeki kullanıcılar için performansı ve uyumluluk yeteneklerini artırarak veri yerleşimi için daha fazla seçenek sağlayacaktır.

## Bölgenizi Ayarlama

Onetime Secret hesabınızı kurarken veya özel bir alan adı yapılandırırken, tercih ettiğiniz bölgeyi seçme seçeneğiniz olacaktır. İşte nasıl:

1. Yeni hesaplar için: Kayıt işlemi sırasında tercih ettiğiniz bölgeyi seçin.
2. Mevcut hesaplar için: Bölge geçiş seçeneklerini görüşmek için destek ekibimizle iletişime geçin.
3. Özel alan adları için: DNS ayarlarınızı yapılandırırken seçtiğiniz bölgeyi belirtin (ayrıntılı talimatlar için [Özel Alan Adı Kurulum Kılavuzumuza](/tr/custom-domains/setup-guide) bakın).

## Sıkça Sorulan Sorular

**S: Hesabımı kurduktan sonra bölgemi değiştirebilir miyim?**
C: Evet, aynı e-posta adresiyle yeni bir hesap oluşturarak ve hesap ekranına giderek bölgenizi değiştirebilirsiniz. Aktif bir aboneliğiniz varsa, hesabınız otomatik olarak güncellenecektir (sayfayı yenilemeniz gerekebilir).

Lütfen unutmayın:
- Mevcut veriler bölgeler arasında aktarılmaz
- Oluşturduğunuz herhangi bir gizli mesaj bağlantısı görüntülenene veya süresi dolana kadar çalışmaya devam edecektir
- Özel alan adlarına sahip bağlantılar için şunları yapmanız gerekir:
  1. Alan adını yeni bölge hesabınıza yeniden ekleyin
  2. İlişkili DNS kayıtlarını güncelleyin
  3. Mevcut bağlantılarla çakışmayı önlemek için alan adını yeniden eklerken benzersiz bir alt alan adı kullanın
  4. Daha sonra, tercih ettiğiniz alan adıyla yeni bağlantılar göndermeye başlayabilmeniz için tercih ettiğiniz alan adını ekleyebilirsiniz (gerekirse)

**S: Bölge seçimim gizli mesajlarımın güvenliğini etkiler mi?**
C: Hayır, tüm bölgeler aynı yüksek güvenlik düzeyini sunar. Seçim öncelikle veri ikamet ve potansiyel gecikmeyi etkiler.

**S: Bölgeler arasında fiyat farkları var mı?**
C: Şu anda fiyatlandırmamız tüm bölgelerde tutarlıdır. En güncel bilgiler için [fiyatlandırma sayfamıza](https://onetimesecret.com/pricing) bakın.

## Yardıma İhtiyacınız Var mı?

Hangi bölgeyi seçeceğinizden emin değilseniz veya sorularınız varsa, destek ekibimizle iletişime geçmekten çekinmeyin. Özel ihtiyaçlarınız için en iyi kararı vermenize yardımcı olmak için buradayız.

- E-posta: support@onetimesecret.com
- Geri bildirim formu: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Unutmayın, doğru bölgeyi seçmek, Onetime Secret kullanırken en iyi performansı elde etmenizi ve ilgili tüm veri düzenlemelerine uymanızı sağlar.
