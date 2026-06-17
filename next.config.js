/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wedding-invitation' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wedding-invitation/' : '',
  experimental: {
    disableOptimizedLoading: true,
  }
}

module.exports = nextConfig 