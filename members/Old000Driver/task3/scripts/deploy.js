const hre = require("hardhat");

async function main() {
  // 部署 ERC20 代币
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const erc20 = await MyToken.deploy(ethers.parseEther("1000000")); // 初始发行 100 万代币
  await erc20.waitForDeployment();
  console.log("ERC20 deployed to:", await erc20.getAddress());

  // 部署 NFT 合约
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await MyNFT.deploy();
  await nft.waitForDeployment();
  console.log("NFT deployed to:", await nft.getAddress());

  // 部署市场合约
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const market = await NFTMarket.deploy();
  await market.waitForDeployment();
  console.log("Market deployed to:", await market.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});