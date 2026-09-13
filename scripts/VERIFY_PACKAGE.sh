#!/usr/bin/env bash
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
status=0
node tests/validate.mjs || status=1
node --check app.js || status=1
node --check data/content.js || status=1
python3 - <<'PY' || status=1
from pathlib import Path
from html.parser import HTMLParser
import re
root=Path('.')
html=(root/'index.html').read_text(encoding='utf-8')
class P(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.local=[]; self.csp=False
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d: self.ids.append(d['id'])
        if d.get('http-equiv','').lower()=='content-security-policy': self.csp=True
        for k in ('src','href'):
            u=d.get(k,'')
            if u.startswith('./'): self.local.append(u[2:])
p=P();p.feed(html)
assert len(p.ids)==len(set(p.ids)), 'duplicate HTML ids'
assert p.csp, 'CSP meta missing'
for rel in p.local: assert (root/rel).exists(), f'missing local asset {rel}'
assert (root/'robots.txt').exists() and (root/'sitemap.xml').exists()
print(f'STATIC QA PASS: {len(p.ids)} unique IDs; {len(p.local)} local references; CSP + robots + sitemap present')
PY
if [[ -f RELEASE_MANIFEST.sha256 ]]; then
  shasum -a 256 -c RELEASE_MANIFEST.sha256 || status=1
else
  echo 'RELEASE_MANIFEST.sha256 missing' >&2; status=1
fi
if [[ "$status" -ne 0 ]]; then echo 'PACKAGE VERIFY FAIL' >&2; exit 1; fi
echo 'PACKAGE VERIFY PASS'
