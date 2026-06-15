import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'

const allowedEndpoints = new Set(['weather', 'forecast'])

function localWeatherApi(apiKey: string): Plugin {
  return {
    name: 'local-weather-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/weather', async (request, response) => {
        const requestUrl = new URL(request.url ?? '', 'http://localhost')
        const endpoint = requestUrl.searchParams.get('endpoint') ?? ''
        const city = requestUrl.searchParams.get('q')?.trim() ?? ''

        if (!apiKey) {
          response.statusCode = 503
          response.end(JSON.stringify({ message: 'Weather API is not configured' }))
          return
        }

        if (!allowedEndpoints.has(endpoint) || !city || city.length > 120) {
          response.statusCode = 400
          response.end(JSON.stringify({ message: 'Invalid weather request' }))
          return
        }

        const url = new URL(`https://api.openweathermap.org/data/2.5/${endpoint}`)
        url.searchParams.set('q', city)
        url.searchParams.set('appid', apiKey)
        url.searchParams.set('units', 'metric')
        url.searchParams.set('lang', 'en')
        if (endpoint === 'forecast') url.searchParams.set('cnt', '40')

        try {
          const upstream = await fetch(url)
          response.statusCode = upstream.status
          response.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json')
          response.end(await upstream.text())
        } catch {
          response.statusCode = 502
          response.end(JSON.stringify({ message: 'Weather provider is unavailable' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.OPENWEATHER_API_KEY?.trim() ?? ''

  if (mode === 'development' && !apiKey) {
    console.warn(
      '[weather-dashboard] Warning: OPENWEATHER_API_KEY was not found in .env.',
    )
  }

  return {
    plugins: [react(), localWeatherApi(apiKey)],
  }
})
