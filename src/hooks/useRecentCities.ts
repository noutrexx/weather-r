import { useCallback, useState } from 'react'

import type { CityOption } from '../data/worldRegions'

const STORAGE_KEY = 'weather-dashboard:recent-cities'
const MAX_RECENT = 5

function readRecentCities(): CityOption[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CityOption[]) : []
  } catch {
    return []
  }
}

export function useRecentCities() {
  const [recentCities, setRecentCities] = useState<CityOption[]>(readRecentCities)

  const addRecentCity = useCallback((city: CityOption) => {
    setRecentCities((current) => {
      const next = [
        city,
        ...current.filter((item) => item.query !== city.query),
      ].slice(0, MAX_RECENT)

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearRecentCities = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setRecentCities([])
  }, [])

  return { recentCities, addRecentCity, clearRecentCities }
}
