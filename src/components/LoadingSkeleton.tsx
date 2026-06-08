import { en } from '../i18n/en'
import { cn } from '../utils/cn'

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse space-y-6', className)}
      role="status"
      aria-label={en.loading.ariaLabel}
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="h-4 w-24 rounded bg-zinc-700" />
        <div className="mt-4 h-10 w-48 rounded bg-zinc-700" />
        <div className="mt-2 h-4 w-32 rounded bg-zinc-700" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 rounded-xl border border-zinc-800 bg-zinc-950/50"
            />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="mb-4 h-5 w-40 rounded bg-zinc-700" />
        <div className="h-72 rounded-xl bg-zinc-800/80" />
      </div>
    </div>
  )
}
