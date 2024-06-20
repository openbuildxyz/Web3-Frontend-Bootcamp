import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';
import { nftMarketAddress } from './config';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const nftMarket = await loadContract('NFTMarket', nftMarketAddress, deployer);

    try {
        console.log(await nftMarket.connect(deployer).updateItemStatus(0, false));
    } catch (err) {
        console.log(err);
    }
}

main();
