import { Headphones, Lock, ShieldCheck, Sparkles } from 'lucide-react'

const items = [
  {
    icon: Sparkles,
    title: 'Structured planning',
    text: 'We map legs, layovers and hotel nights in a single timeline so you always know what happens next.',
  },
  {
    icon: Headphones,
    title: 'Human support',
    text: 'Reach the same desk by phone or WhatsApp — no anonymous ticket queues when plans shift.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear commercial terms',
    text: 'Deposit schedules, supplier rules and optional insurance are explained before you commit.',
  },
  {
    icon: Lock,
    title: 'Protected payments',
    text: 'Card data is handled through encrypted checkout with receipts stored for your records.',
  },
]

export function WhyChooseSection() {
  return (
    <section className="border-b border-border bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Why book with EPIC HOLIDAYS
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            A calmer way to lock in flights and packages
          </h2>
          <p className="text-sm text-muted">
            We focus on fewer, better-matched options instead of endless tabs — faster answers,
            fewer surprises.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-lg)] border border-border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
