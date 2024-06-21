import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("ERC20Token", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const amount = parseGwei("1000000");

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const ERC20Token = await hre.viem.deployContract("ERC20Token", [amount]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      ERC20Token,
      amount,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Balance of owner", async function () {
      const { ERC20Token, owner } = await loadFixture(deployOneYearLockFixture);

      const balanceOf = await ERC20Token.write.balanceOf(owner)

      console.log('balanceOf', balanceOf)

      expect(balanceOf).to.equal(1);
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {

    });
  });
});
