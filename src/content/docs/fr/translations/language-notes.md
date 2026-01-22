---
title: Français
description: Règles critiques pour la traduction française
---

# Français

## Règles critiques de traduction

| Règle | Correct | Incorrect | Exemple |
|-------|---------|-----------|---------|
| Infinitif vs. Nom | Infinitif (boutons/liens), Nom (titres/headings) | Mixed forms | ✓ Mettre à niveau (button); ✗ Mise à niveau (button) |
| Mot de passe vs. Phrase secrète | mot de passe (login), phrase secrète (secret) | Mixed usage | ✓ Entrez votre mot de passe (login); ✗ Entrez votre phrase secrète (login) |
| Ponctuation française | Espace insécable avant `:` `;` `!` `?` | No space | ✓ Question : texte ?; ✗ Question: texte? |

## Considérations particulières

- Pour les boutons et liens, utiliser l'infinitif (ex: "Mettre à niveau") plutôt que le nom (ex: "Mise à niveau").
- Respecter la distinction entre "mot de passe" (pour l'authentification système) et "phrase secrète" (pour la protection des secrets).
- Toujours inclure un espace insécable avant les signes de ponctuation doubles (`:` `;` `!` `?`).

## Français canadien (fr_CA)

- **Office québécois de la langue française (OQLF) :** Organisme de référence pour la langue au Québec, communément appelé informellement la "police de la langue".
- **Grand dictionnaire terminologique (GDT) :** Publié par l'OQLF, il s'agit de la référence faisant autorité pour la terminologie française au Québec, y compris pour les termes techniques comme "courriel" (qu'ils ont promu par rapport à "e-mail").
- **Loi 101 (Charte de la langue française) :** L'OQLF assure le respect de cette loi et fournit les recommandations officielles pour la traduction des termes techniques anglais, ce qui explique pourquoi le français canadien présente souvent des traductions distinctes du français européen.

Infinitive preference (fr_CA pattern):

"Saisir" / "Saisissez" → "Entrer" (infinitive)
"Entrez une phrase secrète" → "Entrer une phrase secrète"

OQLF guidelines for Quebec French software localization specifically recommend infinitive forms for UI commands and instructions rather than imperative conjugations. France French (fr_FR) tends toward imperative ("Entrez", "Cliquez", "Sélectionnez").
Other fr_CA indicators in the second set:

"État" over "Statut" (the latter often flagged as anglicism in Quebec contexts, though both appear in tech)
More explicit phrasing: "une fois que vous les aurez partagés" vs the more compressed "après leur partage"
"facultatif" rather than embedding "optionnelle" in a noun phrase

Separate from regional distinction: Several changes are just corrections regardless of locale:

"Les secrets récents comptent" → "Nombre de secrets récents" fixes a mistranslation (original reads as "recent secrets matter")
"Formulaire d'accès secret" → "Formulaire d'accès au secret" fixes an adjective/genitive ambiguity
Restoring "message secret" over "contenu confidentiel" realigns with glossary terminology

The infinitive-vs-imperative pattern is the most reliable regional marker in this diff.

## Français de France (fr_FR)

- **Académie française :** Institution de référence pour la langue française en France, bien qu'elle soit moins prescriptive que l'OQLF pour la terminologie technologique et logicielle.
- **FranceTerme :** Base de données terminologique officielle gérée par la Délégation générale à la langue française (DGLFLF), publie les recommandations du Journal officiel pour les néologismes techniques.
- **Approche pragmatique des anglicismes :** Certains termes anglais sont plus tolérés qu'au Québec (ex : "e-mail" coexiste avec "courriel", "feedback" parfois accepté à l'oral).

### Conventions d'interface (fr_FR)

| Élément | Convention fr_FR | Exemple |
|---------|------------------|---------|
| Boutons/commandes | Impératif (2e personne) | "Entrez", "Cliquez", "Sélectionnez" |
| Instructions | Impératif ou infinitif | "Entrez votre mot de passe" ou "Entrer le mot de passe" |
| Messages d'état | Participe passé | "Modifications enregistrées" |

### Marqueurs distinctifs fr_FR vs fr_CA

| Aspect | fr_FR | fr_CA |
|--------|-------|-------|
| Forme verbale UI | Impératif ("Entrez", "Saisissez") | Infinitif ("Entrer", "Saisir") |
| "Status" | "Statut" acceptable | "État" préféré (statut = anglicisme) |
| Formulation | Plus concise ("après leur partage") | Plus explicite ("une fois que vous les aurez partagés") |
| "Email" | "e-mail" ou "courriel" | "courriel" uniquement |
| Registre | Vouvoiement standard | Vouvoiement standard |

### Ponctuation française (applicable aux deux variantes)

Les règles d'espacement avant ponctuation double s'appliquent identiquement :
- Espace insécable fine avant `: ; ! ?`
- Espace insécable à l'intérieur des guillemets français « »

**Note technique :** L'espace insécable fine (U+202F) est recommandée avant `: ; ! ?` mais l'espace insécable standard (U+00A0) reste acceptable si la fine n'est pas disponible.
