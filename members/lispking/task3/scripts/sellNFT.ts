import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';
import { nftAddress, nftMarketAddress } from './config';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const myNFT = await loadContract('MyNFT', nftAddress, deployer);
    const nftMarket = await loadContract('NFTMarket', nftMarketAddress, deployer);

    try {
        const tokenId = 0n;
        const price = ethers.parseEther("1");

        await myNFT.connect(deployer).setApprovalForAll(nftMarketAddress, true);
        await myNFT.connect(deployer).approve(nftMarketAddress, tokenId);
        
        await nftMarket.connect(deployer).listItem(nftAddress, tokenId, price);
    } catch (err) {
        console.log(err);
    }
}

main();
