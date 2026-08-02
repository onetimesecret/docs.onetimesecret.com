---
title: Birleşik Krallık (UK)
description: Onetime Secret'in Londra'da bulunan Birleşik Krallık veri merkezi bölgesi.
---

## Altyapı

- **Konum**: Londra, Birleşik Krallık
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Barındırma sağlayıcısı**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlandiya)
- **Özel alan adı CNAME'i**: `identity.ingress.onetime.co` (anycast)

## Özel Alan Adı DNS'i

Bu bölgeye özel bir alan adı yönlendirmek için bir CNAME kaydı oluşturun:

| Kayıt türü | Host                  | Değer                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

UK bölgesinin, bölgeye özgü bir alt alan adı yerine anycast bir CNAME kullandığını unutmayın.

Tam talimatlar için [Özel Alan Adı Kurulum Kılavuzu](/tr/custom-domains/setup-guide) sayfasına bakın.

## Düzenleyici Ortam

Birleşik Krallık'ın veri koruma çerçevesi, **Birleşik Krallık Genel Veri Koruma Yönetmeliği (UK GDPR)** ve **2018 tarihli Veri Koruma Yasası (Data Protection Act 2018)** tarafından yönetilir. Brexit sonrasında Birleşik Krallık, AB GDPR'ına büyük ölçüde uyumlu kendi veri koruma rejimini sürdürmektedir.

### Barındırma sağlayıcısı hakkında

Bu bölge, 2011 yılında kurulan ve merkezi Finlandiya'nın Helsinki şehrinde bulunan Avrupalı bir bulut altyapısı sağlayıcısı olan <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> tarafından barındırılmaktadır. Egemen bir Avrupa sağlayıcısı olarak, hesapla ilgili tüm veriler yalnızca Finlandiya'da, Fin ve AB veri koruma düzenlemeleri kapsamında saklanır. UpCloud, bu bölgeye ev sahipliği yapan Londra da dahil olmak üzere birden fazla Avrupa lokasyonunda veri merkezleri işletmektedir.

### Temel düzenleyici hususlar

- Bilgi Komiserliği Ofisi (Information Commissioner's Office - ICO), bağımsız denetleyici otorite olarak görev yapar
- UK GDPR, veri sahibi hakları ve hukuki dayanak gereksinimleri dahil olmak üzere AB GDPR'ının temel ilkelerini ve haklarını korur
- Birleşik Krallık, Avrupa Komisyonu'ndan bir yeterlilik kararına sahiptir; bu da verilerin AB/AEA'dan serbestçe akmasına olanak tanır
- 2018 tarihli Veri Koruma Yasası, UK GDPR'ını Birleşik Krallık'ın kolluk kuvvetleri ve istihbarat hizmetlerine özgü hükümlerle tamamlar

## Bu Bölgeyi Ne Zaman Tercih Etmelisiniz

- Kuruluşunuz veya kullanıcılarınız öncelikli olarak Birleşik Krallık'ta bulunuyor
- UK GDPR ve 2018 tarihli Veri Koruma Yasası'na uymanız gerekiyor
- Birleşik Krallık sınırları içinde veri yerleşimi istiyorsunuz
- Birleşik Krallık merkezli veri işleme gerektiren müşterilere hizmet veriyorsunuz
