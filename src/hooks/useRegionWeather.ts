import { useEffect, useState } from 'react'

import type { CityOption } from '../data/worldRegions'
import { fetchCurrentWeatherBatch } from '../services/weatherApi'
import type { CurrentWeatherResponse } from '../types/weather'

export function useRegionWeather(cities: CityOption[]) {
  const [data, setData] = useState<Record<string, CurrentWeatherResponse>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setIsLoading(true)

      try {
        const result = await fetchCurrentWeatherBatch(
          cities.map((city) => city.query),
        )

        if (!cancelled) {
          setData(result)
        }
      } catch {
        if (!cancelled) {
          setData({})
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [cities])

  return { data, isLoading }
}
