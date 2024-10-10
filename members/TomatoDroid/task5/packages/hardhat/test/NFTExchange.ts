import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { expect } from "chai";

/**
 * 部署TomatoToken合约
 * 部署TomatoFrontendToken合约
 * 部署NFTExchange合约，参数为TomatoToken的合约地址
 * 账户1在TomatoFrontendToken上mintNFT
 * 账户1调用TomatoFrontendToken的setApprovalForAll函数，参数为NFTExchange合约地址和true
 * 账户1调用NFTExchange合约的listNFT方法上架id为1的NFT
 * 账户1调用TomatoToken合约transfer方法给账户2转20000个TAT
 * 账户2使用approve方法授权NFTExchange合约使用100000个TAT的allowance
 * 账户2调用NFTEXchange合约的buyNFT购买tokenId为1的NFT
 */

describe("NFTEXchange", function () {
  async function deployNFTEXchange() {
    const initialSupply = 100_000_000_000;
    const nftPrice = 2_000_000_000;
    const testURI = "QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";
    const TomatoToken = await hre.ethers.getContractFactory("TomatoToken");
    const TomatoNFT = await hre.ethers.getContractFactory("TomatoNFT");
    const NFTExchange = await hre.ethers.getContractFactory("NFTExchange");

    const [owner, buyer, otherAccount] = await hre.ethers.getSigners();
    console.log("owner address -----", owner.address);
    console.log("buyer address -----", buyer.address);
    console.log("otherAccount address -----", otherAccount.address);

    const tomatoToken = await TomatoToken.deploy();
    const tomatoTokenAddress = await tomatoToken.getAddress();

    const tomatoNFT = await TomatoNFT.deploy(owner.address);
    const tomatoNFTAddress = await tomatoNFT.getAddress();

    const nftExchange = await NFTExchange.deploy(tomatoTokenAddress);
    const nftExchangeAddress = await nftExchange.getAddress();

    await tomatoNFT.safeMint(owner.address, testURI);
    const ownerNFTId = await tomatoNFT.getTokenId();

    await tomatoNFT.safeMint(otherAccount.address, testURI);
    const otherNFTId = await tomatoNFT.getTokenId();

    return {
      tomatoToken,
      tomatoNFT,
      nftExchange,
      nftExchangeAddress,
      buyer,
      owner,
      tomatoTokenAddress,
      tomatoNFTAddress,
      ownerNFTId,
      nftPrice,
      otherNFTId,
      initialSupply,
    };
  }

  describe("Deploy", function () {
    it("Should set current paymentToken", async function () {
      const { nftExchange, tomatoTokenAddress } = await loadFixture(deployNFTEXchange);

      expect(await nftExchange.paymentToken()).to.equal(tomatoTokenAddress);
    });
  });

  describe("listNFT", function () {
    it("Shoule revert with the right error if the NFT not owner", async function () {
      const { nftExchange, tomatoNFTAddress, nftPrice, otherNFTId } = await loadFixture(deployNFTEXchange);
      await expect(nftExchange.listNFT(tomatoNFTAddress, otherNFTId, nftPrice)).to.revertedWith("Not the owner of NFT");
    });

    it("Shoule revert with the right error if the contract not appreved", async function () {
      const { nftExchange, tomatoNFTAddress, ownerNFTId, nftPrice } = await loadFixture(deployNFTEXchange);
      await expect(nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice)).to.revertedWith(
        "Contract not approved",
      );
    });

    it("Should get listings ", async function () {
      const { nftExchange, tomatoNFT, nftExchangeAddress, tomatoNFTAddress, ownerNFTId, owner, nftPrice } =
        await loadFixture(deployNFTEXchange);

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);

      await nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice);

      const listing = await nftExchange.listings(tomatoNFTAddress, ownerNFTId);

      expect(listing.seller).to.equal(owner.address);
      expect(listing.nftContract).to.equal(tomatoNFTAddress);
      expect(listing.tokenId).to.equal(1);
      expect(listing.price).to.equal(nftPrice);
      expect(listing.isActive).to.equal(true);
      expect(listing.isListing).to.equal(true);
    });
  });

  describe("Events", function () {
    it("Should emit an event on listNFT", async function () {
      const { nftExchange, tomatoNFT, nftExchangeAddress, tomatoNFTAddress, ownerNFTId, owner, nftPrice } =
        await loadFixture(deployNFTEXchange);

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);

      await expect(nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice))
        .to.emit(nftExchange, "NFTListed")
        .withArgs(owner.address, tomatoNFTAddress, ownerNFTId, nftPrice);
    });
  });

  describe("buyNFT", async function () {
    it("Should buyNFT is success", async function () {
      const {
        nftExchange,
        tomatoToken,
        buyer,
        tomatoNFT,
        nftExchangeAddress,
        tomatoNFTAddress,
        ownerNFTId,
        owner,
        nftPrice,
        initialSupply,
      } = await loadFixture(deployNFTEXchange);

      const transferValue = 3_000_000_000;

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);
      await nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice);
      await tomatoToken.transfer(buyer.address, transferValue);

      expect(await tomatoToken.balanceOf(owner.address)).to.equal(initialSupply - transferValue);
      expect(await tomatoToken.balanceOf(buyer.address)).to.equal(transferValue);

      await tomatoToken.connect(buyer).approve(nftExchangeAddress, nftPrice);
      await expect(nftExchange.connect(buyer).buyNFT(tomatoNFTAddress, ownerNFTId))
        .to.emit(nftExchange, "NFTPurchased")
        .withArgs(owner.address, tomatoNFTAddress, ownerNFTId, nftPrice);

      expect(await tomatoToken.balanceOf(owner.address)).to.equal(99_000_000_000);
      expect(await tomatoToken.balanceOf(buyer.address)).to.equal(1_000_000_000);
      expect(await tomatoNFT.ownerOf(ownerNFTId)).to.equal(buyer.address);
    });
  });

  describe("takeDownNFT", async function () {
    it("Should revert the error if the takeDownNFT is not owner", async function () {
      const { nftExchange, tomatoNFT, nftExchangeAddress, tomatoNFTAddress, ownerNFTId, otherNFTId, nftPrice } =
        await loadFixture(deployNFTEXchange);

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);
      await nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice);

      await expect(nftExchange.takeDownNFT(tomatoNFTAddress, otherNFTId)).to.revertedWith("Not the owner of NFT");
    });

    it("Should revert the error if the takeDownNFT is not owner", async function () {
      const { nftExchange, tomatoNFT, nftExchangeAddress, tomatoNFTAddress, ownerNFTId, otherNFTId, nftPrice } =
        await loadFixture(deployNFTEXchange);

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);
      await nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice);

      await expect(nftExchange.takeDownNFT(tomatoNFTAddress, otherNFTId)).to.revertedWith("Not the owner of NFT");
    });

    it("Should emit event NFTTakeDown", async function () {
      const { nftExchange, tomatoNFT, nftExchangeAddress, tomatoNFTAddress, ownerNFTId, owner, nftPrice } =
        await loadFixture(deployNFTEXchange);

      await tomatoNFT.setApprovalForAll(nftExchangeAddress, true);
      await nftExchange.listNFT(tomatoNFTAddress, ownerNFTId, nftPrice);

      await expect(nftExchange.takeDownNFT(tomatoNFTAddress, ownerNFTId))
        .to.emit(nftExchange, "NFTTakeDown")
        .withArgs(owner.address, tomatoNFTAddress, ownerNFTId);
    });
  });
});
