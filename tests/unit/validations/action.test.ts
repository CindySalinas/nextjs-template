import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { safeAction } from '@/lib/validations/action'

const nameSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

describe('safeAction', () => {
  it('returns success with data when input is valid', async () => {
    const handler = vi.fn().mockResolvedValue({ id: '1', name: 'Alice' })
    const result = await safeAction(nameSchema, { name: 'Alice' }, handler)

    expect(result).toEqual({ success: true, data: { id: '1', name: 'Alice' } })
    expect(handler).toHaveBeenCalledWith({ name: 'Alice' })
  })

  it('returns errors without calling handler when input is invalid', async () => {
    const handler = vi.fn()
    const result = await safeAction(nameSchema, { name: 'A' }, handler)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.name).toContain('Name must be at least 2 characters')
    }
    expect(handler).not.toHaveBeenCalled()
  })

  it('returns errors when required field is missing', async () => {
    const handler = vi.fn()
    const result = await safeAction(nameSchema, {}, handler)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.name).toBeDefined()
    }
    expect(handler).not.toHaveBeenCalled()
  })

  it('propagates handler errors', async () => {
    const handler = vi.fn().mockRejectedValue(new Error('DB error'))

    await expect(safeAction(nameSchema, { name: 'Alice' }, handler)).rejects.toThrow('DB error')
  })
})
