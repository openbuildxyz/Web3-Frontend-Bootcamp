import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ledger";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/${process.env.INFURA_API_KEY}",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY ?? ""],
    },
  },
};

export default config;
