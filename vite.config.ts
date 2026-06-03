import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import type { ProxyOptions } from 'vite'

function createOwmProxy(apiKey: string): Record<string, ProxyOptions> {
  return {
    '/owm': {
      target: 'https://api.openweathermap.org',
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/owm/, '/data/2.5'),
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq) => {
          if (!apiKey || !proxyReq.path) return

          const hasQuery = proxyReq.path.includes('?')
          const params = new URLSearchParams(
            hasQuery ? proxyReq.path.split('?')[1] : '',
          )

          if (!params.has('appid')) params.set('appid', apiKey)
          if (!params.has('units')) params.set('units', 'metric')
          if (!params.has('lang')) params.set('lang', 'tr')

          const pathname = hasQuery
            ? proxyReq.path.split('?')[0]
            : proxyReq.path
          proxyReq.path = `${pathname}?${params.toString()}`
        })
      },
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.VITE_OPENWEATHER_API_KEY?.trim() ?? ''
  const owmProxy = createOwmProxy(apiKey)

  if (mode === 'development' && !apiKey) {
    console.warn(
      '[weather-r] Uyarı: .env içinde VITE_OPENWEATHER_API_KEY bulunamadı.',
    )
  }

  return {
    plugins: [react()],
    server: { proxy: owmProxy },
    preview: { proxy: owmProxy },
  }
})
