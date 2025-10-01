# Migration Plan: Google Drive to Hybrid Approach

## 🎯 Current State

You have projects currently in:
- Google Drive: `~/Library/CloudStorage/GoogleDrive.../📁 Projects/`
- Local symlinks in `~/Projects/`

## 📋 Migration Steps

### Step 1: Migrate WFD-Sunrise-Path (Currently Symlinked)

```bash
# Remove the symlink
rm ~/Projects/wfd-sunrise-path

# Copy project to active directory (excluding problem files)
rsync -av --exclude-from="$HOME/Projects/.sync-config/.driveignore" \
  "/Users/ericjones/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/wfd-sunrise-path/WFD-Sunrise-Path/" \
  "$HOME/Projects/active/wfd-sunrise-path/"

# Navigate to the project
cd ~/Projects/active/wfd-sunrise-path

# Ensure git is properly initialized
git status

# If needed, reinitialize git
# git init
# git add .
# git commit -m "Migrated from Google Drive"
```

### Step 2: Migrate Other Active Projects

For each project in `~/Projects/` that's currently active:

```bash
# Example for recovery-compass project
rsync -av --exclude-from="$HOME/Projects/.sync-config/.driveignore" \
  ~/Projects/recovery-compass/ \
  ~/Projects/active/recovery-compass/

# Move the original to staging if not needed
mv ~/Projects/recovery-compass ~/Projects/staging/
```

### Step 3: Setup Automated Sync

```bash
# Test the sync
bash ~/Projects/.sync-config/smart-sync.sh sync

# Add to crontab for automatic sync every 4 hours
(crontab -l 2>/dev/null; echo "0 */4 * * * /Users/ericjones/Projects/.sync-config/smart-sync.sh sync") | crontab -
```

### Step 4: Configure Git Hooks (Optional)

For automatic sync on commits:

```bash
# For each project
cd ~/Projects/active/PROJECT_NAME

# Create post-commit hook
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
echo "🔄 Triggering Recovery Compass sync..."
bash $HOME/Projects/.sync-config/smart-sync.sh sync
EOF

chmod +x .git/hooks/post-commit
```

## 🔄 Recommended Migration Order

1. **Start with test project** - Create a small test project first
   ```bash
   source ~/.zshrc  # Load the new functions
   rc-new test-project
   rc-commit "Test commit"
   ```

2. **Migrate active development projects**
   - wfd-sunrise-path
   - recovery-compass
   - recovery-compass-funding-mcp

3. **Archive completed projects**
   - Move to Archives in Google Drive

4. **Clean up old structure**
   - Remove symlinks
   - Organize remaining files

## ⚠️ Important Considerations

### Before Migration:
- [ ] Commit all pending changes in Git
- [ ] Make a backup of critical projects
- [ ] Document any project-specific build requirements

### During Migration:
- [ ] Verify `.git` folders are intact
- [ ] Check that `node_modules` are NOT synced
- [ ] Ensure environment files are properly ignored

### After Migration:
- [ ] Test build processes work locally
- [ ] Verify Drive sync excludes large files
- [ ] Confirm Git operations work normally

## 🎯 Success Criteria

✅ **Technical Success:**
- All projects build and run locally
- Git history preserved
- No sync conflicts
- Performance improved

✅ **Principle Alignment:**
- Drive contains clean, shareable mirrors
- Local development is fast and unencumbered
- Stakeholders can access work via Drive links
- Automatic backups working

## 📝 Quick Reference

After migration, your workflow will be:

```bash
# Daily workflow
rc-go project-name        # Navigate to project
# ... do work ...
rc-commit "Description"   # Commit and sync

# Project management
rc-list                   # See all projects
rc-status                 # Check sync status
rc-archive project-name   # Archive when done

# New projects
rc-new new-project        # Create new project
```

## 🚨 Rollback Plan

If issues arise:

1. **Projects remain in Google Drive** - Nothing is deleted
2. **Original structure preserved** in `~/Projects/staging/`
3. **Can recreate symlinks** if needed:
   ```bash
   ln -s "/path/in/google/drive" ~/Projects/project-name
   ```

---

*Take your time with migration. Start with one test project to ensure everything works as expected.*
