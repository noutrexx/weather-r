import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import { tr } from '../i18n/tr'
import { cn } from '../utils/cn'

interface SearchBarProps {
  onSearch: (city: string) => void
  className?: string
}

const DEBOUNCE_MS = 500

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)

  useEffect(() => {
    onSearch(debouncedQuery.trim())
  }, [debouncedQuery, onSearch])

  return (
    <div className={cn('relative w-full max-w-xl', className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-zinc-400"
        aria-hidden
      />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={tr.search.placeholder}
        aria-label={tr.search.ariaLabel}
        className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/80 py-3 pr-12 pl-12 text-zinc-100 placeholder:text-zinc-500 shadow-sm outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/30 dark:border-zinc-600 dark:bg-zinc-900"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Aramayı temizle"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded text-zinc-400 transition hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
