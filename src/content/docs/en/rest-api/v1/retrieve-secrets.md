---
title: Retrieving Secrets
description: Learn how to retrieve secrets using the Onetime Secret REST API, with support for both authenticated and anonymous access.
---

_Updated 2025-04-02_

:::note
**Data Locality and Region Selection**
- Choose a [region](/en/regions/) (e.g. [`us.onetimesecret.com`](https://us.onetimesecret.com/), [`eu.onetimesecret.com`](https://eu.onetimesecret.com/), [`uk.onetimesecret.com`](https://uk.onetimesecret.com/)) data centers
- Consider factors like data sovereignty, latency, and compliance requirements
- **NOTE:** Default `onetimesecret.com` remains operational and routes to an active data center, using a specific locality is recommended as this functionality may be deprecated in the future.
:::

## Retrieve a Secret

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Anonymous Request

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### Query Params

- **SECRET_KEY**: the unique key for this secret.
- **passphrase** (if required): the passphrase is required only if the secret was created with one.

### Attributes

- **secret_key**: the unique key for the secret you create. This is key that you can share.
- **value**: The actual secret. It should go without saying, but this will only be available one time.

## Retrieve Metadata

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

Every secret also has associated metadata. The metadata is intended to be used by the creator of the secret (i.e. not the recipient) and should generally be kept private. You can safely use the metadata key to retrieve basic information about the secret itself (e.g. if or when it was viewed) since the metadata key is different from the secret key.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### Query Params

- **METADATA_KEY**: the unique key for this metadata.

### Attributes

- **custid**: the username of the account that created the secret. This value will be `anon` for anonymous requests.
- **metadata\_key**: the unique key for the metadata. DO NOT share this.
- **secret\_key**: the unique key for the secret you created. This is key that you can share.
- **ttl**: The time-to-live that was specified (i.e. not the time remaining)
- **metadata\_ttl**: The remaining time (in seconds) that the metadata has left to live.
- **secret\_ttl**: The remaining time (in seconds) that the secret has left to live.
- **recipient**: if a recipient was specified, this is an obfuscated version of the email address.
- **created**: Time the metadata was created in unix time (UTC)
- **updated**: ditto, but the time it was last updated.
- **received**: Time the secret was received.
- **passphrase\_required**: If a passphrase was provided when the secret was created, this will be true. Otherwise false, obviously.


## Burn a Secret

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

Burn a secret that has not been read yet.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### Query Params

- None

### Attributes

- Same as metadata attributes with a status of burned.

## Retrieve Recent Metadata

**GET https://onetimesecret.com/api/v1/private/recent**

Retrieve a list of recent metadata.

### Authenticated Request

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### Query Params

- None

### Attributes

- Same as metadata attributes, although as a list and the secret key value will always be null.

::: warning Authentication Required
Note: Metadata and management operations (retrieve metadata, burn secret, recent metadata) are only available for authenticated users.
:::
