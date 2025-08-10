# Privacy & Data Handling Policy

## Data Classification

### Public Data
- Marketing content
- Public documentation
- Open source code

### Internal Data
- Development logs
- Performance metrics
- Non-sensitive configurations

### Confidential Data
- User PII (names, emails, addresses)
- API keys and secrets
- Authentication tokens
- Session data

### Restricted Data
- PHI (Protected Health Information)
- Financial records
- Recovery program participant data
- SSN/TIN information

## Data Handling Rules

### Never Commit to Git
- `.env` files
- API keys or tokens
- User passwords
- PII or PHI
- Database connection strings
- Private certificates

### Logging Policies
- **Production logs**: No PII/PHI, redact sensitive fields
- **Error tracking**: Strip user context before sending
- **Analytics**: Use anonymized identifiers only
- **Audit logs**: Store separately with encryption

### Data Retention
- **User data**: As per user agreement (typically 7 years)
- **Logs**: 90 days rolling window
- **Backups**: 30 days for operational, 1 year for compliance
- **Analytics**: Aggregated data only after 30 days

## Environment-Specific Rules

### Development
- Use synthetic/test data only
- No production data in local environments
- Clear local storage regularly

### Staging
- Sanitized production data allowed
- PII must be anonymized
- Access restricted to authorized developers

### Production
- All data encrypted at rest and in transit
- Access logged and audited
- Principle of least privilege enforced

## Cloudflare Privacy Settings

```javascript
// Required headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()

// Cookie settings
Set-Cookie: [name]=[value]; Secure; HttpOnly; SameSite=Strict
```

## AWS Amplify Environment Variables

### Allowed in Environment
- `NODE_ENV`
- `NEXT_PUBLIC_API_URL` (public endpoints only)
- `NEXT_PUBLIC_APP_NAME`

### Must Use Secrets Manager
- Database credentials
- Third-party API keys
- Encryption keys
- OAuth secrets

## MCP and AI Context Rules

### Never Share with AI
- Real user data
- Actual API keys
- Production database schemas with sensitive fields
- Internal security procedures

### Safe to Share
- Anonymized data structures
- Public API documentation
- General architecture patterns
- Sanitized error messages

## GDPR/CCPA Compliance

- Right to access: Implement data export
- Right to deletion: Soft delete with purge after 30 days
- Data portability: JSON export format
- Consent tracking: Explicit opt-in required

## Incident Response

1. **Detection**: Monitor for exposed secrets via GitHub scanning
2. **Containment**: Rotate compromised credentials immediately
3. **Assessment**: Determine scope of exposure
4. **Notification**: Within 72 hours if breach confirmed
5. **Remediation**: Update security controls

## Audit Requirements

- Monthly review of access logs
- Quarterly privacy assessment
- Annual third-party security audit
- Continuous automated secret scanning

---
*Last Updated: August 10, 2025*
*Contact: privacy@recovery-compass.org*
