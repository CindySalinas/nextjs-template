import { Card } from '@/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card className="p-6">
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
    </Card>
  )
}
