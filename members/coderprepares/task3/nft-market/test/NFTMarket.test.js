describe("NFTMarket", function () {
    let expect;
    before(async function () {
        ({ expect } = await import("chai"));
    });

    it("Should deploy and work correctly", async function () {
        const [owner, addr1] = await ethers.getSigners();

        console.log("Deploying contracts with the account:", owner.address);

        // 部署ERC20代币
        const MyToken = await ethers.getContractFactory("MyToken");
        const initialSupply = ethers.utils.parseUnits("1000", 18);
        const myToken = await MyToken.deploy(initialSupply);
        await myToken.deployed();
        console.log("MyToken deployed to:", myToken.address);

        // 部署ERC721代币
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNFT = await MyNFT.deploy();
        await myNFT.deployed();
        console.log("MyNFT deployed to:", myNFT.address);

        // 部署NFTMarket合约
        const NFTMarket = await ethers.getContractFactory("NFTMarket");
        const nftMarket = await NFTMarket.deploy(myToken.address, owner.address);
        await nftMarket.deployed();
        console.log("NFTMarket deployed to:", nftMarket.address);

        // 给owner铸造一个NFT
        const tx = await myNFT.mintNFT(owner.address);
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args.tokenId.toNumber();
        console.log(`NFT minted with tokenId ${tokenId}`);

        // owner批准NFTMarket合约处理其NFT
        await myNFT.approve(nftMarket.address, tokenId);

        // 将NFT上架到市场
        const price = ethers.utils.parseUnits("10", 18);
        const tx1 = await nftMarket.listNFT(myNFT.address, tokenId, price);
        console.log("List NFT transaction hash:", tx1.hash);
        console.log(`Listing NFT with tokenId ${tokenId} for ${price} tokens`);

        // addr1购买NFT
        await myToken.transfer(addr1.address, price);
        const balance = await myToken.balanceOf(owner.address);
        console.log(`Owner balance: ${balance}`);
        expect(balance.toString()).to.equal(initialSupply.sub(price).toString());

        await myToken.connect(addr1).approve(nftMarket.address, price);
        const tx2 = await nftMarket.connect(addr1).buyNFT(myNFT.address, tokenId);
        console.log("Buy NFT transaction hash:", tx2.hash);

        // 验证NFT的所有者是addr1
        expect(await myNFT.ownerOf(tokenId)).to.equal(addr1.address);

        const balanceOfOwner = await myToken.balanceOf(owner.address);
        const expectedBalance = initialSupply;
        // 验证owner收到了支付的代币
        expect(balanceOfOwner.toString()).to.equal(expectedBalance.toString());
    });
});
