require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 1337
    }
  }
};
