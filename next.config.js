/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['biiibo.com', 'drive.google.com', 'd3q01gc7kwv7n6.cloudfront.net', 'iqvinc.com', 'www.biiibo.com'],
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
      {
        source: '/manager',
        destination: '/manager/dashboard/revenue',
        permanent: true,
      },
      {
        source: '/manager/order',
        destination: '/manager/order/online',
        permanent: true,
      },
      {
        source: '/manager/warehouse',
        destination: '/manager/warehouse/instock',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
