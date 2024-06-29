import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";

import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from 'dotenv';
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, './.env') });
const { INFURA_PROJECT_ID, NFT_PRIVATE_KEY } = process.env;


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
    },
    // hardhat: {
    //   accounts: [
    //     {
    //       privateKey: `0x${NFT_PRIVATE_KEY}`,
    //       balance: '1000000000000000000',
    //     }
    //   ],
    // },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${NFT_PRIVATE_KEY}`],
    },
  },
};

export default config;
