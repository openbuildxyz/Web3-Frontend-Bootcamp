import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("NFTMarket", () => {
  const TokenName = "MyToken";
  const TokenSymbol = "MTK";

  const NFTName = "MyNFT";
  const NFTSymbol = "MNFT";

  async function deployAll() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const MyToken = await hre.viem.deployContract("MyERC20Token", [
      100n,
      TokenName,
      TokenSymbol,
    ]);
    const MyNFT = await hre.viem.deployContract("MyNFT", [NFTName, NFTSymbol]);
    const NFTMarket = await hre.viem.deployContract("NFTMarket", [
      MyToken.address,
    ]);

    return {
      MyToken,
      MyNFT,
      NFTMarket,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", () => {
    it("Should deploy All", async () => {
      const { MyToken, NFTMarket } = await loadFixture(deployAll);

      expect(
        (await NFTMarket.read.erc20Token()).toLocaleLowerCase(),
      ).to.be.equal(MyToken.address);
    });
  });

  describe("List", () => {
    it("Should list NFTs", async () => {
      const { MyNFT, NFTMarket, owner, otherAccount } =
        await loadFixture(deployAll);

      const tokenURI = "ipfs://QmQmQmQmQmQmQmQmQmQmQmQmQmQm";
      const price = 3n;

      await MyNFT.write.createNFT([tokenURI]);
      await MyNFT.write.transferFrom([
        owner.account.address,
        otherAccount.account.address,
        0n,
      ]);

      // console.log(await MyNFT.read.tokenCounter());
      // console.log("owner address", owner.account.address);
      // console.log("other address", otherAccount.account.address);
      // console.log("market address", NFTMarket.address);

      MyNFT.write.approve([NFTMarket.address, 0n], {
        account: otherAccount.account,
      });
      await NFTMarket.write.listItem([MyNFT.address, 0n, price], {
        account: otherAccount.account,
      });

      const nfts = await NFTMarket.read.getAll();
      const nft = nfts[0];

      expect(nft.seller.toLocaleLowerCase()).to.be.equal(
        otherAccount.account.address,
      );
      expect(nft.nftContract.toLocaleLowerCase()).to.be.equal(MyNFT.address);
      expect(nft.price).to.be.equal(price);
    });

    it("Should buy NFTs", async () => {
      const { MyToken, MyNFT, NFTMarket, owner, otherAccount } =
        await loadFixture(deployAll);

      MyToken.write.transfer([owner.account.address, 100n]);

      const tokenURI = "ipfs://QmQmQmQmQmQmQmQmQmQmQmQmQmQm";
      const price = 3n;

      await MyNFT.write.createNFT([tokenURI]);
      await MyNFT.write.transferFrom([
        owner.account.address,
        otherAccount.account.address,
        0n,
      ]);

      // console.log(await MyNFT.read.tokenCounter());
      // console.log("owner address", owner.account.address);
      // console.log("other address", otherAccount.account.address);
      // console.log("market address", NFTMarket.address);

      MyNFT.write.approve([NFTMarket.address, 0n], {
        account: otherAccount.account,
      });
      await NFTMarket.write.listItem([MyNFT.address, 0n, price], {
        account: otherAccount.account,
      });

      await MyToken.write.approve([NFTMarket.address, price]);
      await NFTMarket.write.buyNFT([MyNFT.address, BigInt(0)], {
        account: owner.account,
      });

      const boughtAddress = await MyNFT.read.ownerOf([0n]);
      expect(boughtAddress.toLocaleLowerCase()).to.be.equal(
        owner.account.address,
      );
    });
  });
});
