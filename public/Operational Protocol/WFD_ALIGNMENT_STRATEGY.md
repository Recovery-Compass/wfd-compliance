# WFD Project Alignment Strategy

## ⚠️ Current Misalignment

We have TWO separate projects that need to be unified:

### 1. Lovable Project (Original)
- **Location**: `/Users/ericjones/Projects/wfd-sunrise-path` → Google Drive
- **GitHub**: `github.com/EssenceAlignment/WFD-Sunrise-Path`
- **Connected to**: Lovable.app
- **Contains**: Full application code from Lovable

### 2. New Deployment (Just Created)
- **Location**: `/Users/ericjones/Projects/active/wfd-sunrise-path`
- **GitHub**: `github.com/Recovery-Compass/wfd-sunrise-path`
- **Contains**: Simple HTML landing page
- **Purpose**: Was meant to deploy to wfd-compliance.org

## 🎯 Correct Alignment Strategy

### Option A: Use Lovable Project for Everything (RECOMMENDED)
This maintains continuity with your existing work.

```bash
# Step 1: Update the Lovable project's remote
cd /Users/ericjones/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My\ Drive/📁\ Projects/wfd-sunrise-path/WFD-Sunrise-Path
git remote add recovery https://github.com/Recovery-Compass/wfd-sunrise-path.git

# Step 2: Push Lovable code to Recovery Compass repo
git push recovery main

# Step 3: Deploy from Recovery Compass repo to AWS Amplify
# This will deploy the FULL Lovable application
```

### Option B: Keep Projects Separate
- Use EssenceAlignment repo for Lovable development
- Use Recovery-Compass repo for production deployment
- Sync between them as needed

### Option C: Migrate Everything to Active Directory
```bash
# Move Lovable project to active directory
rsync -av --exclude=node_modules --exclude=.git \
  "/Users/ericjones/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/wfd-sunrise-path/WFD-Sunrise-Path/" \
  "/Users/ericjones/Projects/active/wfd-sunrise-path-lovable/"

# Work from active directory going forward
cd /Users/ericjones/Projects/active/wfd-sunrise-path-lovable
```

## 🚀 Recommended Actions

### Immediate Steps:
1. **STOP** - Don't deploy the simple HTML version
2. **DECIDE** - Which project should be the source of truth?
3. **ALIGN** - Make sure Lovable, GitHub, and AWS Amplify all point to the same code

### If Using Lovable Project (Recommended):
```bash
# 1. Navigate to Lovable project
cd /Users/ericjones/Projects/wfd-sunrise-path

# 2. Check what's there
ls -la

# 3. Push to Recovery Compass
git remote add recovery https://github.com/Recovery-Compass/wfd-sunrise-path.git
git push recovery main --force

# 4. Deploy THAT to AWS Amplify
```

### If Using New Project:
```bash
# 1. Copy Lovable files to new location
cp -R /Users/ericjones/Projects/wfd-sunrise-path/* \
     /Users/ericjones/Projects/active/wfd-sunrise-path/

# 2. Commit and push
cd /Users/ericjones/Projects/active/wfd-sunrise-path
git add .
git commit -m "Add Lovable application code"
git push origin main
```

## ❓ Key Questions to Answer

1. **Do you want the Lovable app to be what's deployed to wfd-compliance.org?**
   - If YES → Use the Lovable project code
   - If NO → Keep the simple HTML

2. **Should Lovable continue to work with the original repo?**
   - If YES → Keep EssenceAlignment/WFD-Sunrise-Path
   - If NO → Migrate to Recovery-Compass/wfd-sunrise-path

3. **Do you want to move away from Google Drive for development?**
   - If YES → Migrate to /Projects/active/
   - If NO → Keep the symlink structure

## 🎨 What Lovable Has vs What We Created

### Lovable Project Contains:
- Full Next.js/React application
- Database integrations
- Authentication system
- Complex UI components
- API endpoints

### New Simple HTML Contains:
- Single index.html file
- Basic landing page
- No functionality
- Just branding

## ⚡ Quick Fix Path

To deploy the Lovable app to wfd-compliance.org:

```bash
# 1. Remove the simple version
rm -rf /Users/ericjones/Projects/active/wfd-sunrise-path

# 2. Create proper active directory from Lovable
cp -R /Users/ericjones/Projects/wfd-sunrise-path \
     /Users/ericjones/Projects/active/wfd-sunrise-path

# 3. Update git remote
cd /Users/ericjones/Projects/active/wfd-sunrise-path
git remote set-url origin https://github.com/Recovery-Compass/wfd-sunrise-path.git

# 4. Force push Lovable code
git push origin main --force

# 5. Connect AWS Amplify to this
```

## 🚨 Important Notes

- **Data Loss Risk**: Be careful not to lose the Lovable application code
- **Lovable Sync**: Changing repos might break Lovable.app integration
- **Google Drive Issues**: The timeout errors suggest Google Drive sync problems
- **Two Different Apps**: The simple HTML and Lovable app are completely different

---

**RECOMMENDATION**: Use the Lovable project code for wfd-compliance.org deployment. The simple HTML was just a placeholder. The real value is in the full application that Lovable built.
