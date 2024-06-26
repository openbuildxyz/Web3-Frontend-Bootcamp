const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  const nftContractAddress = "0xdd2F63a137Ea13B7169A2D0dE205BEAC7BA0E290"; // 更新为新的 MyNFT 合约地址
  const nftMarketAddress = "0xb5C48287F6dd8131A855Ec04e4e99d75c62344A5"; // 更新为新的 NFTMarket 合约地址
  const tokenId = 4;
  const price = ethers.parseUnits("1", 18);
  const metadataURI = "ipfs://QmVz4G63fiZGk65BJmEebUc689C5nGT1i4SnssRZ7MpJtC"; // 替换为实际的元数据 URI

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.attach(nftContractAddress);
  // 铸造新的 NFT
  const tx1 = await myNFT.mintNFT(deployer.address, metadataURI);
  await tx1.wait();
  console.log("Minted NFT with tokenId:", tokenId);

  // 检查 NFT 所有者
  const owner = await myNFT.ownerOf(tokenId);
  console.log("Owner of tokenId:", tokenId, "is", owner);

  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.attach(nftMarketAddress);

  try {
    // 批准市场合约管理该 NFT
    const tx2 = await myNFT.approve(nftMarketAddress, tokenId);
    await tx2.wait();
    console.log("Approved NFT for market");

    // 确认批准成功
    const approvedAddress = await myNFT.getApproved(tokenId);
    console.log("Approved address for tokenId:", tokenId, "is", approvedAddress);

    // 上架 NFT
    const tx3 = await nftMarket.listItem(nftContractAddress, tokenId, price);
    await tx3.wait();
    console.log("Listed NFT with tokenId:", tokenId, "for price:", tx3);

    // 打印上架后的物品数量
    const itemCount = await nftMarket.itemCount();
    console.log("Item count after listing:", itemCount.toString());

  } catch (error) {
    console.error("Error during approve or listItem:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
