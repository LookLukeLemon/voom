/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
