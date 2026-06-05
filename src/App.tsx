import { useCallback, useMemo, useState } from 'react'
import { Globe2, Loader2 } from 'lucide-react'

import { CurrentWeather } from './components/CurrentWeather'
import { ErrorAlert } from './components/ErrorAlert'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { SearchBar } from './components/SearchBar'
import { WeatherChart } from './components/WeatherChart'
import { WorldRegionMap } from './components/WorldRegionMap'
import {
  cityOptions,
  popularCities,
  type CityOption,
  type RegionId,
  worldRegions,
} from './data/worldRegions'
import { useFetch } from './hooks/useFetch'
import { tr } from './i18n/tr'
import { fetchCurrentWeather, fetchForecast } from './services/weatherApi'

function App() {
  const [city, setCity] = useState('')
  const [searchLabel, setSearchLabel] = useState('')
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('europe')
  const enabled = city.length >= 2

  const selectedRegion = useMemo(
    () =>
      worldRegions.find((region) => region.id === selectedRegionId) ??
      worldRegions[0],
    [selectedRegionId],
  )

  const handleSearch = useCallback((value: string) => {
    setCity(value)
    setSearchLabel(value)
  }, [])

  const handleSelectCity = useCallback((selectedCity: CityOption) => {
    setCity(selectedCity.query)
    setSearchLabel(selectedCity.label)
  }, [])

  const handleSelectRegion = useCallback((regionId: RegionId) => {
    setSelectedRegionId(regionId)
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
    <div className="min-h-svh bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-svh max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.8fr)] lg:items-end">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-100">
              <Globe2 className="size-4" aria-hidden />
              Weather Intelligence
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {tr.app.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                {tr.app.subtitle}
              </p>
            </div>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onSelectCity={handleSelectCity}
            onValueChange={setSearchLabel}
            popularCities={popularCities}
            suggestions={cityOptions}
            value={searchLabel}
          />
        </header>

        <WorldRegionMap
          onSelectCity={handleSelectCity}
          onSelectRegion={handleSelectRegion}
          regions={worldRegions}
          selectedRegionId={selectedRegionId}
        />

        {!enabled && (
          <section className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-5 py-8 text-center">
            <p className="text-sm text-slate-400">{tr.app.minChars}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              {selectedRegion.name}: {selectedRegion.climate}
            </p>
          </section>
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
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <CurrentWeather weather={current} />
            <WeatherChart forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
