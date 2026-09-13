#!/usr/bin/env bash
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$HOME/Projects/machine-looks-back"
LIVE_URL="https://thothrde.github.io/machine-looks-back/"

say(){ printf '\n%s\n' "$1"; }
fail(){ printf '\nRC5 APPLY/PUBLISH STOP: %s\n' "$1" >&2; return 1; }

say '=== RC5 sealed-package verification ==='
bash "$ROOT/scripts/VERIFY_PACKAGE.sh" || { fail 'Package verification failed. Existing installed/public version left untouched.'; exit 1; }

say '=== Read-only preflight ==='
bash "$ROOT/scripts/PREFLIGHT.sh" || { fail 'Preflight failed. Existing installed/public version left untouched.'; exit 1; }

say '=== Stop local preview if present ==='
if [[ -f "$TARGET/scripts/STOP_LOCAL.sh" ]]; then bash "$TARGET/scripts/STOP_LOCAL.sh" || true; fi

say '=== Install RC5 locally (installer creates backup of existing target) ==='
bash "$ROOT/scripts/INSTALL_LOCAL.sh" || { fail 'Local installation failed. Public site was not changed.'; exit 1; }

say '=== Verify installed RC5 ==='
bash "$TARGET/scripts/VERIFY_PACKAGE.sh" || { fail 'Installed RC5 failed verification. Public site was not changed.'; exit 1; }

say '=== Publish/update GitHub Pages ==='
(
  cd "$TARGET" || exit 1
  bash scripts/PUBLISH_GITHUB_PAGES.sh
) || { fail 'GitHub publication/update failed. Inspect repository state before retrying.'; exit 1; }

say '=== Live RC5 check ==='
found=0
for i in $(seq 1 18); do
  body="$(curl -fsSL --max-time 15 "${LIVE_URL}?rc5=${i}" 2>/dev/null || true)"
  if printf '%s' "$body" | grep -Fq 'Der mehrdimensionale „CT-Scan“ durch die KI'; then
    printf 'LIVE VERIFY PASS: %s\n' "$LIVE_URL"
    found=1
    break
  fi
  printf 'Pages build pending (%s/18); waiting 10s...\n' "$i"
  sleep 10
done

if [[ "$found" -ne 1 ]]; then
  printf '\nLIVE VERIFY PENDING: push/configuration completed, but RC5 wording was not observed within the polling window.\n'
  printf 'Check: %s\n' "$LIVE_URL"
  exit 2
fi

printf '\nRC5 APPLY + PUBLICATION PASS\n'
printf 'Live: %s\n' "$LIVE_URL"
