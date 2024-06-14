import { Contract, Signer } from 'ethers';
import { artifacts, ethers } from 'hardhat';

export async function loadContract(contractName: string, contractAddr: string, deployer: Signer): Promise<Contract> {
    const artifact = await artifacts.readArtifact(contractName);
    return new Contract(contractAddr, artifact.abi, deployer);
  }

async function main() {
    const [ deployer ] = await ethers.getSigners();

    const nftAddress = '0xa8D2eA36493a8FF91B55568ce9c7C4483b34eaBB';
    const nft = await loadContract('MyNFT', nftAddress, deployer);
    const connectedNFT = nft.connect(deployer);

    try {
        console.log('nextTokenId:', await connectedNFT.nextTokenId());
        await connectedNFT.mintNFT(deployer.address, "https://hardhat.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhardhat-logo.5c5f687b.svg&w=384&q=75");
    } catch (err) {
        console.log(err);
    }
}

main();
