---
title: Meilleures pratiques en matière de sécurité
description: Améliorez la sécurité de votre partage de secret grâce à ces meilleures pratiques spécifiques à Onetime Secret, y compris les avantages de sécurité des domaines personnalisés.
---

# Meilleures pratiques de sécurité pour Onetime Secret

Bien que Onetime Secret ait été conçu dans un souci de sécurité, le respect de ces bonnes pratiques peut renforcer la protection de vos informations sensibles, en particulier lors de l'utilisation de fonctionnalités telles que les domaines personnalisés (Custom Domains).

## Bonnes pratiques pour le partage des secrets

1. **Définissez des délais d'expiration appropriés** : Choisissez le délai d'expiration le plus court possible pour vos secrets. Cela permet de réduire au minimum les possibilités d'accès non autorisé.

2. **Utiliser la protection par phrase secrète** : Pour les informations très sensibles, utilisez la fonction de protection par phrase d'authentification. Celle-ci ajoute un niveau de sécurité supplémentaire, en obligeant le destinataire à saisir une phrase de passe pour consulter le secret.

3. **Cloisonner les informations sensibles** : Lorsqu'il s'agit de données très sensibles, il faut envisager de les répartir sur plusieurs secrets. Ainsi, si l'un des secrets est compromis, l'ensemble des informations reste protégé.

4. **Utilisez des canaux sécurisés pour le partage des métadonnées** : Bien que Onetime Secret sécurise le contenu de votre secret, faites attention à la façon dont vous partagez le lien et toutes les métadonnées associées (comme les phrases de passe). Utilisez des canaux sécurisés et cryptés pour cette communication.

5. **Vérifier le destinataire** : Assurez-vous que vous partagez vos secrets avec le destinataire prévu. Vérifiez les adresses électroniques ou les noms d'utilisateur avant de les envoyer.

6. **Éduquer les utilisateurs** : Si vous utilisez Onetime Secret au sein d'une organisation, formez votre équipe à l'utilisation correcte et aux pratiques de sécurité spécifiques au partage de secrets.

## Avantages des domaines personnalisés en termes de sécurité

L'utilisation de domaines personnalisés avec Onetime Secret offre plusieurs avantages en matière de sécurité :

1. **Protection renforcée contre le phishing** : Avec un domaine personnalisé, vos utilisateurs s'habituent à une URL spécifique pour le partage des secrets. Il est ainsi plus facile d'identifier les tentatives d'hameçonnage potentielles qui pourraient utiliser des domaines similaires.

2. **Amélioration de la confiance et de la légitimité** : Lorsque les destinataires voient un domaine familier, ils sont plus enclins à faire confiance à la source du secret. Cet aspect est particulièrement important pour les entreprises qui partagent des informations sensibles avec des clients ou des partenaires.

3. **Intégration transparente avec l'infrastructure de sécurité existante** : Un domaine personnalisé peut être plus facilement intégré à vos outils de sécurité et systèmes de surveillance existants, ce qui permet d'obtenir une vue plus complète des activités de partage de secrets de votre organisation.

4. **Conformité et audit** : Pour les organisations actives dans des secteurs réglementés, l'utilisation d'un domaine personnalisé peut aider à maintenir la conformité en gardant les activités de partage de secrets sous le contrôle direct de votre organisation et en rendant les processus d'audit plus simples.

Onetime Secret prend en charge les aspects techniques de la sécurisation de votre domaine personnalisé, y compris la configuration SSL/TLS et la surveillance de l'activité du domaine, ce qui vous permet de vous concentrer sur ces avantages stratégiques en matière de sécurité.

## Sécurité de l'utilisation de l'API

Si vous utilisez l'API Onetime Secret :

1. **Clés d'API sécurisées** : Stockez les clés d'API en toute sécurité et ne les exposez jamais dans le code côté client ou dans des référentiels publics.

2. **Rotation des clés API** : Faites régulièrement pivoter vos clés API, surtout si vous pensez qu'elles ont été compromises.

3. **Limiter l'accès à l'API** : Utilisez le principe du moindre privilège lorsque vous configurez l'accès à l'API. N'accordez que les autorisations nécessaires pour chaque cas d'utilisation spécifique.

## Sécurité avancée auto-hébergée

Cette section couvre les considérations de sécurité avancées pour les organisations qui exécutent leur propre instance de Onetime Secret. Vous pouvez trouver le projet open source sur [GitHub](https://github.com/onetimesecret/onetimesecret) et les images Docker officielles sur [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

Les recommandations ci-dessous peuvent être mises en œuvre au niveau de votre infrastructure lorsque vous hébergez vous-même Onetime Secret :

1. **Utiliser des environnements éphémères** : Dans la mesure du possible, créez et détruisez des environnements pour chaque session d'échange de secrets. Cela peut s'avérer particulièrement utile pour les opérations très sensibles. Notre image Docker [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) Docker est conçue pour les cas d'utilisation éphémère.

2. **Mettre en place des restrictions temporelles** : Si votre cas d'utilisation le permet, envisagez de mettre en place des restrictions temporelles pour l'accès aux secrets, par exemple uniquement pendant les heures de bureau.

3. **Geo-Fencing** : Pour les opérations très sensibles, il convient d'envisager la mise en place de clôtures géographiques afin de restreindre l'accès aux secrets à partir d'emplacements géographiques spécifiques.

4. **Traces d'audit** : Conservez des pistes d'audit détaillées de la création de secrets et des tentatives d'accès. Cela peut s'avérer crucial pour la réponse aux incidents et les exigences de conformité.

5. **Cryptage au repos** : Onetime Secret prend en charge le cryptage, mais pour les données très sensibles, envisagez de crypter le contenu avant de créer le secret pour une couche de protection supplémentaire.


## Réponse à l'incident

Cette section présente des recommandations générales en matière de sécurité qui peuvent être utiles à votre organisation. Ces recommandations ne sont pas des caractéristiques spécifiques de notre service.

1. **Ayez un plan** : Élaborez un plan d'intervention en cas d'incident spécifique à vos processus de partage de secrets. Ce plan doit comprendre des étapes pour révoquer l'accès, notifier les parties concernées et atténuer les dommages potentiels.

2. **Action rapide** : Si vous soupçonnez qu'un secret a été compromis, utilisez immédiatement la fonction de brûlage de Onetime Secret si le secret n'a pas encore été consulté. S'il a été consulté, prenez les mesures nécessaires pour atténuer les dommages potentiels.

3. **Revues de sécurité régulières** : Examinez périodiquement vos pratiques en matière de partage des secrets et adaptez vos mesures de sécurité si nécessaire.

---

En suivant ces bonnes pratiques, vous pouvez améliorer considérablement la sécurité de vos activités de partage de secrets sur Onetime Secret. N'oubliez pas que la sécurité est un processus continu et qu'il est essentiel de rester vigilant pour protéger vos informations sensibles.

Pour tout problème de sécurité ou pour signaler des vulnérabilités potentielles, veuillez contacter immédiatement notre équipe de sécurité à l'adresse security@onetimesecret.com.
