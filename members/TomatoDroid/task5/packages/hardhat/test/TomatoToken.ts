import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("TomatoToken", function () {
  async function deployTomatoToken() {
    const INITIAL_SUPPLY = 100_000_000_000;
    const NAME = "TomatoToken";
    const SYSBOL = "TAT";
    const TomatoToken = await hre.ethers.getContractFactory("TomatoToken");
    const tomatoToken = await TomatoToken.deploy();

    return { INITIAL_SUPPLY, tomatoToken, NAME, SYSBOL };
  }
  describe("Deploment", function () {
    it("Should get the right Token Symbol", async function () {
      const { tomatoToken, SYSBOL } = await loadFixture(deployTomatoToken);

      expect(await tomatoToken.symbol()).to.equal(SYSBOL);
    });

    it("Should get the right Token Name", async function () {
      const { tomatoToken, NAME } = await loadFixture(deployTomatoToken);

      expect(await tomatoToken.name()).to.equal(NAME);
    });

    it("Should set the right totalSupply", async function () {
      const { tomatoToken, INITIAL_SUPPLY } = await loadFixture(deployTomatoToken);

      expect(await tomatoToken.totalSupply()).to.equal(INITIAL_SUPPLY);
    });

    it("Should get the right decimals", async function () {
      const { tomatoToken } = await loadFixture(deployTomatoToken);

      expect(await tomatoToken.decimals()).to.equal(9);
    });
  });
});
