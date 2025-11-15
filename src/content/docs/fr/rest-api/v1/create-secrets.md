---
title: Création de secrets
description: Apprenez à créer et à récupérer des secrets à l'aide de l'API REST Onetime Secret, avec prise en charge de l'utilisation authentifiée et anonyme.
---

Mis à jour le 2025-04-02_

:::note
**Sélection de la localisation des données et de la région**
- Choisissez entre les centres de données des États-Unis ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), de l'Union européenne ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), du Canada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), ou de la Nouvelle-Zélande ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)).
- Tenir compte de facteurs tels que la souveraineté des données, la latence et les exigences de conformité.
- REMARQUE:** Par défaut, `onetimesecret.com` reste opérationnel et dirige vers un centre de données actif, l'utilisation d'une localité spécifique est recommandée car cette fonctionnalité pourrait être obsolète à l'avenir.
:: :


## Créer un secret

`POST https://REGION.onetimesecret.com/api/v1/share`

Ce point d'accès permet de stocker une valeur secrète et de créer un lien à usage unique.


### Demande authentifiée

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Demande anonyme

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Params de la requête

- **secret** : la valeur secrète qui est cryptée avant d'être stockée. Il y a une longueur maximale basée sur votre plan qui est appliquée (1k-10k).
- **Phrase secrète** : une chaîne de caractères que le destinataire doit connaître pour voir le secret. Cette valeur est également utilisée pour crypter le secret et est cryptée avant d'être stockée, de sorte que nous n'avons cette valeur qu'en transit.
- **ttl** : la durée maximale, en secondes, pendant laquelle le secret doit survivre (c'est-à-dire le temps de vie). Une fois ce délai écoulé, le secret sera supprimé et ne pourra plus être récupéré.
- **recipient** : une adresse électronique. Nous lui enverrons un courriel amical contenant le lien vers le secret (PAS le secret lui-même).
- **share_domain** : le domaine personnalisé à utiliser lors de la génération du lien secret. S'il n'est pas fourni, le domaine par défaut est utilisé (par exemple, eu.onetimesecret.com).

### Attributs

- **custid** : le nom d'utilisateur du compte qui a créé le secret. Cette valeur sera `anon` pour les requêtes anonymes.
- **metadata\_key** : la clé unique pour les métadonnées. Ne la partagez pas.
- **secret\_key** : la clé unique pour le secret que vous créez. Il s'agit d'une clé que vous pouvez partager.
- **ttl** : Le temps de vie (en secondes) qui a été spécifié (c'est-à-dire pas le temps restant).
- **metadata\_ttl** : Le temps restant (en secondes) pour les métadonnées.
- **secret\_ttl** : Le temps restant (en secondes) pour le secret.
- **recipient** : si un destinataire a été spécifié, il s'agit d'une version obscurcie de l'adresse électronique.
- **created** : Heure de création du secret en heure Unix (UTC).
- **updated** : idem, mais l'heure de la dernière mise à jour.
- **passphrase_required** : Si une phrase secrète a été fournie lors de la création du secret, ceci sera vrai. Sinon, c'est évidemment faux.
- **share_domain** : le domaine personnalisé à utiliser lors de la génération du lien secret. Sinon "".


### Exemple de réponse :

```json
{
  "custid" : "USERNAME",
  "metadata_key" : "qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl" : "3600",
  "share_domain" : "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Générer un secret

`POST https://REGION.onetimesecret.com/api/v1/generate`

Générer un secret court et unique. Cette fonction est utile pour les mots de passe temporaires, les blocs Onetime, les sels, etc.

### Demande authentifiée

``bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Demande anonyme

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
  "custid" : "USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key" : "2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key" : "pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl" : "3600",
  "share_domain" : "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Attributs

Identique à "Share A Secret" ci-dessus, avec l'ajout du champ `value`.
