---
title: Royaume-Uni (UK)
description: La région du centre de données de Onetime Secret au Royaume-Uni, située à Londres.
---

## Infrastructure

- **Localisation** : Londres, Royaume-Uni
- **URL** : [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Fournisseur d'hébergement** : <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finlande)
- **CNAME de domaine personnalisé** : `identity.ingress.onetime.co` (anycast)

## DNS du domaine personnalisé

Pour pointer un domaine personnalisé vers cette région, créez un enregistrement CNAME :

| Type d'enregistrement | Hôte                  | Valeur                         |
| ---------------------- | --------------------- | ----------------------------- |
| CNAME                   | `secrets.example.com` | `identity.ingress.onetime.co` |

Notez que la région UK utilise un CNAME anycast plutôt qu'un sous-domaine propre à la région.

Consultez le [Guide de configuration de domaine personnalisé](/fr/custom-domains/setup-guide) pour les instructions complètes.

## Environnement réglementaire

Le cadre de protection des données du Royaume-Uni est régi par le **UK General Data Protection Regulation (UK GDPR)** et le **Data Protection Act 2018**. Depuis le Brexit, le Royaume-Uni maintient son propre régime de protection des données, étroitement aligné sur le RGPD européen.

### À propos du fournisseur d'hébergement

Cette région est hébergée par <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, un fournisseur européen d'infrastructure cloud fondé en 2011 et dont le siège se trouve à Helsinki, en Finlande. En tant que fournisseur européen souverain, toutes les données liées aux comptes sont stockées exclusivement en Finlande, sous la réglementation finlandaise et européenne en matière de protection des données. UpCloud exploite des centres de données dans plusieurs emplacements européens, dont Londres, qui héberge cette région.

### Principaux aspects réglementaires

- L'Information Commissioner's Office (ICO) fait office d'autorité de contrôle indépendante
- Le UK GDPR conserve les principes fondamentaux et les droits du RGPD européen, y compris les droits des personnes concernées et les exigences de base légale
- Le Royaume-Uni bénéficie d'une décision d'adéquation de la Commission européenne, permettant aux données de circuler librement depuis l'UE/EEE
- Le Data Protection Act 2018 complète le UK GDPR avec des dispositions spécifiques aux services répressifs et de renseignement britanniques

## Quand envisager cette région

- Votre organisation ou vos utilisateurs sont principalement basés au Royaume-Uni
- Vous devez vous conformer au UK GDPR et au Data Protection Act 2018
- Vous souhaitez une résidence des données au Royaume-Uni
- Vous servez des clients qui exigent un traitement des données basé au Royaume-Uni
