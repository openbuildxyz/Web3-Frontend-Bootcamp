import { Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';

export async function deployContract(deployer: Signer, contractName: string, args: unknown[]): Promise<Contract> {
    const contractFactory = await ethers.getContractFactory(contractName, deployer);
    const contract = await contractFactory.deploy(...args);
    await contract.waitForDeployment();

    console.log(`Contract ${contractName} deployed successfully: ${await contract.getAddress()}`);
    return contract;
}

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const token = await deployContract(deployer, 'MyToken', [ethers.parseEther("10000000000")]);
    await deployContract(deployer, 'MyNFT', []);
    await deployContract(deployer, 'NFTMarket', [await token.getAddress()]);
}

main();
