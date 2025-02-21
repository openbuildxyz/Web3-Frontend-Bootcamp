const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers;

describe("MyToken", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;
  const INITIAL_SUPPLY = parseEther("1000000");

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(INITIAL_SUPPLY);
    await myToken.waitForDeployment();
  });

  describe("基础功能", function () {
    it("应该设置正确的初始供应量", async function () {
      expect(await myToken.totalSupply()).to.equal(INITIAL_SUPPLY);
      expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("应该能够转账代币", async function () {
      const transferAmount = parseEther("100");
      await myToken.transfer(addr1.address, transferAmount);
      
      expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY - transferAmount);
    });
  });

  describe("授权和委托转账", function () {
    const approveAmount = parseEther("100");

    it("应该能够授权和使用授权", async function () {
      await myToken.approve(addr1.address, approveAmount);
      await myToken.connect(addr1).transferFrom(owner.address, addr2.address, approveAmount);
      
      expect(await myToken.balanceOf(addr2.address)).to.equal(approveAmount);
      expect(await myToken.allowance(owner.address, addr1.address)).to.equal(0);
    });

    it("不能超额使用授权额度", async function () {
      await myToken.approve(addr1.address, approveAmount);
      
      await expect(
        myToken.connect(addr1).transferFrom(
          owner.address, 
          addr2.address, 
          approveAmount + parseEther("1")
        )
      ).to.be.reverted;
    });
  });
});
