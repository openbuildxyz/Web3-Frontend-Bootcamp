const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NFTMarketDeployment", (m) => {
  const myToken = m.contract("MyToken", [
    ethers.utils.parseUnits("1000000", 18),
  ]);
  const myNFT = m.contract("MyNFT");
  const nftMarket = m.contract("NFTMarket", [m.getContract("MyToken")]);

  return { myToken, myNFT, nftMarket };
});
