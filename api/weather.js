const ALLOWED_ENDPOINTS = new Set(['weather', 'forecast'])
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY?.trim()
  const endpoint = String(request.query.endpoint ?? '')
  const city = String(request.query.q ?? '').trim()

  if (!apiKey) {
    return response.status(503).json({ message: 'Weather API is not configured' })
  }

  if (!ALLOWED_ENDPOINTS.has(endpoint) || !city || city.length > 120) {
    return response.status(400).json({ message: 'Invalid weather request' })
  }

  const url = new URL(`${OPENWEATHER_BASE_URL}/${endpoint}`)
  url.searchParams.set('q', city)
  url.searchParams.set('appid', apiKey)
  url.searchParams.set('units', 'metric')
  url.searchParams.set('lang', 'en')
  if (endpoint === 'forecast') url.searchParams.set('cnt', '40')

  try {
    const upstream = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })
    const body = await upstream.text()

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    response.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'application/json')
    return response.status(upstream.status).send(body)
  } catch {
    return response.status(502).json({ message: 'Weather provider is unavailable' })
  }
}
