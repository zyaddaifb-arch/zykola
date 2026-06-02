/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
    formats: ['image/avif', 'image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  turbopack: {
    root: process.cwd(),
  },
}

module.exports = nextConfig
