---
title: Protection des données
description: Ce qu'Onetime Secret stocke, combien de temps les données sont conservées, où elles sont traitées et comment cela soutient vos obligations de conformité.
---

Cette page décrit comment Onetime Secret traite vos données : ce qui est stocké,
pour combien de temps, où les données résident et comment cela soutient votre
propre programme de conformité.

## Ce que nous stockons, et pour combien de temps

- **Le contenu des secrets** est chiffré et destiné à une consultation unique.
  Une fois qu'un secret est consulté — ou qu'il atteint son expiration — il est
  définitivement supprimé.
- **L'expiration est intégrée.** Chaque secret a une durée de vie (configurable
  dans les limites de votre plan) ; rien n'est destiné à durer indéfiniment.
- **Métadonnées minimales.** Conformément à notre principe de
  [Minimisation des données](/fr/principles/data-minimization), nous visons à
  ne conserver que les métadonnées nécessaires au fonctionnement du service.

## Chiffrement

Les secrets sont **chiffrés en transit et au repos** sur tous les plans. Le
transport est protégé par TLS, et pour les domaines personnalisés, nous gérons
automatiquement l'émission et le renouvellement des certificats SSL/TLS.

Pour les informations particulièrement sensibles, vous pouvez ajouter une
défense en profondeur en activant une **phrase secrète**, en répartissant
l'information sur plusieurs secrets et en choisissant l'expiration la plus
courte possible — voir [Meilleures pratiques en matière de sécurité](/fr/security-best-practices).

## Où vos données sont traitées (résidence)

Vous pouvez choisir la région où vos données sont traitées et stockées —
actuellement l'UE, le Royaume-Uni, les États-Unis, le Canada et la
Nouvelle-Zélande. Cela vous permet de garder les données près de vos
utilisateurs et dans une juridiction adaptée à vos exigences. Consultez
[Régions de centres de données](/fr/regions) pour les détails et les points de
terminaison.

## Conformité

Onetime Secret est conçu pour soutenir vos efforts de conformité ; il ne
remplace pas vos propres contrôles, politiques et examens juridiques.

- **RGPD / protection des données.** La résidence régionale des données, des
  données à courte durée de vie et la minimisation des données sont conçues
  pour vous aider à respecter vos obligations en matière de protection des
  données. Dans la plupart des déploiements, vous agissez en tant que
  responsable du traitement et Onetime Secret en tant que sous-traitant pour
  les données limitées concernées.
- **HIPAA.** Comme indiqué dans nos [cas d'utilisation](/fr/custom-domains/use-cases),
  Onetime Secret peut offrir un canal plus sûr que le courriel pour échanger
  des identifiants d'accès initiaux, mais il doit être utilisé comme solution
  provisoire plutôt que comme système d'enregistrement permanent pour les
  informations de santé protégées (PHI). Associez-le à un système conforme
  dédié pour les flux de travail PHI continus.
- **Certifications, accords de traitement des données et cadres spécifiques.**
  Pour toute question concernant les certifications, un accord de traitement
  des données (DPA) ou un cadre réglementaire spécifique, contactez
  **support@onetimesecret.com**.

Pour les organisations ayant des exigences strictes en matière de contrôle des
données, l'[auto-hébergement](https://github.com/onetimesecret/onetimesecret)
garde tout au sein de votre propre infrastructure.

## Des questions ou besoin d'aide ?

Nous sommes là pour vous aider.

- Questions générales : support@onetimesecret.com
- Problèmes de sécurité : security@onetimesecret.com ([politique de divulgation](/fr/security/vulnerability-disclosure))
