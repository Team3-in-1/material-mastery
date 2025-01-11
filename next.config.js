/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'biiibo.com',
      'drive.google.com',
      'd3q01gc7kwv7n6.cloudfront.net',
      'iqvinc.com',
      'www.biiibo.com',
      'khogachre.vn',
    ],
  },
  //http://mm.khangdev.id.vn/';
}

module.exports = nextConfig
