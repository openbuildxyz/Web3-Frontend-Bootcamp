const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  let myNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy();
    await myNFT.waitForDeployment();
  });

  describe("铸造", function () {
    it("应该能够铸造 NFT", async function () {
      await myNFT.mint(addr1.address, "ipfs://test");
      expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
    });

    it("应该正确递增 tokenId", async function () {
      await myNFT.mint(addr1.address, "ipfs://test1");
      await myNFT.mint(addr2.address, "ipfs://test2");
      
      expect(await myNFT.ownerOf(0)).to.equal(addr1.address);
      expect(await myNFT.ownerOf(1)).to.equal(addr2.address);
    });
  });

  describe("转账", function () {
    beforeEach(async function () {
      await myNFT.mint(addr1.address, "ipfs://test");
    });

    it("持有者应该能够转移 NFT", async function () {
      await myNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
      expect(await myNFT.ownerOf(0)).to.equal(addr2.address);
    });

    it("非持有者不能转移 NFT", async function () {
      await expect(
        myNFT.connect(addr2).transferFrom(addr1.address, addr2.address, 0)
      ).to.be.reverted;
    });
  });
});
