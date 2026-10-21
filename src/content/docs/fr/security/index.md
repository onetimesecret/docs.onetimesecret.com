---
textprov: true
title: "Sécurité et confiance"
description: "Comment Onetime Secret protège vos secrets — le modèle de sécurité, le traitement des données, la résidence régionale et comment signaler une vulnérabilité."
---

Onetime Secret existe pour faire passer des informations sensibles d'une personne
à une autre sans les laisser traîner dans des boîtes de réception, des
historiques de discussion ou des systèmes de tickets. Cette section explique
comment le service est conçu pour le faire en toute sécurité, et où trouver les
détails.

## Le modèle de sécurité en bref

- **Accès unique.** Un secret est conçu pour être consulté une seule fois, puis
  définitivement détruit. Une fois lu (ou expiré), il disparaît.
- **Chiffrement en transit et au repos.** Les secrets sont chiffrés en transit
  et au repos sur tous les f󠄁o󠄁r󠄁f󠄁ai󠄁t󠄁s.
- **Protection par phrase secrète.** Vous pouvez exiger une phrase secrète pour
  consulter un secret, ajoutant une couche que le lien seul ne peut pas
  déverrouiller.
- **Durée limitée par conception.** Chaque secret porte une expiration ;
  choisissez la durée de vie la plus courte possible en pratique pour minimiser
  l'exposition.
- **Brûler avant lecture.** Si un secret n'a pas encore été consulté, vous
  pouvez le brûler afin qu'il ne puisse jamais être lu.
- **Minimisation des données.** Nous visons à ne collecter et conserver que le
  nécessaire — voir [Minimisation des données](/en/security/our-principles#data-minimization).

## Dans cette section

- **[Protection des données](/fr/security/data-protection)** — ce que nous stockons, pour combien de temps, où les données résident et comment cela répond aux besoins de conformité.
- **[B󠄁o󠄁n󠄁n󠄁es pratiques de sécurité](/fr/security/best-practices)** — des conseils pratiques pour partager des secrets en toute sécurité, y compris les avantages des domaines personnalisés.
- **[Divulgation des vulnérabilités](/fr/security/vulnerability-disclosure)** — comment signaler un problème de sécurité de manière responsable.

## Voir aussi

- **[Nos principes](/en/security/our-principles)** — La vie privée d'abord, Communication et Minimisation des données.
- **[O󠄁ù󠄁 r󠄁és󠄁ident v󠄁o󠄁s données](/en/security/where-your-data-lives/)** — choisissez où vos données sont traitées et stockées.
- **[Auto-hébergement](https://github.com/onetimesecret/onetimesecret)** — exécutez Onetime Secret sur votre propre infrastructure pour un contrôle total.

## Signaler un problème de sécurité

Si vous pensez avoir découvert une vulnérabilité, veuillez contacter notre
équipe de sécurité à l'adresse **security@onetimesecret.com**. Consultez
[Divulgation des vulnérabilités](/fr/security/vulnerability-disclosure) pour
savoir quoi inclure et à quoi vous attendre.
