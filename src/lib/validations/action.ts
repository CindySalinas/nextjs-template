import type { z, ZodSchema } from 'zod'

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> }

export async function safeAction<S extends ZodSchema, T>(
  schema: S,
  input: unknown,
  handler: (data: z.infer<S>) => Promise<T>
): Promise<ActionResult<T>> {
  const parsed = schema.safeParse(input)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = await handler(parsed.data)
  return { success: true, data }
}
