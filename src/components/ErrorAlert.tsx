import { AlertCircle } from 'lucide-react'

import { cn } from '../utils/cn'

interface ErrorAlertProps {
  message: string
  className?: string
}

export function ErrorAlert({ message, className }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-red-200',
        className,
      )}
    >
      <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-400" aria-hidden />
      <p className="text-sm leading-relaxed">{message}</p>
    </div>
  )
}
