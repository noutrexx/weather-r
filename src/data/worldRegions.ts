export type RegionId =
  | 'north-america'
  | 'south-america'
  | 'europe'
  | 'africa'
  | 'middle-east'
  | 'asia'
  | 'oceania'

export type CityOption = {
  city: string
  country: string
  label: string
  query: string
}

export type WorldRegion = {
  id: RegionId
  name: string
  description: string
  climate: string
  cities: CityOption[]
  shape: string
}

export const worldRegions: WorldRegion[] = [
  {
    id: 'north-america',
    name: 'Kuzey Amerika',
    description: 'Atlantik ve Pasifik kıyılarında hızlı hava değişimleri.',
    climate: 'Kıyı fırtınaları, soğuk cepheler, sıcak dalgaları',
    shape:
      'M89 118 C116 72 183 54 238 80 C274 97 294 126 285 155 C270 202 219 207 194 246 C171 282 115 274 103 230 C95 201 61 174 89 118 Z',
    cities: [
      { city: 'New York', country: 'US', label: 'New York', query: 'New York,US' },
      { city: 'Toronto', country: 'CA', label: 'Toronto', query: 'Toronto,CA' },
      { city: 'Los Angeles', country: 'US', label: 'Los Angeles', query: 'Los Angeles,US' },
      { city: 'Mexico City', country: 'MX', label: 'Mexico City', query: 'Mexico City,MX' },
    ],
  },
  {
    id: 'south-america',
    name: 'Güney Amerika',
    description: 'And dağları ve tropikal kuşak arasında güçlü kontrast.',
    climate: 'Tropikal yağış, yüksek rakım, kıyı nemi',
    shape:
      'M257 333 C290 338 318 370 308 405 C300 434 285 458 292 492 C300 535 266 579 236 553 C211 531 228 489 204 459 C180 428 184 378 213 354 C225 344 238 332 257 333 Z',
    cities: [
      { city: 'Sao Paulo', country: 'BR', label: 'Sao Paulo', query: 'Sao Paulo,BR' },
      { city: 'Buenos Aires', country: 'AR', label: 'Buenos Aires', query: 'Buenos Aires,AR' },
      { city: 'Lima', country: 'PE', label: 'Lima', query: 'Lima,PE' },
      { city: 'Bogota', country: 'CO', label: 'Bogota', query: 'Bogota,CO' },
    ],
  },
  {
    id: 'europe',
    name: 'Avrupa',
    description: 'Kısa mesafede değişen sıcaklık, rüzgar ve yağış desenleri.',
    climate: 'Atlantik sistemleri, Akdeniz etkisi, karasal soğuk',
    shape:
      'M421 127 C455 102 511 105 538 134 C556 154 546 182 518 190 C489 198 459 184 430 201 C398 220 363 194 371 160 C375 145 390 134 421 127 Z',
    cities: [
      { city: 'Istanbul', country: 'TR', label: 'İstanbul', query: 'Istanbul,TR' },
      { city: 'London', country: 'GB', label: 'London', query: 'London,GB' },
      { city: 'Berlin', country: 'DE', label: 'Berlin', query: 'Berlin,DE' },
      { city: 'Paris', country: 'FR', label: 'Paris', query: 'Paris,FR' },
      { city: 'Rome', country: 'IT', label: 'Rome', query: 'Rome,IT' },
    ],
  },
  {
    id: 'africa',
    name: 'Afrika',
    description: 'Sahra, savan ve kıyı bölgeleri arasında geniş hava ölçeği.',
    climate: 'Sıcak dalgaları, muson yağışları, çöl rüzgarları',
    shape:
      'M444 233 C486 215 543 236 560 283 C578 333 536 367 533 415 C531 456 494 502 457 476 C429 456 437 413 408 386 C376 356 383 295 416 260 C424 251 431 241 444 233 Z',
    cities: [
      { city: 'Cairo', country: 'EG', label: 'Cairo', query: 'Cairo,EG' },
      { city: 'Lagos', country: 'NG', label: 'Lagos', query: 'Lagos,NG' },
      { city: 'Cape Town', country: 'ZA', label: 'Cape Town', query: 'Cape Town,ZA' },
      { city: 'Nairobi', country: 'KE', label: 'Nairobi', query: 'Nairobi,KE' },
    ],
  },
  {
    id: 'middle-east',
    name: 'Orta Doğu',
    description: 'Kurak hava, sıcak dalgaları ve geçiş mevsimi sistemleri.',
    climate: 'Kuru sıcak, toz taşınımı, kıyı nemi',
    shape:
      'M547 205 C591 198 636 214 654 247 C669 274 646 306 611 306 C576 306 548 281 531 253 C518 232 524 211 547 205 Z',
    cities: [
      { city: 'Dubai', country: 'AE', label: 'Dubai', query: 'Dubai,AE' },
      { city: 'Riyadh', country: 'SA', label: 'Riyadh', query: 'Riyadh,SA' },
      { city: 'Doha', country: 'QA', label: 'Doha', query: 'Doha,QA' },
      { city: 'Tel Aviv', country: 'IL', label: 'Tel Aviv', query: 'Tel Aviv,IL' },
    ],
  },
  {
    id: 'asia',
    name: 'Asya',
    description: 'Muson, karasal soğuk ve tropikal sistemlerin geniş alanı.',
    climate: 'Muson yağışları, tayfunlar, karasal sıcaklık farkı',
    shape:
      'M612 112 C689 74 814 100 878 160 C927 205 921 289 855 319 C799 344 754 310 707 339 C665 365 610 340 604 293 C599 251 563 226 576 184 C582 151 589 126 612 112 Z',
    cities: [
      { city: 'Tokyo', country: 'JP', label: 'Tokyo', query: 'Tokyo,JP' },
      { city: 'Seoul', country: 'KR', label: 'Seoul', query: 'Seoul,KR' },
      { city: 'Singapore', country: 'SG', label: 'Singapore', query: 'Singapore,SG' },
      { city: 'Bangkok', country: 'TH', label: 'Bangkok', query: 'Bangkok,TH' },
      { city: 'Mumbai', country: 'IN', label: 'Mumbai', query: 'Mumbai,IN' },
    ],
  },
  {
    id: 'oceania',
    name: 'Okyanusya',
    description: 'Ada iklimleri, deniz rüzgarları ve güney yarımküre cepheleri.',
    climate: 'Okyanus etkisi, kıyı rüzgarı, tropikal nem',
    shape:
      'M806 430 C845 407 895 418 918 452 C942 489 903 523 858 510 C822 499 773 471 806 430 Z',
    cities: [
      { city: 'Sydney', country: 'AU', label: 'Sydney', query: 'Sydney,AU' },
      { city: 'Melbourne', country: 'AU', label: 'Melbourne', query: 'Melbourne,AU' },
      { city: 'Auckland', country: 'NZ', label: 'Auckland', query: 'Auckland,NZ' },
      { city: 'Perth', country: 'AU', label: 'Perth', query: 'Perth,AU' },
    ],
  },
]

export const popularCities: CityOption[] = [
  { city: 'Istanbul', country: 'TR', label: 'İstanbul', query: 'Istanbul,TR' },
  { city: 'Ankara', country: 'TR', label: 'Ankara', query: 'Ankara,TR' },
  { city: 'Izmir', country: 'TR', label: 'İzmir', query: 'Izmir,TR' },
  { city: 'London', country: 'GB', label: 'London', query: 'London,GB' },
  { city: 'New York', country: 'US', label: 'New York', query: 'New York,US' },
  { city: 'Tokyo', country: 'JP', label: 'Tokyo', query: 'Tokyo,JP' },
  { city: 'Dubai', country: 'AE', label: 'Dubai', query: 'Dubai,AE' },
  { city: 'Sydney', country: 'AU', label: 'Sydney', query: 'Sydney,AU' },
]

export const cityOptions = [
  ...popularCities,
  ...worldRegions.flatMap((region) => region.cities),
].filter(
  (city, index, items) =>
    items.findIndex((item) => item.query === city.query) === index,
)
