import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

const { vars } = require("hardhat/config");
const SEPOLIA_RPC_URL = vars.get('SEPOLIA_RPC_URL');
const PRIVATE_KEY = vars.get('PRIVATE_KEY');

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6"
  },
  networks: {
    sepolia: {
      url: `${SEPOLIA_RPC_URL}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;