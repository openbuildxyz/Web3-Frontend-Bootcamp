import { expect } from "chai";
import { ethers } from "hardhat";
import { ZZNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("ZZNFT", function () {
  let zzNFT: ZZNFT;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    // 获取签名者（地址）
    [owner, addr1, addr2] = await ethers.getSigners();

    // 部署 ZZNFT 合约
    const ZZNFTFactory = await ethers.getContractFactory("ZZNFT", owner);
    zzNFT = await ZZNFTFactory.deploy();
    await zzNFT.waitForDeployment();
  });

  it("Should mint a new NFT and assign it to the owner", async function () {
    await zzNFT.mintNFT(owner.address, "https://www.mytokenlocation.com/1");

    const ownerBalance = await zzNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1);

    const tokenURI = await zzNFT.tokenURI(1);
    expect(tokenURI).to.equal("https://www.mytokenlocation.com/1");
    
  });

  it("Should allow NFT transfer between accounts", async function () {
    await zzNFT.mintNFT(owner.address, "https://www.mytokenlocation.com/1");

    // Transfer NFT from owner to addr1
    await zzNFT.transferFrom(owner.address, addr1.address, 1);

    const addr1Balance = await zzNFT.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1);

    const ownerBalance = await zzNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(0);
  });

  it("Should allow NFT transfer between accounts using safeTransferFrom", async function () {
    await zzNFT.mintNFT(owner.address, "https://www.mytokenlocation.com/1");

    // Transfer NFT from owner to addr1 using safeTransferFrom
    await zzNFT['safeTransferFrom(address,address,uint256)'](owner.address, addr1.address, 1);

    const addr1Balance = await zzNFT.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1);

    const ownerBalance = await zzNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(0);
  });

  it("Should fail to transfer NFT if not the owner or approved", async function () {
    await zzNFT.mintNFT(owner.address, "https://www.mytokenlocation.com/1");

    // Try to transfer NFT from addr1 to addr2, should fail
    await expect(
        zzNFT.connect(addr1).transferFrom(owner.address, addr2.address, 1)
    ).to.be.reverted;

    const ownerBalance = await zzNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(1);

    const addr2Balance = await zzNFT.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(0);
  });

  it("Should approve and then transfer NFT", async function () {
    await zzNFT.mintNFT(owner.address, "https://www.mytokenlocation.com/1");

    // Approve addr1 to manage the NFT
    await zzNFT.approve(addr1.address, 1);

    // Transfer NFT from owner to addr2 by addr1
    await zzNFT.connect(addr1).transferFrom(owner.address, addr2.address, 1);

    const addr2Balance = await zzNFT.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(1);

    const ownerBalance = await zzNFT.balanceOf(owner.address);
    expect(ownerBalance).to.equal(0);
  });
});