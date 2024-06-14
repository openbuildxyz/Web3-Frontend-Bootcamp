import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";
  
describe("MyNft", function () {
  async function deployNft() {
      const name = "hwft";
      const symbol = "hw";
  
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyNft = await hre.ethers.getContractFactory("MyNft");
    const nft = await MyNft.deploy(name, symbol);

    return { nft, name, symbol, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right nft name", async function () {
      const { nft, name } = await loadFixture(deployNft);

      expect(await nft.name()).to.equal(name);
    });
  });

  describe("mint", function () {
    describe("Validations", function () {
      it("Should revert with the right error if not the owner", async function () {
        const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
        await expect(nft.connect(otherAccount).safeMint(otherAccount)).to.be.revertedWithCustomError(
          nft, "OwnableUnauthorizedAccount"
        );
      });
      
      it("Should revert with the right error if does not pay right amount", async function () {
        const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
        await expect(nft.connect(otherAccount).mint({value: ethers.parseEther("0.001")})).to.be.revertedWith(
          "must pay 0.01 ether"
        );
      });
      it("Should not revert error if mint with owner", async function () {
        const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
        await expect(nft.connect(owner).safeMint(otherAccount)).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit transfer event", async function () {
        const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
        await expect(nft.connect(owner).safeMint(otherAccount)).to.emit(nft, "Transfer")
            .withArgs(ethers.ZeroAddress, otherAccount, anyValue); // We accept any value as `when` arg
        });
    });
  });

  describe("Transfers", function () {
    it("Balance should be 1 or more.", async function () {
        const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
        await nft.connect(owner).safeMint(otherAccount);
        let balance = await nft.balanceOf(otherAccount);
        expect(balance>=1);
    });

    it("Eth balance should cost 0.01 and balance of owner should be 1 or more..", async function () {
      const { nft, name, symbol, owner, otherAccount } = await loadFixture(deployNft);
      const v = ethers.parseEther("0.01");
      await expect(nft.connect(otherAccount).mint({value: v})).changeEtherBalance(
        otherAccount, -v
      )
      await nft.connect(otherAccount).transferFrom(otherAccount, owner, 1);
      let balance = await nft.balanceOf(owner);
      console.log(balance)
      expect(balance>=1);
    });
  });
});