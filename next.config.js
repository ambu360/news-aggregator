/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
  WEATHER_API_KEY : process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  GEOCODE_API : process.env.NEXT_PUBLIC_GEOCODE_API
  }
}

module.exports = nextConfig
