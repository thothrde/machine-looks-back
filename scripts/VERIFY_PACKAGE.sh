#!/bin/bash
set -u
set -o pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1

echo "=== MACHINE LOOKS BACK — CURRENT TREE VERIFY ==="

if [ ! -f RELEASE_MANIFEST.json ] || [ ! -f tests/validate.mjs ]; then
  echo "PACKAGE VERIFY FAIL: required verification files missing"
  exit 1
fi

node tests/validate.mjs || {
  echo "PACKAGE VERIFY FAIL: content validator"
  exit 1
}

node --check app.js >/dev/null || {
  echo "PACKAGE VERIFY FAIL: app.js syntax"
  exit 1
}
node --check data/content.js >/dev/null || {
  echo "PACKAGE VERIFY FAIL: data/content.js syntax"
  exit 1
}

python3 - <<'PY'
from pathlib import Path
import hashlib, json, re, sys

root=Path(".")
manifest=json.loads((root/"RELEASE_MANIFEST.json").read_text(encoding="utf-8"))
items=manifest.get("files")
if not isinstance(items,list) or not items:
    raise SystemExit("PACKAGE VERIFY FAIL: manifest files[] missing")

seen=set()
for item in items:
    rel=item.get("path")
    sha=item.get("sha256")
    size=item.get("bytes")
    if not isinstance(rel,str) or not rel or rel in seen:
        raise SystemExit(f"PACKAGE VERIFY FAIL: bad/duplicate manifest path {rel!r}")
    seen.add(rel)
    p=root/rel
    if not p.is_file():
        raise SystemExit(f"PACKAGE VERIFY FAIL: missing {rel}")
    raw=p.read_bytes()
    actual=hashlib.sha256(raw).hexdigest()
    if actual != sha:
        raise SystemExit(f"PACKAGE VERIFY FAIL: hash mismatch {rel}")
    if len(raw) != size:
        raise SystemExit(f"PACKAGE VERIFY FAIL: byte-size mismatch {rel}")

# Public-tree hygiene invariant.
if "docs/MULTI_AI_HANDOFF_RC5_2026-09-13.md" in seen:
    raise SystemExit("PACKAGE VERIFY FAIL: internal handoff remains in public manifest")
if (root/"docs/MULTI_AI_HANDOFF_RC5_2026-09-13.md").exists():
    raise SystemExit("PACKAGE VERIFY FAIL: internal handoff remains in public tree")

html=(root/"index.html").read_text(encoding="utf-8")
if "Content-Security-Policy" not in html:
    raise SystemExit("PACKAGE VERIFY FAIL: CSP missing")
if 'name="referrer"' not in html or "no-referrer" not in html:
    raise SystemExit("PACKAGE VERIFY FAIL: no-referrer missing")
for req in ("robots.txt","sitemap.xml",".nojekyll"):
    if not (root/req).exists():
        raise SystemExit(f"PACKAGE VERIFY FAIL: {req} missing")

# Duplicate static HTML IDs.
ids=re.findall(r'\bid=["\']([^"\']+)["\']', html)
if len(ids) != len(set(ids)):
    raise SystemExit("PACKAGE VERIFY FAIL: duplicate HTML ids")

print(f"STATIC QA PASS: {len(set(ids))} unique IDs; CSP + no-referrer + robots + sitemap present")
print(f"MANIFEST VERIFY PASS: {len(items)} files")
PY
RC=$?
if [ "$RC" -ne 0 ]; then
  exit "$RC"
fi

echo "PACKAGE VERIFY PASS"
exit 0
