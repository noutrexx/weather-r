import { useCallback, useEffect, useState } from 'react'

import { getErrorMessage } from '../utils/errors'

interface UseFetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  refetch: () => void
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: readonly unknown[],
  enabled = true,
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refetch = useCallback(() => {
    setTick((n) => n + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false

    const run = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetcher()
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setData(null)
          setError(getErrorMessage(err))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps array is caller-controlled
  }, [enabled, tick, ...deps])

  return {
    data: enabled ? data : null,
    isLoading: enabled ? isLoading : false,
    error: enabled ? error : null,
    refetch,
  }
}
