import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MyToken
  const Token = await ethers.getContractFactory("MyToken", deployer);
  const token = await Token.deploy(...[ethers.parseEther("10000000000")]);
  await token.waitForDeployment();
  console.log("MyToken deployed to:", await token.getAddress());

  // Deploy MyNFT
  const NFT = await ethers.getContractFactory("MyNFT", deployer);
  const nft = await NFT.deploy(...[]);
  await nft.waitForDeployment();
  console.log("MyNFT deployed to:", await nft.getAddress());


  // Deploy NFTMarket
  const Market = await ethers.getContractFactory("NFTMarket", deployer);
  const market = await Market.deploy(...[await token.getAddress()]);
  await market.waitForDeployment();
  console.log("NFTMarket deployed to:", await market.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
