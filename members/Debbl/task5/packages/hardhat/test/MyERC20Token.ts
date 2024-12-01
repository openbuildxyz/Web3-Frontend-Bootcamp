import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("MyERC20Token", () => {
  const initialSupply = 100n;
  const name = "MyERC20Token";
  const symbol = "MTK";

  async function deployERC20Token() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const MyERC20Token = await hre.viem.deployContract("MyERC20Token", [
      initialSupply,
      name,
      symbol,
    ]);

    return {
      MyERC20Token,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", () => {
    it("Should deploy MyERC20Token", async () => {
      const { MyERC20Token } = await loadFixture(deployERC20Token);

      expect(MyERC20Token.address).to.be.not.undefined;
      expect(await MyERC20Token.read.totalSupply()).to.equal(initialSupply);
      expect(await MyERC20Token.read.name()).to.equal(name);
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens between accounts", async () => {
      const { MyERC20Token, owner, otherAccount } = await loadFixture(
        deployERC20Token
      );

      // console.log("owner address", owner.account.address);
      // console.log("other address", otherAccount.account.address);

      const amount = 50n;
      await MyERC20Token.write.transfer(
        [otherAccount.account.address, amount],
        {
          account: owner.account,
        }
      );

      expect(
        await MyERC20Token.read.balanceOf([owner.account.address])
      ).to.equal(initialSupply - amount);
      expect(
        await MyERC20Token.read.balanceOf([otherAccount.account.address])
      ).to.equal(amount);

      // Transfer tokens back to owner
      await MyERC20Token.write.transfer([owner.account.address, amount], {
        account: otherAccount.account,
      });
      expect(
        await MyERC20Token.read.balanceOf([owner.account.address])
      ).to.equal(initialSupply);
      expect(
        await MyERC20Token.read.balanceOf([otherAccount.account.address])
      ).to.equal(0n);
    });
  });
});
