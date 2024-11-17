const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NftToken Unit Tests", function () {
      let nftToken, deployer;

      beforeEach(async () => {
        const res = await deployments.fixture(["NftToken"]);
        nftToken = await ethers.getContractAt("NftToken", res.NftToken.address);
        deployer = (await getNamedAccounts()).deployer;
      });

      describe("constructor", function () {
        it("sets the name and symbol of the token", async () => {
          const name = await nftToken.name();
          const symbol = await nftToken.symbol();
          assert.equal(name, "NftToken");
          assert.equal(symbol, "NT");
        });
      });

      describe("mintNft", function () {
        it("mints a new NFT and assigns it to the caller", async () => {
          await nftToken.mint(deployer);
          const balances = await nftToken.balanceOf(deployer);
          assert.equal(balances, 1);
        });
      });
    });
