const MyToken = artifacts.require("MyToken");
const MyNFT = artifacts.require("MyNFT");
const NFTMarket = artifacts.require("NFTMarket");

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, 1000000);
  await deployer.deploy(MyNFT);
  await deployer.deploy(NFTMarket, MyToken.address);
};
