# Recovery Compass AI Context Usage Guide

## Overview
This guide explains how to use the AI context files generated for Recovery Compass projects to enhance your development workflow across different AI tools.

## Generated Context Files

### 1. WFD-Sunrise-Path
- **Location**: `/Users/ericjones/Projects/wfd-sunrise-path/WFD-Sunrise-Path/ai-context.xml`
- **Size**: 333,561 tokens
- **Contents**: 257 files including Manus documentation, MCP server integration, and Airtable schemas

### 2. Recovery Compass Compliance
- **Location**: `/Users/ericjones/Projects/recovery-compass-compliance/ai-context.xml`
- **Size**: 257,176 tokens
- **Contents**: 180 files including comprehensive MCP server documentation and implementation guides

### 3. Recovery Compass GitHub.io
- **Location**: `/Users/ericjones/Projects/recovery-compass.github.io/ai-context.xml`
- **Size**: 2,126 tokens
- **Contents**: Agent team templates and AI context configurations

## How to Use AI Context Files

### With ChatGPT
1. Open ChatGPT web interface
2. Start a new conversation
3. Copy the contents of `ai-context.xml`
4. Paste with a prompt like:
   ```
   Here's the context for my Recovery Compass project:
   [paste ai-context.xml content]
   
   Now, help me [your specific task]
   ```

### With Claude
1. Open Claude.ai
2. Create a new conversation
3. Upload the `ai-context.xml` file directly or paste its contents
4. Claude will automatically understand the project structure

### With Gemini
1. Access Google Gemini
2. Use the large context window advantage
3. Paste the entire `ai-context.xml` content
4. Ask complex cross-file questions about your codebase

### With Cursor/IDE
1. Your IDE already has context, but you can:
2. Reference the `ai-context.xml` for documentation
3. Use it to generate comprehensive project overviews

## Quick Update Commands

### Update Single Project
```bash
cd /Users/ericjones/Projects/[project-name]
npx repomix
```

### Update All Projects
```bash
/Users/ericjones/Projects/update-ai-contexts.sh
```

## Best Practices

### 1. Context Switching
- Keep ai-context.xml files up to date before major development sessions
- Use compressed format to maximize token efficiency
- Consider creating specialized contexts for specific features

### 2. Model Selection
- **ChatGPT**: Best for quick logic questions and code generation
- **Claude**: Excellent for research and architectural decisions
- **Gemini**: Ideal for large context analysis and cross-file queries
- **Cursor**: Use for real-time coding with context

### 3. Prompt Engineering with Context
```
Given the Recovery Compass codebase context above, please:
1. [Specific task]
2. Consider the existing patterns in [specific files]
3. Maintain consistency with our [architectural decisions/coding standards]
```

### 4. Advanced Use Cases

#### Cross-Project Analysis
```bash
# Combine multiple contexts
cat wfd-sunrise-path/WFD-Sunrise-Path/ai-context.xml \
    recovery-compass-compliance/ai-context.xml > combined-context.xml
```

#### Feature-Specific Context
```bash
# Create focused context for specific features
cd /Users/ericjones/Projects/recovery-compass-compliance
npx repomix -o grant-system-context.xml --include "**/*grant*" --compress
```

#### Documentation Generation
Use the context to auto-generate:
- API documentation
- Architecture diagrams
- Onboarding guides
- Feature specifications

## Configuration Customization

Each project has a `repomix.config.json` that can be customized:

```json
{
  "output": {
    "filePath": "ai-context.xml",
    "compress": true
  },
  "include": [
    "src/**/*.ts",
    "**/*.md"
  ],
  "ignore": [
    "node_modules",
    "dist"
  ]
}
```

## Workflow Integration

### Pre-commit Hook
```bash
# Add to .git/hooks/pre-commit
#!/bin/bash
npx repomix
git add ai-context.xml
```

### CI/CD Integration
- Generate context files as part of documentation builds
- Use for automated code reviews
- Create project snapshots for each release

## Recovery Compass Specific Optimizations

### 1. Airtable Integration Context
Focus on MCP server patterns and Airtable schemas:
```bash
npx repomix -o airtable-context.xml --include "**/*airtable*,**/*mcp*" --compress
```

### 2. Grant System Context
For grant-related development:
```bash
npx repomix -o grant-context.xml --include "**/*grant*,**/*funding*" --compress
```

### 3. Compliance Documentation
For regulatory and compliance work:
```bash
npx repomix -o compliance-context.xml --include "**/*compliance*,**/*hipaa*" --compress
```

## Troubleshooting

### Token Limit Issues
- Use `--compress` flag
- Create feature-specific contexts
- Split large projects into modules

### File Inclusion Problems
- Check your `repomix.config.json`
- Verify glob patterns
- Use `--verbose` for debugging

### Performance
- Exclude large binary files
- Ignore generated directories
- Use `.repomixignore` for complex patterns

## Next Steps

1. **Automate Updates**: Set up cron job or git hooks
2. **Team Sharing**: Create shared context repository
3. **Context Versioning**: Track context changes over time
4. **Custom Instructions**: Add project-specific AI instructions

---

*Remember: The power of AI context files lies in keeping them current and using them consistently across all your AI-assisted development workflows.*
