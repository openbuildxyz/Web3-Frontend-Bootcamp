import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { DECIMALS, INITIAL_VALUE } from "./helper";

function expectedValue() {
  return INITIAL_VALUE * Math.pow(10, DECIMALS);
}

describe("MyToken", () => {
  async function deployMyTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(INITIAL_VALUE);

    return { token, owner, otherAccount };
  }

  it("Should set the right initial value", async () => {
    const { token } = await loadFixture(deployMyTokenFixture);
    const decimals = await token.decimals();

    expect(decimals).to.equal(DECIMALS, "The decimals should be 3");
    expect(await token.totalSupply()).to.equal(expectedValue());
  });

  it("Transaction", async () => {
    const { token, owner, otherAccount } =
      await loadFixture(deployMyTokenFixture);
    const initialOwnerBalance = await token.balanceOf(owner.address);

    expect(initialOwnerBalance).to.equal(expectedValue());
    expect(await token.balanceOf(otherAccount.address)).to.equal(0);

    // Operator '-' cannot be applied to types 'bigint' and 'number'.
    const amount = BigInt(Math.pow(10, DECIMALS));
    await token.transfer(otherAccount.address, amount);

    expect(await token.balanceOf(otherAccount.address)).to.equal(amount);
    expect(await token.balanceOf(owner.address)).to.equal(
      initialOwnerBalance - amount
    );
  });
});
