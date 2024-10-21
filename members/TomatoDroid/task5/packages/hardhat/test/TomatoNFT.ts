import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { expect } from "chai";

describe("TomatoNFT", function () {
  async function deployTomatoFrontendToken() {
    const NAME = "TomatoNFT";
    const SYMBOL = "TFT";
    const TomatoNFT = await hre.ethers.getContractFactory("TomatoNFT");
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const tomatoNFT = await TomatoNFT.deploy(owner.address);

    return { NAME, SYMBOL, tomatoNFT, owner, otherAccount };
  }

  describe("Deploy", function () {
    it("Should get current NAME", async function () {
      const { tomatoNFT, NAME } = await loadFixture(deployTomatoFrontendToken);

      expect(await tomatoNFT.name()).to.equal(NAME);
    });

    it("Should get current SYMBOL", async function () {
      const { tomatoNFT, SYMBOL } = await loadFixture(deployTomatoFrontendToken);

      expect(await tomatoNFT.symbol()).to.equal(SYMBOL);
    });
  });

  describe("Mint", function () {
    it("Should get current balance of account", async function () {
      const { tomatoNFT, owner } = await loadFixture(deployTomatoFrontendToken);
      await tomatoNFT.safeMint(owner.address, "nftURI");

      expect(await tomatoNFT.balanceOf(owner.address)).to.equal(1);

      await tomatoNFT.safeMint(owner.address, "nftURI");

      expect(await tomatoNFT.balanceOf(owner.address)).to.equal(2);
    });
  });
});
