# Global Weather Explorer

Interactive weather dashboard with a world-map first screen, regional discovery, smart city search, current conditions, and a 5-day forecast chart powered by OpenWeatherMap.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-EB6E4B?logo=openweathermap&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green)

Repository: [github.com/noutrexx/weather-dashboard](https://github.com/noutrexx/weather-dashboard)

## Preview

![Global Weather Explorer world map](./public/screenshots/home-map-full.png)

## What It Does

- Starts with a clickable world-region map instead of an empty search-only screen.
- Lets users select regions such as Europe, Asia, Africa, Oceania, and the Americas.
- Shows curated quick cities for each selected region.
- Provides smart city suggestions and popular city shortcuts for faster searching.
- Displays current temperature, humidity, wind, pressure, and feels-like values.
- Visualizes the 5-day temperature and humidity forecast with Recharts.
- Handles missing API keys, invalid cities, pending keys, and network errors with clear Turkish messages.

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, clsx, tailwind-merge |
| Weather Data | Axios, OpenWeatherMap |
| Data Visualization | Recharts |
| Icons | Lucide React |
| Tooling | ESLint, TypeScript project references |

## Setup

Requirements:

- Node.js 18 or newer
- npm
- OpenWeatherMap API key

Install dependencies:

```bash
git clone https://github.com/noutrexx/weather-dashboard.git
cd weather-dashboard
npm install
```

Create an environment file:

```bash
copy .env.example .env
```

Add your OpenWeatherMap key:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Check the API key:

```bash
node scripts/check-api.mjs
```

Run locally:

```bash
npm run dev
```

The Vite dev server usually runs at [http://localhost:5173](http://localhost:5173).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
  components/  Search, map, weather cards, alerts, charts
  data/        World-region and city-option metadata
  hooks/       Fetching and debounce hooks
  i18n/        Turkish UI copy and API message translation
  services/    OpenWeatherMap client
  types/       Weather API response types
  utils/       Forecast, error, and class-name helpers
```

## Production Notes

- New OpenWeatherMap API keys can take 10-120 minutes to become active.
- The Vite proxy injects API key, units, and Turkish language parameters during local development.
- For production deployments, define `VITE_OPENWEATHER_API_KEY` in the hosting platform environment variables.
- The current chart bundle includes Recharts; code-splitting can be added later if stricter bundle budgets are needed.

## License

MIT License. See [LICENSE](./LICENSE).
