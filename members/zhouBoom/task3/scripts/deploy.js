const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 使用 ethers.parseUnits 方法来解析单位
  const initialSupply = ethers.parseUnits("1000000", 18);

  // Deploy MyERC20
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.deploy(initialSupply);
  await myERC20.waitForDeployment();  // 等待合约部署完成
  const myERC20Address = await myERC20.getAddress();
  console.log("MyERC20 deployed to:", myERC20Address);

  // Deploy MyNFT
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.waitForDeployment();  // 等待合约部署完成
  const myNFTAddress = await myNFT.getAddress();
  console.log("MyNFT deployed to:", myNFTAddress);

  // Deploy NFTMarket
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy(myERC20Address);
  await nftMarket.waitForDeployment();  // 等待合约部署完成
  const nftMarketAddress = await nftMarket.getAddress();
  console.log("NFTMarket deployed to:", nftMarketAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
