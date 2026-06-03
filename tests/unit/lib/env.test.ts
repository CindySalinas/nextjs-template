import { describe, expect, it } from 'vitest'

describe('envSchema', () => {
  it('accepts valid env with required fields', async () => {
    const { z } = await import('zod')
    const schema = z.object({
      NODE_ENV: z.enum(['development', 'test', 'production']),
      NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
      NEXT_PUBLIC_APP_NAME: z.string().default('My App'),
      NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    })

    const result = schema.safeParse({
      NODE_ENV: 'test',
      NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
      NEXT_PUBLIC_APP_NAME: 'Test App',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid NODE_ENV', async () => {
    const { z } = await import('zod')
    const schema = z.object({
      NODE_ENV: z.enum(['development', 'test', 'production']),
      NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
      NEXT_PUBLIC_APP_NAME: z.string().default('My App'),
      NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    })

    const result = schema.safeParse({ NODE_ENV: 'staging' })
    expect(result.success).toBe(false)
  })

  it('rejects non-URL NEXT_PUBLIC_APP_URL', async () => {
    const { z } = await import('zod')
    const schema = z.object({
      NODE_ENV: z.enum(['development', 'test', 'production']),
      NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
      NEXT_PUBLIC_APP_NAME: z.string().default('My App'),
      NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    })

    const result = schema.safeParse({
      NODE_ENV: 'test',
      NEXT_PUBLIC_APP_URL: 'not-a-url',
    })
    expect(result.success).toBe(false)
  })

  it('applies defaults when optional fields are absent', async () => {
    const { z } = await import('zod')
    const schema = z.object({
      NODE_ENV: z.enum(['development', 'test', 'production']),
      NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
      NEXT_PUBLIC_APP_NAME: z.string().default('My App'),
      NEXT_PUBLIC_TWITTER_HANDLE: z.string().optional(),
      NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    })

    const result = schema.safeParse({ NODE_ENV: 'test' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_APP_URL).toBe('http://localhost:3000')
      expect(result.data.NEXT_PUBLIC_APP_NAME).toBe('My App')
      expect(result.data.NEXT_PUBLIC_TWITTER_HANDLE).toBeUndefined()
      expect(result.data.NEXT_PUBLIC_GA_MEASUREMENT_ID).toBeUndefined()
    }
  })
})
