# SETUP.md — Setup Guide

## Quick Setup

```bash
pnpm setup
```

The interactive CLI configures your project name, mode, and primary language.

---

## Manual Setup

### Mode: Landing Only

Remove everything related to auth and the protected zone:

- [ ] Delete `src/app/(protected)/`
- [ ] Delete `src/app/(auth)/`
- [ ] Delete `src/features/auth/`
- [ ] Delete `src/features/dashboard/`
- [ ] Delete `src/features/settings/`
- [ ] Simplify `middleware.ts` — remove auth guard logic, keep only `NextResponse.next()`
- [ ] Remove `<MockAuthProvider>` from `src/app/layout.tsx`
- [ ] Remove `MockAuthProvider` import from `src/app/layout.tsx`

### Mode: Full (Landing + App)

No removal needed — the boilerplate ships in full mode by default.

---

## Connecting Real Authentication

The boilerplate uses `MockAuthProvider` as a placeholder. To connect a real provider:

### Option A — Clerk

```bash
pnpm add @clerk/nextjs
```

1. Replace `MockAuthProvider` in `src/app/layout.tsx` with `<ClerkProvider>`
2. Replace `useSession()` in `src/features/auth/hooks/useSession.ts` with `useUser()` from Clerk
3. Replace middleware with Clerk's `authMiddleware`
4. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` to `.env.local`

### Option B — Auth.js (NextAuth v5)

```bash
pnpm add next-auth@beta
```

1. Create `src/lib/auth/auth.ts` with `NextAuth()` config
2. Add `src/app/api/auth/[...nextauth]/route.ts`
3. Replace `MockAuthProvider` with Auth.js `SessionProvider`
4. Replace `useSession()` with Auth.js `useSession()`
5. Update `middleware.ts` with Auth.js middleware

### Option C — Supabase Auth

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

1. Create Supabase client in `src/lib/supabase/`
2. Replace `MockAuthProvider` with Supabase `createBrowserClient`
3. Update `middleware.ts` to validate Supabase session

---

## Adding a New Language

1. Copy `messages/en.json` to `messages/<locale>.json`
2. Translate all values
3. Add the locale to `src/lib/i18n/routing.ts`:

```ts
export const routing = defineRouting({
  locales: ['en', 'es'], // add your locale here
  defaultLocale: 'en',
})
```

No other changes required.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=My App
```

For production, set `NEXT_PUBLIC_APP_URL` to your production domain.

---

## Production Deployment

### Vercel (recommended)

```bash
pnpm exec vercel
```

Set environment variables in the Vercel dashboard.

### Docker

```bash
docker build -t my-app .
docker run -p 3000:3000 --env-file .env.local my-app
```

### Self-hosted

```bash
pnpm build
node .next/standalone/server.js
```

Requires `output: 'standalone'` in `next.config.ts` (already configured).

---

## Security Checklist for Production

- [ ] Set `NEXT_PUBLIC_APP_URL` to your production domain (HTTPS)
- [ ] Review and tighten CSP in `next.config.ts` for your actual domains
- [ ] Connect real auth provider — remove `MockAuthProvider`
- [ ] Run `pnpm audit` and resolve any high/critical vulnerabilities
- [ ] Set up rate limiting at your API/CDN layer
- [ ] Enable HTTPS (handled by Vercel/your hosting provider)
