#!/usr/bin/env bash
# Check Amplify deployment status (requires AWS CLI configured)

set -euo pipefail

echo "🔍 Checking Amplify deployment status..."

# Check if AWS CLI is available
if ! command -v aws &> /dev/null; then
    echo "⚠️ AWS CLI not found. Install it with: brew install awscli"
    echo "   Then configure with: aws configure"
    exit 1
fi

# Get the latest commit
LATEST_COMMIT=$(git rev-parse --short HEAD)
echo "📌 Latest local commit: $LATEST_COMMIT"

# Display instructions for manual check
echo ""
echo "To check Amplify deployment status:"
echo "1. Visit: https://console.aws.amazon.com/amplify/"
echo "2. Select your app: wfd-sunrise-path"
echo "3. Check if commit $LATEST_COMMIT is deployed"
echo ""
echo "Or run with AWS CLI (once configured):"
echo "aws amplify list-apps --region us-east-1"
echo ""

# If you have the app ID, uncomment and update this:
# APP_ID="your-amplify-app-id"
# aws amplify get-app --app-id $APP_ID --region us-east-1 | jq '.app.productionBranch'
# aws amplify list-jobs --app-id $APP_ID --branch-name main --max-results 5 --region us-east-1
