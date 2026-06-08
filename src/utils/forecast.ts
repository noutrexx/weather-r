import type { ForecastChartPoint, ForecastResponse } from '../types/weather'

function formatDateLabel(dateKey: string): string {
  const date = new Date(`${dateKey}T12:00:00`)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function toForecastChartData(
  forecast: ForecastResponse,
): ForecastChartPoint[] {
  const buckets = new Map<string, { temps: number[]; humidities: number[] }>()

  for (const item of forecast.list) {
    const dateKey = item.dt_txt.split(' ')[0] ?? ''
    if (!dateKey) continue

    const bucket = buckets.get(dateKey) ?? { temps: [], humidities: [] }
    bucket.temps.push(item.main.temp)
    bucket.humidities.push(item.main.humidity)
    buckets.set(dateKey, bucket)
  }

  return Array.from(buckets.entries())
    .slice(0, 5)
    .map(([date, { temps, humidities }]) => {
      const temp =
        temps.reduce((sum, value) => sum + value, 0) / Math.max(temps.length, 1)
      const humidity =
        humidities.reduce((sum, value) => sum + value, 0) /
        Math.max(humidities.length, 1)

      return {
        date,
        label: formatDateLabel(date),
        temp: Math.round(temp * 10) / 10,
        humidity: Math.round(humidity),
      }
    })
}
