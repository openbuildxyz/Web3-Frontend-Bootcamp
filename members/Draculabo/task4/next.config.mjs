/** @type {import('next').NextConfig} */
const nextConfig = {};

import dotenvx from '@dotenvx/dotenvx'
dotenvx.config({
    path: '.env', // 指定 .env 文件的路径
  encoding: 'utf8',     // 指定文件的编码
})
export default nextConfig;
