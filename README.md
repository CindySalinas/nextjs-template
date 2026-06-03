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

## i18n

Translation strings live in `messages/en.json`. Components consume them via `next-intl`.

**Server Component** (page, layout, async component):

```tsx
import { getTranslations } from 'next-intl/server'

export async function MyComponent() {
  const t = await getTranslations('nav')
  return <h1>{t('about')}</h1>
}
```

**Client Component** (`'use client'`):

```tsx
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('auth')
  return <button>{t('signIn')}</button>
}
```

**Adding a string:** add the key to `messages/en.json` (and any other locale files), then use `t('key')` in the component.

> Marketing copy (hero, testimonials, pricing) is intentionally hardcoded — you'll replace it with your own content anyway.

**Adding a language:**

1. Translate `messages/es.json` (already created as a template)
2. Add the locale to `src/lib/i18n/routing.ts`:

```ts
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // /about stays English, /es/about becomes Spanish
})
```

The default locale (`en`) keeps its URLs without a prefix. Each new locale gets a prefix automatically (`/es/`, `/fr/`, etc.).

**Lazy loading per namespace (when your translations grow large):**

By default all namespaces load together. If you split into many namespaces and notice bundle size growing, you can load them per page:

```ts
// src/lib/i18n/request.ts
return {
  locale,
  // Load only the namespaces each page needs by passing them from page params.
  // For most projects the single messages file is fine.
  messages: (await import(`../../../messages/${locale}.json`)).default,
}
```

To load per namespace, use `createTranslator` with a custom loader or use next-intl's `getTranslations` at the page level — it will only load the requested namespace. This is a performance optimization worth considering once you have 5+ namespaces with hundreds of keys.

## Connecting Real Auth

Replace `MockAuthProvider` with your provider of choice. See `SETUP.md → Auth section`.
