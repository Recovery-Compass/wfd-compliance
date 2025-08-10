#!/bin/bash

# Recovery Compass Repository Cleanup and Optimization Script
# Created: January 30, 2025

echo "🧹 Starting Recovery Compass repository cleanup..."

# Function to display size before cleanup
show_size() {
    echo "📊 Current disk usage:"
    cd ~/Projects && du -sh * | sort -hr | head -10
    echo ""
}

# Show initial size
echo "📏 Initial repository sizes:"
show_size

# Remove .DS_Store files
echo "🗑️  Removing .DS_Store files..."
find ~/Projects -name ".DS_Store" -delete
echo "✅ .DS_Store files removed"

# Remove Python cache
echo "🐍 Removing Python cache files..."
find ~/Projects -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find ~/Projects -type f -name "*.pyc" -delete
find ~/Projects -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null
find ~/Projects -type f -name ".coverage" -delete
echo "✅ Python cache cleaned"

# Remove log files
echo "📝 Removing log files..."
find ~/Projects -type f -name "*.log" -delete
echo "✅ Log files removed"

# Optional: Remove node_modules (with confirmation)
echo ""
read -p "🤔 Remove node_modules directories? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Removing node_modules directories..."
    find ~/Projects -type d -name "node_modules" -prune -exec rm -rf {} +
    echo "✅ node_modules removed"
fi

# Show final size
echo ""
echo "📏 Final repository sizes:"
show_size

# Git status check
echo "📋 Git status for all repositories:"
echo "=================================="
for repo in ~/Projects/*/; do
    if [ -d "$repo/.git" ]; then
        repo_name=$(basename "$repo")
        echo ""
        echo "📁 $repo_name:"
        cd "$repo" && git status --short
        if [ -z "$(git status --short)" ]; then
            echo "   ✅ Clean working directory"
        fi
    fi
done

echo ""
echo "🎉 Cleanup complete!"
echo ""
echo "💡 Quick tips:"
echo "   - Run 'npm install' to restore node_modules when needed"
echo "   - Run 'python -m venv venv' to create Python virtual environments"
echo "   - Check ~/Projects/REPOSITORY_ORGANIZATION_GUIDE.md for more info"
