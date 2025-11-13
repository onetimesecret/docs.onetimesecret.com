# Link Checking Documentation

This document describes the automated link checking system for the Onetime Secret documentation.

## Overview

The link checking system consists of:

1. **GitHub Actions** - Automated CI/CD link checking
2. **Local Scripts** - Development tools for checking and fixing links
3. **Configuration Files** - Customizable link checking behavior

## Quick Start

### Local Development

```bash
# Check internal links only (fast)
pnpm run check:links

# Check all links including external (slower)
pnpm run check:links:external

# Get detailed output
pnpm run check:links:verbose
```

### Fix Common Issues

```bash
# Preview what would be fixed (dry run)
./bin/fix-links.sh

# Apply automatic fixes
./bin/fix-links.sh --apply

# Fix specific pattern
./bin/fix-links.sh --pattern '/docs/' '/en/' --apply
```

## System Components

### 1. GitHub Actions Workflow

**File:** `.github/workflows/check-links.yml`

**What it does:**
- Runs on all pull requests to catch broken links before merge
- Runs on push to main branch
- Runs weekly (Sundays) to catch external link rot
- Can be manually triggered

**Two separate jobs:**

#### Internal Link Check
- Fast and reliable
- Checks links within the documentation
- **Always runs** on PRs and pushes
- **Fails the build** if broken links are found

#### External Link Check
- Slower and can be flaky
- Checks external URLs
- **Only runs** on schedule or manual trigger
- **Does not fail the build** (reports only)

**Why separate?** External links can be temporarily unavailable due to:
- Rate limiting
- Temporary outages
- Network issues
- Bot blocking

### 2. Local Scripts

#### check-links.sh

**Location:** `bin/check-links.sh`

**Purpose:** Check links during development

**Usage:**
```bash
# Check internal links only
./bin/check-links.sh

# Check all links
./bin/check-links.sh --external

# Verbose output
./bin/check-links.sh --verbose
```

**Requirements:**
- Requires [lychee](https://github.com/lycheeverse/lychee) to be installed
- Installation:
  ```bash
  # macOS
  brew install lychee

  # Linux/WSL
  cargo install lychee

  # Or download from releases:
  # https://github.com/lycheeverse/lychee/releases
  ```

#### fix-links.sh

**Location:** `bin/fix-links.sh`

**Purpose:** Automatically fix common broken link patterns

**Usage:**
```bash
# Dry run (preview changes)
./bin/fix-links.sh

# Apply fixes
./bin/fix-links.sh --apply

# Fix custom pattern
./bin/fix-links.sh --pattern 'old-url' 'new-url' --apply
```

**What it fixes:**
- `/docs/` → `/en/` pattern (common after restructuring)
- Double `##` in anchor links
- `.html` extensions (usually not needed in Astro)
- Custom patterns you specify

### 3. Configuration Files

#### lychee.toml

**Location:** `lychee.toml`

**Purpose:** Main configuration for the lychee link checker

**Key settings:**
- `max_concurrency = 8` - Parallel request limit
- `timeout = 20` - Request timeout in seconds
- `max_retries = 3` - Retry failed requests
- `cache = true` - Cache responses for speed

**Customization:**
Edit this file to:
- Adjust timeout for slow networks
- Change retry behavior
- Modify accepted HTTP status codes
- Add URL remapping for local development

#### .lycheeignore

**Location:** `.lycheeignore`

**Purpose:** Patterns to ignore during link checking

**Common exclusions:**
- Local URLs (localhost, 127.0.0.1)
- Authentication-required URLs
- Rate-limiting-prone sites (LinkedIn, Twitter)
- Placeholder URLs in examples

**How to add exclusions:**
```
# Single URL
https://example.com/specific-page

# Wildcard pattern
https://rate-limited-site.com/*

# Domain
*.example.com
```

## Common Scenarios

### Scenario 1: PR Check Failed

**Problem:** Your PR failed because of broken internal links.

**Solution:**
```bash
# 1. Check links locally
pnpm run check:links:verbose

# 2. Fix the broken links in your editor
# OR use the auto-fixer for common patterns
./bin/fix-links.sh --apply

# 3. Verify fix
pnpm run check:links

# 4. Commit and push
git add .
git commit -m "Fix broken internal links"
git push
```

### Scenario 2: Weekly Report Shows Broken External Links

**Problem:** You received a GitHub issue about broken external links.

**Solution:**
```bash
# 1. Check which external links are broken
./bin/check-links.sh --external --verbose

# 2. Investigate each broken link:
#    - Is the site temporarily down? → Ignore
#    - Is the page moved? → Update the link
#    - Is the page deleted? → Find alternative or remove

# 3. Update documentation
# 4. Verify
pnpm run check:links:external

# 5. Commit changes
git add .
git commit -m "Update broken external links"
git push
```

### Scenario 3: After Major Documentation Restructure

**Problem:** You've restructured docs and many internal links are broken.

**Solution:**
```bash
# 1. Preview what the auto-fixer would change
./bin/fix-links.sh

# 2. If it looks good, apply
./bin/fix-links.sh --apply

# 3. For custom patterns not covered by auto-fixer:
./bin/fix-links.sh --pattern '/old-path/' '/new-path/' --apply

# 4. Verify all links
pnpm run check:links

# 5. Check for any remaining issues
pnpm run check:links:verbose
```

### Scenario 4: Manual Trigger for External Links

**Problem:** You want to check external links without waiting for Sunday.

**Solution:**
1. Go to GitHub Actions
2. Select "Check Links" workflow
3. Click "Run workflow"
4. Set "Check external links" to `true`
5. Click "Run workflow"

## Best Practices

### During Development

1. **Check links before committing:**
   ```bash
   pnpm run check:links
   ```

2. **Use relative paths for internal links:**
   ```markdown
   ✅ Good: [Setup Guide](/en/custom-domains/setup-guide)
   ❌ Bad:  [Setup Guide](https://docs.onetimesecret.com/en/custom-domains/setup-guide)
   ```

3. **Include language prefix:**
   ```markdown
   ✅ Good: /en/custom-domains/brand-guide
   ❌ Bad:  /docs/custom-domains/brand-guide
   ```

### When Adding External Links

1. **Verify the link works** before committing
2. **Use permanent URLs** when available (e.g., GitHub permalinks)
3. **Avoid linking to rate-limited sites** (LinkedIn, Twitter) when possible
4. **Add to `.lycheeignore`** if the link is known to be flaky

### Maintaining the System

1. **Review weekly reports** - Don't ignore them
2. **Update .lycheeignore** - Add problematic sites as you discover them
3. **Keep lychee updated** - New versions often have better detection
4. **Adjust timeouts** - If you have a slow network, increase timeout in `lychee.toml`

## Troubleshooting

### "lychee: command not found"

**Problem:** Lychee is not installed.

**Solution:**
```bash
# macOS
brew install lychee

# Linux/WSL
cargo install lychee
```

### False Positives on External Links

**Problem:** External link checker reports valid links as broken.

**Possible causes:**
- Temporary network issues
- Rate limiting
- Bot blocking
- Geo-restrictions

**Solution:**
1. Manually verify the link in a browser
2. If valid, add to `.lycheeignore`
3. If invalid, update the link

### CI Check Taking Too Long

**Problem:** GitHub Action is timing out or taking too long.

**Solutions:**
- Reduce `max_concurrency` in `lychee.toml`
- Increase timeout
- Split checks into smaller batches
- Add more exclusions to `.lycheeignore`

## Advanced Usage

### Custom Link Patterns

Create a custom script for project-specific link patterns:

```bash
#!/usr/bin/env bash
# bin/check-custom-links.sh

# Check for language-specific patterns
grep -r "](/docs/" src/content/docs/en/ && echo "Found /docs/ links in English docs"
grep -r "](/en/" src/content/docs/es/ && echo "Found /en/ links in Spanish docs"
```

### Integration with Pre-commit Hooks

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh
echo "Checking internal links..."
./bin/check-links.sh || {
    echo "Link check failed. Use 'git commit --no-verify' to skip."
    exit 1
}
```

### Continuous Monitoring

For production deployments, consider:
- Using an external monitoring service
- Setting up alerts for broken links
- Regular audits of external link validity

## Resources

- [Lychee Documentation](https://github.com/lycheeverse/lychee)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Markdown Link Best Practices](https://www.markdownguide.org/basic-syntax/#links)

## Support

If you encounter issues with the link checking system:

1. Check this documentation first
2. Review the [lychee troubleshooting guide](https://github.com/lycheeverse/lychee#troubleshooting)
3. Open an issue with:
   - What you were trying to do
   - What happened
   - Output from `--verbose` mode
   - Your environment (OS, lychee version)
