const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ACCEPTED_TOKEN = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

module.exports = buildModule("NFTMarketModule", (m) => {
  const NFTMarket = m.contract("NFTMarket", [ACCEPTED_TOKEN]);

  return { NFTMarket };
});
