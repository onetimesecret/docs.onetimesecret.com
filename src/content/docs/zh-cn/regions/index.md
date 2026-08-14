---
title: 数据中心区域
description: 了解 Onetime Secret 的数据中心区域，以及如何根据您的需求选择合适的区域。
---

Onetime Secret 提供五个数据中心区域：加拿大（CA）、欧盟（EU）、新西兰奥特亚罗瓦（NZ）、英国（UK）和美国（US）。本指南将帮助您了解地区选择的重要性，以及如何根据您的需求选择合适的地区。

## 地区选择为何重要

出于多种原因，选择合适的数据中心区域至关重要：

1. **数据主权**：不同地区有不同的数据保护法律法规。
2. **延迟**：选择离主要用户群较近的地区可以减少延迟。
3. **合规性**：有些组织对数据的存储位置有特殊要求。

## 可用地区

| 地区 | 位置 | URL |
|------|------|-----|
| [加拿大（CA）](/zh-cn/regions/canada) | 多伦多 | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [欧盟（EU）](/zh-cn/regions/european-union) | 纽伦堡 | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [新西兰奥特亚罗瓦（NZ）](/zh-cn/regions/new-zealand) | 波里鲁阿 | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [英国（UK）](/zh-cn/regions/united-kingdom) | 伦敦 | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [美国（US）](/zh-cn/regions/united-states) | 俄勒冈州希尔斯伯勒 | [us.onetimesecret.com](https://us.onetimesecret.com) |

每个地区页面均详细介绍了当地的监管环境，以及该地区在何种情况下适合您的使用场景。

## 无共享架构

Onetime Secret 采用无共享架构，确保区域间数据完全隔离：

- **独立账户**：在任何区域域名上创建的账户都与其他域名上的账户完全独立，即使您使用的是同一个电子邮件地址。
- **无跨中心操作**：您无法跨数据中心执行操作（如销毁内容）。每个中心都维护自己的一套内容和用户数据。
- **付费用户的计费一致性**：对于付费账户，虽然各中心之间不会共享用户数据，但您的订阅状态会通过我们的支付提供商 Stripe 在各地区间得到识别。

## 如何选择您的地区

在选择数据中心区域时，请考虑以下因素：

### 未注册账户时

- 向 onetimesecret.com 发出的请求可能会被路由到任何运行中的数据中心。
- 您可以通过直接访问某个区域域名（例如 [ca.onetimesecret.com](https://ca.onetimesecret.com/)）来选择特定地区。
- 生成的链接始终会标明所属地区（例如 `us.onetimesecret.com/secret/abcd1234`）。

### 已注册账户时

- 创建账户时，您需要选择一个数据中心区域。所有套餐——无论免费还是付费——都可以访问所有地区。
- 您需要在注册时所用的同一区域域名登录（例如，如果您在 `eu.onetimesecret.com` 注册，就需要在该域名登录）。

### 其他考虑因素

1. **针对个人用户**：
   - 个人偏好
   - 靠近您所在位置，访问速度可能更快
   - 个人数据主权方面的考虑

2. **针对企业用户**：
   - 法律和监管要求
   - 主要客户群所在地
   - 特定行业的合规需求

3. **技术方面的考虑**：
   - 应用程序对延迟的要求
   - 与其他服务或系统的集成

## 未来计划

我们一直在努力扩展数据中心选项。未来计划新增以下地点的数据中心：

- 澳大利亚
- 巴西
- 日本
- 墨西哥
- 挪威
- 韩国

这些扩展将为数据本地化提供更多选择，从而提升不同地区用户的性能表现和合规能力。


## 常见问题

**问：注册账户后可以更改地区吗？**
答：可以。请参阅[更改您的地区](/zh-cn/regions/switching-regions)，了解涵盖免费账户、付费订阅和自定义域名迁移的详细分步说明。

**问：选择的地区会影响我内容的安全性吗？**
答：不会，所有地区都提供同样高级别的安全保障。地区选择主要影响数据驻留位置和潜在的延迟。

**问：不同地区之间价格有差异吗？**
答：每个地区都有各自的定价——您可以使用本地货币支付，货币兑换由 Stripe 自动处理。Identity Plus 套餐通过单一订阅即可在所有数据中心使用无限量自定义域名。最新信息请查看我们的[定价页面](https://onetimesecret.com/pricing)。

## 需要帮助？

如果您不确定该选择哪个地区，或有任何疑问，请随时联系我们的支持团队。我们随时为您提供帮助，助您根据自身需求做出最佳决定。

- 电子邮件：[support@onetimesecret.com](mailto:support@onetimesecret.com)
- 反馈表：[https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

请记住，选择合适的地区可确保您在使用 Onetime Secret 时获得最佳性能，并遵守相关的数据法规。
