---
title: 配置参考
description: 所有 Onetime Secret 配置选项的完整参考
sidebar:
  order: 4
---


本综合指南涵盖了自托管 Onetime Secret 实例的所有配置选项。

## 配置文件

Onetime Secret 使用多个配置文件：


- **`.env`** - 常用设置的环境变量。用于简单配置和 Docker 部署，无需修改 YAML 文件。（从 `.env.example` 复制）
- **`config/config.yaml`** - 使用 ERB 模板的主应用程序配置。环境变量在此处集成，便于查看每个设置的应用方式。（从 `etc/config.example.yaml` 复制）


## 主配置

主配置文件是 `config/config.yaml`，它使用 ERB 模板集成环境变量。

**入门：**
1. 复制示例：`cp etc/config.example.yaml config/config.yaml`
2. 根据您的部署需要编辑值
3. 大多数常用设置可以使用环境变量覆盖

**查看完整的配置文件：**
[config.example.yaml](https://raw.githubusercontent.com/onetimesecret/onetimesecret/refs/tags/v0.22.4/etc/config.example.yaml)

### 关键配置部分

以下是您可能需要自定义的最重要部分：

```yaml
---
:site:
  :host: <%= ENV['HOST'] || 'localhost:3000' %>
  # 生成链接时打开或关闭 https/http
  :ssl: <%= ENV['SSL'] == 'true' || false %>
  # 重要提示：设置密钥后，不应更改它。
  # 请务必在安全的异地位置创建并存储备份。
  # 更改密钥可能会导致无法预见的问题，
  # 例如无法解密现有机密内容。
  :secret: <%= ENV['SECRET'] || nil %>
  # API 和 UI 配置
  :interface:
    :ui:
      # 控制是否启用 Web 界面
      # 当为 false 时，仅显示基本说明页面
      :enabled: <%= ENV['UI_ENABLED'] != 'false' %>
      # 标头配置
      # 控制站点标头中的品牌和导航
      :header:
        # 控制开关以启用/禁用标头自定义
        :enabled: <%= ENV['HEADER_ENABLED'] != 'false' %>
        # 徽标和公司名称的品牌配置
        :branding:
          # 徽标配置
          :logo:
            # 徽标图像文件的 URL
            :url: <%= ENV['LOGO_URL'] || 'DefaultLogo.vue' %>
            # 徽标图像的替代文本
            :alt: <%= ENV['LOGO_ALT'] || 'Share a Secret One-Time' %>
            # 单击徽标时链接到的位置
            :href: <%= ENV['LOGO_LINK'] || '/' %>
          # 公司名称覆盖（如果未设置，则回退到 i18n）
          :site_name: <%= ENV['SITE_NAME'] || 'One-Time Secret' %>
        # 导航配置
        :navigation:
          # 完全启用/禁用标头导航
          :enabled: <%= ENV['HEADER_NAV_ENABLED'] != 'false' %>
      # 页脚链接配置
      # 这些链接显示在每个页面的页脚中
      :footer_links:
        # 主开关以启用/禁用所有页脚链接
        :enabled: <%= ENV['FOOTER_LINKS'] == 'true' || false %>
        # 组织的链接组
        :groups:
          - :name: legal
            :i18n_key: web.footer.legals
            :links:
              - :text: Terms of Service
                :i18n_key: terms-of-service
                # 替换为您自己的条款 URL 或使用相对路径，如 /terms
                :url: <%= ENV['TERMS_URL']  %>
                :external: <%= ENV['TERMS_EXTERNAL'] || false %>
              - :text: Privacy Policy
                :i18n_key: privacy-policy
                # 替换为您自己的隐私 URL 或使用相对路径，如 /privacy
                :url: <%= ENV['PRIVACY_URL']  %>
                :external: <%= ENV['PRIVACY_EXTERNAL'] || false %>
          - :name: resources
            :i18n_key: web.footer.resources
            :links:
              - :text: Status
                :i18n_key: status
                # 如果您有状态页面，请替换为您的状态页面 URL
                :url: <%= ENV['STATUS_URL'] %>
                :external: <%= ENV['STATUS_EXTERNAL'] || true %>
                :icon: signal
              - :text: About
                :i18n_key: web.COMMON.about
                # 替换为您的关于页面 URL
                :url: <%= ENV['ABOUT_URL'] %>
                :external: <%= ENV['ABOUT_EXTERNAL'] || false %>
          - :name: support
            :i18n_key: web.footer.support
            :links:
              - :text: Contact
                :i18n_key: web.footer.contact
                :url: <%= ENV['CONTACT_URL'] %>
                :external: false
    # 控制 API 端点是否可用。禁用时，API
    # 完全禁用。对 /api/* 的请求将返回 404。
    :api:
      :enabled: <%= ENV['API_ENABLED'] != 'false' %>
  # 机密内容管理的配置选项
  :secret_options:
    # 机密内容的默认生存时间（TTL），以秒为单位
    # 如果在创建机密内容时未提供特定 TTL，则使用此值
    :default_ttl: <%= ENV['DEFAULT_TTL'] || nil %>
    # 创建机密内容的可用 TTL 选项（以秒为单位）
    # 这些选项将在用户创建新机密内容时呈现给用户
    # 格式：表示秒数的整数字符串
    :ttl_options: <%= (ENV['TTL_OPTIONS'] || nil) %>
    # 保护访问机密内容的口令字段设置
    :passphrase:
      # 要求用户在创建机密内容时输入口令
      :required: <%= ENV['PASSPHRASE_REQUIRED'] == 'true' || false %>
      # 口令所需的最小字符数
      :minimum_length: <%= ENV['PASSPHRASE_MIN_LENGTH'] || 8 %>
      # 口令允许的最大字符数
      :maximum_length: <%= ENV['PASSPHRASE_MAX_LENGTH'] || 128 %>
      # 强制复杂性要求（大写、小写、数字、符号）
      :enforce_complexity: <%= ENV['PASSPHRASE_ENFORCE_COMPLEXITY'] == 'true' || false %>
    # 密码生成设置（当用户单击"生成密码"时）
    :password_generation:
      # 生成的密码的默认长度
      :default_length: <%= ENV['PASSWORD_GEN_LENGTH'] || 12 %>
      # 要包含在生成的密码中的字符集
      :character_sets:
        # 包含大写字母（A-Z）
        :uppercase: <%= ENV['PASSWORD_GEN_UPPERCASE'] != 'false' %>
        # 包含小写字母（a-z）
        :lowercase: <%= ENV['PASSWORD_GEN_LOWERCASE'] != 'false' %>
        # 包含数字（0-9）
        :numbers: <%= ENV['PASSWORD_GEN_NUMBERS'] != 'false' %>
        # 包含符号（!@#$%^&*()_+-=[]{}|;:,.<>?）
        :symbols: <%= ENV['PASSWORD_GEN_SYMBOLS'] == 'true' || false %>
        # 排除易混淆的字符（0、O、l、1、I）以防止混淆
        :exclude_ambiguous: <%= ENV['PASSWORD_GEN_EXCLUDE_AMBIGUOUS'] != 'false' %>
  # 注册和身份验证设置
  :authentication:
    # 可以完全禁用，包括 API 身份验证。
    :enabled: <%= ENV['AUTH_ENABLED'] != 'false' %>
    # 允许用户创建帐户。如果您计划手动创建帐户或
    # 在设置期间启用帐户创建，然后禁用以防止任何新用户
    # 创建帐户，则可以禁用此功能。
    :signup: <%= ENV['AUTH_SIGNUP'] != 'false' %>
    # 通常，如果您允许注册，则允许登录。但在某些情况下，
    # 暂时关闭身份验证是有帮助的。
    :signin: <%= ENV['AUTH_SIGNIN'] != 'false' %>
    # 默认情况下，新帐户需要在登录之前验证其电子邮件地址。
    # 这是一项安全措施，可防止垃圾邮件和系统滥用。如果您正在
    # 运行私有实例或为您的团队或公司运行实例，您可以禁用此功能
    # 以便用户更轻松地登录。
    :autoverify: <%= ENV['AUTH_AUTOVERIFY'] == 'true' || false %>
    # 启用时，除非用户已登录，否则主页机密内容表单不可用。
    # 类似于禁用的主页，但仍显示带有徽标和导航链接的标头。
    # 这允许更严格的模式，其中只有经过身份验证的用户才能创建
    # 机密内容，同时保持站点导航和品牌。
    :required: <%= ENV['AUTH_REQUIRED'] == 'true' %>
    # 下面列出的电子邮件地址将在帐户创建时自动授予
    # 管理权限。这些帐户可以访问显示基本系统统计信息的页面。
    # 使用术语"colonel"而不是"admin"。"Colonel"（发音为"kernel"）
    # 既指 Linux 系统的受保护核心，也指军衔，象征着高级访问
    # 权限。此命名有助于避免针对常见管理 URL 或角色名称的基本自动攻击。
    :colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
  # 一种类似验证码的功能，可保护反馈表单
  # 免受机器人和其他恶作剧的侵害。
  :authenticity:
    :type: <%= ENV['AUTHENTICITY_TYPE'] || 'altcha' %>
    :secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
  # 文档链接。对于 onetimesecret.com，这是
  # docs.onetimesecret.com。
  :support:
    :host: <%= ENV['SUPPORT_HOST'] || nil %>
  :plans:
    :enabled: <%= ENV['PLANS_ENABLED'] == 'true' || false %>
    :stripe_key: <%= ENV['STRIPE_KEY'] || nil %>
  :regions:
    :enabled: <%= ENV['REGIONS_ENABLED'] == 'true' || false %>
    :current_jurisdiction: <%= ENV['JURISDICTION'] || nil %>
  :domains:
    :enabled: <%= ENV['DOMAINS_ENABLED'] == 'true' || false %>
    # 用于链接 URL 的默认域。当未设置或为空时，
    # 使用 site.host。
    :default: <%= ENV['DEFAULT_DOMAIN'] || nil %>
    # 集群类型确定应用程序将如何支持
    # 多个域。默认值为 nil，这意味着
    # 应用程序本身负责处理多个域。
    :cluster:
      :type: <%= ENV['CLUSTER_TYPE'] || nil %>
      :api_key: <%= ENV['APPROXIMATED_API_KEY'] || nil %>
      :cluster_ip: <%= ENV['APPROXIMATED_PROXY_CLUSTER_IP'] || '<CLUSTER_IP>' %>
      :cluster_host: <%= ENV['APPROXIMATED_PROXY_CLUSTER_HOST'] || '<CLUSTER_HOST>' %>
      :cluster_name: <%= ENV['APPROXIMATED_PROXY_CLUSTER_NAME'] || '<CLUSTER_NAME>' %>
      :vhost_target: <%= ENV['APPROXIMATED_PROXY_VHOST_TARGET'] || '<VHOST_TARGET>' %>
:features:
  :incoming:
    :enabled: false
    :email: CHANGEME@example.com
    :passphrase: abacus
# Redis 配置
:redis:
  # 主 Redis 连接 URI - 指定完整的连接字符串（包括身份验证）
  # 格式：redis://[:password@]host[:port]/[db-number]
  # 示例：
  #   - redis://mypassword@localhost:6379/0        # 简单密码身份验证
  #   - redis://user:pass@localhost:6379/0         # 用户名/密码身份验证
  #   - redis://redis.example.com:6379/0          # 无身份验证（仅开发）
  :uri: <%= ENV['REDIS_URL'] || 'redis://CHANGEME@127.0.0.1:6379/0' %>

# 日志配置
:logging:
  # HTTP 请求日志（Rack::CommonLogger）
  :http_requests: <%= ENV['LOG_HTTP_REQUESTS'] != 'false' %>

# 发送电子邮件
:emailer:
  # 使用 Mailpit 进行本地开发
  # -----------------------------
  # Mailpit 是一个用于捕获电子邮件以进行测试的开发 SMTP 服务器
  # 安装：brew install mailpit
  # 启动：mailpit
  # Web UI：http://localhost:8025
  #
  #  :mode: smtp                      # 使用 SMTP 模式进行本地测试
  #  :from: secure@onetimesecret.com # 发件人地址
  #  :fromname: OTS Support          # 发件人姓名
  #  :host: 127.0.0.1                # Mailpit 主机
  #  :port: 1025                     # Mailpit 默认 SMTP 端口
  #  :user: ~                        # Mailpit 不需要身份验证
  #  :pass: ~                        # Mailpit 不需要身份验证
  #  :auth: false                    # 禁用 Mailpit 的 SMTP 身份验证
  #  :tls: false                     # 禁用本地测试的 TLS

  # 生产设置（供参考）
  # ----------------------------------
  :mode: <%= ENV['EMAILER_MODE'] || 'smtp' %>
  :from: <%= ENV['FROM_EMAIL'] || ENV['FROM'] || 'CHANGEME@example.com' %>
  :fromname: <%= ENV['FROMNAME'] || 'Support' %>
  :host: <%= ENV['SMTP_HOST'] || 'smtp.provider.com' %>
  :port: <%= ENV['SMTP_PORT'] || 587 %>
  :user: <%= ENV['SMTP_USERNAME'] %>
  :pass: <%= ENV['SMTP_PASSWORD'] %>
  :auth: <%= ENV['SMTP_AUTH'] || 'login' %>
  :tls: <%= ENV['SMTP_TLS'] %>

:mail:
  :truemail:
    # 可用的验证类型：:regex、:mx、:mx_blacklist、:smtp
    :default_validation_type: :regex
    # :smtp 验证所需
    :verifier_email: <%= ENV['VERIFIER_EMAIL'] || 'CHANGEME@example.com' %>
    #:verifier_domain: <%= ENV['VERIFIER_DOMAIN'] || 'example.com' %>
    #:connection_timeout: 2
    #:response_timeout: 2
    #:connection_attempts: 3
    #:validation_type_for:
    #  'example.com': :regex
    #
    # Truemail 将仅验证与
    # :allowed_domains 中列出的域匹配的电子邮件地址。如果域未
    # 列出，则电子邮件地址将始终被视为无效。
    :allowed_domains_only: false
    #
    # 此列表中的电子邮件地址将始终有效。
    #:allowed_emails: []
    #
    # 此列表中的电子邮件地址将始终无效。
    #:blocked_emails: []
    #
    # 具有这些域的地址将始终有效
    #:allowed_domains: []
    #
    # 具有这些域的地址将始终无效
    #:blocked_domains: []
    #
    # 从 MX 查找过程中排除这些 IP 地址。
    #:blocked_mx_ip_addresses: []
    #
    # 用于 MX 等记录查找的名称服务器。
    # 默认为 CloudFlare、Google、Oracle/OpenDNS 服务器。
    :dns:
      - 1.1.1.1
      - 8.8.4.4
      - 208.67.220.220
    #:smtp_port: 25
    #
    # 在第一次无效响应后结束 smtp 验证，而不是
    # 重试，然后尝试下一个服务器。可以减少
    # 验证电子邮件地址的时间，但可能无法捕获所有问题。
    :smtp_fail_fast: false
    #
    # 解析 SMTP 错误消息的内容以确定
    # 电子邮件地址是否有效。这对于某些不返回
    # 确切答案的 SMTP 服务器可能很有用。
    :smtp_safe_check: true
    #
    # 是否禁用 RFC MX 查找流程。当为 true 时，仅
    # 对 MX 和 Null MX 记录执行 DNS 验证。
    :not_rfc_mx_lookup_flow: false
    #
    # 覆盖电子邮件地址的默认正则表达式模式
    # 和/或 SMTP 错误消息中的内容。
    #:email_pattern: /regex_pattern/
    #:smtp_error_body_pattern: /regex_pattern/
    #
    # 记录到控制台、文件或两者。ruby 进程必须具有
    # 对日志文件的写访问权限。如果日志文件不存在，
    # 将创建该文件。应用程序不处理日志文件轮换。
    :logger:
      # 以下之一：:error（默认）、:unrecognized_error、:recognized_error、:all。
      :tracking_event: :error
      :stdout: true
      # log_absolute_path: '/home/app/log/truemail.log'

:internationalization:
  :enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>
  :default_locale: <%= ENV['I18N_DEFAULT_LOCALE'] || 'en' %>
  :fallback_locale:
    fr-CA: [fr_CA, fr_FR, en]
    fr: [fr_FR, fr_CA, en]
    de-AT: [de_AT, de, en]
    de: [de, de_AT, en]
    it: [it_IT, en]
    pt: [pt_BR, en]
    default: [en]
  # ISO 语言代码列表（例如，'en' 表示英语，'es'
  # 表示西班牙语等）。src/locales 中有一个相应的文件
  # 具有相同名称，其中包含翻译的文本。如果未
  # 自动选择，用户可以使用页脚中的切换或
  # 设置模态框（如果他们已登录）来选择其首选语言。
  :locales:
    - bg
    - da_DK
    - de
    - de_AT
    - el_GR
    - en
    - es
    - fr_CA
    - fr_FR
    - it_IT
    - ja
    - ko
    - mi_NZ
    - nl
    - tr
    - uk
    - pl
    - pt_BR
    - sv_SE

:experimental:
  # 安全功能：控制应用程序是否可以在没有
  # site.secret（在此文件中或通过 SECRET 环境变量）的情况下运行。
  #
  # 默认值：false（如果 site.secret 为 nil，应用程序将无法启动）
  #
  # 警告：设置为 true 会带来重大安全风险：
  # - 机密内容可能在没有适当加密的情况下存储
  # - 可能未经授权访问敏感数据
  # - 无法保证机密内容链接的完整性
  #
  # 有效用例（仅限临时）：
  # 1. 恢复：您意外使用 nil 密钥运行，需要恢复
  #    在该期间创建的现有机密内容。临时启用，直到
  #    所有受影响的机密内容过期（最大 TTL 期限）。
  # 2. 迁移：在加密方案之间进行受控迁移期间，
  #    并采取适当的安全措施。
  #
  # 当为 TRUE 时的行为：
  # - 应用程序启动而不会失败
  # - 启动时出现警告日志
  # - 解密时，使用真实密钥的 CipherErrors 将导致
  #   使用 nil 密钥自动重试
  #
  :allow_nil_global_secret: <%= ENV['ALLOW_NIL_GLOBAL_SECRET'] == 'true' || false %>
  # 安全功能：支持轮换全局密钥
  #
  # 格式：包含先前密钥值的字符串数组
  # ["old_secret_1", "old_secret_2", "oldest_secret"]
  #
  # 用法：轮换密钥时，在此处添加旧值，同时在 site.secret 或 SECRET 环境变量中
  # 设置新的主密钥。应用程序将：
  # 1. 对所有新加密使用当前主密钥
  # 2. 当主密钥失败时，尝试每个轮换的密钥（按顺序）进行解密
  #
  # 维护：在相关机密内容过期或已成功使用当前主密钥重新加密后，
  # 从此列表中删除密钥。一个简单的指导原则是 `ttl_options` 中的最大 TTL。
  :rotated_secrets: []
  # 当设置为 true 时，Rack::Builder#freeze_app 在初始化后冻结中间件堆栈
  # 以防止对应用程序中间件链进行任何运行时修改。这是一项安全措施，
  # 可防止恶意代码注入新中间件。
  #
  # 效果：
  # - 冻结中间件堆栈，防止在启动后添加/删除
  # - 冻结传递给 Rack::Builder 的应用程序对象
  # - 不影响请求/响应对象的可变性
  #
  # 注意：此设置可以通过防止在运行时操作中间件链来帮助使您的应用程序更安全。
  # 对于大多数应用程序，应在生产环境中启用此功能。
  :freeze_app: false
  # 中间件配置
  # 控制启用哪些安全和性能中间件组件
  :middleware:
    # 为前端 vue 应用程序提供静态文件
    :static_files: true
    # 清理请求参数以确保正确的 UTF-8 编码
    # 防止基于编码的攻击和格式错误的输入
    :utf8_sanitizer: true
    # 防止跨站点请求伪造（CSRF）攻击
    # 验证请求源自同一站点
    :http_origin: false
    # 转义请求参数中的 HTML 实体
    # 有助于防止通过请求参数进行的 XSS 攻击
    :escaped_params: false
    # 设置 X-XSS-Protection 标头以启用浏览器 XSS 过滤
    # 现代浏览器随着 CSP 成为标准而越来越少地依赖此功能
    :xss_header: false
    # 防止您的站点嵌入到框架中（点击劫持保护）
    # 将 X-Frame-Options 标头设置为 SAMEORIGIN 或 DENY
    :frame_options: false
    # 使用路径中的"../"阻止目录遍历攻击
    # 对于防止未经授权的文件访问至关重要
    :path_traversal: false
    # 防止 cookie 投掷攻击
    # 通过操纵的 cookie 防止会话固定
    :cookie_tossing: false
    # 通过验证 IP 地址来防止 IP 欺骗攻击
    # 在实施基于 IP 的访问控制时很有用
    :ip_spoofing: false
    # 通过 HSTS 标头强制所有连接使用 HTTPS
    # 仅在开发或位于安全代理后时禁用
    :strict_transport: false
  # 启用时，将 Content-Security-Policy 标头添加到响应中。当
  # `development.enabled=true` 时，标头将不那么严格，但仍会
  # 防止从其他来源加载任何内容。在常规生产模式下，
  # 安全随机数将包含在标头中，并且完全阻止 unsafe-inline 内容。
  # 可以通过 rack 请求对象 `req.env['ots.nonce']` 访问随机数。
  # 后端视图从那里抓取它，以自动将其添加到所有前端脚本和样式资源中。
  # 只有在添加新脚本或样式依赖项时，才需要使用随机数。
  # 禁用时，在任何环境中都不包含 csp 标头。
  :csp:
    :enabled: <%= ENV['CSP_ENABLED'] == 'true' || false %>
```
