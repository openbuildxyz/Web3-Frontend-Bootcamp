import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";
  
describe("MyToken", function () {
  async function deployErc20Token() {  
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const erc20 = await MyToken.deploy();

    return { erc20, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right token decimal", async function () {
      const { erc20 } = await loadFixture(deployErc20Token);

      expect(await erc20.decimals()).to.equal(18);
    });
  });

  describe("mint", function () {
    describe("Validations", function () {
      it("Should revert with the right error if not the owner", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(otherAccount).mintTo(otherAccount, 100)).to.be.revertedWithCustomError(
            erc20, "OwnableUnauthorizedAccount"
        );
      });
      it("Should not revert error if mint_to with owner", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(owner).mintTo(otherAccount, 100)).not.to.be.reverted;
      });
      it("Should not revert error if mint with money", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(otherAccount).mint({value:ethers.parseEther("0.1")})).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit transfer event", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(owner).mintTo(otherAccount, 1000)).to.emit(erc20, "Transfer")
            .withArgs(ethers.ZeroAddress, otherAccount, 1000); // We accept any value as `when` arg
        });
    });
    it("Should cost the right ether.", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(otherAccount).mint({value:ethers.parseEther("0.1")})).changeEtherBalance(
            otherAccount, -ethers.parseEther("0.1")
        );
    });
    it("Should mint right value.", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        await expect(erc20.connect(otherAccount).mint({value:ethers.parseEther("0.1")})).changeTokenBalance(
            erc20, otherAccount, ethers.parseEther("0.1")*BigInt(10)
        );
    });
  });

  describe("Transfers", function () {
    it("Should has right value after transfer.", async function () {
        const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        // const v = ethers.parseEther("0.1");
        const v = 1000;
        await erc20.connect(otherAccount).mint({value: v});
        await expect(erc20.connect(otherAccount).transfer(owner, v)).changeTokenBalance(
            erc20, otherAccount, -v
        );
    });
  });
});