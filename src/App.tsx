import { useCallback, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { CurrentWeather } from './components/CurrentWeather'
import { ErrorAlert } from './components/ErrorAlert'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { SearchBar } from './components/SearchBar'
import { WeatherChart } from './components/WeatherChart'
import { useFetch } from './hooks/useFetch'
import { tr } from './i18n/tr'
import { fetchCurrentWeather, fetchForecast } from './services/weatherApi'

function App() {
  const [city, setCity] = useState('')
  const enabled = city.length >= 2

  const handleSearch = useCallback((value: string) => {
    setCity(value)
  }, [])

  const {
    data: current,
    isLoading: loadingCurrent,
    error: currentError,
  } = useFetch(() => fetchCurrentWeather(city), [city], enabled)

  const {
    data: forecast,
    isLoading: loadingForecast,
    error: forecastError,
  } = useFetch(() => fetchForecast(city), [city], enabled)

  const isLoading = enabled && (loadingCurrent || loadingForecast)
  const error = currentError ?? forecastError

  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-100 dark:bg-zinc-950">
      <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {tr.app.title}
          </h1>
          <p className="text-sm text-zinc-400">{tr.app.subtitle}</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {!enabled && (
          <p className="rounded-xl border border-dashed border-zinc-800 px-4 py-8 text-center text-sm text-zinc-500">
            {tr.app.minChars}
          </p>
        )}

        {enabled && isLoading && (
          <div className="relative">
            <LoadingSkeleton />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Loader2
                className="size-10 animate-spin text-sky-400"
                aria-hidden
              />
            </div>
          </div>
        )}

        {enabled && !isLoading && error && <ErrorAlert message={error} />}

        {enabled && !isLoading && !error && current && (
          <div className="space-y-6">
            <CurrentWeather weather={current} />
            <WeatherChart forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
