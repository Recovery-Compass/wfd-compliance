# Recovery Compass Hybrid Development Strategy
## Structured Approach for Google Drive + Local Development

---

## 🎯 **Core Philosophy Alignment**

### **Why This Hybrid Approach Serves Recovery Compass**

1. **SCL (Seismic/Crystal/Lava) Leverage**
   - **Seismic:** Transforms isolated dev into unified ecosystem
   - **Crystal:** Single source of truth accessible from anywhere
   - **Lava:** Natural distribution without friction

2. **Soft Power Implementation**
   - Work is discoverable without "pushing"
   - Excellence visible to stakeholders organically
   - Collaboration happens through presence, not promotion

3. **State of Abundance**
   - No scarcity mindset about storage or access
   - Work persists beyond any single machine
   - Team can access resources without asking

---

## 📁 **Directory Structure**

```
~/Projects/                           # LOCAL ACTIVE DEVELOPMENT
├── active/                          # Currently working on
│   ├── wfd-sunrise-path/           # Hot development
│   ├── recovery-compass/            # Active iterations
│   └── client-projects/             # In-progress work
│
├── staging/                         # Ready for sync
│   └── [projects ready to archive]
│
└── .sync-config/                    # Sync configurations
    ├── .driveignore                 # What NOT to sync
    └── sync-rules.json              # Selective sync rules

~/Library/CloudStorage/GoogleDrive/  # CLOUD BACKUP & ARCHIVE
├── 📁 Projects/
│   ├── Active-Mirror/               # Selective sync from ~/Projects
│   ├── Archives/                    # Completed projects
│   ├── Templates/                   # Reusable starters
│   └── Resources/                   # Docs, designs, assets
```

---

## 🛠️ **Implementation Plan**

### **Step 1: Set Up Local Development Root**
```bash
# Create structured local environment
mkdir -p ~/Projects/{active,staging,.sync-config}
mkdir -p ~/Projects/active/{recovery-compass,client-work,experiments}
```

### **Step 2: Configure Smart Sync Rules**

Create `~/Projects/.sync-config/.driveignore`:
```gitignore
# Development artifacts
node_modules/
.next/
dist/
build/
out/
.cache/
coverage/

# Environment and secrets
.env*
*.key
*.pem
*.p12
secrets/

# Version control (Git handles this)
.git/
.svn/
.hg/

# IDE and system
.idea/
.vscode/workspace*
*.swp
.DS_Store
Thumbs.db

# Large binaries
*.dmg
*.iso
*.tar.gz
*.zip
*.rar

# Logs and temporary
*.log
logs/
tmp/
temp/
*.tmp

# Database files
*.sqlite
*.db
*.mdb
```

### **Step 3: Create Sync Automation Script**

Create `~/Projects/.sync-config/smart-sync.sh`:
```bash
#!/bin/bash

# Recovery Compass Smart Sync Script
# Aligns with principles: SCL leverage, Soft Power, State of Abundance

PROJECTS_DIR="$HOME/Projects/active"
DRIVE_DIR="$HOME/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/Active-Mirror"
ARCHIVE_DIR="$HOME/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/Archives"

# Function to sync with exclusions
sync_project() {
    local project=$1
    echo "🔄 Syncing $project (Recovery Compass principle: State of Abundance)"
    
    rsync -av --delete \
        --exclude-from="$HOME/Projects/.sync-config/.driveignore" \
        "$PROJECTS_DIR/$project/" \
        "$DRIVE_DIR/$project/" \
        --itemize-changes
}

# Function to archive completed project
archive_project() {
    local project=$1
    local timestamp=$(date +%Y%m%d)
    
    echo "📦 Archiving $project to Google Drive"
    tar -czf "$ARCHIVE_DIR/${project}_${timestamp}.tar.gz" \
        --exclude-from="$HOME/Projects/.sync-config/.driveignore" \
        "$PROJECTS_DIR/$project"
    
    echo "✅ Archived: ${project}_${timestamp}.tar.gz"
}

# Main sync operation
echo "🚀 Recovery Compass Hybrid Sync Starting..."
echo "   Principle: Maintaining State of Abundance through redundancy"

for project in "$PROJECTS_DIR"/*; do
    if [ -d "$project" ]; then
        project_name=$(basename "$project")
        sync_project "$project_name"
    fi
done

echo "✨ Sync complete - Soft Power enabled through accessibility"
```

### **Step 4: Git Hooks for Automatic Sync**

Create `~/Projects/.sync-config/post-commit-hook.sh`:
```bash
#!/bin/bash
# Auto-sync on git commits (Soft Power principle)

PROJECT_NAME=$(basename $(git rev-parse --show-toplevel))
SYNC_SCRIPT="$HOME/Projects/.sync-config/smart-sync.sh"

echo "🔄 Triggering Recovery Compass sync for $PROJECT_NAME"
bash $SYNC_SCRIPT
```

---

## 🔐 **Safety Mechanisms**

### **1. Prevent Corruption**
- Never sync `.git` directories to avoid conflicts
- Use file locks during active development
- Implement versioning in Drive for rollback

### **2. Performance Protection**
- Keep `node_modules` local only
- Use `.driveignore` religiously
- Monitor Drive CPU/bandwidth usage

### **3. Backup Strategy**
```bash
# Weekly full backup to Drive Archives
0 2 * * 0 /Users/ericjones/Projects/.sync-config/weekly-archive.sh

# Daily incremental sync of active projects
0 */4 * * * /Users/ericjones/Projects/.sync-config/smart-sync.sh
```

---

## 🚀 **Quick Start Commands**

```bash
# Initialize a new project with proper structure
new-rc-project() {
    mkdir -p ~/Projects/active/$1
    cd ~/Projects/active/$1
    git init
    cp ~/Projects/.sync-config/.driveignore .gitignore
    echo "# $1" > README.md
    echo "Recovery Compass Project - Created $(date)" >> README.md
}

# Move project to archive when complete
archive-rc-project() {
    bash ~/Projects/.sync-config/smart-sync.sh archive $1
    mv ~/Projects/active/$1 ~/Projects/staging/
}

# Check sync status
sync-status() {
    echo "📊 Recovery Compass Sync Status"
    echo "Active Projects: $(ls -1 ~/Projects/active | wc -l)"
    echo "Drive Mirror: $(ls -1 "$HOME/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/Active-Mirror" | wc -l)"
    echo "Archives: $(ls -1 "$HOME/Library/CloudStorage/GoogleDrive-eric@recovery-compass.org/My Drive/📁 Projects/Archives/*.tar.gz" | wc -l)"
}
```

---

## 💡 **Best Practices**

### **Daily Workflow**
1. Work in `~/Projects/active/` for all development
2. Commit to Git frequently (triggers selective sync)
3. Let automation handle Drive backups
4. Share Drive links for collaboration (Soft Power)

### **Project Lifecycle**
1. **Create:** `new-rc-project project-name`
2. **Develop:** Work locally with full speed
3. **Sync:** Automatic via git hooks or manual `smart-sync`
4. **Share:** Send Drive link to stakeholders
5. **Archive:** `archive-rc-project project-name` when done

### **Collaboration Pattern**
- Dev happens local (you)
- Viewing happens via Drive (stakeholders)
- Code review via GitHub
- Documents/assets in Drive Resources folder

---

## 🎯 **Success Metrics**

✅ **Technical Success:**
- Zero sync conflicts
- No performance degradation
- Git integrity maintained
- Automatic backups working

✅ **Principle Alignment:**
- SCL leverage through unified structure
- Soft Power via discoverable excellence
- State of Abundance with redundant backups
- Collaborative without friction

---

## 📞 **Troubleshooting**

**Issue:** Sync conflict detected
**Solution:** Local always wins, Drive is read-only mirror

**Issue:** Performance slow
**Solution:** Check `.driveignore`, ensure node_modules excluded

**Issue:** Git corruption
**Solution:** Never sync .git folder, use GitHub as source of truth

---

*This strategy ensures Recovery Compass principles guide technical decisions while maintaining professional development standards.*
