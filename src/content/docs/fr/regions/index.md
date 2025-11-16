---
title: Régions de centres de données
description: Découvrez les régions des centres de données de Onetime Secret et comment choisir celle qui convient le mieux à vos besoins.
---

Onetime Secret propose quatre régions de centres de données : Union européenne (UE), États-Unis (US), Canada (CA) et Aotearoa Nouvelle-Zélande (NZ). Ce guide vous aidera à comprendre l'importance de la sélection de la région et comment choisir la bonne pour vos besoins.

## Pourquoi la sélection des régions est-elle importante ?

Le choix de la région du centre de données est crucial pour plusieurs raisons :

1. **Souveraineté des données** : Les lois et réglementations relatives à la protection des données varient d'une région à l'autre.
2. **Latence** : Le choix d'une région plus proche de votre base d'utilisateurs principale peut réduire le temps de latence.
3. **Conformité** : Certaines organisations ont des exigences spécifiques quant à l'endroit où leurs données peuvent être stockées.

## Régions disponibles

### Union européenne (UE)

- Localisation** : Dans l'Union européenne (Nuremberg)
- **URL** : [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Caractéristiques principales** :
  - Conforme au GDPR et aux autres réglementations de l'UE en matière de protection des données.
  - Idéal pour les utilisateurs européens ou ceux qui servent principalement des clients européens.

### Canada (CA)

- Localisation** : Au Canada (Toronto)
- **URL** : [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Caractéristiques principales** :
  - Conforme à la LPRPDE et aux lois canadiennes sur la protection des données
  - Convient aux utilisateurs canadiens ou à ceux qui servent principalement des clients canadiens

### Aotearoa Nouvelle-Zélande (NZ)

- Localisation** : En Nouvelle-Zélande (Porirua)
- **URL** : [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Caractéristiques principales** :
  - Conforme à la loi néo-zélandaise sur la protection de la vie privée et aux réglementations locales
  - Convient aux utilisateurs néo-zélandais ou à ceux qui servent les clients d'Océanie

### États-Unis (US)

- Localisation** : Aux Etats-Unis (Hillsboro, Oregon)
- **URL** : [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Caractéristiques principales** :
  - Conforme aux lois américaines sur la protection des données
  - Convient aux utilisateurs basés aux États-Unis ou à ceux qui servent principalement des clients américains

## Architecture sans partage

Onetime Secret utilise une architecture sans partage, garantissant une isolation complète des données entre les régions :

- Comptes séparés** : La création d'un compte sur un domaine régional est entièrement séparée des comptes sur d'autres domaines, même si vous utilisez la même adresse électronique.
- Pas d'opérations entre centres de données** : Vous ne pouvez pas effectuer d'opérations (comme brûler un secret) entre les centres de données. Chaque centre conserve son propre ensemble de secrets et de données utilisateur.
- Facturation cohérente pour les utilisateurs payants** : Pour les comptes payants, bien qu'aucune donnée utilisateur ne soit partagée entre les centres, votre statut d'abonnement est reconnu dans toutes les régions par notre fournisseur de paiement, Stripe.

## Comment choisir sa région

Tenez compte des facteurs suivants lorsque vous choisissez la région de votre centre de données :

### Pour les utilisateurs anonymes

- Les demandes adressées à onetimesecret.com peuvent être acheminées vers n'importe quel centre de données actif.
- L'emplacement de votre secret est toujours clair dans le lien généré (par exemple, `us.onetimesecret.com/secret/abcd1234`).
- Vous pouvez choisir une localité de données spécifique en naviguant directement vers n'importe quel domaine régional (par exemple, [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### Pour les utilisateurs authentifiés

- Lors de la création d'un nouveau compte, vous devez choisir l'emplacement d'un centre de données.
- Vous devrez revenir au même endroit pour vous connecter.
- Les comptes et secrets existants restent dans leur centre de données d'origine.

### Pour tous les utilisateurs

- Les secrets créés sans juridiction de sous-domaine (par exemple, onetimesecret.com/secret/efgh5678) continueront d'être transférés par défaut vers notre centre de données de l'UE.
- Tous les utilisateurs, qu'ils soient payants ou gratuits, peuvent choisir leur centre de données préféré lors de la création de leur compte.

### Considérations supplémentaires

1. **Pour les particuliers** :
   - Préférences personnelles
   - Proximité de l'endroit où l'on se trouve pour un accès potentiellement plus rapide
   - Préoccupations relatives à la souveraineté des données personnelles

2. **Pour les entreprises** :
   - Exigences légales et réglementaires
   - Localisation de votre clientèle principale
   - Besoins de conformité spécifiques au secteur d'activité

3. **Considérations techniques** :
   - Exigences de latence pour votre application
   - Intégration avec d'autres services ou systèmes

## Tarifs et plans

Notre engagement en faveur de la localisation des données s'étend à notre modèle de tarification :

- Les frais sont basés sur l'endroit d'où vous payez et non sur l'endroit où votre compte a été créé.
- Les plans Identity Plus comprennent un nombre illimité de domaines personnalisés dans tous les centres de données sous un seul abonnement.

## Projets futurs

Nous travaillons continuellement à l'expansion de nos centres de données. Nous prévoyons d'implanter des centres de données supplémentaires dans les pays suivants

- Brésil
- Espagne
- ROYAUME-UNI

Ces extensions offriront encore plus d'options pour la localisation des données, améliorant les performances et les capacités de conformité pour les utilisateurs dans différentes régions.

## Configurer votre région

Lors de la création de votre compte Onetime Secret ou de la configuration d'un domaine personnalisé, vous aurez la possibilité de choisir votre région préférée. Voici comment procéder :

1. Pour les nouveaux comptes : Sélectionnez votre région préférée lors de la procédure d'inscription.
2. Pour les comptes existants : Contactez notre équipe d'assistance pour discuter des options de migration de région.
3. Pour les domaines personnalisés : Spécifiez la région choisie lors de la configuration de vos paramètres DNS (voir notre [Guide de configuration de domaine personnalisé](/fr/custom-domains/setup-guide) pour des instructions détaillées).

## Questions fréquemment posées

**Q : Puis-je changer ma région après avoir configuré mon compte ?**

R : Oui, vous pouvez changer votre région en créant un nouveau compte avec la même adresse e-mail et en accédant à l'écran du compte. Si vous avez un abonnement actif, votre compte sera mis à jour automatiquement (vous devrez peut-être actualiser la page).

Veuillez noter :
- Les données existantes ne sont pas transférées entre les régions
- Les liens secrets que vous avez créés continueront à fonctionner jusqu'à ce qu'ils soient consultés ou qu'ils expirent
- Pour les liens avec des domaines personnalisés, vous devrez :
  1. Rajouter le domaine à votre nouveau compte régional
  2. Mettre à jour les enregistrements DNS associés
  3. Utiliser un sous-domaine unique lors de l'ajout du domaine pour éviter les conflits avec les liens existants
  4. Plus tard, vous pourrez ajouter votre domaine préféré (si nécessaire) pour commencer à envoyer de nouveaux liens avec votre domaine préféré

**Q : Mon choix de région a-t-il une incidence sur la sécurité de mes secrets ?
R : Non, toutes les régions offrent le même niveau élevé de sécurité. Le choix affecte principalement la résidence des données et la latence potentielle.

**Q : Y a-t-il des différences de prix entre les régions ?
R : Actuellement, nos prix sont les mêmes dans toutes les régions. Consultez notre [page de tarification] (https://onetimesecret.com/pricing) pour obtenir les informations les plus récentes.

## Besoin d'aide ?

Si vous ne savez pas quelle région choisir ou si vous avez des questions, n'hésitez pas à contacter notre équipe d'assistance. Nous sommes là pour vous aider à prendre la meilleure décision en fonction de vos besoins spécifiques.

- Courriel : support@onetimesecret.com
- Formulaire de retour d'information : [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

N'oubliez pas que le choix de la bonne région vous permet d'obtenir les meilleures performances et de vous conformer à toutes les réglementations relatives aux données lors de l'utilisation de Onetime Secret.
