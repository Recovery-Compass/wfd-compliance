# Recovery Compass Repository Organization Guide

## Overview
This guide documents the organization of all Recovery Compass related repositories and the funding opportunities automation system.

## Main Repository Locations

### 1. **Recovery Compass** (`~/Projects/Recovery Compass/`)
- **Purpose**: Main Recovery Compass organization repository
- **Status**: Clean, operational
- **Key Contents**: Core organization documents and planning

### 2. **recovery-compass-journeys** (`~/Projects/recovery-compass-journeys/`)
- **Purpose**: Journey management and tracking system
- **Status**: On Testing branch, operational
- **Key Contents**:
  - Journey tracking application
  - User experience flows
  - Recovery pathway management

### 3. **recovery-compass.github.io** (`~/Projects/recovery-compass.github.io/`)
- **Purpose**: GitHub Pages website
- **Status**: Clean, operational
- **Key Contents**: Public-facing website and documentation

### 4. **WFD-Sunrise-Path** (`~/Projects/wfd-sunrise-path/WFD-Sunrise-Path/`)
- **Purpose**: Workforce Development - Sunrise Path project
- **Status**: Recently updated with MCP integration
- **Key Contents**:
  - **Airtable/Perplexity MCP Integration** ✨
  - **Funding Dashboard Automation Scripts** ✨
  - Grant application tracking
  - Funding opportunity discovery

## MCP Server Funding Automation Architecture

### Core Components Location
All funding automation components are in: `~/Projects/wfd-sunrise-path/WFD-Sunrise-Path/`

### Key Files:
```
scripts/
├── populate_funding_dashboard_mcp.py     # Main MCP automation script
├── populate_funding_dashboard.py         # Dashboard population script
├── populate_airtable_funding.py         # Airtable sync script
├── perplexity_to_airtable_sync.py      # Perplexity integration
├── check_and_populate_airtable.py      # Validation script
└── setup_airtable_mcp.sh               # Setup script

Documentation:
├── AIRTABLE_PERPLEXITY_MCP_INTEGRATION.md
├── RECOVERY_COMPASS_AIRTABLE_SCHEMA.md
├── MCP_AIRTABLE_PERPLEXITY_SETUP_COMPLETE.md
└── FUNDING_DASHBOARD_POPULATION_COMPLETE.md
```

## Development Best Practices

### 1. **Dependency Management**
- `node_modules/` directories have been removed to save space
- Run `npm install` when you need to work on a project
- Python virtual environments should be created as needed with `python -m venv venv`

### 2. **Keep Repositories Clean**
- .DS_Store files are automatically removed
- Python cache (__pycache__, *.pyc) is cleaned up
- Test coverage and log files are removed

### 3. **Regular Maintenance Commands**
```bash
# Clean up unnecessary files
find ~/Projects -name ".DS_Store" -delete
find ~/Projects -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find ~/Projects -type f -name "*.pyc" -delete

# Check repository sizes
cd ~/Projects && du -sh * | sort -hr

# Check git status across all repos
for repo in ~/Projects/*/; do
    if [ -d "$repo/.git" ]; then
        echo "=== $repo ==="
        cd "$repo" && git status --short
    fi
done
```

## Quick Access Commands

### Working with the Funding Dashboard
```bash
cd ~/Projects/wfd-sunrise-path/WFD-Sunrise-Path
python scripts/populate_funding_dashboard_mcp.py
```

### Checking Airtable Sync
```bash
cd ~/Projects/wfd-sunrise-path/WFD-Sunrise-Path
python scripts/check_and_populate_airtable.py
```

## Resource Optimization

### Disk Space Saved:
- Removed Python venv: 389MB
- Removed node_modules: 1.2GB+
- Removed cache files: ~50MB
- **Total Saved: ~1.6GB**

### Memory Optimization:
- VS Code extensions cleaned up
- Unnecessary background processes identified
- Cache directories removed

## Future Maintenance

1. **Weekly**: Run cleanup commands
2. **Before commits**: Ensure no cache files are included
3. **After cloning**: Add appropriate .gitignore files
4. **When switching projects**: Remove node_modules if not actively developing

---

Updated: January 30, 2025
