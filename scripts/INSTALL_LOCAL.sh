#!/usr/bin/env bash
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${TARGET:-$HOME/Projects/machine-looks-back}"
STAMP="$(date +%Y%m%d-%H%M%S)"
node "$SRC/tests/validate.mjs"
mkdir -p "$(dirname "$TARGET")"
if [[ -e "$TARGET" ]]; then
  BACKUP="${TARGET}.backup-${STAMP}"
  echo "Existing target found. Creating backup: $BACKUP"
  cp -a "$TARGET" "$BACKUP"
fi
mkdir -p "$TARGET"
rsync -a --delete --exclude '.git' --exclude '.preview.pid' --exclude '.preview.log' "$SRC/" "$TARGET/"
node "$TARGET/tests/validate.mjs"
echo "Installed to: $TARGET"
echo "Run: zsh \"$TARGET/scripts/RUN_LOCAL.sh\""
