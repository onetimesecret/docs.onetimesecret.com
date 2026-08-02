---
title: Canada (CA)
description: La région du centre de données canadien de Onetime Secret, située à Toronto.
---

## Infrastructure

- **Localisation** : Toronto, Canada
- **URL** : [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Fournisseur d'hébergement** : <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **CNAME de domaine personnalisé** : `identity.ca.onetime.co`

:::note
Nous sommes une entreprise canadienne et recherchons activement un fournisseur d'hébergement canadien approprié pour cette région. Si vous avez des suggestions, nous serions ravis de les recevoir via notre [formulaire de retour d'information](https://onetimesecret.com/feedback).
:::

## DNS du domaine personnalisé

Pour pointer un domaine personnalisé vers cette région, créez un enregistrement CNAME :

| Type d'enregistrement | Hôte                  | Valeur                    |
| ---------------------- | --------------------- | ------------------------ |
| CNAME                   | `secrets.example.com` | `identity.ca.onetime.co` |

Consultez le [Guide de configuration de domaine personnalisé](/fr/custom-domains/setup-guide) pour les instructions complètes.

## Environnement réglementaire

La législation fédérale canadienne sur la protection de la vie privée, la **Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)**, encadre la collecte, l'utilisation et la divulgation de renseignements personnels dans le cadre d'activités commerciales. Plusieurs provinces disposent également de leur propre législation sur la protection de la vie privée, qui peut s'appliquer.

### À propos du fournisseur d'hébergement

Cette région est hébergée par <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>, un fournisseur de services cloud basé aux États-Unis, dont le siège se trouve à Broomfield, dans le Colorado, et qui dessert des millions de développeurs à travers le monde. DigitalOcean se conforme au RGPD pour les clients européens, prend en charge la portabilité des données et publie des rapports de transparence détaillant les demandes de données gouvernementales. L'entreprise met en œuvre des contrôles de sécurité rigoureux et publie des rapports d'audit.

### Principaux aspects réglementaires

- La LPRPDE exige un consentement éclairé pour la collecte et l'utilisation des données
- Le Commissariat à la protection de la vie privée du Canada supervise la conformité
- Le Canada bénéficie d'une décision d'adéquation de la Commission européenne, facilitant les transferts de données avec l'UE
- Les lois provinciales (par exemple, la LPIP de l'Alberta, la Loi 25 du Québec) peuvent imposer des exigences supplémentaires

## Quand envisager cette région

- Votre organisation ou vos utilisateurs sont principalement basés au Canada
- Vous devez vous conformer à la LPRPDE ou à une législation provinciale sur la protection de la vie privée
- Vous souhaitez une résidence des données sur le territoire canadien
- Vous servez des clients en Amérique du Nord et souhaitez une option géographiquement centrale
