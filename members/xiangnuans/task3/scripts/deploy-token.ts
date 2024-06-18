import { Contract, Signer } from 'ethers'

import { ethers } from "hardhat";

export async function deployContract(deployer: Signer, contractName: string, args: unknown[]): Promise<Contract> {
  const contractFactory = await ethers.getContractFactory(contractName, deployer);
  const contract = await contractFactory.deploy(...args);
  await contract.waitForDeployment();

  console.log(`Contract ${contractName} deployed successfully: ${await contract.getAddress()}`);
  return contract;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const token = await ethers.getContractFactory("MyToken", [ethers.parseEther("10000000000")]);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
