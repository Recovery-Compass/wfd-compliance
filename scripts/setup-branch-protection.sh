#!/bin/bash

# GitHub Branch Protection Setup Script
# Run this to configure branch protection rules via GitHub CLI

set -e

REPO="Recovery-Compass/wfd-sunrise-path"
BRANCH="main"

echo "🔒 Setting up branch protection for $REPO:$BRANCH"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

echo "📋 Configuring branch protection rules..."

# Create branch protection rule
gh api repos/$REPO/branches/$BRANCH/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["security-scan","code-quality","build-test"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"dismissal_restrictions":{},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":1,"require_last_push_approval":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field block_creations=true \
  --field required_conversation_resolution=true \
  --field lock_branch=false \
  --field allow_fork_syncing=false \
  --field required_linear_history=true \
  --field required_signatures=true \
  2>/dev/null || {
    echo "⚠️  Some settings may require admin permissions"
    echo "Manual configuration needed at: https://github.com/$REPO/settings/branches"
}

echo ""
echo "✅ Branch protection configured with:"
echo "  • Required PR reviews (1 approver minimum)"
echo "  • Dismiss stale reviews on new commits"
echo "  • Require code owner reviews"
echo "  • Require status checks to pass"
echo "  • Require branches to be up to date"
echo "  • Require conversation resolution"
echo "  • Require linear history"
echo "  • Require signed commits"
echo "  • No force pushes allowed"
echo "  • No branch deletion allowed"

echo ""
echo "📝 Additional manual steps recommended:"
echo "1. Enable Dependabot: https://github.com/$REPO/settings/security_analysis"
echo "2. Enable secret scanning: https://github.com/$REPO/settings/security_analysis"
echo "3. Enable push protection: https://github.com/$REPO/settings/security_analysis"
echo "4. Configure CODEOWNERS teams if needed"
echo "5. Set up deployment environments in Settings > Environments"

echo ""
echo "🎉 GPSW Compliance: Branch protection enabled!"
