import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const tokenAddress = '0xe60fA1906D5933b02aF5a6E8e48a532B33e4d6CF';
    const nftAddress = '0x6D9B714Cb84a028930faC58533a8b9D2aB1b37C0';
    const nftMarketAddress = '0x8BCf073bbcc9A3129ba0ad9e83cbbc67cb8a5b0e';

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
