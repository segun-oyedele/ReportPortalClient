/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const prodPath = isProd? '/reportportalclient': ""

const nextConfig = {
  reactStrictMode: true,
  basePath: prodPath,
  // assetPrefix: isProd ? prodPath : '/',
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
    iisPath: isProd ? prodPath : ''
  }
}

module.exports = nextConfig
