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
};

export default nextConfig;
