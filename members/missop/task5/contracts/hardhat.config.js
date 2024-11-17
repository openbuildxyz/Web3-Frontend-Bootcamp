require("dotenv").config();
require("hardhat-deploy");
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");

/**
 * @type {import('hardhat/config').HardhatUserConfig}
 */
const config = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
      gas: 30_000_000,
      gasPrice: 8000000000,
    },
    hardhat: {
      chainId: 31337,
      gas: 30_000_000,
      gasPrice: 8000000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};

module.exports = config;
