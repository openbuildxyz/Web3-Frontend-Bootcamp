require('dotenv').config()
require("@nomicfoundation/hardhat-ignition-ethers");

// https://hardhat.org/hardhat-runner/docs/guides/verifying
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY, process.env.SEPOLIA_PRIVATE_KEY_2],
      // accounts: [process.env.SEPOLIA_PRIVATE_KEY_2],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
