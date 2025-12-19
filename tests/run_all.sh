#!/bin/bash
set -euo pipefail

# Run from repository root.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_heading() {
  echo -e "\n${BLUE}→ $1${NC}"
}

print_status() {
  local status="$1"
  local message="$2"
  if [ "$status" = "ok" ]; then
    echo -e "${GREEN}✔ $message${NC}"
  else
    echo -e "${RED}✖ $message${NC}"
  fi
}

run_stage() {
  print_heading "$1"
  shift
  if "$@"; then
    print_status ok "Completed ${1} successfully"
  else
    print_status fail "${1} failed, see details above"
    exit 1
  fi
}

echo -e "${YELLOW}Running backend + frontend test suites...${NC}"

run_stage "Backend (pytest smoke + tool suites)" python -m pytest tests/test_api_smoke.py tests/test_api_tools.py

print_heading "Frontend (Vitest hot path)"
(
  cd frontend
  run_stage "npm run test" npm run test
)

echo -e "${GREEN}All tests passed!${NC}"
