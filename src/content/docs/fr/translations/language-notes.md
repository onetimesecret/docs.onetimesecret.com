---
title: Français
description: Règles critiques pour la traduction française
---

# Français

## Terminologie de base

### Secret (nom)
- **Choix :** secret (nom masculin)
- **Contexte :** Information confidentielle partagée
- **Rationale :** Le terme "secret" fonctionne bien en français professionnel
- **Exemples :**
  - ✓ "Créer un secret" (fonctionnel, clair)
  - ✓ "Partager des secrets" (contexte professionnel)
  - ✗ "Révélez vos secrets" (trop personnel)

### Mot de passe vs Phrase secrète
**DISTINCTION CRITIQUE :** Ces termes ne doivent jamais être confondus.

- **Mot de passe :** Identifiant de connexion au compte
  - Utilisé pour : Se connecter au compte Onetime Secret
  - Exemples : "Entrez votre mot de passe", "Mot de passe oublié ?"

- **Phrase secrète :** Mécanisme de protection des secrets
  - Utilisé pour : Protéger des secrets individuels avec une couche de sécurité supplémentaire
  - Exemples : "Protéger avec une phrase secrète", "Entrez la phrase secrète pour voir ce secret"

- **Pourquoi c'est important :** Les utilisateurs doivent clairement comprendre la différence entre leurs identifiants de compte et la protection optionnelle des secrets

### Burn (verbe)
- **Choix :** détruire / supprimer définitivement
- **Signification :** Supprimer définitivement avant visualisation
- **Exemples :**
  - ✓ "Détruire ce secret" (action bouton)
  - ✓ "Secret détruit" (statut passé)

## Voix et ton

### Voix active vs passive

**Actions (boutons, liens) :**
Utiliser la voix active impérative pour les actions utilisateur :
- ✓ "Créer un secret" (impératif)
- ✓ "Copier dans le presse-papiers" (impératif)
- ✓ "Supprimer le compte" (impératif)
- ✗ "Création du secret" (gérondif - utiliser pour le statut)

**Statut (notifications, descriptions) :**
Utiliser la voix passive ou déclarative pour le texte informatif :
- ✓ "Secret créé" (passé composé/passif)
- ✓ "Copié dans le presse-papiers" (passif)
- ✓ "Compte supprimé" (passif)
- ✗ "Créer un secret" (impératif - déroutant dans un contexte de statut)

### Niveau de formalité
- **Choix :** Tutoiement (tu/vous informel selon le contexte)
- **Rationale :** Le "vous" de politesse crée un ton professionnel adapté
- **Usage moderne :** Certains produits tech utilisent "tu" pour être accessible
- **Recommandation :** "Vous" pour Onetime Secret (ton professionnel, sécurité)

**Exemples :**
- ✓ "Entrez votre mot de passe" (vous de politesse)
- ✓ "Créez votre premier secret" (vous de politesse)

## Style d'écriture

### Clarté et concision
- Utiliser un langage clair et direct qui respecte le temps des utilisateurs
- Éviter le jargon sauf nécessité technique
- Écrire pour des utilisateurs de niveaux techniques variés

**Exemples :**
- ✓ "Copier le lien" (concis, clair)
- ✗ "Cliquez ici pour copier le lien dans votre presse-papiers !" (verbeux)

### Ponctuation française
- **Espace insécable avant :** `:` `;` `!` `?` `«` et après `»`
- **Guillemets français :** Utiliser « » plutôt que " "
- **Points de suspension :** Utiliser … (caractère unique) plutôt que ...

**Exemples :**
- ✓ "Question : réponse" (espace avant les deux points)
- ✗ "Question: réponse" (pas d'espace - style anglais)
- ✓ "Êtes-vous sûr ?" (espace avant le point d'interrogation)
- ✗ "Êtes-vous sûr?" (pas d'espace - style anglais)

## Règles de traduction critiques

| Règle | Correct | Incorrect | Exemple |
|-------|---------|-----------|---------|
| Infinitif vs. Nom | Infinitif (boutons/liens), Nom (titres/headings) | Formes mixtes | ✓ Mettre à niveau (bouton); ✗ Mise à niveau (bouton) |
| Mot de passe vs. Phrase secrète | mot de passe (connexion), phrase secrète (secret) | Usage mixte | ✓ Entrez votre mot de passe (connexion); ✗ Entrez votre phrase secrète (connexion) |
| Ponctuation française | Espace insécable avant `:` `;` `!` `?` | Pas d'espace | ✓ Question : texte ?; ✗ Question: texte? |
| Guillemets | Guillemets français « » | Guillemets anglais " " | ✓ « citation »; ✗ "citation" |
| Voix active/passive | Active (actions), Passive (statuts) | Formes mixtes | ✓ Supprimer (bouton); ✓ Supprimé (statut) |

## Nombres et formats

### Dates
- Format : JJ/MM/AAAA
- Exemple : "17/11/2025"

### Heure
- Format 24 heures standard en France
- Exemple : "14:30" (pas "2:30 PM")

### Nombres
- Séparateur décimal : virgule (,)
- Séparateur de milliers : espace insécable ( )
- Exemple : "1 234,56"

### Devise
- Symbole : €
- Position : Après le montant avec espace
- Exemple : "19,99 €"

## Termes techniques

### Garder en anglais
- API
- URL
- DNS
- SSL/TLS
- HTTP/HTTPS
- JSON
- YAML
- OAuth

### Traduire en français
- Dashboard → Tableau de bord
- Settings → Paramètres
- Clipboard → Presse-papiers
- Account → Compte

## Erreurs courantes à éviter

1. **Confondre mot de passe et phrase secrète**
   - ✗ "Entrez la phrase secrète pour vous connecter" (devrait être "mot de passe")
   - ✗ "Protéger avec un mot de passe" pour les secrets (devrait être "phrase secrète")

2. **Mélanger les voix dans l'UI**
   - ✗ Utiliser "Création..." sur un bouton (devrait être "Créer")
   - ✗ Utiliser "Supprimer" dans un message de statut (devrait être "Supprimé")

3. **Ponctuation anglaise**
   - ✗ "Question: réponse?" (style anglais)
   - ✓ "Question : réponse ?" (style français avec espaces insécables)

4. **Terminologie incohérente**
   - Choisir un terme et s'y tenir
   - Exemple : "détruire" vs "supprimer" - choisir un seul

## Considérations d'accessibilité

### Lecteurs d'écran
- Utiliser des étiquettes descriptives pour la navigation
- Exemple : "Navigation principale" et non juste "Principal"

### Clarté
- Écrire en langage clair
- Définir les termes techniques lors de la première utilisation
- Utiliser une terminologie cohérente

## Variations régionales

### Français de France (fr)
- Standard pour cette traduction
- Utilise "vous" de politesse
- Format 24 heures

### Français du Canada (fr-CA)
Différences potentielles à considérer pour une future localisation :
- Certains anglicismes acceptés au Québec
- Variations de vocabulaire : "courriel" vs "e-mail"
- Différences de formalité

## Référence

Pour des informations complètes sur toutes les langues, voir :
- [Aperçus des traductions spécifiques aux langues](/docs/localization/reference/language-specific-notes.md)
