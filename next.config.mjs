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

export default nextConfig;
