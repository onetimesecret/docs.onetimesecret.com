---
title: Guide de style pour la traduction
description: Un guide complet pour les traducteurs travaillant sur la localisation de Onetime Secret, couvrant la voix de la marque, les normes terminologiques et les exigences spécifiques à la langue afin de garantir des traductions de haute qualité et cohérentes.
---

## Guide de style de traduction Français, basé sur l'anglais du Canada (en-CA)

Guide de style de traduction](/socialcards/onetime-socialcard-20250226-1.png)

Ce guide de style fournit des instructions pour la traduction en francais canadien.

| Ce guide de style est basé sur le contenu de [Mozilla L10N Styleguides](https://github.com/mozilla-l10n/styleguides/) par les contributeurs Mozilla, sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
| |

## Public cible

Notre public anglophone comprend

### Clients

- Expérience professionnelle : Professionnels de l'informatique, équipes d'agences (conception, développement, marketing) et équipes de soutien aux entreprises (RH, approvisionnement, logistique, finances).
- Public : Professionnels âgés de 20 à 50 ans ayant des compétences techniques. Ces personnes ont choisi ou travaillent pour une entreprise qui a choisi d'intégrer Onetime Secret dans son flux de travail.
- Lieu : Amérique du Nord, Royaume-Uni, Irlande, Nouvelle-Zélande : Amérique du Nord, Royaume-Uni, Irlande, Nouvelle-Zélande, Australie, Pays-Bas, Allemagne
- Approche rédactionnelle : Utiliser un langage clair, accessible et un ton professionnel

### Bénéficiaires

- Public : Diverses tranches d'âge (18-80 ans) : étudiants, personnes âgées, parents, clients, collègues de travail. Ces personnes n'ont peut-être jamais entendu parler de Onetime Secret et ont généralement moins d'informations sur son fonctionnement.
- Approche rédactionnelle : Approche rédactionnelle : langage clair et accessible avec un ton empathique.


**Note sur la traduction:** Ces descriptions d'audience fournissent un contexte sur la façon dont le produit est utilisé par différents groupes et doivent influencer le ton et le style de la traduction. Elles n'ont pas pour but de définir ou de limiter la façon dont nous percevons nos clients.

## Brand Voice

A propos de la voix et du ton de la marque.

### Valeurs fondamentales

- Authenticité et transparence

- Patient et concentré

- Efficace sans sacrifier la qualité

- Professionnel mais accessible

### Principes de communication

- Adapter le ton à l'expertise de l'utilisateur, du débutant au professionnel de la sécurité

- Équilibrer convivialité et fiabilité

- Privilégier la clarté plutôt qu'un langage décontracté

- Offrir des expériences agréables grâce à des interactions réfléchies

### Lignes directrices pour la rédaction

- Utiliser un langage clair et direct qui respecte le temps des utilisateurs

- Garder un ton serviable et patient, même lorsqu'il s'agit d'expliquer des concepts complexes.

- Écrire avec chaleur tout en restant concentré sur la tâche à accomplir

- Échelonner les détails techniques en fonction du contexte de l'utilisateur

- Le langage familier ne doit pas être utilisé au détriment de la clarté, quel que soit le contexte.

## Préférences linguistiques

*Conseils : Il s'agit de déterminer les préférences linguistiques, telles que les variantes orthographiques, les règles de ponctuation et les formats de date et d'heure, qui trouvent un écho auprès de votre public cible. - N'oubliez pas que le fait de respecter scrupuleusement les préférences linguistiques de votre public peut réduire considérablement les obstacles à la communication et améliorer leur expérience de la marque*.

- Utilisez l'anglais américain. Toutefois, pour les formats de date, utilisez le format aaaa-mm-jj et pour les heures, le format 24h. Les distances sont exprimées en km et les poids en livres.
- Les traductions doivent être aussi naturelles que possible. Les mots empruntés ne doivent jamais être utilisés (à l'exception des noms de marque).
- Notre public anglophone est composé à 50 % d'anglais en tant que première langue et à 50 % en tant que deuxième/troisième/professionnelle langue. Nous devons garder cela à l'esprit lorsque nous choisissons des termes et des expressions afin d'éviter des traductions inappropriées ou déroutantes.
- Le mot "secret" est au cœur de notre marque, de notre produit et de notre stratégie de communication. Nous protégeons les secrets. Nous fournissons également un service secret.

### Traduire le mot "secret"

Le mot "secret" peut revêtir un certain nombre de significations avec des différences subtiles mais importantes. Notre exemple canonique provient d'une mise à jour de notre traduction danoise par [jetdk] (https://github.com/onetimesecret/onetimesecret/pull/956#issue-2782747525) :

#### Choix du mot : "Beskeder" vs "Hemmeligheder" (en français dans le texte)

CORRECT :   **Beskeder** (messages)
INCORRECT : Hemmeligheder (secrets)

Le terme "Beskeder" doit être utilisé pour désigner un secret (par exemple, un message secret ou un lien secret généré par Onetime Secret). Bien que "Hemmeligheder" soit une traduction littérale de "Secrets", il a des connotations d'informations personnelles ou cachées dans l'usage quotidien danois qui ne correspondent pas à la signification voulue.

Exemple d'utilisation :

✅ Du har 3 nye beskeder (Vous avez 3 nouveaux messages)
❌ Du har 3 nye hemmeligheder (Vous avez 3 nouveaux secrets)

## Règles de grammaire et de style

*Conseils : Des règles précises de grammaire, de style et de ponctuation pour assurer la cohérence de l'ensemble du contenu traduit.

- Utilisez des virgules, des points et des points d'interrogation. Évitez les exclamations, les contractions et les points-virgules.
- Utilisez la voix active et impérative lorsque les utilisateurs agissent. Utilisez la voix passive ou déclarative lorsque vous informez les utilisateurs.
- Les fragments de phrases sont acceptables en soi. Sinon, faites des phrases complètes en respectant la grammaire des affaires.
- Divisez les informations longues en plusieurs phrases, si nécessaire.
- En général, utilisez la deuxième personne (vous) pour vous adresser à l'utilisateur.
- Évitez d'utiliser la première personne (`mon`, `je`), car cela peut créer une certaine confusion quant à la personne à qui l'on s'adresse.

### Texte de l'interface utilisateur : Quand utiliser la voix active ou passive

#### Voix active et impérative ("Faites quelque chose")

Boutons
✓ Enregistrer les modifications
✓ Supprimer le fichier
✓ Envoyer un message

Éléments du menu
✓ Afficher les paramètres
✓ Créer un nouveau dossier

#### Voix passive ou déclarative ("Il s'est passé quelque chose")

Messages d'état
Modifications sauvegardées
Fichier supprimé
✓ Paiement refusé

Notifications
✓ 3 nouveaux messages
✓ Téléchargement terminé
✓ Serveur indisponible

États du système
✓ Chargement en cours
✓ Connexion perdue
✓ Adresse électronique non trouvée

#### Exemples en contexte

Soumission du formulaire
✓ Enregistrer les modifications (bouton->actif)
✓ Changements sauvegardés avec succès (statut->passif)

Téléchargement de fichier
✓ Télécharger le fichier (bouton)
✓ Téléchargement terminé (statut)


## Cohérence terminologique

*Créer un glossaire des termes clés, ainsi que leurs traductions approuvées, afin de garantir une utilisation cohérente dans l'ensemble du contenu.

### Termes de marque (ne pas traduire)

- Onetime Secret
- OTS (lorsqu'il est utilisé comme abréviation du produit)
- Identity Plus (nom du produit)
- Global Elite (nom du produit)
- Custom Install (nom du produit)

### A propos de la marque

Dans "Onetime Secret", "Onetime" est un adjectif composé (également appelé adjectif attributif) qui modifie le nom "Secret". Il décrit une caractéristique essentielle du secret, à savoir qu'il n'est accessible qu'une seule fois. Notez le choix de l'orthographe. Il existe en fait trois variantes courantes de ce terme :

- "une fois" (avec trait d'union)
- "une fois" (deux mots)
- "une fois" (composé)

La forme à trait d'union "one-time" est considérée comme l'orthographe standard lorsque le terme fonctionne comme un adjectif devant un nom, comme dans "one-time password" (mot de passe à usage unique) ou "one-time code" (code à usage unique). Ceci est conforme à la règle générale anglaise selon laquelle les modificateurs composés devant les noms sont souvent séparés par un trait d'union.

La forme composée est l'orthographe canonique de la marque et du nom de l'entreprise : Onetime Secret.

### Concepts fondamentaux

#### Gestion des secrets

- **secret** (n.) - L'information confidentielle partagée
    - Les traductions doivent maintenir le contexte de confidentialité
    - Préférable à des termes tels que "message" ou "contenu".
    - Exemple : "Créer un nouveau secret" et non "Créer un nouveau message".
- **one-time** (adj.) - Description de la nature à usage unique du service
    - Doit mettre l'accent sur l'aspect temporaire et à usage unique.
    - Utilisé comme adjectif avec un trait d'union.
    - Exemple : "Ceci est un secret à usage unique" et non "Ceci est un secret unique".
- **Onetime** (adj. composé) - Fait partie du nom de marque Onetime Secret.
    - Ne doit pas être utilisé seul ; toujours associé à "Secret"
    - Exemple : "Onetime Secret"
- **burn** (v.) - Action de détruire un secret avant qu'il ne soit vu.
    - Terme technique désignant la destruction d'un message secret.
    - Les traductions doivent conserver le caractère permanent du message.
    - Exemple : "Le secret a été brûlé et n'est plus disponible"

#### Conditions de sécurité

- **chiffrement** (n.) - Processus d'encodage des secrets
    - Terme technique qui doit rester cohérent
    - À distinguer de "codage" ou "hachage".
    - Exemple : "Tous les secrets sont cryptés de bout en bout".
- **limitation du débit** (n. f.) - Système visant à prévenir les abus
    - Terme technique pour restriction de la demande
    - Conserver la césure en anglais
    - Exemple : "La limitation du débit permet d'éviter les abus"
- **sécurisé**
- **privé**
- **mot de passe / phrase de passe**
- **expiration / expiration / time-to-live**

#### Gestion des utilisateurs

- **colonel** (n.) - Rôle d'administrateur
    - Terme spécifique au projet, rime avec "kernel" qui est un terme technique et un composant central d'un système d'exploitation. Aucun autre projet n'utilise ce terme de cette manière. Il peut prêter à confusion, même en Amérique du Nord.
    - Traduisez par le terme courant d'"administrateur" dans le contexte des autorisations logicielles. Le compte ayant le plus haut niveau de privilèges.
    - Exemple : "Seuls les colonels peuvent accéder à cette fonction : "Seuls les colonels peuvent accéder à cette fonctionnalité" (c'est-à-dire "Seuls les administrateurs peuvent accéder à cette fonctionnalité").
- **plan** (n.) - Niveau d'abonnement
    - A utiliser systématiquement pour les niveaux de service
    - A préférer à "tier" ou "level"
    - Exemple : "Passer à un plan premium"

## Formatage et mise en page

*Définir des normes pour le formatage, la mise en page et la typographie afin de maintenir la cohérence visuelle et conceptuelle dans les différentes langues.

- Utilisez des styles d'en-tête cohérents pour améliorer la lisibilité et la fluidité du contenu. Par exemple, H1 pour les titres principaux, H2, H3, etc. pour les sous-titres.
- Rédigez les titres en minuscules, sauf s'il s'agit d'une phrase ponctuée :
    - Bon exemple : Comment la localisation stimule la croissance des entreprises de fintech
    - Bon exemple : La localisation facilitée. Pourquoi attendre ?
    - Mauvais exemple : Comment la localisation stimule la croissance des entreprises de la fintech
    - Mauvais exemple : La localisation facilitée. Pourquoi attendre ?

### Format de l'heure

En général, une horloge de 12 heures est utilisée aux États-Unis. Les horloges de 24 heures sont utilisées dans l'aviation et dans d'autres contextes logistiques.

### Chiffres

| Symbol Purpose | Character Name | Symbol | Example |
| --- | --- | --- | --- |
| Décimale | Point | `.` | 1.23 | 1,23
| Pourcentage | Signe de pourcentage | | 1,234 |
| Pourcentage | Signe de pourcentage | `%` | 99.95% |

### Devise

La monnaie du Canada est le dollar canadien (CAD). Les symboles monétaires sont `$` et rarement `¢`.

### Unités de mesure

Au Canada, le système impérial est utilisé pour les poids courants. Tout le reste, y compris les distances et les quantités, est en système métrique. Principalement m, Km, cm, mm ("deci" est rarement utilisé).

### Format de l'adresse et du code postal

    [destinataire]
    [numéro et nom de la rue] [numéros du bâtiment et de la suite] [district] [ville] [état/province] [code postal].
    [district][ville][état/province][code postal]
    [Pays]

    British Columbia Sugar Refinery Ltd.
	123 Rogers Street
    Vancouver, BC. V6A 3N2
    CANADA

## Une communication claire et respectueuse

Notre objectif : nous voulons que nos écrits s'adressent efficacement à tous les lecteurs tout en étant clairs, précis et respectueux.

Pour vérifier que votre texte atteint ces objectifs, posez des questions :

- Mon langage est-il clair et précis ?
- Est-ce que je m'adresse directement et respectueusement à mes lecteurs ?
- Ai-je évité de faire des suppositions sur mes lecteurs ?

## Style de traduction

- Utiliser la traduction littérale pour les textes juridiques ou techniques
- Traduire en tenant compte du contexte culturel lorsqu'il s'agit de traduire du contenu pour le marketing ou la publicité
- Utilisez la transcréation pour adapter le message afin qu'il ait une résonance culturelle et émotionnelle auprès du public, pour les contenus créatifs tels que les articles de blog et les textes de marketing.
