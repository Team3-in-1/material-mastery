/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['biiibo.com'],
  }
  //   publicRuntimeConfig: {
  //     apiUrl:
  //       process.env.NODE_ENV === "development"
  //         ? "http://localhost:3002/api" // development api
  //         : "http://localhost:3002/api", // production api
  //   },
};

module.exports = nextConfig;
