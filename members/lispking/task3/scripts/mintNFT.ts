import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const nftAddress = '0x6D9B714Cb84a028930faC58533a8b9D2aB1b37C0';
    const nft = await loadContract('MyNFT', nftAddress, deployer);

    try {
        await nft.connect(deployer).mintNFT(deployer.address, "https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhardhat-logo.5c5f687b.svg&w=384&q=75");
    } catch (err) {
        console.log(err);
    }
}

main();
