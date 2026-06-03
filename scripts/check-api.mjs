import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve(process.cwd(), '.env')
const env = readFileSync(envPath, 'utf8')
const match = env.match(/^\s*VITE_OPENWEATHER_API_KEY\s*=\s*(\S+)\s*$/m)

if (!match) {
  console.log('SONUC: .env dosyasında anahtar yok')
  process.exit(1)
}

const key = match[1]
const url = new URL('https://api.openweathermap.org/data/2.5/weather')
url.searchParams.set('q', 'Istanbul')
url.searchParams.set('appid', key)
url.searchParams.set('units', 'metric')

const res = await fetch(url)
const body = await res.text()

if (res.ok) {
  const data = JSON.parse(body)
  console.log(`SONUC: OK (${res.status}) — ${data.name}`)
} else {
  console.log(`SONUC: HATA (${res.status})`)
  console.log(body.slice(0, 300))
}
