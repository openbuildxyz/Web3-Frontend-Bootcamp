/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    config.resolve.extensionAlias = {
      ".js": [".js", ".ts"],
    };
    return config;
  },
};

export default nextConfig;
