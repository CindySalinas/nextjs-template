import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      es: '/sobre',
    },
    '/pricing': {
      en: '/pricing',
      es: '/precios',
    },
    '/login': {
      en: '/login',
      es: '/iniciar-sesion',
    },
    '/register': {
      en: '/register',
      es: '/registrarse',
    },
    '/forgot-password': {
      en: '/forgot-password',
      es: '/recuperar-contrasena',
    },
    '/dashboard': '/dashboard',
    '/settings': '/settings',
  },
})
