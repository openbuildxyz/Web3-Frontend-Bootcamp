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
    const createNFTHash3 = await myNFT.write.createNFT(["https://www.lem.com"]);
    const { logs } = await publicClient.waitForTransactionReceipt({
      hash: createNFTHash3,
    });
    const nftId = Number(logs[2].topics[1]);

    assert.equal(nftId, 0);

    // 给交易所授权
    await myNFT.write.approve([myMarket.address, BigInt(nftId)]);

    // 上架nft
    await myMarket.write.listNFT([myNFT.address, BigInt(nftId), BigInt(100)]);
    // 获取所有上架的nft
    const allListings = await myMarket.read.getAllListings();

    assert.equal(allListings.length, 1);
    // 获取nft的URI
    const tokenURI = await myNFT.read.tokenURI([allListings[0].tokenId]);
    assert.equal(tokenURI, 'https://www.lem.com');

    // 给交易所授权多少个代币
    await myToken.write.approve([myMarket.address, 100000n])

    // 购买nft
    await myMarket.write.purchaseNFT([BigInt(nftId)]);
    // 查看nft的拥有者
    const owner = await myNFT.read.ownerOf([BigInt(nftId)]);
    const [bobWalletClient] =
    await hre.viem.getWalletClients();
    assert.equal(owner, bobWalletClient.account.address);

  });
});
