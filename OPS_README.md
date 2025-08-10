# WFD Sunrise Path - Operations Quick Reference

## 🎯 Solo-Dev Profile Active
This project follows a **solo-dev, low-traffic** operational posture optimized for clarity and speed.

## ✅ Quick Checks
```bash
# Verify guardrails compliance
npm run verify:solo

# Check Amplify deployment status
./scripts/check-amplify-status.sh
```

## 📁 Key Files
- `OPS_PROFILE.md` - Human-readable operating principles
- `GUARDRAILS.yaml` - Machine-readable constraints for AI tools
- `scripts/verify-guardrails.sh` - Automated compliance checks
- `.nvmrc` - Node v20 LTS pinning

## 🚀 Deployment
- **Provider**: AWS Amplify (auto-deploys from `main` branch)
- **Build Output**: `dist/` directory
- **CDN**: Cloudflare (DNS/CDN only, no Workers)
- **Environments**: Production only (preview optional)

## 🔒 Security Rules
- No `.env` files in repo (use Amplify env vars)
- No direct infrastructure changes without PR review
- No additional CI/CD beyond Amplify

## 🛠 Development Standards
- **Stack**: Vite + React + TypeScript
- **Node**: v18 or v20 (enforced via engines)
- **Dependencies**: Minimize, document reason in PR
- **Build**: `npm ci && npm run build` → `dist/`

## 📊 Current Status
- ✅ Guardrails in place
- ✅ Node engines pinned
- ✅ Amplify configured for `dist/` output
- ✅ `.gitignore` properly configured
- ✅ Build system aligned with Vite SPA

## 🚨 For AI Tools & MCP Servers
**READ FIRST**: `GUARDRAILS.yaml` and `OPS_PROFILE.md`
- Can: Read context, open PRs
- Cannot: Push to main, create infra, modify DNS
- Require `rc-approve` label for: Workers, Serverless, new CI

---
*Last updated: 2025-01-10*
