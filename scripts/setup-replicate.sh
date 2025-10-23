#!/bin/bash
# Replicate Integration Setup Script
# Seamlessly integrates AI capabilities into WFD Compliance workflow

set -e

echo "🚀 Setting up Replicate Integration for WFD Compliance..."

# Check if running from correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the wfd-compliance directory"
    exit 1
fi

# Check if replicate package is installed
if ! grep -q '"replicate"' package.json; then
    echo "📦 Installing Replicate SDK..."
    npm install replicate
else
    echo "✅ Replicate SDK already installed"
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.replicate.template .env.local
    echo "⚠️  Please add your VITE_REPLICATE_API_TOKEN to .env.local"
else
    echo "ℹ️  .env.local already exists"
    
    # Check if Replicate token is configured
    if ! grep -q "VITE_REPLICATE_API_TOKEN" .env.local; then
        echo "📝 Adding Replicate configuration to .env.local..."
        echo "" >> .env.local
        cat .env.replicate.template >> .env.local
        echo "⚠️  Please add your VITE_REPLICATE_API_TOKEN to .env.local"
    else
        echo "✅ Replicate configuration found in .env.local"
    fi
fi

# Add .env.local to .gitignore if not already there
if [ -f ".gitignore" ]; then
    if ! grep -q "^.env.local$" .gitignore; then
        echo "🔒 Adding .env.local to .gitignore..."
        echo ".env.local" >> .gitignore
    fi
fi

# Check TypeScript compilation
echo "🔍 Checking TypeScript compilation..."
if npx tsc --noEmit; then
    echo "✅ TypeScript compilation successful"
else
    echo "⚠️  TypeScript compilation has errors (non-blocking)"
fi

echo ""
echo "✨ Replicate Integration Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Get your API token from https://replicate.com/account/api-tokens"
echo "2. Add it to .env.local: VITE_REPLICATE_API_TOKEN=your_token_here"
echo "3. Import AIToolsPanel in your admin pages:"
echo "   import { AIToolsPanel } from '@/components/AIToolsPanel';"
echo "4. Start the dev server: npm run dev"
echo ""
echo "📚 See REPLICATE_INTEGRATION.md for usage examples"
