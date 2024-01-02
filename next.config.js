/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/lily-portfolio-afc57.appspot.com/**'
      }
    ]
  }
};
module.exports = nextConfig
