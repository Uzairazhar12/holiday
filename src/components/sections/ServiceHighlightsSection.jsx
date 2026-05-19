import { SERVICE_HIGHLIGHTS } from '@/config/homeHighlights'

export function ServiceHighlightsSection() {
  return (
    <section className="border-b border-border bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {SERVICE_HIGHLIGHTS.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center lg:flex-row lg:items-center lg:text-left"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-slate-50 shadow-sm">
                <item.icon
                  className="h-7 w-7 text-teal-700"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <div className="min-w-0 space-y-1">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-slate-900 sm:text-[0.95rem]">
                  {item.title}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
