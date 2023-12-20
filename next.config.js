/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['biiibo.com', 'drive.google.com'],
  },
  //http://mm.khangdev.id.vn/';
  async redirects() {
    return [
      {
        source: '/staff',
        destination: '/staff/dashboard/revenue',
        permanent: true,
      },
      {
        source: '/staff/order',
        destination: '/staff/order/online',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
