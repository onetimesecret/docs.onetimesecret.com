---
title: 加拿大（CA）
description: Onetime Secret 位于多伦多的加拿大数据中心区域。
---

## 基础设施

- **位置**：加拿大多伦多
- **URL**：[ca.onetimesecret.com](https://ca.onetimesecret.com)
- **托管服务商**：<a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **自定义域名 CNAME**：`identity.ca.onetime.co`

:::note
我们是一家加拿大公司，正在积极寻找适合该地区的加拿大本土托管服务商。如果您有任何建议，欢迎通过我们的[反馈表](https://onetimesecret.com/feedback)告诉我们。
:::

## 自定义域名 DNS

要将自定义域名指向此地区，请创建一条 CNAME 记录：

| 记录类型 | 主机                  | 值                        |
| -------- | --------------------- | ------------------------- |
| CNAME    | `secrets.example.com` | `identity.ca.onetime.co`  |

完整说明请参阅[自定义域名设置指南](/zh-cn/custom-domains/setup-guide)。

## 监管环境

加拿大的联邦隐私立法——**《个人信息保护和电子文件法》（PIPEDA）**——规范了商业活动中个人信息的收集、使用和披露。部分省份还制定了各自可能适用的隐私立法。

### 关于托管服务商

该地区由 <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a> 托管，这是一家总部位于美国科罗拉多州布鲁姆菲尔德的云服务商，为全球数百万开发者提供服务。DigitalOcean 针对欧洲客户遵守 GDPR，支持数据可携带性，并发布详细说明政府数据请求情况的透明度报告。该公司实施了完善的安全控制措施，并发布审计报告。

### 主要监管要点

- PIPEDA 要求在收集和使用数据时获得切实有效的同意
- 加拿大隐私专员办公室（Office of the Privacy Commissioner of Canada）负责监督合规情况
- 加拿大获得欧盟委员会的充分性认定，便于与欧盟之间的数据传输
- 各省法律（如阿尔伯塔省的 PIPA、魁北克省的《25号法》）可能施加额外要求

## 何时应考虑此地区

- 您的组织或用户主要位于加拿大
- 您需要遵守 PIPEDA 或各省的隐私立法
- 您希望数据保留在加拿大境内
- 您为北美客户提供服务，并希望选择一个地理位置居中的选项
