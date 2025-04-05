---
title: Retrouver les secrets
description: Apprendre à récupérer des secrets à l'aide de l'API REST Onetime Secret, avec prise en charge des accès authentifiés et anonymes.
---

Mis à jour le 2025-04-02_

:::note
**Localité des données et sélection des régions**
- Choisissez une [région]({getRelativeLocaleUrl(Astro.currentLocale ? ? 'en', 'regions')}) (par exemple, [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/)) pour les centres de données.
- Tenir compte de facteurs tels que la souveraineté des données, la latence et les exigences de conformité.
- REMARQUE:** Par défaut, `onetimesecret.com` reste opérationnel et dirige vers un centre de données actif, l'utilisation d'une localité spécifique est recommandée car cette fonctionnalité pourrait être obsolète à l'avenir.
:: :

## Récupérer un secret

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Demande authentifiée

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Demande anonyme

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Params de la requête

- **SECRET_KEY** : la clé unique de ce secret.
- **passphrase** (si nécessaire) : la phrase de passe n'est requise que si le secret a été créé avec une phrase de passe.

### Attributs

- **secret_key** : la clé unique du secret que vous avez créé. Il s'agit de la clé que vous pouvez partager.
- **value** : Le secret proprement dit. Il va sans dire que ce secret ne sera disponible qu'une seule fois.

## Récupérer les métadonnées

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Chaque secret est également associé à des métadonnées. Les métadonnées sont destinées à être utilisées par le créateur du secret (c'est-à-dire pas par le destinataire) et doivent généralement rester privées. Vous pouvez utiliser en toute sécurité la clé des métadonnées pour obtenir des informations de base sur le secret lui-même (par exemple, si ou quand il a été consulté), puisque la clé des métadonnées est différente de la clé du secret.

### Demande authentifiée

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Params de la requête

- **METADATA_KEY** : la clé unique de cette métadonnée.

### Attributs

- **custid** : le nom d'utilisateur du compte qui a créé le secret. Cette valeur sera `anon` pour les requêtes anonymes.
- **metadata\_key** : la clé unique pour les métadonnées. Ne la partagez pas.
- **secret\_key** : la clé unique pour le secret que vous avez créé. Il s'agit d'une clé que vous pouvez partager.
- **ttl** : Le temps de vie qui a été spécifié (c'est-à-dire pas le temps restant).
- **metadata\_ttl** : Le temps restant (en secondes) pour les métadonnées.
- **secret\_ttl** : Le temps restant (en secondes) pour le secret.
- **recipient** : si un destinataire a été spécifié, il s'agit d'une version obscurcie de l'adresse électronique.
- **created** : Heure de création des métadonnées en heure Unix (UTC).
- updated** : idem, mais l'heure de la dernière mise à jour.
- **received** : Heure à laquelle le secret a été reçu.
- **passphrase\_required** : Si une phrase de passe a été fournie lors de la création du secret, ceci sera vrai. Dans le cas contraire, cette valeur est évidemment fausse.


## Brûler un secret

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Brûler un secret qui n'a pas encore été lu.

### Demande authentifiée

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Params de la requête

- Aucun

### Attributs

- Identique aux attributs de métadonnées dont le statut est brûlé.

## Récupérer les métadonnées récentes

**GET https://onetimesecret.com/api/v1/private/recent**

Récupérer une liste de métadonnées récentes.

### Demande authentifiée

``bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Params de la requête

- Aucun

### Attributs

- Identique aux attributs de métadonnées, mais sous forme de liste et la valeur de la clé secrète sera toujours nulle.

:: : avertissement Authentification requise
Note : Les métadonnées et les opérations de gestion (récupérer les métadonnées, brûler le secret, métadonnées récentes) ne sont disponibles que pour les utilisateurs authentifiés.
:: :
