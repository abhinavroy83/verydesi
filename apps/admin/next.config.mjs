/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};
module.exports = {
  serverRuntimeConfig: {
    port: 3001,
  },
};
export default nextConfig;
