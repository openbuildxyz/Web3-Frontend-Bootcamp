const FederCoin = artifacts.require("FederCoin");
const NFTMarket = artifacts.require("NFTMarket");
const FederNFT = artifacts.require("FederNFT");

module.exports = async function (deployer) {
    await deployer.deploy(FederCoin);
    const federCoin = await FederCoin.deployed();

    await deployer.deploy(FederNFT);
    const federNFT = await FederNFT.deployed();

    await deployer.deploy(NFTMarket, federCoin.address);
    const nftMarket = await NFTMarket.deployed();

    console.log("FederCoin deployed at:", federCoin.address);
    console.log("FederNFT deployed at:", federNFT.address);
    console.log("NFTMarket deployed at:", nftMarket.address);

};