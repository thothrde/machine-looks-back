#!/usr/bin/env bash
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PIDFILE="$ROOT/.preview.pid"
if [[ ! -f "$PIDFILE" ]]; then echo 'No preview PID file.'; exit 0; fi
PID="$(cat "$PIDFILE")"
if kill -0 "$PID" >/dev/null 2>&1; then kill "$PID"; echo "Stopped preview PID $PID"; else echo "Preview PID $PID was not running."; fi
rm -f "$PIDFILE"
