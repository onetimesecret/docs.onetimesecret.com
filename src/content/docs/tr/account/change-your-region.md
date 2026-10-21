---
title: Bölgenizi Değiştirme
---

Onetime Secret, beş bölgenin tamamında (CA, EU, NZ, UK, US) bir [paylaşımsız mimari](/tr/regions) kullanır. Her bölge, kendi veritabanı, hesapları ve gizli mesajlarıyla tamamen ayrı bir sistem olarak çalışır. Hiçbir koşulda bölgeler arasında veri aktarımı yapmayız.

Bu, bölge değiştirmenin bir "taşıma" işleminden ziyade tercih ettiğiniz bölgede sıfırdan kurulum yapmak anlamına geldiği anlamına gelir. İyi haber şu ki bu işlem yaklaşık iki dakika sürer ve aboneliğiniz otomatik olarak geçerliliğini korur.

## Ücretsiz Hesaplar

Tercih ettiğiniz bölgeye doğrudan gidin (tam liste için [Mevcut Bölgeler](/tr/regions#mevcut-bölgeler) bölümüne bakın) ve aynı e-posta adresiyle yeni bir hesap oluşturun. Hepsi bu kadar — yeni hesabınız hemen kullanıma hazırdır.

## Ücretli Hesaplar (Identity Plus)

Süreç, tek bir ek adım dışında ücretsiz hesaplarla aynıdır:

1. Tercih ettiğiniz bölgenin URL'sine gidin (tam liste için [Mevcut Bölgeler](/tr/regions#mevcut-bölgeler) bölümüne bakın)
2. Aboneliğinizle ilişkilendirilmiş aynı e-posta adresini kullanarak bir hesap oluşturun
3. Giriş yapın ve Hesap sayfanıza gidin
4. Abonelik durumunuz Stripe aracılığıyla otomatik olarak tanınacaktır

Aboneliğin senkronize olması için sayfayı bir kez yenilemeniz gerekebilir. Bu şekilde çalışır çünkü verileri bölgeler arasında ayrı tutarız, ancak faturalandırma ilişkiniz, e-posta adresinizi bölgeler arasında tanıyan Stripe aracılığıyla yönetilir.

## Eski Hesabınıza Ne Olur

Önceki bölge hesabınız tamamen işlevsel kalır:

- Mevcut gizli mesaj bağlantıları, görüntülenene veya süresi dolana kadar çalışmaya devam eder
- Herhangi bir şeye başvurmanız gerekirse diye hesabınız aktif kalır
- Kapatmak istemediğiniz sürece eski hesapta herhangi bir işlem yapmanız gerekmez

## Özel Alan Adı Taşıma

Mevcut bölgenizde yapılandırılmış bir özel alan adınız varsa, süreç biraz daha fazla planlama gerektirir. Mevcut gizli mesaj bağlantılarınız özel alan adınızın DNS kayıtlarını kullandığından, henüz görüntülenmemiş bağlantıları bozmadan alan adını doğrudan yeni bölgeye yönlendiremezsiniz.

### Adım adım

1. **Yeni bölge hesabınıza geçici bir alt alan adı ekleyin.** Örneğin, mevcut alan adınız `secrets.example.com` ise, `secrets-new.example.com` veya `secrets-us.example.com` gibi bir alan adı ekleyin.

2. **Geçici alt alan adı için, ilgili bölgesel kimlik uç noktasına yönlendiren bir CNAME kaydı oluşturun** (örneğin, ABD bölgesi için `identity.us.onetime.co`). DNS yapılandırma ayrıntıları için [Özel Alan Adı Kurulum Kılavuzu](/tr/custom-domains/setup-guide) sayfasına bakın.

3. **Yeni gizli mesajlar için geçici alt alan adını hemen kullanmaya başlayın.**

4. **30 gün sonra**, eski alan adında oluşturulan tüm gizli mesajların süresi dolmuş olacaktır. Bu noktada şunları yapabilirsiniz:
   - Özel alan adını eski bölge hesabınızdan kaldırın
   - Tercih ettiğiniz alt alan adını (örneğin, `secrets.example.com`) yeni bölge hesabınıza ekleyin
   - CNAME kaydını yeni bölgenin uç noktasına yönlendirecek şekilde güncelleyin
   - Alan adını hesap kontrol panelinizde doğrulayın

5. **Tercih ettiğiniz alan adı etkinleştirilip doğrulandıktan sonra** geçici alt alan adını temizleyin.

### Neden 30 gün?

Bir gizli mesajın azami yaşam süresi (TTL) 30 gündür. Bu süreyi beklemek, eski bölgenin DNS yapılandırması altında oluşturulan tüm gizli mesajların ya görüntülenmiş ya da süresinin dolmuş olmasını sağlar; böylece CNAME kaydını güncellemek hiçbir bekleyen bağlantıyı bozmaz.

Mevcut tüm gizli mesajlarınızın daha kısa TTL'lere sahip olduğunu veya zaten görüntülendiğini biliyorsanız, geçişi daha erken yapabilirsiniz.

## Özel Alan Adı Olmayan Hesaplar

Özel bir alan adı kullanmıyorsanız geçiş anında gerçekleşir. Eski bağlantılarınız (`eu.onetimesecret.com/secret/abcd1234` gibi bölgesel onetimesecret.com URL'lerini kullanan bağlantılar), aktif hesabınızın hangi bölgede olduğuna bakılmaksızın doğru şekilde çözümlenmeye devam edecektir.

## Birden Fazla Bölge

Aynı anda birden fazla bölgede hesap bulundurabilirsiniz. Aynı e-posta adresini kullanan tüm hesaplar aynı abonelik durumunu paylaşır. Bu, farklı coğrafi bölgelerdeki kullanıcılara hizmet veriyorsanız ve gecikmeyi en aza indirmek veya veri yerleşimi gereksinimlerini karşılamak istiyorsanız faydalı olabilir.

## Özel (Dedicated) Sunucular

Özel (dedicated) sunucu kullanan müşterilerin bölge değişiklikleri için [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) adresinden bizimle iletişime geçmesi gerekir; çünkü özel altyapı manuel yeniden yapılandırma gerektirir. Bize [geri bildirim sayfası](https://onetimesecret.com/feedback) üzerinden de ulaşabilirsiniz.
