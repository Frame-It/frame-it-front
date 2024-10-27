import withPWAInit from '@ducanh2912/next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/vworld/:path*',
        destination: 'https://api.vworld.kr/:path*',
      },
    ];
  },
};

export default withPWA(nextConfig);
