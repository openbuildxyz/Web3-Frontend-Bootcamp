import { MyTokenAddress } from './config'
import { ethers } from "hardhat";

// 使用购买者的地址部署
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NFTMarket
  const Market = await ethers.getContractFactory("NFTMarket", deployer);
  const market = await Market.deploy(MyTokenAddress);
  await market.waitForDeployment();
  console.log("NFTMarket deployed to:", await market.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
