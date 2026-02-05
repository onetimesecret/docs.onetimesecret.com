#!/usr/bin/env bash
#
# Link Checker Script
# Checks for broken links in documentation using lychee
#
# Usage:
#   ./bin/check-links.sh                 # Check internal links only (requires build)
#   ./bin/check-links.sh --external      # Check all links (including external)
#   ./bin/check-links.sh --verbose       # Show detailed output
#   ./bin/check-links.sh --skip-build    # Skip build step (use existing dist/)
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default options
CHECK_EXTERNAL=false
VERBOSE=""
SKIP_BUILD=false
LYCHEE_ARGS=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --external|-e)
      CHECK_EXTERNAL=true
      shift
      ;;
    --verbose|-v)
      VERBOSE="--verbose"
      shift
      ;;
    --skip-build|-s)
      SKIP_BUILD=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --external, -e    Check external links (slower)"
      echo "  --verbose, -v     Show detailed output"
      echo "  --skip-build, -s  Skip build step (use existing dist/)"
      echo "  --help, -h        Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Check if lychee is installed
if ! command -v lychee &> /dev/null; then
    echo -e "${YELLOW}Lychee is not installed.${NC}"
    echo ""
    echo "Install it with one of the following methods:"
    echo ""
    echo "  # macOS (via Homebrew)"
    echo "  brew install lychee"
    echo ""
    echo "  # Linux (via cargo)"
    echo "  cargo install lychee"
    echo ""
    echo "  # Or download from: https://github.com/lycheeverse/lychee/releases"
    echo ""
    exit 1
fi

echo -e "${GREEN}🔍 Checking links in documentation...${NC}"
echo ""

# Build the site first to check internal links properly
if [ "$SKIP_BUILD" = false ]; then
    echo -e "${YELLOW}Building site to check internal links...${NC}"
    pnpm run build > /dev/null 2>&1
    echo -e "${GREEN}Build complete.${NC}"
    echo ""
fi

# Verify dist directory exists
if [ ! -d "dist" ]; then
    echo -e "${RED}Error: dist/ directory not found. Run 'pnpm run build' first or remove --skip-build flag.${NC}"
    exit 1
fi

# Build base arguments - check built HTML files in dist/
# --root-dir resolves root-relative links (like /en/intro) against the dist folder
DIST_DIR="$(pwd)/dist"
LYCHEE_ARGS="--config lychee.toml --no-progress --root-dir \"$DIST_DIR\" $VERBOSE"

# Add offline mode for internal-only checks
if [ "$CHECK_EXTERNAL" = false ]; then
    echo -e "${YELLOW}Checking internal links only (use --external to check all links)${NC}"
    LYCHEE_ARGS="$LYCHEE_ARGS --offline"
else
    echo -e "${YELLOW}Checking all links (internal and external)${NC}"
fi

echo ""

# Run lychee on built HTML files
if lychee $LYCHEE_ARGS 'dist/**/*.html'; then
    echo ""
    echo -e "${GREEN}✓ All links are valid!${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}✗ Found broken links${NC}"
    echo ""
    echo "Run with --verbose flag for more details:"
    echo "  ./bin/check-links.sh --verbose"
    exit 1
fi
