import type { CSSProperties } from 'react'

const themeMap: Record<string, CSSProperties> = {
  Thunderstorm: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(168,85,247,0.22), transparent 28%), radial-gradient(circle at 84% 12%, rgba(14,165,233,0.16), transparent 30%)',
  },
  Drizzle: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(96,165,250,0.18), transparent 28%), radial-gradient(circle at 84% 12%, rgba(20,184,166,0.10), transparent 30%)',
  },
  Rain: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(59,130,246,0.22), transparent 28%), radial-gradient(circle at 84% 12%, rgba(20,184,166,0.12), transparent 30%)',
  },
  Snow: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(226,232,240,0.18), transparent 28%), radial-gradient(circle at 84% 12%, rgba(125,211,252,0.16), transparent 30%)',
  },
  Mist: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(148,163,184,0.14), transparent 28%), radial-gradient(circle at 84% 12%, rgba(100,116,139,0.12), transparent 30%)',
  },
  Smoke: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(120,113,108,0.18), transparent 28%), radial-gradient(circle at 84% 12%, rgba(87,83,78,0.14), transparent 30%)',
  },
  Haze: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(217,119,6,0.12), transparent 28%), radial-gradient(circle at 84% 12%, rgba(148,163,184,0.14), transparent 30%)',
  },
  Fog: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(148,163,184,0.14), transparent 28%), radial-gradient(circle at 84% 12%, rgba(100,116,139,0.12), transparent 30%)',
  },
  Clear: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(250,204,21,0.16), transparent 28%), radial-gradient(circle at 84% 12%, rgba(56,189,248,0.18), transparent 30%)',
  },
  Clouds: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(148,163,184,0.18), transparent 28%), radial-gradient(circle at 84% 12%, rgba(14,165,233,0.14), transparent 30%)',
  },
  Squall: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(100,116,139,0.22), transparent 28%), radial-gradient(circle at 84% 12%, rgba(59,130,246,0.18), transparent 30%)',
  },
  Tornado: {
    background:
      'radial-gradient(circle at 16% 8%, rgba(120,53,15,0.20), transparent 28%), radial-gradient(circle at 84% 12%, rgba(168,85,247,0.18), transparent 30%)',
  },
}

export function getWeatherThemeStyle(condition?: string): CSSProperties {
  return (
    themeMap[condition ?? ''] ?? {
      background:
        'radial-gradient(circle at 16% 8%, rgba(56,189,248,0.18), transparent 28%), radial-gradient(circle at 84% 12%, rgba(20,184,166,0.12), transparent 30%)',
    }
  )
}
