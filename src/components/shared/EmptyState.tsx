import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="border-border/50 flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed p-10 text-center">
      {icon && (
        <div className="bg-muted/50 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <p className="text-base font-semibold tracking-tight">{title}</p>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-xs text-sm leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
