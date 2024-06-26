const { ethers } = require("hardhat");

async function main() {
  const [buyer] = await ethers.getSigners();
  console.log("Using account:", buyer.address);

  const nftMarketAddress = "0x88950C78B6995Bae15c8b9d2126FE12A3Aa5D1A4";
  const tokenId = 1;
  const erc20TokenAddress = "0x63D1A6aCBEe104f2F608cFc7f8026189B619182f";
  const price = ethers.parseUnits("1", 18);

  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.attach(erc20TokenAddress);

  const approveTx = await myERC20.approve(nftMarketAddress, price);
  await approveTx.wait();
  console.log("Approved ERC20 for market");

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);

  // 查询市场项目，确保项目已上架
  const itemCount = await nftMarket.itemCount();
  console.log("Total items listed in market:", itemCount.toString());

  for (let i = 0; i < itemCount; i++) {
    const item = await nftMarket.marketItems(i);
    console.log(`Item ${i}:`, item);
  }

  // 购买NFT
  try {
    const buyTx = await nftMarket.purchaseItem(tokenId);
    const receipt = await buyTx.wait();
    console.log("Purchased NFT with tokenId:", tokenId);
    console.log("Transaction hash:", receipt.transactionHash);
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
