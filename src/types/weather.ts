export interface Coordinates {
  lon: number
  lat: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainWeatherMetrics {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Clouds {
  all: number
}

export interface RainVolume {
  '1h'?: number
  '3h'?: number
}

export interface SnowVolume {
  '1h'?: number
  '3h'?: number
}

export interface SysInfo {
  type?: number
  id?: number
  country?: string
  sunrise?: number
  sunset?: number
  pod?: 'd' | 'n'
}

export interface CurrentWeatherResponse {
  coord: Coordinates
  weather: WeatherCondition[]
  base: string
  main: MainWeatherMetrics
  visibility: number
  wind: Wind
  clouds: Clouds
  rain?: RainVolume
  snow?: SnowVolume
  dt: number
  sys: SysInfo & {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface ForecastListItem {
  dt: number
  main: MainWeatherMetrics & {
    temp_kf?: number
  }
  weather: WeatherCondition[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: RainVolume
  snow?: SnowVolume
  sys: Pick<SysInfo, 'pod'>
  dt_txt: string
}

export interface ForecastCity {
  id: number
  name: string
  coord: Coordinates
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: ForecastListItem[]
  city: ForecastCity
}

export interface ForecastChartPoint {
  date: string
  label: string
  temp: number
  tempMin: number
  tempMax: number
  humidity: number
}

export interface OpenWeatherErrorResponse {
  cod: string | number
  message: string
}
