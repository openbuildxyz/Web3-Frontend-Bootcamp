import dotenv from "dotenv";
const parsedEnv = dotenv.config().parsed;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: parsedEnv,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bronze-elderly-pheasant-478.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};

export default nextConfig;
