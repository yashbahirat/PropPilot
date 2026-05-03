import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.clerk.com' },
      { protocol: 'https', hostname: '**.uploadthing.com' },
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'uploadthing.com' },
    ],
  },
}

export default nextConfig
