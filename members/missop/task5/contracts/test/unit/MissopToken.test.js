const { network, ethers, deployments } = require("hardhat");
const { assert } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("MissopToken Unit Tests", () => {
      let missopToken;

      beforeEach(async () => {
        const res = await deployments.fixture(["MissopToken"]);
        missopToken = await ethers.getContractAt("MissopToken", res.MissopToken.address);
      });

      describe("constructor", () => {
        it("sets the name and symbol of the token", async () => {
          const name = await missopToken.name();
          const symbol = await missopToken.symbol();
          assert.equal(name, "MissopToken");
          assert.equal(symbol, "MT");
        });

        it("sets the total supply of the token", async () => {
          const totalSupply = await missopToken.totalSupply();
          assert.equal(totalSupply.toString(), "10000000000000000");
        });
      });

      describe("decimals", () => {
        it("returns the correct number of decimals", async () => {
          const decimals = await missopToken.decimals();
          assert.equal(decimals, 6);
        });
      });
    });
