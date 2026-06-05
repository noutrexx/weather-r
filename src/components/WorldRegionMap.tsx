import { CloudSun, MapPin } from 'lucide-react'

import type { CityOption, RegionId, WorldRegion } from '../data/worldRegions'
import { tr } from '../i18n/tr'
import { cn } from '../utils/cn'

interface WorldRegionMapProps {
  regions: WorldRegion[]
  selectedRegionId: RegionId
  onSelectRegion: (regionId: RegionId) => void
  onSelectCity: (city: CityOption) => void
}

export function WorldRegionMap({
  regions,
  selectedRegionId,
  onSelectRegion,
  onSelectCity,
}: WorldRegionMapProps) {
  const selectedRegion =
    regions.find((region) => region.id === selectedRegionId) ?? regions[0]

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-sky-950/20">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.4fr)_360px]">
        <div className="relative min-h-[430px] overflow-hidden bg-[radial-gradient(circle_at_50%_25%,rgba(14,165,233,0.16),transparent_36%),linear-gradient(180deg,#07111f,#020617)] p-4 sm:p-6">
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
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-100">
              {selectedRegion.name}
            </span>
          </div>

          <svg
            className="relative z-10 h-[330px] w-full"
            viewBox="0 0 1000 620"
            role="img"
            aria-label={tr.map.ariaLabel}
          >
            <defs>
              <filter
                id="regionGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              cx="500"
              cy="315"
              rx="460"
              ry="245"
              fill="rgba(15,23,42,0.72)"
              stroke="rgba(148,163,184,0.12)"
            />
            {regions.map((region) => {
              const isSelected = region.id === selectedRegionId

              return (
                <path
                  aria-label={`${region.name} bölgesini seç`}
                  className={cn(
                    'cursor-pointer stroke-slate-950/80 stroke-[3] transition duration-300',
                    isSelected ? 'fill-sky-300' : 'fill-slate-700 hover:fill-sky-500',
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
          </svg>
        </div>

        <aside className="border-t border-slate-800 bg-slate-900/80 p-5 lg:border-t-0 lg:border-l">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            {tr.map.selectedRegion}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {selectedRegion.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {selectedRegion.description}
          </p>
          <div className="mt-4 rounded-2xl border border-slate-700/80 bg-slate-950/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {tr.map.climateProfile}
            </p>
            <p className="mt-2 text-sm text-slate-200">{selectedRegion.climate}</p>
          </div>

          <div className="mt-5">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
              <MapPin className="size-4 text-sky-300" aria-hidden />
              {tr.map.quickCities}
            </p>
            <div className="grid gap-2">
              {selectedRegion.cities.map((city) => (
                <button
                  className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/50 px-3 py-2 text-left text-sm text-slate-200 transition hover:border-sky-400/70 hover:bg-sky-400/10"
                  key={city.query}
                  onClick={() => onSelectCity(city)}
                  type="button"
                >
                  <span>{city.label}</span>
                  <span className="text-xs font-bold text-slate-500">{city.country}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
