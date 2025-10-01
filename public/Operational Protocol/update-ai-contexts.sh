#!/bin/bash

# Recovery Compass AI Context Update Script
# This script regenerates AI context files for all Recovery Compass projects

echo "🔄 Updating AI Context Files for Recovery Compass Projects..."
echo "================================================"

# Array of project directories
projects=(
    "wfd-sunrise-path/WFD-Sunrise-Path"
    "recovery-compass-compliance"
    "recovery-compass.github.io"
)

# Counter for successful updates
successful=0
total=${#projects[@]}

# Update each project
for project in "${projects[@]}"; do
    echo ""
    echo "📦 Processing: $project"
    echo "--------------------------------"
    
    project_path="/Users/ericjones/Projects/$project"
    
    if [ -d "$project_path" ]; then
        cd "$project_path"
        
        # Run repomix using the config file
        if npx repomix; then
            echo "✅ Successfully updated AI context for $project"
            ((successful++))
        else
            echo "❌ Failed to update AI context for $project"
        fi
    else
        echo "⚠️  Project directory not found: $project_path"
    fi
done

echo ""
echo "================================================"
echo "📊 Summary: $successful/$total projects updated successfully"
echo ""
echo "💡 AI context files are now ready for use with:"
echo "   - ChatGPT"
echo "   - Claude"
echo "   - Gemini"
echo "   - Cursor"
echo "   - Any AI coding assistant"
echo ""
echo "📍 Context files location: ai-context.xml in each project directory"
