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
  x: number
  y: number
}

export type WorldRegion = {
  id: RegionId
  name: string
  description: string
  climate: string
  signal: string
  highlights: string[]
  cities: CityOption[]
  shape: string
}

export const worldRegions: WorldRegion[] = [
  {
    id: 'north-america',
    name: 'Kuzey Amerika',
    description: 'Atlantik ve Pasifik kıyılarında hızlı hava değişimleri.',
    climate: 'Kıyı fırtınaları, soğuk cepheler, sıcak dalgaları',
    signal: 'Cephe geçişleri ve kıyı sistemleri sık takip edilir.',
    highlights: ['Jet stream', 'Kıyı fırtınası', 'Sıcak dalgası'],
    shape:
      'M89 118 C116 72 183 54 238 80 C274 97 294 126 285 155 C270 202 219 207 194 246 C171 282 115 274 103 230 C95 201 61 174 89 118 Z',
    cities: [
      { city: 'New York', country: 'US', label: 'New York', query: 'New York,US', x: 245, y: 168 },
      { city: 'Toronto', country: 'CA', label: 'Toronto', query: 'Toronto,CA', x: 226, y: 145 },
      { city: 'Los Angeles', country: 'US', label: 'Los Angeles', query: 'Los Angeles,US', x: 148, y: 188 },
      { city: 'Mexico City', country: 'MX', label: 'Mexico City', query: 'Mexico City,MX', x: 190, y: 245 },
    ],
  },
  {
    id: 'south-america',
    name: 'Güney Amerika',
    description: 'And dağları ve tropikal kuşak arasında güçlü kontrast.',
    climate: 'Tropikal yağış, yüksek rakım, kıyı nemi',
    signal: 'Rakım farkı ve tropikal nem aynı ekranda izlenir.',
    highlights: ['And etkisi', 'Tropikal yağış', 'Kıyı nemi'],
    shape:
      'M257 333 C290 338 318 370 308 405 C300 434 285 458 292 492 C300 535 266 579 236 553 C211 531 228 489 204 459 C180 428 184 378 213 354 C225 344 238 332 257 333 Z',
    cities: [
      { city: 'Sao Paulo', country: 'BR', label: 'Sao Paulo', query: 'Sao Paulo,BR', x: 286, y: 445 },
      { city: 'Buenos Aires', country: 'AR', label: 'Buenos Aires', query: 'Buenos Aires,AR', x: 270, y: 505 },
      { city: 'Lima', country: 'PE', label: 'Lima', query: 'Lima,PE', x: 218, y: 402 },
      { city: 'Bogota', country: 'CO', label: 'Bogota', query: 'Bogota,CO', x: 235, y: 344 },
    ],
  },
  {
    id: 'europe',
    name: 'Avrupa',
    description: 'Kısa mesafede değişen sıcaklık, rüzgar ve yağış desenleri.',
    climate: 'Atlantik sistemleri, Akdeniz etkisi, karasal soğuk',
    signal: 'Batıdan gelen sistemler şehir bazlı tahminleri hızla değiştirir.',
    highlights: ['Atlantik akışı', 'Akdeniz etkisi', 'Karasal soğuk'],
    shape:
      'M421 127 C455 102 511 105 538 134 C556 154 546 182 518 190 C489 198 459 184 430 201 C398 220 363 194 371 160 C375 145 390 134 421 127 Z',
    cities: [
      { city: 'Istanbul', country: 'TR', label: 'İstanbul', query: 'Istanbul,TR', x: 548, y: 184 },
      { city: 'London', country: 'GB', label: 'London', query: 'London,GB', x: 400, y: 146 },
      { city: 'Berlin', country: 'DE', label: 'Berlin', query: 'Berlin,DE', x: 466, y: 126 },
      { city: 'Paris', country: 'FR', label: 'Paris', query: 'Paris,FR', x: 420, y: 176 },
      { city: 'Rome', country: 'IT', label: 'Rome', query: 'Rome,IT', x: 468, y: 206 },
    ],
  },
  {
    id: 'africa',
    name: 'Afrika',
    description: 'Sahra, savan ve kıyı bölgeleri arasında geniş hava ölçeği.',
    climate: 'Sıcak dalgaları, muson yağışları, çöl rüzgarları',
    signal: 'Sahra sıcakları ve kıyı nemi güçlü kontrast oluşturur.',
    highlights: ['Sahra sıcakları', 'Muson hattı', 'Kıyı geçişi'],
    shape:
      'M444 233 C486 215 543 236 560 283 C578 333 536 367 533 415 C531 456 494 502 457 476 C429 456 437 413 408 386 C376 356 383 295 416 260 C424 251 431 241 444 233 Z',
    cities: [
      { city: 'Cairo', country: 'EG', label: 'Cairo', query: 'Cairo,EG', x: 524, y: 242 },
      { city: 'Lagos', country: 'NG', label: 'Lagos', query: 'Lagos,NG', x: 454, y: 340 },
      { city: 'Cape Town', country: 'ZA', label: 'Cape Town', query: 'Cape Town,ZA', x: 486, y: 475 },
      { city: 'Nairobi', country: 'KE', label: 'Nairobi', query: 'Nairobi,KE', x: 535, y: 360 },
    ],
  },
  {
    id: 'middle-east',
    name: 'Orta Doğu',
    description: 'Kurak hava, sıcak dalgaları ve geçiş mevsimi sistemleri.',
    climate: 'Kuru sıcak, toz taşınımı, kıyı nemi',
    signal: 'Sıcaklık, toz ve nem değişimleri şehir seçiminde öne çıkar.',
    highlights: ['Toz taşınımı', 'Kuru sıcak', 'Kıyı nemi'],
    shape:
      'M547 205 C591 198 636 214 654 247 C669 274 646 306 611 306 C576 306 548 281 531 253 C518 232 524 211 547 205 Z',
    cities: [
      { city: 'Dubai', country: 'AE', label: 'Dubai', query: 'Dubai,AE', x: 624, y: 282 },
      { city: 'Riyadh', country: 'SA', label: 'Riyadh', query: 'Riyadh,SA', x: 590, y: 284 },
      { city: 'Doha', country: 'QA', label: 'Doha', query: 'Doha,QA', x: 615, y: 274 },
      { city: 'Tel Aviv', country: 'IL', label: 'Tel Aviv', query: 'Tel Aviv,IL', x: 550, y: 238 },
    ],
  },
  {
    id: 'asia',
    name: 'Asya',
    description: 'Muson, karasal soğuk ve tropikal sistemlerin geniş alanı.',
    climate: 'Muson yağışları, tayfunlar, karasal sıcaklık farkı',
    signal: 'Muson hattı, tropikal sistemler ve şehir yoğunluğu birlikte izlenir.',
    highlights: ['Muson hattı', 'Tayfun riski', 'Karasal fark'],
    shape:
      'M612 112 C689 74 814 100 878 160 C927 205 921 289 855 319 C799 344 754 310 707 339 C665 365 610 340 604 293 C599 251 563 226 576 184 C582 151 589 126 612 112 Z',
    cities: [
      { city: 'Tokyo', country: 'JP', label: 'Tokyo', query: 'Tokyo,JP', x: 858, y: 210 },
      { city: 'Seoul', country: 'KR', label: 'Seoul', query: 'Seoul,KR', x: 808, y: 198 },
      { city: 'Singapore', country: 'SG', label: 'Singapore', query: 'Singapore,SG', x: 738, y: 350 },
      { city: 'Bangkok', country: 'TH', label: 'Bangkok', query: 'Bangkok,TH', x: 724, y: 305 },
      { city: 'Mumbai', country: 'IN', label: 'Mumbai', query: 'Mumbai,IN', x: 652, y: 288 },
    ],
  },
  {
    id: 'oceania',
    name: 'Okyanusya',
    description: 'Ada iklimleri, deniz rüzgarları ve güney yarımküre cepheleri.',
    climate: 'Okyanus etkisi, kıyı rüzgarı, tropikal nem',
    signal: 'Deniz etkisi şehir tahminlerinde hızlı hissedilir.',
    highlights: ['Okyanus etkisi', 'Kıyı rüzgarı', 'Tropikal nem'],
    shape:
      'M806 430 C845 407 895 418 918 452 C942 489 903 523 858 510 C822 499 773 471 806 430 Z',
    cities: [
      { city: 'Sydney', country: 'AU', label: 'Sydney', query: 'Sydney,AU', x: 888, y: 472 },
      { city: 'Melbourne', country: 'AU', label: 'Melbourne', query: 'Melbourne,AU', x: 858, y: 494 },
      { city: 'Auckland', country: 'NZ', label: 'Auckland', query: 'Auckland,NZ', x: 936, y: 486 },
      { city: 'Perth', country: 'AU', label: 'Perth', query: 'Perth,AU', x: 796, y: 468 },
    ],
  },
]

export const popularCities: CityOption[] = [
  { city: 'Istanbul', country: 'TR', label: 'İstanbul', query: 'Istanbul,TR', x: 548, y: 184 },
  { city: 'Ankara', country: 'TR', label: 'Ankara', query: 'Ankara,TR', x: 536, y: 188 },
  { city: 'Izmir', country: 'TR', label: 'İzmir', query: 'Izmir,TR', x: 512, y: 190 },
  { city: 'London', country: 'GB', label: 'London', query: 'London,GB', x: 400, y: 146 },
  { city: 'New York', country: 'US', label: 'New York', query: 'New York,US', x: 245, y: 168 },
  { city: 'Tokyo', country: 'JP', label: 'Tokyo', query: 'Tokyo,JP', x: 858, y: 210 },
  { city: 'Dubai', country: 'AE', label: 'Dubai', query: 'Dubai,AE', x: 624, y: 282 },
  { city: 'Sydney', country: 'AU', label: 'Sydney', query: 'Sydney,AU', x: 888, y: 472 },
]

export const cityOptions = [
  ...popularCities,
  ...worldRegions.flatMap((region) => region.cities),
].filter(
  (city, index, items) =>
    items.findIndex((item) => item.query === city.query) === index,
)
