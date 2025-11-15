---
title: Kurulum Kılavuzu
description: Bu kılavuz, alt alan adları ve ana alan adları arasındaki farklar ve tercih ettiğiniz veri merkezi bölgesini seçme dahil olmak üzere Onetime Secret hesabınız için özel alan adı kurma sürecinde size yol gösterecektir.
---

# Özel Alan Adı Kurulum Kılavuzu

## Ön Koşullar

- Özel alan adı özelliği etkinleştirilmiş aktif bir Onetime Secret hesabı
- Sahip olduğunuz ve DNS ayarlarını yönetebileceğiniz bir alan adı

## Alan Adı Türlerini Anlama

Özel alan adınızı kurmadan önce, alt alan adları ve ana alan adları arasındaki farkı anlamak önemlidir:

1. **Alt Alan Adı**: Ana alan adınızın bir alt bölümü (örneğin, secrets.yourdomain.com)
2. **Ana Alan Adı**: Kök alan adının kendisi (örneğin, yourdomain.com)

## Bölgenizi Seçin

Onetime Secret iki veri merkezi bölgesi sunar: AB ve ABD. Özel alan adınızı kurarken verilerinizi depolamak için hangi bölgeyi tercih ettiğinizi seçmeniz gerekir. Bu seçim birkaç nedenden dolayı önemlidir:

- **Bireyler İçin**: Potansiyel olarak daha hızlı erişim için yakınlık veya kişisel veri egemenliği endişeleri gibi kişisel tercihinize göre seçim yapabilirsiniz.
- **İşletmeler İçin**: Seçiminiz, GDPR, eyalet veya il yönergelerine uyum gibi veri yerelliği yükümlülüklerinize bağlı olabilir. Düzenleyici gereksinimlerinize en uygun bölgeyi seçtiğinizden emin olun.

Bu seçimi yaparken özel ihtiyaçlarınızı ve gereksinimlerinizi göz önünde bulundurun. Veri merkezi bölgelerimiz ve ihtiyaçlarınıza uygun olanı nasıl seçeceğiniz hakkında daha ayrıntılı bilgi için lütfen [Veri Merkezi Bölgeleri](/tr/regions) kılavuzumuza bakın.

## Adım 1: Alan Adları Kontrol Paneline Erişin

1. Onetime Secret hesabınıza giriş yapın
2. Kontrol Paneli > Özel Alan Adları'na gidin
3. "Alan Adı Ekle"ye tıklayın

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Özel alan adları görünümü" width="400" />

## Adım 2: Alan Adınızı Girin

1. Özel alan adı ayarlarında istediğiniz alan adını girin (örneğin, secrets.yourdomain.com veya yourdomain.com)
2. Devam etmek için "Alan Adı Ekle" veya eşdeğer düğmeye tıklayın

## Adım 3: DNS Ayarlarını Yapılandırın

Alan adınızı bağlamak için DNS ayarlarınızı güncellemeniz gerekir. Süreç, alt alan adı mı yoksa ana alan adı mı kullandığınıza ve hangi veri merkezi bölgesini seçtiğinize bağlı olarak biraz farklılık gösterir.

### Alt Alan Adları İçin (Önerilen)

1. Alan adınızın DNS yönetim paneline erişin (alan adı kayıt kuruluşunuz veya DNS sağlayıcınız aracılığıyla)
2. Aşağıdaki ayrıntılarla bir CNAME kaydı oluşturun:
   - Host: Seçtiğiniz alt alan adı (örneğin, secrets)
   - İşaret ettiği yer / Değer:
     - AB bölgesi için: identity.eu.onetime.co
     - ABD bölgesi için: identity.us.onetime.co
3. Aynı alt alan adı için mevcut A, AAAA veya CNAME kayıtlarını kaldırın

### Ana Alan Adları İçin

1. Alan adınızın DNS yönetim paneline erişin
2. Aşağıdaki ayrıntılarla bir A kaydı oluşturun veya değiştirin:
   - Host: @ (veya DNS sağlayıcınıza bağlı olarak boş bırakın)
   - İşaret ettiği yer / Değer:
     - AB bölgesi için: 109.105.217.207
     - ABD bölgesi için: 66.51.126.41

Önemli: Kullandığınız alan adı için çakışan kayıtların olmadığından emin olun.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Özel alan adı ayarları" width="400" />

### Daha Fazla Bilgi

#### Alt Alan Adları İçin Neden CNAME?

Alt alan adları için CNAME kayıtlarını kullanmanızı öneririz çünkü:

1. Daha esnektirler ve DNS ayarlarınızı güncellemenizi gerektirmeden sunucu IP adreslerimizi değiştirmemize olanak tanırlar.
2. Altyapımızda yaptığımız herhangi bir değişikliğe otomatik olarak uyum sağlarlar.

#### Ana Alan Adları İçin Neden A Kayıtları?

Ana alan adları, DNS standartları nedeniyle CNAME kayıtlarını kullanamaz. Bu nedenle, bazı sınırlamaları olan A kayıtlarını kullanmalıyız:

1. IP adresimizi değiştirirsek (ki bu nadirdir), DNS ayarlarınızı manuel olarak güncellemeniz gerekir.
2. Altyapımızdaki değişikliklere otomatik olarak uyum sağlamazlar.

## Adım 4: Alan Adını Doğrulayın ve SSL Bekleyin

1. DNS ayarlarını güncelledikten sonra, Onetime Secret özel alan adı sayfasına dönün
2. Sistem otomatik olarak alan adınızı doğrulamayı deneyecektir
3. Doğrulama başarılı olduğunda SSL sertifika oluşturma başlayacaktır
4. Bu işlemin tamamlanması birkaç dakika sürebilir

## Adım 5: Kurulumu Onaylayın

Kurulum tamamlandığında aşağıdaki bilgileri görmelisiniz:

- Alan Adı Durumu: SSL ile Aktif
- Hedef Adres: identity.eu.onetime.co veya identity.us.onetime.co (seçtiğiniz bölgeye bağlı olarak)
- SSL Durumu: Aktif
- SSL Yenileme Tarihi: (Gösterilecektir, genellikle kurulumdan yaklaşık bir yıl sonra)

## Sorun Giderme

- Doğrulama başarısız olursa, DNS ayarlarınızı iki kez kontrol edin
- Çakışan kayıtları kaldırdığınızdan emin olun
- DNS yayılımı 24 saate kadar sürebilir, ancak genellikle çok daha hızlıdır

## Özel Alan Adınızı Kullanma

Etkinleştirildikten sonra, gizli mesaj bağlantılarınız özel alan adınızı kullanacaktır. Örneğin:
`https://secrets-example.onetime.dev/secret/abc123`

## Size Destek Veriyoruz

Teknik ayrıntıların geri kalanını biz hallediyoruz, böylece sizin yapmanıza gerek yok.

- Alan adınızın durumunu sürekli olarak izliyoruz
- SSL sertifikaları sizin tarafınızdan herhangi bir işlem gerektirmeden otomatik olarak yenilenir

Bilgilendirilmeyi sevenler için, alan adınızın sağlığını kolayca kontrol edebilirsiniz:

- Devam eden bağlantıyı onaylamak için kontrol panelinizde "Son İzleme" zaman damgasına bakmanız yeterlidir

## Sorularınız mı Var veya Desteğe mi İhtiyacınız Var?

Yardım etmek için buradayız. Herhangi bir sorunuz varsa veya yardıma ihtiyacınız varsa:

- Bize doğrudan support@onetimesecret.com adresinden e-posta gönderin
- https://onetimesecret.com/feedback adresindeki geri bildirim formumuzu kullanın

Ekibimiz, ihtiyaçlarınız için doğru veri merkezi bölgesini seçme konusunda rehberlik de dahil olmak üzere özel alan adı kurulumunuz ve kullanımınız için mümkün olan en iyi desteği sağlamaya kararlıdır.
