import { ethers } from "hardhat";
import { marketAddress } from "./config";

async function main() {
  const [buyer] = await ethers.getSigners();
  console.log("Buyer address:", buyer.address);

  const market = await ethers.getContractAt("NFTMarket", marketAddress);
  console.log("Market contract attached:", marketAddress);

  // 获取列表中的第一个NFT信息
  const listing = await market.listings(0);
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
  const tokenContractAddress = await market.paymentToken();
  console.log("Payment Token Contract Address:", tokenContractAddress);

  // 模拟买家授权市场合约访问代币
  const Token = await ethers.getContractAt("IERC20", tokenContractAddress);
  console.log("Token Contract Address:", Token);

  const allowance = await Token.allowance(buyer.address, marketAddress);
  console.log("Allowance:", allowance.toString());

  if (allowance < price) {
    console.log("Approving market to spend buyer's tokens...");
    const approveTx = await Token.connect(buyer).approve(marketAddress, price);
    await approveTx.wait();
  }

  // 购买NFT
  console.log("Buying NFT...");
  const buyTx = await market.connect(buyer).buyNFT(0);
  await buyTx.wait();

  console.log(`NFT with tokenId ${tokenId} purchased from ${seller} by ${buyer.address}`);
}

main().catch((error) => {
  console.error("Error occurred:", error);
  process.exit(1);
});
