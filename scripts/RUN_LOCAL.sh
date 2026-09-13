#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-8797}"
PIDFILE="$ROOT/.preview.pid"
LOGFILE="$ROOT/.preview.log"
cd "$ROOT"
node tests/validate.mjs
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use; nothing was killed." >&2
  exit 2
fi
nohup python3 -m http.server "$PORT" --bind 127.0.0.1 >"$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
sleep 1
URL="http://127.0.0.1:$PORT/"
echo "Preview: $URL"
if command -v open >/dev/null 2>&1; then open "$URL" || true; fi
echo "PID $(cat "$PIDFILE") — stop with scripts/STOP_LOCAL.sh"
