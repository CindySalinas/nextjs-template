import { Skeleton } from '@/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar skeleton */}
      <aside className="border-border/50 bg-muted/20 w-64 shrink-0 border-r p-6">
        <Skeleton className="mb-6 h-8 w-32" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-3/4 rounded-lg" />
        </div>
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <Skeleton className="mb-2 h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-border/50 rounded-xl border p-6">
              <Skeleton className="mb-4 h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        <div className="border-border/50 mt-6 rounded-xl border p-6">
          <Skeleton className="mb-4 h-5 w-32" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </main>
    </div>
  )
}
