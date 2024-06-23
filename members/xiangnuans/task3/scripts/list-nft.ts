import { marketAddress, nftAddress } from "./config";

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const tokenId = 1; // 你想要上架的NFT的Token ID
  const price = ethers.parseEther("10"); // 上架价格
  const tokenURI = "https://my-json-server.typicode.com/abcoathup/samplenft/tokens/1"; // NFT的元数据URI

  console.log("Deploying with account:", deployer.address);

  // 获取合约实例
  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = NFT.attach(nftAddress);
  console.log("NFT contract attached:", nftAddress);

  const Market = await ethers.getContractFactory("NFTMarket");
  const market = Market.attach(marketAddress);
  console.log("Market contract attached:", marketAddress);

  // 铸造NFT并上架
  try {
    console.log("Minting NFT...");
    await nft.mint(deployer.address, tokenURI);
    console.log("NFT minted successfully.");
  } catch (error) {
    console.error("Error minting NFT:", error);
    process.exit(1);
  }

  try {
    console.log("Approving NFT for transfer...");
    await nft.approve(marketAddress, tokenId);
    console.log("NFT approved for transfer.");
  } catch (error) {
    console.error("Error approving NFT for transfer:", error);
    process.exit(1);
  }

  try {
    console.log("Listing NFT on the market...");
    await market.listNFT(nftAddress, tokenId, price);
    console.log(`NFT with tokenId ${tokenId} listed on the market by ${deployer.address}`);
  } catch (error) {
    console.error("Error Listing NFT on the market :", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
