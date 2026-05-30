'use client'

import { Button } from '@/ui/button'
import { Icons } from '@/shared/Icons'

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle('dark')
    const btn = document.getElementById('theme-toggle-icon')
    if (btn) btn.dataset['theme'] = isDark ? 'dark' : 'light'
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      <span id="theme-toggle-icon" data-theme="light">
        <Icons.moon className="block h-4 w-4 [[data-theme=dark]_&]:hidden" />
        <Icons.sun className="hidden h-4 w-4 [[data-theme=dark]_&]:block" />
      </span>
    </Button>
  )
}
