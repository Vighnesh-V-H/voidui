// @ts-check

const { withContentlayer } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = withContentlayer(nextConfig)
