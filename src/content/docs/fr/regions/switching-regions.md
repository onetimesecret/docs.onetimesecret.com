---
title: Changer de région
---

Onetime Secret utilise une [architecture sans partage](/fr/regions) dans ses cinq régions (CA, EU, NZ, UK, US). Chaque région fonctionne comme un système entièrement séparé, avec sa propre base de données, ses propres comptes et ses propres secrets. Nous ne transférons jamais de données entre les régions, quelles que soient les circonstances.

Cela signifie que changer de région ressemble moins à une « migration » qu'à une nouvelle installation dans la région de votre choix. La bonne nouvelle : l'opération prend environ deux minutes, et votre abonnement est reporté automatiquement.

## Comptes gratuits

Rendez-vous directement sur la région de votre choix (voir [Régions disponibles](/fr/regions#régions-disponibles) pour la liste complète) et créez un nouveau compte avec la même adresse e-mail. C'est tout — votre nouveau compte est prêt à être utilisé immédiatement.

## Comptes payants (Identity Plus)

Le processus est identique à celui des comptes gratuits, avec une étape supplémentaire :

1. Rendez-vous sur l'URL de la région de votre choix (voir [Régions disponibles](/fr/regions#régions-disponibles))
2. Créez un compte avec la même adresse e-mail que celle associée à votre abonnement
3. Connectez-vous et accédez à la page de votre compte
4. Le statut de votre abonnement sera reconnu automatiquement via Stripe

Il se peut que vous deviez actualiser la page une fois pour que l'abonnement se synchronise. Cela fonctionne parce que nous conservons des données séparées entre les régions, tandis que votre relation de facturation est gérée par Stripe, qui reconnaît votre adresse e-mail dans toutes les régions.

## Ce qu'il advient de votre ancien compte

Votre compte de l'ancienne région reste pleinement fonctionnel :

- Les liens secrets existants continuent de fonctionner jusqu'à ce qu'ils soient consultés ou qu'ils expirent
- Votre compte reste actif au cas où vous auriez besoin de vous y référer
- Aucune action n'est requise sur l'ancien compte, sauf si vous souhaitez le fermer

## Migration de domaine personnalisé

Si vous avez configuré un domaine personnalisé sur votre région actuelle, le processus nécessite un peu plus de planification. Étant donné que vos liens secrets existants utilisent les enregistrements DNS de votre domaine personnalisé, vous ne pouvez pas simplement rediriger le domaine vers la nouvelle région sans casser les liens qui n'ont pas encore été consultés.

### Étape par étape

1. **Ajoutez un sous-domaine temporaire** à votre nouveau compte régional. Par exemple, si votre domaine actuel est `secrets.example.com`, ajoutez quelque chose comme `secrets-new.example.com` ou `secrets-us.example.com`.

2. **Créez un enregistrement CNAME** pour le sous-domaine temporaire, pointant vers le point de terminaison d'identité régional approprié (par exemple, `identity.us.onetime.co` pour la région US). Consultez le [Guide de configuration de domaine personnalisé](/fr/custom-domains/setup-guide) pour les détails de configuration DNS.

3. **Commencez à utiliser le sous-domaine temporaire** pour les nouveaux secrets dès maintenant.

4. **Après 30 jours**, tous les secrets créés sur l'ancien domaine auront expiré. Vous pouvez alors :
   - Retirer le domaine personnalisé de votre ancien compte régional
   - Ajouter votre sous-domaine préféré (par exemple, `secrets.example.com`) à votre nouveau compte régional
   - Mettre à jour l'enregistrement CNAME pour qu'il pointe vers le point de terminaison de la nouvelle région
   - Vérifier le domaine dans le tableau de bord de votre compte

5. **Nettoyez** le sous-domaine temporaire une fois que votre domaine préféré est actif et vérifié.

### Pourquoi 30 jours ?

La durée de vie maximale (TTL) d'un secret est de 30 jours. Attendre cette période garantit que tous les secrets créés sous l'ancienne configuration DNS de la région ont soit été consultés, soit expiré, de sorte que la mise à jour de l'enregistrement CNAME ne cassera aucun lien en suspens.

Si vous savez que tous vos secrets existants ont des durées de vie plus courtes ou ont déjà été consultés, vous pouvez effectuer le changement plus tôt.

## Comptes sans domaine personnalisé

Si vous n'utilisez pas de domaine personnalisé, le changement est immédiat. Vos anciens liens (utilisant les URL régionales onetimesecret.com telles que `eu.onetimesecret.com/secret/abcd1234`) continueront de fonctionner correctement, quelle que soit la région où se trouve votre compte actif.

## Régions multiples

Vous pouvez maintenir des comptes dans plusieurs régions simultanément. Tous les comptes utilisant la même adresse e-mail partagent le même statut d'abonnement. Cela peut être utile si vous servez des utilisateurs dans différentes zones géographiques et souhaitez minimiser la latence ou répondre à des exigences de résidence des données.

## Instances dédiées

Les clients disposant d'instances dédiées doivent nous contacter à [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) pour tout changement de région, car l'infrastructure dédiée nécessite une reconfiguration manuelle. Vous pouvez également nous joindre via la [page de retour d'information](https://onetimesecret.com/feedback).
