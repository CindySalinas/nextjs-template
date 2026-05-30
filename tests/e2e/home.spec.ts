import { expect, test } from '@playwright/test'

test.describe('Home page', () => {
  test('renders hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('has working navigation links', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /pricing/i }).click()
    await expect(page).toHaveURL('/pricing')
  })

  test('sitemap is accessible', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
  })
})
