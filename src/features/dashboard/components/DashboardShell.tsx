import { EmptyState } from '@/shared/EmptyState'

import { StatsCard } from './StatsCard'

interface Stat {
  title: string
  value: string
  description: string
}

const MOCK_STATS: Stat[] = [
  { title: 'Total Users', value: '1,234', description: '+12% from last month' },
  { title: 'Revenue', value: '$45,678', description: '+8% from last month' },
  { title: 'Active Sessions', value: '89', description: 'Right now' },
]

interface DashboardShellProps {
  stats?: Stat[]
}

export function DashboardShell({ stats = MOCK_STATS }: DashboardShellProps) {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Welcome back. Here&#39;s what&#39;s happening.
      </p>

      {stats.length === 0 ? (
        <EmptyState
          icon={
            <svg
              className="text-muted-foreground h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
          }
          title="No data yet"
          description="Your stats will appear here once your application starts collecting data."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}
