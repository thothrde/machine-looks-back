#!/usr/bin/env bash
set -u
printf '=== MACHINE LOOKS BACK — READ-ONLY PREFLIGHT ===\n'
printf 'date: '; date
printf 'cwd:  '; pwd
printf '\n-- required tools --\n'
for cmd in python3 git node; do
  if command -v "$cmd" >/dev/null 2>&1; then printf '%-10s %s\n' "$cmd" "$(command -v "$cmd")"; else printf '%-10s MISSING\n' "$cmd"; fi
done
printf '\n-- optional publishing tool --\n'
if command -v gh >/dev/null 2>&1; then gh --version | head -1; gh auth status 2>&1 || true; else echo 'gh: not installed (publishing script will not run until available/authenticated)'; fi
printf '\n-- local preview ports 8797-8799 --\n'
if command -v lsof >/dev/null 2>&1; then lsof -nP -iTCP:8797-8799 -sTCP:LISTEN || true; else echo 'lsof unavailable'; fi
printf '\n-- repository status if applicable --\n'
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then git status --short --branch; else echo 'not inside a git work tree'; fi
printf '\nNo files or processes were changed.\n'
