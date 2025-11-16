---
title: 自托管概述
description: 运行您自己的 Onetime Secret 实例的完整指南
sidebar:
  order: 1
---

运行您自己的私有 Onetime Secret 实例，全面控制您的数据、安全性和部署。

## 为什么要自托管？

自托管 Onetime Secret 为您提供：

- **完全的数据控制** - 所有机密内容保留在您的基础设施和网络中
- **自定义安全策略** - 配置身份验证、隐私选项和访问控制
- **合规性** - 满足数据处理的监管要求
- **自定义品牌** - 为您的组织定制界面

## 快速入门选项

选择最适合您环境的部署方法：

### Docker（推荐）
```bash
# 启动 Redis 和 Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:latest
```

访问 `http://localhost:3000`。

### 手动安装
适用于需要自定义配置的生产环境。

请参阅我们的[安装和部署](./self-hosting/installation)指南以获取详细步骤。

## 包含的功能

您的自托管实例包括：

- **Web 界面** - 用于创建和共享机密内容的全功能 UI
- **REST API** - 用于集成的编程访问
- **多语言支持** - 支持 12 种以上的语言
- **自定义域名** - 使用您自己的域名和品牌


## 系统要求

**推荐配置：**
- 2 个以上 CPU 核心
- 2GB 以上内存
- 10GB 以上磁盘空间
- Redis 用于会话存储
- Node.js 22+（用于开发）

## 后续步骤

1. **[入门指南](./self-hosting/getting-started)** - 分步设置指南
2. **[安装和部署](./self-hosting/installation)** - 详细的部署选项
3. **[配置参考](./self-hosting/configuration)** - 完整的设置文档

---

_准备好开始了吗？请遵循我们的[入门指南](./self-hosting/getting-started)。_
