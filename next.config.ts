import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '10010',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        protocol: 'http',
        hostname: '*.local',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.local',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default nextConfig;
