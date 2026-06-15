import axios from 'axios'

import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from '../types/weather'
import { getErrorMessage } from '../utils/errors'

const weatherClient = axios.create({
  baseURL: '/api/weather',
  params: {
    endpoint: 'weather',
  },
})

export async function fetchCurrentWeather(
  city: string,
): Promise<CurrentWeatherResponse> {
  try {
    const { data } = await weatherClient.get<CurrentWeatherResponse>('', {
      params: { endpoint: 'weather', q: city.trim() },
    })
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}

export async function fetchForecast(city: string): Promise<ForecastResponse> {
  try {
    const { data } = await weatherClient.get<ForecastResponse>('', {
      params: { endpoint: 'forecast', q: city.trim() },
    })
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}

export async function fetchCurrentWeatherBatch(
  cities: string[],
): Promise<Record<string, CurrentWeatherResponse>> {
  const entries = await Promise.allSettled(
    cities.map(async (city) => [city, await fetchCurrentWeather(city)] as const),
  )

  return entries.reduce<Record<string, CurrentWeatherResponse>>(
    (result, entry) => {
      if (entry.status === 'fulfilled') {
        const [city, weather] = entry.value
        result[city] = weather
      }
      return result
    },
    {},
  )
}
