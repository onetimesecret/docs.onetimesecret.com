#!/usr/bin/env bash
#
# Pre-commit Hook Example for Link Checking
#
# To install:
#   cp docs/pre-commit-hook-example.sh .git/hooks/pre-commit
#   chmod +x .git/hooks/pre-commit
#
# To bypass when needed:
#   git commit --no-verify
#

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're actually in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    exit 0
fi

# Check if check-links.sh exists
if [ ! -f "./bin/check-links.sh" ]; then
    echo -e "${YELLOW}⚠ Link checker not found, skipping check${NC}"
    exit 0
fi

# Only check links in markdown files that are being committed
MARKDOWN_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(md|mdoc)$' || true)

if [ -z "$MARKDOWN_FILES" ]; then
    # No markdown files in this commit
    exit 0
fi

echo -e "${GREEN}🔍 Checking links in staged markdown files...${NC}"

# Run the link checker (internal links only for speed)
if ./bin/check-links.sh; then
    echo -e "${GREEN}✓ Link check passed${NC}"
    exit 0
else
    echo -e "${RED}✗ Link check failed${NC}"
    echo ""
    echo -e "${YELLOW}You can:${NC}"
    echo "  1. Fix the broken links and try again"
    echo "  2. Run './bin/fix-links.sh --apply' to auto-fix common issues"
    echo "  3. Use 'git commit --no-verify' to skip this check (not recommended)"
    echo ""
    exit 1
fi
