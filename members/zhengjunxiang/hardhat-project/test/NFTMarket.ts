import hre from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

// A deployment function to set up the initial state
const deploy = async () => {
  const myToken = await hre.viem.deployContract("ERC20Token", [1_000_000n]);
  const myNFT = await hre.viem.deployContract("NFT");

  const myMarket = await hre.viem.deployContract("NFTMarket", [myToken.address]);

  return { myMarket, myNFT };
};

describe("MyMarket Contract Tests", function () {
  it("MyMarket listNFT", async function () {
    // Load the contract instance using the deployment function
    const { myMarket, myNFT } = await loadFixture(deploy);
    // 铸造NFT
    const nftId = await myNFT.write.createNFT(['https://www.lem.com'])
    console.log('nftId', nftId)
    // 给交易所授权
    // await myNFT.write.approve([myMarket.address, BigInt(nftId)]);

    // 上架nft
    // await myMarket.write.listNFT([myNFT.address, BigInt(nftId), BigInt(100)]);

    // Assert that the supply increased as expected
    // assert.equal(initialSupply + 500_000n, newSupply);
  });

});