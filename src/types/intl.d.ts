import type en from '../../messages/en.json'

type Messages = typeof en

// Enables type-safe translation keys in useTranslations() and getTranslations().
// TypeScript will error if you reference a key that doesn't exist in en.json.
declare global {
  interface IntlMessages extends Messages {}
}
