import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy();

  await nft.waitForDeployment();

  console.log("NFT deployed to:", nft);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
