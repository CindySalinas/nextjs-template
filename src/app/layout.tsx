import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MockAuthProvider } from '@/features/auth/providers/MockAuthProvider'
import { JsonLd } from '@/shared/JsonLd'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: 'A production-ready Next.js boilerplate',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: process.env.NEXT_PUBLIC_APP_NAME,
            url: process.env.NEXT_PUBLIC_APP_URL,
          }}
        />
        <MockAuthProvider>{children}</MockAuthProvider>
      </body>
    </html>
  )
}
