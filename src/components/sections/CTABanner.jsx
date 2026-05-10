import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function CTABanner() {
  return (
    <section className="bg-[linear-gradient(120deg,oklch(0.42_0.12_260),oklch(0.32_0.09_260))] py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/70">
            Tailored quotations
          </p>
          <h2 className="font-display text-3xl sm:text-4xl">
            Ready when you are &mdash; call, WhatsApp, or send dates online.
          </h2>
          <p className="text-sm text-white/85">
            Specialists reply inside two business hours with curated routing options,
            deposit timelines and supplier clarity upfront.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" size="lg" asChild>
            <Link to="/contact">Plan my escape</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/50 bg-transparent text-white hover:bg-white/10"
            asChild
          >
            <a href="https://wa.me/447520637686" target="_blank" rel="noreferrer">
              WhatsApp concierge
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
