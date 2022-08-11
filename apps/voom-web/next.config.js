/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `/:path*`,
      },
    ];
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
