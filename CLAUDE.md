# CLAUDE.md — AI Assistant Context

## What This Is

A frontend-only Next.js 16 boilerplate. No real auth logic, no database, no ORM.
The goal is to ship a ready-to-use UI foundation that connects to any backend.

## Architecture (READ THIS FIRST)

4-layer import hierarchy — dependencies flow downward only:

```
src/app/          ← routing only, thin shells, imports from features/
src/features/     ← business logic by domain, closed modules
src/components/   ← ui/ (shadcn primitives) + shared/ (cross-feature)
src/lib/          ← zero-dependency utilities, importable by any layer
```

**A feature NEVER imports from another feature.**
**lib/ NEVER imports from components/ or features/.**

ESLint enforces this — violations are lint errors.

## Key Conventions

- **Aliases:** Always use `@/features/`, `@/lib/`, `@/ui/`, `@/shared/` — never `../../`
- **Barrel exports:** Each feature exposes only `index.ts` — never import from internal paths
- **TypeScript:** strict mode, `noUncheckedIndexedAccess`, no implicit `any`
- **Components:** PascalCase files, hooks `useXxx.ts`, utilities camelCase
- **Commits:** Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `test:`

## Common Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Unit + component tests
pnpm test:e2e         # Playwright E2E
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm setup            # Interactive project setup
```

## Where Things Live

| What                     | Where                                                        |
| ------------------------ | ------------------------------------------------------------ |
| Route groups             | `src/app/(main)/`, `src/app/(protected)/`, `src/app/(auth)/` |
| Feature logic            | `src/features/<name>/`                                       |
| shadcn primitives        | `src/components/ui/`                                         |
| Shared layout components | `src/components/shared/`                                     |
| Utilities                | `src/lib/`                                                   |
| Auth types               | `src/lib/auth/types.ts`                                      |
| SEO helpers              | `src/lib/seo/`                                               |
| i18n config              | `src/lib/i18n/`                                              |
| Translations             | `messages/`                                                  |
| Design docs              | `docs/specs/`                                                |
| Implementation plans     | `docs/plans/`                                                |

## What NOT To Do

- Do NOT implement real auth logic — use `MockAuthProvider` as the connection point
- Do NOT add ORM or database code
- Do NOT import across feature boundaries directly
- Do NOT use relative imports past one directory level (`../../`)
- Do NOT add `console.log` to production code
- Do NOT add features not in the spec without confirming with the user
