import type { NextRequest, NextResponse } from 'next/server'

export function authMiddleware(_request: NextRequest, _locales: string[]): NextResponse | null {
  return null
}
