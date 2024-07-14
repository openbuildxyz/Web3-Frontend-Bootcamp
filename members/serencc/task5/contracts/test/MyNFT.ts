import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

import {
  TOKEN_ID_1,
  TOKEN_ID_2,
  TOKEN_ID_3,
  URI_1,
  URI_2,
  URI_3,
} from "./helper";

describe("MyNFT", () => {
  async function deployMyNFTFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();

    return { nft, owner, otherAccount };
  }

  it("Should mint successfully", async () => {
    const { nft, owner, otherAccount } = await loadFixture(deployMyNFTFixture);

    expect(await nft.balanceOf(owner)).to.equal(0);

    const minter = await nft.connect(owner);

    await minter.mint(otherAccount.address, URI_1);
    expect(await nft.balanceOf(otherAccount)).to.equal(1);

    await minter.mint(otherAccount.address, URI_2);
    expect(await nft.balanceOf(otherAccount)).to.equal(2);

    await minter.mint(otherAccount.address, URI_3);
    expect(await nft.balanceOf(otherAccount)).to.equal(3);

    expect(await nft.ownerOf(TOKEN_ID_1)).to.equal(otherAccount.address);
    expect(await nft.ownerOf(TOKEN_ID_2)).to.equal(otherAccount.address);
    expect(await nft.ownerOf(TOKEN_ID_3)).to.equal(otherAccount.address);
  });
});
