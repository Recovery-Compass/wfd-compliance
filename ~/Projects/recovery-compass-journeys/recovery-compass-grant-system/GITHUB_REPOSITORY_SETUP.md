# GitHub Repository Setup Guide for Recovery Compass Grant System

## 1. Create GitHub Repository

### Manual Steps Required:
1. Go to https://github.com/new
2. Repository name: `recovery-compass-grant-system`
3. Set as **Private** repository
4. Do NOT initialize with README (we already have content)
5. Click "Create repository"

### Push Local Repository:
Once created, run these commands:
```bash
cd ~/Projects/recovery-compass-journeys/recovery-compass-grant-system
git push -u origin main
```

## 2. Enable Security Features

### Secret Scanning & Push Protection:
1. Navigate to repository **Settings** → **Code security**
2. Enable:
   - ✅ **Secret scanning** - Scans for exposed secrets
   - ✅ **Push protection** - Blocks commits with secrets
   - ✅ **Dependabot alerts** - Security vulnerability monitoring

### Add Repository Secret:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add new secret:
   - Name: `GHAS_SECRET_SCANNING`
   - Value: `true`

## 3. Configure Branch Protection

### Main Branch Protection:
1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass:
     - `Grant-System CI / Security & Secret Scanning`
     - `Grant-System CI / Alignment & Abundance Tests`
     - `Grant-System CI / Integration Tests`
   - ✅ Require branches to be up to date
   - ✅ Include administrators

## 4. Integration Configuration

### Pattern-Insight Engine:
- Configuration: `pattern_insight_config.yml`
- Adds grant documents to vector DB
- Tags discoveries with `#GRANT:NEW`
- Surfaces opportunities with score > 0.75

### Metrics Relay:
- Exports: `grant_pipeline_fill`, `grant_success_probability`
- Updates hourly to `grant_metrics.csv`
- Integrates with main system metrics

### CI/CD Pipeline:
- Workflow: `.github/workflows/ci.yml`
- Runs on every push and PR
- Enforces:
  - Secret scanning (TruffleHog)
  - Abundance language check
  - Alignment verification
  - Integration tests

## 5. Verification Checklist

| Task | Command/Location | Expected Result |
|------|------------------|-----------------|
| Repository exists | `git remote -v` | Shows GitHub URL |
| Push successful | `git push origin main` | 109 files uploaded |
| Secret scanning | Settings → Security | Enabled, 0 alerts |
| CI pipeline | Actions tab | Green checkmarks |
| Branch protection | Settings → Branches | Main protected |

## 6. Metrics Impact

After integration, expect:
- `pattern_depth` increase: +0.05 to 0.07
- New metric: `grant_pipeline_fill`
- `insight_latency` maintained < 15m
- `alignment_score` maintained > 0.90

## 7. Next Steps

1. Create repository on GitHub
2. Push code: `git push -u origin main`
3. Configure security settings
4. Verify CI pipeline runs
5. Monitor metrics impact

---

**Note**: The repository is already configured locally with:
- Remote URL set
- CI/CD workflow created
- Pattern-Insight integration configured
- All code committed locally

You just need to create the repository on GitHub and push!
