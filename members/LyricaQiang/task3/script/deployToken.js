const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("部署合约的地址:", owner.address);

  const TokenContract = await hre.ethers.getContractFactory("MyToken");
  console.log("Contract factory loaded");

  const tokenContract = await TokenContract.deploy(owner.address);
  const res = await tokenContract.waitForDeployment(); // Ensure the contract is fully deployed

  const result = await tokenContract.getAddress();
  console.log("Contract deployed at:", result);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
