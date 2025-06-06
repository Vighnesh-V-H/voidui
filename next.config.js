import withContentlayer from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
}

module.exports = withContentlayer(nextConfig)
