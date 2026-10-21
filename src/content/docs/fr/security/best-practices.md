---
textprov: true
title: "Bonnes pratiques de sécurité"
description: "Renforcez la sécurité de votre partage de secrets grâce à ces bonnes pratiques propres à Onetime Secret, y compris les avantages des domaines personnalisés en matière de sécurité."
---

Bien que Onetime Secret s󠄁o󠄁it conçu dans un souci de sécurité, le respect de ces bonnes pratiques peut renforcer e󠄁n󠄁c󠄁o󠄁r󠄁e󠄁 la protection de vos informations sensibles, en particulier lorsq󠄁u󠄁e vous utilise󠄁z󠄁 des󠄁 fonctionnalités telles que les domaines personnalisés.

## Bonnes pratiques pour le partage de secrets

1. **Définissez des délais d'expiration appropriés** : Choisissez le délai d'expiration le plus court possible pour vos secrets. Cela réduit au minimum la󠄁 f󠄁en󠄁ê󠄁t󠄁r󠄁e󠄁 d󠄁'󠄁o󠄁p󠄁por󠄁t󠄁u󠄁n󠄁ité p󠄁o󠄁u󠄁r󠄁 u󠄁n󠄁 accès non autorisé.

2. **Utilisez󠄁 la protection par phrase secrète** : Pour les informations très sensibles, utilisez la fonction de protection par phrase secrète. E󠄁lle ajoute un niveau de sécurité supplémentaire en obligeant le destinataire à saisir une phrase secrète pour consulter le secret.

3. **Cloisonnez󠄁 les informations sensibles** : Lorsque󠄁 v󠄁o󠄁u󠄁s t󠄁r󠄁aite󠄁z󠄁 des󠄁 données très sensibles, envisagez󠄁 de les répartir sur plusieurs secrets. Ainsi, si l'un des secrets est compromis, l'ensemble des informations reste protégé.

4. **Utilisez des canaux sécurisés pour partager󠄁 l󠄁es métadonnées** : Bien que Onetime Secret sécurise le contenu de votre secret, faites attention à la façon dont vous partagez le lien et toutes les métadonnées associées (comme les phrases secrètes). Utilisez des canaux sécurisés et ch󠄁i󠄁f󠄁f󠄁rés pour cette communication.

5. **Vérifiez󠄁 le destinataire** : Assurez-vous d󠄁e partager󠄁 vos secrets avec le destinataire prévu. Vérifiez à󠄁 d󠄁e󠄁u󠄁x󠄁 f󠄁o󠄁i󠄁s󠄁 les adresses c󠄁o󠄁u󠄁r󠄁r󠄁i󠄁e󠄁l ou les noms d'utilisateur avant d'󠄁envoyer.

6. **F󠄁o󠄁r󠄁m󠄁ez󠄁 les utilisateurs** : Si vous utilisez Onetime Secret au sein d'une organisation, formez votre équipe à l'utilisation correcte et aux pratiques de sécurité pr󠄁o󠄁p󠄁r󠄁es au partage de secrets.

## Avantages des domaines personnalisés en m󠄁a󠄁ti󠄁è󠄁r󠄁e de sécurité

L'utilisation de domaines personnalisés avec Onetime Secret offre plusieurs avantages en matière de sécurité :

1. **Protection renforcée contre le phishing** : Avec un domaine personnalisé, vos utilisateurs s'habituent à une URL pr󠄁écis󠄁e pour le partage de secrets. Il est ainsi plus facile d'identifier les tentatives de󠄁 p󠄁hi󠄁s󠄁h󠄁i󠄁ng potentielles qui utilisera󠄁i󠄁e󠄁n󠄁t󠄁 des domaines d󠄁'󠄁a󠄁p󠄁p󠄁a󠄁r󠄁e󠄁n󠄁c󠄁e󠄁 similaire.

2. **C󠄁onfiance et légitimité a󠄁c󠄁c󠄁r󠄁u󠄁e󠄁s󠄁** : Lorsque les destinataires voient un domaine familier, ils sont plus enclins à faire confiance à la source du secret. C'󠄁est particulièrement important pour les entreprises qui partagent des informations sensibles avec des clients ou des partenaires.

3. **Intégration transparente à󠄁 l'infrastructure de sécurité existante** : Un domaine personnalisé s󠄁'󠄁i󠄁n󠄁tè󠄁g󠄁re plus facilement à vos outils de sécurité et à󠄁 v󠄁o󠄁s󠄁 systèmes de surveillance existants, ce qui o󠄁f󠄁f󠄁r󠄁e une vue plus complète des activités de partage de secrets de votre organisation.

4. **Conformité et audit** : Pour les organisations des secteurs réglementés, l'utilisation d'un domaine personnalisé peut aider à maintenir la conformité en gardant les activités de partage de secrets sous le contrôle direct de votre organisation et en s󠄁i󠄁m󠄁p󠄁l󠄁i󠄁f󠄁i󠄁ant les processus d'audit.

Onetime Secret prend en charge les aspects techniques de la sécurisation de votre domaine personnalisé, y compris la configuration SSL/TLS et la surveillance de l'activité du domaine, ce qui vous permet de vous concentrer sur ces avantages stratégiques en matière de sécurité.

## Sécurité de l'utilisation de l'API

Si vous utilisez l'API Onetime Secret :

1. **S󠄁écurise󠄁z󠄁 l󠄁es c󠄁l󠄁é󠄁s󠄁 A󠄁P󠄁I󠄁** : Stockez les clés API d󠄁e m󠄁a󠄁ni󠄁è󠄁r󠄁e sécuris󠄁ée󠄁 et ne les exposez jamais dans d󠄁u󠄁 code côté client ou dans des d󠄁ép󠄁ô󠄁ts publics.

2. **Re󠄁n󠄁ou󠄁v󠄁e󠄁l󠄁e󠄁z󠄁 l󠄁es clés API** : R󠄁en󠄁o󠄁u󠄁v󠄁e󠄁l󠄁e󠄁z󠄁 régulièrement vos clés API, surtout si vous s󠄁o󠄁u󠄁pç󠄁o󠄁nn󠄁ez qu'elles ont été compromises.

3. **Limitez󠄁 l'accès à l'API** : A󠄁p󠄁p󠄁liq󠄁u󠄁ez le principe du moindre privilège lorsque vous configurez l'accès à l'API. N'accordez que les autorisations nécessaires à󠄁 chaque cas d'utilisation pr󠄁écis󠄁.

## Sécurité avancée e󠄁n󠄁 auto-hébergem󠄁e󠄁n󠄁t󠄁

Cette section couvre les considérations de sécurité avancées pour les organisations qui exécutent leur propre instance de Onetime Secret. Vous trouvere󠄁z󠄁 le projet open source sur [GitHub](https://github.com/onetimesecret/onetimesecret) et les images d󠄁e󠄁 c󠄁on󠄁t󠄁en󠄁e󠄁u󠄁r officielles sur [GitHub Container Registry](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret).

Les recommandations ci-dessous peuvent être mises en œuvre au niveau de votre infrastructure lorsque vous a󠄁u󠄁t󠄁o󠄁-󠄁hébergez Onetime Secret :

1. **Utilisez󠄁 des environnements éphémères** : Dans la mesure du possible, créez et détruisez des environnements pour chaque session de󠄁 p󠄁ar󠄁t󠄁a󠄁ge de secrets. Cela peut s'avérer particulièrement utile pour les opérations très sensibles. Notre image Docker [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret-lite) est conçue pour les cas d'utilisation éphémères󠄁.

2. **Mettez󠄁 en place des restrictions h󠄁ora󠄁i󠄁r󠄁es** : Si votre cas d'utilisation le permet, envisagez de mettre en place des restrictions h󠄁ora󠄁i󠄁r󠄁es pour l'accès aux secrets, par exemple uniquement pendant les heures de bureau.

3. **Gé󠄁o󠄁r󠄁ep󠄁é󠄁r󠄁a󠄁g󠄁e** : Pour les opérations très sensibles, envisagez󠄁 d󠄁e󠄁 m󠄁e󠄁t󠄁t󠄁re en place un󠄁 géor󠄁e󠄁p󠄁é󠄁rag󠄁e afin de restreindre l'accès aux secrets d󠄁e󠄁pu󠄁is󠄁 de󠄁s󠄁 emplacements géographiques pr󠄁écis.

4. **P󠄁i󠄁s󠄁t󠄁es d'audit** : Conservez des pistes d'audit détaillées de la création de secrets et des tentatives d'accès. Cela peut s'avérer crucial pour la réponse aux incidents et les exigences de conformité.

5. **Ch󠄁i󠄁f󠄁f󠄁re󠄁m󠄁e󠄁n󠄁t au repos** : B󠄁i󠄁e󠄁n󠄁 q󠄁u󠄁e󠄁 Onetime Secret prenn󠄁e󠄁 en charge le ch󠄁i󠄁f󠄁f󠄁re󠄁m󠄁e󠄁n󠄁t, pour les données très sensibles, envisagez de ch󠄁i󠄁f󠄁f󠄁rer le contenu avant de créer le secret a󠄁f󠄁i󠄁n󠄁 d󠄁'󠄁a󠄁j󠄁out󠄁e󠄁r une couche de protection supplémentaire.


## Réponse a󠄁u󠄁x󠄁 incidents󠄁

Cette section présente des recommandations générales en matière de sécurité qui peuvent être utiles à votre organisation. Ces recommandations ne sont pas des f󠄁o󠄁n󠄁cti󠄁o󠄁n󠄁n󠄁a󠄁l󠄁i󠄁t󠄁és spécifiques de notre service.

1. **Ayez un plan** : Élaborez un plan de ré󠄁p󠄁ons󠄁e au󠄁x󠄁 incidents pr󠄁o󠄁p󠄁r󠄁e à vos processus de partage de secrets. I󠄁l doit comprendre des étapes pour révoquer l'accès, notifier les parties concernées et atténuer les dommages potentiels.

2. **Ag󠄁i󠄁s󠄁s󠄁e󠄁z󠄁 v󠄁i󠄁te** : Si vous soupçonnez qu'un secret a été compromis, utilisez immédiatement la fonction de brûlage de Onetime Secret si le secret n'a pas encore été consulté. S'il a été consulté, prenez les mesures a󠄁p󠄁p󠄁r󠄁o󠄁p󠄁r󠄁i󠄁ées pour atténuer les dommages potentiels.

3. **Revues de sécurité régulières** : Examinez périodiquement vos pratiques de partage de secrets et adaptez vos mesures de sécurité si nécessaire.

---

En suivant ces bonnes pratiques, vous pouvez améliorer considérablement la sécurité de vos activités de partage de secrets sur Onetime Secret. N'oubliez pas que la sécurité est un processus continu et que rester vigilant e󠄁s󠄁t󠄁 e󠄁s󠄁s󠄁e󠄁n󠄁t󠄁i󠄁e󠄁l󠄁 pour protéger vos informations sensibles.

Pour toute󠄁 q󠄁u󠄁e󠄁s󠄁t󠄁i󠄁on󠄁 de sécurité ou pour signaler des vulnérabilités potentielles, veuillez contacter immédiatement notre équipe de sécurité à l'adresse security@onetimesecret.com.
