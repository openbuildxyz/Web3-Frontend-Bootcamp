import { expect } from "chai";
import { ethers } from "hardhat";
import { ZZToken, ZZToken__factory,ZZNFT,ZZNFT__factory,ZZNFTMarket,ZZNFTMarket__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

const INITIAL_SUPPLY = 1_000_000;
const INITIAL_SUPPLY_DECIMAL = 100_000_000;
describe("ZZNFTMarket", function () {
  let zzToken: ZZToken;
  let zzNFT: ZZNFT;
  let nftMarket: ZZNFTMarket;
  let owner: SignerWithAddress;
  let seller: SignerWithAddress;
  let buyer: SignerWithAddress;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const ZZToken = await ethers.getContractFactory("ZZToken");
    zzToken = await ZZToken.deploy(INITIAL_SUPPLY);


    const ZZNFT = await ethers.getContractFactory("ZZNFT");
    zzNFT = await ZZNFT.deploy();

    const NFTMarket = await ethers.getContractFactory("ZZNFTMarket");
    nftMarket = await NFTMarket.deploy(zzToken.getAddress());


    // Mint NFT to seller
    await zzNFT.mintNFT(await seller.address, "https://example.com/token/1");

    // Mint tokens to buyer
    await zzToken.transfer(await buyer.getAddress(), 1000);
  });

  it("Should list an NFT", async function () {
    await zzNFT.connect(seller).setApprovalForAll(await nftMarket.getAddress(), true);
    await expect(nftMarket.connect(seller).listNFT(await zzNFT.getAddress(), 1, 100))
      .to.emit(nftMarket, "NFTListed")
      .withArgs(1, await seller.getAddress(), await zzNFT.getAddress(), 1, 100);
  });

  it("Should buy an NFT", async function () {
    await zzNFT.connect(seller).setApprovalForAll(nftMarket.getAddress(), true);
    await nftMarket.connect(seller).listNFT(zzNFT.getAddress(), 1, 100);

    await zzToken.connect(buyer).approve(nftMarket.getAddress(), 100);

    await expect(nftMarket.connect(buyer).buyNFT(1))
      .to.emit(nftMarket, "NFTPurchased")
      .withArgs(1, await buyer.getAddress(), await seller.getAddress(), zzNFT.getAddress(), 1, 100);

    expect(await zzNFT.ownerOf(1)).to.equal(await buyer.getAddress());
    expect(await zzToken.balanceOf(await seller.getAddress())).to.equal(100);
  });

  it("Should not allow buying unlisted NFT", async function () {
    await expect(nftMarket.connect(buyer).buyNFT(1)).to.be.revertedWith("Listing is not active");
  });

  it("Should not allow buying without sufficient balance", async function () {
    await zzNFT.connect(seller).setApprovalForAll(nftMarket.getAddress(), true);
    await nftMarket.connect(seller).listNFT(zzNFT.getAddress(), 1, 10000);

    await zzToken.connect(buyer).approve(nftMarket.getAddress(), 10000);

    await expect(nftMarket.connect(buyer).buyNFT(1)).to.be.revertedWith("Insufficient balance");
  });
});