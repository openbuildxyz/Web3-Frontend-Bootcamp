require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/6279d4261e3d4f399740f35db635fca4",
      accounts: [`0x3a171d60234f91f6d20b9eef721f61483a56405265aba7bdac03c363ce811392`]
    }
  }
};
