# WFD Compliance Integration & Deployment Plan
## Unifying GitHub, Lovable, Cloudflare, and AWS Amplify

---

## 🎯 Current State Analysis

### Domains & Deployments
- **Primary Domain**: wfd-compliance.org (Cloudflare + AWS Amplify)
- **Lovable Preview**: wfd-sunrise-path.lovable.app
- **GitHub Repos**: 
  - Expected: github.com/Recovery-Compass/wfd-sunrise-path
  - Current Local: github.com/EssenceAlignment/WFD-Sunrise-Path

### Infrastructure Components
- **DNS**: Cloudflare
- **Hosting**: AWS Amplify
- **Development**: Lovable.app
- **Local**: Google Drive synced folder

---

## 🚀 Integration Steps

### Step 1: Migrate to Recovery Compass GitHub

```bash
# First, let's migrate the project to local active directory
cd ~/Projects
rsync -av --exclude-from="$HOME/Projects/.sync-config/.driveignore" \
  "/Users/ericjones/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/wfd-sunrise-path/WFD-Sunrise-Path/" \
  "$HOME/Projects/active/wfd-sunrise-path/"

# Navigate to the new location
cd ~/Projects/active/wfd-sunrise-path

# Update remote to Recovery Compass org
git remote remove origin
git remote add origin https://github.com/Recovery-Compass/wfd-sunrise-path.git

# Create the repo on GitHub first (via gh CLI or web interface)
gh repo create Recovery-Compass/wfd-sunrise-path --public --description "WFD Compliance Platform - Whistler First Day Recovery Support"

# Push to new repo
git push -u origin main
```

### Step 2: Configure AWS Amplify

```yaml
# amplify.yml configuration for optimal deployment
version: 1
applications:
  - appRoot: /
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci --cache .npm --prefer-offline
            - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - .next/cache/**/*
          - .npm/**/*
          - node_modules/**/*
    platform:
      buildSpec:
        version: 1.0
        frontend:
          phases:
            preBuild:
              commands:
                - npm install -g @aws-amplify/cli
            build:
              commands:
                - amplifyPush --simple
```

### Step 3: Cloudflare Configuration

#### A. DNS Settings
```
Type: CNAME
Name: @
Target: [amplify-app-url].amplifyapp.com
Proxy: ON (Orange Cloud)

Type: CNAME  
Name: www
Target: [amplify-app-url].amplifyapp.com
Proxy: ON (Orange Cloud)
```

#### B. Page Rules
```
1. Always Use HTTPS
   URL: *wfd-compliance.org/*
   Setting: Always Use HTTPS

2. Cache Everything
   URL: *wfd-compliance.org/assets/*
   Setting: Cache Level - Cache Everything
   Edge Cache TTL: 1 month

3. Bypass Cache for API
   URL: *wfd-compliance.org/api/*
   Setting: Cache Level - Bypass
```

#### C. Transform Rules
```javascript
// Add security headers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newHeaders = new Headers(response.headers)
  
  // Security headers
  newHeaders.set('X-Content-Type-Options', 'nosniff')
  newHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newHeaders.set('X-XSS-Protection', '1; mode=block')
  
  // Recovery Compass branding
  newHeaders.set('X-Powered-By', 'Recovery Compass')
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  })
}
```

### Step 4: Cloudflare Workers Integration

Create a worker for API handling:

```javascript
// wfd-compliance-api.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env);
    }
    
    // Serve static site from Amplify
    return fetch(request);
  }
}

async function handleAPI(request, env) {
  const url = new URL(request.url);
  
  // Compliance check endpoint
  if (url.pathname === '/api/compliance/check') {
    return new Response(JSON.stringify({
      status: 'compliant',
      organization: 'Recovery Compass',
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // MCP server integration endpoint
  if (url.pathname === '/api/mcp/sync') {
    // Sync with MCP servers
    return new Response(JSON.stringify({
      mcp_status: 'synced',
      servers: ['airtable', 'perplexity', 'claude']
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404 });
}
```

### Step 5: MCP Server Integration

```javascript
// mcp-integration.js
const MCP_SERVERS = {
  airtable: {
    url: process.env.AIRTABLE_MCP_URL,
    key: process.env.AIRTABLE_API_KEY
  },
  perplexity: {
    url: process.env.PERPLEXITY_MCP_URL,
    key: process.env.PERPLEXITY_API_KEY
  },
  cloudflare: {
    url: process.env.CLOUDFLARE_MCP_URL,
    key: process.env.CLOUDFLARE_API_KEY
  }
};

export async function syncWithMCPServers() {
  const results = await Promise.all(
    Object.entries(MCP_SERVERS).map(async ([name, config]) => {
      try {
        const response = await fetch(config.url + '/sync', {
          headers: {
            'Authorization': `Bearer ${config.key}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            project: 'wfd-compliance',
            timestamp: new Date().toISOString()
          })
        });
        
        return { [name]: await response.json() };
      } catch (error) {
        return { [name]: { error: error.message } };
      }
    })
  );
  
  return results;
}
```

### Step 6: Lovable.app Sync Configuration

Create a sync script for Lovable:

```bash
#!/bin/bash
# sync-to-lovable.sh

# Export from local
npm run build
npm run export

# Push to Lovable
lovable deploy \
  --project wfd-sunrise-path \
  --branch main \
  --message "Sync from Recovery Compass"
```

### Step 7: Environment Variables Setup

Create `.env.production`:
```env
# AWS Amplify
NEXT_PUBLIC_AWS_REGION=us-west-2
NEXT_PUBLIC_AWS_APP_ID=your-amplify-app-id

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ZONE_ID=your-zone-id

# MCP Servers
AIRTABLE_MCP_URL=https://mcp.airtable.com
AIRTABLE_API_KEY=your-airtable-key
PERPLEXITY_MCP_URL=https://mcp.perplexity.ai
PERPLEXITY_API_KEY=your-perplexity-key

# Recovery Compass
RECOVERY_COMPASS_ORG_ID=your-org-id
RECOVERY_COMPASS_PROJECT=wfd-compliance
```

---

## 🔄 Continuous Integration Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy WFD Compliance

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to AWS Amplify
        if: github.ref == 'refs/heads/main'
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          npm install -g @aws-amplify/cli
          amplify push --yes
      
      - name: Purge Cloudflare Cache
        if: github.ref == 'refs/heads/main'
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ZONE_ID: ${{ secrets.CLOUDFLARE_ZONE_ID }}
        run: |
          curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
            -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
            -H "Content-Type: application/json" \
            --data '{"purge_everything":true}'
      
      - name: Sync MCP Servers
        if: github.ref == 'refs/heads/main'
        run: npm run sync:mcp
      
      - name: Update Context Hub
        if: github.ref == 'refs/heads/main'
        run: |
          bash ~/Projects/.sync-config/context-sync.sh update wfd-sunrise-path
```

---

## 🎨 Content Alignment

### Homepage Content Structure

```jsx
// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <Hero>
        <h1>WFD Compliance Platform</h1>
        <p>Whistler First Day Recovery Support System</p>
        <p>Powered by Recovery Compass</p>
      </Hero>
      
      <Features>
        <Feature icon="✓" title="501(c)(3) Compliance">
          Full regulatory compliance tracking and reporting
        </Feature>
        <Feature icon="📊" title="Grant Management">
          Federal and state grant application support
        </Feature>
        <Feature icon="🤝" title="Recovery Support">
          Comprehensive recovery program management
        </Feature>
      </Features>
      
      <Dashboard>
        <ComplianceStatus />
        <FundingOpportunities />
        <RecoveryMetrics />
      </Dashboard>
    </main>
  );
}
```

---

## 🚦 Deployment Checklist

### Pre-Deployment
- [ ] Migrate repo to Recovery-Compass org
- [ ] Update all remote URLs
- [ ] Configure environment variables
- [ ] Set up GitHub secrets

### AWS Amplify Setup
- [ ] Create Amplify app
- [ ] Connect to GitHub repo
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Enable branch auto-detection

### Cloudflare Configuration
- [ ] Update DNS records
- [ ] Configure Page Rules
- [ ] Deploy Workers
- [ ] Set up Transform Rules
- [ ] Enable analytics

### MCP Server Integration
- [ ] Configure Airtable MCP
- [ ] Set up Perplexity MCP
- [ ] Connect Cloudflare MCP
- [ ] Test all endpoints

### Content & Branding
- [ ] Update homepage content
- [ ] Add Recovery Compass branding
- [ ] Implement compliance dashboard
- [ ] Add funding tracker

### Testing & Validation
- [ ] Test all deployment paths
- [ ] Verify DNS propagation
- [ ] Check SSL certificates
- [ ] Validate MCP connections
- [ ] Performance testing

### Go-Live
- [ ] Final content review
- [ ] Enable monitoring
- [ ] Set up alerts
- [ ] Document access credentials
- [ ] Announce launch

---

## 📊 Success Metrics

- Site loads in < 2 seconds globally
- All MCP servers connected and syncing
- Automatic deployments on commit
- Zero downtime during updates
- Full Recovery Compass branding visible

---

## 🆘 Rollback Plan

If issues arise:
1. Revert DNS to previous configuration
2. Rollback Amplify to previous deployment
3. Restore Cloudflare Workers to stable version
4. Clear all caches
5. Notify team via Slack

---

*This plan ensures wfd-compliance.org becomes a fully integrated, high-performance platform aligned with Recovery Compass principles.*
