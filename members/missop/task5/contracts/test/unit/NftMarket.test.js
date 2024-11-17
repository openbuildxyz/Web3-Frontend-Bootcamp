const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NftMarket Unit Tests", function () {
      let nftMarket, deployer;

      beforeEach(async () => {
        const res = await deployments.fixture(["NftMarket"]);
        nftMarket = await ethers.getContractAt("NftMarket", res.NftMarket.address);
        deployer = (await getNamedAccounts()).deployer;
      });

      describe("constructor", () => {
        it("set paymentToken", () => {});
      });

      describe("listNft", () => {
        it("list nft", () => {});
      });

      describe("unlistNft", () => {
        it("unlist nft", () => {});
      });

      describe("buyNft", () => {
        it("buy nft", () => {});
      });

      describe("getListsArray", () => {
        it("get lists array", () => {});
      });
    });
