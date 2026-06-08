import axios from 'axios'

import { tr } from '../i18n/tr'
import type {
  CurrentWeatherResponse,
  ForecastResponse,
} from '../types/weather'
import { getErrorMessage } from '../utils/errors'

const isDev = import.meta.env.DEV

const BASE_URL = isDev ? '/owm' : 'https://api.openweathermap.org/data/2.5'

const apiKey = (import.meta.env.VITE_OPENWEATHER_API_KEY ?? '').trim()

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    ...(isDev ? {} : { appid: apiKey }),
    units: 'metric',
    lang: 'tr',
  },
})

function assertApiKey(): void {
  if (isDev) {
    return
  }
  if (!apiKey) {
    throw new Error(tr.errors.missingApiKey)
  }
}

export async function fetchCurrentWeather(
  city: string,
): Promise<CurrentWeatherResponse> {
  assertApiKey()

  try {
    const { data } = await weatherClient.get<CurrentWeatherResponse>('/weather', {
      params: { q: city.trim() },
    })
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}

export async function fetchForecast(city: string): Promise<ForecastResponse> {
  assertApiKey()

  try {
    const { data } = await weatherClient.get<ForecastResponse>('/forecast', {
      params: { q: city.trim(), cnt: 40 },
    })
    return data
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: error })
  }
}
