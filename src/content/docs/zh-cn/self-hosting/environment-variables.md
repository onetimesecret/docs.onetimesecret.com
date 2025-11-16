---
title: 环境变量参考
description: Onetime Secret 环境变量的参考
sidebar:
  order: 5
---

本指南涵盖了 Onetime Secret v0.22.4+ 中可用的所有环境变量。


## 环境变量

在您的 `.env` 文件或环境中设置这些变量，或将它们添加到您的 docker 命令或 docker-compose.yml 文件中。除非标记为必需，否则所有变量都是可选的。

### 核心应用程序设置

```bash
SECRET=your-32-char-hex-key           # 用于会话和加密的密钥（必需）- 设置后不要更改
PORT=3000                             # Web 服务器监听的端口（默认：3000）
HOST=localhost:3000                   # 用于生成链接的主机和端口组合
SSL=true                              # 生成链接时控制 https/http（true/false）
SERVER_TYPE=thin                      # Web 服务器类型：thin、puma
RACK_ENV=production                   # 应用程序环境：development、production、test
```

### 数据库和存储

注意：以 REDIS_ 开头的变量也可以使用 VALKEY_ 前缀设置。

```bash
REDIS_URL=redis://localhost:6379/0   # 用于会话、机密内容和所有应用程序数据的 Redis 连接字符串
```

### 身份验证和安全性

```bash
AUTH_ENABLED=true                     # 启用身份验证系统（为 false 时禁用 API 身份验证）
AUTH_SIGNUP=true                      # 允许新用户注册
AUTH_SIGNIN=true                      # 允许现有用户登录
AUTH_AUTOVERIFY=false                 # 跳过新帐户的电子邮件验证
COLONEL=email@example.com             # 授予"colonel"权限的管理员电子邮件地址（逗号分隔）
```

**注意**："Colonel"是我们对"admin"用户的术语。Colonels 可以访问 `/colonel` 的管理员区域，该区域显示基本系统统计信息。管理员界面目前功能有限 - 没有用户管理，只有只读配置查看。

### 用户界面和功能

```bash
UI_ENABLED=true                       # 启用 Web 用户界面（禁用时显示最小页面）
API_ENABLED=true                      # 启用 REST API 端点（禁用时返回 404）
CSP_ENABLED=true                      # 启用内容安全策略标头
HEADER_ENABLED=true                   # 显示带有品牌的站点标头
HEADER_NAV_ENABLED=true               # 在标头中显示导航链接
HEADER_PREFIX=
DOMAINS_ENABLED=false                 # 启用自定义域支持
REGIONS_ENABLED=false                 # 启用多区域部署支持。这不会影响
                                      # 应用程序的功能。但它确实启用了
                                      # 用于链接到其他区域的 UI 组件。
```

### 品牌和内容

```bash
LOGO_URL=                            # 自定义徽标图像的 URL（默认为内置徽标）
LOGO_ALT=
LOGO_LINK=
FOOTER_LINKS=
ABOUT_URL=
ABOUT_EXTERNAL=false
CONTACT_URL=
PRIVACY_URL=
PRIVACY_EXTERNAL=false
TERMS_URL=
TERMS_EXTERNAL=false
STATUS_URL=
STATUS_EXTERNAL=false
```

### 发送电子邮件

```bash
EMAILER_MODE=smtp                    # 电子邮件服务模式（smtp、sendgrid 等）
EMAILER_REGION=                      # 电子邮件服务区域（用于云提供商）
FROM_EMAIL=noreply@localhost         # 默认发件人电子邮件地址
FROM=                                # 发件人姓名（FROMNAME 的替代方案）
FROMNAME=                            # 发件人的显示名称
SMTP_HOST=                           # SMTP 服务器主机名
SMTP_PORT=587                        # SMTP 服务器端口（TLS 通常为 587，普通为 25）
SMTP_USERNAME=                       # SMTP 身份验证用户名
SMTP_PASSWORD=                       # SMTP 身份验证密码
SMTP_TLS=true                        # 为 SMTP 启用 TLS 加密
SMTP_AUTH=login                      # SMTP 身份验证方法（login、plain 等）
```

### 机密内容和 TTL

```bash
DEFAULT_TTL=604800                   # 默认机密内容过期时间（以秒为单位）（604800 = 7 天）
TTL_OPTIONS=300,1800,3600,86400      # 呈现给用户的可用 TTL 选项，逗号分隔（秒）
DEFAULT_DOMAIN=                      # 机密内容链接的默认域（如果为空，则使用 HOST）
ALLOW_NIL_GLOBAL_SECRET=false        # 允许在缺少 SECRET 密钥的情况下操作（紧急恢复）
```


### 验证电子邮件地址

电子邮件地址验证由 [Truemail 库](https://github.com/truemail-rb/truemail)处理，该库支持多种验证类型，包括正则表达式、MX 记录查找和 SMTP 验证。

```bash
VERIFIER_DOMAIN=                     # 用于 SMTP 验证的域（SMTP 验证所需）
VERIFIER_EMAIL=                      # 用于 SMTP 验证的电子邮件地址（SMTP 验证所需）
```

**注意**：许多其他 Truemail 配置选项在 `truemail:` 部分下的 YAML 配置中可用，包括验证类型、超时设置、允许/阻止的域、DNS 服务器等。有关完整配置，请参阅 `config/config.yaml`。

### 国际化

```bash
I18N_ENABLED=true                    # 启用国际化
I18N_DEFAULT_LOCALE=en               # 默认语言区域设置
```

### 开发和调试

```bash
ONETIME_DEBUG=false                  # 启用调试模式
LOG_HTTP_REQUESTS=false              # 记录 HTTP 请求
STDOUT_SYNC=true                     # 同步 stdout 输出
DIAGNOSTICS_ENABLED=false            # 启用诊断
FRONTEND_HOST=http://localhost:5173  # 前端开发服务器 URL（仅开发）
VITE_API_BASE_URL=                   # Vite API 基础 URL 覆盖
```

### 监控和错误跟踪

有关配置 Sentry 的更多信息，请参阅 [sentry 文档](https://docs.sentry.io/platforms/ruby/)。

```bash
SENTRY_DSN=
SENTRY_DSN_BACKEND=
SENTRY_DSN_FRONTEND=
SENTRY_LOG_ERRORS=true
SENTRY_MAX_BREADCRUMBS=50
SENTRY_SAMPLE_RATE=1.0
SENTRY_VUE_TRACK_COMPONENTS=true
```
