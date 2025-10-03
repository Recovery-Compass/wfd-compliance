# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview (big picture)
- Stack: Vite + React 18 + TypeScript; Tailwind CSS (custom design tokens); shadcn-ui components.
- Node: use Node 20 (see .nvmrc). Build output is dist/.
- Entry points: index.html boots the SPA and mounts src/main.tsx; React Router handles navigation.
- Feature flags: Engagement modules are toggled via VITE_FEATURE_* environment variables (see src/lib/featureFlags.ts). Content for these modules is read from public/content/*.json.
- Global error handling: src/components/ErrorBoundary.tsx wraps the router.
- Guardrails: See GUARDRAILS.yaml (Amplify-only hosting, Cloudflare as DNS/CDN only, minimal deps, Node ^18 or ^20).

Common commands
- Setup
  - nvm use
  - npm ci (or npm install)
- Develop
  - npm run dev  # Vite dev server on http://localhost:8080 (port set in vite.config.ts)
- Lint
  - npx eslint . --ext .ts,.tsx  # uses eslint.config.js (flat config)
- Type-check
  - npx tsc --noEmit -p tsconfig.app.json  # or npm run build to include tsc -b
- Build
  - npm run build  # tsc -b && vite build → dist/
- Preview
  - npm run preview  # Vite preview (default 4173)
  - npm run start    # Vite preview on port 8080
- Guardrails check
  - npm run verify:solo  # scripts/verify-guardrails.sh
- Optional: Doppler-run (if secrets are needed for local runs)
  - scripts/run-with-doppler.sh dev  # requires Doppler CLI + Bun + a Keychain-backed token helper ($HOME/bin/doppler-token.sh). Maps PUBLIC_* → VITE_PUBLIC_* at runtime. Avoid printing secrets.
- Tests
  - No test runner is configured in this repo; CI tolerates missing tests. There is currently no single-test command.

Environment & feature toggles
- The Engagement Hub and related pages respect the following Vite env flags. Set these in a local .env.local (non-committed):
  - VITE_FEATURE_DATA_STORY=1
  - VITE_FEATURE_WALL_OF_FAME=1
  - VITE_FEATURE_BADGES=1
  - VITE_FEATURE_PET_LEADERBOARD=1
  - VITE_FEATURE_LIVE_FEED=1
- Data for these pages loads from public/content/*.json (edit those files to change content shown in dev/preview/prod).

High-level architecture
- Routing: BrowserRouter in src/main.tsx defines the primary routes (/, /executive-dashboard, /august-dashboard, /opportunity-dashboard, /engage, /about-data, /engage/*, /wow, /impact-cards, and a catch-all NotFound).
- Pages: src/pages/* are self-contained views; the Engagement Hub (src/pages/EngageHub.tsx) conditionally exposes links based on featureFlags.
- Feature flags: src/lib/featureFlags.ts reads import.meta.env.VITE_FEATURE_* via a small helper, defaulting to false when unset.
- UI: src/components/ui/* are shadcn-ui primitives; domain-specific components live in src/components/ and src/components/executive/*.
- Styling: Tailwind is configured in tailwind.config.ts with design tokens; additional brand system lives in src/index.css and src/styles/rc-brand.css.
- Data & content: quick data scaffolding under src/data/*.ts and runtime JSON under public/content/*.json (polled by some pages like LiveFeed).
- Build config: vite.config.ts sets dev server to port 8080 and defines @ → ./src alias; tsconfig.* coordinate app/node settings.

CI and deployment notes (from repo files)
- GitHub Actions: .github/workflows/node20-ci.yml installs deps and runs lint/type-check/build if present. A second workflow file (ci-security.yml) contains conflict markers and should be cleaned before enabling.
- Hosting alignment: GUARDRAILS.yaml specifies Amplify as the hosting provider and dist/ as the artifact directory; Cloudflare is used for DNS/CDN only.

Cautions and footnotes
- scripts/dns-check.sh is referenced by the package.json script check:dns but is not present; treat it as TBD.
- deploy-wfd-compliance.sh writes/overwrites files (including package.json) and pushes to a different GitHub repo. Treat it as a one-off bootstrap script; do not run for normal development or CI.
- Keep .env files out of git; rely on VITE_*-prefixed variables for client-side toggles; never print or commit secrets. For local secret injection, prefer Keychain-backed approaches (the Doppler helper does this).

What was considered from existing docs
- README.md provides basic npm i and npm run dev instructions; this file consolidates the repo-specific commands above without repeating generic guidance.
- GUARDRAILS.yaml anchors hosting/output/Node constraints used by CI/CD and dev tooling.
