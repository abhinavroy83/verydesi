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
      "www.pixelstalk.net",
      "static.toiimg.com",
      "img.budgettravel.com",
      "th.bing.com",
      "youtu.be/UWdfaNWThnA?si=L3nCQGx1UshjFCZM"
    ],
  },
};

export default nextConfig;
