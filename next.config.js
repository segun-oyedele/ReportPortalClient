/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const prodPath = isProd? "/reportportal": ""

const nextConfig = {
  reactStrictMode: true,
  basePath: prodPath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    iisPath: prodPath
  }
}

module.exports = nextConfig
