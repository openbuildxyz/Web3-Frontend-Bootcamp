const hre = require("hardhat");

const data = require("./config");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("部署合约的地址:", owner.address);
  const MarketContract = await hre.ethers.getContractFactory("MyNFTMarket");
  const marketContract = await MarketContract.deploy(
    data.tokenAddress,
    data.nftAddress
  );
  await marketContract.waitForDeployment();
  const result = await marketContract.getAddress();
  console.log("当前合约部署地址为:", result);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
