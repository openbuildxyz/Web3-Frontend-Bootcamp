import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFT Marketplace", function () {
    let MyToken: ContractFactory;
    let myToken: Contract;
    let MyNFT: ContractFactory;
    let myNFT: Contract;
    let NFTMarketplace: ContractFactory;
    let nftMarketplace: Contract;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;
    let addr2: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy(ethers.parseEther("10000"));
        await myToken.deployed();

        MyNFT = await ethers.getContractFactory("MyNFT");
        myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        nftMarketplace = await NFTMarketplace.deploy(myToken.address);
        await nftMarketplace.deployed();
    });

    it("Should mint and trade NFTs", async function () {
        // Mint NFT
        await myNFT.mintNFT(owner.address, "https://my-nft-uri.com/1");

        // Approve and list NFT
        await myNFT.approve(nftMarketplace.address, 1);
        await nftMarketplace.listNFT(myNFT.address, 1, ethers.parseEther("10"));

        // Transfer tokens to addr1 and approve marketplace to spend
        await myToken.transfer(addr1.address, ethers.parseEther("10"));
        await myToken.connect(addr1).approve(nftMarketplace.address, ethers.parseEther("10"));

        // Buy NFT
        await nftMarketplace.connect(addr1).buyNFT(0);

        expect(await myNFT.ownerOf(1)).to.equal(addr1.address);
        expect(await myToken.balanceOf(owner.address)).to.equal(ethers.parseEther("10"));
    });
});
