import { useAuthContext } from '@/features/auth/providers/MockAuthProvider'
import type { SessionState } from '@/lib/auth/types'

export function useSession(): SessionState {
  const { user, isLoading } = useAuthContext()
  return { user, isLoading }
}
