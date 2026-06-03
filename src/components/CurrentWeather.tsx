import { Droplets, Gauge, Wind } from 'lucide-react'

import { tr } from '../i18n/tr'
import type { CurrentWeatherResponse } from '../types/weather'
import { cn } from '../utils/cn'

interface CurrentWeatherProps {
  weather: CurrentWeatherResponse
  className?: string
}

export function CurrentWeather({ weather, className }: CurrentWeatherProps) {
  const condition = weather.weather[0]
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : null

  return (
    <section
      className={cn(
        'rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-lg backdrop-blur',
        className,
      )}
      aria-label={tr.current.ariaLabel}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
            {weather.sys.country}
          </p>
          <h1 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">
            {weather.name}
          </h1>
          {condition && (
            <p className="mt-1 capitalize text-zinc-300">
              {condition.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {iconUrl && (
            <img
              src={iconUrl}
              alt=""
              width={96}
              height={96}
              className="size-24"
            />
          )}
          <p className="text-5xl font-light text-zinc-50 tabular-nums">
            {Math.round(weather.main.temp)}
            <span className="text-3xl text-zinc-400">°C</span>
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric
          icon={Droplets}
          label={tr.current.humidity}
          value={`${weather.main.humidity}%`}
        />
        <Metric
          icon={Wind}
          label={tr.current.wind}
          value={`${weather.wind.speed} ${tr.current.windUnit}`}
        />
        <Metric
          icon={Gauge}
          label={tr.current.pressure}
          value={`${weather.main.pressure} ${tr.current.pressureUnit}`}
        />
        <Metric
          icon={Gauge}
          label={tr.current.feelsLike}
          value={`${Math.round(weather.main.feels_like)}°C`}
        />
      </dl>
    </section>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Droplets
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-3">
      <dt className="flex items-center gap-2 text-xs text-zinc-400">
        <Icon className="size-4 shrink-0 text-sky-400" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1 text-lg font-medium text-zinc-100">{value}</dd>
    </div>
  )
}
