const fs = require("fs");

async function main() {
    const data = fs.readFileSync('./deployed.json');
    const deployedAddresses = JSON.parse(data);

    const [deployer, addr1] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.attach(deployedAddresses.myToken);
    console.log("Using MyToken at:", myToken.address);

    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.attach(deployedAddresses.myNFT);
    console.log("Using MyNFT at:", myNFT.address);

    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    const nftMarket = await NFTMarket.attach(deployedAddresses.nftMarket);
    console.log("Using NFTMarket at:", nftMarket.address);

    // 铸造NFT
    let tx = await myNFT.mintNFT(deployer.address, { gasLimit: 3000000 });
    let receipt = await tx.wait();
    let tokenId = receipt.events[0].args.tokenId.toNumber();
    console.log("Mint NFT transaction hash:", tx.hash);

    // 上架NFT
    await myNFT.approve(nftMarket.address, tokenId, { gasLimit: 3000000 });
    const price = ethers.utils.parseUnits("10", 18);
    tx = await nftMarket.listNFT(tokenId, price, { gasLimit: 3000000 });
    receipt = await tx.wait();
    console.log("List NFT transaction hash:", tx.hash);

    tx = await nftMarket.getListedNFTs();
    console.log("getListedNFTs:", tx);

    // // 转移一些ERC20代币给addr1
    // await myToken.transfer(addr1.address, price, { gasLimit: 3000000 });

    // // 批准并购买NFT
    // await myToken.connect(addr1).approve(nftMarket.address, price, { gasLimit: 3000000 });
    // tx = await nftMarket.connect(addr1).buyNFT(tokenId, { gasLimit: 3000000 });
    // receipt = await tx.wait();
    // console.log("Buy NFT transaction hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
