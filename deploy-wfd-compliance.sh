#!/bin/bash

# WFD Compliance Deployment Script
# Purpose: Deploy wfd-compliance.org with full integration

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 WFD Compliance Deployment Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Step 1: Create minimal index.html for immediate deployment
echo -e "${YELLOW}📝 Creating deployment files...${NC}"

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WFD Compliance - Whistler First Day Recovery Support</title>
    <meta name="description" content="501(c)(3) Compliance Platform for Recovery Organizations">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .container {
            max-width: 1200px;
            padding: 2rem;
            text-align: center;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .powered-by {
            font-size: 1rem;
            margin-bottom: 3rem;
            opacity: 0.9;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .feature {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease;
        }
        
        .feature:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .feature-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
        }
        
        .feature-description {
            opacity: 0.9;
            line-height: 1.6;
        }
        
        .cta {
            margin-top: 3rem;
        }
        
        .button {
            display: inline-block;
            padding: 1rem 2rem;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: bold;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }
        
        .button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .button.secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }
        
        .status {
            background: rgba(0, 255, 0, 0.2);
            border: 1px solid rgba(0, 255, 0, 0.5);
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            display: inline-block;
            margin-top: 1rem;
        }
        
        footer {
            margin-top: 4rem;
            opacity: 0.8;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WFD Compliance</h1>
        <p class="subtitle">Whistler First Day Recovery Support System</p>
        <p class="powered-by">🚀 Powered by Recovery Compass</p>
        
        <div class="status">✅ Platform Active</div>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">📋</div>
                <div class="feature-title">501(c)(3) Compliance</div>
                <div class="feature-description">
                    Complete regulatory compliance tracking and automated reporting for recovery organizations
                </div>
            </div>
            
            <div class="feature">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Grant Management</div>
                <div class="feature-description">
                    Federal and state grant application assistance with AI-powered optimization
                </div>
            </div>
            
            <div class="feature">
                <div class="feature-icon">🤝</div>
                <div class="feature-title">Recovery Support</div>
                <div class="feature-description">
                    Comprehensive program management for sustained recovery excellence
                </div>
            </div>
        </div>
        
        <div class="cta">
            <a href="https://recovery-compass.org" class="button">Learn More</a>
            <a href="mailto:compliance@recovery-compass.org" class="button secondary">Contact Us</a>
        </div>
        
        <footer>
            <p>© 2025 Recovery Compass | Building Recovery Excellence</p>
            <p style="margin-top: 0.5rem; font-size: 0.8rem;">
                Seismic • Crystal • Lava
            </p>
        </footer>
    </div>
    
    <script>
        // Simple analytics
        console.log('WFD Compliance Platform Loaded');
        
        // Add dynamic year
        document.addEventListener('DOMContentLoaded', function() {
            const year = new Date().getFullYear();
            const footer = document.querySelector('footer p');
            if (footer) {
                footer.innerHTML = footer.innerHTML.replace('2025', year);
            }
        });
    </script>
</body>
</html>
EOF

echo -e "${GREEN}✓ Created index.html${NC}"

# Step 2: Create package.json for AWS Amplify
cat > package.json << 'EOF'
{
  "name": "wfd-compliance",
  "version": "1.0.0",
  "description": "WFD Compliance Platform - Recovery Compass",
  "scripts": {
    "build": "echo 'Static site - no build required'",
    "start": "npx serve .",
    "deploy": "bash deploy-wfd-compliance.sh"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Recovery-Compass/wfd-sunrise-path.git"
  },
  "keywords": ["recovery", "compliance", "501c3", "grants"],
  "author": "Recovery Compass",
  "license": "MIT"
}
EOF

echo -e "${GREEN}✓ Created package.json${NC}"

# Step 3: Create amplify.yml
cat > amplify.yml << 'EOF'
version: 1
frontend:
  phases:
    build:
      commands:
        - echo "Deploying WFD Compliance static site"
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
EOF

echo -e "${GREEN}✓ Created amplify.yml${NC}"

# Step 4: Create .gitignore if not exists
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.npm/

# Environment
.env
.env.local
.env.production

# Build
dist/
build/
.next/
out/

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# Temporary
tmp/
temp/
EOF
    echo -e "${GREEN}✓ Created .gitignore${NC}"
fi

# Step 5: Initialize Git and commit
echo -e "${YELLOW}📦 Preparing Git repository...${NC}"

git add .
git commit -m "Initial WFD Compliance deployment - Recovery Compass" || echo "No changes to commit"

echo -e "${GREEN}✓ Repository ready${NC}"

# Step 6: Push to GitHub
echo -e "${YELLOW}🚀 Deploying to GitHub...${NC}"

# Check if repo exists on GitHub
if gh repo view Recovery-Compass/wfd-sunrise-path &>/dev/null; then
    echo -e "${BLUE}Repository exists on GitHub${NC}"
else
    echo -e "${YELLOW}Creating repository on GitHub...${NC}"
    gh repo create Recovery-Compass/wfd-sunrise-path \
        --public \
        --description "WFD Compliance Platform - Whistler First Day Recovery Support" \
        --homepage "https://wfd-compliance.org" || echo "Repository may already exist"
fi

# Push to GitHub
git push -u origin main 2>/dev/null || {
    echo -e "${YELLOW}Creating main branch and pushing...${NC}"
    git push --set-upstream origin main
}

echo -e "${GREEN}✓ Pushed to GitHub${NC}"

# Step 7: Display next steps
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment Prepared Successfully!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

echo -e "\n${YELLOW}📋 Next Steps:${NC}"
echo -e "1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify/"
echo -e "2. Connect to GitHub repo: Recovery-Compass/wfd-sunrise-path"
echo -e "3. Deploy will start automatically"
echo -e "4. Add custom domain: wfd-compliance.org"
echo -e "5. Update Cloudflare DNS to point to Amplify"

echo -e "\n${BLUE}Repository URL:${NC} https://github.com/Recovery-Compass/wfd-sunrise-path"
echo -e "${BLUE}Live Site:${NC} https://wfd-compliance.org"

echo -e "\n${GREEN}🎉 Recovery Compass - Building Excellence${NC}"
