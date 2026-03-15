---
title: 找回内容
description: 了解如何使用 Onetime Secret REST API 检索内容，支持身份验证和匿名访问。
---

_更新日期 2025-04-02_

:::note
**数据位置和区域选择**
- 选择一个[区域](/zh-cn/regions/)（例如 [`ca.onetimesecret.com`](https://ca.onetimesecret.com/)、[`eu.onetimesecret.com`](https://eu.onetimesecret.com/)、[`nz.onetimesecret.com`](https://nz.onetimesecret.com/)、[`uk.onetimesecret.com`](https://uk.onetimesecret.com/)、[`us.onetimesecret.com`](https://us.onetimesecret.com/)）数据中心
- 考虑数据主权、延迟和合规要求等因素
- **注：** 默认情况下，`onetimesecret.com` 仍可运行并路由至活动数据中心，建议使用特定位置，因为此功能将来可能会过时。
:::

## 检索内容

`POST https://REGION.onetimesecret.com/api/v1/secret/SECRET_KEY`

### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### 匿名请求

```bash
$ curl -X POST https://eu.onetimesecret.com/api/v1/secret/SECRET_KEY
```

### 查询参数

- **SECRET_KEY**：该密文的唯一密钥。
- **passphrase**（如需要）：只有在创建内容时才需要口令。

### 属性

- **secret_key**：您创建的内容的唯一密钥。这是可以共享的密钥。
- **value**：实际内容。不言而喻，它只能使用一次。

## 检索元数据

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY`

每条机密内容都有相关的元数据。元数据仅供内容创建者使用（即不供接收者使用），一般应保密。由于元数据密钥与内容密钥不同，因此你可以放心使用元数据密钥来获取关于机密内容本身的基本信息（如是否或何时被查看）。

### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY
```

### 查询参数

- **METADATA_KEY**：该元数据的唯一密钥。

### 属性

- **custid**：创建内容的账户的用户名。对于匿名请求，该值将是 `anon`。
- **metadata\_key**：元数据的唯一密钥。请勿共享。
- **secret\_key**：你创建的内容的唯一密钥。这是可以共享的密钥。
- **ttl**：指定的生存时间（即不是剩余时间）
- **metadata\_ttl**：元数据的剩余生存时间（以秒为单位）。
- **secret\_ttl**：内容的剩余生存时间（秒）。
- **recipient**：如果指定了收件人，这是电子邮件地址的混淆版本。
- **created**：元数据的创建时间，以 unix 时间（UTC）表示。
- **updated**：同上，不过是最后一次更新的时间。
- **received**：收到内容的时间。
- **passphrase\_required**：如果在创建密文时提供了口令，则此值为 true。否则显然为假。


## 销毁内容

`POST https://REGION.onetimesecret.com/api/v1/private/METADATA_KEY/burn`

销毁一条尚未被读取的内容。

### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/METADATA_KEY/burn
```

### 查询参数

- 无

### 属性

- 与状态为已销毁的元数据属性相同。

## 检索最近的元数据

**GET https://onetimesecret.com/api/v1/private/recent**

读取最近的元数据列表。

### 验证请求

```bash
$ curl -u 'USERNAME:APITOKEN' https://eu.onetimesecret.com/api/v1/private/recent
```

### 查询参数

- 无

### 属性

- 与元数据属性相同，但它是一个列表，密钥值始终为空。

:::warning 需要验证
注意：元数据和管理操作（检索元数据、销毁密文、最近元数据）仅适用于通过身份验证的用户。
:::
