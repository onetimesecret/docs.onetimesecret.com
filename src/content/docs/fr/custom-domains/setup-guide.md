---
title: Guide d'installation
description: Ce guide vous guidera à travers le processus de configuration d'un domaine personnalisé pour votre compte Onetime Secret, y compris les différences entre les sous-domaines et les domaines apex, et le choix de votre région de centre de données préférée.
---

# Guide de configuration d'un domaine personnalisé

## Prérequis

- Un compte Onetime Secret actif avec la fonction de domaine personnalisé activée
- Un domaine que vous possédez et pour lequel vous pouvez gérer les paramètres DNS

## Comprendre les types de domaines

Avant de configurer votre domaine personnalisé, il est important de comprendre la différence entre les sous-domaines et les domaines apex :

1. **Sous-domaine** : Une subdivision de votre domaine principal (par exemple, secrets.votredomaine.com).
2. **Domaine d'apogée** : Le domaine racine lui-même (par exemple, votredomaine.com)

## Choisissez votre région

Onetime Secret propose deux régions de centres de données : UE et USA. Lors de la configuration de votre domaine personnalisé, vous devrez choisir la région que vous préférez pour le stockage de vos données. Ce choix est important pour plusieurs raisons :

- Pour les particuliers** : Vous pouvez choisir en fonction de vos préférences personnelles, telles que la proximité pour un accès potentiellement plus rapide ou les préoccupations relatives à la souveraineté des données personnelles.
- Pour les entreprises** : Votre choix peut dépendre de vos obligations en matière de localisation des données, telles que la conformité au GDPR, aux directives de l'État ou de la province. Assurez-vous de sélectionner la région qui correspond le mieux à vos exigences réglementaires.

Tenez compte de vos besoins et exigences spécifiques lorsque vous faites ce choix. Pour obtenir des informations plus détaillées sur les régions de nos centres de données et sur la manière de choisir celle qui correspond le mieux à vos besoins, veuillez consulter notre guide [Régions de centres de données](/docs/regions).

## Étape 1 : Accéder au tableau de bord des domaines

1. Connectez-vous à votre compte Onetime Secret
2. Naviguez vers Tableau de bord > Domaines personnalisés
3. Cliquez sur "Ajouter un domaine"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Vue des domaines personnalisés" width="400" />

## Étape 2 : Entrez votre domaine

1. Dans les paramètres du domaine personnalisé, entrez le domaine souhaité (par exemple, secrets.yourdomain.com ou yourdomain.com).
2. Cliquez sur "Ajouter un domaine" ou sur un bouton équivalent pour continuer.

## Étape 3 : Configuration des paramètres DNS

Pour connecter votre domaine, vous devez mettre à jour vos paramètres DNS. La procédure diffère légèrement selon que vous utilisez un sous-domaine ou un domaine apex, et selon la région du centre de données que vous choisissez.

### Pour les sous-domaines (recommandé)

1. Accédez au panneau de gestion DNS de votre domaine (par l'intermédiaire de votre registraire de domaine ou de votre fournisseur DNS).
2. Créez un enregistrement CNAME avec les détails suivants :
   - Hôte : Le sous-domaine que vous avez choisi (par exemple, secrets)
   - Points à / Valeur :
     - Pour la région UE : identity.eu.onetime.co
     - Pour les États-Unis : identity.us.onetime.co
3. Supprimez tout enregistrement A, AAAA ou CNAME existant pour le même sous-domaine.

### Pour Apex Domains

1. Accédez au panneau de gestion DNS de votre domaine
2. Créez ou modifiez un enregistrement A avec les détails suivants :
   - Hôte : @ (ou laissez vide, selon votre fournisseur DNS)
   - Points vers / Valeur :
     - Pour la région UE : 109.105.217.207
     - Pour la région US : 66.51.126.41

Important : Assurez-vous qu'il n'y a pas d'enregistrements contradictoires pour le domaine que vous utilisez.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Custom domain settings" width="400" />

### Plus d'informations

#### Pourquoi un CNAME pour les sous-domaines ?

Nous recommandons l'utilisation d'enregistrements CNAME pour les sous-domaines pour les raisons suivantes :

1. Ils sont plus flexibles et nous permettent de changer les adresses IP de nos serveurs sans que vous ayez à mettre à jour vos paramètres DNS.
2. Ils s'adaptent automatiquement aux changements que nous apportons à notre infrastructure.

#### Pourquoi des enregistrements A pour Apex Domains ?

Les domaines Apex ne peuvent pas utiliser les enregistrements CNAME en raison des normes DNS. Nous devons donc utiliser des enregistrements A, qui présentent certaines limites :

1. Si nous changeons d'adresse IP (ce qui est rare), vous devrez mettre à jour vos paramètres DNS manuellement.
2. Ils ne s'adaptent pas automatiquement aux changements de notre infrastructure.

## Étape 4 : Vérifier le domaine et attendre le SSL

1. Après avoir mis à jour les paramètres DNS, revenez à la page du domaine personnalisé Onetime Secret.
2. Le système tentera automatiquement de vérifier votre domaine
3. La génération du certificat SSL commencera une fois la vérification réussie
4. Ce processus peut prendre quelques minutes

## Étape 5 : Confirmer la configuration

Une fois l'installation terminée, vous devriez voir les informations suivantes :

- Statut du domaine : Actif avec SSL
- Adresse cible : identity.eu.onetime.co ou identity.us.onetime.co (en fonction de la région choisie)
- Statut SSL : Actif
- Date de renouvellement du SSL : (Sera affichée, généralement environ un an après l'installation)

## Dépannage

- Si la vérification échoue, revérifiez vos paramètres DNS.
- Assurez-vous d'avoir supprimé tous les enregistrements conflictuels.
- La propagation du DNS peut prendre jusqu'à 24 heures, mais elle est généralement beaucoup plus rapide.

## Utilisation de votre domaine personnalisé

Une fois activés, vos liens secrets utiliseront votre domaine personnalisé. Par exemple :
`https://secrets-example.onetime.dev/secret/abc123`

## We've Got You Covered

Nous nous occupons du reste des détails techniques pour que vous n'ayez pas à le faire.

- Nous surveillons en permanence l'état de votre domaine
- Les certificats SSL sont renouvelés automatiquement sans aucune action de votre part

Pour ceux qui aiment rester informés, vous pouvez facilement vérifier l'état de santé de votre domaine :

- Il suffit de consulter l'horodatage de la "dernière surveillance" dans votre tableau de bord pour confirmer la continuité de la connectivité.

## Questions ou besoin d'aide ?

Nous sommes là pour vous aider. Si vous avez des questions ou si vous avez besoin d'aide :

- Envoyez-nous un courriel directement à l'adresse support@onetimesecret.com
- Utilisez notre formulaire de retour d'information à l'adresse https://onetimesecret.com/feedback

Notre équipe s'engage à vous fournir la meilleure assistance possible pour l'installation et l'utilisation de votre domaine personnalisé, y compris des conseils sur le choix de la région du centre de données la mieux adaptée à vos besoins.
