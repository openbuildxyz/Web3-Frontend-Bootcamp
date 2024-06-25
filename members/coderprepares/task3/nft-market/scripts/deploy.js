async function main() {
    const [deployer, addr1] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");
    const initialSupply = ethers.utils.parseUnits("1000", 18);
    const myToken = await MyToken.deploy(initialSupply);
    await myToken.deployed();
    console.log("MyToken deployed to:", myToken.address);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();
    console.log("MyNFT deployed to:", myNFT.address);

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.deploy(myToken.address, deployer.address);
    await nftMarket.deployed();
    console.log("NFTMarket deployed to:", nftMarket.address);

    // 铸造NFT
    let tx = await myNFT.mintNFT(deployer.address);
    let receipt = await tx.wait();
    let tokenId = receipt.events[0].args.tokenId.toNumber();

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
