export function Footer() {
  return (
    <footer className="border-border border-t py-8">
      <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
      </div>
    </footer>
  )
}
