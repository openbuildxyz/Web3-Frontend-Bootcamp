/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/Web3-Frontend-Bootcamp',
    output: 'export',
    images: { unoptimized: true },
  } : undefined),
  reactStrictMode: true,
};

export default nextConfig;
