import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity-hosted assets — every image on the site, including the
      // seeded placeholder photography, is served from here: scripts/seed.ts
      // uploads the source Unsplash photos into Sanity's asset pipeline
      // rather than hotlinking images.unsplash.com directly.
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
}

export default nextConfig
