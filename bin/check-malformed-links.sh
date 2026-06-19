#!/usr/bin/env bash
#
# Malformed-link Checker
#
# Catches a class of broken internal links that the lychee link checker
# CANNOT see: Markdown links whose brackets are malformed. When the closing
# `]` (or the whole `[...]` text) is missing, the parser never recognises a
# link at all, so lychee reports it as plain text and CI stays green while the
# live site serves a 404.
#
# Two real examples this guard would have caught:
#   - "EU 및 미국 지역]을 ... 고려하세요(/docs/regions)."   (stray `]`, detached URL)
#   - "[Configure your domain's DNS settings (/docs/custom-domains/setup-guide)" (missing `]`)
#
# It also rejects absolute `/docs/` link targets: this site routes under
# `/{locale}/...` (e.g. /en/regions), never `/docs/...`.
#
# Usage:
#   ./bin/check-malformed-links.sh            # scan src/content/docs (default)
#   ./bin/check-malformed-links.sh path/...   # scan specific paths
#
# Exit code is non-zero if any suspect link is found.
#
# Escape hatch: append `<!-- allow-detached-link -->` to a line to skip the
# structural check for that line (use sparingly, for genuine parentheticals).

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TARGETS=("$@")
if [ ${#TARGETS[@]} -eq 0 ]; then
  TARGETS=("src/content/docs")
fi

status=0

echo -e "${GREEN}🔍 Checking for malformed / wrong-prefix internal links...${NC}"
echo ""

# ---------------------------------------------------------------------------
# Check 1 — absolute /docs/ link targets (always wrong; routes are /{locale}/)
# Matches the literal "(/docs/" that opens a Markdown link target. Image paths
# like "(/img/docs/..." and prose like `src/content/docs/` are not matched.
# ---------------------------------------------------------------------------
echo -e "${YELLOW}[1/2] Absolute /docs/ link targets${NC}"
if matches=$(grep -rnP '\(/docs/' --include='*.md' --include='*.mdoc' "${TARGETS[@]}" 2>/dev/null); then
  echo -e "${RED}✗ Found /docs/ links (use /{locale}/... instead):${NC}"
  echo "$matches"
  echo ""
  status=1
else
  echo -e "${GREEN}✓ None found${NC}"
  echo ""
fi

# ---------------------------------------------------------------------------
# Check 2 — detached link target: "(/path" not preceded by "]", on a line that
# also opens a link with "[". This is the signature of a missing/stray bracket.
# Static asset paths (/img/, /socialcards/) and explicitly-allowed lines are
# excluded.
# ---------------------------------------------------------------------------
echo -e "${YELLOW}[2/2] Detached link targets (missing/stray bracket)${NC}"
if matches=$(grep -rnP '(?<!\])\(/(?!img/|socialcards/)[a-z]' \
      --include='*.md' --include='*.mdoc' "${TARGETS[@]}" 2>/dev/null \
      | grep -F '[' \
      | grep -vF 'allow-detached-link'); then
  echo -e "${RED}✗ Found detached link targets (likely a missing '[' or ']'):${NC}"
  echo "$matches"
  echo ""
  status=1
else
  echo -e "${GREEN}✓ None found${NC}"
  echo ""
fi

if [ "$status" -eq 0 ]; then
  echo -e "${GREEN}✓ No malformed internal links detected.${NC}"
else
  echo -e "${RED}✗ Malformed internal links detected (see above).${NC}"
  echo -e "${YELLOW}  These are invisible to lychee because they don't parse as links.${NC}"
fi

exit "$status"
