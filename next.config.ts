/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.aceternity.com', 
      'fastly.picsum.photos',
      "img.freepik.com", 
      "localhost",
      // Add any other image hostnames you want to use
    ],
  },
};

module.exports = nextConfig;