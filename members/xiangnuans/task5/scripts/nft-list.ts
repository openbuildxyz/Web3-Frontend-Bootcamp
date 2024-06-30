import { MarketAddress } from "./config";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Market = await ethers.getContractFactory("NFTMarket");
  const market = Market.attach(MarketAddress);
  console.log("Market contract attached:", MarketAddress);

  // 获取已上架的所有列表
  try {
    const onSellListings = await market.getAllListings();
    console.log("get NFT List onSell", onSellListings);
  } catch (error) {
    console.error("Error get NFT List:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
