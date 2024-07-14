import hre from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

// A deployment function to set up the initial state
const deploy = async () => {
  const myToken = await hre.viem.deployContract("ERC20Token", [1_000_000n]);

  return { myToken };
};

describe("MyToken Contract Tests", function () {
  it("should increase supply correctly", async function () {
    // Load the contract instance using the deployment function
    const { myToken } = await loadFixture(deploy);

    // Get the initial supply
    const initialSupply = await myToken.read.totalSupply();

    // Increase the supply
    await myToken.write.increaseSupply([500_000n]);

    // Get the new supply after the increase
    const newSupply = await myToken.read.totalSupply();

    // Assert that the supply increased as expected
    assert.equal(initialSupply + 500_000n, newSupply);
  });

  it("should revert when increasing supply by less than 1", async function () {
    // Load the contract instance using the deployment function
    const { myToken } = await loadFixture(deploy);

    // Attempt to increase supply by 0 (which should fail)
    await expect(myToken.write.increaseSupply([0n])).to.be.rejectedWith(
      "Amount must be greater than 0"
    );
  });
});