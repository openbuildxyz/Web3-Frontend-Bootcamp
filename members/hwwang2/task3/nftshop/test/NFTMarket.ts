import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";
  
describe("NFTMarket", function () {
  async function deployAll() {
    const name = "hwft";
    const symbol = "hw";
  
    // Contracts are deployed using the first signer/account by default
    const [owner, secondAccount, thirdAccount] = await hre.ethers.getSigners();

    const MyNft = await hre.ethers.getContractFactory("MyNft");
    const nft = await MyNft.deploy(name, symbol);

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const erc20 = await MyToken.deploy();

    const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
    const market = await NFTMarket.deploy(erc20);

    return { nft, erc20, market, owner, secondAccount, thirdAccount };
  }

  describe("Deployment", function () {
    it("Should set the right erc20 token", async function () {
      const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
      assert.equal(await market.getToken(), await erc20.getAddress())
      // await expect(market.getToken()).to.equal(erc20.getAddress());
    });
  });

  describe("business", function () {
    describe("sell", function () {
      it("Should emit list event after list nft", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await nft.connect(secondAccount).approve(market, 1);
        await expect(market.connect(secondAccount).listItem(nft, 1, 1000)).to.emit(market, "ItemListed")
            .withArgs(secondAccount, nft, 1, 1000);
      });
      
      it("Should revert if not the owner", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        // await nft.connect(secondAccount).approve(market, 1);
        await expect(market.connect(thirdAccount).listItem(nft, 1, 1000)).to.be.revertedWithCustomError(
            market, "NotOwner"
        );
      });

      it("Should revert none exist token", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await expect(market.connect(thirdAccount).listItem(nft, 1, 1000)).to.be.revertedWithCustomError(
          nft, "ERC721NonexistentToken"
        );
      });

      it("Should revert not approved error", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await expect(market.connect(secondAccount).listItem(nft, 1, 1000)).to.be.revertedWithCustomError(
          nft, "ERC721InsufficientApproval"
        );
      });

      it("Should revert when price not above 0", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await nft.connect(secondAccount).approve(market, 1);
        await expect(market.connect(secondAccount).listItem(nft, 1, 0)).to.be.revertedWithCustomError(market, "PriceMustAboveZero");
      });

      it("Should change owner to market address if sell", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await nft.connect(secondAccount).approve(market, 1);
        await market.connect(secondAccount).listItem(nft, 1, 1000);
        const addr = await (nft.ownerOf(1));
        assert.equal(await market.getAddress(),addr);
      });
    });

    describe("update price", function () {
      it("Should not revert if change with owner", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await nft.connect(secondAccount).approve(market, 1);
        await market.connect(secondAccount).listItem(nft, 1, 1000);
        await expect(market.connect(secondAccount).update(nft, 1, 2000)).to.not.be.reverted;
      });

      it("Should revert expected error when update price", async function () {
        const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
        await nft.connect(owner).safeMint(secondAccount);
        await nft.connect(secondAccount).approve(market, 1);
        await market.connect(secondAccount).listItem(nft, 1, 1000);
        await expect(market.connect(secondAccount).update(nft, 2, 2000)).to.be.revertedWithCustomError(market, "NotListed");

        await expect(market.connect(thirdAccount).update(nft, 1, 2000)).to.be.revertedWithCustomError(market, "NotOwner");
      });
    });


    describe("Revoke", function () {
        it("Should emit event when reovke by owner", async function () {
          const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
          await nft.connect(owner).safeMint(secondAccount);
          await nft.connect(secondAccount).approve(market, 1);
          await market.connect(secondAccount).listItem(nft, 1, 1000);
          await expect(market.connect(secondAccount).revoke(nft, 1)).to.emit(market, "Revoke").withArgs(secondAccount, nft,1);
        });
  
        it("Should revert when not the owner", async function () {
            const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
            await nft.connect(owner).safeMint(secondAccount);
            await nft.connect(secondAccount).approve(market, 1);
            await market.connect(secondAccount).listItem(nft, 1, 1000);
            await expect(market.connect(owner).revoke(nft, 1)).to.be.revertedWithCustomError(market, "NotOwner");
        });
    });

    describe("Purchase", function () {
        it("Should revert event when didnot approve enough token", async function () {
          const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
          await nft.connect(owner).safeMint(secondAccount);
          await nft.connect(secondAccount).approve(market, 1);
          await market.connect(secondAccount).listItem(nft, 1, 1000);
          await expect(market.connect(thirdAccount).purchase(nft, 1)).to.be.revertedWithCustomError(market, "NoEnoughTokenApproved");
        });
  
        it("Should revert when not listed", async function () {
            const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
            // await nft.connect(owner).safeMint(secondAccount);
            // await market.connect(secondAccount).listItem(nft, 1, 1000);
            await expect(market.connect(owner).purchase(nft, 1)).to.be.revertedWithCustomError(market, "NotListed");
        });


        it("Should emit purchase event when finished", async function () {
            const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
            await nft.connect(owner).safeMint(secondAccount);
            await nft.connect(secondAccount).approve(market, 1);
            await market.connect(secondAccount).listItem(nft, 1, 1000);
            await erc20.connect(owner).mintTo(owner, 100000);
            await erc20.connect(owner).approve(market, 100000);
            
            expect(market.connect(owner).purchase(nft, 1)).to.emit(market, "Purchase").withArgs(owner, nft, 1, 1000);
        });
    });
  });

  describe("Admin", function () {
    it("Should emit event when reovke by admin", async function () {
      const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
      await nft.connect(owner).safeMint(secondAccount);
      await nft.connect(secondAccount).approve(market, 1);
      await market.connect(secondAccount).listItem(nft, 1, 1000);
      await expect(market.connect(owner).revokeByAdmin(nft, 1)).to.emit(market, "Revoke").withArgs(owner, nft,1);
    });
  
    it("Should revert not listed", async function () {
      const { nft, erc20, market, owner, secondAccount, thirdAccount } = await loadFixture(deployAll);
      // await nft.connect(owner).safeMint(secondAccount);
      // await nft.connect(secondAccount).approve(market, 1);
      // await market.connect(secondAccount).listItem(nft, 1, 1000);
      await expect(market.connect(owner).revokeByAdmin(nft, 1)).to.be.revertedWithCustomError(market, "NotListed");
    });
  });
});