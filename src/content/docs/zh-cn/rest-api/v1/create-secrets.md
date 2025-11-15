---
title: 创建内容
description: 了解如何使用 Onetime Secret REST API 创建和检索内容，支持认证和匿名使用。
---

_更新日期 2025-04-02_

注
**数据地点和区域选择***
- 选择美国（[`us.onetimesecret.com`](https://us.onetimesecret.com/)）、欧盟（[`eu.onetimesecret.com`](https://eu.onetimesecret.com/)）、加拿大（[`ca.onetimesecret.com`](https://ca.onetimesecret.com/)）或新西兰（[`nz.onetimesecret.com`](https://nz.onetimesecret.com/)）数据中心
- 考虑数据主权、延迟和合规要求等因素
- ** 注：** 默认情况下，`onetimesecret.com` 仍可运行并路由至活动数据中心，建议使用特定位置，因为此功能将来可能会过时。
:::


## 创建内容

`POST https://REGION.onetimesecret.com/api/v1/share`

使用该端点存储内容并创建一次性使用链接。


### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### 匿名请求

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### 查询参数

- **secret**：内容值，存储前已加密。根据您的计划，会有一个最大长度（1k-10k）。
- **passphrase**：接收者必须知道的字符串，用于查看内容。该值也用于加密内容，并在存储前进行加密，因此我们只在传输过程中拥有该值。
- **ttl**：内容存活的最长时间（即有效时间），以秒为单位。一旦过期，内容将被删除，无法恢复。
- **recipient**：电子邮件地址。我们将发送一封包含一次性链接（而非内容本身）的友好电子邮件。
- **share_domain**：生成一次性链接时使用的自定义域。如果未提供，则使用默认域（例如 eu.onetimesecret.com）。

#### 属性

- **custid**：创建内容的账户的用户名。对于匿名请求，该值将是 "anon"。
- **metadata\_key**：元数据的唯一密钥。请勿共享。
- **secret\_key**：你创建的内容的唯一密钥。这是可以共享的密钥。
- **ttl**：指定的生存时间（以秒为单位）（即不是剩余时间）
- **metadata\_ttl**：元数据的剩余生存时间（秒）。
- **secret\_ttl**：内容的剩余生存时间（秒）。
- **recipient**：如果指定了收件人，这是电子邮件地址的混淆版本。
- **created**：内容创建时间，以 unix 时间（UTC）表示
- **updated**：同上，但是是最后一次更新的时间。
- **passphrase\_required**：如果内容创建时提供了口令，则此值为 true。否则显然为假。
- **share_domain**：生成一次性链接时使用的自定义域。否则为""。


#### 响应示例：

``json
{
  "custid": "USERNAME"、
  "metadata_key": "qjpjroeit8wra0ojeyhcw5pjsgwtuq7"、
  "secret_key":"153l8vbwqx5taskp92pf05uvgjefvu9",
  "ttl": "3600"、
  "share_domain"："",
  "updated":"1324174006",
  "created":"1324174006"
}
```

## 生成内容

`POST https://REGION.onetimesecret.com/api/v1/generate`

生成一个简短、唯一的密码。这对临时密码、一次性密码笺、盐等非常有用。

### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/generate
```

### 匿名请求

```bash
$ curl -X POST -d 'ttl=3600' https://us.onetimesecret.com/api/v1/generate
```


``json
{
  "custid": "USERNAME"、
  "value":"3Rg8R2sfD3?a",
  "metadata_key": "2b6bjmudhmtiqjn2qmdaqjkqxp323gi"、
  "secret_key": "pgcdv7org3vtdurif809sygnt0mstw6"、
  "ttl": "3600"、
  "share_domain"："",
  "updated":"1324174095",
  "created":"1324174095"
}
```

#### 属性

与上面的 "分享内容" 相同，但增加了 "值" 字段。
