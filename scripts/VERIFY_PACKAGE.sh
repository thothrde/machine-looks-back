#!/bin/bash
set -u
set -o pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1

echo "=== MACHINE LOOKS BACK — CURRENT TREE VERIFY ==="

for req in RELEASE_MANIFEST.json RELEASE_MANIFEST.sha256 tests/validate.mjs app.js data/content.js index.html; do
  if [ ! -f "$req" ]; then
    echo "PACKAGE VERIFY FAIL: required file missing: $req"
    exit 1
  fi
done

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

shasum -a 256 -c RELEASE_MANIFEST.sha256 || {
  echo "PACKAGE VERIFY FAIL: RELEASE_MANIFEST.sha256"
  exit 1
}

python3 - <<'PY'
from pathlib import Path
from html.parser import HTMLParser
import hashlib, json

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
    if hashlib.sha256(raw).hexdigest() != sha:
        raise SystemExit(f"PACKAGE VERIFY FAIL: hash mismatch {rel}")
    if len(raw) != size:
        raise SystemExit(f"PACKAGE VERIFY FAIL: byte-size mismatch {rel}")

if "docs/MULTI_AI_HANDOFF_RC5_2026-09-13.md" in seen:
    raise SystemExit("PACKAGE VERIFY FAIL: internal handoff remains in public manifest")
if (root/"docs/MULTI_AI_HANDOFF_RC5_2026-09-13.md").exists():
    raise SystemExit("PACKAGE VERIFY FAIL: internal handoff remains in public tree")

html=(root/"index.html").read_text(encoding="utf-8")

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=[]
        self.local=[]
        self.csp=False
        self.no_referrer=False
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:
            self.ids.append(d['id'])
        if d.get('http-equiv','').lower()=='content-security-policy':
            self.csp=True
        if tag.lower()=='meta' and d.get('name','').lower()=='referrer' and d.get('content','').lower()=='no-referrer':
            self.no_referrer=True
        for k in ('src','href'):
            u=d.get(k,'')
            if u.startswith('./'):
                self.local.append(u[2:])

p=P()
p.feed(html)

if len(p.ids) != len(set(p.ids)):
    raise SystemExit("PACKAGE VERIFY FAIL: duplicate HTML ids")
if not p.csp:
    raise SystemExit("PACKAGE VERIFY FAIL: CSP missing")
if not p.no_referrer:
    raise SystemExit("PACKAGE VERIFY FAIL: no-referrer missing")
for rel in p.local:
    if not (root/rel).exists():
        raise SystemExit(f"PACKAGE VERIFY FAIL: missing local asset {rel}")
for req in ("robots.txt","sitemap.xml",".nojekyll"):
    if not (root/req).exists():
        raise SystemExit(f"PACKAGE VERIFY FAIL: {req} missing")

print(f"STATIC QA PASS: {len(p.ids)} unique IDs; {len(p.local)} local references; CSP + no-referrer + robots + sitemap present")
print(f"MANIFEST VERIFY PASS: {len(items)} files")
PY
RC=$?
[ "$RC" -eq 0 ] || exit "$RC"

echo "PACKAGE VERIFY PASS"
exit 0
