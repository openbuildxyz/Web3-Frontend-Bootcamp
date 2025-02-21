require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 60000, // 增加超时时间到60秒
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // 简化配置
    customChains: [], // 如果需要自定义链，可以在这里添加
  },
  sourcify: {
    enabled: true, // 启用 Sourcify 验证
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 60000, // 增加测试超时时间
  },
};
