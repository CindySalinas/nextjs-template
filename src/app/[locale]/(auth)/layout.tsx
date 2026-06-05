'use client'

import { MockAuthProvider } from '@/features/auth'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <div className="bg-muted/30 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </MockAuthProvider>
  )
}
