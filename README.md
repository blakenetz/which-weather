# Which Weather

Compare weather forecasts across 3 major services.

Live @ <https://which-weather-production.up.railway.app>

Swagger UI @ <https://server-production-da7a.up.railway.app/docs>

## Tech Stack

- Nest.js backend
- React frontend
- Documentation w/ Swagger
- Testing w/ vitest and jest

## Setup

1. Create server and client `.env` files

   ```cli
     cp apps/server/.env.sample apps/server/.env
     touch apps/web/.env.local
   ```

2. Register with 3rd party providers and fill in server `.env` file with appropriate values

   - [AccuWeather](https://developer.accuweather.com)
   - [OpenWeather](https://openweathermap.org/)

3. If using a custom port, assign `PORT` env values

   ```cli
   echo "PORT=1234" >> apps/server/.env
   echo "VITE_SERVER_URL=http://localhost:1234" >> apps/web/.env.local
   ```

4. This project uses [pnpm](https://pnpm.io/), so [install](https://pnpm.io/installation) if necessary
