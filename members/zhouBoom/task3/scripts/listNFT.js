const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  const nftContractAddress = "0x8054eC2d21e9E63AEB7f0E712Fa4b5bb10d53537"; // MyNFT 合约地址
  const nftMarketAddress = "0xc547280e1B81cCA917465c0B642BA1e439A682D6"; // NFTMarket 合约地址
  const tokenId = 4;
  const price = ethers.parseUnits("1", 18);
  const metadataURI = "ipfs://QmVz4G63fiZGk65BJmEebUc689C5nGT1i4SnssRZ7MpJtC"; // 替换为实际的元数据URI

  // 获取NFT合约实例
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.attach(nftContractAddress);

  // 铸造新的NFT
  const tx1 = await myNFT.mintNFT(deployer.address, metadataURI);
  await tx1.wait();
  console.log("Minted NFT with tokenId:", tokenId);

  // 检查所有者是否正确
  const owner = await myNFT.ownerOf(tokenId);
  console.log("Owner of tokenId:", tokenId, "is", owner);

  // 获取市场合约实例
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);

  // 批准市场合约管理该NFT
  try {
    const tx2 = await myNFT.approve(nftMarketAddress, tokenId);
    await tx2.wait();
    console.log("Approved NFT for market");

    const approvedAddress = await myNFT.getApproved(tokenId);
    console.log("Approved address for tokenId:", tokenId, "is", approvedAddress);

    const tx3 = await nftMarket.listItem(nftContractAddress, tokenId, price);
    await tx3.wait();
    console.log("Listed NFT with tokenId:", tokenId, "for price:", price.toString());

    const itemCount = await nftMarket.itemCount();
    console.log("Item count after listing:", itemCount.toString());
  } catch (error) {
    console.error("Error during approve or listItem:", error);
  }
}

// 运行主函数并捕获可能的错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
