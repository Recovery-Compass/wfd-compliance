# System of Record - WFD Compliance Platform

## Canonical Source
**GitHub Repository**: `Recovery-Compass/wfd-sunrise-path`
**Branch**: `main`
**URL**: https://github.com/Recovery-Compass/wfd-sunrise-path

## Data Flow Architecture

```
┌─────────────────┐
│  Lovable.app    │ (Development Environment)
└────────┬────────┘
         │ sync-from-lovable.sh
         ▼
┌─────────────────┐
│ Local Active    │ ~/Projects/active/wfd-sunrise-path
└────────┬────────┘
         │ git push
         ▼
┌─────────────────┐
│ GitHub (main)   │ Recovery-Compass/wfd-sunrise-path ← SYSTEM OF RECORD
└────────┬────────┘
         │ webhook
         ▼
┌─────────────────┐
│ AWS Amplify     │ Continuous Deployment
└────────┬────────┘
         │ deploy
         ▼
┌─────────────────┐
│ Cloudflare CDN  │ wfd-compliance.org
└─────────────────┘
```

## Authority Hierarchy

1. **Production Truth**: `main` branch in GitHub
2. **Development Truth**: Lovable.app project
3. **Deployment Truth**: AWS Amplify build artifacts
4. **Edge Truth**: Cloudflare cached content

## Change Management

### Code Changes
- All changes MUST go through pull request review
- Direct pushes to `main` are blocked (except for emergency hotfixes with dual approval)
- Automated tests must pass before merge

### Configuration Changes
- Environment variables: Set in AWS Amplify console only
- DNS changes: Require Cloudflare admin approval
- Security policies: Require security team review

### Emergency Procedures
- Hotfix branch: `hotfix/*` can bypass some checks with admin override
- Rollback: Use AWS Amplify's deployment history
- Cache clear: Cloudflare purge with API token

## Compliance Notes

- This repository is the authoritative source for SOC2/HIPAA audit trails
- All commits are signed and verified
- Deployment logs are retained for 90 days minimum
- Security scanning occurs on every push

## Contact

- **Repository Owner**: @ericjones
- **Technical Lead**: Recovery-Compass/admins
- **Security Issues**: security@recovery-compass.org

---
*Last Updated: August 10, 2025*
*Version: 1.0.0*
