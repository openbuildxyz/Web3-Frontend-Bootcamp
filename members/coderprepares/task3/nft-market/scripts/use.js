async function main() {
    const [deployer, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.attach('0x005d3A77B67e951540810e29ac3ba46bE9e61282');
    console.log("Using MyToken at:", myToken.address);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.attach('0x691d32c0f26aFf9188aAF258Cf8036eA9eD2Bccf');
    console.log("Using MyNFT at:", myNFT.address);

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.attach('0x088B28165c824c87610A3b8A5c0676111f8909E6');
    console.log("Using NFTMarket at:", nftMarket.address);

    const tokenId = 1;

    // 上架NFT
    await myNFT.approve(nftMarket.address, tokenId);
    const price = ethers.utils.parseUnits("10", 18);
    tx = await nftMarket.listNFT(myNFT.address, tokenId, price, { gasLimit: 1000000 });
    receipt = await tx.wait();
    console.log("List NFT transaction hash:", tx.hash);

    // 转移一些ERC20代币给addr1
    await myToken.transfer(addr1.address, price);

    // 批准并购买NFT
    await myToken.connect(addr1).approve(nftMarket.address, price);
    tx = await nftMarket.connect(addr1).buyNFT(myNFT.address, tokenId, { gasLimit: 1000000 });
    receipt = await tx.wait();
    console.log("Buy NFT transaction hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
