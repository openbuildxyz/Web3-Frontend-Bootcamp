import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("ERC20Token", function () {
  async function deployERC20TokenFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners();
    const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy("myErc20", "¥", 1000);

    return { token, owner, addr1, addr2, addrs };
  }

  describe("token", function () {
    it("Verify that the transfer function is valid", async function () {
      const { token, owner, addr1 } = await loadFixture(
        deployERC20TokenFixture
      );
      const initialOwnerBalance = await token.balanceOf(owner.address);
      expect(await token.balanceOf(addr1.address)).to.equal(0);

      await token.transfer(addr1.address, 50);
      expect(await token.balanceOf(addr1.address)).to.equal(50);
      //   const nowS = (BigInt(initialOwnerBalance) - BigInt(50)).toString();
      expect(await token.balanceOf(owner.address)).to.equal(
        BigInt(initialOwnerBalance) - BigInt(50)
      );
    });

    it("Should approve spender to spend tokens", async function () {
      const { token, owner, addr1 } = await loadFixture(
        deployERC20TokenFixture
      );
      await token.approve(addr1.address, 1000);
      const allowance = await token.allowances(owner.address, addr1.address);
      expect(allowance).to.equal(1000);
    });

    it("Should mint tokens to owner", async function () {
      const { token, owner } = await loadFixture(deployERC20TokenFixture);
      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(hre.ethers.parseEther("1000"));
    });

    it("should mint tokens only by owner", async function () {
      const { token, addr1 } = await loadFixture(deployERC20TokenFixture);
      await expect(
        token.connect(addr1).mint(addr1.address, hre.ethers.parseEther("1000"))
      ).to.be.revertedWith("Ownable: caller is not the owner");

      await token.mint(addr1.address, hre.ethers.parseEther("1000"));
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(hre.ethers.parseEther("1000"));
    });
  });
});
