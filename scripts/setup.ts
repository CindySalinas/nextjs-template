import { readFileSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import prompts from 'prompts'

async function main() {
  console.log('\n🚀 Next.js Boilerplate Setup\n')

  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name:',
    initial: 'my-app',
    validate: (v: string) => (v.length > 0 ? true : 'Project name is required'),
  })

  const { mode } = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Which mode?',
    choices: [
      { title: 'Full (landing + authenticated app)', value: 'full' },
      { title: 'Landing only (no auth, no protected routes)', value: 'landing' },
    ],
  })

  const { locale } = await prompts({
    type: 'text',
    name: 'locale',
    message: 'Primary language (e.g. en, es, fr):',
    initial: 'en',
  })

  const root = resolve(process.cwd())

  // Rename project in package.json
  const pkgPath = resolve(root, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>
  pkg['name'] = projectName
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`✅ Project renamed to "${projectName}"`)

  if (mode === 'landing') {
    const toRemove = [
      'src/app/(protected)',
      'src/app/(auth)',
      'src/features/auth',
      'src/features/dashboard',
      'src/features/settings',
    ]

    for (const dir of toRemove) {
      try {
        rmSync(resolve(root, dir), { recursive: true, force: true })
        console.log(`🗑  Removed ${dir}`)
      } catch {
        // already absent
      }
    }

    // Replace middleware with passthrough for landing mode
    const simplified = `// middleware.ts — landing mode (no auth guard)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
}
`
    writeFileSync(resolve(root, 'middleware.ts'), simplified)
    console.log('✅ Middleware simplified for landing mode')
  }

  // Set locale
  if (locale !== 'en') {
    const routingPath = resolve(root, 'src/lib/i18n/routing.ts')
    const routing = readFileSync(routingPath, 'utf-8')
    writeFileSync(
      routingPath,
      routing
        .replace("locales: ['en']", `locales: ['${locale}', 'en']`)
        .replace("defaultLocale: 'en'", `defaultLocale: '${locale}'`)
    )
    console.log(`✅ Default locale set to "${locale}"`)
  }

  console.log('\n✅ Setup complete!\n')
  console.log('Next steps:')
  console.log('  1. cp .env.example .env.local')
  console.log('  2. pnpm dev')
  console.log('  3. Open http://localhost:3000\n')
}

main().catch(console.error)
