import { expect } from "chai";
import { ethers } from "hardhat";
import { MyNFT__factory, MyNFT } from "../typechain-types";

describe("MyNFT", function () {
    let myNFT: MyNFT;

    before(async function () {
        const MyNFTFactory = (await ethers.getContractFactory("MyNFT")) as MyNFT__factory;
        myNFT = await MyNFTFactory.deploy();
        await myNFT.waitForDeployment();
    });

    it("Should deploy the contract and mint a new NFT", async function () {
        const [owner, recipient] = await ethers.getSigners();
        const tokenURI = "https://example.com/nft";

        const mintTx = await myNFT.connect(owner).mintNFT(recipient.address, tokenURI);
        await mintTx.wait();

        const tokenId = await myNFT.getCurrentTokenId();
        expect(tokenId).to.equal(1);

        const tokenOwner = await myNFT.ownerOf(tokenId);
        expect(tokenOwner).to.equal(recipient.address);

        const storedTokenURI = await myNFT.tokenURI(tokenId);
        expect(storedTokenURI).to.equal(tokenURI);
    });
});
