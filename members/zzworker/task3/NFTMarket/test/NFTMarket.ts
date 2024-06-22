import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTMarket, NFTMarket__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("NFTMarket", function () {
  let nftMarket: NFTMarket;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let listingPrice = ethers.parseUnits('0.000000001', 'ether');
  let auctionPrice = ethers.parseUnits('1', 'ether');

  beforeEach(async function () {
    const NFTMarketFactory: NFTMarket__factory = await ethers.getContractFactory("NFTMarket");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nftMarket = await NFTMarketFactory.deploy();
    await nftMarket.getDeployedCode();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nftMarket.owner()).to.equal(owner.address);
    });

    it("Should set the correct listing price", async function () {
      expect(await nftMarket.getListingPrice()).to.equal(listingPrice);
    });
  });

  describe("Transactions", function () {
    it("Should create and execute market sales", async function () {
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });
      let items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(1);

      await nftMarket.connect(addr2).createMarketSale(1, { value: auctionPrice });
      items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(0);

      const newOwner = await nftMarket.ownerOf(1);
      expect(newOwner).to.equal(addr2.address);
    });

    it("Should fail if the listing price is not paid", async function () {
      await expect(
        nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com", auctionPrice)
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should fail if the sale price is not met", async function () {
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });

      await expect(
        nftMarket.connect(addr2).createMarketSale(1, { value: ethers.parseUnits('0.5', 'ether') })
      ).to.be.revertedWith("Please submit the asking price in order to complete the purchase");
    });
  });

  describe("Fetch Market Items", function () {
    it("Should return all unsold items", async function () {
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice });

      let items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(2);

      // Check if the unsold item's owner is addr1 and sold is false
      expect(items[0].owner).to.equal(addr1.address);
      expect(items[0].sold).to.equal(false);
      expect(items[1].owner).to.equal(addr1.address);
      expect(items[1].sold).to.equal(false);

      await nftMarket.connect(addr2).createMarketSale(1, { value: auctionPrice });

      items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(1);
    });
  });

  describe("Fetch My NFTs", function () {
    it("Should return only NFTs owned by the user", async function () {
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com/1", auctionPrice, { value: listingPrice });
      await nftMarket.connect(addr1).createToken("https://www.mytokenlocation.com/2", auctionPrice, { value: listingPrice });

      let items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(2);

      await nftMarket.connect(addr2).createMarketSale(1, { value: auctionPrice });

      items = await nftMarket.connect(addr2).fetchMyNFTs();
      expect(items.length).to.equal(1);
      expect(items[0].owner).to.equal(addr2.address);

      items = await nftMarket.connect(addr1).fetchMyNFTs();
      expect(items.length).to.equal(1);
      expect(items[0].owner).to.equal(addr1.address);
    });
  });
});