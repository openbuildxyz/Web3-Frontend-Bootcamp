require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require('dotenv').config();

// 合约验证本地网络异常需要加以下配置
// const { ProxyAgent, setGlobalDispatcher } = require("undici");
// const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
// setGlobalDispatcher(proxyAgent);
const { INFURA_ID, WALLET_PRIVATE_KEY, ETHERS_API_HARDHAT_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
    },
  },
  verify: {
    etherscan: {
      apiKey: ETHERS_API_HARDHAT_KEY
    }
  },
  // 合约验证
  etherscan: {
    apiKey: ETHERS_API_HARDHAT_KEY
  },
  sourcify: {
    enabled: true
  },

};
