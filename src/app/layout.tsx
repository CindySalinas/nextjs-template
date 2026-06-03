import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Minimal root layout required by Next.js. Locale-specific providers and
// the lang attribute are set in [locale]/layout.tsx.
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="ga-init" strategy="afterInteractive" nonce={nonce}>
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
