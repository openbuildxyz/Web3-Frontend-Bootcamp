import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken } from "../typechain-types";

describe("MyToken", function () {
    let myToken: MyToken;
    let owner: any;
    let addr1: any;
    let addr2: any;

    beforeEach(async function () {
        const MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        myToken = await MyToken.deploy();
    });

    it("should have correct name and symbol", async function () {
        expect(await myToken.name()).to.equal("SecretToken");
        expect(await myToken.symbol()).to.equal("ST");
    });

    it("only owner can mint tokens", async function () {
        await myToken.mintTo(addr1.address, 100);
        expect(await myToken.balanceOf(addr1.address)).to.equal(100);

        await expect(myToken.connect(addr1).mintTo(addr1.address, 100)).to.be.revertedWithCustomError(myToken,"OwnableUnauthorizedAccount");
    });

    it("should mint tokens when sending ETH", async function () {
        const initialBalance = await myToken.balanceOf(addr1.address);
        const mintValue = ethers.parseEther("1"); // 1 ETH

        await myToken.connect(addr1).mint({ value: mintValue });
        const newBalance = await myToken.balanceOf(addr1.address);

        expect(newBalance).to.equal(initialBalance + (mintValue * 10n));
    });

    it("should fail to mint tokens with zero ETH", async function () {
        await expect(myToken.connect(addr1).mint({ value: 0 })).to.be.revertedWith("Must send ETH to mint tokens");
    });
});
