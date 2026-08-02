---
title: 英国（UK）
description: Onetime Secret 位于伦敦的英国数据中心区域。
---

## 基础设施

- **位置**：英国伦敦
- **URL**：[uk.onetimesecret.com](https://uk.onetimesecret.com)
- **托管服务商**：<a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>（芬兰赫尔辛基）
- **自定义域名 CNAME**：`identity.ingress.onetime.co`（任播）

## 自定义域名 DNS

要将自定义域名指向此地区，请创建一条 CNAME 记录：

| 记录类型 | 主机                  | 值                             |
| -------- | --------------------- | ------------------------------ |
| CNAME    | `secrets.example.com` | `identity.ingress.onetime.co`  |

请注意，英国地区使用的是任播（anycast）CNAME，而非特定地区的子域名。

完整说明请参阅[自定义域名设置指南](/zh-cn/custom-domains/setup-guide)。

## 监管环境

英国的数据保护框架由**《英国通用数据保护条例》（UK GDPR）**和**《2018年数据保护法》（Data Protection Act 2018）**规范。脱欧后，英国维持了一套与欧盟 GDPR 高度接轨的独立数据保护制度。

### 关于托管服务商

该地区由 <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> 托管，这是一家成立于2011年、总部位于芬兰赫尔辛基的欧洲云基础设施服务商。作为一家具有主权性质的欧洲服务商，其所有账户相关数据均仅存储在芬兰境内，受芬兰和欧盟数据保护法规约束。UpCloud 在包括伦敦在内的多个欧洲地点运营数据中心，本地区正是由伦敦的数据中心提供支持。

### 主要监管要点

- 信息专员办公室（Information Commissioner's Office，ICO）担任独立监管机构
- 英国 GDPR 保留了欧盟 GDPR 的核心原则和权利，包括数据主体权利和合法依据要求
- 英国获得欧盟委员会的充分性认定，允许数据从欧盟/欧洲经济区自由流入
- 《2018年数据保护法》对英国 GDPR 进行了补充，针对英国执法和情报机构制定了专门规定

## 何时应考虑此地区

- 您的组织或用户主要位于英国
- 您需要遵守英国 GDPR 和《2018年数据保护法》
- 您希望数据保留在英国境内
- 您为需要英国本地数据处理的客户提供服务
