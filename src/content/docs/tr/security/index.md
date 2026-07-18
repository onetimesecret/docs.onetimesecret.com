---
title: Güvenlik ve Güven
description: Onetime Secret gizli mesajlarınızı nasıl korur — güvenlik modeli, veri işleme, bölgesel veri yerleşimi ve bir güvenlik açığını nasıl bildireceğiniz.
---

Onetime Secret, hassas bilgileri gelen kutularında, sohbet kayıtlarında veya destek talebi sistemlerinde ortalıkta bırakmadan bir kişiden diğerine iletmek için vardır. Bu bölüm, hizmetin bunu güvenle yapmak üzere nasıl inşa edildiğini ve ayrıntıları nerede bulacağınızı açıklar.

## Kısaca Güvenlik Modeli

- **Tek kullanımlık erişim.** Bir gizli mesaj, bir kez görüntülenip ardından kalıcı olarak yok edilecek şekilde tasarlanmıştır. Okunduğunda (veya süresi dolduğunda) artık yoktur.
- **Aktarımda ve beklemede şifreleme.** Gizli mesajlar tüm planlarda aktarım sırasında ve beklemede şifrelenir.
- **Güvenlik ifadesi koruması.** Bir gizli mesajın görüntülenmesi için güvenlik ifadesi girilmesini zorunlu kılabilirsiniz; bu, tek başına bağlantının açamayacağı bir koruma katmanı ekler.
- **Tasarım gereği süreli.** Gizli mesajların bir süre sonu vardır; maruz kalmayı en aza indirmek için pratik olan en kısa ömrü seçin.
- **Okunmadan yakma.** Henüz görüntülenmemiş bir gizli mesajı yakabilirsiniz; böylece bir daha asla okunamaz.
- **Veri minimizasyonu.** Yalnızca gerekli olanı toplamayı ve saklamayı hedefliyoruz — bkz. [Veri Minimizasyonu](/tr/principles/data-minimization).

## Bu Bölümü Keşfedin

- **[Veri Koruma](/tr/security/data-protection)** — neleri sakladığımız, ne kadar süreyle tuttuğumuz, verilerin nerede bulunduğu ve bunun uyumluluk ihtiyaçlarınızla nasıl örtüştüğü.
- **[Güvenlik En İyi Uygulamaları](/tr/security-best-practices)** — Özel Alan Adlarının faydaları da dahil olmak üzere gizli mesajları güvenle paylaşmaya yönelik pratik rehberlik.
- **[Güvenlik Açığı Bildirimi](/tr/security/vulnerability-disclosure)** — bir güvenlik sorununu sorumlu biçimde nasıl bildireceğiniz.

## İlgili Sayfalar

- **[İlkelerimiz](/tr/principles)** — Gizlilik Öncelikli, İletişim ve Veri Minimizasyonu.
- **[Veri Merkezi Bölgeleri](/tr/regions)** — verilerinizin nerede işlenip saklanacağını seçin.
- **[Kendi Sunucunuzda Barındırma](https://github.com/onetimesecret/onetimesecret)** — tam kontrol için Onetime Secret'i kendi altyapınızda çalıştırın.

## Güvenlik Sorunu Bildirme

Bir güvenlik açığı bulduğunuzu düşünüyorsanız lütfen **security@onetimesecret.com** adresinden güvenlik ekibimizle iletişime geçin. Neleri eklemeniz gerektiğini ve neler bekleyebileceğinizi öğrenmek için [Güvenlik Açığı Bildirimi](/tr/security/vulnerability-disclosure) sayfasına bakın.
