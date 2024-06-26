const { ethers } = require("hardhat");

async function main() {
  const [buyer] = await ethers.getSigners();
  console.log("Using account:", buyer.address);

  const nftMarketAddress = "0xb5C48287F6dd8131A855Ec04e4e99d75c62344A5"; // 更新为新的 NFTMarket 合约地址
  const tokenId = 2; // 要购买的 NFT 的 ID
  const erc20TokenAddress = "0x0C691c5824eA0bD8214F1C8eA0826850238A8a4b"; // 更新为新的 MyERC20 合约地址
  const price = ethers.parseUnits("1", 18); // NFT 的价格

  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.attach(erc20TokenAddress);

  // 批准市场合约花费买家的 ERC20 代币
  const approveTx = await myERC20.approve(nftMarketAddress, price);
  await approveTx.wait();
  console.log("Approved ERC20 for market");

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);

  try {
    // 购买 NFT
    const buyTx = await nftMarket.purchaseItem(tokenId);
    const receipt = await buyTx.wait();
    console.log("Purchased NFT with tokenId:", tokenId);
    console.log("Transaction hash:", receipt.hash, receipt);
  } catch (error) {
    console.error("Error during purchase:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
