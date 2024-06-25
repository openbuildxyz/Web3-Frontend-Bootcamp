const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  console.log("部署合约的地址:", owner.address);

  const NFTContract = await hre.ethers.getContractFactory("MyNFT");

  const nftContract = await NFTContract.deploy(owner.address);

  await nftContract.waitForDeployment();
  const result = await nftContract.getAddress();
  console.log("当前合约部署地址为:", result);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
