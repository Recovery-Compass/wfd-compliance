#!/usr/bin/env bash
set -euo pipefail

echo "== Gate 0: repo/path =="
echo "PWD: $(pwd)"
echo "REMOTE: $(git remote -v | tr -s ' ')"
echo "BRANCH: $(git branch -vv | sed -n 's/* //p')"

[[ "$(pwd)" == *"/Users/ericjones/Projects/wfd-compliance/wfd-compliance" ]] || { echo "Wrong PWD"; exit 1; }
git remote -v | grep -q 'origin[[:space:]]https://github.com/Recovery-Compass/wfd-compliance.git' || { echo "Wrong origin"; exit 1; }
git branch -vv | grep -q 'main .*origin/main' || { echo "Not on main tracking origin/main"; exit 1; }

echo "== Gate 1: React 18 root =="
grep -Eq 'createRoot\\(document\\.getElementById\\("root"\\)!?\\)' src/main.tsx
grep -Eq '\\.render\\(' src/main.tsx

echo "== Gate 2: ErrorBoundary wrap =="
grep -Eq '<ErrorBoundary>[[:space:]]*<WfdDashboard ?/?>' src/main.tsx

echo "== Gate 3: noscript present =="
grep -Eq '<noscript>JavaScript is required to view this dashboard\\.' index.html

echo "== Gate 4: Stat guards & copy =="
grep -q 'min-w-0' src/pages/WfdDashboard.tsx
grep -q 'toLocaleString\\("en-US"\\)' src/pages/WfdDashboard.tsx
grep -q 'tabular-nums' src/pages/WfdDashboard.tsx
grep -q 'Laundry Services' src/pages/WfdDashboard.tsx

echo "== Build =="
rm -rf dist
npm run -s build

echo "== Gate 5: dist sanity (hashed assets + no /src refs) =="
grep -q '/assets/.*\\.js' dist/index.html
! grep -q '/src/main.tsx' dist/index.html || (echo 'dist refers to /src/main.tsx' && exit 1)

echo "== Gate 6: public assets =="
for f in wfd-logo.svg rc-logo.svg MOU_WFD_2025-08-11.pdf; do
  test -f "public/$f" || (echo "missing public/$f" && exit 1)
done

echo "== PASS =="
{
  echo "UTC: $(date -u)"
  echo "HEAD: $(git rev-parse --short HEAD 2>/dev/null || echo 'detached')"
} > checks.txt