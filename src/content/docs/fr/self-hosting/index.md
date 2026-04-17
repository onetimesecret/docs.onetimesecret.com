---
title: Aperçu de l'auto-hébergement
description: Guide complet pour exécuter votre propre instance de Onetime Secret
sidebar:
  order: 1
---

Exécutez votre propre instance privée de Onetime Secret avec un contrôle total sur vos données, votre sécurité et votre déploiement.

:::caution[Mars 2026 — Documentation d'auto-hébergement en transition]
Nous sommes en pleine transition entre **v0.23** et **v0.24** (la branche `main`). Une partie de notre documentation d'auto-hébergement est obsolète et nous [travaillons activement à l'améliorer](https://github.com/onetimesecret/onetimesecret/issues/2628).

**Si vous souhaitez simplement mettre quelque chose en route**, nous vous recommandons la branche `rel/0.23`. Elle ne nécessite que quelques variables d'environnement et Redis, et nous continuons à y publier des correctifs et des mises à jour mineures.

```bash
git clone -b rel/0.23 https://github.com/onetimesecret/onetimesecret.git
```
:::

## Pourquoi auto-héberger ?

L'auto-hébergement de Onetime Secret vous offre :

- **Contrôle total des données** - Tous les secrets restent sur votre infrastructure et votre réseau
- **Politiques de sécurité personnalisées** - Configurez l'authentification, les options de confidentialité et les contrôles d'accès
- **Conformité** - Respectez les exigences réglementaires en matière de traitement des données
- **Image de marque personnalisée** - Personnalisez l'interface pour votre organisation

## Options de démarrage rapide

Choisissez la méthode de déploiement la mieux adaptée à votre environnement :

### Docker (recommandé)
```bash
# Démarrer Redis et Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.24.7
```

Accessible à l'adresse `http://localhost:3000`.

### Installation manuelle
Pour les environnements de production nécessitant des configurations personnalisées.

Consultez notre guide [Installation et déploiement](./installation) pour les étapes détaillées.

## Contenu inclus

Votre instance auto-hébergée comprend :

- **Interface web** - Interface complète pour créer et partager des secrets
- **API REST** - Accès programmatique pour les intégrations
- **Support multilingue** - Disponible dans plus de 12 langues
- **Domaines personnalisés** - Utilisez votre propre domaine et votre propre image de marque


## Configuration requise

**Recommandée :**
- 2+ cœurs de processeur
- 2 Go+ de RAM
- 10 Go+ d'espace disque
- Redis pour le stockage des sessions
- Node.js 22+ (pour le développement)

## Étapes suivantes

1. **[Premiers pas](./getting-started)** - Guide de configuration étape par étape
2. **[Installation et déploiement](./installation)** - Options de déploiement détaillées
3. **[Référence de configuration](./configuration)** - Documentation complète des paramètres

---

_Prêt à commencer ? Suivez notre guide [Premiers pas](./getting-started)._
