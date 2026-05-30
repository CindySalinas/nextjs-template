# Next.js Boilerplate 2026

A production-ready Next.js 16 boilerplate for Marketing + App hybrid products.

## Features

- **Next.js 16** with App Router and Turbopack
- **TypeScript** strict mode
- **Tailwind CSS 4** with CSS variables and dark mode
- **shadcn/ui** primitives + product component layer
- **Feature-based architecture** with ESLint boundary enforcement
- **Auth UI flows** ready to connect to any provider (Clerk, Auth.js, Supabase)
- **Two modes:** Full (landing + app) or Landing only
- **SEO:** metadata helpers, sitemap, robots.txt, JSON-LD
- **i18n:** next-intl configured, add languages by adding a JSON file
- **Testing:** Vitest + Testing Library + Playwright
- **Docker:** dev and production multi-stage builds
- **CI/CD:** GitHub Actions with typecheck, lint, test, build, audit, E2E, release

## Quick Start

```bash
git clone https://github.com/your-org/nextjs-template my-app
cd my-app
pnpm install
pnpm setup          # choose your mode (landing / full)
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Modes

| Mode             | What you get                                          |
| ---------------- | ----------------------------------------------------- |
| **Full**         | Public landing + auth UI flows + protected dashboard  |
| **Landing only** | Public pages only — auth and protected routes removed |

Run `pnpm setup` to choose, or follow `SETUP.md` for manual steps.

## Stack

| Technology     | Purpose                |
| -------------- | ---------------------- |
| Next.js 16     | Framework              |
| React 19       | UI                     |
| TypeScript 5   | Type safety            |
| Tailwind CSS 4 | Styling                |
| shadcn/ui      | UI primitives          |
| next-intl      | i18n                   |
| Vitest         | Unit + component tests |
| Playwright     | E2E tests              |
| Docker         | Containerization       |

## Scripts

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Start dev server (Turbopack)    |
| `pnpm build`        | Production build                |
| `pnpm start`        | Start production server         |
| `pnpm lint`         | Run ESLint                      |
| `pnpm format`       | Run Prettier                    |
| `pnpm test`         | Unit + component tests          |
| `pnpm test:e2e`     | Playwright E2E tests            |
| `pnpm setup`        | Interactive project setup       |
| `pnpm docker:dev`   | Start dev environment in Docker |
| `pnpm docker:build` | Build production Docker image   |

## Architecture

The codebase uses a 4-layer import hierarchy enforced by ESLint:

```
app/ → features/ → components/ → lib/
```

See `docs/specs/2026-05-30-nextjs-boilerplate-design.md` for the full design.

## Adding a Language

1. Add a JSON file to `messages/` (e.g., `messages/es.json`)
2. Add the locale code to `src/lib/i18n/routing.ts`
3. Done — no other changes required.

## Connecting Real Auth

Replace `MockAuthProvider` with your provider of choice. See `SETUP.md → Auth section`.
