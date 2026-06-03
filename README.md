# Weather Dashboard

React, TypeScript and Vite ile hazirlanmis hava durumu paneli. Sehir aramasi yapildiginda guncel hava kosullari, temel metrikler ve 5 gunluk sicaklik/nem grafigi OpenWeatherMap API uzerinden gosterilir.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

Repository: [github.com/noutrexx/weather-r](https://github.com/noutrexx/weather-r)

## Screenshots

### Desktop

![Weather dashboard desktop](./public/screenshots/istanbul-weather.png)

### Empty State

![Weather dashboard empty state](./public/screenshots/home-empty.png)

### Mobile

![Weather dashboard mobile](./public/screenshots/mobile-istanbul.png)

## Features

- Debounced city search with a 500 ms delay
- Current temperature, humidity, wind, pressure and feels-like values
- 5-day forecast chart built with Recharts
- Turkish interface and Turkish API responses
- Vite proxy for local API calls
- Clear states for loading, missing API keys, invalid cities and network errors

## Tech Stack

| Area | Tools |
| --- | --- |
| Core | React, TypeScript, Vite |
| Styling | Tailwind CSS, clsx, tailwind-merge |
| Data | Axios, OpenWeatherMap |
| Charts | Recharts |
| Icons | Lucide React |

## Requirements

- Node.js 18 or newer
- npm
- OpenWeatherMap API key

## Setup

```bash
git clone https://github.com/noutrexx/weather-r.git
cd weather-r
npm install
```

Create `.env` from the example file:

```bash
copy .env.example .env
```

Set your API key:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

You can verify the key with:

```bash
node scripts/check-api.mjs
```

Start the project:

```bash
npm run dev
```

The local app usually opens at `http://localhost:5173`.

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
  components/  UI components
  hooks/       React hooks
  i18n/        Turkish copy and API message translation
  services/    OpenWeatherMap client
  types/       Weather API types
  utils/       Helpers for errors, forecast data and class names
```

## API Key

Create a free key from the [OpenWeatherMap API keys page](https://home.openweathermap.org/api_keys). New keys can take a little time to become active. After changing `.env`, restart the development server.

## License

This project is open source and can be used for learning or personal work.
