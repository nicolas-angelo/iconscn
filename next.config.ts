import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
    globalNotFound: true,
    optimizePackageImports: ['@icons-pack/react-simple-icons'],
  },
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'unpkg.com',
      },
    ],
  },
}

export default nextConfig
