export const tr = {
  app: {
    title: 'Global Weather Explorer',
    subtitle:
      'Dünya haritasından bölge seçin, şehirleri hızlıca keşfedin ve 5 günlük hava tahminini tek ekranda izleyin.',
    minChars:
      'Başlamak için haritadan bir bölge seçin ya da arama kutusuna en az 2 karakter yazın.',
  },
  search: {
    placeholder: 'Şehir ara (İstanbul, Tokyo, New York)...',
    ariaLabel: 'Şehir ara',
    suggestions: 'Önerilen şehirler',
    popular: 'Popüler şehirler',
    clear: 'Aramayı temizle',
  },
  map: {
    eyebrow: 'Dünya haritası',
    title: 'Bölge seç, şehirleri hızlıca keşfet.',
    selectedRegion: 'Seçili bölge',
    climateProfile: 'İklim profili',
    quickCities: 'Hızlı şehirler',
    ariaLabel: 'Tıklanabilir dünya bölge haritası',
  },
  current: {
    ariaLabel: 'Güncel hava durumu',
    humidity: 'Nem',
    wind: 'Rüzgar',
    pressure: 'Basınç',
    feelsLike: 'Hissedilen',
    windUnit: 'm/sn',
    pressureUnit: 'hPa',
  },
  chart: {
    title: '5 Günlük Tahmin',
    ariaLabel: '5 günlük tahmin grafiği',
    temperature: 'Sıcaklık',
    humidity: 'Nem',
  },
  loading: {
    ariaLabel: 'Hava durumu yükleniyor',
  },
  errors: {
    cityNotFound: 'Şehir bulunamadı. Yazımı kontrol edip tekrar deneyin.',
    invalidApiKey:
      'OpenWeatherMap bu API anahtarını kabul etmiyor. Panelden yeni anahtar oluşturun, .env dosyasına yapıştırın ve 10-120 dakika bekleyin.',
    apiKeyPending:
      'API anahtarınız henüz aktif değil. OpenWeatherMap yeni anahtarları genelde 10 dakika ile 2 saat içinde açar; sonra sayfayı yenileyin.',
    networkError:
      'Ağ hatası. İnternet bağlantınızı kontrol edin veya geliştirme sunucusunu yeniden başlatın (npm run dev).',
    requestFailed: 'İstek başarısız oldu. Lütfen tekrar deneyin.',
    generic: 'Bir şeyler ters gitti. Lütfen tekrar deneyin.',
    missingApiKey:
      'VITE_OPENWEATHER_API_KEY tanımlı değil. .env dosyanıza ekleyin.',
  },
} as const

const apiMessageMap: Record<string, string> = {
  'city not found': tr.errors.cityNotFound,
  'nothing to geocode': tr.errors.cityNotFound,
  'invalid API key': tr.errors.invalidApiKey,
  'Invalid API key': tr.errors.invalidApiKey,
  'Please note API key': tr.errors.invalidApiKey,
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
