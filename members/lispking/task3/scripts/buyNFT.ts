import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const tokenAddress = '0x5888b3184e71F62d90ff2a223dc3ca5f7eBdBE90';
    const nftAddress = '0xa8D2eA36493a8FF91B55568ce9c7C4483b34eaBB';
    const nftMarketAddress = '0x5bF1162bCE6c8AC6827099CAB76F0C81D6bc5c6D';

    const myToken = await loadContract('MyToken', tokenAddress, deployer);
    const nftMarket = await loadContract('NFTMarket', nftMarketAddress, deployer);

    try {
        const tokenId = 0n;
        const price = ethers.parseEther("1");

        await myToken.connect(deployer).approve(nftMarketAddress, price);
        await nftMarket.connect(deployer).buyItem(nftAddress, tokenId);
    } catch (err) {
        console.log(err);
    }
}

main();
