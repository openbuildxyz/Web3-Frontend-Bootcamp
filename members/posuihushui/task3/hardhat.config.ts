import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";

import { vars } from "hardhat/config";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  typechain: {
    target: "ethers-v6",
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
// npx hardhat vars set INFURA_API_KEY
