import hre from "hardhat";
import { expect, assert } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

// A deployment function to set up the initial state
const deploy = async () => {
  const myToken = await hre.viem.deployContract("ERC20Token", [1_000_000n]);
  const myNFT = await hre.viem.deployContract("NFT");

  const myMarket = await hre.viem.deployContract("NFTMarket", [
    myToken.address,
  ]);

  return { myMarket, myNFT, myToken };
};

describe("MyMarket Contract Tests", function () {
  it("MyMarket listNFT", async function () {
    // Load the contract instance using the deployment function
    const { myMarket, myNFT, myToken } = await loadFixture(deploy);
    const publicClient = await hre.viem.getPublicClient();
    // 铸造NFT
    const createNFTHash1 = await myNFT.write.createNFT(["https://www.lem.com"]);
    const createNFTHash2 = await myNFT.write.createNFT(["https://www.lem.com"]);
    const { logs: logs1 } = await publicClient.waitForTransactionReceipt({
      hash: createNFTHash1,
    });
    const { logs: logs2 } = await publicClient.waitForTransactionReceipt({
      hash: createNFTHash2,
    });
    const nftId1 = Number(logs1[2].topics[1]);
    const nftId2 = Number(logs2[2].topics[1]);

    assert.equal(nftId1, 0);
    assert.equal(nftId2, 1);

    // 给交易所授权
    await myNFT.write.approve([myMarket.address, BigInt(nftId1)]);
    await myNFT.write.approve([myMarket.address, BigInt(nftId2)]);

    // 上架nft
    await myMarket.write.listNFT([myNFT.address, BigInt(nftId1), BigInt(100)]);
    await myMarket.write.listNFT([myNFT.address, BigInt(nftId2), BigInt(200)]);

    // 获取所有上架的nft
    const allListings1 = await myMarket.read.getAllSellingListings();
    assert.equal(allListings1.length, 2);

    // 下架nft
    await myMarket.write.delistNFT([BigInt(nftId1)])

    // 获取所有上架的nft
    const allListings2 = await myMarket.read.getAllSellingListings();
    assert.equal(allListings2.length, 1);

    // 获取nft的URI
    const tokenURI = await myNFT.read.tokenURI([allListings1[0].tokenId]);
    assert.equal(tokenURI, 'https://www.lem.com');

    // 给交易所授权多少个代币
    await myToken.write.approve([myMarket.address, 100000n])

    // 购买nft
    await myMarket.write.purchaseNFT([BigInt(nftId2)]);
    // 查看nft的拥有者
    const owner = await myNFT.read.ownerOf([BigInt(nftId2)]);
    const [bobWalletClient] = await hre.viem.getWalletClients();
    assert.equal(owner.toLowerCase(), bobWalletClient.account.address);

  });
});
