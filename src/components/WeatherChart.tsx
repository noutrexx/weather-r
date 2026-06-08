import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { en } from '../i18n/en'
import type { ForecastResponse } from '../types/weather'
import { cn } from '../utils/cn'
import { toForecastChartData } from '../utils/forecast'

interface WeatherChartProps {
  forecast: ForecastResponse | null
  className?: string
}

export function WeatherChart({ forecast, className }: WeatherChartProps) {
  const chartData = useMemo(
    () => (forecast ? toForecastChartData(forecast) : []),
    [forecast],
  )

  if (!forecast || chartData.length === 0) {
    return null
  }

  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg backdrop-blur sm:p-6',
        className,
      )}
      aria-label={en.chart.ariaLabel}
    >
      <h2 className="mb-4 text-lg font-medium text-slate-100">
        {en.chart.title}
      </h2>
      <div className="h-72 w-full min-h-[288px] sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
            />
            <YAxis
              yAxisId="temp"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
              unit="°C"
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
              }}
              formatter={(value, name) => {
                const numeric =
                  typeof value === 'number' ? value : Number(value ?? 0)
                const key = String(name)
                if (key === 'temp') return [`${numeric}°C`, en.chart.temperature]
                if (key === 'tempMin') return [`${numeric}°C`, en.chart.tempMin]
                if (key === 'tempMax') return [`${numeric}°C`, en.chart.tempMax]
                if (key === 'humidity') return [`${numeric}%`, en.chart.humidity]
                return [numeric, key]
              }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1', paddingTop: 12 }} />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="tempMax"
              name={en.chart.tempMax}
              stroke="#f97316"
              fill="url(#tempGradient)"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              dot={false}
            />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              name={en.chart.temperature}
              stroke="#38bdf8"
              fill="url(#tempGradient)"
              strokeWidth={2}
            />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="tempMin"
              name={en.chart.tempMin}
              stroke="#818cf8"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              dot={false}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              name={en.chart.humidity}
              stroke="#a78bfa"
              strokeWidth={2}
              dot={{ fill: '#a78bfa', r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
