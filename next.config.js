/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
module.exports = {
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};
