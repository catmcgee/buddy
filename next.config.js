/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
