import { Clock3, CloudSun, Droplets, Gauge, Wind } from 'lucide-react'

import { en } from '../i18n/en'
import type { CurrentWeatherResponse, ForecastResponse } from '../types/weather'
import { cn } from '../utils/cn'
import { WeatherChart } from './WeatherChart'

interface CityWeatherConsoleProps {
  current: CurrentWeatherResponse
  forecast: ForecastResponse | null
}

function formatLocalTime(timezone: number) {
  const localTimestamp = Date.now() + timezone * 1000
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(localTimestamp)
}

export function CityWeatherConsole({
  current,
  forecast,
}: CityWeatherConsoleProps) {
  const condition = current.weather[0]
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : null

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/30">
      <div className="grid gap-0 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_34%),linear-gradient(180deg,#0f172a,#020617)] p-6 lg:border-r lg:border-b-0">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-300 via-cyan-300 to-amber-200" />
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-200">
            <CloudSun className="size-4" aria-hidden />
            City Weather Console
          </p>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                {current.sys.country}
              </p>
              <h2 className="mt-1 text-4xl font-semibold text-white">
                {current.name}
              </h2>
              {condition && (
                <p className="mt-2 capitalize text-slate-300">
                  {condition.description}
                </p>
              )}
            </div>
            {iconUrl && (
              <img
                alt=""
                className="size-20 rounded-2xl bg-slate-950/40"
                height={80}
                src={iconUrl}
                width={80}
              />
            )}
          </div>

          <div className="mt-8 flex items-end gap-2">
            <p className="text-7xl font-light leading-none text-white tabular-nums">
              {Math.round(current.main.temp)}
            </p>
            <span className="pb-2 text-3xl text-slate-400">°C</span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <ConsoleMetric
              icon={Droplets}
              label={en.current.humidity}
              value={`${current.main.humidity}%`}
            />
            <ConsoleMetric
              icon={Wind}
              label={en.current.wind}
              value={`${current.wind.speed} ${en.current.windUnit}`}
            />
            <ConsoleMetric
              icon={Gauge}
              label={en.current.feelsLike}
              value={`${Math.round(current.main.feels_like)}°C`}
            />
            <ConsoleMetric
              icon={Clock3}
              label="Local time"
              value={formatLocalTime(current.timezone)}
            />
          </div>
        </div>

        <div className="bg-slate-950/35 p-4 sm:p-6">
          <WeatherChart forecast={forecast} />
        </div>
      </div>
    </section>
  )
}

function ConsoleMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Droplets
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-950/45 p-3">
      <p className="flex items-center gap-2 text-xs text-slate-400">
        <Icon className="size-4 shrink-0 text-sky-300" aria-hidden />
        {label}
      </p>
      <p className={cn('mt-1 font-semibold text-slate-100', 'tabular-nums')}>
        {value}
      </p>
    </div>
  )
}
