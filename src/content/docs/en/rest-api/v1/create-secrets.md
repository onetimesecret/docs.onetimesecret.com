---
title: Creating Secrets
description: Learn how to create and retrieve secrets using the Onetime Secret REST API, with support for both authenticated and anonymous usage.
---

_Updated 2025-04-02_

:::note
**Data Locality and Region Selection**
- Choose between US ([`us.onetimesecret.com`](https://us.onetimesecret.com/)), EU ([`eu.onetimesecret.com`](https://eu.onetimesecret.com/)), Canada ([`ca.onetimesecret.com`](https://ca.onetimesecret.com/)), or New Zealand ([`nz.onetimesecret.com`](https://nz.onetimesecret.com/)) data centers
- Consider factors like data sovereignty, latency, and compliance requirements
- **NOTE:** Default `onetimesecret.com` remains operational and routes to an active data center, using a specific locality is recommended as this functionality may be deprecated in the future.
:::


## Create a Secret

`POST https://REGION.onetimesecret.com/api/v1/share`

Use this endpoint to store a secret value and create a onetime use link.


### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### Anonymous Request

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### Query Params

- **secret**: the secret value which is encrypted before being stored. There is a maximum length based on your plan that is enforced (1k-10k).
- **passphrase**: a string that the recipient must know to view the secret. This value is also used to encrypt the secret and is bcrypted before being stored so we only have this value in transit.
- **ttl**: the maximum amount of time, in seconds, that the secret should survive (i.e. time-to-live). Once this time expires, the secret will be deleted and not recoverable.
- **recipient**: an email address. We will send a friendly email containing the secret link (NOT the secret itself).
- **share_domain**: the custom domain to use when generating the secret link. If not provided, the default domain is used (e.g. eu.onetimesecret.com).

### Attributes

- **custid**: the username of the account that created the secret. This value will be `anon` for anonymous requests.
- **metadata\_key**: the unique key for the metadata. DO NOT share this.
- **secret\_key**: the unique key for the secret you create. This is key that you can share.
- **ttl**: The time-to-live (in seconds) that was specified (i.e. not the time remaining)
- **metadata\_ttl**: The remaining time (in seconds) that the metadata has left to live.
- **secret\_ttl**: The remaining time (in seconds) that the secret has left to live.
- **recipient**: if a recipient was specified, this is an obfuscated version of the email address.
- **created**: Time the secret was created in unix time (UTC)
- **updated**: ditto, but the time it was last updated.
- **passphrase\_required**: If a passphrase was provided when the secret was created, this will be true. Otherwise false, obviously.
- **share_domain** : the custom domain to use when generating the secret link. Otherwise "".


### Example Response:

```json
{
  "custid":"USERNAME",
  "metadata_key":"qjpjroeit8wra0ojeyhcw5pjsgwtuq7",
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## Generate a Secret

`POST https://REGION.onetimesecret.com/api/v1/generate`

Generate a short, unique secret. This is useful for temporary passwords, Onetime pads, salts, etc.

### Authenticated Request

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### Anonymous Request

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


```json
{
  "custid":"USERNAME",
  "value":"3Rg8R2sfD3?a",
  "metadata_key":"2b6bjmudhmtiqjn2qmdaqjkqxp323gi",
  "secret_key":"pgcdv7org3vtdurif809sygnt0mstw6",
  "ttl":"3600",
  "share_domain": "",
  "updated":"1324174095",
  "created":"1324174095"
}
```

### Attributes

Same as "Share A Secret" above, with the addition of the `value` field.
