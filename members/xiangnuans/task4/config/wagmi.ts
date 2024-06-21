import { createConfig, http } from "wagmi";

import { config as dotenvConfig } from "dotenv"
import { resolve } from "path";
import { sepolia } from "wagmi/chains";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const { INFURA_PROJECT_ID } = process.env;

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`)
  }
})