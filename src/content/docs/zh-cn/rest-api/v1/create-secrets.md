---
title: 创造秘密
description: 了解如何使用 Onetime Secret REST API 创建和检索秘密，支持认证和匿名使用。
---

_更新日期 2025-04-02_

注
**数据地点和区域选择***
- 选择美国（[`us.onetimesecret.com``](https://us.onetimesecret.com/)）或欧盟（[`eu.onetimesecret.com``](https://eu.onetimesecret.com/)）数据中心
- 考虑数据主权、延迟和合规要求等因素
- ** 注：** 默认情况下，`onetimesecret.com` 仍可运行并路由至活动数据中心，建议使用特定位置，因为此功能将来可能会过时。
:::


## 创建一个秘密

`POST https://REGION.onetimesecret.com/api/v1/share`

使用该端点存储秘密值并创建一次性使用链接。


### 验证请求

```bash
$ curl -X POST -u 'USERNAME:APITOKEN' -d 'secret=SECRET&ttl=NUMBER_IN_SECONDS' https://us.onetimesecret.com/api/v1/share
```

### 匿名请求

```bash
$ curl -X POST -d 'secret=SECRET&ttl=3600' https://us.onetimesecret.com/api/v1/share
```

### 查询参数

- **secret**：密文值，存储前已加密。根据您的计划，会有一个最大长度（1k-10k）。
- **密码**：接收者必须知道的字符串，用于查看密文。该值也用于加密密文，并在存储前进行加密，因此我们只在传输过程中拥有该值。
- **ttl**：密文存活的最长时间（即有效时间），以秒为单位。一旦过期，密文将被删除，无法恢复。
- 收件人**：电子邮件地址。我们将发送一封包含秘密链接（而非秘密本身）的友好电子邮件。
- **share_domain**：生成秘密链接时使用的自定义域。如果未提供，则使用默认域（例如 eu.onetimesecret.com）。

#### 属性

- custid**：创建秘密的账户的用户名。对于匿名请求，该值将是 "anon"。
- **metadata\_key**：元数据的唯一密钥。请勿共享。
- **secret\_key**：你创建的秘密的唯一密钥。这是可以共享的密钥。
- **ttl**：指定的生存时间（以秒为单位）（即不是剩余时间）
- **metadata\_ttl**：元数据的剩余生存时间（秒）。
- **secret\_ttl**：秘密的剩余生存时间（秒）。
- recipient**：如果指定了收件人，这是电子邮件地址的混淆版本。
- **创建**：密文创建时间，以 unix 时间（UTC）表示
- updated**：同上，但是是最后一次更新的时间。
- **passphrase\_required**：如果密文创建时提供了口令，则此值为 true。否则显然为假。
- **share_domain**：生成秘密链接时使用的自定义域。否则为""。


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

## 生成一个秘密

`POST https://REGION.onetimesecret.com/api/v1/generate`

生成一个简短、唯一的密码。这对临时密码、Onetime 密码笺、盐等非常有用。

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

与上面的 "分享秘密 "相同，但增加了 "值 "字段。
