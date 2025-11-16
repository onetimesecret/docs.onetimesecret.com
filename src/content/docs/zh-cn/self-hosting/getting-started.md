---
title: 入门指南
description: 快速设置指南，让您的自托管 Onetime Secret 实例运行起来
sidebar:
  order: 2
---

本指南将帮助您在几分钟内启动并运行自托管的 Onetime Secret 实例。

## 前提条件

- **1GB 以上内存** 以获得最佳性能
- **Redis 存储说明**：根据您的 Redis 配置，机密内容可以完全存储在内存中而不会写入磁盘，以增强安全性

## 方法 1：Docker（推荐）

使用 Docker 是最快的入门方式，只需最少的配置。

### 1. 启动 Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. 生成密钥

```bash
# 生成并存储持久化密钥
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "密钥已保存到 .ots_secret（请妥善保管此文件！）"
```

### 3. 运行 Onetime Secret

```bash
# 使用密钥运行容器
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. 访问您的实例

在浏览器中打开：
- **Web 界面**：http://localhost:3000
- **API 端点**：http://localhost:3000/api/v2/status

## 方法 2：手动安装

对于喜欢手动设置的用户，您需要：

- **Ruby 3.2+**（可能在默认系统软件包中不可用）
- **Redis 5+** 或 **Valkey**（Redis 替代方案）
- **Node.js 22+** 和 **pnpm**（仅用于开发和构建前端资源）

在运行应用程序之前，您需要使用 `pnpm install && pnpm run build:local` 构建前端资源。

有关完整的手动安装详细信息，请参阅 [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md)。

## 验证

1. 导航到 http://localhost:3000
2. 创建一个测试机密内容以验证一切正常
3. 在 http://localhost:3000/api/v2/status 检查 API 状态

## 管理员设置

要创建管理员用户，请在配置文件的 `:colonels:` 部分添加电子邮件地址，然后使用其中一个电子邮件注册以自动获得管理员访问权限。

**注意**：管理员区域目前功能有限 - 它是只读配置查看，没有用户管理功能。未来版本计划提供更多功能。

## 后续步骤

现在您的实例已经运行：

1. **[配置您的部署](./installation)** 用于生产使用
2. **[查看配置选项](./configuration)** 进行自定义

## 获取帮助

- **文档**：浏览我们的[配置参考](./configuration)
- **社区**：加入 [GitHub](https://github.com/onetimesecret/onetimesecret/discussions) 上的讨论
- **问题**：在我们的[问题跟踪器](https://github.com/onetimesecret/onetimesecret/issues)上报告错误
