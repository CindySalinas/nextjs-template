# [1.1.0](https://github.com/CindySalinas/nextjs-template/compare/v1.0.0...v1.1.0) (2026-06-05)


### Bug Fixes

* **ci:** move pnpm allowBuilds config to package.json, remove pnpm-workspace.yaml ([736131f](https://github.com/CindySalinas/nextjs-template/commit/736131f36c2d86514de792caf4893e83839195c8))
* **coverage:** exclude .stories.tsx files from coverage report ([6874f40](https://github.com/CindySalinas/nextjs-template/commit/6874f40714d71dd612206301edd7de9e1baf60c6))
* **e2e:** exclude /api routes from intl proxy and tighten pricing link selector ([c4fa91d](https://github.com/CindySalinas/nextjs-template/commit/c4fa91d5d709d5b7411bca15f66685f2d685ecb3))
* **e2e:** limit CI browsers to chromium and skip mobile nav test ([7f89efa](https://github.com/CindySalinas/nextjs-template/commit/7f89efa494a961eefa06288e0f59adfea435d2b2))
* **security:** override postcss >=8.5.10 via pnpm-workspace.yaml to patch XSS CVE ([558e4e1](https://github.com/CindySalinas/nextjs-template/commit/558e4e1727bce083af3eb4fba868fe8b3a87e5ad))
* **security:** postcss CVE unfixable via next@16 — add audit --ignore-unfixable ([233552c](https://github.com/CindySalinas/nextjs-template/commit/233552c1769148339ed83d960d61831a21d4058f))
* **sentry:** replace deprecated disableLogger with webpack.treeshake.removeDebugLogging ([c256fa7](https://github.com/CindySalinas/nextjs-template/commit/c256fa7492148712ef03818c631d327169fdd8b9))
* **storybook:** use @storybook/nextjs imports and remove invalid asChild prop ([efa3979](https://github.com/CindySalinas/nextjs-template/commit/efa3979b6b978410e4edfd69dd97b3e9d931560c))


### Features

* add Sentry monitoring (errors + performance, standard plan) ([940dc54](https://github.com/CindySalinas/nextjs-template/commit/940dc54118c7e2196626dc0fc582f51343a62903))
* **auth:** add localStorage token storage module with SSR guard ([99f9b85](https://github.com/CindySalinas/nextjs-template/commit/99f9b85073ef471d7c769e07e34f6762e90aa486))
* **auth:** add logout button with confirmation dialog to protected sidebar ([1e062ce](https://github.com/CindySalinas/nextjs-template/commit/1e062cee5a4c5bfc864365ab248515b25c850eb2))
* **auth:** authMiddleware with cookie check, locale stripping, open-redirect-safe ?from= ([f91ac49](https://github.com/CindySalinas/nextjs-template/commit/f91ac49a9a63fdd7b3c61737c583d6e3cbca153c))
* **auth:** MockAuthProvider — cookie init, open-redirect validation, router.replace on signOut ([f23c0f0](https://github.com/CindySalinas/nextjs-template/commit/f23c0f03f568cf0c9e3dee445d079e0a93b3e82c))
* **auth:** move route protection to client via useAuthGuard redirect ([19c84c2](https://github.com/CindySalinas/nextjs-template/commit/19c84c2c88b26b618ca3f71cf8931213cb4ea1f2))
* **auth:** replace document.cookie with localStorage token storage in MockAuthProvider ([a461b74](https://github.com/CindySalinas/nextjs-template/commit/a461b7465947f9d8695ebfdb6019abce66db25ca))
* **i18n:** add meta translation namespace for marketing pages ([53b9a54](https://github.com/CindySalinas/nextjs-template/commit/53b9a5451b7f207ddd2d67014af4afae0b5dc38c))
* **i18n:** add notFound translation namespace ([923ec98](https://github.com/CindySalinas/nextjs-template/commit/923ec98c37f451513f79b9f3a4965383b840e1e6))
* **security:** add safeAction wrapper and Zod auth schemas in src/lib/validations/ ([23bae02](https://github.com/CindySalinas/nextjs-template/commit/23bae022ac086c1081b53b5b518e515fd6695e27))
* **security:** HSTS, COOP/CORP/COEP, expanded Permissions-Policy, remove X-Frame-Options ([3cecdbb](https://github.com/CindySalinas/nextjs-template/commit/3cecdbbc3e4136ff2f579675208495fd49190bbe))
* **security:** nonce-based CSP in proxy.ts — removes unsafe-inline from script-src ([d0d5b9b](https://github.com/CindySalinas/nextjs-template/commit/d0d5b9b62ea74f12b388697e14b6f7c5c774b5c6))
* **security:** read nonce from x-nonce header, add conditional GA with nonce ([52205e3](https://github.com/CindySalinas/nextjs-template/commit/52205e367c217ad80f3c0324e3ba06097661b7da))
* **security:** separate env runtime validation from .d.ts into src/lib/env.ts ([ac9a419](https://github.com/CindySalinas/nextjs-template/commit/ac9a419f94d111e967aaeb11537dc3f552b10b03))
* **seo:** async generateMetadata + ISR revalidate=86400 for all marketing and auth pages ([79d477e](https://github.com/CindySalinas/nextjs-template/commit/79d477edfd09610a548f1fc6453aee58f59b8ae7))
* **seo:** locale-aware generatePageMetadata — locale + alternateUrls replace locales[] ([774c9df](https://github.com/CindySalinas/nextjs-template/commit/774c9df0b607f893457ecf8ff600b7ae5e73d598))
* **seo:** rewrite sitemap — derived from routing.pathnames, 6 entries with hreflang alternates ([6416c94](https://github.com/CindySalinas/nextjs-template/commit/6416c9402309a5aacd7457d7965d617d86a331f0))
* **ux:** add error boundaries with glassmorphism design for all route groups ([5e98465](https://github.com/CindySalinas/nextjs-template/commit/5e984658c8a45ce67bb7853cff21ff799fc4f240))
* **ux:** add loading spinner for (main)/(auth) and skeleton for (protected) route groups ([582d80d](https://github.com/CindySalinas/nextjs-template/commit/582d80d6567d997423dfc60fb58eed079fec0edf))
* **ux:** EmptyState, DashboardShell stats prop, SettingsShell, settings page wiring ([5218e5a](https://github.com/CindySalinas/nextjs-template/commit/5218e5a6162de5ed657428e6afedb258d3845bfa))
* **ux:** locale 404 with getTranslations + gradient design; root fallback 404 ([8b58f63](https://github.com/CindySalinas/nextjs-template/commit/8b58f631d135514aec1b8b54370997036bcff59c))
* **ux:** Toaster in locale layout, toast feedback on signIn/signOut, button loading spinners ([3659fef](https://github.com/CindySalinas/nextjs-template/commit/3659fefc7d13af19a638f1e0d287e3c22f37c0ff))

# 1.0.0 (2026-06-04)


### Bug Fixes

* **tests:** exclude Playwright e2e tests from Vitest runner ([86e25f3](https://github.com/CindySalinas/nextjs-template/commit/86e25f39a403fdfb3ccf6ba248f5135b930f8dd0))


### Features

* **auth:** MockAuthProvider, auth forms, useSession, useAuthGuard ([508a5e5](https://github.com/CindySalinas/nextjs-template/commit/508a5e5dc66df305b3155e4239cdc75d4bdc89e9))
* **ci:** GitHub Actions CI, E2E, release workflows ([f81f84a](https://github.com/CindySalinas/nextjs-template/commit/f81f84a326b630ca7a5e8c8364f68be866433d76))
* **config:** ESLint boundaries + Prettier with Tailwind plugin ([5d9cce4](https://github.com/CindySalinas/nextjs-template/commit/5d9cce4d3dee25f0a239c8746fd42a8839bb46a3))
* **config:** strict TypeScript, path aliases, Zod env validation ([d98dd64](https://github.com/CindySalinas/nextjs-template/commit/d98dd64dee0818ed25fc4f5e85ee5b71aef756ab))
* **docker:** multi-stage Dockerfile, dev compose, prod compose ([5f5b86d](https://github.com/CindySalinas/nextjs-template/commit/5f5b86d385a5824747beaa9faeaaedf2e13bbe65))
* **features:** main landing components, dashboard shell, stats cards ([099c03e](https://github.com/CindySalinas/nextjs-template/commit/099c03e4f9716abe6c01f188a308e6837dd29a4e))
* **i18n:** locale routing, Spanish translations, connect nav and auth ([249a698](https://github.com/CindySalinas/nextjs-template/commit/249a69842dadc007a366010ab38d22211796cf75))
* **i18n:** next-intl, generatePageMetadata, sitemap, robots.txt, JSON-LD, security headers ([2bc288d](https://github.com/CindySalinas/nextjs-template/commit/2bc288d8e7c932efdff85a7c66e23d1e67ae9325))
* **routing:** route groups, layouts, middleware auth guard ([420f199](https://github.com/CindySalinas/nextjs-template/commit/420f1991fcc55c9c9c8882c4f52fad99d9449c7b))
* **setup:** interactive CLI for landing-only and full mode setup ([b8dc1de](https://github.com/CindySalinas/nextjs-template/commit/b8dc1deff086faec609105549bd9a832c9846522))
* **styles:** Tailwind 4, CSS variables, dark mode, Inter font ([e6c2fde](https://github.com/CindySalinas/nextjs-template/commit/e6c2fde771026af23eaf41b134f7913d1ed3b4ff))
* **tests:** Vitest unit/component tests, Playwright E2E tests ([81a9399](https://github.com/CindySalinas/nextjs-template/commit/81a9399365e9bf5ce971c0932d16118f80c24f5f))
* **ui:** shadcn/ui primitives, Navbar, Footer, ThemeToggle ([dde9056](https://github.com/CindySalinas/nextjs-template/commit/dde90566bfee7e64dba3a80a8e64db697c90f4ed))
