/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const prodPath = '/reportportal'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? prodPath : '/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'akamai',
    path: isProd ? prodPath : '/',
  },
  env: {
    linksPath: isProd ? prodPath : '',
    jwtSecretKey: 'XwYYh4ihttaTbfBAL6Cq23YkABxpk',
  }
}

module.exports = nextConfig
