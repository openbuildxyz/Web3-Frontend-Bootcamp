import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const nftAddress = '0x6D9B714Cb84a028930faC58533a8b9D2aB1b37C0';
    const nftMarketAddress = '0x8BCf073bbcc9A3129ba0ad9e83cbbc67cb8a5b0e';

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
