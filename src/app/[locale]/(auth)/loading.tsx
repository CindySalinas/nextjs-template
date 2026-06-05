export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-10 w-10">
        <div className="border-muted absolute inset-0 rounded-full border-4" />
        <div className="border-primary absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-r-transparent" />
      </div>
    </div>
  )
}
