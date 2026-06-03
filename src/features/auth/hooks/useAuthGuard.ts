import { useSession } from './useSession'

// Route protection is handled by the middleware (src/middleware/auth.ts).
// This hook exists for components that need to read the current user on protected pages.
export function useAuthGuard() {
  return useSession()
}
