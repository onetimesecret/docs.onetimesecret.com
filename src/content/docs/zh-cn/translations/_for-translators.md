---
title: 简体中文翻译指南
description: Onetime Secret 简体中文翻译综合指南，结合术语表和语言注释
---

# Translation Guidance for Chinese (Simplified)

This document provides comprehensive guidance for translating Onetime Secret content. It combines universal translation resources with locale-specific terminology and rules.

## Universal Translation Resources

Before translating, review these cross-language guidelines that apply to all locales:

- **[Translating "Secret"](/en/translations/universal/secret-concept)** - How to handle the word "secret" across different language contexts
- **[Password vs. Passphrase](/en/translations/universal/password-passphrase)** - Maintaining the critical distinction between account passwords and secret passphrases
- **[Voice and Tone](/en/translations/universal/voice-and-tone)** - Patterns for active vs. passive voice, formality levels, and cultural adaptations
- **[Brand Terms](/en/translations/universal/brand-terms)** - Terms that should not be translated (product names, tier names)
- **[Quality Checklist](/en/translations/universal/quality-checklist)** - Comprehensive checklist for pre-submission review

---

## 词汇表

# Onetime Secret 翻译词汇表

本词汇表为关键术语提供标准化的中文翻译，以确保 Onetime Secret 应用程序的一致性。

**重要提示：** 本词汇表遵循[语言注释](/zh-cn/translations/language-notes)中记录的中文特定翻译原则。关键原则是避免使用"秘密"一词的强烈情感内涵，转而根据语境使用分层术语。

## "Secret"术语分层体系

"Secret"一词在不同语境中应使用不同的中文翻译。我们采用三层术语体系：

| 层级 | 中文术语 | 适用语境 | 示例 |
|------|----------|----------|------|
| 1. UI/功能性 | **内容** | 按钮、操作、API 操作、导航 | 创建内容、获取内容、销毁内容 |
| 2. 描述性/文档 | **机密内容** | 说明性文字、功能描述、技术文档 | 您的机密内容将被加密存储 |
| 3. 营销/说服性 | **机密信息** | 定价页面、落地页、推广文案 | 自信地共享机密信息 |

**选择指南：**
- **内容**：用户直接交互的界面元素（按钮标签、表单字段、API 端点描述、状态消息）
- **机密内容**：解释产品功能和安全机制的文档正文
- **机密信息**：面向用户的营销和定价内容，强调保密价值

**绝不使用"秘密"**，除非在翻译指南文件中说明为何避免使用该词。

## 核心术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| secret (noun) | 内容 / 机密内容 / 机密信息 | 应用程序的核心概念 | 按上方分层体系选择：UI 用"内容"，文档用"机密内容"，营销用"机密信息" |
| secret (adj) | 加密的 / 安全的 | 描述性形容词 | 根据上下文使用 |
| secret link | 一次性链接 | 产品的核心功能 | **不要**翻译为"秘密链接"；强调一次性使用特性 |
| passphrase | 口令 | 用于保护内容的身份验证方法 | 与"密码"（账户认证）区分 |
| password | 密码 | 账户访问的身份验证 | 用于账户登录 |
| burn | 销毁 | 在查看前删除内容的操作 | 强调永久性 |
| view/reveal | 查看 / 显示 | 访问内容的操作 | |
| link | 链接 | 提供内容访问的 URL | |
| encrypt/encrypted | 加密 / 已加密 | 安全方法 | |
| secure | 安全的 | 保护状态 | |

## 用户界面元素

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| Share a secret | 分享内容 | 主要操作 | 使用"内容"而非"秘密" |
| Secret Links | 一次性链接 | 导航/功能名称 | 强调一次性使用特性 |
| Create Account | 创建账户 | 注册 | |
| Sign In | 登录 | 身份验证 | |
| Dashboard | 仪表板 / 控制台 | 用户主页面 | |
| Settings | 设置 | 配置页面 | |
| Privacy Options | 隐私选项 | 内容设置 | |
| Feedback | 反馈 | 用户评论 | |
| Getting Started | 开始使用 | 介绍性内容 | 行动导向；**不是**"入门" |
| Edit page | 编辑 | 按钮文本 | 简洁；**不是**"编辑页面" |

## 状态术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| received | 已接收 | 内容已被查看 | |
| burned | 已销毁 | 内容在查看前被删除 | |
| expired | 已过期 | 内容因时间原因不再可用 | |
| created | 已创建 | 内容已生成 | |
| active | 活跃的 | 内容可用 | |
| inactive | 未激活 | 内容不可用 | |

## 时间相关术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| expires in | 将在...后过期 | 内容不再可用前的时间 | |
| day/days | 天 | 时间单位 | |
| hour/hours | 小时 | 时间单位 | |
| minute/minutes | 分钟 | 时间单位 | |
| second/seconds | 秒 | 时间单位 | |

## 安全功能

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| one-time access | 一次性访问 | 核心安全功能 | |
| passphrase protection | 口令保护 | 附加安全性 | 与账户"密码"区分 |
| encrypted in transit | 传输中加密 | 数据保护方法 | |
| encrypted at rest | 静态加密 | 存储保护 | |

## 账户相关术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| email | 邮箱 / 电子邮件 | 用户标识符 | |
| password | 密码 | 身份验证 | 用于账户访问 |
| account | 账户 | 用户配置文件 | |
| subscription | 订阅 | 付费服务 | |
| customer | 客户 | 付费用户 | |

## 域名相关术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| custom domain | 自定义域名 | 高级功能 | |
| domain verification | 域名验证 | 设置过程 | |
| DNS record | DNS 记录 | 配置 | |
| CNAME record | CNAME 记录 | DNS 设置 | |

## 错误消息

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| error | 错误 | 问题通知 | |
| warning | 警告 | 注意通知 | |
| oops | 哎呀 | 友好的错误介绍 | |

## 按钮和操作

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| submit | 提交 | 表单操作 | |
| cancel | 取消 | 否定操作 | |
| confirm | 确认 | 肯定操作 | |
| copy to clipboard | 复制 | 实用操作 | 简洁；**不是**"复制到剪贴板" |
| continue | 继续 | 导航 | |
| back | 返回 | 导航 | |
| Copied! | 已复制 | 状态消息 | 无感叹号 |

## 营销术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| secret (in marketing) | 机密信息 | 营销/定价页面 | 使用"机密信息"而非"内容"或"秘密" |
| share secrets | 共享机密信息 | 营销文案 | 强调信息的保密价值 |
| secure links | 安全链接 | 产品功能 | |
| privacy-first design | 隐私优先设计 | 设计理念 | |
| custom branding | 自定义品牌 | 高级功能 | |

## API 相关术语

| 英文 | 中文（简体）| 语境 | 注释 |
|---------|-------------|-------|------|
| create secrets | 创建内容 | API 操作 | 使用"内容"而非"秘密" |
| retrieve secrets | 获取内容 | API 操作 | 使用"内容"而非"秘密" |
| client libraries | 客户端库 | 开发工具 | |
| REST API | REST API | 技术术语 | 保持英文 |

## 翻译指南

1. **一致性**：在整个应用程序中对同一术语使用相同的翻译
2. **语境**：考虑术语在应用程序中的使用方式
3. **文化适应**：必要时根据当地习惯调整术语
4. **技术准确性**：确保安全术语翻译准确
5. **语气**：保持专业但简洁的语气

## 特殊注意事项

### 关于"秘密"（Secret）一词的翻译

根据我们的[语言注释](/zh-cn/translations/language-notes)，中文翻译有意避免使用"秘密"一词，原因如下：

- "秘密"在中文中带有强烈的个人、隐藏或情感色彩的含义
- 它暗示刻意隐瞒，而不是功能性安全特性
- 我们采用三层替代术语体系（详见上方"Secret"术语分层体系）：
  - **UI/功能性上下文**：使用"内容"（创建内容、获取内容、销毁内容）
  - **描述性/文档上下文**：使用"机密内容"（您的机密内容将被加密存储）
  - **营销/说服性上下文**：使用"机密信息"（自信地共享机密信息）
  - **产品功能**：使用"一次性链接"（强调核心的一次性使用特性）

### 密码 vs 口令

**必须**区分这两个概念：
- **密码**（password）：用于账户登录
- **口令**（passphrase）：用于保护特定内容

### 品牌术语（请勿翻译）

- **Onetime Secret** - 保持英文
- **OTS** - 保持英文（当用作产品缩写时）
- **Identity Plus** - 保持英文（产品名称）
- **Global Elite** - 保持英文（产品名称）
- **Custom Install** - 保持英文（产品名称）
- **Starlight** - 保持英文（文档框架）

### 技术术语

以下技术术语保持英文：
- API
- REST
- v1, v2（版本号）
- DNS, CNAME
- SSL/TLS

### 语音和语气

- **操作性文本**（按钮、菜单）：使用主动、命令式语气
  - 示例："保存更改"、"删除文件"、"发送消息"
- **状态消息**：使用被动或陈述式语气
  - 示例："已保存更改"、"文件已删除"、"下载完成"

### 标点符号

- 遵循样式指南：使用句号、逗号和问号
- **避免使用感叹号**（除非在引用的源材料中）
- 不使用分号或缩写

## 参考资料

有关中文翻译的详细指导和理由，请参阅：
- [中文语言注释](/zh-cn/translations/language-notes) - 翻译决策和原则的详细说明
- [翻译样式指南](/zh-cn/translations/guide) - 一般样式和语气指南

---

**最后更新：** 2026-03-15

---

## Chinese (Simplified) Translation Notes

# Chinese (Simplified, zh-CN) Translation Notes

## Thinking Behind Translation Adjustments

### 1. Terminology Shift: Moving Away from "秘密" (Secret)

**Reasoning:** Following the style guide's Danish example, "秘密" (secret) in Chinese carries strong connotations of personal, hidden, or confidential information with emotional weight - similar to the Italian "segreto." It suggests something deliberately concealed rather than a functional security feature.

**Three-tier replacement system:**

| Tier | Term | Context | Example |
|------|------|---------|---------|
| UI/functional | 内容 (content) | Buttons, actions, API operations | 创建内容, 获取内容, 销毁内容 |
| Descriptive/docs | 机密内容 (confidential content) | Prose, feature descriptions | 您的机密内容将被加密存储 |
| Marketing/persuasive | 机密信息 (confidential information) | Pricing, landing pages | 自信地共享机密信息 |

**Key Examples:**
- `"secretLinks": "Secret Links"` → `"一次性链接"` (one-time links)
- `"createSecrets": "Create Secrets"` → `"创建内容"` (create content)
- `"retrieveSecrets": "Retrieve Secrets"` → `"获取内容"` (retrieve content)
- `"whyUseSecretLinks": "Why Use Secret Links"` → `"为什么使用一次性链接"` (why use one-time links)
- Documentation prose about secrets → use "机密内容" (confidential content)
- Pricing/marketing copy about secrets → use "机密信息" (confidential information)

**Alternative considered:** "临时信息" (temporary information) or "加密消息" (encrypted messages), but the tiered approach better serves the varying needs of UI brevity, documentation clarity, and marketing persuasion.

### 2. UI Text Optimization for Chinese Language Patterns

**Reasoning:** Chinese language structure allows for more concise expressions. The style guide emphasizes efficiency and respect for users' time.

**Key Examples:**
- `"gettingStarted": "Getting Started"` → `"开始使用"` (start using - more direct action)
- `"page.editLink": "Edit page"` → `"编辑"` (edit - concise button text)
- `"expressiveCode.copyButtonCopied": "Copied!"` → `"已复制"` (copied - removed exclamation)
- `"pagefind.load_more": "Load more results"` → `"加载更多"` (load more - simplified)

#### Ellipsis Usage in UI Text

**Formal Standard:** In Chinese punctuation, the ellipsis (省略号) consists of six dots (……) occupying the space of two full-width characters【0】. This is the typographically correct form for printed materials.

**UI Implementation:** For digital interfaces, practical constraints often lead to using three dots instead. When implementing ellipses in UI text:

- **Preferred:** Use the Unicode horizontal ellipsis character (U+2026) "…" for three-dot ellipses
- **Alternative:** For the formal six-dot standard, use two U+2026 characters "……"
- **Avoid:** Three separate period characters "..." which may render inconsistently

**Examples:**
- `"Loading..."` → `"加载中…"` (using U+2026)
- For formal contexts: `"加载中……"` (using double U+2026)

**Typing:** In Chinese IMEs, the 6-dot ellipsis is typed using Shift+6 (in Pinyin mode); or 3-dot on macos using option+;

### 3. Cultural and Linguistic Adaptations

**Reasoning:** Natural Chinese phrasing while maintaining professional tone for both technical and general users.

**Key Examples:**
- `"404.text"`: Made more direct and natural in Chinese sentence structure
- `"search.devWarning"`: Simplified technical explanation to flow better in Chinese
- `"sidebarNav.accessibleLabel": "Main"` → `"主导航"` (main navigation - more descriptive for screen readers)
- `"i18n.untranslatedContent"` → `"此内容暂无中文版本"` (more natural Chinese phrasing)

### 4. Voice Consistency Based on Chinese Usage Patterns

**Reasoning:** Chinese interface conventions often use different patterns for actions vs. status messages.

**Key Examples:**
- **Actions:** `"开始使用"` (start using), `"编辑"` (edit), `"复制"` (copy)
- **Status:** `"已复制"` (copied), `"最后更新"` (last updated)
- **Navigation:** `"概览"` (overview), `"主导航"` (main navigation)

### 5. Technical Term Standardization

**Reasoning:** Maintained consistency with established Chinese technical terminology while keeping international terms where appropriate.

**Key Examples:**
- **Kept:** API, REST, v1, v2, Starlight (international technical terms)
- **Translated:** `"clientLibraries"` → `"客户端库"` (standard Chinese tech term)
- **Translated:** `"securityBestPractices"` → `"安全最佳实践"` (established Chinese phrase)

## Summary of Changes to the Chinese (Simplified) Translation

### Core Terminology Evolution
- **"秘密" → Three-tier alternatives**: Replaced "secret" with "内容" (content) for UI/actions, "机密内容" (confidential content) for documentation, and "机密信息" (confidential information) for marketing. "一次性链接" (one-time links) for the Secret Links feature
- **Maintained technical precision**: API, REST, version numbers preserved
- **Brand names untranslated**: Starlight, Onetime Secret kept in original form

### UI/UX Text Refinements
- **Removed exclamation marks**: Following style guide punctuation principles
- **Shortened action text**: `"编辑页面"` → `"编辑"` for button efficiency
- **Simplified tooltips**: `"复制到剪贴板"` → `"复制"` for clarity
- **Natural Chinese flow**: Restructured phrases to follow Chinese language patterns
- **Ellipsis handling**: Use U+2026 for three-dot ellipses in UI contexts

### Voice and Tone Consistency
- **Action-oriented for user tasks**: `"开始使用"` instead of `"开始入门"`
- **Declarative for status**: `"已复制"` (completed state) vs `"复制"` (action)
- **Professional yet accessible**: Maintained warmth while being concise

### Chinese-Specific Improvements
- **Better accessibility labels**: `"主导航"` (main navigation) more descriptive than direct translation
- **Natural sentence structure**: Adapted error messages and descriptions to Chinese writing patterns
- **Appropriate formality level**: Professional tone suitable for both technical and general Chinese users
- **Punctuation standards**: Followed Chinese ellipsis conventions while adapting for UI constraints

### Configuration Integration
- **Added zh-cn support**: Updated sidebar configuration to load and integrate Chinese translations
- **Fixed locale configuration**: Corrected BCP 47 language tag from `zh_cn` to `zh-CN`
- **Resolved build issues**: Fixed malformed frontmatter across multiple markdown files

These changes align the Chinese translation with the style guide's core principles: authenticity, efficiency, and clear communication that serves both technical professionals and general users, while respecting Chinese language conventions and cultural expectations.

---

## Document Information

This guide was generated from the following source files:

- Universal resources: `/en/translations/universal/`
- Glossary: `/zh-cn/translations/glossary.md`
- Language notes: `/zh-cn/translations/language-notes.md`

Generated: 2026-03-15
