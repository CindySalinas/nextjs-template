import './src/lib/env'

import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // X-Frame-Options removed — frame-ancestors in CSP (set in proxy.ts) supersedes it.
  // Keeping both sends conflicting instructions to browsers.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), midi=()',
  },
  // Cross-origin isolation headers
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  // credentialless (not require-corp) — allows Google Fonts + other CDNs without CORP headers
  { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
  // Content-Security-Policy is intentionally absent here.
  // It requires a per-request nonce and is set dynamically in src/proxy.ts.
  // Setting it here would send two CSP headers — browsers enforce both, breaking the nonce approach.
]

const nextConfig: NextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
