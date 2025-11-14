# Chinese (Simplified, zh-CN) Translation Notes

## Thinking Behind Translation Adjustments

### 1. Terminology Shift: Moving Away from "秘密" (Secret)

**Reasoning:** Following the style guide's Danish example, "秘密" (secret) in Chinese carries strong connotations of personal, hidden, or confidential information with emotional weight - similar to the Italian "segreto." It suggests something deliberately concealed rather than a functional security feature.

**Key Examples:**
- `"secretLinks": "Secret Links"` → `"一次性链接"` (one-time links)
- `"createSecrets": "Create Secrets"` → `"创建内容"` (create content)
- `"retrieveSecrets": "Retrieve Secrets"` → `"获取内容"` (retrieve content)
- `"whyUseSecretLinks": "Why Use Secret Links"` → `"为什么使用一次性链接"` (why use one-time links)

**Alternative considered:** "临时信息" (temporary information) or "加密消息" (encrypted messages), but "一次性" (one-time) better emphasizes the core product feature of single-use access.

### 2. UI Text Optimization for Chinese Language Patterns

**Reasoning:** Chinese language structure allows for more concise expressions. The style guide emphasizes efficiency and respect for users' time.

**Key Examples:**
- `"gettingStarted": "Getting Started"` → `"开始使用"` (start using - more direct action)
- `"page.editLink": "Edit page"` → `"编辑"` (edit - concise button text)
- `"expressiveCode.copyButtonCopied": "Copied!"` → `"已复制"` (copied - removed exclamation)
- `"pagefind.load_more": "Load more results"` → `"加载更多"` (load more - simplified)

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
- **"秘密" → Functional alternatives**: Replaced "secret" with "内容" (content) for create/retrieve actions and "一次性链接" (one-time links) for the core feature
- **Maintained technical precision**: API, REST, version numbers preserved
- **Brand names untranslated**: Starlight, Onetime Secret kept in original form

### UI/UX Text Refinements
- **Removed exclamation marks**: Following style guide punctuation principles
- **Shortened action text**: `"编辑页面"` → `"编辑"` for button efficiency
- **Simplified tooltips**: `"复制到剪贴板"` → `"复制"` for clarity
- **Natural Chinese flow**: Restructured phrases to follow Chinese language patterns

### Voice and Tone Consistency
- **Action-oriented for user tasks**: `"开始使用"` instead of `"开始入门"`
- **Declarative for status**: `"已复制"` (completed state) vs `"复制"` (action)
- **Professional yet accessible**: Maintained warmth while being concise

### Chinese-Specific Improvements
- **Better accessibility labels**: `"主导航"` (main navigation) more descriptive than direct translation
- **Natural sentence structure**: Adapted error messages and descriptions to Chinese writing patterns
- **Appropriate formality level**: Professional tone suitable for both technical and general Chinese users

### Configuration Integration
- **Added zh-cn support**: Updated sidebar configuration to load and integrate Chinese translations
- **Fixed locale configuration**: Corrected BCP 47 language tag from `zh_cn` to `zh-CN`
- **Resolved build issues**: Fixed malformed frontmatter across multiple markdown files

These changes align the Chinese translation with the style guide's core principles: authenticity, efficiency, and clear communication that serves both technical professionals and general users, while respecting Chinese language conventions and cultural expectations.
