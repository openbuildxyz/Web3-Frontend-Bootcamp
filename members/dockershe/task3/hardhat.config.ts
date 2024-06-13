import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


import "@nomicfoundation/hardhat-ignition-ethers";


require('dotenv').config();



// 在使用 process.env.PRIVATE_KEY 前，检查它是否被定义且不为空，或者使用默认值。这样可以确保传递给 accounts 的值总是字符串类型。
if (!process.env.PRIVATE_KEY) {
  throw new Error('PRIVATE_KEY environment variable is not set.');
}


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },

  }
  
};

export default config;
