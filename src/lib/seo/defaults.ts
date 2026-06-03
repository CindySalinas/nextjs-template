const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const seoDefaults = {
  siteName: process.env.NEXT_PUBLIC_APP_NAME ?? 'My App',
  siteUrl,
  // Replace og-image.png with your actual OG image in /public
  defaultOgImage: `${siteUrl}/og-image.png`,
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? '@yourhandle',
}
