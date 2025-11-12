#!/usr/bin/env bash
#
# Link Checker Script
# Checks for broken links in documentation using lychee
#
# Usage:
#   ./bin/check-links.sh                 # Check internal links only
#   ./bin/check-links.sh --external      # Check all links (including external)
#   ./bin/check-links.sh --verbose       # Show detailed output
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
    --help|-h)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --external, -e    Check external links (slower)"
      echo "  --verbose, -v     Show detailed output"
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

# Build base arguments
LYCHEE_ARGS="--config lychee.toml --no-progress $VERBOSE"

# Add offline mode for internal-only checks
if [ "$CHECK_EXTERNAL" = false ]; then
    echo -e "${YELLOW}Checking internal links only (use --external to check all links)${NC}"
    LYCHEE_ARGS="$LYCHEE_ARGS --offline"
else
    echo -e "${YELLOW}Checking all links (internal and external)${NC}"
fi

echo ""

# Run lychee
if lychee $LYCHEE_ARGS './src/**/*.md' './src/**/*.mdoc'; then
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
