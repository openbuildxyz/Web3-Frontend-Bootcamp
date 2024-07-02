/** @type {import('next').NextConfig} */
const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
//   transpilePackages: [
//     '@uniswap/widgets',
//     '@uniswap/conedison'
//   ],
};

export default nextConfig;
