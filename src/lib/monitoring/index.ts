import * as Sentry from '@sentry/nextjs'

export function captureException(err: unknown): void {
  Sentry.captureException(err)
}

export function captureMessage(
  msg: string,
  level: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug' = 'info'
): void {
  Sentry.captureMessage(msg, level)
}
