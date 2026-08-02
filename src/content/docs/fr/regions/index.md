---
title: Régions de centres de données
description: Découvrez les régions de centres de données de Onetime Secret et comment choisir celle qui convient le mieux à vos besoins.
---

Onetime Secret propose cinq régions de centres de données : Canada (CA), Union européenne (EU), Aotearoa Nouvelle-Zélande (NZ), Royaume-Uni (UK) et États-Unis (US). Ce guide vous aidera à comprendre l'importance de la sélection de la région et comment choisir la bonne pour vos besoins.

## Pourquoi la sélection de la région est-elle importante ?

Le choix de la région du centre de données est crucial pour plusieurs raisons :

1. **Souveraineté des données** : Les lois et réglementations relatives à la protection des données varient d'une région à l'autre.
2. **Latence** : Le choix d'une région plus proche de votre base d'utilisateurs principale peut réduire la latence.
3. **Conformité** : Certaines organisations ont des exigences spécifiques quant à l'endroit où leurs données peuvent être stockées.

## Régions disponibles

| Région | Localisation | URL |
|--------|---------------|-----|
| [Canada (CA)](/fr/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [Union européenne (EU)](/fr/regions/european-union) | Nuremberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa Nouvelle-Zélande (NZ)](/fr/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [Royaume-Uni (UK)](/fr/regions/united-kingdom) | Londres | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [États-Unis (US)](/fr/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Chaque page de région contient des informations sur l'environnement réglementaire local et sur les cas où cette région peut être pertinente pour votre usage.

## Architecture sans partage

Onetime Secret utilise une architecture sans partage, garantissant une isolation complète des données entre les régions :

- **Comptes séparés** : La création d'un compte sur un domaine régional est entièrement distincte des comptes sur les autres domaines, même si vous utilisez la même adresse e-mail.
- **Aucune opération inter-centres** : Vous ne pouvez pas effectuer d'opérations (comme brûler un secret) d'un centre de données à l'autre. Chaque centre conserve son propre ensemble de secrets et de données utilisateur.
- **Facturation cohérente pour les utilisateurs payants** : Pour les comptes payants, bien qu'aucune donnée utilisateur ne soit partagée entre les centres, le statut de votre abonnement est reconnu dans toutes les régions grâce à notre prestataire de paiement, Stripe.

## Comment choisir votre région

Tenez compte des facteurs suivants lors du choix de votre région de centre de données :

### Sans compte

- Les requêtes adressées à onetimesecret.com peuvent être acheminées vers n'importe quel centre de données actif.
- Vous pouvez choisir une région spécifique en accédant directement à un domaine régional (par exemple, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- Le lien généré identifie toujours la région (par exemple, `us.onetimesecret.com/secret/abcd1234`).

### Avec un compte

- Lorsque vous créez un compte, vous choisissez une région de centre de données. Tous les forfaits — gratuits et payants — ont accès à chaque région.
- Vous vous connectez sur le même domaine régional que celui utilisé lors de votre inscription (par exemple, si vous vous êtes inscrit sur `eu.onetimesecret.com`, c'est là que vous devez vous connecter).

### Considérations supplémentaires

1. **Pour les particuliers** :
   - Préférence personnelle
   - Proximité géographique pour un accès potentiellement plus rapide
   - Préoccupations relatives à la souveraineté des données personnelles

2. **Pour les entreprises** :
   - Exigences légales et réglementaires
   - Emplacement de votre clientèle principale
   - Besoins de conformité spécifiques au secteur d'activité

3. **Considérations techniques** :
   - Exigences de latence pour votre application
   - Intégration avec d'autres services ou systèmes

## Projets futurs

Nous travaillons continuellement à l'expansion de nos options de centres de données. Les projets futurs incluent des emplacements supplémentaires dans les pays suivants :

- Australie
- Brésil
- Japon
- Mexique
- Norvège
- Corée du Sud

Ces expansions offriront encore plus d'options de localisation des données, améliorant les performances et les capacités de conformité pour les utilisateurs dans différentes régions.

## Questions fréquemment posées

**Q : Puis-je changer ma région après avoir configuré mon compte ?**
R : Oui. Consultez [Changer de région](/fr/regions/switching-regions) pour des instructions détaillées couvrant les comptes gratuits, les abonnements payants et la migration de domaine personnalisé.

**Q : Mon choix de région a-t-il une incidence sur la sécurité de mes secrets ?**
R : Non, toutes les régions offrent le même niveau de sécurité élevé. Le choix affecte principalement la résidence des données et la latence potentielle.

**Q : Y a-t-il des différences de prix entre les régions ?**
R : Les tarifs sont propres à chaque région — vous pouvez payer dans votre devise locale et Stripe gère automatiquement la conversion. Les forfaits Identity Plus incluent un nombre illimité de domaines personnalisés dans tous les centres de données sous un seul abonnement. Consultez notre [page de tarification](https://onetimesecret.com/pricing) pour les informations les plus récentes.

## Besoin d'aide ?

Si vous ne savez pas quelle région choisir ou si vous avez des questions, n'hésitez pas à contacter notre équipe d'assistance. Nous sommes là pour vous aider à prendre la meilleure décision pour vos besoins spécifiques.

- Courriel : support@onetimesecret.com
- Formulaire de retour d'information : [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

N'oubliez pas que choisir la bonne région vous garantit les meilleures performances et le respect de toute réglementation applicable en matière de données lors de l'utilisation de Onetime Secret.
