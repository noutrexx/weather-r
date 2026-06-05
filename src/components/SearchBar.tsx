import { MapPin, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'

import type { CityOption } from '../data/worldRegions'
import { useDebounce } from '../hooks/useDebounce'
import { tr } from '../i18n/tr'
import { cn } from '../utils/cn'

interface SearchBarProps {
  value: string
  suggestions: CityOption[]
  popularCities: CityOption[]
  recentCities: CityOption[]
  onSearch: (city: string) => void
  onSelectCity: (city: CityOption) => void
  onValueChange: (value: string) => void
  className?: string
}

const DEBOUNCE_MS = 450

function normalize(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function SearchBar({
  value,
  suggestions,
  popularCities,
  recentCities,
  onSearch,
  onSelectCity,
  onValueChange,
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const debouncedQuery = useDebounce(value, DEBOUNCE_MS)

  useEffect(() => {
    onSearch(debouncedQuery.trim())
  }, [debouncedQuery, onSearch])

  const filteredSuggestions = useMemo(() => {
    const normalizedQuery = normalize(value.trim())

    if (!normalizedQuery) {
      return []
    }

    return suggestions
      .filter((city) => {
        const haystack = normalize(
          `${city.city} ${city.label} ${city.country} ${city.query}`,
        )
        return haystack.includes(normalizedQuery)
      })
      .slice(0, 6)
  }, [value, suggestions])

  const showSuggestions = isFocused && filteredSuggestions.length > 0
  const quickCities = recentCities.length > 0 ? recentCities : popularCities
  const safeActiveIndex =
    filteredSuggestions.length > 0
      ? Math.min(activeIndex, filteredSuggestions.length - 1)
      : 0

  const handleSelectCity = (city: CityOption) => {
    onValueChange(city.label)
    setIsFocused(false)
    onSelectCity(city)
  }

  const handleClear = () => {
    onValueChange('')
    onSearch('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % filteredSuggestions.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(
        (index) =>
          (index - 1 + filteredSuggestions.length) % filteredSuggestions.length,
      )
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      handleSelectCity(filteredSuggestions[safeActiveIndex])
    }
  }

  return (
    <div className={cn('min-w-0 w-full', className)}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          onChange={(event) => onValueChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={tr.search.placeholder}
          aria-label={tr.search.ariaLabel}
          className="h-14 w-full rounded-2xl border border-slate-700/80 bg-slate-950/80 pr-12 pl-12 text-base text-slate-100 shadow-2xl shadow-sky-950/20 outline-none transition placeholder:text-slate-500 focus:border-sky-400/70 focus:ring-4 focus:ring-sky-400/15"
        />
        {value && (
          <button
            aria-label={tr.search.clear}
            className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
            onClick={handleClear}
            type="button"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}

        {showSuggestions && (
          <div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-30 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40">
            <p className="px-4 pt-3 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {tr.search.suggestions}
            </p>
            <div className="max-h-72 overflow-auto pb-2">
              {filteredSuggestions.map((city, index) => (
                <button
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-sky-400/10 hover:text-white',
                    index === safeActiveIndex && 'bg-sky-400/10 text-white',
                  )}
                  key={city.query}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelectCity(city)}
                  type="button"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky-400/10 text-sky-200">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{city.label}</span>
                    <span className="text-xs font-semibold text-slate-500">
                      {city.country}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {recentCities.length > 0 ? 'Son aramalar' : tr.search.popular}
        </span>
        {quickCities.map((city) => (
          <button
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-sky-400/70 hover:bg-sky-400/10 hover:text-sky-100"
            key={city.query}
            onClick={() => handleSelectCity(city)}
            type="button"
          >
            {city.label}
          </button>
        ))}
      </div>
    </div>
  )
}
