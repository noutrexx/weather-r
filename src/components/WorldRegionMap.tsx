import { Activity, CloudSun, Compass, MapPin, Waves } from 'lucide-react'

import type { CityOption, RegionId, WorldRegion } from '../data/worldRegions'
import { tr } from '../i18n/tr'
import { cn } from '../utils/cn'

interface WorldRegionMapProps {
  regions: WorldRegion[]
  selectedCityQuery: string
  selectedRegionId: RegionId
  onSelectRegion: (regionId: RegionId) => void
  onSelectCity: (city: CityOption) => void
}

export function WorldRegionMap({
  regions,
  selectedCityQuery,
  selectedRegionId,
  onSelectRegion,
  onSelectCity,
}: WorldRegionMapProps) {
  const selectedRegion =
    regions.find((region) => region.id === selectedRegionId) ?? regions[0]

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-sky-950/20">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_380px]">
        <div className="relative min-h-[500px] overflow-hidden bg-[linear-gradient(180deg,#07111f,#020617)] p-4 sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_28%,rgba(56,189,248,0.20),transparent_30%),radial-gradient(circle_at_18%_80%,rgba(20,184,166,0.12),transparent_28%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-sky-200">
                <CloudSun className="size-4" aria-hidden />
                {tr.map.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {tr.map.title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.highlights.map((highlight) => (
                <span
                  className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-100"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <svg
            className="relative z-10 h-[390px] w-full"
            viewBox="0 0 1000 620"
            role="img"
            aria-label={tr.map.ariaLabel}
          >
            <defs>
              <filter
                id="regionGlow"
                x="-25%"
                y="-25%"
                width="150%"
                height="150%"
              >
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="oceanLine" x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#67e8f9" stopOpacity="0.6" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>

            <ellipse
              cx="500"
              cy="315"
              rx="460"
              ry="250"
              fill="rgba(15,23,42,0.74)"
              stroke="rgba(148,163,184,0.14)"
            />
            {[170, 245, 320, 395, 470].map((cy) => (
              <ellipse
                cx="500"
                cy={cy}
                fill="none"
                key={cy}
                rx="430"
                ry={Math.max(20, Math.abs(320 - cy) + 35)}
                stroke="rgba(125,211,252,0.08)"
              />
            ))}
            {[250, 375, 500, 625, 750].map((cx) => (
              <path
                d={`M${cx} 82 C${cx - 75} 230 ${cx - 75} 390 ${cx} 555`}
                fill="none"
                key={cx}
                stroke="rgba(125,211,252,0.08)"
              />
            ))}

            <path
              d="M210 210 C340 120 515 125 675 170 C805 205 868 272 904 350"
              fill="none"
              stroke="url(#oceanLine)"
              strokeDasharray="12 14"
              strokeWidth="3"
            />
            <path
              d="M290 458 C430 380 600 356 760 396 C838 416 896 454 930 500"
              fill="none"
              stroke="rgba(45,212,191,0.22)"
              strokeDasharray="10 13"
              strokeWidth="3"
            />

            {regions.map((region) => {
              const isSelected = region.id === selectedRegionId

              return (
                <path
                  aria-label={`${region.name} bölgesini seç`}
                  className={cn(
                    'cursor-pointer stroke-slate-950/80 stroke-[3] transition duration-300',
                    isSelected
                      ? 'fill-sky-300'
                      : 'fill-slate-700/90 hover:fill-sky-500',
                  )}
                  d={region.shape}
                  filter={isSelected ? 'url(#regionGlow)' : undefined}
                  key={region.id}
                  onClick={() => onSelectRegion(region.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectRegion(region.id)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                />
              )
            })}

            {selectedRegion.cities.map((city) => {
              const isSelected = city.query === selectedCityQuery

              return (
                <g key={city.query}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    fill={isSelected ? '#facc15' : '#020617'}
                    r={isSelected ? 9 : 6}
                    stroke={isSelected ? '#fde68a' : '#7dd3fc'}
                    strokeWidth="3"
                  />
                  <circle
                    cx={city.x}
                    cy={city.y}
                    fill="none"
                    r={isSelected ? 18 : 13}
                    stroke={isSelected ? 'rgba(250,204,21,0.42)' : 'rgba(125,211,252,0.24)'}
                    strokeWidth="2"
                  />
                  <text
                    fill={isSelected ? '#fef3c7' : '#cbd5e1'}
                    fontSize="18"
                    fontWeight="700"
                    x={city.x + 16}
                    y={city.y + 6}
                  >
                    {city.label}
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="relative z-10 mt-1 grid gap-3 sm:grid-cols-3">
            <MapMetric
              icon={Compass}
              label="Bölge odağı"
              value={selectedRegion.name}
            />
            <MapMetric
              icon={Activity}
              label="Hava sinyali"
              value={selectedRegion.highlights[0]}
            />
            <MapMetric
              icon={Waves}
              label="Keşif noktası"
              value={`${selectedRegion.cities.length} şehir`}
            />
          </div>
        </div>

        <aside className="border-t border-slate-800 bg-slate-900/85 p-5 lg:border-t-0 lg:border-l">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            {tr.map.selectedRegion}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {selectedRegion.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {selectedRegion.description}
          </p>

          <div className="mt-4 grid gap-3">
            <PanelCard label={tr.map.climateProfile} value={selectedRegion.climate} />
            <PanelCard label="Canlı okuma" value={selectedRegion.signal} />
          </div>

          <div className="mt-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <MapPin className="size-4 text-sky-300" aria-hidden />
              {tr.map.quickCities}
            </p>
            <div className="grid gap-2">
              {selectedRegion.cities.map((city) => {
                const isSelected = city.query === selectedCityQuery

                return (
                  <button
                    className={cn(
                      'flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition',
                      isSelected
                        ? 'border-amber-300/70 bg-amber-300/10 text-amber-50'
                        : 'border-slate-700 bg-slate-950/50 text-slate-200 hover:border-sky-400/70 hover:bg-sky-400/10',
                    )}
                    key={city.query}
                    onClick={() => onSelectCity(city)}
                    type="button"
                  >
                    <span>{city.label}</span>
                    <span className="text-xs font-bold text-slate-500">
                      {city.country}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function MapMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Compass
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/55 p-3 backdrop-blur">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        <Icon className="size-4 text-sky-300" aria-hidden />
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  )
}

function PanelCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-950/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
    </div>
  )
}
