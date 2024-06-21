import { marketAddress, tokenAddress } from "./config";

import { ethers } from "hardhat";

async function main() {
  const [buyer] = await ethers.getSigners();
  console.log("Buyer address:", buyer.address);

  const market = await ethers.getContractAt("NFTMarket", marketAddress);
  console.log("Market contract attached:", marketAddress, market);


  // 获取列表中的第3个NFT信息
  const listing = await market.listings(2);
  console.log("Market listing:", listing);

  const seller = listing.seller;
  const price = listing.price;
  const nftContract = listing.nftContract;
  const tokenId = listing.tokenId;

  console.log("Market seller:", seller);
  console.log("NFT Contract Address:", nftContract);
  console.log("Token ID:", tokenId);
  console.log("Price:", price.toString());

  // 获取支付代币的合约地址
  console.log("Payment Token Contract Address:", tokenAddress);
  const Token = await ethers.getContractAt("IERC20", tokenAddress);
  console.log("Token Contract Address:", Token.target);


  // 获取当前用户拥有的代币数量
  const balance = await Token.balanceOf(buyer.address);
  console.log("Balance:", ethers.formatEther(balance), "tokens");

  // 检查用户代币余额是否足够购买 NFT
  if (balance < price) {
    console.log("Insufficient balance to purchase the NFT.");
    process.exit(1);
  }

  const allowance = await Token.allowance(buyer.address, marketAddress);
  console.log("Allowance:", allowance.toString());

  if (allowance < price) {
    console.log("Approving market to spend buyer's tokens...");
    const approveTx = await Token.connect(buyer).approve(marketAddress, price);
    await approveTx.wait();
  }

  // 购买NFT
  try {
    console.log("Buying NFT...");
    const buyTx = await market.connect(buyer).buyNFT(2);
    await buyTx.wait();

    console.log(`NFT with tokenId ${tokenId} purchased from ${seller} by ${buyer.address}`);
  } catch (error) {
    console.log("Buying NFT Error", error)
  }
}

main().catch((error) => {
  console.error("Error occurred:", error);
  process.exit(1);
});
