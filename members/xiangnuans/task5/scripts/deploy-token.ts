import { ethers } from "hardhat";

// 使用购买者的地址部署
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MyToken
  const Token = await ethers.getContractFactory("MyToken", deployer);
  // 检查部署者余额
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance));

  const token = await Token.deploy(...[ethers.parseEther("100000000")]);
  await token.waitForDeployment();
  console.log("MyToken deployed to:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
