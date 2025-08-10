# Ops Profile — Solo Dev, Low Traffic (WFD Sunrise Path)

## Intent
- Solo founder/dev. Optimize for **clarity and speed**, not scale.
- Ship static/Vite SPA for the web. No SSR, no microservices, no queues.
- One AWS Amplify app, one **prod** env. Optional single **preview** env.
- Cloudflare used for **DNS/CDN only** unless a narrowly defined need arises.
- Secrets live only in Amplify env vars. Never in repo.

## Build/Deploy Standard
- Tooling: **Vite + React + TS**
- Build: `npm ci && npm run build` → output **`dist/`**
- Host: AWS Amplify (connects to GitHub `main`)
- Cache/CDN: Cloudflare via proxied CNAME

## Acceptable Changes (default deny)
- Add deps **only with a one-line reason** in PR.
- Add new services (Workers, Lambdas, DBs) **only with a clear problem statement** + rollback.
- CI is **Amplify only**. Extra GitHub Actions require justification.

## Environments
- `prod` only (preview optional). No staging unless traffic/user need appears.

## Security
- `.env*` never committed. Push protection stays ON.
- Don't auto-generate infra from AI without human review/PR.

## Definition of Done (web)
- Build succeeds; `dist/` created
- Amplify deploy green
- Site loads under Cloudflare with HTTPS
- No new secrets, no new infra, no extra CI added
