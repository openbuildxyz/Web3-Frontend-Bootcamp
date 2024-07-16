import { MyTokenAddress } from "./config";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);


  // Deploy MyNFT
  const NFT = await ethers.getContractFactory("MyNFT", deployer);
  const nft = await NFT.deploy(...[]);
  await nft.waitForDeployment();
  console.log("MyNFT deployed to:", await nft.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
