import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const publicPages = ['/', '/about', '/pricing', '/login']

for (const path of publicPages) {
  test(`${path} has no WCAG 2.0 AA violations`, async ({ page }) => {
    await page.goto(path)

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()

    if (results.violations.length > 0) {
      console.log(
        results.violations.map((v) => ({
          id: v.id,
          description: v.description,
          nodes: v.nodes.map((n) => n.target),
        }))
      )
    }

    expect(results.violations).toEqual([])
  })
}
