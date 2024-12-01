import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

import {
  DECIMALS,
  INITIAL_VALUE,
  TOKEN_ID_1,
  TOKEN_ID_2,
  URI_1,
  URI_2,
  URI_3,
} from "./helper";

const NFT_PRICE = 10;

describe("NFTMarket", () => {
  async function deployNFTMarketFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(INITIAL_VALUE);
    const tokenAddr = await token.getAddress();

    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();
    const nftAddr = await nft.getAddress();

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy(tokenAddr);
    const nftMarketAddr = await nftMarket.getAddress();

    const minter = nft.connect(owner);

    await minter.mint(owner, URI_1);
    await minter.mint(owner, URI_2);
    await minter.mint(owner, URI_3);

    await minter.setApprovalForAll(nftMarketAddr, true);

    return {
      token,
      nft,
      nftMarket,
      owner,
      otherAccount,
      tokenAddr,
      nftAddr,
      nftMarketAddr,
    };
  }

  it("Should set paymentToken", async () => {
    const { tokenAddr, nftMarket } = await loadFixture(deployNFTMarketFixture);

    expect(await nftMarket.paymentToken()).to.equal(tokenAddr);
  });

  it("Should list a NFT", async () => {
    const { nft, nftMarket, nftAddr, owner } = await loadFixture(
      deployNFTMarketFixture
    );

    const sender = await nftMarket.connect(owner);
    expect(await nft.ownerOf(TOKEN_ID_1)).to.equal(owner);

    await sender.listNFT(nftAddr, TOKEN_ID_1, NFT_PRICE);
    const nftItem = await nftMarket.listedNFTs(nftAddr, TOKEN_ID_1);
    expect(await nftItem.tokenId).to.equal(TOKEN_ID_1);
    expect(await nftItem.price).to.equal(NFT_PRICE);
    expect(await nftItem.isListed).to.equal(true);
  });

  it("Should delist a NFT", async () => {
    const { nft, nftMarket, nftAddr, owner } = await loadFixture(
      deployNFTMarketFixture
    );

    const sender = await nftMarket.connect(owner);
    expect(await nft.ownerOf(TOKEN_ID_2)).to.equal(owner);

    await sender.listNFT(nftAddr, TOKEN_ID_2, NFT_PRICE);
    expect((await nftMarket.listedNFTs(nftAddr, TOKEN_ID_2)).isListed).to.equal(
      true
    );

    await sender.delistNFT(nftAddr, TOKEN_ID_2);
    const nftItem = await nftMarket.listedNFTs(nftAddr, TOKEN_ID_2);

    expect(await nftItem.isListed).to.equal(false);
    expect(await nftItem.delistedTime).to.not.equal(0);
  });

  it("Should buy a NFT", async () => {
    const { token, nft, nftMarket, nftAddr, owner, otherAccount } =
      await loadFixture(deployNFTMarketFixture);

    const seller = await nftMarket.connect(owner);
    const buyer = await nftMarket.connect(otherAccount);

    // transfer token
    const tokenAmount = 10 * Math.pow(10, DECIMALS);

    await token.connect(owner).transfer(otherAccount.address, tokenAmount);
    expect(await token.balanceOf(otherAccount.address)).to.equal(tokenAmount);

    await token
      .connect(otherAccount)
      .approve(await buyer.getAddress(), NFT_PRICE);

    // list a NFT
    await seller.listNFT(nftAddr, TOKEN_ID_1, NFT_PRICE);

    // buy a NFT
    expect((await nftMarket.listedNFTs(nftAddr, TOKEN_ID_1)).isListed).to.equal(
      true
    );
    await buyer.buyNFT(nftAddr, TOKEN_ID_1);

    const nftItem = await nftMarket.listedNFTs(nftAddr, TOKEN_ID_1);
    expect(await nft.ownerOf(TOKEN_ID_1)).to.equal(otherAccount.address);
    expect;
    expect(await nftItem.isListed).to.equal(false);
    expect(await token.balanceOf(otherAccount.address)).to.equal(
      tokenAmount - NFT_PRICE
    );
  });
});
