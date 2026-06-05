import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getToken, removeToken, setToken } from '@/lib/auth/storage'
import { MOCK_JWT, MOCK_JWT_TOKEN } from '@/lib/auth/types'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  describe('getToken', () => {
    it('returns null when no token is stored', () => {
      expect(getToken()).toBeNull()
    })

    it('returns the stored token', () => {
      localStorage.setItem(MOCK_JWT_TOKEN, MOCK_JWT)
      expect(getToken()).toBe(MOCK_JWT)
    })

    it('returns null when window is undefined (SSR)', () => {
      vi.stubGlobal('window', undefined)
      expect(getToken()).toBeNull()
    })
  })

  describe('setToken', () => {
    it('stores the token in localStorage', () => {
      setToken(MOCK_JWT)
      expect(localStorage.getItem(MOCK_JWT_TOKEN)).toBe(MOCK_JWT)
    })

    it('is a no-op when window is undefined (SSR)', () => {
      vi.stubGlobal('window', undefined)
      expect(() => setToken(MOCK_JWT)).not.toThrow()
    })

    it('does not throw when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })
      expect(() => setToken(MOCK_JWT)).not.toThrow()
    })
  })

  describe('removeToken', () => {
    it('removes the token from localStorage', () => {
      localStorage.setItem(MOCK_JWT_TOKEN, MOCK_JWT)
      removeToken()
      expect(localStorage.getItem(MOCK_JWT_TOKEN)).toBeNull()
    })

    it('is a no-op when window is undefined (SSR)', () => {
      vi.stubGlobal('window', undefined)
      expect(() => removeToken()).not.toThrow()
    })

    it('does not throw when localStorage throws', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('SecurityError')
      })
      expect(() => removeToken()).not.toThrow()
    })
  })
})
