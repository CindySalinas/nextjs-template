export const getTranslations = async (_namespace?: string) => (key: string) => key

export const getMessages = async () => ({})

export const setRequestLocale = (_locale: string) => {}

export const getLocale = async () => 'en'

export const getFormatter = async () => ({
  dateTime: (date: Date) => date.toLocaleDateString(),
  number: (n: number) => n.toString(),
  relativeTime: (value: number, unit: string) => `${value} ${unit}`,
})
