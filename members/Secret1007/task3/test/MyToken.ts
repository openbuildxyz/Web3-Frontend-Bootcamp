import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("MyToken", function () {
    async function deployErc20Token() {
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const MyToken = await hre.ethers.getContractFactory("MyToken");
        const erc20 = await MyToken.deploy();
        return { erc20, owner, otherAccount };
    }

    // describe("Deployment", function () {
    //     it("Should set the right token decimal", async function () {
    //         const { erc20 } = await loadFixture(deployErc20Token);
    //         expect(await erc20.decimals()).to.equal(18n);
    //     });
    // });

    describe("Transfers", function () {
        // describe("Validations", function () {
        //     it("Should revert with the right error if not the owner", async function () {
        //         const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //         await expect(erc20.connect(otherAccount).mintTo(otherAccount.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");
        //     });
        //     it("Should not revert if mintTo is called by the owner", async function () {
        //         const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //         await expect(erc20.connect(owner).mintTo(otherAccount.address, 100)).not.to.be.reverted;
        //     });
        //     it("Should not revert if mint is called with ETH", async function () {
        //         const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //         await expect(erc20.connect(otherAccount).mint({ value: ethers.parseEther("0.1") })).not.to.be.reverted;
        //     });
        // });
        // describe("Events", function () {
        //     it("Should emit transfer event", async function () {
        //         const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //         await expect(erc20.connect(owner).mintTo(otherAccount.address, 1000)).to.emit(erc20, "Transfer").withArgs(ethers.constants.AddressZero, otherAccount.address, 1000);
        //     });
        // });
        // it("Should cost the right ether.", async function () {
        //     const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //     await expect(() => erc20.connect(otherAccount).mint({ value: ethers.parseEther("0.1") })).to.changeEtherBalance(otherAccount, ethers.parseEther("0.1"));
        // });
        // it("Should mint the right amount of tokens", async function () {
        //     const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
        //     await expect(() => erc20.connect(otherAccount).mint({ value: ethers.parseEther("0.1") })).to.changeTokenBalance(erc20, otherAccount, ethers.parseEther("0.1").mul(10));
        // });
    });

    describe("Transfers", function () {
        it("Should have the right balance after transfer", async function () {
            const { erc20, owner, otherAccount } = await loadFixture(deployErc20Token);
            const mintAmount = ethers.parseEther("0.1");
            await erc20.connect(otherAccount).mint({ value: ethers.parseEther("0.1") });
            await expect(() => erc20.connect(otherAccount).transfer(owner.address, mintAmount)).to.changeTokenBalance(erc20, otherAccount, -mintAmount);
        });
    });
});
