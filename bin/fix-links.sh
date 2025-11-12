#!/usr/bin/env bash
#
# Link Fixer Script
# Automatically fixes common broken internal link patterns
#
# Usage:
#   ./bin/fix-links.sh                   # Dry run (show what would be changed)
#   ./bin/fix-links.sh --apply           # Apply changes
#   ./bin/fix-links.sh --pattern OLD NEW # Fix specific pattern
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DRY_RUN=true
CUSTOM_PATTERN=false
OLD_PATTERN=""
NEW_PATTERN=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --apply|-a)
      DRY_RUN=false
      shift
      ;;
    --pattern|-p)
      CUSTOM_PATTERN=true
      OLD_PATTERN="$2"
      NEW_PATTERN="$3"
      shift 3
      ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --apply, -a           Apply changes (default is dry run)"
      echo "  --pattern OLD NEW     Fix specific pattern"
      echo "  --help, -h            Show this help message"
      echo ""
      echo "Examples:"
      echo "  # Preview changes"
      echo "  ./bin/fix-links.sh"
      echo ""
      echo "  # Apply automatic fixes"
      echo "  ./bin/fix-links.sh --apply"
      echo ""
      echo "  # Fix custom pattern"
      echo "  ./bin/fix-links.sh --pattern '/docs/' '/en/' --apply"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}🔍 DRY RUN MODE - No changes will be made${NC}"
    echo -e "${YELLOW}Use --apply to actually fix the links${NC}"
    echo ""
fi

# Function to fix links in a pattern
fix_pattern() {
    local old_pattern="$1"
    local new_pattern="$2"
    local description="$3"

    echo -e "${BLUE}Checking for: $description${NC}"

    # Find files with the pattern
    if grep -r -l "$old_pattern" src/content/docs/ 2>/dev/null; then
        echo -e "${GREEN}Found files with pattern${NC}"

        if [ "$DRY_RUN" = false ]; then
            # Apply fix on macOS (BSD) or Linux (GNU)
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                find src/content/docs/ -type f \( -name "*.md" -o -name "*.mdoc" \) -exec sed -i '' "s|$old_pattern|$new_pattern|g" {} +
            else
                # Linux
                find src/content/docs/ -type f \( -name "*.md" -o -name "*.mdoc" \) -exec sed -i "s|$old_pattern|$new_pattern|g" {} +
            fi
            echo -e "${GREEN}✓ Fixed${NC}"
        else
            echo -e "${YELLOW}Would fix:${NC}"
            grep -r -n "$old_pattern" src/content/docs/ | head -5
            echo ""
        fi
    else
        echo -e "${GREEN}✓ No issues found${NC}"
    fi
    echo ""
}

if [ "$CUSTOM_PATTERN" = true ]; then
    # Fix custom pattern
    fix_pattern "$OLD_PATTERN" "$NEW_PATTERN" "Custom pattern: $OLD_PATTERN → $NEW_PATTERN"
else
    # Common patterns to fix (based on the issue we just fixed)
    echo -e "${GREEN}🔧 Checking for common broken link patterns...${NC}"
    echo ""

    # Fix /docs/ links that should be /en/
    fix_pattern "](/docs/custom-domains/" "](/en/custom-domains/" "Custom domains /docs/ links"
    fix_pattern "](/docs/regions)" "](/en/regions/)" "Regions /docs/ links"
    fix_pattern "](/docs/security-best-practices)" "](/en/security-best-practices)" "Security best practices /docs/ links"
    fix_pattern "](/docs/rest-api/" "](/en/rest-api/" "REST API /docs/ links"
    fix_pattern "](/docs/translations/" "](/en/translations/" "Translations /docs/ links"

    # Check for other common issues
    echo -e "${BLUE}Checking for other potential issues...${NC}"

    # Find broken anchor links (##)
    if grep -r "](##" src/content/docs/ 2>/dev/null; then
        echo -e "${YELLOW}⚠ Found links with double ##${NC}"
        grep -r -n "](##" src/content/docs/ | head -5
    fi

    # Find links with .html extension (usually not needed in Astro)
    if grep -r "](.*.html)" src/content/docs/ 2>/dev/null; then
        echo -e "${YELLOW}⚠ Found links with .html extension${NC}"
        grep -r -n "](.*.html)" src/content/docs/ | head -5
    fi
fi

if [ "$DRY_RUN" = true ]; then
    echo ""
    echo -e "${YELLOW}To apply these fixes, run:${NC}"
    echo -e "${YELLOW}  ./bin/fix-links.sh --apply${NC}"
else
    echo ""
    echo -e "${GREEN}✓ All fixes applied!${NC}"
    echo ""
    echo "Run link checker to verify:"
    echo "  pnpm run check:links"
fi
