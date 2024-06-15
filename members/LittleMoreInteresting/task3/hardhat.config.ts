import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";
import * as dotenv from "dotenv";
dotenv.config();

const { API_URL, PRIVATE_KEY } = process.env;
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  etherscan: {
    apiKey: {
      sepolia:ETHERSCAN_API_KEY
    }
  },
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [`${PRIVATE_KEY}`]
   }
  }
};

export default config;
