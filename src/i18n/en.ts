export const en = {
  app: {
    title: 'Global Weather Explorer',
    subtitle:
      'Select a region on the world map, discover cities quickly, and monitor the 5-day forecast from one focused screen.',
    minChars:
      'Select a region on the map or type at least 2 characters in the search box to begin.',
  },
  search: {
    placeholder: 'Search city (Istanbul, Tokyo, New York)...',
    ariaLabel: 'Search city',
    suggestions: 'Suggested cities',
    popular: 'Popular cities',
    clear: 'Clear search',
  },
  map: {
    eyebrow: 'World map',
    title: 'Pick a region, explore cities instantly.',
    selectedRegion: 'Selected region',
    climateProfile: 'Climate profile',
    quickCities: 'Quick cities',
    ariaLabel: 'Clickable world region map',
  },
  current: {
    ariaLabel: 'Current weather',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    feelsLike: 'Feels like',
    windUnit: 'm/s',
    pressureUnit: 'hPa',
  },
  chart: {
    title: '5-Day Forecast',
    ariaLabel: '5-day forecast chart',
    temperature: 'Avg temp',
    tempMin: 'Min temp',
    tempMax: 'Max temp',
    humidity: 'Humidity',
  },
  loading: {
    ariaLabel: 'Loading weather data',
  },
  errors: {
    cityNotFound: 'City not found. Check the spelling and try again.',
    invalidApiKey:
      'OpenWeatherMap rejected this API key. Create a new key, paste it into .env, and wait 10-120 minutes.',
    apiKeyPending:
      'Your API key is not active yet. New OpenWeatherMap keys usually activate within 10 minutes to 2 hours; refresh the page afterwards.',
    networkError:
      'Network error. Check your internet connection or restart the development server (npm run dev).',
    requestFailed: 'Request failed. Please try again.',
    generic: 'Something went wrong. Please try again.',
    missingApiKey:
      'VITE_OPENWEATHER_API_KEY is not defined. Add it to your .env file.',
  },
} as const

const apiMessageMap: Record<string, string> = {
  'city not found': en.errors.cityNotFound,
  'nothing to geocode': en.errors.cityNotFound,
  'invalid API key': en.errors.invalidApiKey,
  'Invalid API key': en.errors.invalidApiKey,
  'Please note API key': en.errors.invalidApiKey,
}

export function translateApiMessage(message: string): string {
  const normalized = message.trim().toLowerCase()
  for (const [key, value] of Object.entries(apiMessageMap)) {
    if (normalized.includes(key.toLowerCase())) {
      return value
    }
  }
  return message
}
