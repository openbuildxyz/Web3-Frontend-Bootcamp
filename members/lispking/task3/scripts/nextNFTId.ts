import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';
import { nftAddress } from './config';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const nft = await loadContract('MyNFT', nftAddress, deployer);
    const connectedNFT = nft.connect(deployer);

    try {
        console.log('nextTokenId:', await connectedNFT.nextTokenId());
    } catch (err) {
        console.log(err);
    }
}

main();
