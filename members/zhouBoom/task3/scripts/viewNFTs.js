const { ethers } = require("hardhat");

async function main() {
  const [viewer] = await ethers.getSigners();
  console.log("Using account:", viewer.address);

  const nftMarketAddress = "0xb5C48287F6dd8131A855Ec04e4e99d75c62344A5"; // 更新为您的 NFTMarket 合约地址

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);

  // 获取上架的市场物品
  const marketItems = await nftMarket.fetchMarketItems();
  console.log("Total items listed in market:", marketItems.length);

  for (let i = 0; i < marketItems.length; i++) {
    const item = marketItems[i];
    console.log(`Item ID: ${i}
      NFT Contract: ${item.nftContract}
      Token ID: ${item.tokenId}
      Seller: ${item.seller}
      Price: ${ethers.formatUnits(item.price, 18)} ERC20 Tokens
    `);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
