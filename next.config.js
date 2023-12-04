/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['biiibo.com'],
  },
};

module.exports = nextConfig;
