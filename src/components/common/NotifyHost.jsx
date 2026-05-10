import { useNotifyStore } from '@/store/notifyStore'
import { cn } from '@/lib/utils'

export function NotifyHost() {
  const messages = useNotifyStore((s) => s.messages)
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-soft)]',
            m.variant === 'destructive' && 'border-red-200 bg-red-50 text-red-900',
          )}
        >
          <div className="flex-1">
            {m.title ? (
              <p className="text-sm font-semibold text-foreground">{m.title}</p>
            ) : null}
            {m.description ? (
              <p className="text-sm text-muted">{m.description}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
