import { StatsCard } from './StatsCard'

export function DashboardShell() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard title="Total Users" value="1,234" description="+12% from last month" />
        <StatsCard title="Revenue" value="$45,678" description="+8% from last month" />
        <StatsCard title="Active Sessions" value="89" description="Right now" />
      </div>
    </div>
  )
}
