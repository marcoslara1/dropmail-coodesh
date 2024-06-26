/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        BASE_URL: process.env.BASE_URL,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, child_process: false };
        return config;
    },
}

module.exports = nextConfig
