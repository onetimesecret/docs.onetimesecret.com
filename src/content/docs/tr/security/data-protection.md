---
title: Veri Koruma
description: Onetime Secret'in neleri sakladığı, verilerin ne kadar süreyle tutulduğu, nerede işlendiği ve bunun uyumluluk yükümlülüklerinizi nasıl desteklediği.
---

Bu sayfa, Onetime Secret'in verilerinizi nasıl ele aldığını açıklar: neler saklanır, ne kadar süreyle tutulur, veriler nerede bulunur ve bu, kendi uyumluluk programınızı nasıl destekler.

## Neleri, Ne Kadar Süreyle Saklıyoruz

- **Gizli mesaj içeriği** şifrelenir ve tek bir erişim için tasarlanmıştır. Bir gizli mesaj görüntülendiğinde — veya süresi dolduğunda — kalıcı olarak yok edilir.
- **Süre sonu yerleşiktir.** Her gizli mesajın bir ömrü vardır (planınızın sınırları içinde yapılandırılabilir); hiçbir şeyin süresiz olarak saklanması amaçlanmaz.
- **Minimal meta veri.** [Veri Minimizasyonu](/tr/principles/data-minimization) ilkemiz doğrultusunda, yalnızca hizmeti işletmek için gereken meta verileri tutmayı hedefliyoruz.

## Şifreleme

Gizli mesajlar her planda **aktarım sırasında ve beklemede şifrelenir**. Aktarım TLS ile korunur; özel alan adları için SSL/TLS sertifikalarının verilmesini ve yenilenmesini otomatik olarak yönetiriz.

Özellikle hassas içerikler için bir **güvenlik ifadesi** etkinleştirerek, bilgiyi birden fazla gizli mesaja bölerek ve pratik olan en kısa süre sonunu seçerek derinlemesine savunma ekleyebilirsiniz — bkz. [Güvenlik En İyi Uygulamaları](/tr/security-best-practices).

## Verilerinizin İşlendiği Yer (Veri Yerleşimi)

Verilerinizin işleneceği ve saklanacağı bölgeyi seçebilirsiniz — şu anda AB, Birleşik Krallık, ABD, Kanada ve Yeni Zelanda. Bu, verileri kullanıcılarınıza yakın ve gereksinimlerinize uygun bir yargı alanı içinde tutmanızı sağlar. Ayrıntılar ve uç noktalar için [Veri Merkezi Bölgeleri](/tr/regions) sayfasına bakın.

## Uyumluluk

Onetime Secret, uyumluluk çalışmalarınızı desteklemek üzere tasarlanmıştır; kendi kontrollerinizin, politikalarınızın ve hukuki incelemenizin yerini almaz.

- **GDPR / veri koruma.** Bölgesel veri yerleşimi, kısa ömürlü veriler ve veri minimizasyonu, veri koruma yükümlülüklerinizi karşılamanıza yardımcı olacak şekilde tasarlanmıştır. Çoğu kurulumda, söz konusu sınırlı veriler bakımından veri sorumlusu siz olursunuz; Onetime Secret ise veri işleyen olarak hareket eder.
- **HIPAA.** [Kullanım senaryolarımızda](/tr/custom-domains/use-cases) belirtildiği gibi Onetime Secret, ilk erişim kimlik bilgilerinin paylaşılması için e-postadan daha güvenli bir kanal sağlayabilir; ancak PHI için kalıcı bir kayıt sistemi olarak değil, geçici bir çözüm olarak kullanılmalıdır. Devam eden PHI iş akışları için bunu, uyumluluk gereksinimlerini karşılayan özel bir sistemle birlikte kullanın.
- **Sertifikalar, veri işleme sözleşmeleri ve belirli çerçeveler.** Sertifikalar, bir Veri İşleme Sözleşmesi (DPA) veya belirli bir düzenleyici çerçeve hakkındaki sorularınız için **support@onetimesecret.com** adresiyle iletişime geçin.

Katı veri kontrolü gereksinimleri olan kuruluşlar için [kendi sunucunuzda barındırma](https://github.com/onetimesecret/onetimesecret) her şeyi kendi altyapınız içinde tutar.

## Sorularınız veya Destek İhtiyacınız mı Var?

Yardımcı olmak için buradayız.

- Genel: support@onetimesecret.com
- Güvenlik sorunları: security@onetimesecret.com ([bildirim politikası](/tr/security/vulnerability-disclosure))
