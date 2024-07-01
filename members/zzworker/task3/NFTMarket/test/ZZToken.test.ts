import { expect } from "chai";
import { ethers } from "hardhat";
import { ZZToken, ZZToken__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

const INITIAL_SUPPLY = 1_000_000;
const INITIAL_SUPPLY_DECIMAL = 100_000_000;
describe("ZZERC20Token", function () {
  let zzToken: ZZToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    const ZZTokenFactory: ZZToken__factory = await ethers.getContractFactory("ZZToken");
    [owner,addr1,addr2] = await ethers.getSigners();
    zzToken = await ZZTokenFactory.deploy(INITIAL_SUPPLY);
    await zzToken.getDeployedCode();
  });

  it("Should have correct total supply and assign it to the owner", async function () {
    const totalSupply = await zzToken.totalSupply();
    expect(totalSupply).to.equal(INITIAL_SUPPLY_DECIMAL);

    const ownerBalance = await zzToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(totalSupply);
  });
  
  it("Should transfer tokens between accounts", async function () {
    // 从创建者（owner）转账 100 个代币给 addr1
    await zzToken.transfer(addr1.address, 100);
    const addr1Balance = await zzToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    // 从 addr1 转账 50 个代币给 addr2
    await zzToken.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await zzToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await zzToken.balanceOf(owner.address);

    // 尝试从 addr1 发送 1 个代币给 owner，但 addr1 没有足够的代币
    await expect(
      zzToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.reverted;

    // 确保 owner 的余额没有改变
    expect(await zzToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await zzToken.balanceOf(owner.address);

    // 从 owner 转账 100 个代币给 addr1
    await zzToken.transfer(addr1.address, 100);

    // 从 owner 转账 50 个代币给 addr2
    await zzToken.transfer(addr2.address, 50);

    // 检查余额
    const finalOwnerBalance = await zzToken.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n);

    const addr1Balance = await zzToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await zzToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });
});