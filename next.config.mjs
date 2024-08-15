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
    ],
  },
};

export default withPWA(nextConfig);
