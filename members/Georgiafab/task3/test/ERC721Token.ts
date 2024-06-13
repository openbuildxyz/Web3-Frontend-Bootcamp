import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC721Token", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ERC721Token = await ethers.getContractFactory("ERC721Token");
    const nft = await ERC721Token.deploy("myErc721", "er");

    return { nft, owner, otherAccount };
  }

  describe("Mint", function () {
    it("Should mint correctly", async function () {
      const { nft, owner, otherAccount } = await loadFixture(deployNftFixture);
      const addr = await owner.getAddress();
      await nft.mint(1, 20);
      // expect(await nft.tokenURI(0)).to.equal("http://www.baidu.com");
    });
  });
});
