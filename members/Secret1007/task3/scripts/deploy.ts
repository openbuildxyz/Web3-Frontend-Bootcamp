import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    const tokenAddress = await myToken.getAddress()
    console.log("myToken: ", tokenAddress);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy(tokenAddress, 1);
    console.log("myNFT: ", await myNFT.getAddress());

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy(tokenAddress);
    console.log("nftMarket: ", await nftMarket.getAddress());
}

main();
