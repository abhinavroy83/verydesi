/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "d1be4virimwdjl.cloudfront.net",
      "images.unsplash.com",
      "cdn.openart.ai",
    ],
  },
};

export default nextConfig;
