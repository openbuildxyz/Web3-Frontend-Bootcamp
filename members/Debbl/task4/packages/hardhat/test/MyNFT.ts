import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("MyNFT", () => {
  const name = "MyNFT";
  const symbol = "MNFT";

  async function deployNFT() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const MyNFT = await hre.viem.deployContract("MyNFT", [name, symbol]);

    return {
      MyNFT,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", () => {
    it("Should deploy MyERC20Token", async () => {
      const { MyNFT } = await loadFixture(deployNFT);

      // eslint-disable-next-line no-unused-expressions
      expect(MyNFT.address).to.be.not.undefined;
      expect(await MyNFT.read.name()).to.equal(name);
    });
  });

  describe("Mint", () => {
    it("Should mint tokens", async () => {
      const { MyNFT } = await loadFixture(deployNFT);

      const tokenURI = "ipfs://QmQmQmQmQmQmQmQmQmQmQmQmQmQmQm";

      await MyNFT.write.createNFT([tokenURI]);
      expect(await MyNFT.read.tokenCounter()).to.equal(1n);
      expect(await MyNFT.read.tokenURI([0n])).to.equal(tokenURI);
    });
  });

  describe("Transfer", () => {
    it("Should transfer tokens between accounts", async () => {
      const { MyNFT, owner, otherAccount } = await loadFixture(deployNFT);

      const tokenURI = "ipfs://QmQmQmQmQmQmQmQmQmQmQmQmQmQm";

      await MyNFT.write.createNFT([tokenURI]);
      expect(await MyNFT.read.tokenCounter()).to.equal(1n);
      expect(await MyNFT.read.tokenURI([0n])).to.equal(tokenURI);

      await MyNFT.write.transferFrom(
        [owner.account.address, otherAccount.account.address, 0n],
        {
          account: owner.account,
        },
      );

      expect((await MyNFT.read.ownerOf([0n])).toLocaleLowerCase()).to.equal(
        otherAccount.account.address,
      );
    });
  });
});
