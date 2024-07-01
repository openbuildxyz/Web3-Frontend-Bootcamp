// @ts-check
import { config } from "@debbl/eslint-config";

export default config({
  typescript: true,
  react: {
    next: true,
    compiler: true,
  },
  tailwindcss: true,
});
