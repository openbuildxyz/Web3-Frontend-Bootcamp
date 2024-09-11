/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/Web3-Frontend-Bootcamp',
    output: 'export',
  } : undefined),
  reactStrictMode: true,
};

export default nextConfig;
