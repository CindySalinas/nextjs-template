const testimonials = [
  { quote: 'This boilerplate saved us weeks of setup.', author: 'Alex M.', role: 'CTO' },
  {
    quote: 'The architecture is exactly what we needed for our SaaS.',
    author: 'Sam K.',
    role: 'Lead Developer',
  },
  {
    quote: 'Best DX I have experienced with a Next.js starter.',
    author: 'Jordan L.',
    role: 'Indie Hacker',
  },
]

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">What people say</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.author} className="border-border rounded-lg border p-6">
            <p className="text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4">
              <p className="font-semibold">{t.author}</p>
              <p className="text-muted-foreground text-sm">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
