#!/usr/bin/env bash
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OWNER="${GITHUB_OWNER:-thothrde}"
REPO="${GITHUB_REPO:-machine-looks-back}"
cd "$ROOT"

fail(){ printf '\nPUBLISH FAIL: %s\n' "$1" >&2; return 1; }

node tests/validate.mjs || { fail 'Content validator failed. Nothing was published.'; exit 1; }
command -v git >/dev/null || { fail 'git is missing.'; exit 2; }
command -v gh >/dev/null || { fail 'GitHub CLI (gh) is missing. Stop here; do not install anything blindly.'; exit 2; }
gh auth status >/dev/null 2>&1 || { fail 'GitHub CLI is not authenticated.'; exit 2; }

if [[ ! -d .git ]]; then git init -b main || exit 1; fi

git add .
if ! git diff --cached --quiet; then
  git commit -m "Public release candidate $(date +%F)" || exit 1
fi

if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  if git remote get-url origin >/dev/null 2>&1; then
    current="$(git remote get-url origin)"
    expected_https="https://github.com/$OWNER/$REPO.git"
    expected_ssh="git@github.com:$OWNER/$REPO.git"
    if [[ "$current" != "$expected_https" && "$current" != "$expected_ssh" ]]; then
      fail "origin points to $current, not $OWNER/$REPO. Refusing to change it automatically."
      exit 3
    fi
  else
    git remote add origin "https://github.com/$OWNER/$REPO.git" || exit 1
  fi
  git push -u origin main || exit 1
else
  gh repo create "$OWNER/$REPO" --public --source=. --remote=origin --push || exit 1
fi

API_HEADER=( -H 'Accept: application/vnd.github+json' -H 'X-GitHub-Api-Version: 2026-03-10' )
if gh api "${API_HEADER[@]}" "repos/$OWNER/$REPO/pages" >/dev/null 2>&1; then
  printf '%s\n' '{"build_type":"legacy","source":{"branch":"main","path":"/"}}' | \
    gh api "${API_HEADER[@]}" -X PUT "repos/$OWNER/$REPO/pages" --input - >/dev/null || {
      fail 'Repository push succeeded, but Pages source update failed.'; exit 4;
    }
else
  printf '%s\n' '{"build_type":"legacy","source":{"branch":"main","path":"/"}}' | \
    gh api "${API_HEADER[@]}" -X POST "repos/$OWNER/$REPO/pages" --input - >/dev/null || {
      fail 'Repository push succeeded, but Pages activation failed.'; exit 4;
    }
fi

# Request a build; 204 is expected. Failure is not hidden.
gh api "${API_HEADER[@]}" -X POST "repos/$OWNER/$REPO/pages/builds" >/dev/null || {
  fail 'Pages is configured, but an explicit build request failed. Check GitHub Pages status before announcing release.'; exit 5;
}

printf '\nPUBLISH CONFIGURATION PASS\n'
printf 'Repository: https://github.com/%s/%s\n' "$OWNER" "$REPO"
printf 'Pages target: https://%s.github.io/%s/\n' "$OWNER" "$REPO"
printf 'Next: verify the live URL and its legal/privacy page before treating the release as complete.\n'
