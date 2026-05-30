import { Badge } from '@/ui/badge'
import { buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect to get started',
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For growing teams',
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    cta: 'Contact us',
    popular: false,
  },
]

export function PricingTable() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-4xl font-bold">Simple pricing</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative p-8 ${plan.popular ? 'border-primary shadow-lg' : ''}`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold">{plan.price}</p>
            <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
            <div className="mt-6">
              <a
                href="/register"
                className={buttonVariants({
                  variant: plan.popular ? 'default' : 'outline',
                  className: 'w-full',
                })}
              >
                {plan.cta}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
