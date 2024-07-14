import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nft = await NFTMarket.deploy(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );

    return { nft, owner, otherAccount };
  }

  describe("listNFT", function () {
    it("should list nft success", async function () {
      const { nft, owner, otherAccount } = await loadFixture(deployNftFixture);
      nft.nftContract.mint(owner, 1);
      nft.nftContract.mint(otherAccount, 2);
    });
  });

  describe("buyNFT", function () {
    it("should buy nft success", async function () {
      const { nft, owner, otherAccount } = await loadFixture(deployNftFixture);
    });
  });
  // describe("Mint", function () {
  //   it("Should mint correctly", async function () {
  //     const { nft, owner, otherAccount } = await loadFixture(deployNftFixture);
  //     const addr = await owner.getAddress();
  //     await nft.mint(1, 20);
  //     // expect(await nft.tokenURI(0)).to.equal("http://www.baidu.com");
  //   });
  // });
});
