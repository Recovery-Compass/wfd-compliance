#!/usr/bin/env bash
set -euo pipefail

fail() { echo "❌ $1"; exit 1; }
pass() { echo "✅ $1"; }

# Build output
[ -f "package.json" ] || fail "package.json missing"
OUT=$(jq -r '.name // empty' package.json 2>/dev/null || echo "")
[ -n "$OUT" ] || fail "package.json invalid"

# Enforce Vite SPA conventions
jq -r '.scripts.build // ""' package.json | grep -qi 'vite\|tsc\|build' || \
  echo "ℹ️ Build script does not mention vite/tsc — ensure this is intentional."

# Engines
if jq -e '.engines.node' package.json >/dev/null 2>&1; then
  echo "ℹ️ Node engines pinned: $(jq -r '.engines.node' package.json)"
else
  echo "ℹ️ Consider pinning Node engines in package.json (\"engines\")."
fi

# Amplify build artifact
[ -f "amplify.yml" ] && grep -q "baseDirectory: .*dist" amplify.yml || \
  echo "ℹ️ amplify.yml should publish dist/"

# Forbidden files
git ls-files | grep -E '(^|/)\.env(\..*)?$' && fail ".env file tracked in git"
git ls-files | grep -E '(^|/)node_modules/' && fail "node_modules tracked in git"
git ls-files | grep -E '(^|/)dist/' && fail "dist tracked in git"

# Guardrails file
[ -f "GUARDRAILS.yaml" ] || echo "ℹ️ Add GUARDRAILS.yaml for tool alignment"
pass "Guardrails check complete"
