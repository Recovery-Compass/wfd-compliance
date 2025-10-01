# 🎯 AI Context Alignment - Recovery Compass Projects

> **IMPORTANT**: This is the primary context file for AI assistants. Always read this first when starting a new session.

## Quick Start for New AI Sessions

If you're a new AI assistant starting a fresh chat, follow these steps:

1. **Read this file first** - Located at `~/Projects/AI_CONTEXT_ALIGNMENT.md`
2. **Check the Organization Guide** - `~/Projects/REPOSITORY_ORGANIZATION_GUIDE.md`
3. **Review recent commits** in the main repository
4. **Check project status** using the provided commands

## Current Project Status (Updated: January 30, 2025)

### 🚀 Active Project: MCP Funding Automation System

**Location**: `~/Projects/wfd-sunrise-path/WFD-Sunrise-Path/`
**Status**: ✅ Fully implemented and operational
**Last Update**: Added Airtable/Perplexity MCP integration

#### Key Components:
```bash
# Main automation scripts
scripts/populate_funding_dashboard_mcp.py    # Primary MCP automation
scripts/perplexity_to_airtable_sync.py      # Perplexity → Airtable sync
scripts/check_and_populate_airtable.py      # Validation tool

# Documentation
AIRTABLE_PERPLEXITY_MCP_INTEGRATION.md      # Integration guide
RECOVERY_COMPASS_AIRTABLE_SCHEMA.md         # Database schema
FUNDING_DASHBOARD_POPULATION_COMPLETE.md     # Implementation status
```

### 📁 Repository Structure

```
~/Projects/
├── Recovery Compass/                 # Main organization repo (clean)
├── recovery-compass-journeys/        # Journey tracking (Testing branch)
├── recovery-compass.github.io/       # Public website (clean)
├── wfd-sunrise-path/
│   └── WFD-Sunrise-Path/            # 🎯 FUNDING AUTOMATION HERE
├── REPOSITORY_ORGANIZATION_GUIDE.md  # Detailed repo guide
├── AI_CONTEXT_ALIGNMENT.md          # This file
└── cleanup_and_optimize.sh          # Maintenance script
```

## Critical Information for New Sessions

### 1. **MCP Server Configuration**
- Airtable MCP server is configured and operational
- API keys stored in system keychain (not in files)
- Configuration location: `~/Library/Application Support/Claude/claude_desktop_config.json`

### 2. **Funding Dashboard Architecture**
```
Perplexity API → Discovery Script → Airtable Database → Dashboard Views
                                         ↓
                                   MCP Server Access
```

### 3. **Current Priorities**
1. ✅ MCP integration complete
2. ✅ Funding dashboard automated
3. ⏳ Daily automation runs scheduled
4. 🎯 Next: Monitor and optimize discovery

### 4. **Quick Commands for Status Check**

```bash
# Check all repository statuses
cd ~/Projects
for repo in */; do
    if [ -d "$repo/.git" ]; then
        echo "=== $repo ==="
        cd "$repo" && git status --short
        cd ..
    fi
done

# Check funding automation status
cd ~/Projects/wfd-sunrise-path/WFD-Sunrise-Path
python scripts/check_and_populate_airtable.py

# Run cleanup
~/Projects/cleanup_and_optimize.sh
```

## Essential Context Points

### What We're Building
Recovery Compass is a 501(c)(3) nonprofit focused on addiction recovery support. The funding automation system helps discover and track grant opportunities automatically.

### Technical Stack
- **Frontend**: Airtable (database + UI)
- **Backend**: Python scripts + MCP servers
- **Discovery**: Perplexity API
- **Integration**: Claude Desktop MCP

### Recent Achievements
- Implemented complete MCP integration
- Automated funding discovery pipeline
- Created 60+ funding opportunities in Airtable
- Established daily automation workflow

### Known Issues & Solutions
1. **Node modules removed** - Run `npm install` when needed
2. **Python venv removed** - Create with `python -m venv venv`
3. **Cache files cleaned** - This is intentional for optimization

## Instructions for New AI Assistant

When starting a new chat about Recovery Compass:

1. **First Response Template**:
```
I've reviewed the context alignment at ~/Projects/AI_CONTEXT_ALIGNMENT.md.
I understand you're working on the Recovery Compass funding automation system
located in ~/Projects/wfd-sunrise-path/WFD-Sunrise-Path/.

Current status: MCP integration complete, funding dashboard operational.

How can I help you continue this work?
```

2. **Always Check**:
   - Recent commits in WFD-Sunrise-Path
   - Status of Airtable integration
   - Any error logs in scripts/

3. **Key Files to Reference**:
   - `STRATEGIC_ACTION_PLAN_ERD_2025.md` - Overall strategy
   - `FUNDING_DASHBOARD_POPULATION_COMPLETE.md` - Implementation details
   - `scripts/populate_funding_dashboard_mcp.py` - Main automation

## Maintenance Schedule

- **Daily**: Funding discovery runs automatically
- **Weekly**: Run cleanup_and_optimize.sh
- **Monthly**: Review and update this context file

---

**Remember**: This file ensures continuity across AI sessions. Always start here for complete context alignment.
